using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Plant.DAL;
using Plant.Models;
using Plant.Models.Plant;
using Plant.Models.RAM;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RAMAPIController : ControllerBase
    {
        private readonly PlantDBContext _Context;

        public RAMAPIController(PlantDBContext plantDBContext)
        {
            _Context = plantDBContext;

        }
        // GET: api/<RCAController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<RCAController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        { 
            return "value";
        }

        [HttpGet]
        [Route("GetMasterPlantData")]
        public async Task<ActionResult<Plants>> GetMasterPlantData()
        {
            try
            {
                List<Plants> plants = await _Context.Plants
                                                    .OrderBy(a => a.PlantId)
                                                    .ToListAsync();
                return Ok(plants);
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpGet]
        [Route("GetNetworkMasterList")]
        public async Task<ActionResult<mst_NetworkAsset>> GetNetworkMasterList()
        {
            try
            {
                var result = (from asset in _Context.Asset_Equipments
                              join networkData in _Context.mst_NetworkAsset
                             on asset.Id equals networkData.Id
                             select new
                             {
                                 asset.AssetName,
                                 asset.AssetImage,
                                 asset.TagNumber,
                                 networkData.AssetLambda,
                                 networkData.AssetMdt
                             });
                return Ok(result);
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpGet]
        [Route("GetPlantNetworkList")]
        public async Task<ActionResult<IEnumerable<PlantNetwork>>> GetPlantNetworkList()
        {
            try
            {
                return await _Context.PlantNetwork.Include(a => a.equipment)
                                                   .ThenInclude(a => a.equipmentWithCalculations)
                                                   .Include(a => a.equipment)
                                                   .ThenInclude(a => a.equipmentWithoutCalculations)
                                                   .Include(a => a.edge).OrderBy(a => a.PlantId)
                                                   .ToListAsync();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }

        [HttpGet]
        [Route("GetPlantNetworkListbyId")]
        public async Task<ActionResult<PlantNetwork>> GetPlantNetworkListbyId(int id)
        {
            try
            {
                var plantModel = await _Context.PlantNetwork.Where(a => a.PlantId == id)
                                                             .Include(a => a.equipment)
                                                             .ThenInclude(a => a.equipmentWithCalculations)
                                                             .Include(a => a.equipment)
                                                             .ThenInclude(a => a.equipmentWithoutCalculations)
                                                             .Include(a => a.edge)
                                                             .FirstOrDefaultAsync();
                return plantModel;
            }
            catch (Exception exe)
            {
                return BadRequest(exe.Message);
            }
        }

        // POST api/<RCAController>
        [HttpPost]
        [Route("SavePlantNetwork")]
        public async Task<ActionResult<PlantNetwork>> SavePlantNetwork([FromBody] PlantNetwork plant)
        {
            try
            {
                PlantNetwork plantsNetwork = new PlantNetwork();
                plantsNetwork.PlantName = plant.PlantName;
                plantsNetwork.Location = plant.Location;
                plantsNetwork.Unavailability = plant.Unavailability;
                plantsNetwork.Availability = plant.Availability;
                var equis = plant.equipment;
                _Context.PlantNetwork.Add(plantsNetwork);
                await _Context.SaveChangesAsync();
                foreach (var equi in equis)
                {
                    Equipments equipment = new Equipments();
                    equipment.PlantId = plantsNetwork.PlantId;
                    equipment.EquipmentNode = equi.EquipmentNode;
                    equipment.EquipmentName = equi.EquipmentName;
                    var plantequiwithoutcal = equi.equipmentWithoutCalculations;
                    var plantequiwithcal = equi.equipmentWithCalculations;
                    _Context.Equipment.Add(equipment);
                    await _Context.SaveChangesAsync();
                    if (plantequiwithcal.Count > 0)
                    {
                        foreach (var plantequi in plantequiwithcal)
                        {
                            EquipmentWithCalculations equiwithcal = new EquipmentWithCalculations();
                            equiwithcal.EquipmentId = equipment.EquipmentId;
                            equiwithcal.Logic = plantequi.Logic;
                            equiwithcal.EquimentsConnected = plantequi.EquimentsConnected;
                            equiwithcal.Lambda = plantequi.Lambda;
                            equiwithcal.MDT = plantequi.MDT;
                            equiwithcal.MTBF = plantequi.MTBF;
                            _Context.EquipmentWithCalculations.Add(equiwithcal);
                            await _Context.SaveChangesAsync();
                        }
                        

                    }
                    else
                    {
                        foreach (var plantequicalc in plantequiwithoutcal)
                        {
                            EquipmentWithoutCalculations equiwithoutcal = new EquipmentWithoutCalculations();
                            equiwithoutcal.EquipmentId = equipment.EquipmentId;
                            equiwithoutcal.Lambda = plantequicalc.Lambda;
                            equiwithoutcal.MDT = plantequicalc.MDT;
                            equiwithoutcal.EquipmentImage = plantequicalc.EquipmentImage;
                            _Context.EquipmentWithoutCalculations.Add(equiwithoutcal);
                            await _Context.SaveChangesAsync();
                        }
                        

                    }
                }
             
                var plantEdge = plant.edge;
                foreach (var edge in plantEdge)
                {
                    Edges edges = new Edges();
                    edges.PlantId = plantsNetwork.PlantId;
                    edges.EdgeName = edge.EdgeName;
                    edges.EdgeSrc = edge.EdgeSrc;
                    edges.EdgeDestination = edge.EdgeDestination;
                    _Context.Edge.Add(edges);
                    await _Context.SaveChangesAsync();
                }
             
                return Ok();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }

        }

        // PUT api/<RCAController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RCAController>/5
        [HttpDelete]
        [Route("DeletePlantModel")]
        public async Task<IActionResult> DeletePlantModel(int id)
        {
            try
            {

                var PlantModel = await _Context.PlantNetwork.Where(a => a.PlantId == id)
                                                             .Include(a => a.equipment)
                                                             .ThenInclude(a => a.equipmentWithCalculations)
                                                             .Include(a => a.equipment)
                                                             .ThenInclude(a => a.equipmentWithoutCalculations)
                                                             .Include(a => a.edge)
                                                             .FirstOrDefaultAsync();
                if (PlantModel == null)
                {
                    return NotFound();
                }
                _Context.PlantNetwork.Remove(PlantModel);
                await _Context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception exe)
            {

                return BadRequest(exe.Message);
            }
        }
    }
}
