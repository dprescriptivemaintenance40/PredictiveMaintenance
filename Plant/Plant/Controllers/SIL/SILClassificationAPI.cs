using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Plant.DAL;
using Plant.Models;

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
                                      .ThenInclude(a => a.Category)
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

        [HttpGet]
        [Route("GetReport")]
        public async Task<ActionResult<IEnumerable<ReportMaster>>> GetReport()
        {
            try
            {
                return await _Context.ReportMasters
                                     .OrderByDescending(a => a.Id)
                                     .ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET api/<SILClassificationAPI>/5
        [HttpGet]
        [Route("GetSILData")]
        public async Task<ActionResult<IEnumerable<SIFDesign>>> GetSILData(int id)
        {
            try
            {
                
                return await _Context.SIFDesign.Where(a => a.Id == id)
                                               .Include(a => a.ImpactEvents)
                                                .ThenInclude(a => a.RiskMatrix)
                                                .ThenInclude(a => a.InitiatingCauses)
                                                .ThenInclude(a => a.ProtectionLayers)
                                                .Include(a => a.ImpactEvents)
                                                .ThenInclude(a => a.RiskMatrix)
                                                .ThenInclude(a => a.InitiatingCauses)
                                                .ThenInclude(a => a.DynamicGroupNames)
                                                .ToListAsync();
            }
            catch (Exception exe)
            {
                return BadRequest(exe.Message);
            }
        }

        [HttpGet]
        [Route("GetSILCalculation")]
        public async Task<ActionResult<List<Calculation>>> GetSILCalculation(int id)
        {
            try
            {
                var value= _Context.Calculation.Where(a => a.calculationId == id)
                                                                 .ToListAsync();
                List<Calculation> patients = await value;
                return patients;
            }
            catch (Exception exe)
            {
                return BadRequest(exe.Message);
            }
        }

        // POST api/<SILClassificationAPI>
        [HttpPost]
        [Route("SaveSheetData")]
        
        public async Task<ActionResult> SaveSheetData(List<SIFDesign> sifDesigns)
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
                    var calculation = sifDesign.Calculations;
                    sifDesign.Calculations = new List<Calculation>();
                    sifDesign.Calculations = null;
                    sifDesign.ImpactEvents = new List<ImpactEvent>();
                    sifDesign.ImpactEvents = null;
                    _Context.SIFDesign.Add(sifDesignObj);
                    await _Context.SaveChangesAsync();
                    foreach(var cal in calculation)
                    {
                        Calculation cal1 = new Calculation();
                        cal1.SIFId = sifDesignObj.Id;
                        cal1.TRFP = cal.TRFP;
                        cal1.TRFE = cal.TRFE;
                        cal1.TRFA = cal.TRFA;
                        cal1.OverallIELP = cal.OverallIELP;
                        cal1.OverallIELE = cal.OverallIELE;
                        cal1.OverallIELA = cal.OverallIELA;
                        cal1.PFDP = cal.PFDP;
                        cal1.PFDE = cal.PFDE;
                        cal1.PFDA = cal.PFDA;
                        cal1.RRFP = cal.RRFP;
                        cal1.RRFE = cal.RRFE;
                        cal1.RRFA = cal.RRFA;
                        cal1.SILP = cal.SILP;
                        cal1.SILE = cal.SILE;
                        cal1.SILA = cal.SILA;
                        _Context.Calculation.Add(cal1);
                        await _Context.SaveChangesAsync();
                    }
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
                                var dynamicColumns = initcause.DynamicGroupNames;
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
                                foreach (var dynamicColumn in dynamicColumns)
                                {
                                    DynamicGroupName dynamic = new DynamicGroupName();
                                    dynamic.ICId = init.Id;
                                    dynamic.GroupName = dynamicColumn.GroupName;
                                    dynamic.pfdDescription = dynamicColumn.pfdDescription;
                                    dynamic.pfdValue = dynamicColumn.pfdValue;
                                    _Context.DynamicGroupName.Add(dynamic);
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

        [HttpPost]
        [Route("SaveReport")]
        //public  IActionResult SaveReport([FromBody] ReportMaster report)
        public async Task<ActionResult<ReportMaster>> SaveReport([FromBody] ReportMaster report)
        {
            try
            { 
                _Context.ReportMasters.Add(report);
                 _Context.SaveChanges();
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
                                        .ThenInclude(a=>a.DynamicGroupNames)
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
