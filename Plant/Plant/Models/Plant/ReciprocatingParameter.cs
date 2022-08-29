namespace Plant.Models.Plant
{
    public class ReciprocatingParameter
    {
        public int Id { get; set; }
        public int FailureModeId { get; set; }
        public List<ReciprocatingStagingTable> reciprocatingStagingTable { get; set; }
        public List<ReciprocatingCleaningTable> reciprocatingCleaningTable { get; set; }
        public List<ReciprocatingErrorTable> reciprocatingErrorTable { get; set; }
        public List<ReciprocatingProcessedTable> reciprocatingProcessedTable { get; set; }
        public List<ReciprocatingPredictedTable> reciprocatingPredictedTable { get; set; }
        public FailureMode failureModes;
    }
}
