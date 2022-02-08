export class SILClassificationMaster
{
    public SILCId:number = 0;
    public MachineId:string = "";
    public ImpactEvent:string = "";
    public RiskMatrix:Array<RiskMatrixMaster> = new Array<RiskMatrixMaster>();
    public InitiatingCauses:Array<InitiatingCausesMaster> = new Array<InitiatingCausesMaster>();
    public ConditionalModifiers:Array<ConditionalModifiersMaster> = new Array<ConditionalModifiersMaster>();
    public IPL:Array<IPLMaster> = new Array<IPLMaster>();
    
}
export class RiskMatrixMaster
{
    public  RMId:number = 0; 
    public  SILCId:number = 0;
    public  Category:string = ""; 
    public  Severity:number = 0;
    public  TRF:number = 0;   //Tolerable Risk Frequency or TMEL
    public  SILClassification:SILClassificationMaster = new SILClassificationMaster(); 
}
export class InitiatingCausesMaster
{
    public  ICId:number = 0; 
    public  SILCId:number = 0;  
    public  InitiatingCause:string =""; 
    public  IEF:number = 0;    //Initiating Event Frequency
    public  SILClassification:SILClassificationMaster = new SILClassificationMaster(); 
}
export class ConditionalModifiersMaster
{
    public  CMId:number = 0;
    public  SILCId:number = 0;
    public  IP:number = 0;       //Ignition Probability
    public  PP:number = 0;      //People Present
    public  TR:number = 0;    //Times at Risk
    public  SILClassification:SILClassificationMaster = new SILClassificationMaster(); 
}
export class IPLMaster  //Independent Protection Layer
{
    public  IPLId:number = 0;
    public  SILCId:number = 0;
    public  RRM:string = "";    //Risk Reduction Measure
    public  PFD:number = 0;   //Probability of Failure on Demand
    public  SILClassification:SILClassificationMaster = new SILClassificationMaster(); 
}
