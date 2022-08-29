namespace Plant.Models.Plant
{
    public class ScrewParameter
    {
        public int Id { get; set; }
        public int FailureModeId { get; set; }
        public List<ScrewStagingTable> screwStagingTable { get; set; }
        public List<ScrewCleaningTable> screwCleaningTable { get; set; }
        public List<ScrewErrorTable> screwErrorTable { get; set; }
        public List<ScrewProcessedTable> screwProcessedTable { get; set; }
        public List<ScrewPredictedTable> screwPredictedTable { get; set; }
        public FailureMode failureModes;
    }
}
