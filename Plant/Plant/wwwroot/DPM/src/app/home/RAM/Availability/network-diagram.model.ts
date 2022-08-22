export class Equipment {
    public EquipmentId: number;
    public EquipmentNode: string = "";
    public EquipmentName: string = "";
    public equipmentWithCalculations: EquipmentWithCalculations;
    public equipmentWithoutCalculations: EquipmentWithoutCalculations;
}

export class EquipmentWithoutCalculations {
    public EquipmentWithoutCalculationsId: number;
    public EquipmentId: number;
    public Lambda: number;   //provided lambda
    public MTBF: number;   //provided mtbf
}

export class EquipmentWithCalculations {
    public EquipmentWithCalculationsId: number;
    public EquipmentId: number;
    public EquimentsConnected: string = "";   //nodes connected
    public Logic: string = "";     //AND,OR Logic
    public Lambda: number;         //calculated lambda
    public MTBF: number;          //calculated mtbf
}

export class Edge{
    public EdgeId:number;
    public EdgeName:string = "";
    public EdgeSrc:string = "";     //from
    public EdgeDestination:string = "";  //to
}
