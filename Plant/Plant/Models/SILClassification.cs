using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Plant.Models
{
    public class SILClassification
    {
        public int SILCId { get; set; }
        public string MachineId { get; set; }
        public string ImpactEvent { get; set; }
        public List<RiskMatrix> riskMatrix { get; set; }
        public List<InitiatingCauses> initiatingCauses { get; set; }
        public List<ConditionalModifiers> conditionalModifiers { get; set; }
        public List<IPL> ipl { get; set; }
        public List<Calculation> calculation { get; set; }
       // public Equipment equipment { get; set; }
    }
    public class RiskMatrix
    {
        public int RMId { get; set; }
        public int SILCId { get; set; }
        public string Category { get; set; }
        public int Severity { get; set; }
        public float TRF { get; set; }   //Tolerable Risk Frequency or TMEL
        public SILClassification silClassification { get; set; }
    }
    public class InitiatingCauses
    {
        public int ICId { get; set; }
        public int SILCId { get; set; }
        public string InitiatingCause { get; set; }
        public float IEF { get; set; }   //Initiating Event Frequency
        public SILClassification silClassification { get; set; }
    }
    public class ConditionalModifiers
    {
        public int CMId { get; set; }
        public int SILCId { get; set; }
        public float IP { get; set; }      //Ignition Probability
        public float PP { get; set; }     //People Present
        public float TR { get; set; }   //Times at Risk
        public SILClassification silClassification { get; set; }
    }
    public class IPL  //Independent Protection Layer
    {
        public int IPLId { get; set; }
        public int SILCId { get; set; }
        public string RRM { get; set; }    //Risk Reduction Measure
        public float PFD { get; set; }   //Probability of Failure on Demand
        public SILClassification silClassification { get; set; }
    }
    public class Calculation
    {
        public int CalculationId { get; set; }
        public int SILCId { get; set; }
        public float IEL { get; set; }  //Intermediate Event Likelihood
        public float OverallIEL { get; set; }
        public float PFD { get; set; }
        public string SIL { get; set; }
        public SILClassification silClassification { get; set; }
    }
}
