using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Plant.Models
{
    public class TempCompressorModel
    {
        public int CompressorId { get; set; }
        public int OrganizationId { get; set; }
        //public int EquipmentId { get; set; }
        public decimal PS1 { get; set; }
        public decimal PD1 { get; set; }
        public decimal PS2 { get; set; }
        public decimal PD2 { get; set; }
        public decimal TS1 { get; set; }
        public decimal TD1 { get; set; }
        public decimal TS2 { get; set; }
        public decimal TD2 { get; set; }
        public string InsertedDate { get; set; }
    }
}
