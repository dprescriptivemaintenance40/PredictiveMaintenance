﻿using System.ComponentModel.DataAnnotations.Schema;


namespace Plant.Models
{
    public class SIFDesign
    {
        public int Id { get; set; }
        public int HazopNodeId { get; set; }
        public string InterLockTag { get; set; }
        public string Sensor { get; set; }
        public string FinalElement { get; set; }
        public string SIFDescription { get; set; }
        public string RiskMatrix { get; set; }
        public int TargetSIL { get; set; }
        public List<ImpactEvent> ImpactEvents { get; set; }
        public List<Calculation> Calculations { get; set; }
    }
    public class ImpactEvent
    {
        public int Id { get; set; }
        public int SIFId { get; set; }
        public string ImpactEventDesciption { get; set; }
        public List<RiskMatrix> RiskMatrix { get; set; }
        public SIFDesign SIFDesign { get; set; }
    }
    public class RiskMatrix
    {
        public int RMId { get; set; }
        public int IEId { get; set; }
        public string Category { get; set; }
        public string Severity { get; set; }
        public float TRF { get; set; }   //Tolerable Risk Frequency or TMEL
        public List<InitiatingCause> InitiatingCauses { get; set; }

        //[ForeignKey("IEId")]
        public ImpactEvent ImpactEvent { get; set; }
    }

    public class InitiatingCause
    {
    public int Id { get; set; }
    public int RMId { get; set; }
    public string initiatingCause { get; set; }
    public float IEF { get; set; }   //Initiating Event Frequency

    //Conditional Modifiers
    public float IP { get; set; }      //Ignition Probability
    public float PP { get; set; }     //People Present
    public float TR { get; set; }   //Times at Risk

    public List<ProtectionLayer> ProtectionLayers { get; set; }
    public List<DynamicGroupName> DynamicGroupNames { get; set; }

    public float IELP { get; set; }
    public float IELE { get; set; }
    public float IELA { get; set; }

    //[ForeignKey("RMId")]
    public RiskMatrix RiskMatrix { get; set; }
    }
    public class ProtectionLayer
    {
        public int Id { get; set; }
        public int ICId { get; set; }
        public string NameOfIPL { get; set; }    //Independent Protection Layer
        public string Description { get; set; }
        public float PFD { get; set; }   //Probability of Failure on Demand
        public InitiatingCause InitiatingCause { get; set; }
    }
    public class DynamicGroupName
    {
        public int DynamicId { get; set; }
        public int ICId { get; set; }
        public string GroupName { get; set; }
        public string pfdDescription { get; set; }
        public float pfdValue { get; set; }
        public InitiatingCause InitiatingCause { get; set; }
    }
    public class Calculation
    {
        public int calculationId { get; set; }
        public int SIFId { get; set; }
        public float TRFP { get; set; }
        public float TRFE { get; set; }
        public float TRFA { get; set; }
        public float OverallIELP { get; set; }
        public float OverallIELE { get; set; }
        public float OverallIELA { get; set; }
        public float PFDP { get; set; }
        public float PFDA { get; set; }
        public float PFDE { get; set; }
        public float RRFP { get; set; }
        public float RRFA { get; set; }
        public float RRFE { get; set; }
        public float SILP { get; set; }
        public float SILA { get; set; }
        public float SILE { get; set; }
    }
}
