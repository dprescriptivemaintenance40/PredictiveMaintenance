using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.Pkcs;
using Plant.DAL;
using Plant.Models.Plant;
using Plant.Models.RAM;
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
        [Route("GetHXData")]
        public IActionResult GetData()
        {
            List<UnityData> Data = new List<UnityData>();
            var Prodata = _Context.HXProcessedTables.Select(x => new
            {
                Date = x.Date,
                LMTD = x.LMTD,
                Incipient = Convert.ToInt16(x.Incipient),
                Degrade = Convert.ToInt16(x.Degrade)
            }).ToList();
            var Predata = _Context.HXPredictedTables.Select(x => new
            {
                Date = x.Date,
                LMTD = x.LMTD,
                Incipient = Convert.ToInt16(x.Incipient),
                Degrade = Convert.ToInt16(x.Degrade)
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
            // GET: api/<UnityDataRequest>
        [HttpGet]
        [Route("GetData")]
        public IActionResult GetHXData()
        {
            List<UnityData> Data = new List<UnityData>();
            List<UnityHX> HXData = new List<UnityHX>();
            List<string> dateList = new List<string>();
            var maxDate="";
            List<Asset_FailureMode> batchTable = _Context.Asset_FailureMode.Where(x=>x.IsProcessCompleted==0).ToList<Asset_FailureMode>();
            
            //var Prodata = _Context.HXProcessedTables.ToList();
            //var Predata = _Context.HXPredictedTables.ToList();
            //string json = JsonConvert.SerializeObject(Prodata) + JsonConvert.SerializeObject(Predata);
            foreach (var b in batchTable)
            {
                Asset_Equipment equipment = _Context.Asset_Equipments.Where(a => a.Id == b.EquipmentId).FirstOrDefault();
                
                if (equipment.AssetName == "HeatExchanger")
                {
                    var dt = _Context.Asset_FailureMode.Where(a => a.EquipmentId == equipment.Id).Select(x => x.DateTimeBatchCompleted).FirstOrDefault();
                    dateList.Add(Convert.ToString(dt));
                    maxDate = dateList.Max();

                    HXData.Add(new UnityHX
                    {
                        TagNumber = equipment.TagNumber
                    });

                    HXParameter stageData = _Context.HXParameters.Where(r => r.FailureModeId == b.Id).FirstOrDefault();
                    var Prodata = _Context.HXProcessedTables.Where(a => a.HXId == stageData.Id).Select(x => new
                    {
                        Date = x.Date,
                        LMTD = x.LMTD,
                        Incipient = x.Incipient,
                        Degrade = x.Degrade
                    }).ToList();
                    var Predata = _Context.HXPredictedTables.Where(a => a.HXId == stageData.Id).Select(x => new
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
                    
                }
            }
            var pointer = 0;
            foreach (var item in dateList)
            {
                pointer += 1;
                if (item == maxDate)
                {
                    HXData[pointer-1].LastUploaded = "true";
                    HXData[pointer-1].ExchangerDatas = Data;
                }
                else
                {
                    HXData[pointer-1].LastUploaded = "false";
                    HXData[pointer-1].ExchangerDatas = Data;
                }
            }
            
            string json = JsonConvert.SerializeObject(HXData);
            return Ok(json);
        }
        public class UnityHX
        {
            public string TagNumber;
            public string LastUploaded;
            List<UnityData> HXData = new List<UnityData>();
            public List<UnityData> ExchangerDatas
            {
                get
                {
                    return HXData;
                }
                set
                {
                    HXData = value;
                }
            }
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
