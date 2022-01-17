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
        public DbSet<SIF> Sif { get; set; }
        public DbSet<Sensor> Sensors { get; set; }
        public DbSet<LogicSolver> LogicSolvers { get; set; }
        public DbSet<FinalElement> FinalElements { get; set; }
        public DbSet<CompressorModel> CompressorsModel { get; set; }
        public DbSet<PumpModel> PumpsModel { get; set; }
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
        }

    }
}

