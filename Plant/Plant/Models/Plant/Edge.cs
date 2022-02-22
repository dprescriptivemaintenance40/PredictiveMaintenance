namespace Plant.Models
{
    public class Edge
    {
        public int EdgeId { get; set; }
        public int NetworkId { get; set; }
        public string EdgeName { get; set; }
        public string Src { get; set; }
        public string Destination { get; set; }
        public int GateType { get; set; }
        public int SrcId { get; set; }
        public int DestinationId { get; set; }
        public Network networks { get; set; }
    }
}
