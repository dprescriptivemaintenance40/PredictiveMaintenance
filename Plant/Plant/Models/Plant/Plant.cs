
using System.ComponentModel.DataAnnotations.Schema;

namespace Plant.Models
{
    public class Plants
    {
        public int PlantId { get; set; }
        public int OrganizationId { get; set; }
        public string PlantName { get; set; }
        public string Location { get; set; }
        public List<Network> networks { get; set; }
        //public List<SafetyFactor> safetyFactors { get; set; }
    }

}
