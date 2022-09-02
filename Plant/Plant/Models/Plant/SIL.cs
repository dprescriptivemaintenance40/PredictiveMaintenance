using Plant.Models.Plant;

namespace Plant.Models
{
    //public class SIS
    //{
    //    public int SISId { get; set; }
    //    public int SafetyFactorId { get; set; }
    //    public SafetyFactor SafetyFactor { get; set; }
    //    public List<SIF> sif { get; set; }

    //}
    //    public class SIF
    //    {
    //        public int SIFId { get; set; }
    //        public int EquipmentId { get; set; }
    //        public List<Sensor> sensors { get; set; }
    //        public List<LogicSolver> logicSolver { get; set; }
    //        public List<FinalElement> finalElement { get; set; }
    //        public Equipment equipment { get; set; }
    //        //public SIS sis { get; set; }
    //    }
    //    //public class Elements
    //    //{
    //    //    public int ElementId { get; set; }
    //    //    public decimal TI { get; set; }
    //    //    public decimal MTTR { get; set; }
    //    //    public decimal LambdaDD { get; set; }
    //    //    public decimal LambdaDU { get; set; }
    //    //    public decimal BetaValue { get; set; }

    //    //}
    //    public class Sensor
    //    {
    //        public int SensorId { get; set; }
    //        public string NameOfComponent { get; set; }
    //        public decimal TI { get; set; }
    //        public decimal MTTR { get; set; }
    //        //public Elements ele { get; set; }
    //        public int SIFId { get; set; }
    //        public SIF sif { get; set; }
    //    }
    //    public class LogicSolver
    //    {
    //        public int LogicSolverId { get; set; }
    //        public string NameOfComponent { get; set; }
    //        public decimal TI { get; set; }
    //        public decimal MTTR { get; set; }
    //        //public Elements ele { get; set; }
    //        public int SIFId { get; set; }
    //        public SIF sif { get; set; }
    //    }
    //    public class FinalElement
    //    {
    //        public int FinalElementId { get; set; }
    //        public string NameOfComponent { get; set; }
    //        public decimal TI { get; set; }
    //        //public Elements ele { get; set; }
    //        public int SIFId { get; set; }
    //        public SIF sif { get; set; }
    //    }
    //}
    public class SIF
    {
        public int SIFId { get; set; }
        public int EquipmentId { get; set; }
        public string SIFName { get; set; }
        public List<Sensor> sensors { get; set; }
        public List<LogicSolver> logicSolver { get; set; }
        public List<FinalElement> finalElement { get; set; }
        public Equipment Equipment { get; set; }
    }
    //public class Elements
    //{
    //    public int ElementId { get; set; }
    //    public decimal TI { get; set; }
    //    public decimal MTTR { get; set; }
    //    public decimal LambdaDD { get; set; }
    //    public decimal LambdaDU { get; set; }
    //    public decimal BetaValue { get; set; }

    //}
    public class Sensor
    {
        public int SensorId { get; set; }
        public string SensorName { get; set; }
        public decimal TI { get; set; }
        public decimal MTTR { get; set; }
        //  public Elements ele { get; set; }
        public int SIFId { get; set; }
        public SIF sif { get; set; }
    }
    public class LogicSolver
    {
        public int LogicSolverId { get; set; }
        public string LogicSolverName { get; set; }
        public decimal TI { get; set; }
        public decimal MTTR { get; set; }
        //  public Elements ele { get; set; }
        public int SIFId { get; set; }
        public SIF sif { get; set; }
    }
    public class FinalElement
    {
        public int FinalElementId { get; set; }
        public string FinalElementName { get; set; }
        public decimal TI { get; set; }
        public decimal MTTR { get; set; }
        //   public Elements ele { get; set; }
        public int SIFId { get; set; }
        public SIF sif { get; set; }
    }
}

