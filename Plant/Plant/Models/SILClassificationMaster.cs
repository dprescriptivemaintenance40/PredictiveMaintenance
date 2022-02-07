using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Plant.Models
{
    public class SILClassificationMaster
    {
        public int SILCMasterId { get; set; }
        //public string MachineId { get; set; }
        //public string ImpactEvent { get; set; }
        public List<RiskMatrixMaster> riskMatrixMaster { get; set; }
        public List<InitiatingCausesMaster> initiatingCausesMaster { get; set; }
        //public List<ConditionalModifiersMaster> conditionalModifiersMaster { get; set; }
        public List<IPLMaster> iplMaster { get; set; }
    }
    public class RiskMatrixMaster
    {
        public int RMMId { get; set; }
        public int SILCMasterId { get; set; }
        public List<Category> Category { get; set; }
        public List<Severity> Severity { get; set; }
        public List<TRF> TRF { get; set; }   //Tolerable Risk Frequency or TMEL
        public SILClassificationMaster silClassificationMaster { get; set; }
    }
    public class Category
    {
        public int CategoryId { get; set; }
        public int RMMId { get; set; }
        public string CategoryName { get; set; }
        public RiskMatrixMaster riskMatrixMaster { get; set; }
    }
    public class Severity
    {
        public int SeverityId { get; set; }
        public int RMMId { get; set; }
        public int SeverityValue { get; set; }
        public RiskMatrixMaster riskMatrixMaster { get; set; }
    }
    public class TRF
    {
        public int TRFId { get; set; }
        public int RMMId { get; set; }
        public float TRFValue  { get; set; }
        public RiskMatrixMaster riskMatrixMaster { get; set; }
    }
    public class InitiatingCausesMaster
    {
        public int ICMId { get; set; }
        public int SILCMasterId { get; set; }
        public string InitiatingCause { get; set; }
        public float IEF { get; set; }   //Initiating Event Frequency
        public SILClassificationMaster silClassificationMaster { get; set; }
    }
    public class IPLMaster  //Independent Protection Layer
    {
        public int IPLMId { get; set; }
        public int SILCMasterId { get; set; }
        public string RRM { get; set; }    //Risk Reduction Measure
        public float PFD { get; set; }   //Probability of Failure on Demand
        public SILClassificationMaster silClassificationMaster { get; set; }
    }
    //public class ConditionalModifiersMaster
    //{
    //    public int CMMId { get; set; }
    //    public int SILCMasterId { get; set; }
    //    public List<IP> IP { get; set; }      //Ignition Probability
    //    public List<PP> PP { get; set; }     //People Present
    //    public List<TR> TR { get; set; }   //Times at Risk
    //    public SILClassificationMaster silClassificationMaster { get; set; }
    //}
    //public class IP
    //{
    //    public int IPId { get; set; }
    //    public int CMMId { get; set; }
    //    public float IPValue { get; set; }
    //    public ConditionalModifiersMaster conditionalModifiersMaster { get; set; }
    //}
    //public class PP
    //{
    //    public int PPId { get; set; }
    //    public int CMMId { get; set; }
    //    public float PPValue { get; set; }
    //    public ConditionalModifiersMaster conditionalModifiersMaster { get; set; }
    //}
    //public class TR
    //{
    //    public int TRId { get; set; }
    //    public int CMMId { get; set; }
    //    public float TRValue { get; set; }
    //    public ConditionalModifiersMaster conditionalModifiersMaster { get; set; }
    //}
   
}
