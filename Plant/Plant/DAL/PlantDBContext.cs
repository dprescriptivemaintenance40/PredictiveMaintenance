using Microsoft.EntityFrameworkCore;
using Plant.Models;
using Plant.Models.Historical;

namespace Plant.DAL
{
    public class PlantDBContext : DbContext
    {
        public PlantDBContext(DbContextOptions<PlantDBContext> opt) : base(opt)
        {
        }

        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Edge> Edges { get; set; }
        public DbSet<Plants> Plants { get; set; }
        public DbSet<Network> Networks { get; set; }

        //FMEA
        public DbSet<CompressorModel> CompressorsModel { get; set; }
        public DbSet<PumpModel> PumpsModel { get; set; }
        public DbSet<RCM> RCMs { get; set; }
        public DbSet<FailureModes> FailureModes { get; set; }
        public DbSet<MSS> MSS { get; set; }

        //SILClassificationMaster
        public DbSet<SILClassificationMaster> SilClassificationMaster { get; set; }
        public DbSet<RiskMatrixMaster> RiskMatrixMaster { get; set; }
        public DbSet<InitiatingCausesMaster> InitiatingCausesMaster { get; set; }
        //  public DbSet<ConditionalModifiersMaster> ConditionalModifiersMaster { get; set; }
       

        //SILClassification
        public DbSet<SIFDesign> SIFDesign { get; set; }
        public DbSet<ImpactEvent> ImpactEvent { get; set; }
        public DbSet<RiskMatrix> RiskMatrix { get; set; }
        public DbSet<InitiatingCause> InitiatingCause { get; set; }
        public DbSet<ProtectionLayer> ProtectionLayer { get; set; }
        //public DbSet<Calculation> Calculation { get; set; }

        //SILVerification
        public DbSet<SIF> Sif { get; set; }
        public DbSet<Sensor> Sensors { get; set; }
        public DbSet<LogicSolver> LogicSolvers { get; set; }
        public DbSet<FinalElement> FinalElements { get; set; }

        //Report
        public DbSet<ReportTemplateMaster> ReportTemplateMasters { get; set; }
        public DbSet<ReportMaster> ReportMasters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Plants>().ToTable("tblPlant");
            modelBuilder.Entity<Plants>().HasKey(c => c.PlantId);

            modelBuilder.Entity<Network>().ToTable("tblNetwork");
            modelBuilder.Entity<Network>().HasKey(C => C.NetworkId);
            modelBuilder.Entity<Network>()
                .HasOne(p => p.plant)
                    .WithMany(b => b.networks)
                    .HasForeignKey(a => a.PlantId);

            //modelBuilder.Entity<SafetyFactor>().ToTable("tblSafetyFactor");
            //modelBuilder.Entity<SafetyFactor>().HasKey(c => c.SafetyFactorId);
            //modelBuilder.Entity<SafetyFactor>()
            //    .HasOne(p => p.plant)
            //        .WithMany(b => b.safetyFactors)
            //        .HasForeignKey(a => a.PlantId);

            modelBuilder.Entity<Equipment>().ToTable("tblEquipmentList");
            modelBuilder.Entity<Equipment>().HasKey(C => C.EquipmentId);
            modelBuilder.Entity<Equipment>()
                .HasOne(p => p.networks)
                    .WithMany(b => b.equipmentList)
                    .HasForeignKey(a => a.NetworkId);

            modelBuilder.Entity<Edge>().ToTable("tblEdge");
            modelBuilder.Entity<Edge>().HasKey(C => C.EdgeId);
            modelBuilder.Entity<Edge>()
                .HasOne(p => p.networks)
                    .WithMany(b => b.edges)
                    .HasForeignKey(a => a.NetworkId);

            modelBuilder.Entity<CompressorModel>().ToTable("tblCompressorDetails");
            modelBuilder.Entity<CompressorModel>().HasKey(c => c.CompressorId);
            modelBuilder.Entity<CompressorModel>()
             .HasOne(p => p.equipments)
             .WithMany(p => p.compressorModel)
             .HasForeignKey(p => p.EquipmentId);

            modelBuilder.Entity<PumpModel>().ToTable("tblPumpDetails");
            modelBuilder.Entity<PumpModel>().HasKey(c => c.PumpId);
            modelBuilder.Entity<PumpModel>()
             .HasOne(p => p.equipments)
             .WithMany(p => p.pumpModel)
             .HasForeignKey(p => p.EquipmentId);

            modelBuilder.Entity<RCM>().ToTable("tblRCM");
            modelBuilder.Entity<RCM>().HasKey(r => r.RCMId);
            modelBuilder.Entity<FailureModes>().ToTable("tblRCMFailureModel");
            modelBuilder.Entity<FailureModes>().HasKey(r => r.FailureModeId);
            modelBuilder.Entity<MSS>().ToTable("tblMSS");
            modelBuilder.Entity<MSS>().HasKey(r => r.MSSId);

            modelBuilder.Entity<FailureModes>()
                .HasOne(r => r.RCM)
                .WithMany(r => r.failureModes)
                .HasForeignKey(r => r.RCMId);

            modelBuilder.Entity<MSS>()
                .HasOne(r => r.FailureModes)
                .WithMany(r => r.MSS)
                .HasForeignKey(r => r.FailureModeId);


            //SIL Classification

            modelBuilder.Entity<SIFDesign>().ToTable("tblSIFDesign");
            modelBuilder.Entity<SIFDesign>().HasKey(c => c.Id);

            modelBuilder.Entity<ImpactEvent>().ToTable("tblImpactEvent");
            modelBuilder.Entity<ImpactEvent>().HasKey(c => c.Id);
            //modelBuilder.Entity<ImpactEvent>()
            //    .HasOne(p => p.SIFDesign)
            //    .WithMany(p => p.ImpactEvent)
            //    .HasForeignKey(p => p.SIFId);

            modelBuilder.Entity<RiskMatrix>().ToTable("tblRiskMatrix");
            modelBuilder.Entity<RiskMatrix>().HasKey(c => c.RMId);
            
            modelBuilder.Entity<InitiatingCause>().ToTable("tblInitiatingCause");
            modelBuilder.Entity<InitiatingCause>().HasKey(c => c.Id);
            //modelBuilder.Entity<InitiatingCause>()
            //    .HasOne(p => p.ImpactEvent)
            //    .WithMany(p => p.InitiatingCauses)
            //    .HasForeignKey(p => p.IEId);

            //modelBuilder.Entity<ProtectionLayer>().ToTable("tblIPL");
            //modelBuilder.Entity<ProtectionLayer>().HasKey(c => c.Id);
            //modelBuilder.Entity<ProtectionLayer>()
            //    .HasOne(p => p.InitiatingCause)
            //    .WithMany(p => p.ProtectionLayer)
            //    .HasForeignKey(p => p.ICId);

            //modelBuilder.Entity<Calculation>().ToTable("tblCalculation");
            //modelBuilder.Entity<Calculation>().HasKey(c => c.CalculationId);
            //modelBuilder.Entity<Calculation>()
            //    .HasOne(p => p.silClassification)
            //    .WithMany(p => p.calculation)
            //    .HasForeignKey(p => p.SILCId);

            //SIL Classification Master

            modelBuilder.Entity<SILClassificationMaster>().ToTable("tblSILClassificationMaster");
            modelBuilder.Entity<SILClassificationMaster>().HasKey(c => c.SILCMasterId);

            modelBuilder.Entity<RiskMatrixMaster>().ToTable("tblRiskMatrixMaster");
            modelBuilder.Entity<RiskMatrixMaster>().HasKey(c => c.RMMId);
            modelBuilder.Entity<RiskMatrixMaster>()
                .HasOne(p => p.silClassificationMaster)
                .WithMany(p => p.riskMatrixMaster)
                .HasForeignKey(p => p.SILCMasterId);

            modelBuilder.Entity<Category>().ToTable("tblCategory");
            modelBuilder.Entity<Category>().HasKey(c => c.CategoryId);
            modelBuilder.Entity<Category>()
                .HasOne(p => p.riskMatrixMaster)
                .WithMany(p => p.Category)
                .HasForeignKey(p => p.RMMId);

            modelBuilder.Entity<Severity>().ToTable("tblSeverity");
            modelBuilder.Entity<Severity>().HasKey(c => c.SeverityId);
            modelBuilder.Entity<Severity>()
                .HasOne(p => p.riskMatrixMaster)
                .WithMany(p => p.Severity)
                .HasForeignKey(p => p.RMMId);

            modelBuilder.Entity<TRF>().ToTable("tblTRF");
            modelBuilder.Entity<TRF>().HasKey(c => c.TRFId);
            modelBuilder.Entity<TRF>()
                .HasOne(p => p.riskMatrixMaster)
                .WithMany(p => p.TRF)
                .HasForeignKey(p => p.RMMId);

            modelBuilder.Entity<InitiatingCausesMaster>().ToTable("tblInitiatingCausesMaster");
            modelBuilder.Entity<InitiatingCausesMaster>().HasKey(c => c.ICMId);
            modelBuilder.Entity<InitiatingCausesMaster>()
                .HasOne(p => p.silClassificationMaster)
                .WithMany(p => p.initiatingCausesMaster)
                .HasForeignKey(p => p.SILCMasterId);

            //modelBuilder.Entity<ConditionalModifiersMaster>().ToTable("tblConditionalModifiersMaster");
            //modelBuilder.Entity<ConditionalModifiersMaster>().HasKey(c => c.CMMId);
            //modelBuilder.Entity<ConditionalModifiersMaster>()
            //    .HasOne(p => p.silClassificationMaster)
            //    .WithMany(p => p.conditionalModifiersMaster)
            //    .HasForeignKey(p => p.SILCMasterId);

            //modelBuilder.Entity<IP>().ToTable("tblIP");
            //modelBuilder.Entity<IP>().HasKey(c => c.IPId);
            //modelBuilder.Entity<IP>()
            //    .HasOne(p => p.conditionalModifiersMaster)
            //    .WithMany(p => p.IP)
            //    .HasForeignKey(p => p.IPId);

            //modelBuilder.Entity<PP>().ToTable("tblPP");
            //modelBuilder.Entity<PP>().HasKey(c => c.PPId);
            //modelBuilder.Entity<PP>()
            //    .HasOne(p => p.conditionalModifiersMaster)
            //    .WithMany(p => p.PP)
            //    .HasForeignKey(p => p.PPId);

            //modelBuilder.Entity<TR>().ToTable("tblTR");
            //modelBuilder.Entity<TR>().HasKey(c => c.TRId);
            //modelBuilder.Entity<TR>()
            //    .HasOne(p => p.conditionalModifiersMaster)
            //    .WithMany(p => p.TR)
            //    .HasForeignKey(p => p.TRId);



            //SIL Verification

            //modelBuilder.Entity<SIS>().ToTable("tblSIS");
            //modelBuilder.Entity<SIS>().HasKey(c => c.SISId);
            //modelBuilder.Entity<SIS>()
            //  .HasOne(p => p.SafetyFactor)
            //  .WithMany(p => p.sis)
            //  .HasForeignKey(p => p.SafetyFactorId);

            modelBuilder.Entity<SIF>().ToTable("tblSIF");
            modelBuilder.Entity<SIF>().HasKey(c => c.SIFId);
            modelBuilder.Entity<SIF>()
             .HasOne(p => p.equipments)
             .WithMany(p => p.sif)
             .HasForeignKey(p => p.EquipmentId);

            //modelBuilder.Entity<Elements>().ToTable("tblElements");
            //modelBuilder.Entity<Elements>().HasKey(c => c.ElementId);

            modelBuilder.Entity<Sensor>().ToTable("tblSensor");
            modelBuilder.Entity<Sensor>().HasKey(c => c.SensorId);
            modelBuilder.Entity<Sensor>()
             .HasOne(p => p.sif)
             .WithMany(p => p.sensors)
            .HasForeignKey(p => p.SIFId);

            modelBuilder.Entity<ReportTemplateMaster>().ToTable("tblReportTemplate");

            modelBuilder.Entity<LogicSolver>().ToTable("tblLogicSolver");
            modelBuilder.Entity<LogicSolver>().HasKey(c => c.LogicSolverId);
            modelBuilder.Entity<LogicSolver>()
             .HasOne(p => p.sif)
             .WithMany(p => p.logicSolver)
             .HasForeignKey(p => p.SIFId);

            modelBuilder.Entity<FinalElement>().ToTable("tblFinalElement");
            modelBuilder.Entity<FinalElement>().HasKey(c => c.FinalElementId);
            modelBuilder.Entity<FinalElement>()
             .HasOne(p => p.sif)
             .WithMany(p => p.finalElement)
             .HasForeignKey(p => p.SIFId);



            //Data Seeding
            modelBuilder.Entity<SILClassificationMaster>()
               .HasData(
                new SILClassificationMaster
                {
                    SILCMasterId = 1
                }
               );

            modelBuilder.Entity<RiskMatrixMaster>()
              .HasData(
               new RiskMatrixMaster
               {
                   SILCMasterId = 1,
                   RMMId=1
               }
              );

            modelBuilder.Entity<Category>()
             .HasData(
              new Category
              {
                  RMMId = 1,
                  CategoryId=1,
                  CategoryName="People"
              },
              new Category
              {
                  RMMId = 1,
                  CategoryId = 2,
                  CategoryName = "Environment"
              },
              new Category
              {
                  RMMId = 1,
                  CategoryId = 3,
                  CategoryName = "Asset"
              }
             );
            modelBuilder.Entity<Severity>()
             .HasData(
              new Severity
              {
                  RMMId = 1,
                  SeverityId=1,
                  SeverityValue=1
              },
              new Severity
              {
                  RMMId = 1,
                  SeverityId = 2,
                  SeverityValue = 2
              },
              new Severity
              {
                  RMMId = 1,
                  SeverityId = 3,
                  SeverityValue = 3
              },
              new Severity
              {
                  RMMId = 1,
                  SeverityId = 4,
                  SeverityValue = 4
              },
              new Severity
              {
                  RMMId = 1,
                  SeverityId = 5,
                  SeverityValue = 5
              },
              new Severity
              {
                  RMMId = 1,
                  SeverityId = 6,
                  SeverityValue = 6
              }
             );
            modelBuilder.Entity<TRF>()
             .HasData(
              new TRF
              {
                  RMMId = 1,
                  TRFId = 1,
                  TRFValue = 1.00E-01F
              },
              new TRF
              {
                  RMMId = 1,
                  TRFId = 2,
                  TRFValue = 1.00E-02F
              },
              new TRF
              {
                  RMMId = 1,
                  TRFId = 3,
                  TRFValue = 1.00E-03F
              },
              new TRF
              {
                  RMMId = 1,
                  TRFId = 4,
                  TRFValue = 1.00E-04F
              },
              new TRF
              {
                  RMMId = 1,
                  TRFId = 5,
                  TRFValue = 1.00E-05F
              },
              new TRF
              {
                  RMMId = 1,
                  TRFId = 6,
                  TRFValue = 1.00E-06F
              }
            );

            modelBuilder.Entity<InitiatingCausesMaster>()
             .HasData(
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 1,
                  InitiatingCause= "Aboveground piping full breach failure (pipe size <= 150mm, 6 in)",
                  IEF= 1.00E-06F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 2,
                  InitiatingCause = "Aboveground piping full breach failure(pipe size > 150mm, 6 in)",
                  IEF = 1.00E-07F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 3,
                  InitiatingCause = "Aboveground piping leak (pipe size <=150mm, 6 in)",
                  IEF = 1.00E-05F
              },
              new InitiatingCausesMaster
              {
                   SILCMasterId = 1,
                   ICMId = 4,
                   InitiatingCause = "Aboveground piping leak(pipe size > 150 mm, 6 in)",
                   IEF = 1.00E-06F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 5,
                  InitiatingCause = "Underground piping leak (full breach)",
                  IEF = 1.00E-06F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 6,
                  InitiatingCause = "Atmospheric tank catastrophic failure",
                  IEF = 1.00E-05F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 7,
                  InitiatingCause = "Atmspheric tank leak, 10-mm diameter, continuos",
                  IEF = 1.00E-04F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 8,
                  InitiatingCause = "BPCS control loop failure",
                  IEF = 1.00E-01F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 9,
                  InitiatingCause = "Cooling water failure",
                  IEF = 1.00E-01F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 10,
                  InitiatingCause = "Crane load drop",
                  IEF = 1.00E-03F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 11,
                  InitiatingCause = "External fire, large (aggregate causes)",
                  IEF = 1.00E-02F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 12,
                  InitiatingCause = "External fire, small (aggregate causes)",
                  IEF = 1.00E-01F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 13,
                  InitiatingCause = "External Impact (by backbone, vehicle etc) ",
                  IEF = 1.00E-02F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 14,
                  InitiatingCause = "Future of check valve (hgh demand)",
                  IEF = 1.00E-01F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 15,
                  InitiatingCause = "Failure of double check valves in series (high demand)",
                  IEF = 1.00E-02F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 16,
                  InitiatingCause = "Hose leak",
                  IEF = 1.00E-01F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 17,
                  InitiatingCause = "Hose rupture",
                  IEF = 1.00E-02F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 18,
                  InitiatingCause = "Human error during task performed less than once per month",
                  IEF = 1.00E-02F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 19,
                  InitiatingCause = "Human error during task performed more than once per month but less than once per week",
                  IEF = 1.00E-01F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 20,
                  InitiatingCause = "Human error during task performed once per week or more ofter",
                  IEF = 1.00E+00F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 21,
                  InitiatingCause = "Lightning strike",
                  IEF = 1.00E-03F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 22,
                  InitiatingCause = "Operator failure (to execute a complete, routine procedure; well-trained operator,unstressed, not fatigued)",
                  IEF = 1.00E-02F
              }, new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 23,
                  InitiatingCause = "Premature opening of spring loaded relief valve",
                  IEF = 1.00E-02F
              }, new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 24,
                  InitiatingCause = "Pressure regulator failure",
                  IEF = 1.00E-01F
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 25,
                  InitiatingCause = "Pressure vesssel catastrophic failure",
                  IEF = 1.00E-05F
              },
              new InitiatingCausesMaster
               {
                   SILCMasterId = 1,
                   ICMId = 26,
                   InitiatingCause = "Pump seal complete failure",
                   IEF = 1.00E-01F
               },
               new InitiatingCausesMaster
               {
                    SILCMasterId = 1,
                    ICMId = 27,
                    InitiatingCause = "Pump seal leak",
                    IEF = 1.00E+00F
               },
               new InitiatingCausesMaster
               {
                     SILCMasterId = 1,
                     ICMId = 28,
                     InitiatingCause = "Pump, compressor, fan or blower failure",
                     IEF = 1.00E-01F
               },
               new InitiatingCausesMaster
               {
                     SILCMasterId = 1,
                     ICMId = 29,
                     InitiatingCause = "Screw conveyor failure",
                     IEF = 1.00E+00F
               },
               new InitiatingCausesMaster
               {
                   SILCMasterId = 1,
                   ICMId = 30,
                   InitiatingCause = "Screw conveyor overheating of material",
                   IEF = 1.00E-01F
               },
               new InitiatingCausesMaster
               {
                   SILCMasterId = 1,
                   ICMId = 31,
                   InitiatingCause = "Single circuit loss of power",
                   IEF = 1.00E-01F
               },
               new InitiatingCausesMaster
               {
                   SILCMasterId = 1,
                   ICMId = 32,
                   InitiatingCause = "Spurious operation of safety controls, Alarms  & interlocks",
                   IEF = 1.00E-01F
               },
               new InitiatingCausesMaster
               {
                   SILCMasterId = 1,
                   ICMId = 33,
                   InitiatingCause = "Turbine/diesel engine overspeed with casing breach",
                   IEF = 1.00E-04F
               },
               new InitiatingCausesMaster
               {
                   SILCMasterId = 1,
                   ICMId = 34,
                   InitiatingCause = "Malfunction of Level Transmitter",
                   IEF = 1.00E-03F
               }
             );  
        }
    }

}


