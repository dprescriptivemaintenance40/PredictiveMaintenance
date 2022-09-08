
using Plant.Models.Plant;
using System.ComponentModel.DataAnnotations.Schema;

namespace Plant.Models.RCM_Master
{
    public class mst_application
    {
        public int ApplicationId { get; set; }
        [ForeignKey("mst_Asset")]
        public int MstAssetId { get; set; }
        public string ApplicatonName { get; set; }
        //public int? Id_fk { get; set; }

        public mst_Asset mst_Asset;
    }
}
