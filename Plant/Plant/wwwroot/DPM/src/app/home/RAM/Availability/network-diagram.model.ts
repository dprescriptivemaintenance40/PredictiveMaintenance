export class PlantNetwork {
    public PlantId: number;
    public PlantName: string = "";
    public Location: string = "";
    public Unavailability:number;
    public equipment : Array<Equipments> = new Array<Equipments>();
    public edge : Array<Edges> = new Array<Edges>();
}

export class Equipments {
    public EquipmentId: number;
    public PlantId: number;
    public EquipmentNode: string = "";
    public EquipmentWithCalculations:any = [];
    public EquipmentWithoutCalculations:any = [];
}

export class EquipmentWithoutCalculations {
    public EquipmentWithoutCalculationsId: number;
    public EquipmentId: number;
    public EquipmentName: string = "";
    public Lambda: number;   //provided lambda
    public MDT: number;   //provided MDT
}

export class EquipmentWithCalculations {
    public EquipmentWithCalculationsId: number;
    public EquipmentId: number;
    public EquipmentName: string = "";
    public EquimentsConnected: string = "";   //nodes connected
    public Logic: string = "";     //AND,OR Logic
    public Lambda: number;         //calculated lambda
    public MDT: number;          //calculated MDT
    public MTBF: number;   //calculated MTBF
}

export class Edges {
    public EdgeId: number;
    public PlantId: number;
    public EdgeName: string = "";
    public EdgeSrc: string = "";     //from
    public EdgeDestination: string = "";  //to
}
