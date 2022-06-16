using CsvHelper;
using KiranaPasalManagementSystem.Response;
using Microsoft.AspNetCore.Mvc;
using Plant.DAL;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers.PredictiveMaintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompressorProcessAPI : ControllerBase
    {
        private readonly PlantDBContext _Context;
        public CompressorProcessAPI(PlantDBContext plantDBContext)
        {
            _Context = plantDBContext;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
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
