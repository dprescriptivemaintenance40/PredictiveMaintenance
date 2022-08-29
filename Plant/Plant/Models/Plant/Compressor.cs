namespace Plant.Models.Plant
{
    public class Compressor
    {
        public int Id { get; set; }
        public int AssetId { get; set; }
        public List<ScrewCompressor> screwCompressor { get; set; }
        public List<CentrifugalCompressor> centrifugalCompressor { get; set; }
        //public List<ReciprocatingCompressor> reciprocatingCompressor { get; set; }
        //public Assets assets;
    }
}
