using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Plant.Models
{
    public class SILClassificationMaster
    {
        public int SILCMasterId { get; set; }
        public string MachineId { get; set; }
        public string ImpactEvent { get; set; }
        public List<RiskMatrixMaster> riskMatrixMaster { get; set; }
        public List<InitiatingCausesMaster> initiatingCausesMaster { get; set; }
        public List<ConditionalModifiersMaster> conditionalModifiersMaster { get; set; }
        public List<IPLMaster> iplMaster { get; set; }
    }
    public class RiskMatrixMaster
    {
        public int RMMId { get; set; }
        public int SILCMasterId { get; set; }
        public string Category { get; set; }
        public int Severity { get; set; }
        public float TRF { get; set; }   //Tolerable Risk Frequency or TMEL
        public SILClassification silClassificationMaster { get; set; }
    }
    public class InitiatingCausesMaster
    {
        public int ICMId { get; set; }
        public int SILCMasterId { get; set; }
        public string InitiatingCause { get; set; }
        public float IEF { get; set; }   //Initiating Event Frequency
        public SILClassification silClassificationMaster { get; set; }
    }
    public class ConditionalModifiersMaster
    {
        public int CMMId { get; set; }
        public int SILCMasterId { get; set; }
        public float IP { get; set; }      //Ignition Probability
        public float PP { get; set; }     //People Present
        public float TR { get; set; }   //Times at Risk
        public SILClassification silClassificationMaster { get; set; }
    }
    public class IPLMaster  //Independent Protection Layer
    {
        public int IPLMId { get; set; }
        public int SILCMasterId { get; set; }
        public string RRM { get; set; }    //Risk Reduction Measure
        public float PFD { get; set; }   //Probability of Failure on Demand
        public SILClassification silClassificationMaster { get; set; }
    }
}
