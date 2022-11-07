using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Plant.DAL;
using Plant.Models;
using Plant.Models.Plant;
using Plant.Models.RCM_Master;
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
        [Route("GetAssetList")]
        public async Task<ActionResult<IEnumerable<Models.Plant.mst_Asset>>> GetAssetList()
        {
            try
            {
                //string userId = User.Claims.First(c => c.Type == "UserID").Value;
                return await _context.mst_Asset.OrderByDescending(a => a.AssetId)
                                                           .ToListAsync();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }


        [HttpGet("{id}")]
        [Route("GetAssetType")]
        public IActionResult GetAssetType(string EquipmentType)
        {
            try
            {
                string ET = EquipmentType;
                IQueryable<Asset_Equipment> asset_Equipment = _context.Asset_Equipments
                                                              .Where(a => a.AssetName == ET)
                                                              .OrderBy(a => a.Id)
                                                              .AsQueryable();
                var Data = asset_Equipment.ToList();
                return Ok(Data);

            }
            catch (Exception exe)
            {
                return BadRequest(exe.Message);
            }

        }

        [HttpGet]
        [Route("GetApplicationList")]
        public async Task<ActionResult<IEnumerable<mst_application>>> GetApplicationList()
        {
            try
            {
                //string userId = User.Claims.First(c => c.Type == "UserID").Value;
                return await _context.mst_Application.OrderByDescending(a => a.ApplicationId)
                                                           .ToListAsync();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpGet]
        [Route("GetSubUnitList")]
        public async Task<ActionResult<IEnumerable<mst_subUnits>>> GetSubUnitList()
        {
            try
            {
                //string userId = User.Claims.First(c => c.Type == "UserID").Value;
                return await _context.mst_SubUnits.OrderByDescending(a => a.SubUnitsId)
                                                           .ToListAsync();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RCM>>> GetPrescriptive()
        {
            try
            {
                //string userId = User.Claims.First(c => c.Type == "UserID").Value;
                return await _context.RCMs.Include(a => a.failureModes)
                                                           .ThenInclude(a => a.MSS)
                                                           .OrderByDescending(a => a.RCMId)
                                                           .ToListAsync();

            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpGet]
        [Route("GetPrescriptiveRecordsForFCA")]
        public async Task<ActionResult<IEnumerable<RCM>>> GetPrescriptiveRecordsForFCA()
        {
            try
            {
                return await _context.RCMs.Where(a => a.FMWithConsequenceTree != "" && (a.FCAAdded == null || a.FCAAdded == ""))
                                                           .Include(a => a.failureModes)
                                                           .OrderBy(a => a.RCMId)
                                                           .ToListAsync();
                //return await _context.RCMs.Where(a => a.RCMId == RCMId && (a.FCAAdded == null || a.FCAAdded == "") && a.EquipmentCriticalityType == "CA")
                //                                           .Include(a => a.failureModes)
                //                                           .OrderBy(a => a.RCMId)
                //                                           .ToListAsync();

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

        
        [HttpGet]
        [Route("GetPrescriptiveRecordsForCBA")]
        public async Task<ActionResult<IEnumerable<RCM>>> GetPrescriptiveRecordsForCBA()
        {
            try
            {
                //string userId = User.Claims.First(c => c.Type == "UserID").Value;
                return await _context.RCMs.Where(a => a.MSSAdded == "1" && (a.CBAAdded == null || a.CBAAdded == ""))
                                                           .Include(a => a.failureModes)
                                                           .ThenInclude(a => a.MSS)
                                                           .OrderBy(a => a.RCMId)
                                                           .ToListAsync();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpGet]
        [Route("GetCBARecordsForReportById")]
        public async Task<ActionResult<PrescriptiveCbaModel>> GetCBARecordsForReportById(int id)
        {
            try
            {
                var cbamodel = await _context.PrescriptiveCbaModels.Where(a => a.RCMId == id)
                                                             .Include(a => a.CBAFailureModes)
                                                             .ThenInclude(a => a.CBAMaintenanceTasks)
                                                             .ThenInclude(a => a.CBAMainenanceIntervals)
                                                             .FirstOrDefaultAsync();
                return cbamodel;
            }
            catch (Exception exe)
            {
                return BadRequest(exe.Message);
            }
        }

        [HttpGet]
        [Route("GetRCMRecords")]
        public async Task<ActionResult<IEnumerable<RCM>>> GetRCMRecords()
        {
            try
            {
                return await _context.RCMs.Where(a => a.FCAAdded == "1" && a.MSSAdded == "1")
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
        public async Task<ActionResult<IEnumerable<RCM>>> GetRCMList(int RCMId)
        {
            try
            {
                return await _context.RCMs.Where(a => a.RCMId == RCMId)
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

        [HttpPost]
        [Route("SaveCBASheetData")]
        public async Task<ActionResult<PrescriptiveCbaModel>> SaveCBASheetData([FromBody] PrescriptiveCbaModel prescriptiveCbaModel)
        {
            try
            {
                PrescriptiveCbaModel cbaObj = new PrescriptiveCbaModel();
                //cbaObj.PCMId = 1;
                cbaObj.RCMId = prescriptiveCbaModel.RCMId;
                cbaObj.FailureModeId = prescriptiveCbaModel.FailureModeId;
                cbaObj.TagNumber = prescriptiveCbaModel.TagNumber;
                cbaObj.EquipmentType = prescriptiveCbaModel.EquipmentType;
                cbaObj.FunctionFailure = prescriptiveCbaModel.FunctionFailure;
                cbaObj.IsAgeRelated = prescriptiveCbaModel.IsAgeRelated;
                cbaObj.RiskMatrix = prescriptiveCbaModel.RiskMatrix;
                cbaObj.Consequence = prescriptiveCbaModel.Consequence;
                cbaObj.HasScenario = prescriptiveCbaModel.HasScenario;
                cbaObj.DescribeScenario = prescriptiveCbaModel.DescribeScenario;
                _context.PrescriptiveCbaModels.Add(cbaObj);
                await _context.SaveChangesAsync();
                var cbafailuremode = prescriptiveCbaModel.CBAFailureModes;
                foreach (var failuremode in cbafailuremode)
                {
                    CBAFailureMode FailureMode = new CBAFailureMode();
                    //FailureMode.CFMId = failuremode.CFMId;
                    FailureMode.PCMId = cbaObj.PCMId;
                    FailureMode.FailureMode = failuremode.FailureMode;
                    FailureMode.ETBF = failuremode.ETBF;
                    FailureMode.PONC = failuremode.PONC;
                    FailureMode.EC = failuremode.EC;
                    FailureMode.HS = failuremode.HS;
                    FailureMode.EV = failuremode.EV;
                    FailureMode.CA = failuremode.CA;
                    FailureMode.ETBC = failuremode.ETBC;
                    FailureMode.TotalAnnualPOC = failuremode.TotalAnnualPOC;
                    FailureMode.TotalAnnualCostWithMaintenance = failuremode.TotalAnnualCostWithMaintenance;
                    FailureMode.ResidualRiskWithMaintenance = failuremode.ResidualRiskWithMaintenance;
                    FailureMode.MEI = failuremode.MEI;
                    _context.CBAFailureModes.Add(FailureMode);
                    await _context.SaveChangesAsync();
                    var Tasks = failuremode.CBAMaintenanceTasks;
                    foreach (var task in Tasks)
                    {
                        CBAMaintenanceTask cbatask = new CBAMaintenanceTask();
                        cbatask.CFMId = FailureMode.CFMId;
                        cbatask.CentrifugalPumpMssId = task.CentrifugalPumpMssId;
                        cbatask.MSSMaintenanceTask = task.MSSMaintenanceTask;
                        cbatask.MSSStartergy = task.MSSStartergy;
                        cbatask.MaterialCost = task.MaterialCost;
                        cbatask.Status = task.Status;
                        _context.CBAMaintenanceTasks.Add(cbatask);
                        await _context.SaveChangesAsync();
                        var intervals = task.CBAMainenanceIntervals;
                        foreach (var interval in intervals)
                        {
                            CBAMainenanceInterval cbainterval = new CBAMainenanceInterval();
                            //CBATaskObj.CPPCFMId = cbaObj.CPCMId;
                            cbainterval.CMTId = cbatask.CMTId;
                            //CBATaskObj.MSSMaintenanceTask = cbaData.MSSMaintenanceTask;
                            cbainterval.MSSFrequency = interval.MSSFrequency;
                            cbainterval.Maintenancelibrary = interval.Maintenancelibrary;
                            cbainterval.RWC = interval.RWC;
                            cbainterval.TaskDuration = interval.TaskDuration;
                            cbainterval.ResourceCost = interval.ResourceCost;
                            cbainterval.POC = interval.POC;
                            cbainterval.AnnualPOC = interval.AnnualPOC;
                            cbainterval.WorkCenter = interval.WorkCenter;
                            cbainterval.OnStream = interval.OnStream;
                            _context.CBAMainenanceIntervals.Add(cbainterval);
                            await _context.SaveChangesAsync();
                        }

                    }
                }
                List<RCM> centrifugalPumpPrescriptiveModel = await _context.RCMs.Where(a => a.RCMId == cbaObj.RCMId)
                                                                                                                 .Include(a => a.failureModes)
                                                                                                                 .ToListAsync();
                centrifugalPumpPrescriptiveModel[0].CBAAdded = "1";
                _context.Entry(centrifugalPumpPrescriptiveModel[0]).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpPut]
        [Route("CFPrescriptiveAdd")]
        public async Task<IActionResult> PutPrespective(RCM prescriptiveModel)
        {

            RCM centrifugalPumpPrescriptiveModel = new RCM();
            centrifugalPumpPrescriptiveModel = await _context.RCMs.FindAsync(prescriptiveModel.RCMId);
            centrifugalPumpPrescriptiveModel.failureModes = prescriptiveModel.failureModes;
            centrifugalPumpPrescriptiveModel.FMWithConsequenceTree = prescriptiveModel.FMWithConsequenceTree;

            _context.Entry(centrifugalPumpPrescriptiveModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!PrespectiveModelExists(prescriptiveModel.RCMId))
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
                        mss.MSSFrequency = item1.MSSFrequency;
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

        [HttpPut]
        [Route("EditConsequenceTree")]
        public async Task<IActionResult> PutEditConsequenceTree(RCM prescriptiveModel)
        {
            try
            {
                List<int> Calculation = new List<int>();
                var MTBF = Convert.ToDouble(prescriptiveModel.TagNumber);
                prescriptiveModel.TagNumber = "";
                var CentrifugalPumpPrescriptiveFailureModeData = prescriptiveModel.failureModes;
                prescriptiveModel.failureModes = new List<FailureModes>();
                var ParentId = 0;
                var ChildId = 0;

                foreach (var item in CentrifugalPumpPrescriptiveFailureModeData)
                {
                    ParentId = item.RCMId;
                    ChildId = item.FailureModeId;
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

                    prescriptiveModel.failureModes.Add(item);

                }

                var CFData = await _context.FailureModes.Where(a => a.RCMId == ParentId).ToListAsync();

                foreach (var c in CFData)
                {
                    if (c.FailureModeId != ChildId)
                    {
                        Calculation.Add(c.CriticalityFactor);
                        prescriptiveModel.failureModes.Add(c);
                    }


                }

                var CF = Calculation.Sum();

                //prescriptiveModel.ComponentCriticalityFactor = CF;

                RCM centrifugalPumpPrescriptiveModel = await _context.RCMs.FindAsync(prescriptiveModel.RCMId);
                centrifugalPumpPrescriptiveModel.failureModes = prescriptiveModel.failureModes;
                centrifugalPumpPrescriptiveModel.FailureModeWithLSETree = prescriptiveModel.FailureModeWithLSETree;
                centrifugalPumpPrescriptiveModel.FMWithConsequenceTree = prescriptiveModel.FMWithConsequenceTree;
                //centrifugalPumpPrescriptiveModel.ComponentCriticalityFactor = prescriptiveModel.ComponentCriticalityFactor;
                //centrifugalPumpPrescriptiveModel.ComponentRating = prescriptiveModel.ComponentRating;
                //centrifugalPumpPrescriptiveModel.CMaintainenancePractice = prescriptiveModel.CMaintainenancePractice;
                //centrifugalPumpPrescriptiveModel.CFrequencyMaintainenance = prescriptiveModel.CFrequencyMaintainenance;
                //centrifugalPumpPrescriptiveModel.CConditionMonitoring = prescriptiveModel.CConditionMonitoring;
                _context.Entry(centrifugalPumpPrescriptiveModel).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                string con = CentrifugalPumpPrescriptiveFailureModeData[0].Consequence.Substring(0, 1);
                if (con == "A")
                {
                    var MSSData = await _context.MSS.Where(a => a.FailureModeId == ChildId && a.MSSStartergy == "A-FFT (Failure Finding Task)").ToListAsync();
                    if (MSSData.Count != 0)
                    {
                        double availablility = Convert.ToDouble(MSSData[0].MSSFinalAvaliability);
                        var LN = Math.Log((2 * (availablility / 100)) - 1);
                        var INTERVAl = -(MTBF * LN);
                        var intervalWeek = (INTERVAl * 365) / 7;
                        MSSData[0].MSSMaintenanceInterval = intervalWeek + " " + "weeks";
                        _context.Entry(MSSData[0]).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                    }
                }

            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!RCM(prescriptiveModel.RCMId))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
            }

            return Ok(prescriptiveModel.FMWithConsequenceTree);
        }

        [HttpPut]
        [Route("FunctionModeAndConsequenceUpdate")]
        public async Task<IActionResult> FunctionModeAndConsequenceUpdate(RCM prescriptiveModel)
        {
            try
            {
                List<int> Calculation = new List<int>();

                var CentrifugalPumpPrescriptiveFailureModeData = prescriptiveModel.failureModes;
                var ToAddMMS = CentrifugalPumpPrescriptiveFailureModeData[0].MSS;
                prescriptiveModel.failureModes = new List<FailureModes>();

                var CFData = await _context.FailureModes.Where(a => a.RCMId == prescriptiveModel.RCMId)
                                                           .Include(a => a.MSS)
                                                           .ToListAsync();

                foreach (var c in CFData)
                {
                    Calculation.Add(c.CriticalityFactor);
                    prescriptiveModel.failureModes.Add(c);

                }

                foreach (var item in CentrifugalPumpPrescriptiveFailureModeData)
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

                    prescriptiveModel.failureModes.Add(item);

                }



                var CF = Calculation.Sum();

                //prescriptiveModel.ComponentCriticalityFactor = CF;


                //if (CF > 1000)
                //{
                //    prescriptiveModel.ComponentRating = "A";
                //    prescriptiveModel.CMaintainenancePractice = "CBM and OBM Both";
                //    prescriptiveModel.CFrequencyMaintainenance = "Daily Condition Monitoring, or Online Monitoring";
                //    prescriptiveModel.CConditionMonitoring = "Vibration Monitoring";
                //}
                //else if ((500 < CF) && (CF < 1000))
                //{
                //    prescriptiveModel.ComponentRating = "B";
                //    prescriptiveModel.CMaintainenancePractice = "OBM";
                //    prescriptiveModel.CFrequencyMaintainenance = "Twice a week Condition Monitoring";
                //    prescriptiveModel.CConditionMonitoring = "Vibration Monitoring";
                //}
                //else if ((200 < CF) && (CF <= 500))
                //{
                //    prescriptiveModel.ComponentRating = "C";
                //    prescriptiveModel.CMaintainenancePractice = "PM";
                //    prescriptiveModel.CFrequencyMaintainenance = "Weekly Condition Monitoring";
                //    prescriptiveModel.CConditionMonitoring = "Vibration Monitoring";
                //}
                //else if ((100 < CF) && (CF <= 200))
                //{
                //    prescriptiveModel.ComponentRating = "D";
                //    prescriptiveModel.CMaintainenancePractice = "TBM";
                //    prescriptiveModel.CFrequencyMaintainenance = "Half of PF interval, typically Monthly or fortnightly, time based maintenance";
                //    prescriptiveModel.CConditionMonitoring = "Not Answered";
                //}
                //else if ((0 < CF) && (CF < 100))
                //{
                //    prescriptiveModel.ComponentRating = "E";
                //    prescriptiveModel.CMaintainenancePractice = "Breakdown Maintenance";
                //    prescriptiveModel.CFrequencyMaintainenance = "All the time of Failure";
                //    prescriptiveModel.CConditionMonitoring = "Not Answered";
                //}


                RCM centrifugalPumpPrescriptiveModelData = await _context.RCMs.FindAsync(prescriptiveModel.RCMId);
                centrifugalPumpPrescriptiveModelData.failureModes = null;
                centrifugalPumpPrescriptiveModelData.FailureModeWithLSETree = prescriptiveModel.FailureModeWithLSETree;
                centrifugalPumpPrescriptiveModelData.FMWithConsequenceTree = prescriptiveModel.FMWithConsequenceTree;
                //centrifugalPumpPrescriptiveModelData.CriticalityFactor = prescriptiveModel.CriticalityFactor;
                //centrifugalPumpPrescriptiveModelData.ComponentRating = prescriptiveModel.ComponentRating;
                //centrifugalPumpPrescriptiveModelData.CMaintainenancePractice = prescriptiveModel.CMaintainenancePractice;
                //centrifugalPumpPrescriptiveModelData.CFrequencyMaintainenance = prescriptiveModel.CFrequencyMaintainenance;
                //centrifugalPumpPrescriptiveModelData.CConditionMonitoring = prescriptiveModel.CConditionMonitoring;
                _context.Entry(centrifugalPumpPrescriptiveModelData).State = EntityState.Modified;

                await _context.SaveChangesAsync();


                var ToAddFM = prescriptiveModel.failureModes;

                foreach (var item in ToAddFM)
                {
                    if (item.FailureModeId == 0)
                    {
                        item.FailureModeId = 0;
                        var MSSTasks = item.MSS;
                        item.MSS = null;
                        _context.FailureModes.Add(item);
                        await _context.SaveChangesAsync();
                        foreach (var task in MSSTasks)
                        {
                            task.MSSId = 0;
                            task.FailureModeId = item.FailureModeId;
                            _context.MSS.Add(task);
                            await _context.SaveChangesAsync();
                        }
                    }
                    else
                    {
                        List<MSS> MssData = await _context.MSS.Where(a => a.FailureModeId == item.FailureModeId).ToListAsync();
                        item.FailureModeId = 0;
                        var MSSTasks = item.MSS;
                        item.MSS = null;
                        _context.FailureModes.Add(item);
                        await _context.SaveChangesAsync();
                        foreach (var task in MSSTasks)
                        {
                            task.MSSId = 0;
                            task.FailureModeId = item.FailureModeId;
                            _context.MSS.Add(task);
                            await _context.SaveChangesAsync();
                        }
                        //foreach (var mssItem in MssData)
                        //{
                        //    _context.MSS.Remove(mssItem);
                        //    await _context.SaveChangesAsync();
                        //    mssItem.MSSId = 0;
                        //    mssItem.FailureModeId = item.FailureModeId;
                        //    _context.MSS.Add(mssItem);
                        //    await _context.SaveChangesAsync();
                        //}
                    }
                }


                //foreach (var item in ToAddMMS)
                //{
                //    item.MSSId = 0;
                //    item.FailureModeId = ToAddFM[ToAddFM.Count - 1].FailureModeId;
                //    _context.MSS.Add(item);
                //    await _context.SaveChangesAsync();
                //}

                return Ok(ToAddFM);

            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
            //catch (DbUpdateConcurrencyException)
            //{
            //    //if (!RCMExists(prescriptiveModel.RCMId))
            //    //{
            //    //    return NotFound();
            //    //}
            //    //else
            //    //{
            //    //    throw;
            //    //}
            //}
        }

        [HttpPut]
        [Route("UpdatePrespectivePattern")]
        public async Task<IActionResult> PutUpdatePrespectivePattern(RCM prescriptiveModel)
        {

            try
            {
                //string userId = User.Claims.First(c => c.Type == "UserID").Value;
                List<RCM> centrifugalPumpPrescriptiveModel = await _context.RCMs.Where(a => a.RCMId == prescriptiveModel.RCMId)
                                                                                                                  .Include(a => a.failureModes)
                                                                                                                  .ToListAsync();
                centrifugalPumpPrescriptiveModel[0].FMWithConsequenceTree = prescriptiveModel.FMWithConsequenceTree;

                _context.Entry(centrifugalPumpPrescriptiveModel[0]).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                var collection = centrifugalPumpPrescriptiveModel[0].failureModes.ToList();
                foreach (var item in collection)
                {
                    if (item.FailureModeId == prescriptiveModel.failureModes[0].FailureModeId)
                    {
                        item.Pattern = prescriptiveModel.failureModes[0].Pattern;
                        item.FCACondition = prescriptiveModel.failureModes[0].FCACondition;
                        item.FCAInterval = prescriptiveModel.failureModes[0].FCAInterval;
                        item.FCAFFI = prescriptiveModel.failureModes[0].FCAFFI;
                        item.FCAAlpha = prescriptiveModel.failureModes[0].FCAAlpha;
                        item.FCABeta = prescriptiveModel.failureModes[0].FCABeta;
                        item.FCASafeLife = prescriptiveModel.failureModes[0].FCASafeLife;
                        item.FCAUsefulLife = prescriptiveModel.failureModes[0].FCAUsefulLife;
                        item.FCAUpdateConditions = prescriptiveModel.failureModes[0].FCAUpdateConditions;
                        item.FCAUpdateIntervals = prescriptiveModel.failureModes[0].FCAUpdateIntervals;
                        item.FCAComment = prescriptiveModel.failureModes[0].FCAComment;
                        _context.Entry(item).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                        break;
                    }

                }

                return Ok();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }

        }

        [HttpDelete]
        [Route("DeletePrespectiveModel")]
        public async Task<IActionResult> DeletePrespectiveModel(int id)
        {
            try
            {

                var prescriptiveModel = _context.RCMs.Where(a => a.RCMId == id)
                                                         .Include(a => a.failureModes)
                                                         .ThenInclude(a => a.MSS)
                                                         .First();
                if (prescriptiveModel == null)
                {
                    return NotFound();
                }

                //RecycleBinCentrifugalPumpPrescriptiveModel recyclePM = new RecycleBinCentrifugalPumpPrescriptiveModel();
                //RestoreCentrifugalPumpPrescriptiveFailureMode recycleChild = new RestoreCentrifugalPumpPrescriptiveFailureMode();
                //recyclePM.restoreCentrifugalPumpPrescriptiveFailureModes = new List<RestoreCentrifugalPumpPrescriptiveFailureMode>();

                //recyclePM.CFPPrescriptiveId = prescriptiveModel.CFPPrescriptiveId;
                //recyclePM.UserId = prescriptiveModel.UserId;
                //recyclePM.MachineType = prescriptiveModel.MachineType;
                //recyclePM.EquipmentType = prescriptiveModel.EquipmentType;
                //recyclePM.TagNumber = prescriptiveModel.TagNumber;
                //recyclePM.FunctionFluidType = prescriptiveModel.FunctionFluidType;
                //recyclePM.FunctionFailure = prescriptiveModel.FunctionFailure;
                //recyclePM.Date = prescriptiveModel.Date;
                //recyclePM.FailureModeWithLSETree = prescriptiveModel.FailureModeWithLSETree;
                //recyclePM.FMWithConsequenceTree = prescriptiveModel.FMWithConsequenceTree;
                //recyclePM.ComponentCriticalityFactor = prescriptiveModel.ComponentCriticalityFactor;
                //recyclePM.ComponentRating = prescriptiveModel.ComponentRating;
                //recyclePM.CMaintainenancePractice = prescriptiveModel.CMaintainenancePractice;
                //recyclePM.CFrequencyMaintainenance = prescriptiveModel.CFrequencyMaintainenance;
                //recyclePM.CConditionMonitoring = prescriptiveModel.CConditionMonitoring;
                //recyclePM.CAttachmentDBPath = prescriptiveModel.CAttachmentDBPath;
                //recyclePM.CAttachmentFullPath = prescriptiveModel.CAttachmentFullPath;
                //recyclePM.CRemarks = prescriptiveModel.CRemarks;
                //recyclePM.FCAAdded = prescriptiveModel.FCAAdded;
                //recyclePM.restoreCentrifugalPumpPrescriptiveFailureModes = null;

                //_context.recycleCentrifugalPumpModelData.Add(recyclePM);
                //await _context.SaveChangesAsync();

                //int ID = recyclePM.RCPPMId;


                //foreach (var item in prescriptiveModel.centrifugalPumpPrescriptiveFailureModes)
                //{
                //    recycleChild.RCPFMId = 0;
                //    recycleChild.RCPPMId = ID;
                //    recycleChild.UserId = prescriptiveModel.UserId;
                //    recycleChild.CPPFMId = item.CPPFMId;
                //    recycleChild.CFPPrescriptiveId = item.CFPPrescriptiveId;
                //    recycleChild.FunctionMode = item.FunctionMode;
                //    recycleChild.LocalEffect = item.LocalEffect;
                //    recycleChild.SystemEffect = item.SystemEffect;
                //    recycleChild.Consequence = item.Consequence;
                //    recycleChild.DownTimeFactor = item.DownTimeFactor;
                //    recycleChild.ScrapeFactor = item.ScrapeFactor;
                //    recycleChild.SafetyFactor = item.SafetyFactor;
                //    recycleChild.ProtectionFactor = item.ProtectionFactor;
                //    recycleChild.FrequencyFactor = item.FrequencyFactor;
                //    recycleChild.CriticalityFactor = item.CriticalityFactor;
                //    recycleChild.Rating = item.Rating;
                //    recycleChild.MaintainenancePractice = item.MaintainenancePractice;
                //    recycleChild.FrequencyMaintainenance = item.FrequencyMaintainenance;
                //    recycleChild.ConditionMonitoring = item.ConditionMonitoring;
                //    recycleChild.AttachmentDBPath = item.AttachmentDBPath;
                //    recycleChild.AttachmentFullPath = item.AttachmentFullPath;
                //    recycleChild.Remark = item.Remark;
                //    recycleChild.Pattern = item.Pattern;
                //    recycleChild.FCACondition = item.FCACondition;
                //    recycleChild.FCAInterval = item.FCAInterval;
                //    recycleChild.FCAFFI = item.FCAFFI;
                //    recycleChild.FCAComment = item.FCAComment;
                //    recycleChild.IsDeleted = 0;
                //    _context.restoreCentrifugalPumpPrescriptiveFailureModes.Add(recycleChild);
                //    await _context.SaveChangesAsync();

                //}
                _context.RCMs.Remove(prescriptiveModel);
                await _context.SaveChangesAsync();
                if (prescriptiveModel.CBAAdded == "1")
                {
                    var cbamodel = _context.PrescriptiveCbaModels.Where(a => a.RCMId == id)
                                                         .Include(a => a.CBAFailureModes)
                                                         .ThenInclude(a => a.CBAMaintenanceTasks)
                                                         .ThenInclude(a => a.CBAMainenanceIntervals)
                                                         .First();
                    if (cbamodel == null)
                    {
                        return NotFound();
                    }
                    _context.PrescriptiveCbaModels.Remove(cbamodel);
                    await _context.SaveChangesAsync();
                }
                return NoContent();

            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }


        [HttpPut]
        [Route("FailureModeDelete")]
        public async Task<IActionResult> PutPrespectiveFailureModel(RCM obj)
        {
            //var MinusCF = 0;
            //string userId = User.Claims.First(c => c.Type == "UserID").Value;
            //RecycleBinCentrifugalPumpPrescriptiveModel recyclePM = new RecycleBinCentrifugalPumpPrescriptiveModel();
            //RestoreCentrifugalPumpPrescriptiveFailureMode recycleChild = new RestoreCentrifugalPumpPrescriptiveFailureMode();
            //recyclePM.restoreCentrifugalPumpPrescriptiveFailureModes = new List<RestoreCentrifugalPumpPrescriptiveFailureMode>();
            foreach (var mode in obj.failureModes)
            {
                FailureModes FailuerMode = await _context.FailureModes.FindAsync(mode.FailureModeId);
                //MinusCF = FailuerMode.CriticalityFactor;
                _context.FailureModes.Remove(FailuerMode);

                var mssModel = await _context.MSS.Where(a => a.FailureModeId == mode.FailureModeId).ToListAsync();
                foreach (var MSSItem in mssModel)
                {
                    _context.MSS.Remove(MSSItem);
                }

                //recycleChild.RCPPMId = 0;
                //recycleChild.UserId = userId;
                //recycleChild.CPPFMId = FailuerMode.CPPFMId;
                //recycleChild.CFPPrescriptiveId = FailuerMode.CFPPrescriptiveId;
                //recycleChild.FunctionMode = FailuerMode.FunctionMode;
                //recycleChild.LocalEffect = FailuerMode.LocalEffect;
                //recycleChild.SystemEffect = FailuerMode.SystemEffect;
                //recycleChild.Consequence = FailuerMode.Consequence;
                //recycleChild.DownTimeFactor = FailuerMode.DownTimeFactor;
                //recycleChild.ScrapeFactor = FailuerMode.ScrapeFactor;
                //recycleChild.SafetyFactor = FailuerMode.SafetyFactor;
                //recycleChild.ProtectionFactor = FailuerMode.ProtectionFactor;
                //recycleChild.FrequencyFactor = FailuerMode.FrequencyFactor;
                //recycleChild.CriticalityFactor = FailuerMode.CriticalityFactor;
                //recycleChild.Rating = FailuerMode.Rating;
                //recycleChild.MaintainenancePractice = FailuerMode.MaintainenancePractice;
                //recycleChild.FrequencyMaintainenance = FailuerMode.FrequencyMaintainenance;
                //recycleChild.ConditionMonitoring = FailuerMode.ConditionMonitoring;
                //recycleChild.AttachmentDBPath = FailuerMode.AttachmentDBPath;
                //recycleChild.AttachmentFullPath = FailuerMode.AttachmentFullPath;
                //recycleChild.Remark = FailuerMode.Remark;
                //recycleChild.Pattern = FailuerMode.Pattern;
                //recycleChild.FCACondition = FailuerMode.FCACondition;
                //recycleChild.FCAInterval = FailuerMode.FCAInterval;
                //recycleChild.FCAFFI = FailuerMode.FCAFFI;
                //recycleChild.FCAComment = FailuerMode.FCAComment;
                //recycleChild.IsDeleted = 1;
                //recycleChild.DeletedFMTree = obj.FunctionFailure;

            }

            //CentrifugalPumpPrescriptiveModel centrifugalPumpPrescriptiveModel = await _context.PrescriptiveModelData.FindAsync(obj.CFPPrescriptiveId);
            //var CCF = centrifugalPumpPrescriptiveModel.ComponentCriticalityFactor;
            //var CF = CCF - MinusCF;

            //centrifugalPumpPrescriptiveModel.ComponentCriticalityFactor = CF;

            //if (CF > 1000)
            //{
            //    centrifugalPumpPrescriptiveModel.ComponentRating = "A";
            //    centrifugalPumpPrescriptiveModel.CMaintainenancePractice = "CBM and OBM Both";
            //    centrifugalPumpPrescriptiveModel.CFrequencyMaintainenance = "Daily Condition Monitoring, or Online Monitoring";
            //    centrifugalPumpPrescriptiveModel.CConditionMonitoring = "Vibration Monitoring";
            //}
            //else if ((500 < CF) && (CF < 1000))
            //{
            //    centrifugalPumpPrescriptiveModel.ComponentRating = "B";
            //    centrifugalPumpPrescriptiveModel.CMaintainenancePractice = "OBM";
            //    centrifugalPumpPrescriptiveModel.CFrequencyMaintainenance = "Twice a week Condition Monitoring";
            //    centrifugalPumpPrescriptiveModel.CConditionMonitoring = "Vibration Monitoring";
            //}
            //else if ((200 < CF) && (CF <= 500))
            //{
            //    centrifugalPumpPrescriptiveModel.ComponentRating = "C";
            //    centrifugalPumpPrescriptiveModel.CMaintainenancePractice = "PM";
            //    centrifugalPumpPrescriptiveModel.CFrequencyMaintainenance = "Weekly Condition Monitoring";
            //    centrifugalPumpPrescriptiveModel.CConditionMonitoring = "Vibration Monitoring";
            //}
            //else if ((100 < CF) && (CF <= 200))
            //{
            //    centrifugalPumpPrescriptiveModel.ComponentRating = "D";
            //    centrifugalPumpPrescriptiveModel.CMaintainenancePractice = "TBM";
            //    centrifugalPumpPrescriptiveModel.CFrequencyMaintainenance = "Half of PF interval, typically Monthly or fortnightly, time based maintenance";
            //    centrifugalPumpPrescriptiveModel.CConditionMonitoring = "Not Answered";
            //}
            //else if ((0 < CF) && (CF < 100))
            //{
            //    centrifugalPumpPrescriptiveModel.ComponentRating = "E";
            //    centrifugalPumpPrescriptiveModel.CMaintainenancePractice = "Breakdown Maintenance";
            //    centrifugalPumpPrescriptiveModel.CFrequencyMaintainenance = "All the time of Failure";
            //    centrifugalPumpPrescriptiveModel.CConditionMonitoring = "Not Answered";
            //}

            //_context.restoreCentrifugalPumpPrescriptiveFailureModes.Add(recycleChild);

            //centrifugalPumpPrescriptiveModel.FMWithConsequenceTree = obj.FMWithConsequenceTree;
            //centrifugalPumpPrescriptiveModel.FailureModeWithLSETree = obj.FailureModeWithLSETree;
            //_context.Entry(centrifugalPumpPrescriptiveModel).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/<FMEAAPIController>/5
        [HttpDelete]
        [Route("UpdateFileUpload")]
        public IActionResult DeleteUpdateFileUpload(string fullPath)
        {
            try
            {
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
