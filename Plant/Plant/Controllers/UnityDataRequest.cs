using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Plant.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnityDataRequest : ControllerBase
    {
        private readonly PlantDBContext _Context;

        public UnityDataRequest(PlantDBContext plantDBContext)
        {
            _Context = plantDBContext;

        }
        [HttpGet]
        [Route("GetData")]
        public IActionResult GetData()
        {
            List<UnityData> Data = new List<UnityData>();
            //var Prodata = _Context.HXProcessedTables.ToList();
            //var Predata = _Context.HXPredictedTables.ToList();
            //string json = JsonConvert.SerializeObject(Prodata) + JsonConvert.SerializeObject(Predata);
            var Prodata = _Context.HXNewTables.Select(x => new
            {
                Date = x.Date,
                LMTD = x.LMTD,
                Incipient = x.Incipient,
                Degrade = x.Degrade
            }).ToList();
            
            for (var i = 0; i < Prodata.Count; i++)
            {
                if (Prodata[i].Incipient == 0 && Prodata[i].Degrade == 0)
                {
                    Data.Add(new UnityData
                    {
                        Date = Prodata[i].Date,
                        LMTD = Prodata[i].LMTD,
                        Status = "Normal"
                    });
                }
                else if (Prodata[i].Incipient == 1 && Prodata[i].Degrade == 0)
                {
                    Data.Add(new UnityData
                    {
                        Date = Prodata[i].Date,
                        LMTD = Prodata[i].LMTD,
                        Status = "Incipient"
                    });
                }
                else if (Prodata[i].Incipient == 0 && Prodata[i].Degrade == 1)
                {
                    Data.Add(new UnityData
                    {
                        Date = Prodata[i].Date,
                        LMTD = Prodata[i].LMTD,
                        Status = "Degrade"
                    });
                }
            }
            string json = JsonConvert.SerializeObject(Data);
            return Ok(json);
        }
            // GET: api/<UnityDataRequest>
        [HttpGet]
        [Route("GetHXData")]
        public IActionResult GetHXData()
        {
            List<UnityData> Data = new List<UnityData>();
            //var Prodata = _Context.HXProcessedTables.ToList();
            //var Predata = _Context.HXPredictedTables.ToList();
            //string json = JsonConvert.SerializeObject(Prodata) + JsonConvert.SerializeObject(Predata);
            var Prodata = _Context.HXProcessedTables.Select(x => new
                  {
                      Date = x.Date,
                      LMTD = x.LMTD,
                      Incipient = x.Incipient,
                      Degrade =x.Degrade
                  }).ToList();
            var Predata = _Context.HXPredictedTables.Select(x => new
                {
                    Date = x.Date,
                    LMTD = x.LMTD,
                    Incipient = x.Incipient,
                    Degrade = x.Degrade
                }).ToList();
            var lastItem = Prodata.LastOrDefault();
            
            for (var i = 0; i < Prodata.Count; i++)
            {
                        if (Prodata[i].Incipient == 0 && Prodata[i].Degrade == 0)
                        {
                            Data.Add(new UnityData
                            {
                                Date = Prodata[i].Date,
                                LMTD = Prodata[i].LMTD,
                                Status = "Normal"
                            });
                        }
                        else if (Prodata[i].Incipient == 1 && Prodata[i].Degrade == 0)
                        {
                            Data.Add(new UnityData
                            {
                                Date = Prodata[i].Date,
                                LMTD = Prodata[i].LMTD,
                                Status = "Incipient"
                            });
                        }
                        else if (Prodata[i].Incipient == 0 && Prodata[i].Degrade == 1)
                        {
                            Data.Add(new UnityData
                            {
                                Date = Prodata[i].Date,
                                LMTD = Prodata[i].LMTD,
                                Status = "Degrade"
                            });
                        }
            }
            for (var j = 0; j < Predata.Count; j++)
            {
                if (Predata[j].Date >= lastItem.Date)
                {
                    if (Predata[j].Incipient == 0 && Predata[j].Degrade == 0)
                    {
                        Data.Add(new UnityData
                        {
                            Date = Predata[j].Date,
                            LMTD = Predata[j].LMTD,
                            Status = "Normal"
                        });
                    }
                    else if (Predata[j].Incipient == 1 && Predata[j].Degrade == 0)
                    {
                        Data.Add(new UnityData
                        {
                            Date = Predata[j].Date,
                            LMTD = Predata[j].LMTD,
                            Status = "Incipient"
                        });
                    }
                    else if (Predata[j].Incipient == 0 && Predata[j].Degrade == 1)
                    {
                        Data.Add(new UnityData
                        {
                            Date = Predata[j].Date,
                            LMTD = Predata[j].LMTD,
                            Status = "Degrade"
                        });
                    }
                }
            }
            string json = JsonConvert.SerializeObject(Data);
            return Ok(json);
        }
        public class UnityData
        {
            public DateTime Date;
            public float LMTD;
            public string Status;
        }
        // GET api/<UnityDataRequest>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UnityDataRequest>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UnityDataRequest>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UnityDataRequest>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
