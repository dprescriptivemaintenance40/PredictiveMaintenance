
using System.ComponentModel.DataAnnotations;

namespace Plant.Models.RCA
{
    public class mst_NetworkAsset
    {
        [Key]
        public int NetworkAssetId { get; set; }
        public int PlantId { get; set; }
        public string AssetName { get; set; }
        public float AssetLambda { get; set; }
        public float AssetMdt { get; set; }
        public string AssetImage { get; set; }
        public string TagNumber { get; set; }
        public Plants Plants;
    }
}
