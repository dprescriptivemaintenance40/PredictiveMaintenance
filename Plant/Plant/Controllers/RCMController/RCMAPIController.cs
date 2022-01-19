using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers.RCMController
{
    [Route("api/[controller]")]
    [ApiController]
    public class RCMAPIController : ControllerBase
    {
        private readonly DPMDal _context;
        private IWebHostEnvironment _hostingEnvironment;

        public RCMAPIController(DPMDal context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }
        // GET: api/<RCMAPIController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RCMModel>>> GetPrescriptive()
        {
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                return await _context.RCMs.Where(a => a.UserId == userId)
                                                           .Include(a => a.FailureModes)
                                                           .ThenInclude(a => a.MSS)
                                                           .OrderByDescending(a => a.RCMId)
                                                           .ToListAsync();

            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        // GET api/<RCMAPIController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<RCMAPIController>
        [HttpPost]
        [Route("UploadFile")]
        public IActionResult GetActionResult()
        {
            try
            {
                string pathToSave = "";
                var file = Request.Form.Files[0];
                var imageFolder = Path.Combine("wwwroot\\Evidence_Image\\");
                var pdfFolder = Path.Combine("wwwroot\\Evidence_PDF\\");
                var imageRootPath = Path.Combine(Directory.GetCurrentDirectory(), imageFolder);
                var pdfRootPath = Path.Combine(Directory.GetCurrentDirectory(), pdfFolder);
                var UserId = User.Claims.First(c => c.Type == "UserID").Value;
                var removePath = Request.Form["removePath"];
                if (file.ContentType == "application/pdf")
                {
                    pathToSave = string.Format("{0}{1}", pdfRootPath, UserId);
                }
                else
                {
                    pathToSave = string.Format("{0}{1}", imageRootPath, UserId);
                }

                // Check folder exists
                if (!Directory.Exists(pathToSave))
                {
                    Directory.CreateDirectory(pathToSave);
                }

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    string dbPath = "";
                    if (file.ContentType == "application/pdf")
                    {
                        dbPath = string.Format("Evidence_PDF/{0}/{1}", UserId, fileName);
                    }
                    else
                    {
                        dbPath = string.Format("Evidence_Image/{0}/{1}", UserId, fileName);
                    }
                    if (!string.IsNullOrEmpty(removePath))
                    {
                        System.IO.File.Delete(Path.Combine(_hostingEnvironment.WebRootPath, removePath));
                    }

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        stream.Position = 0;
                    }
                    var FileId = Guid.NewGuid();
                    return Ok(new { dbPath, fullPath, UserId, FileId, fileName });
                }
                else
                {
                    return BadRequest();
                }
            }

            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        // PUT api/<RCMAPIController>/5
        [HttpPut]
        [Route("SaveConsequence")]
        public async Task<IActionResult> SaveConsequence(RCMModel rcmModels)
        {

            RCMModel rcmModel = new RCMModel();
            rcmModel = await _context.RCMs.FindAsync(rcmModels.RCMId);
            rcmModel.FailureModes = rcmModels.FailureModes;
            rcmModel.FMWithConsequenceTree = rcmModels.FMWithConsequenceTree;

            _context.Entry(rcmModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RCMModelModelExists(rcmModels.RCMId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        [Route("SaveFMEA")]
        public async Task<ActionResult<RCMModel>> SaveFMEA([FromBody] RCMModel rcmModel)
        {
            try
            {
                List<int> Calculation = new List<int>();

                var FailureModeData = rcmModel.FailureModes;
                rcmModel.FailureModes = new List<FailureMode>();

                foreach (var item in FailureModeData)
                {
                    var DT = item.DownTimeFactor;
                    var SF = item.ScrapeFactor;
                    var SF2 = item.SafetyFactor;
                    var PF = item.ProtectionFactor;
                    var FF = item.FrequencyFactor;
                    var ADD = (DT + SF + SF2);
                    var MULT = ADD * PF * FF;
                    Calculation.Add(MULT);

                    if (MULT > 1000)
                    {
                        item.Rating = "A";
                        item.MaintainenancePractice = "CBM and OBM Both";
                        item.FrequencyMaintainenance = "Daily Condition Monitoring, or Online Monitoring";
                        item.ConditionMonitoring = "Vibration Monitoring";
                    }
                    else if ((500 < MULT) && (MULT < 1000))
                    {
                        item.Rating = "B";
                        item.MaintainenancePractice = "OBM";
                        item.FrequencyMaintainenance = "Twice a week Condition Monitoring";
                        item.ConditionMonitoring = "Vibration Monitoring";
                    }
                    else if ((200 < MULT) && (MULT <= 500))
                    {
                        item.Rating = "C";
                        item.MaintainenancePractice = "PM";
                        item.FrequencyMaintainenance = "Weekly Condition Monitoring";
                        item.ConditionMonitoring = "Vibration Monitoring";
                    }
                    else if ((100 < MULT) && (MULT <= 200))
                    {
                        item.Rating = "D";
                        item.MaintainenancePractice = "TBM";
                        item.FrequencyMaintainenance = "Half of PF interval, typically Monthly or fortnightly, time based maintenance";
                        item.ConditionMonitoring = "Not Answered";
                    }
                    else if ((0 < MULT) && (MULT < 100))
                    {
                        item.Rating = "E";
                        item.MaintainenancePractice = "Breakdown Maintenance";
                        item.FrequencyMaintainenance = "All the time of Failure";
                        item.ConditionMonitoring = "Not Answered";
                    }

                    item.CriticalityFactor = MULT;

                    rcmModel.FailureModes.Add(item);

                }

                var CF = Calculation.Sum();
                prescriptiveModel.ComponentCriticalityFactor = CF;

                if (CF > 1000)
                {
                    rcmModel.ComponentRating = "A";
                    rcmModel.CMaintainenancePractice = "CBM and OBM Both";
                    rcmModel.CFrequencyMaintainenance = "Daily Condition Monitoring, or Online Monitoring";
                    rcmModel.CConditionMonitoring = "Vibration Monitoring";
                }
                else if ((500 < CF) && (CF < 1000))
                {
                    rcmModel.ComponentRating = "B";
                    rcmModel.CMaintainenancePractice = "OBM";
                    rcmModel.CFrequencyMaintainenance = "Twice a week Condition Monitoring";
                    rcmModel.CConditionMonitoring = "Vibration Monitoring";
                }
                else if ((200 < CF) && (CF <= 500))
                {
                    rcmModel.ComponentRating = "C";
                    rcmModel.CMaintainenancePractice = "PM";
                    rcmModel.CFrequencyMaintainenance = "Weekly Condition Monitoring";
                    rcmModel.CConditionMonitoring = "Vibration Monitoring";
                }
                else if ((100 < CF) && (CF <= 200))
                {
                    rcmModel.ComponentRating = "D";
                    rcmModel.CMaintainenancePractice = "TBM";
                    rcmModel.CFrequencyMaintainenance = "Half of PF interval, typically Monthly or fortnightly, time based maintenance";
                    rcmModel.CConditionMonitoring = "Not Answered";
                }
                else if ((0 < CF) && (CF < 100))
                {
                    rcmModel.ComponentRating = "E";
                    rcmModel.CMaintainenancePractice = "Breakdown Maintenance";
                    rcmModel.CFrequencyMaintainenance = "All the time of Failure";
                    rcmModel.CConditionMonitoring = "Not Answered";
                }

                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                DateTime d1 = DateTime.Now;
                rcmModel.Date = d1.Date;
                rcmModel.UserId = userId;
                rcmModel.CriticalityAssesmentId = 14; // CriticalityAssesmentModelTable record with PrimaryKey number 14 is hardcoded for now
                _context.RCMs.Add(rcmModel);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPrescriptiveById", new { id = rcmModel.RCMId }, rcmModel);
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        // DELETE api/<FMEAAPIController>/5
        [HttpDelete]
        [Route("UpdateFileUpload")]
        public IActionResult DeleteUpdateFileUpload(string fullPath)
        {
            try
            {
                //string _fileToBeDeleted = fullPath;
                //if (System.IO.File.Exists(_fileToBeDeleted))
                //{
                //    System.IO.File.Delete(_fileToBeDeleted);
                //}
                System.IO.File.Delete(Path.Combine(_hostingEnvironment.WebRootPath, fullPath));
                return Ok();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }
    }
}
