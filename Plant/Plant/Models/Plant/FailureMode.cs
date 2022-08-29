namespace Plant.Models.Plant
{
    public class FailureMode
    {
        public int Id { get; set; }
        public int TagNumberId { get; set; }
        public string FailureModeName { get; set; }
        //public DateTime Date { get; set; }
        public List<ScrewParameter> screwParameter { get; set; }
        public List<CentrifugalParameter> centrifugalParameter { get; set; }
        public List<ReciprocatingParameter> reciprocatingParameter { get; set; }
        //public List<VibrationParameter> vibrationParameter { get; set; }
        //public List<TDValveParameter> tdValveParameter { get; set; }
    }
}
