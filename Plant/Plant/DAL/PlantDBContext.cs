using DPM.Models.Prescriptive;
using Microsoft.EntityFrameworkCore;
using Plant.Models;
using Plant.Models.Plant;
using Plant.Models.PredictiveMaintenance;
using Plant.Models.PredictiveMaintenance.DataExplanation;
using Plant.Models.PredictiveMaintenance.ModelConfidence;
using Plant.Models.PredictiveMaintenance.PredictiveChart;
using Plant.Models.RCA;


namespace Plant.DAL
{
    public class PlantDBContext : DbContext
    {
        public PlantDBContext(DbContextOptions<PlantDBContext> opt) : base(opt)
        {
        }

        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Plants> Plants { get; set; }
        public DbSet<mst_Asset> mst_Asset { get; set; }
        public DbSet<Models.Plant.FailureMode> FailureMode { get; set; }
        public DbSet<ScrewParameter> ScrewParameters { get; set; }
        public DbSet<ScrewStagingTable> ScrewStagingTables { get; set; }
        public DbSet<ScrewCleaningTable> ScrewCleaningTables { get; set; }
        public DbSet<ScrewErrorTable> ScrewErrorTables { get; set; }

        public DbSet<ScrewProcessedTable> ScrewProcessedTables { get; set; }
        public DbSet<ScrewPredictedTable> ScrewPredictedTables { get; set; }
        public DbSet<CentrifugalParameter> CentrifugalParameters { get; set; }
        public DbSet<CentrifugalStagingTable> CentrifugalStagingTables { get; set; }
        public DbSet<CentrifugalCleaningTable> CentrifugalCleaningTables { get; set; }
        public DbSet<CentrifugalErrorTable> CentrifugalErrorTables { get; set; }
        public DbSet<CentrifugalProcessedTable> CentrifugalProcessedTables { get; set; }
        public DbSet<CentrifugalPredictedTable> CentrifugalPredictedTables { get; set; }
        public DbSet<ReciprocatingParameter> ReciprocatingParameters { get; set; }
        public DbSet<ReciprocatingStagingTable> ReciprocatingStagingTables { get; set; }
        public DbSet<ReciprocatingCleaningTable> ReciprocatingCleaningTables { get; set; }
        public DbSet<ReciprocatingErrorTable> ReciprocatingErrorTables { get; set; }
        public DbSet<ReciprocatingProcessedTable> ReciprocatingProcessedTables { get; set; }
        public DbSet<ReciprocatingPredictedTable> ReciprocatingPredicteds { get; set; }

        //FMEA
        public DbSet<RCM> RCMs { get; set; }
        public DbSet<PrescriptiveLookupMasterModel> PrescriptiveLookupMassterModelData { get; set; }
        public DbSet<Models.FailureModes> FailureModes { get; set; }
        public DbSet<MSS> MSS { get; set; }

        //RCA
        //PlantNetwork
        public DbSet<PlantNetwork> PlantNetwork { get; set; }
        public DbSet<Equipments> Equipment { get; set; }
        public DbSet<EquipmentWithoutCalculations> EquipmentWithoutCalculations { get; set; }
        public DbSet<EquipmentWithCalculations> EquipmentWithCalculations { get; set; }
        public DbSet<Edges> Edge { get; set; }

        public DbSet<PrescriptiveCbaModel> PrescriptiveCbaModels { get; set; }
        public DbSet<CBAFailureMode> CBAFailureModes { get; set; }
        public DbSet<CBAMaintenanceTask> CBAMaintenanceTasks { get; set; }
        public DbSet<CBAMainenanceInterval> CBAMainenanceIntervals { get; set; }

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

        public DbSet<DynamicGroupName> DynamicGroupName { get; set; }
        public DbSet<Calculation> Calculation { get; set; }

        //SILVerification
        public DbSet<SIF> Sif { get; set; }
        public DbSet<Sensor> Sensors { get; set; }
        public DbSet<LogicSolver> LogicSolvers { get; set; }
        public DbSet<FinalElement> FinalElements { get; set; }

        //Report
        //public DbSet<ReportTemplateMaster> ReportTemplateMasters { get; set; }
        public DbSet<ReportMaster> ReportMasters { get; set; }

        //PredictiveMaintenance
        public DbSet<PredictiveChart> PredictiveCharts { get; set; }
        public DbSet<ModelConfidence> ModelConfidences { get; set; }
        public DbSet<DataExplanation> DataExplanations { get; set; }
        public DbSet<PredictivePercentage> PredictivePercentages { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Plants>().ToTable("Plant");
            modelBuilder.Entity<Plants>().HasKey(c => c.PlantId);

            modelBuilder.Entity<mst_Asset>().ToTable("mst_Asset");
            modelBuilder.Entity<mst_Asset>().HasKey(c => c.AssetId);


            //FMEA
            modelBuilder.Entity<RCM>().ToTable("RCM");
            //modelBuilder.Entity<RCM>().HasKey(r => r.RCMId);
            modelBuilder.Entity<PrescriptiveLookupMasterModel>().ToTable("prescriptive_lookupmaster");
            modelBuilder.Entity<FailureModes>().ToTable("RCMFailureModel");
            modelBuilder.Entity<Models.FailureModes>().HasKey(r => r.FailureModeId);
            modelBuilder.Entity<MSS>().ToTable("MSS");
            modelBuilder.Entity<MSS>().HasKey(r => r.MSSId);

            modelBuilder.Entity<Models.FailureModes>()
                .HasOne(r => r.RCM)
                .WithMany(r => r.failureModes)
                .HasForeignKey(r => r.RCMId);

            modelBuilder.Entity<MSS>()
                .HasOne(r => r.FailureModes)
                .WithMany(r => r.MSS)
                .HasForeignKey(r => r.FailureModeId);

            modelBuilder.Entity<PrescriptiveCbaModel>().ToTable("prescriptivecbatable");
            modelBuilder.Entity<CBAFailureMode>().ToTable("cbafailuremodes");
            modelBuilder.Entity<CBAFailureMode>()
                        .HasOne(p => p.PrescriptiveCbaModels)
                        .WithMany(b => b.CBAFailureModes)
                        .HasForeignKey(a => a.PCMId);
            modelBuilder.Entity<CBAMaintenanceTask>().ToTable("cbamaintenancetask");
            modelBuilder.Entity<CBAMaintenanceTask>()
                        .HasOne(p => p.CBAFailureMode)
                        .WithMany(b => b.CBAMaintenanceTasks)
                        .HasForeignKey(a => a.CFMId);
            modelBuilder.Entity<CBAMainenanceInterval>().ToTable("cbamainenanceinterval");
            modelBuilder.Entity<CBAMainenanceInterval>()
                        .HasOne(p => p.CBAMaintenanceTasks)
                        .WithMany(b => b.CBAMainenanceIntervals)
                        .HasForeignKey(a => a.CMTId);

            //NetworkDiagram
            modelBuilder.Entity<PlantNetwork>().ToTable("PlantNetwork");
            modelBuilder.Entity<Equipments>().ToTable("PlantEquipments");
            modelBuilder.Entity<Equipments>()
                        .HasOne(p => p.plantNetwork)
                        .WithMany(b => b.equipment)
                        .HasForeignKey(a => a.PlantId);
            modelBuilder.Entity<EquipmentWithoutCalculations>().ToTable("EquipmentWithoutCalculations");
            modelBuilder.Entity<EquipmentWithoutCalculations>()
                        .HasOne(p => p.equipment)
                        .WithMany(b => b.equipmentWithoutCalculations)
                        .HasForeignKey(a => a.EquipmentId);
            modelBuilder.Entity<EquipmentWithCalculations>().ToTable("EquipmentWithCalculations");
            modelBuilder.Entity<EquipmentWithCalculations>()
                        .HasOne(p => p.equipment)
                        .WithMany(b => b.equipmentWithCalculations)
                        .HasForeignKey(a => a.EquipmentId);
            modelBuilder.Entity<Edges>().ToTable("PlantEdges");
            modelBuilder.Entity<Edges>()
                        .HasOne(p => p.plantNetwork)
                        .WithMany(b => b.edge)
                        .HasForeignKey(a => a.PlantId);

            //SIL Classification

            modelBuilder.Entity<SIFDesign>().ToTable("SIFDesign");
            modelBuilder.Entity<SIFDesign>().HasKey(c => c.Id);

            modelBuilder.Entity<ImpactEvent>().ToTable("ImpactEvent");
            modelBuilder.Entity<ImpactEvent>().HasKey(c => c.Id);
            modelBuilder.Entity<ImpactEvent>()
                .HasOne(p => p.SIFDesign)
                .WithMany(p => p.ImpactEvents)
                .HasForeignKey(p => p.SIFId);

            modelBuilder.Entity<RiskMatrix>().ToTable("RiskMatrix");
            modelBuilder.Entity<RiskMatrix>().HasKey(c => c.RMId);
            modelBuilder.Entity<RiskMatrix>()
               .HasOne(p => p.ImpactEvent)
               .WithMany(p => p.RiskMatrix)
               .HasForeignKey(p => p.IEId);

            modelBuilder.Entity<InitiatingCause>().ToTable("InitiatingCause");
            modelBuilder.Entity<InitiatingCause>().HasKey(c => c.Id);
            modelBuilder.Entity<InitiatingCause>()
                .HasOne(p => p.RiskMatrix)
                .WithMany(p => p.InitiatingCauses)
                .HasForeignKey(p => p.RMId);

            modelBuilder.Entity<ProtectionLayer>().ToTable("IPL");
            modelBuilder.Entity<ProtectionLayer>().HasKey(c => c.Id);
            modelBuilder.Entity<ProtectionLayer>()
                .HasOne(p => p.InitiatingCause)
                .WithMany(p => p.ProtectionLayers)
                .HasForeignKey(p => p.ICId);

            modelBuilder.Entity<DynamicGroupName>().ToTable("DynamicColumns");
            modelBuilder.Entity<DynamicGroupName>().HasKey(c => c.DynamicId);
            modelBuilder.Entity<DynamicGroupName>()
               .HasOne(p => p.InitiatingCause)
               .WithMany(p => p.DynamicGroupNames)
               .HasForeignKey(p => p.ICId);


            modelBuilder.Entity<Calculation>().ToTable("Calculation");
            modelBuilder.Entity<Calculation>().HasKey(c => c.calculationId);
            //modelBuilder.Entity<Calculation>()
            //    .HasOne(p => p.silClassification)
            //    .WithMany(p => p.calculation)
            //    .HasForeignKey(p => p.SILCId);

            //SIL Classification Master

            modelBuilder.Entity<SILClassificationMaster>().ToTable("SILClassification_Master");
            modelBuilder.Entity<SILClassificationMaster>().HasKey(c => c.SILCMasterId);

            modelBuilder.Entity<RiskMatrixMaster>().ToTable("RiskMatrix_Master");
            modelBuilder.Entity<RiskMatrixMaster>().HasKey(c => c.RMMId);
            modelBuilder.Entity<RiskMatrixMaster>()
                .HasOne(p => p.silClassificationMaster)
                .WithMany(p => p.riskMatrixMaster)
                .HasForeignKey(p => p.SILCMasterId);

            modelBuilder.Entity<Category>().ToTable("Category");
            modelBuilder.Entity<Category>().HasKey(c => c.CategoryId);
            modelBuilder.Entity<Category>()
                .HasOne(p => p.riskMatrixMaster)
                .WithMany(p => p.Category)
                .HasForeignKey(p => p.RMMId);

            modelBuilder.Entity<Severity>().ToTable("Severity");
            modelBuilder.Entity<Severity>().HasKey(c => c.SeverityId);
            modelBuilder.Entity<Severity>()
                .HasOne(p => p.riskMatrixMaster)
                .WithMany(p => p.Severity)
                .HasForeignKey(p => p.RMMId);

            modelBuilder.Entity<TRF>().ToTable("TRF");
            modelBuilder.Entity<TRF>().HasKey(c => c.TRFId);
            modelBuilder.Entity<TRF>()
                .HasOne(p => p.riskMatrixMaster)
                .WithMany(p => p.TRF)
                .HasForeignKey(p => p.RMMId);

            modelBuilder.Entity<InitiatingCausesMaster>().ToTable("InitiatingCauses_Master");
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

            modelBuilder.Entity<SIF>().ToTable("SIF");
            modelBuilder.Entity<SIF>().HasKey(c => c.SIFId);
            modelBuilder.Entity<SIF>()
             .HasOne(p => p.Equipment)
             .WithMany(p => p.sif)
             .HasForeignKey(p => p.EquipmentId);

            //modelBuilder.Entity<Elements>().ToTable("tblElements");
            //modelBuilder.Entity<Elements>().HasKey(c => c.ElementId);

            modelBuilder.Entity<Sensor>().ToTable("Sensor");
            modelBuilder.Entity<Sensor>().HasKey(c => c.SensorId);
            modelBuilder.Entity<Sensor>()
             .HasOne(p => p.sif)
             .WithMany(p => p.sensors)
            .HasForeignKey(p => p.SIFId);

            //modelBuilder.Entity<ReportTemplateMaster>().ToTable("tblReportTemplate");

            modelBuilder.Entity<LogicSolver>().ToTable("LogicSolver");
            modelBuilder.Entity<LogicSolver>().HasKey(c => c.LogicSolverId);
            modelBuilder.Entity<LogicSolver>()
             .HasOne(p => p.sif)
             .WithMany(p => p.logicSolver)
             .HasForeignKey(p => p.SIFId);

            modelBuilder.Entity<FinalElement>().ToTable("FinalElement");
            modelBuilder.Entity<FinalElement>().HasKey(c => c.FinalElementId);
            modelBuilder.Entity<FinalElement>()
             .HasOne(p => p.sif)
             .WithMany(p => p.finalElement)
             .HasForeignKey(p => p.SIFId);

            //Report
            modelBuilder.Entity<ReportMaster>().ToTable("Report");


            //PredictiveMaintenance
            modelBuilder.Entity<PredictiveChart>().ToTable("Predictive_CsvData");
            modelBuilder.Entity<ModelConfidence>().ToTable("ModelConfidence_CsvData");
            modelBuilder.Entity<DataExplanation>().ToTable("DataExplanation");
            modelBuilder.Entity<PredictivePercentage>().ToTable("PredictivePercentage");




            //Data Seeding
            modelBuilder.Entity<Plants>()
                .HasData(
                  new Plants
                  {
                      PlantId=1,
                      PlantName="Calvart",
                      Location="Mumbai",
                      OrganizationId=1
                  }
                );
           modelBuilder.Entity<mst_Asset>()
                .HasData(
                   new mst_Asset
                   {
                       PlantId = 1,
                       AssetId = 1,
                       AssetName = "Rotary"
                   },
                   new mst_Asset
                   {
                       PlantId = 1,
                       AssetId = 2,
                       AssetName = "Compressor",
                       Id_fk = 1
                   },
                   new mst_Asset
                   {
                       PlantId = 1,
                       AssetId = 3,
                       AssetName = "Pump",
                       Id_fk = 1
                   },
                   new mst_Asset
                   {
                       PlantId = 1,
                       AssetId = 4,
                       AssetName = "ScrewCompressor",
                       Id_fk = 2
                   },
                   new mst_Asset
                   {
                       PlantId = 1,
                       AssetId = 5,
                       AssetName = "CentrifugalCompressor",
                       Id_fk = 2
                   },
                   new mst_Asset
                   {
                       PlantId = 1,
                       AssetId = 6,
                       AssetName = "ReciprocatingCompressor",
                       Id_fk = 2
                   },
                   new mst_Asset
                   {
                       PlantId = 1,
                       AssetId = 7,
                       AssetName = "CentrifugalPump",
                       Id_fk = 3
                   },
                   new mst_Asset
                   {
                       PlantId = 1,
                       AssetId = 8,
                       AssetName = "ReciprocatingPump",
                       Id_fk = 3
                   },
                   new mst_Asset
                   {
                       PlantId = 1,
                       AssetId = 9,
                       AssetName = "RotaryPump",
                       Id_fk = 3
                   }
                );
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
                   RMMId = 1
               }
              );

            modelBuilder.Entity<Category>()
             .HasData(
              new Category
              {
                  RMMId = 1,
                  CategoryId = 1,
                  CategoryName = "P"
              },
              new Category
              {
                  RMMId = 1,
                  CategoryId = 2,
                  CategoryName = "E"
              },
              new Category
              {
                  RMMId = 1,
                  CategoryId = 3,
                  CategoryName = "A"
              }
             );
            modelBuilder.Entity<Severity>()
             .HasData(
              new Severity
              {
                  RMMId = 1,
                  SeverityId = 1,
                  SeverityValue = 1
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
                  InitiatingCause = "Aboveground piping full breach failure (pipe size <= 150mm, 6 in)",
                  IEF = 1.00E-06F
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
              },
              new InitiatingCausesMaster
              {
                  SILCMasterId = 1,
                  ICMId = 23,
                  InitiatingCause = "Premature opening of spring loaded relief valve",
                  IEF = 1.00E-02F
              },
              new InitiatingCausesMaster
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


