export class Equipment
{
    public EquipmentId : number;
    public NetworkId : number;
    public MachineId : string;
    public TagNumber :number;
    public Description : string;
    public FailureRate :number;
    public MDT :number;
    public AssetCost : number;
    public RepairCost : number;
    public _next: any = [];
    public _previous: any = [];
}
export class SIF{
    public SIFId : number;
    public EquipmentId : number;
    public SIFName : string;
}
export class TempCompressorModel{
    public CompressorId: number;
    public OrganizationId: number;
    // public  EquipmentId: number;
    public PS1: number;
    public PD1: number;
    public PS2: number;
    public PD2: number;
    public TS1: number;
    public TD1: number;
    public TS2: number;
    public TD2: number;
    public  InsertedDate: Date;
}