using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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
        public List<ImpactEvent> ImpactEvent { get; set; }
}
public class ImpactEvent
{
    public int Id { get; set; }
    public int SIFId { get; set; }
    public string ImpactEventDesciption { get; set; }
    public List<InitiatingCause> InitiatingCauses { get; set; }
    //public SIFDesign SIFDesign { get; set; }
    }
public class InitiatingCause
{
    public int Id { get; set; }
    public int IEId { get; set; }
    public string initiatingCause { get; set; }
    public float IEF { get; set; }   //Initiating Event Frequency

    //Conditional Modifiers
    public float IP { get; set; }      //Ignition Probability
    public float PP { get; set; }     //People Present
    public float TR { get; set; }   //Times at Risk

    public List<ProtectionLayer> ProtectionLayers { get; set; }
    //public ImpactEvent ImpactEvent { get; set; }

        //public int? RMId { get; set; }

        //[ForeignKey("RMId")]
        //public RiskMatrix RiskMatrix { get; set; }
    }
    public class RiskMatrix
{
    public int RMId { get; set; }
    public string Category { get; set; }
    public int Severity { get; set; }
    public float TRF { get; set; }   //Tolerable Risk Frequency or TMEL

    public int? IEId { get; set; }

    //[ForeignKey("IEId")]
    //public ImpactEvent impactEvent { get; set; }
}

public class ProtectionLayer
{
    public int Id { get; set; }
    public int ICId { get; set; }
    public string NameOfIPL { get; set; }    //Independent Protection Layer
    public string Description { get; set; }
    public float PFD { get; set; }   //Probability of Failure on Demand
    //public InitiatingCause InitiatingCause { get; set; }
    }
}
