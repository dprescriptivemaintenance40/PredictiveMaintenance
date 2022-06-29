using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Plant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PowerBiAccessKeysController : ControllerBase
    {
        // GET: api/<PowerBiAccessKeysController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PowerBiAccessKeysController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PowerBiAccessKeysController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PowerBiAccessKeysController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PowerBiAccessKeysController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
