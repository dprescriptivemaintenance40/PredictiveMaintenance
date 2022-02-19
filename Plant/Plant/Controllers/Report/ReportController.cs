using Microsoft.AspNetCore.Mvc;
using Plant.DAL;
using Plant.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers.Report
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        public PlantDBContext? Db = null;
        public ReportController(PlantDBContext _Db)
        {
            this.Db = _Db;
        }
        // GET: api/<ReportController>
        [HttpGet]
        public IActionResult Get()
        {
            var rprtTemplate = Db.ReportTemplateMasters.ToList();
            return Ok(rprtTemplate);
        }

        // GET api/<ReportController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ReportController>
        [HttpPost]
        public IActionResult Post([FromBody] ReportTemplateMaster obj)
        {
            Db.Add(obj);
            Db.SaveChanges();
            return Ok();

        }

        // PUT api/<ReportController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ReportController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
