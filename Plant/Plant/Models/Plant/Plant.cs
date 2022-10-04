
using Plant.Models.Plant;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Plant.Models
{
    public class Plants
    {
        //internal object mst_NetworkAsset;
        [Key]

        public int PlantId { get; set; }
        public int OrganizationId { get; set; }
        public string PlantName { get; set; }
        public string Location { get; set; }
        public List<mst_Asset> mst_Assets { get; set; }
    }

}
