
using System.ComponentModel.DataAnnotations;

namespace Plant.Models.RAM
{
    public class PlantNetwork
    {
        [Key]
        public int PlantId { get; set; }
        public string PlantName { get; set; }
        public string Location { get; set; }
        public float Unavailability { get; set; }
        public float Availability {get;set;}
        public List<Equipments> equipment { get; set; }
        public List<Edges> edge { get; set; }
        public Plants Plants;
    }

    public class Equipments
    {
        [Key]
        public int EquipmentId { get; set; }
        public int PlantId { get; set; }
        public string EquipmentNode { get; set; }
        public string EquipmentName { get; set; }
        public List<EquipmentWithCalculations> equipmentWithCalculations { get; set; }
        public List<EquipmentWithoutCalculations> equipmentWithoutCalculations { get; set; }
        public PlantNetwork plantNetwork;
    }

    public class EquipmentWithoutCalculations
    {
        [Key]
        public int EquipmentWithoutCalculationsId { get; set; }
        public int EquipmentId { get; set; }
        public float Lambda { get; set; }//provided lambda
        public float MDT { get; set; }  //provided MDT
        public string EquipmentImage { get; set; }
        public Equipments equipment;
    }

    public class EquipmentWithCalculations
    {
        [Key]
        public int EquipmentWithCalculationsId { get; set; }
        public int EquipmentId { get; set; }
        public string EquimentsConnected { get; set; }   //nodes connected
        public string Logic { get; set; }    //AND,OR Logic
        public float Lambda { get; set; }         //calculated lambda
        public float MDT { get; set; }       //calculated MDT
        public float MTBF { get; set; }   //calculated MTBF
        public Equipments equipment;
    }

    public class Edges
    {
        [Key]
        public int EdgeId { get; set; }
        public int PlantId { get; set; }
        public string EdgeName { get; set; }
        public string EdgeSrc { get; set; }   //from
        public string EdgeDestination { get; set; } //to
        public PlantNetwork plantNetwork;
    }

}
