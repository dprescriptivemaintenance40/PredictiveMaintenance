using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Plant.Models.Plant
{
    public class HXParameter
    {
        [Key]
        public int Id { get; set; }
        public int FailureModeId { get; set; }
        public List<HXStagingTable> hxStagingTable { get; set; }
        public List<HXCleaningTable> hxCleaningTable { get; set; }
        public List<HXErrorTable> hxErrorTable { get; set; }
        public List<HXProcessedTable> hxProcessedTable { get; set; }
        public List<HXPredictedTable> hxhPredictedTable { get; set; }
        public Asset_FailureMode asset_failureModes { get; set; }
    }
    public class HXStagingTable
    {
        [Key]
        public int Id { get; set; }
        public int HXId { get; set; }
        public DateTime Date { get; set; }
        public string TT1 { get; set; }
        public string TT2 { get; set; }
        public string TS1 { get; set; }
        public string TS2 { get; set; }
        public string FT1 { get; set; }
        public string FT2 { get; set; }
        public string PT1 { get; set; }
        public string PT2 { get; set; }
        public string PS1 { get; set; }
        public string PS2 { get; set; }
        public string Mass { get; set; }
        public string SpecificHeat { get; set; }
        public string HTC { get; set; }
        public string HeatEnergy { get; set; }
        public string LMTD { get; set; }
        public string Area { get; set; }
        public HXParameter hxParameter { get; set; }
    }
    public class HXCleaningTable
    {
        [Key]
        public int Id { get; set; }
        public int HXId { get; set; }
        public DateTime Date { get; set; }
        public float TT1 { get; set; }
        public float TT2 { get; set; }
        public float TS1 { get; set; }
        public float TS2 { get; set; }
        public float FT1 { get; set; }
        public float FT2 { get; set; }
        public float PT1 { get; set; }
        public float PT2 { get; set; }
        public float PS1 { get; set; }
        public float PS2 { get; set; }
        public float Mass { get; set; }
        public float SpecificHeat { get; set; }
        public float HTC { get; set; }
        public float HeatEnergy { get; set; }
        public float LMTD { get; set; }
        public float Area { get; set; }
        public HXParameter hxParameter { get; set; }
    }
    public class HXErrorTable
    {
        [Key]
        public int Id { get; set; }
        public int HXId { get; set; }
        public int rowAffected { get; set; }
        public string Description { get; set; }
        public HXParameter hxParameter { get; set; }
    }
    public class HXProcessedTable
    {
        [Key]
        public int Id { get; set; }
        public int HXId { get; set; }
        public DateTime Date { get; set; }
        public float TT1 { get; set; }
        public float TT2 { get; set; }
        public float TS1 { get; set; }
        public float TS2 { get; set; }
        public float FT1 { get; set; }
        public float FT2 { get; set; }
        public float PT1 { get; set; }
        public float PT2 { get; set; }
        public float PS1 { get; set; }
        public float PS2 { get; set; }
        public float Mass { get; set; }
        public float SpecificHeat { get; set; }
        public float HTC { get; set; }
        public float HeatEnergy { get; set; }
        public float LMTD { get; set; }
        public float Area { get; set; }
        public HXParameter hxParameter { get; set; }
    }
    public class HXPredictedTable
    {
        [Key]
        public int Id { get; set; }
        public int HXId { get; set; }
        public DateTime Date { get; set; }
        public float TT1 { get; set; }
        public float TT2 { get; set; }
        public float TS1 { get; set; }
        public float TS2 { get; set; }
        public float FT1 { get; set; }
        public float FT2 { get; set; }
        public float PT1 { get; set; }
        public float PT2 { get; set; }
        public float PS1 { get; set; }
        public float PS2 { get; set; }
        public float Mass { get; set; }
        public float SpecificHeat { get; set; }
        public float HTC { get; set; }
        public float HeatEnergy { get; set; }
        public float LMTD { get; set; }
        public float Area { get; set; }
        public HXParameter hxParameter { get; set; }
    }
}
