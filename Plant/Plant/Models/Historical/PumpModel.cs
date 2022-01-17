
namespace Plant.Models.Historical
{
    public class PumpModel
    {
        public int PumpId { get; set; }
        public int OrganizationId { get; set; }
        public int EquipmentId { get; set; }
        public decimal P1 { get; set; }
        public decimal P2 { get; set; }
        public decimal Q { get; set; }
        public DateTime InsertedDate { get; set; }
        public Equipment equipments { get; set; }
    }
}
