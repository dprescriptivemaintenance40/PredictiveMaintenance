using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Plant.DAL;
using Plant.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers.SIL
{
    [Route("api/[controller]")]
    [ApiController]
    public class SILClassificationAPI : ControllerBase
    {
        private readonly PlantDBContext _Context;
        public SILClassificationAPI(PlantDBContext plantDBContext)
        {
            _Context = plantDBContext;
        }
        
        // GET: api/<SILClassificationAPI>
        [HttpGet]
        [Route("GetMasterData")]
        public async Task<ActionResult<IEnumerable<SILClassificationMaster>>> GetMasterData()
        {
            try
            {
                return await _Context.SilClassificationMaster
                                      .Include(a => a.riskMatrixMaster)
                                      .ThenInclude(a =>a.Category)
                                      .Include(a => a.riskMatrixMaster)
                                      .ThenInclude(a => a.Severity)
                                      .Include(a => a.initiatingCausesMaster)
                                      .OrderBy(a => a.SILCMasterId)
                                      .ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET api/<SILClassificationAPI>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SILClassificationAPI>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SILClassificationAPI>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SILClassificationAPI>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
