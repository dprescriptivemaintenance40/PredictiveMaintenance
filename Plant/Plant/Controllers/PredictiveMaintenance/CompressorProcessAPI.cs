using KiranaPasalManagementSystem.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static Plant.Models.EquipmentTables.CompressorDataProcess;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers.PredictiveMaintenance
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompressorProcessAPI : ControllerBase
    {
        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        [Route("PostCompressor")]
        public IEnumerable<string> PostCompressor(List<CompressorObjectModel> obj)
        {
            try
            {
                //Validations
                foreach (var data in obj)
                {
                    string value = data.TD1Value;
                    if (value != "")
                    {
                        var td1Value = float.Parse(value, CultureInfo.InvariantCulture.NumberFormat);
                        var regex1 = new Regex(@"^[0-9]*(?:\.[0-9]+)?$");
                        if (td1Value <= 0)
                        {
                            //value must be greater than zero
                        }
                        else
                        {
                            string td1Value1 = value.ToString();
                           
                            if (!regex1.IsMatch(td1Value1))
                            {
                              //value must be number  
                            }
                        }
                       
                    }
                    else
                    {
                        //null values are not allowed
                    }
                }

                //Finding missing values
                ProcessStartInfo start = new ProcessStartInfo();
                start.FileName = "C:/Users/HP/AppData/Local/Programs/Python/Python310/python.EXE"; //cmd is full path to python.exe
                start.Arguments = "FillMissingValues.py";  //args is path to .py file and any cmd line args
                start.UseShellExecute = false;
                start.RedirectStandardOutput = true;
                using (Process process = Process.Start(start))
                {
                    using (StreamReader reader = process.StandardOutput)
                    {
                        string result = reader.ReadToEnd();
                        Console.Write(result);
                        //return new string[] { result };
                    }
                }
              

                 //Predicting v0alues
                 ProcessStartInfo start1 = new ProcessStartInfo();
                start1.FileName = "C:/Users/HP/AppData/Local/Programs/Python/Python310/python.EXE"; //cmd is full path to python.exe
                start1.Arguments = "seasonal.py";  //args is path to .py file and any cmd line args
                start1.UseShellExecute = false;
                start1.RedirectStandardOutput = true;
                using (Process process = Process.Start(start1))
                {
                    using (StreamReader reader = process.StandardOutput)
                    {
                        string result = reader.ReadToEnd();
                        Console.Write(result);
                        return new string[] { result };
                    }
                }

            }
            catch (Exception exe)
            {
                throw;
            }
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
