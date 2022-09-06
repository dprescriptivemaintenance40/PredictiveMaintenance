using Microsoft.AspNetCore.Mvc;
using Plant.DAL;
using Plant.Models.RCA;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RCAAPIController : ControllerBase
    {
        private readonly PlantDBContext _Context;

        public RCAAPIController(PlantDBContext plantDBContext)
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
                var equis = plant.equipment;
                _Context.PlantNetwork.Add(plantsNetwork);
                await _Context.SaveChangesAsync();
                foreach (var equi in equis)
                {
                    Equipments equipment = new Equipments();
                    equipment.PlantId = plantsNetwork.PlantId;
                    equipment.EquipmentNode = equi.EquipmentNode;
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
                            equiwithcal.EquipmentName = plantequi.EquipmentName;
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
                            equiwithoutcal.EquipmentName = plantequicalc.EquipmentName;
                            equiwithoutcal.Lambda = plantequicalc.Lambda;
                            equiwithoutcal.MDT = plantequicalc.MDT;
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
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
