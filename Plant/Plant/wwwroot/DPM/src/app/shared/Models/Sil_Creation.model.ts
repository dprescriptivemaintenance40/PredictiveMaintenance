export class SIFDesign
{
    private calculation:Calculation=null;
    constructor(){
        this.calculation=new Calculation(this);
    }
    public Id:number = 0;
    public HazopNodeId:number = 0;
    public InterLockTag:string = "";
    public Sensor:string = "";
    public FinalElement:string = "";
    public SIFDescription:string = "";
    public RiskMatrix:string = "";
    public TargetSIL:number = 0;
    public ImpactEvents:Array<ImpactEvent> = new Array<ImpactEvent>();
}
export class ImpactEvent
{
    public Id:number = 0;
    public SIFId :number= 0;
    public ImpactEventDesciption:string = "";
    public InitiatingCauses:Array<InitiatingCause> = new Array<InitiatingCause>(); 
    public SIFDesign:SIFDesign=new SIFDesign();
  
}
export class InitiatingCause
{
    public  Id:number = 0; 
    public  IEId:number= 0;  
    public  initiatingCause:string =""; 
    public  IEF:number = 0;    //Initiating Event Frequency

    public  IP:number = 0;       //Ignition Probability
    public  PP:number = 0;      //People Present
    public  TR:number = 0;    //Times at Risk

 
    // public IELA :number = 0;  //Intermediate Event Likelihood for asset
    // public IELE :number = 0;  //Intermediate Event Likelihood for environment
    public  ProtectionLayers:Array<ProtectionLayer> = new Array<ProtectionLayer>();
    public  ImpactEvent:ImpactEvent=new ImpactEvent();
  
    public  RMId?:number; 
    public  RiskMatrix:RiskMatrix=new RiskMatrix();

    public IEL :number = 0;  //Intermediate Event Likelihood for people
  
}
export class ProtectionLayer  //Independent Protection Layer
{
    public  IPLId:number = 0;
    public  ICId:number = 0;
    public  NameOfIPL:string = "";    //Risk Reduction Measure
    public  Description:string = "";
    public  PFD:number = 0; //Probability of Failure on Demand
    public  InitiatingCause:InitiatingCause=new InitiatingCause();
  
}
export class RiskMatrix
{
    public  RMId:number = 0;
    public  Category:string = ""; 
    public  Severity:number = 1;
    public  TRF:number = 0;   //Tolerable Risk Frequency or TMEL

    public  IEId?:number;
    public  ImpactEvent:ImpactEvent=new ImpactEvent();
}
export class Calculation
{
  private sif:SIFDesign=null;
  public calculationId :number = 0;
  public OverallIELP :number = 0;
  public OverallIELE :number = 0;
  public OverallIELA :number = 0;
  public PFDP :number = 0;
  public PFDA :number = 0;
  public PFDE :number = 0;
  public RRFP :number = 0;
  public RRFA :number = 0;
  public RRFE :number = 0;
  public SILP :number = 0;
  public SILA :number = 0;
  public SILE :number = 0;

  constructor(_sif:SIFDesign){
      this.sif=_sif;
      this.CalculateIEL();
      this.CalculateOverallIEL();
      this.CalculatePFD();
      this.CalculateRRF();
      this.CalculateSIL();
  }
  public CalculateIEL(){
      var ielTemp:number=0;
      this.sif.ImpactEvents.forEach(impactevent=>{
          impactevent.InitiatingCauses.forEach(initiatingcause=>{
              initiatingcause.ProtectionLayers.forEach(protectionlayer=>{
                  if(ielTemp==0){
                      ielTemp=protectionlayer.PFD;
                  }
                  else{
                      ielTemp=protectionlayer.PFD*ielTemp;
                  }
              });
              initiatingcause.IEL=ielTemp*initiatingcause.IEF*initiatingcause.IP*initiatingcause.PP*initiatingcause.TR;
          });
      })
      
  }
  public CalculateOverallIEL(){
``
    this.sif.ImpactEvents.forEach(impactevent=>{
        impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category=="Asset").forEach(riska=>{
            if( this.OverallIELA==0){
                this.OverallIELA=riska.IEL
            }
            else{
                this.OverallIELA=riska.IEL*this.OverallIELA;
            }
      });
      impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category==="People").forEach(riskp=>{
        if( this.OverallIELP==0){
            this.OverallIELP=riskp.IEL
        }
        else{
            this.OverallIELP=riskp.IEL*this.OverallIELP;
        }
      });
      impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category=="Environment").forEach(riske=>{
        if( this.OverallIELE==0){
            this.OverallIELE=riske.IEL
        }
        else{
            this.OverallIELE=riske.IEL*this.OverallIELE;
        }
      });
    })
}
public CalculatePFD(){
    ``
        this.sif.ImpactEvents.forEach(impactevent=>{
            impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category=="Asset").forEach(riska=>{
                if( this.PFDA==0){
                    this.PFDA=riska.RiskMatrix.TRF/this.OverallIELA;
                }
          });
          impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category==="People").forEach(riskp=>{
            if( this.PFDP==0){
                this.PFDP=riskp.RiskMatrix.TRF/this.OverallIELP;
            }
          });
          impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category=="Environment").forEach(riske=>{
            if( this.PFDE==0){
                this.PFDE=riske.RiskMatrix.TRF/this.OverallIELE;
            }
          });
        })
    }
public CalculateRRF(){
           this.sif.ImpactEvents.forEach(impactevent=>{
            impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category=="Asset").forEach(riska=>{
                if( this.RRFA==0){
                    this.RRFA=1/this.PFDA;
                }
          });
          impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category==="People").forEach(riskp=>{
            if( this.RRFP==0){
                this.RRFP=1/this.PFDP;
            }
          });
          impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category=="Environment").forEach(riske=>{
            if( this.RRFE==0){
                this.RRFE=1/this.PFDE;
            }
          });
        })
    }
public CalculateSIL(){
    this.sif.ImpactEvents.forEach(impactevent=>{
        impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category=="Asset").forEach(riska=>{
            if( this.SILA==0){
                if(this.RRFA<10){
                    return 0
                }
                else if(this.RRFA<100){
                    return 1
                }
                else if(this.RRFA<1000){
                    return 3
                }
                else{ return 4 }
            }
      });
      impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category==="People").forEach(riskp=>{
        if( this.SILP==0){
            if(this.RRFP<10){
                return 0
            }
            else if(this.RRFP<100){
                return 1
            }
            else if(this.RRFP<1000){
                return 3
            }
            else{ return 4 }
        }
      });
      impactevent.InitiatingCauses.filter(i=>i.RiskMatrix.Category=="Environment").forEach(riske=>{
        if( this.SILE==0){
            if(this.RRFE<10){
                return 0
            }
            else if(this.RRFE<100){
                return 1
            }
            else if(this.RRFE<1000){
                return 3
            }
            else{ return 4 }
        }
      });
    })
  
}
}