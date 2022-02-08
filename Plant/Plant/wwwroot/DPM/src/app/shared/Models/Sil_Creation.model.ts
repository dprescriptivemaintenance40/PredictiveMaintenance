    export class SILClassification
    {
        public SILCId:number = 0;
        public MachineId:string = "";
        public ImpactEvent:string = "";
        public RiskMatrix:Array<RiskMatrix> = new Array<RiskMatrix>();
        public InitiatingCauses:Array<InitiatingCauses> = new Array<InitiatingCauses>();
        public ConditionalModifiers:Array<ConditionalModifiers> = new Array<ConditionalModifiers>();
        public IPL:Array<IPL> = new Array<IPL>();
        public Calculation:Array<Calculation> = new Array<Calculation>();
    }
    export class RiskMatrix
    {
        public  RMId:number = 0; 
        public  SILCId:number = 0;
        public  Category:string = ""; 
        public  Severity:number = 0;
        public  TRF:number = 0;   //Tolerable Risk Frequency or TMEL
        public  SILClassification:SILClassification = new SILClassification(); 
    }
    export class InitiatingCauses
    {
        public  ICId:number = 0; 
        public  SILCId:number = 0;  
        public  InitiatingCause:string =""; 
        public  IEF:number = 0;    //Initiating Event Frequency
        public  SILClassification:SILClassification = new SILClassification(); 
    }
    export class ConditionalModifiers
    {
        public  CMId:number = 0;
        public  SILCId:number = 0;
        public  IP:number = 0;       //Ignition Probability
        public  PP:number = 0;      //People Present
        public  TR:number = 0;    //Times at Risk
        public  SILClassification:SILClassification = new SILClassification(); 
    }
    export class IPL  //Independent Protection Layer
    {
        public  IPLId:number = 0;
        public  SILCId:number = 0;
        public  RRM:string = "";    //Risk Reduction Measure
        public  PFD:number = 0;   //Probability of Failure on Demand
        public  SILClassification:SILClassification = new SILClassification(); 
    }
    export class Calculation{
        public  CalculationId:number = 0;
        public  SILCId:number = 0;
        public  IE:number = 0;  //Intermediate Event Likelihood
        public  OverallIEL:number = 0;
        public  PFD:number = 0;
        public  SIL:string ="";
        public  SILClassification:SILClassification = new SILClassification(); 
    }