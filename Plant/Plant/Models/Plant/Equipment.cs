using Plant.Models.Historical;
using Plant.Models.Plant;
using System.ComponentModel.DataAnnotations.Schema;
using static Plant.Models.EquipmentTables.EquipmentDataProcess;

namespace Plant.Models
{
    public class Equipment
    {
        public int EquipmentId { get; set; }
        public int NetworkId { get; set; }
        public string MachineId { get; set; }
        public int TagNumber { get; set; }
        public string AssetName { get; set; }  //eg. ScrewCompressor 
        public List<FailureMode> failureMode { get; set; }
        public List<FailureModes> failureModes { get; set; }
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
        public List<EquipmentTable> equipmentTableList { get; set; }
        public List<PatternTable> patternTableList { get; set; }
        public Network networks { get; set; }
        //public RCM RCM { get; set; }
    }
}
