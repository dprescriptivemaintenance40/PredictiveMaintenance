using CsvHelper;
using KiranaPasalManagementSystem.Response;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Plant.DAL;
using Plant.Models.Plant;
using System.Reflection;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers.PredictiveMaintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadingAPI : ControllerBase
    {
        private readonly PlantDBContext _Context;
        private readonly IConfiguration _config;
        
        public FileUploadingAPI(PlantDBContext plantDBContext, IConfiguration config)
        {
            _Context = plantDBContext;
            _config = config;
        }

        [HttpGet]
        [Route("GetAsset")]
        public IActionResult Get()
        {
            List<object> batch = new List<object>();
            List<object> subAsset = new List<object>();
            List<object> asset = new List<object>();
            //var asset = 0;
            List<mst_Asset> assetTable = _Context.mst_Asset.ToList<mst_Asset>();
            foreach (var b in assetTable)
            {
                if (b.Id_fk == null)
                {
                    asset.Add(b.AssetId);
                }
                else
                {
                    foreach (var a in asset)
                    {
                        if (b.Id_fk == Convert.ToInt32(a))
                        {
                            subAsset.Add(b.AssetId);
                        }
                    }
                }
                if (subAsset.Count != 0)
                {
                    foreach (var sa in subAsset)
                    {
                        if (b.Id_fk == Convert.ToInt32(sa))
                        {
                            batch.Add(b.AssetName);
                        }
                    }
                }
            }
            return Ok(batch);
        }

        // GET: api/<ValuesController>
        [HttpGet]
        [Route("GetBatch")]
        public IActionResult GetBatch()
        {
            List<object> batch = new List<object>();
            List<Asset_FailureMode> batchTable = _Context.Asset_FailureMode.ToList<Asset_FailureMode>();
            if (batchTable != null)
            {
                foreach (var b in batchTable)
                {
                    Asset_Equipment equipment = _Context.Asset_Equipments.Where(a => a.Id == b.EquipmentId).FirstOrDefault();
                    if (equipment.AssetName == "ScrewCompressor")
                    {
                        List<object> list = new List<object>();
                        list.Add(b);
                        var staging = _Context.ScrewStagingTables.Where(r => r.SPId == b.Id).Count();
                        list.Add(staging);
                        var cleaning = _Context.ScrewCleaningTables.Where(r => r.SPId == b.Id).Count();
                        list.Add(cleaning);
                        var errors = _Context.ScrewErrorTables.Where(r => r.SPId == b.Id).ToList();
                        list.Add(errors);
                        list.Add(equipment.AssetName);
                        batch.Add(list);
                    }
                    else if (equipment.AssetName == "CentrifugalCompressor" || equipment.AssetName == "CentrifugalPump")
                    {
                        List<object> list = new List<object>();
                        list.Add(b);
                        var staging = _Context.CentrifugalStagingTables.Where(r => r.CPId == b.Id).Count();
                        list.Add(staging);
                        var cleaning = _Context.CentrifugalCleaningTables.Where(r => r.CPId == b.Id).Count();
                        list.Add(cleaning);
                        var errors = _Context.CentrifugalErrorTables.Where(r => r.CPId == b.Id).ToList();
                        list.Add(errors);
                        list.Add(equipment.AssetName);
                        batch.Add(list);
                    }
                    else if (equipment.AssetName == "ReciprocatingCompressor" || equipment.AssetName == "ReciprocatingPump" || equipment.AssetName == "Rotary Pump")
                    {
                        List<object> list = new List<object>();
                        list.Add(b);
                        var staging = _Context.ReciprocatingStagingTables.Where(r => r.RPId == b.Id).Count();
                        list.Add(staging);
                        var cleaning = _Context.ReciprocatingCleaningTables.Where(r => r.RPId == b.Id).Count();
                        list.Add(cleaning);
                        var errors = _Context.ReciprocatingErrorTables.Where(r => r.RPId == b.Id).ToList();
                        list.Add(errors);
                        list.Add(equipment.AssetName);
                        batch.Add(list);
                    }
                }
            }
            return Ok(batch);
        }

        [HttpGet]
        [Route("GetBatchRecords")]
        public IActionResult GetBatchRecords()

        {
            List<object> batch = new List<object>();
            List<Asset_FailureMode> batchTable = _Context.Asset_FailureMode.ToList<Asset_FailureMode>();
            foreach (var b in batchTable)
            {
                List<object> list = new List<object>();
                list.Add(b);
                //var process = _Context.ProcessedTableSingles.Where(r => r.BatchId == b.Id).ToList();
                //list.Add(process);
                //var prediction = _Context.PredictedTableSingles.Where(r => r.BatchId == b.Id).ToList();
                //list.Add(prediction);
                batch.Add(list);
            }
            return Ok(batch);
        }
        
        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost("Upload")]
        public IActionResult Upload([FromForm] string Asset, [FromForm] string TagNumber, [FromForm] string FailureModeName)
        {
            try
            {
                var file = Request.Form.Files[0];
                string FilePath = @"G:\DPMBGProcess\BGAutomateProcess\Tasks\DataFiles";
                //   string newPath = Path.Combine(Guid.NewGuid().ToString() + '_' + folderName);
                if (file.Length > 0)
                {
                    var fName = Path.GetFileName(file.FileName);
                    // var fileName = file.FileName + "_" + DateTime.Now.ToString("yyyyMMddHHmmss") + "_";
                    Asset_Equipment equipment = new Asset_Equipment();
                    equipment.TagNumber = TagNumber;
                    equipment.AssetName = Asset;
                    _Context.Asset_Equipments.Add(equipment);
                    _Context.SaveChanges();

                    Asset_FailureMode batch = new Asset_FailureMode();
                    string batchname = "user";
                    batch.Description = batchname + "_" + Guid.NewGuid();
                    batch.FailureModeName = FailureModeName;
                    DateTime now = DateTime.Now;
                    batch.DateTimeBatchUploaded = now.ToString();
                    batch.EquipmentId = equipment.Id;
                    batch.IsProcessCompleted = 1;
                    batch.DateTimeBatchCompleted = "Batch is processing";
                    var values = batch;
                    _Context.Asset_FailureMode.Add(batch);
                    _Context.SaveChanges();
                    string destinationFileName = FilePath + "\\" + batch.Description + ".csv";
                    var fullPath = Path.Combine(FilePath, destinationFileName);
                    using (var fl = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(fl);
                    }
                    return Ok(values);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<ValuesController>
        [HttpPost]
        [Route("StagingTableCompressor")]
        public IEnumerable<string> StagingTableCompressor()
        {
            //List<> edge = _Context.Edges.ToList<Edge>();
            //var firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
            //var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
            return new string[] { "value1", "value2" };
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
