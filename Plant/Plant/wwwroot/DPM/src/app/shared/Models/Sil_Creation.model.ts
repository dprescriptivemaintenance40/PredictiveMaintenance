    export class SIFDesign
    {
        public Id:number = 0;
        public HazopNodeId:number = 0;
        public InterLockTag:string = "";
        public Sensor:string = "";
        public FinalElement:string = "";
        public SIFDescription:string = "";
        public RiskMatrix:string = "";
        public TargetSIL:number = 0;
        public ImpactEvent:Array<ImpactEvent> = new Array<ImpactEvent>();
    }
    export class ImpactEvent
    {
        public Id:number = 0;
        public SIFId :number;
        public ImpactEventDesciption:string = "";
        public InitiatingCauses:Array<InitiatingCause> = new Array<InitiatingCause>(); 
        public SIFDesign:SIFDesign=null;
    }
    export class InitiatingCause
    {
        public  Id:number = 0; 
        public  IEId:number;  
        public  initiatingCause:string =""; 
        public  IEF:number = 0;    //Initiating Event Frequency

        public  IP:number = 0;       //Ignition Probability
        public  PP:number = 0;      //People Present
        public  TR:number = 0;    //Times at Risk

        public  ProtectionLayer:Array<ProtectionLayer> = new Array<ProtectionLayer>();
        public  ImpactEvent:ImpactEvent=null;

        public  RMId?:number; 
        public  RiskMatrix:RiskMatrix=null;
    }
    export class ProtectionLayer  //Independent Protection Layer
    {
        public  IPLId:number = 0;
        public  ICId:number ;
        public  NameOfIPL:string = "";    //Risk Reduction Measure
        public  Description:string = "";
        public  PFD:number ;   //Probability of Failure on Demand
        public  InitiatingCause:InitiatingCause=null;
    }
    export class RiskMatrix
    {
        public  RMId:number = 0;
        public  Category:string = ""; 
        public  Severity:number = 1;
        public  TRF:number ;   //Tolerable Risk Frequency or TMEL

        public  IEId?:number;
        public  ImpactEvent:ImpactEvent=null;
    }
   