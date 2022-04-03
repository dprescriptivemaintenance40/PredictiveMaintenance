using Microsoft.AspNetCore.Mvc;
using CsvHelper;
using System.IO;
using System.Globalization;
using System.Linq;
using Plant.Models.PredictiveMaintenance.PredictiveChart;
using Plant.DAL;
using Microsoft.EntityFrameworkCore;
using Plant.Models.PredictiveMaintenance.ModelConfidence;
using Plant.Models.PredictiveMaintenance.DataExplanation;
using Plant.Models.PredictiveMaintenance;
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

        [HttpGet]
        [Route("GetModelConfidenceCsvData")]
        public async Task<ActionResult<IEnumerable<ModelConfidence>>> GetModelConfidenceCsvData()
        {
            try
            {
                return await _Context.ModelConfidences.ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpGet]
        [Route("GetDataExplanation")]
        public async Task<ActionResult<IEnumerable<DataExplanation>>> GetDataExplanation()
        {
            try
            {
                return await _Context.DataExplanations.ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpGet]
        [Route("GetPredictivePercentage")]
        public async Task<ActionResult<IEnumerable<PredictivePercentage>>> GetPredictivePercentage()
        {
            try
            {
                return await _Context.PredictivePercentages.ToListAsync();
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
                string PredictiveDataCSVPath = @"G:\PredictiveMaintenance\Plant\Plant\DemoData1.csv";
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

        [HttpPost]
        [Route("PostConfidenceData")]
        public IEnumerable<string> PostConfidenceData()
        {
            try
            {
                string PredictiveDataCSVPath = @"E:\DPMNewPortal\PredictiveMaintenance\Plant\Plant\ModelConfidence.csv";
                using (var streamReader = new StreamReader(PredictiveDataCSVPath))
                {
                    using (var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture))
                    {
                        var PredictiveCsvRecord = csvReader.GetRecords<ModelConfidence>().ToList();
                        foreach (var predictivecsvRecords in PredictiveCsvRecord)
                        {
                            ModelConfidence modelConfidence = new ModelConfidence();
                            modelConfidence.Date = predictivecsvRecords.Date;
                            modelConfidence.ValueNew = predictivecsvRecords.ValueNew;
                            modelConfidence.ValuePredicted = predictivecsvRecords.ValuePredicted;
                            _Context.ModelConfidences.Add(modelConfidence);
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

        [HttpPost]
        [Route("PostSeasonalAccuracyData")]
        public IEnumerable<string> PostSeasonalAccuracyData()
        {
            try
            {
                string PredictiveDataCSVPath = @"E:\DPMNewPortal\PredictiveMaintenance\Plant\Plant\SeasonalAccuracyMap.csv";
                using (var streamReader = new StreamReader(PredictiveDataCSVPath))
                {
                    using (var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture))
                    {
                        var DataExplanationRecord = csvReader.GetRecords<DataExplanation>().ToList();
                        foreach (var DataExplanationRecords in DataExplanationRecord)
                        {
                            DataExplanation dataExplanation = new DataExplanation();
                            dataExplanation.MonthYear = DataExplanationRecords.MonthYear;
                            dataExplanation.Td1LowerLimit = DataExplanationRecords.Td1LowerLimit;
                            dataExplanation.Difflowerlimit = DataExplanationRecords.Difflowerlimit;
                            dataExplanation.Td1UpperLimit = DataExplanationRecords.Td1UpperLimit;
                            dataExplanation.Diffupperlimit = DataExplanationRecords.Diffupperlimit;
                            _Context.DataExplanations.Add(dataExplanation);
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
        [HttpPost]
        [Route("PostPredictivePercentageData")]
        public IEnumerable<string> PostPredictivePercentageData()
        {
            try
            {
                string PredictiveDataCSVPath = @"E:\DPMNewPortal\PredictiveMaintenance\Plant\Plant\PredictivePercentageData.csv";
                using (var streamReader = new StreamReader(PredictiveDataCSVPath))
                {
                    using (var csvReader = new CsvReader(streamReader, CultureInfo.InvariantCulture))
                    {
                        var PredictivePercentageRecord = csvReader.GetRecords<PredictivePercentage>().ToList();
                        foreach (var PredictivePercentageRecords in PredictivePercentageRecord)
                        {
                            PredictivePercentage predictivePercentage = new PredictivePercentage();
                            predictivePercentage.Date = PredictivePercentageRecords.Date;
                            predictivePercentage.Predicted = PredictivePercentageRecords.Predicted;
                            predictivePercentage.Historical = PredictivePercentageRecords.Historical;
                            predictivePercentage.Difference = PredictivePercentageRecords.Difference;
                            predictivePercentage.Percentage = PredictivePercentageRecords.Percentage;
                            _Context.PredictivePercentages.Add(predictivePercentage);
                            _Context.SaveChanges();
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
