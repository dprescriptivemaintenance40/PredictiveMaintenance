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

        [HttpGet]
        [Route("GetSILClassificationData")]
        public async Task<ActionResult<IEnumerable<SIFDesign>>> GetSILClassificationData()
        {
            try
            {
                return await _Context.SIFDesign.Include(a => a.ImpactEvents)
                                                .ThenInclude(a => a.RiskMatrix)
                                                .ThenInclude(a => a.InitiatingCauses)
                                                .ThenInclude(a => a.ProtectionLayers)
                                                .OrderBy(a => a.Id)
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
        public async Task<ActionResult<List<SIFDesign>>> SaveSheetData([FromBody] List<SIFDesign> sifDesigns)
        {
            try
            {
                foreach (var sifDesign in sifDesigns)
                {
                    SIFDesign sifDesignObj = new SIFDesign();
                    sifDesignObj.HazopNodeId = sifDesign.HazopNodeId;
                    sifDesignObj.InterLockTag = sifDesign.InterLockTag;
                    sifDesignObj.Sensor = sifDesign.Sensor;
                    sifDesignObj.FinalElement = sifDesign.FinalElement;
                    sifDesignObj.SIFDescription = sifDesign.SIFDescription;
                    sifDesignObj.RiskMatrix = sifDesign.RiskMatrix;
                    sifDesignObj.TargetSIL = sifDesign.TargetSIL;
                    var impacts = sifDesign.ImpactEvents;
                    sifDesign.ImpactEvents = new List<ImpactEvent>();
                    sifDesign.ImpactEvents = null;
                    _Context.SIFDesign.Add(sifDesignObj);
                    await _Context.SaveChangesAsync();
                    foreach (var impact in impacts)
                    {
                        ImpactEvent impactEvents = new ImpactEvent();
                        impactEvents.SIFId = sifDesignObj.Id;
                        impactEvents.ImpactEventDesciption = impact.ImpactEventDesciption;
                        _Context.ImpactEvent.Add(impactEvents);
                        await _Context.SaveChangesAsync();
                        var riskmatrixs = impact.RiskMatrix;
                        foreach (var riskmatrix in riskmatrixs)
                        {
                            RiskMatrix risk = new RiskMatrix();
                            risk.IEId = impactEvents.Id;
                            risk.Category = riskmatrix.Category;
                            risk.Severity = riskmatrix.Severity;
                            risk.TRF = riskmatrix.TRF;
                            _Context.RiskMatrix.Add(risk);
                            await _Context.SaveChangesAsync();
                            var initcauses = riskmatrix.InitiatingCauses;
                            foreach (var initcause in initcauses)
                            {
                                InitiatingCause init = new InitiatingCause();
                                init.RMId = risk.RMId;
                                init.initiatingCause = initcause.initiatingCause;
                                init.PP = initcause.PP;
                                init.IP = initcause.IP;
                                init.IELE = initcause.IELE;
                                init.IELP = initcause.IELP;
                                init.IELA = initcause.IELA;
                                init.IEF = initcause.IEF;
                                init.TR = initcause.TR;
                                _Context.InitiatingCause.Add(init);
                                await _Context.SaveChangesAsync();
                                var protections = initcause.ProtectionLayers;
                              
                                foreach (var protection in protections)
                                {
                                    ProtectionLayer protectionLayers = new ProtectionLayer();
                                    protectionLayers.ICId = init.Id;
                                    protectionLayers.NameOfIPL = protection.NameOfIPL;
                                    protectionLayers.Description = protection.Description;
                                    protectionLayers.PFD = protection.PFD;
                                    _Context.ProtectionLayer.Add(protectionLayers);
                                    await _Context.SaveChangesAsync();
                                }
                            }
                        }
                       
                    }
                }
                return Ok();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
         
        }

        [HttpPost]
        [Route("SaveCalculations")]
        public async Task<IActionResult> SaveCalculation([FromBody] Calculation calculation)
        {
            try
            {
                _Context.Calculation.Add(calculation);
                 await _Context.SaveChangesAsync();
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSheetData(int id)
        {
            try
            {

                var SifData = _Context.SIFDesign.Where(a => a.Id == id)
                                        .Include(a => a.ImpactEvents)
                                        .ThenInclude(a => a.RiskMatrix)
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
