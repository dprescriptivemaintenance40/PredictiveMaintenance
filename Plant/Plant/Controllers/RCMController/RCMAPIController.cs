using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Plant.DAL;
using Plant.Models;
using System.Net.Http.Headers;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers.RCMController
{
    [Route("api/[controller]")]
    [ApiController]
    public class RCMAPIController : ControllerBase
    {
        private readonly PlantDBContext _context;
        private IWebHostEnvironment _hostingEnvironment;

        public RCMAPIController(PlantDBContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [Route("GetPrescriptiveRecordsForFCA")]
        public async Task<ActionResult<IEnumerable<RCM>>> GetPrescriptiveRecordsForFCA(int OrganizationId)
        {
            try
            {
                return await _context.RCMs.Where(a => a.OrganizationId == OrganizationId && (a.FCAAdded == null || a.FCAAdded == "") && a.EquipmentCriticalityType == "CA")
                                                           .Include(a => a.failureModes)
                                                           .OrderBy(a => a.RCMId)
                                                           .ToListAsync();

            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpGet]
        [Route("GetPrescriptiveRecordsForMSS")]
        public async Task<ActionResult<IEnumerable<RCM>>> GetPrescriptiveRecordsForMSS()
        {
            try
            {
                return await _context.RCMs.Where(a => a.FCAAdded == "1" && (a.MSSAdded == null || a.MSSAdded == ""))
                                                           .Include(a => a.failureModes)
                                                           .OrderBy(a => a.RCMId)
                                                           .ToListAsync();

            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpGet("{id}")]
        [Route("GetRCMList")]
        public async Task<ActionResult<IEnumerable<RCM>>> GetRCMList(int EquipmentId)
        {
            try
            {
                return await _context.RCMs.Where(a => a.EquipmentId == EquipmentId)
                                                .Include(a => a.failureModes)
                                                .OrderBy(a => a.RCMId)
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
        public async Task<IActionResult> SaveConsequence(RCM rcmModels)
        {

            RCM rcmModel = new RCM();
            rcmModel = await _context.RCMs.FindAsync(rcmModels.RCMId);
            rcmModel.failureModes = rcmModels.failureModes;
            rcmModel.FMWithConsequenceTree = rcmModels.FMWithConsequenceTree;

            _context.Entry(rcmModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!RCMModelExists(rcmModels.RCMId))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
            }

            return NoContent();
        }


        [HttpPost]
        [Route("SaveFMEA")]
        public async Task<ActionResult<RCM>> SaveFMEA([FromBody] RCM rcmModel)
        {
            try
            {
                List<int> Calculation = new List<int>();

                var FailureModeData = rcmModel.failureModes;
                rcmModel.failureModes = new List<FailureModes>();

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

                    rcmModel.failureModes.Add(item);

                }


                _context.RCMs.Add(rcmModel);
                await _context.SaveChangesAsync();

                return Ok(rcmModel);
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpPost]
        [Route("WebalAlgo")]
        public async Task<IActionResult> WebalAlgoritm([FromBody] int[] Days)
        {
            try
            {
                List<int> WebalDays = new List<int>();
                List<int> Rank = new List<int>();
                List<double> MedianRank = new List<double>();  // Median rank, percentage
                List<double> MedianRankDays = new List<double>(); // ln (x)
                List<double> MedianRankInverse = new List<double>(); // 1/(1-p)
                List<double> Last = new List<double>(); // ln(ln(1/(1-p)))
                int r = 1;
                foreach (var item in Days)
                {
                    WebalDays.Add(item);
                    Rank.Add(r);
                    r = r + 1;
                }
                WebalDays.Sort();
                int RankCount = Rank.Count();
                foreach (var item in Rank)
                {
                    double median = (item - 0.3) / (RankCount + 0.4);
                    MedianRank.Add(median);

                }
                foreach (var item in WebalDays)
                {
                    double medianDays = Math.Log(item);
                    MedianRankDays.Add(medianDays);

                }
                foreach (var item in MedianRank)
                {
                    double medianInverse = 1 / (1 - item);
                    MedianRankInverse.Add(medianInverse);

                }
                foreach (var item in MedianRankInverse)
                {
                    double l = Math.Log(Math.Log(item));
                    Last.Add(l);

                }

                List<double> xVals = new List<double>();
                List<double> yVals = new List<double>();
                xVals = Last;
                yVals = MedianRankDays;

                double sumOfX = 0;
                double sumOfY = 0;
                double sumOfXSq = 0;
                double sumOfYSq = 0;
                double sumCodeviates = 0;

                for (var i = 0; i < xVals.Count(); i++)
                {
                    var x = xVals[i];
                    var y = yVals[i];
                    sumCodeviates += x * y;
                    sumOfX += x;
                    sumOfY += y;
                    sumOfXSq += x * x;
                    sumOfYSq += y * y;
                }

                var count = xVals.Count();
                var ssX = sumOfXSq - ((sumOfX * sumOfX) / count);
                var ssY = sumOfYSq - ((sumOfY * sumOfY) / count);

                var rNumerator = (count * sumCodeviates) - (sumOfX * sumOfY);
                var rDenom = (count * sumOfXSq - (sumOfX * sumOfX)) * (count * sumOfYSq - (sumOfY * sumOfY));
                var sCo = sumCodeviates - ((sumOfX * sumOfY) / count);

                var meanX = sumOfX / count;
                var meanY = sumOfY / count;
                var dblR = rNumerator / Math.Sqrt(rDenom);

                var rSquared = dblR * dblR;
                var yIntercept = meanY - ((sCo / ssX) * meanX);
                var slope = sCo / ssX;
                var alpha = Math.Exp(yIntercept);
                var beta = 1 / slope;

                return Ok(new { rSquared, alpha, beta });
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("PrespectivePattern")]
        public async Task<IActionResult> PutPrespectivePattern(RCM prescriptiveModel)
        {

            try
            {
                //string userId = User.Claims.First(c => c.Type == "UserID").Value;
                List<RCM> RCMModel = await _context.RCMs.Where(a => a.RCMId == prescriptiveModel.RCMId)
                                                        .Include(a => a.failureModes)
                                                        .ToListAsync();
                RCMModel[0].FMWithConsequenceTree = prescriptiveModel.FMWithConsequenceTree;
                RCMModel[0].FCAAdded = prescriptiveModel.FCAAdded;

                _context.Entry(RCMModel[0]).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                var collection = RCMModel[0].failureModes.ToList();
                var i = 0;
                foreach (var item in collection)
                {
                    item.Pattern = prescriptiveModel.failureModes[i].Pattern;
                    item.FCACondition = prescriptiveModel.failureModes[i].FCACondition;
                    item.FCAInterval = prescriptiveModel.failureModes[i].FCAInterval;
                    item.FCAFFI = prescriptiveModel.failureModes[i].FCAFFI;
                    item.FCAComment = prescriptiveModel.failureModes[i].FCAComment;
                    item.FCAAlpha = prescriptiveModel.failureModes[i].FCAAlpha;
                    item.FCABeta = prescriptiveModel.failureModes[i].FCABeta;
                    item.FCASafeLife = prescriptiveModel.failureModes[i].FCASafeLife;
                    item.FCAUsefulLife = prescriptiveModel.failureModes[i].FCAUsefulLife;
                    item.FCAUpdateIntervals = prescriptiveModel.failureModes[i].FCAUpdateIntervals;
                    item.FCAUpdateConditions = prescriptiveModel.failureModes[i].FCAUpdateConditions;
                    i = i + 1;
                    _context.Entry(item).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }

                return Ok(prescriptiveModel);
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }

        }

        [HttpPut]
        [Route("UpdatePrespectiveMSS")]
        public async Task<IActionResult> PutUpdatePrespectiveMSS(RCM prescriptiveModel)
        {

            try
            {
                List<RCM> RCMModel = await _context.RCMs.Where(a => a.RCMId == prescriptiveModel.RCMId)
                                                           .Include(a => a.failureModes)
                                                           .ToListAsync();
                RCMModel[0].FMWithConsequenceTree = prescriptiveModel.FMWithConsequenceTree;
                RCMModel[0].MSSAdded = "1";

                _context.Entry(RCMModel[0]).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                int i = 0;
                var collection = RCMModel[0].failureModes.ToList();
                foreach (var item in collection)
                {

                    foreach (var item1 in prescriptiveModel.failureModes[i].MSS)
                    {
                        MSS mss = new MSS();
                        mss.RCMId = item1.RCMId;
                        mss.FailureModeId = item1.FailureModeId;
                        mss.MSSAvailability = item1.MSSAvailability;
                        mss.MSSFinalAvaliability = item1.MSSFinalAvaliability;
                        mss.MSSMaintenanceInterval = item1.MSSMaintenanceInterval;
                        mss.MSSMaintenanceTask = item1.MSSMaintenanceTask;
                        mss.MSSIntervalSelectionCriteria = item1.MSSIntervalSelectionCriteria;
                        mss.MSSStartergy = item1.MSSStartergy;
                        _context.MSS.Add(mss);
                        await _context.SaveChangesAsync();
                    }

                    item.MSSStartergyList = prescriptiveModel.failureModes[i].MSSStartergyList;
                    _context.Entry(item).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    i = i + 1;
                }

                return Ok();
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
