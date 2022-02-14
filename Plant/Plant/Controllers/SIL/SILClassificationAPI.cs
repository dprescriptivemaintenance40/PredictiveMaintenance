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
        [Route("SaveSheetData")]
        public async Task<ActionResult<SIFDesign>> SaveSheetData([FromBody] SIFDesign sifDesign)
        {
            try
            {
                //var impact = sifDesign.ImpactEvent;
                //sifDesign.ImpactEvent = new List<ImpactEvent>();
                //sifDesign.ImpactEvent = null;
                _Context.SIFDesign.Add(sifDesign);
                await _Context.SaveChangesAsync();
                //foreach (var item in impact)
                //{
                //    var Initiating = item.InitiatingCauses;
                //    foreach (var items in Initiating)
                //    {   
                //        var protection = items.ProtectionLayers;
             
                //        foreach (var protections in protection)
                //        {
                //            protections.ICId = 1;
                //            _Context.ProtectionLayer.Add(protections);
                //            await _Context.SaveChangesAsync();
                //        }
                //        items.ProtectionLayers = new List<ProtectionLayer>();
                //        items.ProtectionLayers = null;
                //        items.IEId = 1;
                //        _Context.InitiatingCause.Add(items);
                //        await _Context.SaveChangesAsync();
                //    }
                //    item.SIFId = sifDesign.Id;
                //    item.InitiatingCauses = new List<InitiatingCause>();
                //    item.InitiatingCauses =null;
                //    _Context.ImpactEvent.Add(item);
                //   await _Context.SaveChangesAsync();
                //}

                 return Ok();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
         
        }

        // PUT api/<SILClassificationAPI>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SILClassificationAPI>/5
        [HttpDelete]
        [Route("DeleteSheetData")]
        public async Task<IActionResult> DeleteSheetData(int Id)
        {
            try
            {

                var SifData = _Context.SIFDesign.Where(a => a.Id == Id)
                                        .Include(a => a.ImpactEvent)
                                        .ThenInclude(a => a.InitiatingCauses)
                                        .ThenInclude(a => a.ProtectionLayers).First();
                _Context.SIFDesign.Remove(SifData);
                await _Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }
    }
}
