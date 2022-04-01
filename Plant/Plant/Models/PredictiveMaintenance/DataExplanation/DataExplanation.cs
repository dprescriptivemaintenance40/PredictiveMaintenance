

namespace Plant.Models.PredictiveMaintenance.DataExplanation
{
    public class DataExplanation
    {
        public int Id { get; set; }
        public string MonthYear { get; set; }
        public string Td1LowerLimit { get; set; }
        public string Difflowerlimit { get; set; }
        public string Td1UpperLimit { get; set; }
        public string Diffupperlimit { get; set; }
    }
}
