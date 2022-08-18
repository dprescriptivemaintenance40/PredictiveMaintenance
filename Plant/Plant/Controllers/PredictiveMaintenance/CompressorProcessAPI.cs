using CsvHelper;
using KiranaPasalManagementSystem.Response;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Plant.DAL;
using static Plant.Models.EquipmentTables.CompressorDataProcess;
using static Plant.Models.EquipmentTables.EquipmentDataProcess;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers.PredictiveMaintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompressorProcessAPI : ControllerBase
    {
        private readonly PlantDBContext _Context;
        private readonly IConfiguration _config;
        
        public CompressorProcessAPI(PlantDBContext plantDBContext, IConfiguration config)
        {
            _Context = plantDBContext;
            _config = config;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        [Route("GetBatch")]
        public IActionResult Get()
        {
            List<object> batch = new List<object>();
            List<BatchTable> batchTable = _Context.BatchTables.ToList<BatchTable>();
            foreach(var b in batchTable)
            {
                List<object> list = new List<object>();
                list.Add(b);
                var staging = _Context.StagingTableSingles.Where(r => r.BatchId == b.Id).Count();
                list.Add(staging);
                var cleaning = _Context.CleanTableSingles.Where(r => r.BatchId == b.Id).Count();
                list.Add(cleaning);
                var errors = _Context.ErrorTableSingles.Where(r => r.BatchId == b.Id).ToList();
                list.Add(errors);
                batch.Add(list);
            }
            return Ok(batch);
        }

        [HttpGet]
        [Route("GetBatchRecords")]
        public IActionResult GetBatchRecords()

        {
            List<object> batch = new List<object>();
            List<BatchTable> batchTable = _Context.BatchTables.ToList<BatchTable>();
            foreach (var b in batchTable)
            {
                List<object> list = new List<object>();
                list.Add(b);
                var process = _Context.ProcessedTableSingles.Where(r => r.BatchId == b.Id).ToList();
                list.Add(process);
                var prediction = _Context.PredictedTableSingles.Where(r => r.BatchId == b.Id).ToList();
                list.Add(prediction);
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
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                string FilePath = @"G:\DPMBGProcess\ConsoleApp106\Tasks\DataFiles";
                //   string newPath = Path.Combine(Guid.NewGuid().ToString() + '_' + folderName);
                if (file.Length > 0)
                {
                    var fName = Path.GetFileName(file.FileName);
                    // var fileName = file.FileName + "_" + DateTime.Now.ToString("yyyyMMddHHmmss") + "_";
                    BatchTable batch = new BatchTable();
                    string batchname = "user";
                    batch.Description = batchname + "_" + Guid.NewGuid();
                    DateTime now = DateTime.Now;
                    batch.DateTimeBatchUploaded = now.ToString();
                    batch.EquipmentProcessId = 1;
                    batch.EquipmentTblId = 1;
                    batch.IsCompleted = 1;
                    batch.DateTimeBatchCompleted = "Batch is processing";
                    var values = batch;
                    _Context.BatchTables.Add(batch);
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
