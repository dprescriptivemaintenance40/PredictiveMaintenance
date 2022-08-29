namespace Plant.Models.Plant
{
    public class ScrewErrorTable
    {
        public int Id { get; set; }
        public int SPId { get; set; }
        public int rowAffected { get; set; }
        public string Description { get; set; }
        public ScrewParameter screwParameter;
    }
}
