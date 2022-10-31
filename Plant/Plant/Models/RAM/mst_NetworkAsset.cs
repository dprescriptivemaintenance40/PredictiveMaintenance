
using Plant.Models.Plant;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Plant.Models.RAM
{
    public class mst_NetworkAsset
    {
        [Key]
        public int NetworkAssetId { get; set; }
        public int? AssetId { get; set; }
        public float AssetLambda { get; set; }
        public float AssetMdt { get; set; }
        public Asset_Equipment AssetEquipments { get; set; }
    }
}
