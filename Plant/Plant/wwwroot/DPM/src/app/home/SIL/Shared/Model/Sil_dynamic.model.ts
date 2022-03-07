export class DynamicGroupName
{
    public Id :number=0;
    public InitiantingId:number=0;
    public GroupName :string ="";
    public DynamicValues:Array<DynamicValues> = new Array<DynamicValues>();
}
export class DynamicValues
{
    public pfdDescription :string ="";
    public pfdValue :number=0;
}
export class DynamicTitle
{
    public title:string="";
}