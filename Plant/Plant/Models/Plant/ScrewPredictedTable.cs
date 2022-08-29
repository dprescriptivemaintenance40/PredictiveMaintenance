namespace Plant.Models.Plant
{
    public class ScrewPredictedTable
    {
        public int Id { get; set; }
        public int SPId { get; set; }
        public DateTime Date { get; set; }
        public string TD1 { get; set; }
        public string TD2 { get; set; }
        public string DT1 { get; set; }
        public string DT2 { get; set; }
        public string PR1 { get; set; }
        public string PR2 { get; set; }
        public ScrewParameter screwParameter;
    }
}
