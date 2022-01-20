import { Equipment } from "src/app/home/Vis/Vis.model";

export class RCM
    {
        public RCMId : number = 0 ;
        public EquipmentId : number = 0;
        public MachineType : string = "";
        public EquipmentType : string = "";
        public Function : string = "";
        public FunctionFailure : string = "";
        public Date : Date ;
        public FailureModeWithLSETree : string = "";
        public FMWithConsequenceTree : string = "";
        public FCAAdded : string = "";
        public MSSAdded : string = "";
        public EquipmentCriticalityType : string = "";
        public FailureModes :Array<FailureModes>=Array<FailureModes>();
      //  public equipment:Equipment=null;
       // public equipment:Equipment=new Equipment();
    }

    export class FailureModes
    {  
        public  FailureModeId:number = 0; 
        public  RCMId:number = 0;
        public  FailureMode : string = "";
        public  LocalEffect : string = "";
        public  SystemEffect : string = "";
        public  Consequence : string = "";
        public  DownTimeFactor:number = 0;
        public  ScrapeFactor:number = 0;
        public  SafetyFactor:number = 0;
        public  ProtectionFactor:number = 0;
        public FrequencyFactor:number  = 0;
        public CriticalityFactor:number = 0;
        public Rating : string = "";
        public MaintainenancePractice : string = "";
        public FrequencyMaintainenance : string = "";
        public ConditionMonitoring : string ="";
        public AttachmentDBPath : string = "";
        public AttachmentFullPath : string = "";
        public Remark : string = "";
        public Pattern : string = "";
        public FCACondition : string = "";
        public FCAInterval : number  = 0;
        public FCAFFI : string ="";
        public FCAComment : string = "";
        public FCAAlpha : number = 0;
        public FCABeta : number = 0;
        public FCASafeLife : number = 0;
        public FCAUsefulLife : number = 0;
        public FCAUpdateIntervals : string = "";
        public FCAUpdateConditions : string = "";
        public MSSStartergyList : string = "";
        public MSS : Array<MSS>=new Array<MSS>();
     //   public RCM:RCM=null;
      //  public RCM:RCM=new RCM();
    }

    export class MSS
    {
        public MSSId: number = 0;
        public RCMId: number = 0;
        public FailureModeId: number = 0;
        public MSSStartergy: string = "";
        public MSSMaintenanceInterval: string = "";
        public MSSAvailability: string = "";
        public MSSMaintenanceTask: string = "";
        public MSSIntervalSelectionCriteria: string = "";
        public MSSFinalAvaliability: string = "";
     //   public FailureModes:FailureModes=null;
       // public FailureModes:FailureModes=new FailureModes();
    }
   