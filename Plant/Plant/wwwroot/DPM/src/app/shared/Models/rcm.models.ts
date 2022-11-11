export class RCM {
    public RCMId: number = 0;
    // public OrganizationId : number = 0;
    public TagNumber: string = "";
    // public EquipmentId : number = 0;
    public AssetName: string = "";
    public MachineType: string = "";
    public EquipmentType: string = "";
    public Application: string = "";
    public SubUnit: string = "";
    public Function: string = "";
    public FunctionFailure: string = "";
    public Date: Date;
    public FailureModeWithLSETree: string = "";
    public FMWithConsequenceTree: string = "";
    public FCAAdded: string = "";
    public MSSAdded: string = "";
    public CBAAdded: string = "";
    public EquipmentCriticalityType: string = "";
    public failureModes: any = []


    // public failureModes :Array<FailureModes>=Array<FailureModes>();
}

export class FailureModes {
    public FailureModeId: number = 0;
    public RCMId: number = 0;
    public FailureMode: string = "";
    public LocalEffect: string = "";
    public SystemEffect: string = "";
    public Consequence: string = "";
    public DownTimeFactor: number = 0;
    public ScrapeFactor: number = 0;
    public SafetyFactor: number = 0;
    public ProtectionFactor: number = 0;
    public FrequencyFactor: number = 0;
    public SeverityFactor: number = 0;
    public OccurenceFactor: number = 0;
    public DetectionFactor: number = 0;
    public RPN:number = 0;
    public CriticalityFactor: number = 0;
    public Rating: string = "";
    public MaintainenancePractice: string = "";
    public FrequencyMaintainenance: string = "";
    public ConditionMonitoring: string = "";
    public AttachmentDBPath: string = "";
    public AttachmentFullPath: string = "";
    public Remark: string = "";
    public Pattern: string = "";
    public FCACondition: string = "";
    public FCAInterval: number = 0;
    public FCAFFI: string = "";
    public FCAComment: string = "";
    public FCAAlpha: number = 0;
    public FCABeta: number = 0;
    public FCASafeLife: number = 0;
    public FCAUsefulLife: number = 0;
    public FCAUpdateIntervals: string = "";
    public FCAUpdateConditions: string = "";
    public MSSStartergyList: string = "";
    public MSS: any = []
    // public RCMObj:RCM = null;
    // public MSS : Array<MSS>=new Array<MSS>();
    // public RCM:RCM=new RCM();
}

export class MSS {
    public MSSId: number = 0;
    public RCMId: number = 0;
    public FailureModeId: number = 0;
    public MSSStartergy: string = "";
    public MSSFrequency: string = "";
    public MSSMaintenanceInterval: string = "";
    public MSSAvailability: string = "";
    public MSSMaintenanceTask: string = "";
    public MSSIntervalSelectionCriteria: string = "";
    public MSSFinalAvaliability: number = 0;
    // public failureModes = null;
    public FailureModes = new FailureModes();
}
