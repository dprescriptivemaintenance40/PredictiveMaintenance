using Plant.Models.Historical;
using System.ComponentModel.DataAnnotations.Schema;

namespace Plant.Models
{
    public class Equipment
    {
        public int EquipmentId { get; set; }
        public int NetworkId { get; set; }
        public string MachineId { get; set; }
        public int TagNumber { get; set; }
        public string Description { get; set; }
        public decimal FailureRate { get; set; }
        public decimal MDT { get; set; }
        public decimal AssetCost { get; set; }
        public decimal RepairCost { get; set; }
        [NotMapped]
        public List<Edge> _next = new List<Edge>();
        [NotMapped]
        public List<Edge> _previous = new List<Edge>();
        public List<SIF> sif { get; set; }
        public List<CompressorModel> compressorModel { get; set; }
        public List<PumpModel> pumpModel { get; set; }
        public Network networks { get; set; }
    }
}
