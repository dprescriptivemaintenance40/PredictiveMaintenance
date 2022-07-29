//using System;
//using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Threading.Tasks;

namespace Plant.Models.EquipmentTables
{
    public class EquipmentDataProcess
    {
        public class EquipmentTable
        {
            public int Id { get; set; }

            [ForeignKey("equipment")]
            public int EquipmentId { get; set; }
            public string NameOfEquipment { get; set; }
            public string TypeOfEquipment { get; set; }
            public List<EquipmentProcess> equipmentProcessList { get; set; }
            public Equipment equipment;
        }
        public class PatternTable
        {
            public int Id { get; set; }

            [ForeignKey("equipment")]
            public int EquipmentId { get; set; }
            public string NameOfPattern { get; set; }
            public string DescriptionOfPattern { get; set; }

            public Equipment equipment;
        }
        public class EquipmentProcess
        {
            public int Id { get; set; }
            public int EquipmentTableId { get; set; }  //foreign key
            public int PatternId { get; set; }         //foreign key
            public string DataInput { get; set; }      //File-F,Automated-A,Manual-M
            public string FolderPath { get; set; }
            public string Description { get; set; }
            public List<BatchTable> batchTableList { get; set; }

            public EquipmentTable equipmentTable;
            public PatternTable patternTable;
        }
        public class CompressorConstraint
        {
            public int Id { get; set; }
            [ForeignKey("equipmentProcess")]
            public int EquipmentProcessId { get; set; }  //foreign key
            public string Package { get; set; }

            public EquipmentProcess equipmentProcess;
        }
        public class BatchTable
        {
            public int Id { get; set; }
            public int EquipmentTblId { get; set; }
            public int EquipmentProcessId { get; set; }  //foreign key
            public string Description { get; set; }     
            public string DateTimeBatchUploaded { get; set; }
            public string DateTimeBatchCompleted { get; set; }
            public int IsCompleted { get; set; }

            public EquipmentTable equipmentTable;
            public EquipmentProcess equipmentProcess;
        }
        
    }
}
