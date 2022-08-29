namespace Plant.Models.Plant
{
    public class CentrifugalErrorTable
    {
        public int Id { get; set; }
        public int CPId { get; set; }
        public int rowAffected { get; set; }
        public string Description { get; set; }
        public CentrifugalParameter centrifugalParameter;
    }
}
