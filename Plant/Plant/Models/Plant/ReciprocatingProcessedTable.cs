namespace Plant.Models.Plant
{
    public class ReciprocatingProcessedTable
    {
        public int Id { get; set; }
        public int RPId { get; set; }
        public DateTime Date { get; set; }
        public string TDValve { get; set; }
        public ReciprocatingParameter reciprocatingParameter;
    }
}
