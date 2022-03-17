export class SIFDesign {
    // private calculation: Calculation = null;
    // constructor() {
    //     this.calculation = new Calculation(this);
    // }
    public Id: number = 0;
    public HazopNodeId: number = 0;
    public InterLockTag: string = "";
    public Sensor: string = "";
    public FinalElement: string = "";
    public SIFDescription: string = "";
    public RiskMatrix: string = "";
    public TargetSIL: number = 0;
    public ImpactEvents: Array<ImpactEvent> = new Array<ImpactEvent>();
}

export class ImpactEvent {
    public Id: number = 0;
    public SIFId: number = 0;
    public ImpactEventDesciption: string = "";
    public RiskMatrix: Array<RiskMatrix> = new Array<RiskMatrix>();
    public SIFDesign: SIFDesign = new SIFDesign();

}

export class RiskMatrix {
    public RMId: number = 0;
    public IEId: number;
    public Category: string = "";
    public Severity: string = "";
    public TRF: number = 0;   //Tolerable Risk Frequency or TMEL
    public InitiatingCauses: Array<InitiatingCause> = new Array<InitiatingCause>();

    public ImpactEvent: ImpactEvent = new ImpactEvent();
}

export class InitiatingCause {
    public Id: number = 0;
    public RMId: number;
    public initiatingCause: string = "";
    public IEF: number = 0;    //Initiating Event Frequency

    public IP: number = 0;       //Ignition Probability
    public PP: number = 0;      //People Present
    public TR: number = 0;    //Times at Risk

    public ProtectionLayers: Array<ProtectionLayer> = new Array<ProtectionLayer>();
    public DynamicGroupNames: Array<DynamicGroupName> = new Array<DynamicGroupName>();
    public RiskMatrix: RiskMatrix = new RiskMatrix();

    public IELP: number = 0;  //Intermediate Event Likelihood for people
    public IELE: number = 0;  //Intermediate Event Likelihood for people
    public IELA: number = 0;  //Intermediate Event Likelihood for people

}

export class ProtectionLayer  //Independent Protection Layer
{
    public Id: number = 0;
    public ICId: number = 0;
    public NameOfIPL: string = "";    //Risk Reduction Measure
    public Description: string = "";
    public PFD: number = 0; //Probability of Failure on Demand
    public InitiatingCause: InitiatingCause = new InitiatingCause();
}
export class DynamicGroupName
{
    public DynamicId :number=0;
    public ICId:number=0;
    public GroupName :string ="";
    public pfdDescription :string ="";
    public pfdValue :number=0;
    public InitiatingCause: InitiatingCause = new InitiatingCause();

}

// export class DynamicGroupName {
//     public Id: number = 0;
//     public InitiantingId: number = 0;
//     public GroupName: string = "";
//     public DynamicValues: Array<DynamicValue> = new Array<DynamicValue>();
// }

// export class DynamicValue {
//     public Id: number = 0;
//     public pfdDescription: string = "";
//     public pfdValue: number = 0;
// }

export class Calculation {
    public sif: SIFDesign = new SIFDesign();
    public calculationId: number = 0;
    public SIFId: number;
    public TRFP: number = 0;   //Tolerable Risk Frequency or TMEL
    public TRFE: number = 0;   //Tolerable Risk Frequency or TMEL
    public TRFA: number = 0;   //Tolerable Risk Frequency or TMEL
    public OverallIELP: number = 0;
    public OverallIELE: number = 0;
    public OverallIELA: number = 0;
    public PFDP: number = 0;
    public PFDA: number = 0;
    public PFDE: number = 0;
    public RRFP: number = 0;
    public RRFA: number = 0;
    public RRFE: number = 0;
    public SILP: number = 0;
    public SILA: number = 0;
    public SILE: number = 0;

    constructor(_sif: SIFDesign) {
        this.sif = _sif;
        this.CalculateIEL();
        this.CalculateOverallIEL();
        this.CalculatePFD();
        this.CalculateRRF();
        this.CalculateSIL();
        this.CalculateTargetSIL();
    }
    public CalculateIEL() {
        var ielTemp: number = 0;
        var ielTemp1: number = 1;
        this.SIFId = this.sif.Id;
        this.sif.ImpactEvents.forEach(impactevent => {
            impactevent.RiskMatrix.filter(i => i.Category == "P").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(initiatingcause => {
                    initiatingcause.ProtectionLayers.forEach(protectionlayer => {
                        if (ielTemp == 0) {
                            ielTemp = protectionlayer.PFD;
                        }
                        else {
                            ielTemp1 *= protectionlayer.PFD;
                        }
                    });
                    initiatingcause.IELP = ielTemp1 * ielTemp * initiatingcause.IEF * initiatingcause.IP * initiatingcause.PP * initiatingcause.TR;
                    ielTemp1=1;
                    ielTemp=0;

                });
            });
            impactevent.RiskMatrix.filter(i => i.Category == "E").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(initiatingcause => {
                    initiatingcause.ProtectionLayers.forEach(protectionlayer => {
                        if (ielTemp == 0) {
                            ielTemp = protectionlayer.PFD;
                        }
                        else {
                            ielTemp1 *= protectionlayer.PFD;
                        }
                    });
                    initiatingcause.IELE = ielTemp1 * ielTemp * initiatingcause.IEF * initiatingcause.IP * initiatingcause.PP * initiatingcause.TR;
                    ielTemp1=1;
                    ielTemp=0;
                });
            });
            impactevent.RiskMatrix.filter(i => i.Category == "A").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(initiatingcause => {
                    initiatingcause.ProtectionLayers.forEach(protectionlayer => {
                        if (ielTemp == 0) {
                            ielTemp = protectionlayer.PFD;
                        }
                        else {
                            ielTemp1 *= protectionlayer.PFD ;
                        }
                    });
                    initiatingcause.IELA = ielTemp1 * ielTemp * initiatingcause.IEF * initiatingcause.IP * initiatingcause.PP * initiatingcause.TR;
                    ielTemp1=1;
                    ielTemp=0;
                });
            });
        })

    }
    public CalculateOverallIEL() {

        this.sif.ImpactEvents.forEach(impactevent => {
            impactevent.RiskMatrix.filter(i => i.Category == "P").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riskp => {
                    if (this.OverallIELP == 0) {
                        this.OverallIELP = riskp.IELP
                    }
                    else {
                        this.OverallIELP = riskp.IELP + this.OverallIELP;
                    }
                });
            });
            
            impactevent.RiskMatrix.filter(i => i.Category == "E").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riske => {
                    if (this.OverallIELE == 0) {
                        this.OverallIELE = riske.IELE
                    }
                    else {
                        this.OverallIELE = riske.IELE + this.OverallIELE;
                    }
                });
            });
            impactevent.RiskMatrix.filter(i => i.Category == "A").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riska => {
                    if (this.OverallIELA == 0) {
                        this.OverallIELA = riska.IELA
                    }
                    else {
                        this.OverallIELA = riska.IELA + this.OverallIELA;
                    }
                });
            });
        })
    }
    public CalculatePFD() {

        this.sif.ImpactEvents.forEach(impactevent => {
            impactevent.RiskMatrix.filter(i => i.Category == "P").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riskp => {
                    if (this.PFDP == 0) {
                        this.PFDP = riskmatrix.TRF / this.OverallIELP;
                        this.TRFP = riskmatrix.TRF;
                    }
                });
            });
            impactevent.RiskMatrix.filter(i => i.Category == "E").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riske => {
                    if (this.PFDE == 0) {
                        this.PFDE = riskmatrix.TRF / this.OverallIELE;
                        this.TRFE = riskmatrix.TRF;
                    }
                });
            });
            impactevent.RiskMatrix.filter(i => i.Category == "A").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riska => {
                    if (this.PFDA == 0) {
                        this.PFDA = riskmatrix.TRF / this.OverallIELA;
                        this.TRFA = riskmatrix.TRF;
                    }
                });
            });
        })
    }
    public CalculateRRF() {
        this.sif.ImpactEvents.forEach(impactevent => {
            impactevent.RiskMatrix.filter(i => i.Category == "A").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.filter(i => i.RiskMatrix.Category == "A").forEach(riska => {
                    if (this.RRFA == 0) {
                        this.RRFA = 1 / this.PFDA;
                    }
                });
            });
            impactevent.RiskMatrix.filter(i => i.Category == "P").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riskp => {
                    if (this.RRFP == 0) {
                        this.RRFP = 1 / this.PFDP;
                    }
                });
            });
            impactevent.RiskMatrix.filter(i => i.Category == "E").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riske => {
                    if (this.RRFE == 0) {
                        this.RRFE = 1 / this.PFDE;
                    }
                });
            });
        })
    }
    public CalculateSIL() {
        this.sif.ImpactEvents.forEach(impactevent => {
            impactevent.RiskMatrix.filter(i => i.Category == "A").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riska => {
                    if (this.SILA == 0) {
                        if (this.RRFA < 10) {
                            this.SILA = 0
                        }
                        else if (this.RRFA > 10 && this.RRFA < 100) {
                            this.SILA = 1
                        }
                        else if (this.RRFA > 100 && this.RRFA < 1000) {
                            this.SILA = 2
                        }
                        else if (this.RRFA > 1000 && this.RRFA < 10000) {
                            this.SILA = 3
                        }
                        else if (this.RRFA > 10000 && this.RRFA < 100000) {
                            this.SILA = 4
                        }
                        else {
                            alert("Need another SIF")
                        }
                    }
                });
            });
            impactevent.RiskMatrix.filter(i => i.Category == "P").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riskp => {
                    if (this.SILP == 0) {
                        if (this.RRFP < 10) {
                            this.SILP = 0
                        }
                        else if (this.RRFP > 10 && this.RRFP < 100) {
                            this.SILP = 1
                        }
                        else if (this.RRFP > 100 && this.RRFP < 1000) {
                            this.SILA = 2
                        }
                        else if (this.RRFP > 1000 && this.RRFP < 10000) {
                            this.SILA = 3
                        }
                        else if (this.RRFP > 10000 && this.RRFP < 100000) {
                            this.SILA = 4
                        }
                        else {
                            alert("Need another SIF")
                        }
                    }
                });
            });
            impactevent.RiskMatrix.filter(i => i.Category == "E").forEach(riskmatrix => {
                riskmatrix.InitiatingCauses.forEach(riske => {
                    if (this.SILE == 0) {
                        if (this.RRFE < 10) {
                            this.SILE = 0
                        }
                        else if (this.RRFE > 10 && this.RRFE < 100) {
                            this.SILE = 1
                        }
                        else if (this.RRFE > 100 && this.RRFE < 1000) {
                            this.SILE = 2
                        }
                        else if (this.RRFE > 1000 && this.RRFE < 10000) {
                            this.SILE = 3
                        }
                        else if (this.RRFE > 10000 && this.RRFE < 100000) {
                            this.SILE = 4
                        }
                        else {
                            alert("Need another SIF")
                        }
                    }
                });
            });
        })

    }
    public CalculateTargetSIL() {
        if (this.SILP >= this.SILA && this.SILP >= this.SILE) {
            this.sif.TargetSIL = this.SILP;
        }
        else if (this.SILA >= this.SILP && this.SILA >= this.SILE) {
            this.sif.TargetSIL = this.SILA;
        }
        else {
            this.sif.TargetSIL = this.SILE;
        }
    }

}