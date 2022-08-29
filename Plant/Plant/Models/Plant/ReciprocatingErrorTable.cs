namespace Plant.Models.Plant
{
    public class ReciprocatingErrorTable
    {
        public int Id { get; set; }
        public int RPId { get; set; }
        public int rowAffected { get; set; }
        public string Description { get; set; }
        public ReciprocatingParameter reciprocatingParameter;
    }
}
