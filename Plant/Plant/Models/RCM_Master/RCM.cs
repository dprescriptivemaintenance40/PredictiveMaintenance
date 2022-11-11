using Plant.Models.Plant;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Plant.Models.RCM_Master
{
    public class RCM
    {
        [Key]
        public int RCMId { get; set; }
        public string TagNumber { get; set; }
        public string AssetName { get; set; }
        //public int EquipmentId { get; set; }
        public string MachineType { get; set; }
        public string EquipmentType { get; set; }
        public string Application { get; set; } 
        public string SubUnit { get; set; }
        public string Function { get; set; }
        public string FunctionFailure { get; set; }
        public DateTime Date { get; set; }
        public string FailureModeWithLSETree { get; set; }
        public string FMWithConsequenceTree { get; set; }
        public string FCAAdded { get; set; }
        public string MSSAdded { get; set; }
        public string CBAAdded { get; set; }
        public string EquipmentCriticalityType { get; set; }
        public List<FailureModes> failureModes { get; set; }
        //public int OrgainzationId { get; internal set; }
        //[NotMapped]
        //public Equipment equipment { get; set; }

    }

    public class FailureModes
    {
        [Key]
        public int FailureModeId { get; set; }
        public int RCMId { get; set; }
        public string FailureMode { get; set; }
        public string LocalEffect { get; set; }
        public string SystemEffect { get; set; }
        public string Consequence { get; set; }
        public int DownTimeFactor { get; set; }
        public int ScrapeFactor { get; set; }
        public int SafetyFactor { get; set; }
        public int ProtectionFactor { get; set; }
        public int FrequencyFactor { get; set; }
        public int SeverityFactor { get; set; }
        public int OccurenceFactor { get; set; }
        public int DetectionFactor { get; set; }
        public int RPN { get; set; }
        public int CriticalityFactor { get; set; }
        public string Rating { get; set; }
        public string MaintainenancePractice { get; set; }
        public string FrequencyMaintainenance { get; set; }
        public string ConditionMonitoring { get; set; }
        public string AttachmentDBPath { get; set; }
        public string AttachmentFullPath { get; set; }
        public string Remark { get; set; }
        public string Pattern { get; set; }
        public string FCACondition { get; set; }
        public int FCAInterval { get; set; }
        public string FCAFFI { get; set; }
        public string FCAComment { get; set; }
        public decimal FCAAlpha { get; set; }
        public decimal FCABeta { get; set; }
        public decimal FCASafeLife { get; set; }
        public decimal FCAUsefulLife { get; set; }
        public string FCAUpdateIntervals { get; set; }
        public string FCAUpdateConditions { get; set; }
        public string MSSStartergyList { get; set; }
        public List<MSS> MSS { get; set; }
        public RCM RCM;
    }

    public class MSS
    {
        [Key]
        public int MSSId { get; set; }
        public int RCMId { get; set; }
        public int FailureModeId { get; set; }
        public string MSSStartergy { get; set; }
        public string MSSFrequency { get; set; }
        public string MSSMaintenanceInterval { get; set; }
        public string MSSAvailability { get; set; }
        public string MSSMaintenanceTask { get; set; }
        public string MSSIntervalSelectionCriteria { get; set; }
        public decimal MSSFinalAvaliability { get; set; }
        public FailureModes FailureModes;
    }
}

