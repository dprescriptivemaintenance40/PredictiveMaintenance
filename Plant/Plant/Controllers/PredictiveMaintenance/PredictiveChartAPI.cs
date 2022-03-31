using Microsoft.AspNetCore.Mvc;
using CsvHelper;
using System.IO;
using System.Globalization;
using System.Linq;
using Plant.Models.PredictiveMaintenance.PredictiveChart;
using Plant.DAL;
using Microsoft.EntityFrameworkCore;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers.PredictiveMaintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class PredictiveChartAPI : ControllerBase
    {
        private readonly PlantDBContext _Context;

        public PredictiveChartAPI(PlantDBContext plantDBContext)
        {
            _Context = plantDBContext;

        }
        // GET: api/<PredictiveChart>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        [Route("GetPrescriptiveCsvData")]
        public async Task<ActionResult<IEnumerable<PredictiveChart>>> GetData()
        {
            try
            {
                return await _Context.PredictiveCharts.ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET api/<PredictiveChart>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PredictiveChart>
        [HttpPost]
        public IEnumerable<string> Post()
        {
            try
            {
                string PredictiveDataCSVPath = @"E:\DPMNewPortal\PredictiveMaintenance\Plant\Plant\DemoData1.csv";
                using (var streamReader = new StreamReader(PredictiveDataCSVPath))
                {
                    using (var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture))
                    {
                        var PredictiveCsvRecord = csvReader.GetRecords<PredictiveChart>().ToList();
                        foreach (var predictivecsvRecords in PredictiveCsvRecord)
                        {
                            PredictiveChart predictiveCharts = new PredictiveChart();
                            predictiveCharts.Date = predictivecsvRecords.Date;
                            predictiveCharts.td1new = predictivecsvRecords.td1new;
                            predictiveCharts.td1predicted = predictivecsvRecords.td1predicted;
                            _Context.PredictiveCharts.Add(predictiveCharts);
                            _Context.SaveChanges();
                            //predictiveCharts.Events = predictivecsvRecords.Events;
                        }
                    }
                }
             
                return new string[] { "Success" };
            }
            catch (Exception exe)
            {
                throw;
            }
        }

        // PUT api/<PredictiveChart>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PredictiveChart>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
