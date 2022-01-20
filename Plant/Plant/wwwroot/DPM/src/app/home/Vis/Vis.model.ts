import { RCM } from "src/app/shared/Models/rcm.models";

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
    public sif : Array<SIF>=new Array<SIF>();
    public compressorModel : Array<CompressorModel>=new Array<CompressorModel>();
  //  public RCM:RCM=new RCM();
}
export class SIF{
    public SIFId : number;
    public EquipmentId : number;
    public SIFName : string;
}
export class CompressorModel{
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