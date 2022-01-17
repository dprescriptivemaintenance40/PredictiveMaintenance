namespace Plant.Models
{
    public class SafetyFactor
    {
        public int SafetyFactorId { get; set; }
        public int PlantId { get; set; }
        //public List<SIS> sis { get; set; }
        public Plants plant { get; set; }
    }
}
