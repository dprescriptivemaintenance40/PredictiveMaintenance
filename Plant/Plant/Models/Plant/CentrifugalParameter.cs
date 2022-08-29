namespace Plant.Models.Plant
{
    public class CentrifugalParameter
    {
        public int Id { get; set; }
        public int FailureModeId { get; set; }
        public List<CentrifugalStagingTable> centrifugalStagingTable { get; set; }
        public List<CentrifugalCleaningTable> centrifugalCleaningTable { get; set; }
        public List<CentrifugalErrorTable> centrifugalErrorTable { get; set; }
        public List<CentrifugalProcessedTable> centrifugalProcessedTable { get; set; }
        public List<CentrifugalPredictedTable> centrifugalPredictedTable { get; set; }
        public FailureMode failureModes;
    }
}
