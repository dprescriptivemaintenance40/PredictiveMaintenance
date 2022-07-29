using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Plant.DAL;
using Plant.Models;
using Plant.Models.Historical;
using Newtonsoft.Json.Serialization;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860 

namespace Plant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantAPIController : ControllerBase
    {
        private readonly PlantDBContext _Context;
        public PlantAPIController(PlantDBContext plantDBContext)
        {
            _Context = plantDBContext;
        }

        // GET: api/<PlantAPIController> 
        [HttpGet]
        [Route("GetEquipmentList")]
        public IActionResult GetEquipmentList()
        {
            try
            {
                List<Equipment> equipment = _Context.Equipments.ToList<Equipment>();
                return Ok(equipment);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetEdges")]
        public IActionResult GetEdges()
        {
            try
            {
                List<Edge> edge = _Context.Edges.ToList<Edge>();
                return Ok(edge);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetPlant")]
        public IActionResult GetPlant()
        {
            try
            {
                List<Plants> plant = _Context.Plants.Include(r => r.networks)
                                            .ThenInclude(r => r.equipmentList)
                                            .Include(r => r.networks)
                                            .ThenInclude(r => r.edges)
                                            .Include(r => r.networks)
                                            .ThenInclude(r => r.equipmentList)
                                            .ThenInclude(r => r.sif)
                                            .ThenInclude(r => r.sensors)
                                            .Include(r => r.networks)
                                            .ThenInclude(r => r.equipmentList)
                                            .ThenInclude(r => r.sif)
                                            .ThenInclude(r => r.logicSolver)
                                            .Include(r => r.networks)
                                            .ThenInclude(r => r.equipmentList)
                                            .ThenInclude(r => r.sif)
                                            .ThenInclude(r => r.finalElement)
                                            .Include(r => r.networks)
                                            .ThenInclude(r => r.equipmentList)
                                            .ThenInclude(r => r.compressorModel)
                                            .Include(r => r.networks)
                                            .ThenInclude(r => r.equipmentList)
                                            .ThenInclude(r => r.pumpModel).ToList<Plants>();
                return Ok(plant);
            }
            catch (Exception )
            {
                throw;
            }
        }

      



        // GET api/<PlantAPIController>/5 
        [HttpGet("{id}")]
        [Route("PlantTree")]
        public Plants Get(int id)
        {
            Plants plant = _Context.Plants.Where(r => r.PlantId == id)
                                             .Include(r => r.networks)
                                             .ThenInclude(r => r.equipmentList)
                                             .Include(r => r.networks)
                                             .ThenInclude(r => r.edges)
                                             .FirstOrDefault();

            Network network = new Network();
            if (plant != null)
            {
                foreach (var item in plant.networks)
                {
                    network.AddEdgeToEquipment(item.equipmentList, item.edges);
                    item.MachineCount = item.equipmentList.Count() + 1;

                    foreach (var e in item.edges)
                    {
                        item.AddEdgesToAdjacencyList(e, item, false);
                    }
                    item.printAllPaths(item, 1, item.equipmentList.Count());

                    for (int i = 1; i < item._adjList.Count; i++)
                    {
                        Console.Write(i + " : ");
                        for (int j = 0; j < item._adjList[i].Count; j++)
                        {
                            Console.Write("[" + string.Join(" ", item._adjList[i][j]) + "] ");
                        }
                        Console.WriteLine();
                        Console.WriteLine("- - - - - - - - - - - - - -");
                    }

                    Console.WriteLine("Print All the Paths from 1 to " + item.equipmentList.Count());
                    for (int i = 0; i < item._CombinationList.Count; i++)
                    {
                        for (int j = 0; j < item._CombinationList[i].Count; j++)
                        {
                            Console.Write("-->");
                            if (item._CombinationList[i][j].Count > 1)
                            {
                                Console.Write("(" + string.Join(",", item._CombinationList[i][j]) + ")");
                            }
                            else
                            {
                                Console.Write(string.Join(" ", item._CombinationList[i][j]));
                            }
                        }
                        Console.WriteLine();
                    }
                }
            }
            return plant;
        }

        // POST api/<PlantAPIController> 
        [HttpPost]
        public IEnumerable<string> Post()
        {            try
            {
                Plants plant = new Plants();
                plant.Location = "Mumbai";
                plant.OrganizationId = 1;
                plant.PlantName = "Calvart";

                plant.networks = new List<Network>();
                Network nwt = new Network();

                nwt.equipmentList = new List<Equipment>();
                nwt.edges = new List<Edge>();

                Equipment eqi = new Equipment();
                eqi.MachineId = "N1";
                eqi.TagNumber = 1;
                eqi.Description = "Node1";
                eqi.FailureRate = 0;
                eqi.AssetCost = 0;
                eqi.MDT = 0;
                eqi.RepairCost = 0;
                nwt.equipmentList.Add(eqi);

                eqi = new Equipment();
                eqi.MachineId = "M1";
                eqi.TagNumber = 2;
                eqi.Description = "PowerSupply";
                eqi.FailureRate = 11212;
                eqi.AssetCost = 10000;
                eqi.MDT = 10;
                eqi.RepairCost = 1000;
                nwt.equipmentList.Add(eqi);

                eqi = new Equipment();
                eqi.MachineId = "M2";
                eqi.TagNumber = 3;
                eqi.Description = "Generator";
                eqi.FailureRate = 1500;
                eqi.AssetCost = 13000;
                eqi.MDT = 40;
                eqi.RepairCost = 5000;
                nwt.equipmentList.Add(eqi);

                eqi = new Equipment();
                eqi.MachineId = "N2";
                eqi.TagNumber = 4;
                eqi.Description = "Node2";
                eqi.FailureRate = 0;
                eqi.AssetCost = 0;
                eqi.MDT = 0;
                eqi.RepairCost = 0;
                nwt.equipmentList.Add(eqi);

                //new added
                eqi = new Equipment();
                eqi.MachineId = "M3";
                eqi.TagNumber = 5;
                eqi.Description = "Motor";
                eqi.FailureRate = 700;
                eqi.AssetCost = 550;
                eqi.MDT = 530;
                eqi.RepairCost = 5530;
                nwt.equipmentList.Add(eqi);

                eqi = new Equipment();
                eqi.MachineId = "N3";
                eqi.TagNumber = 6;
                eqi.Description = "Node3";
                eqi.FailureRate = 0;
                eqi.AssetCost = 0;
                eqi.MDT = 0;
                eqi.RepairCost = 0;
                nwt.equipmentList.Add(eqi);

                eqi = new Equipment();
                eqi.MachineId = "M4";
                eqi.TagNumber = 7;
                eqi.Description = "Pump";
                eqi.FailureRate = 6650;
                eqi.AssetCost = 540;
                eqi.MDT = 240;
                eqi.RepairCost = 2330;
                nwt.equipmentList.Add(eqi);

                eqi = new Equipment();
                eqi.MachineId = "M5";
                eqi.TagNumber = 8;
                eqi.Description = "Valve";
                eqi.FailureRate = 3330;
                eqi.AssetCost = 30;
                eqi.MDT = 40;
                eqi.RepairCost = 11110;
                nwt.equipmentList.Add(eqi);

                eqi = new Equipment();
                eqi.MachineId = "N4";
                eqi.TagNumber = 9;
                eqi.Description = "Node4";
                eqi.FailureRate = 0;
                eqi.AssetCost = 0;
                eqi.MDT = 0;
                eqi.RepairCost = 0;
                nwt.equipmentList.Add(eqi);

                eqi = new Equipment();
                eqi.MachineId = "M6";
                eqi.TagNumber = 10;
                eqi.Description = "Compressor";
                eqi.FailureRate = 11110;
                eqi.AssetCost = 20;
                eqi.MDT = 40;
                eqi.RepairCost = 3330;
                nwt.equipmentList.Add(eqi);


                eqi = new Equipment();
                eqi.MachineId = "N5";
                eqi.TagNumber = 11;
                eqi.Description = "Node5";
                eqi.FailureRate = 0;
                eqi.AssetCost = 0;
                eqi.MDT = 0;
                eqi.RepairCost = 0;
                nwt.equipmentList.Add(eqi);



                Edge ed = new Edge();
                ed.DestinationId = 2;
                ed.SrcId = 1;
                ed.Src = "N1";
                ed.EdgeName = "E1";
                ed.Destination = "M1";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 3;
                ed.SrcId = 1;
                ed.Src = "N1";
                ed.EdgeName = "E2";
                ed.Destination = "M2";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 4;
                ed.SrcId = 2;
                ed.Src = "M1";
                ed.EdgeName = "E3";
                ed.Destination = "N2";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 4;
                ed.SrcId = 3;
                ed.Src = "M2";
                ed.EdgeName = "E4";
                ed.Destination = "N2";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 5;
                ed.SrcId = 4;
                ed.Src = "N2";
                ed.EdgeName = "E5";
                ed.Destination = "M3";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 6;
                ed.SrcId = 5;
                ed.Src = "M3";
                ed.EdgeName = "E6";
                ed.Destination = "N3";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 7;
                ed.SrcId = 6;
                ed.Src = "N3";
                ed.EdgeName = "E7";
                ed.Destination = "M4";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 8;
                ed.SrcId = 6;
                ed.Src = "N3";
                ed.EdgeName = "E8";
                ed.Destination = "M5";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 9;
                ed.SrcId = 7;
                ed.Src = "M4";
                ed.EdgeName = "E9";
                ed.Destination = "N4";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 9;
                ed.SrcId = 8;
                ed.Src = "M5";
                ed.EdgeName = "E10";
                ed.Destination = "N4";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 10;
                ed.SrcId = 9;
                ed.Src = "N4";
                ed.EdgeName = "E11";
                ed.Destination = "M6";
                nwt.edges.Add(ed);

                ed = new Edge();
                ed.DestinationId = 11;
                ed.SrcId = 10;
                ed.Src = "M6";
                ed.EdgeName = "E12";
                ed.Destination = "N5";
                nwt.edges.Add(ed);
                plant.networks.Add(nwt);

                //adding SIF
                eqi.sif = new List<SIF>();
                SIF Sif = new SIF();
                Sif.SIFName = "First Function";
                eqi.sif.Add(Sif);

                Sif.sensors = new List<Sensor>();
                Sensor sensor = new Sensor();
                sensor.SensorName = "Initiator";
                sensor.TI = 1;   //Year
                sensor.MTTR = 8;   //hours
                Sif.sensors.Add(sensor);

                Sif.logicSolver = new List<LogicSolver>();
                LogicSolver logicsolver = new LogicSolver();
                logicsolver.LogicSolverName = "Logic Solver";
                logicsolver.TI = 1;   //Year
                logicsolver.MTTR = 8;   //hours
                Sif.logicSolver.Add(logicsolver);

                Sif.finalElement = new List<FinalElement>();
                FinalElement finalelement = new FinalElement();
                finalelement.FinalElementName = "Valve";
                finalelement.TI = 1;   //Year
                finalelement.MTTR = 8;   //hours
                Sif.finalElement.Add(finalelement);

                //eqi.compressorModel = new List<CompressorModel>();
                //CompressorModel compressorModel = new CompressorModel();
                //compressorModel.OrganizationId = 1;
                //compressorModel.EquipmentId = 58;
                //compressorModel.PS1 = 6;
                //compressorModel.PD1 = 5;
                //compressorModel.PS2 = 7;
                //compressorModel.PD2 = 2;
                //compressorModel.TS1 = 2;
                //compressorModel.TD1 = 11;
                //compressorModel.TS2 = 9;
                //compressorModel.TD2 = 3;
                //eqi.compressorModel.Add(compressorModel);

                eqi.pumpModel = new List<PumpModel>();
                PumpModel pumpModel = new PumpModel();
                pumpModel.OrganizationId = 1;
                pumpModel.EquipmentId = 55;
                pumpModel.P1 = 9;
                pumpModel.P2 = 6;
                pumpModel.Q = 3;
                eqi.pumpModel.Add(pumpModel);

                nwt.equipmentList.Add(eqi);
                plant.networks.Add(nwt);

                _Context.Plants.Add(plant);
                _Context.SaveChanges();
                return new string[] { "Success" };
            }
            catch ( Exception exe)
            {
                throw; 
            }
        }
        [HttpPost]
        [Route("UploadCSV")]
        public async Task<ActionResult<List<TempCompressorModel>>> UploadCSV([FromBody] List<TempCompressorModel> tempCompressorModel)
        {
            try
            {
                foreach (var item in tempCompressorModel)
                {
                    CompressorModel compressor = new CompressorModel();
                    compressor.OrganizationId = item.OrganizationId;
                    compressor.EquipmentId = 1083;
                    compressor.PS1 = item.PS1;
                    compressor.PD1 = item.PD1;
                    compressor.PS2 = item.PS2;

                    compressor.PD2 = item.PD2;
                    compressor.TS1 = item.TS1;
                    compressor.TD1 = item.TD1;
                    compressor.TS2 = item.TS2;
                    compressor.TD2 = item.TD2;
                    compressor.InsertedDate = item.InsertedDate;
                    await _Context.CompressorsModel.AddAsync(compressor);
                    await _Context.SaveChangesAsync();

                }
               
                return Ok();
    }


        catch (System.Exception exe)
        {

            return BadRequest(exe.Message);
}
}

    // PUT api/<PlantAPIController>/5 
    [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PlantAPIController>/5 
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}