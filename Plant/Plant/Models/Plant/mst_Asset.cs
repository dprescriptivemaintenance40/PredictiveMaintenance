namespace Plant.Models.Plant
{
    public class mst_Asset
    {
        public int Id { get; set; }
        public int PlantId { get; set; }
        //public List<Compressor> compressor { get; set; }
        //public List<Pump> pump { get; set; }
        public Plants plant;
    }
}
