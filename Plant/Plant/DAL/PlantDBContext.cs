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
        public List<RiskMatrixMaster> RiskMatrixMaster { get; set; }
        public List<InitiatingCausesMaster> InitiatingCausesMaster { get; set; }
        public List<ConditionalModifiersMaster> ConditionalModifiersMaster { get; set; }
        public List<IPLMaster> IplMaster { get; set; }

        //SILClassification
        public DbSet<SILClassification> SilClassification { get; set; }
        public DbSet<RiskMatrix> RiskMatrix { get; set; }
        public DbSet<InitiatingCauses> InitiatingCauses { get; set; }
        public DbSet<ConditionalModifiers> ConditionalModifiers { get; set; }
        public DbSet<IPL> Ipl { get; set; }
        public DbSet<Calculation> Calculation { get; set; }

        //SILVerification
        public DbSet<SIF> Sif { get; set; }
        public DbSet<Sensor> Sensors { get; set; }
        public DbSet<LogicSolver> LogicSolvers { get; set; }
        public DbSet<FinalElement> FinalElements { get; set; }
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

            modelBuilder.Entity<SILClassification>().ToTable("tblSILClassification");
            modelBuilder.Entity<SILClassification>().HasKey(c => c.SILCId);

            modelBuilder.Entity<RiskMatrix>().ToTable("tblRiskMatrix");
            modelBuilder.Entity<RiskMatrix>().HasKey(c => c.RMId);
            modelBuilder.Entity<RiskMatrix>()
                .HasOne(p => p.silClassification)
                .WithMany(p => p.riskMatrix)
                .HasForeignKey(p => p.SILCId);

            modelBuilder.Entity<InitiatingCauses>().ToTable("tblInitiatingCauses");
            modelBuilder.Entity<InitiatingCauses>().HasKey(c => c.ICId);
            modelBuilder.Entity<InitiatingCauses>()
                .HasOne(p => p.silClassification)
                .WithMany(p => p.initiatingCauses)
                .HasForeignKey(p => p.SILCId);

            modelBuilder.Entity<ConditionalModifiers>().ToTable("tblConditionalModifiers");
            modelBuilder.Entity<ConditionalModifiers>().HasKey(c => c.CMId);
            modelBuilder.Entity<ConditionalModifiers>()
                .HasOne(p => p.silClassification)
                .WithMany(p => p.conditionalModifiers)
                .HasForeignKey(p => p.SILCId);

            modelBuilder.Entity<IPL>().ToTable("tblIPL");
            modelBuilder.Entity<IPL>().HasKey(c => c.IPLId);
            modelBuilder.Entity<IPL>()
                .HasOne(p => p.silClassification)
                .WithMany(p => p.ipl)
                .HasForeignKey(p => p.SILCId);

            modelBuilder.Entity<Calculation>().ToTable("tblCalculation");
            modelBuilder.Entity<Calculation>().HasKey(c => c.CalculationId);
            modelBuilder.Entity<Calculation>()
                .HasOne(p => p.silClassification)
                .WithMany(p => p.calculation)
                .HasForeignKey(p => p.SILCId);

            modelBuilder.Entity<SILClassificationMaster>().ToTable("tblSILClassificationMaster");
            modelBuilder.Entity<SILClassificationMaster>().HasKey(c => c.SILCMasterId);

            modelBuilder.Entity<RiskMatrixMaster>().ToTable("tblRiskMatrixMaster");
            modelBuilder.Entity<RiskMatrixMaster>().HasKey(c => c.RMMId);
            modelBuilder.Entity<RiskMatrixMaster>()
                .HasOne(p => p.silClassificationMaster)
                .WithMany(p => p.riskMatrixMaster)
                .HasForeignKey(p => p.SILCMasterId);

            modelBuilder.Entity<InitiatingCausesMaster>().ToTable("tblInitiatingCausesMaster");
            modelBuilder.Entity<InitiatingCausesMaster>().HasKey(c => c.ICMId);
            modelBuilder.Entity<InitiatingCausesMaster>()
                .HasOne(p => p.silClassificationMaster)
                .WithMany(p => p.initiatingCausesMaster)
                .HasForeignKey(p => p.SILCMasterId);

            modelBuilder.Entity<ConditionalModifiersMaster>().ToTable("tblConditionalModifiersMaster");
            modelBuilder.Entity<ConditionalModifiersMaster>().HasKey(c => c.CMMId);
            modelBuilder.Entity<ConditionalModifiersMaster>()
                .HasOne(p => p.silClassificationMaster)
                .WithMany(p => p.conditionalModifiersMaster)
                .HasForeignKey(p => p.SILCMasterId);

            modelBuilder.Entity<IPLMaster>().ToTable("tblIPLMaster");
            modelBuilder.Entity<IPLMaster>().HasKey(c => c.IPLMId);
            modelBuilder.Entity<IPLMaster>()
                .HasOne(p => p.silClassificationMaster)
                .WithMany(p => p.iplMaster)
                .HasForeignKey(p => p.SILCMasterId);

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
        }

    }
}

