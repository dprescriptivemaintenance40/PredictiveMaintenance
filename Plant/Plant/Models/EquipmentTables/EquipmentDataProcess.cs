using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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
            public Equipment equipment { get; set; }
        }
        public class PatternTable
        {
            public int Id { get; set; }

            [ForeignKey("equipment")]
            public int EquipmentId { get; set; }
            public string NameOfPattern { get; set; }
            public Equipment equipment { get; set; }
        }
        public class EquipmentProcess
        {
            public int Id { get; set; }
            public int EquipmentTableId { get; set; }  //foreign key
            public int PatternId { get; set; }         //foreign key
            public string DataInput { get; set; }      //File-F,Automated-A,Manual-M
            public string FolderPath { get; set; }
            public List<BatchTable> batchTable { get; set; }
            public EquipmentTable equipmentTable { get; set; }
            public PatternTable patternTable { get; set; }
        }
        public class BatchTable
        {
            public int Id { get; set; }

            [ForeignKey("equipmentProcess")]
            public int EquipmentProcessId { get; set; }  //foreign key
            public string FieldName { get; set; }      //File-F,Automated-A,Manual-M
            public string DateName { get; set; }
            public List<StagingTableSingle> stagingTableSingle { get; set; }
            public List<CleanTableSingle> cleanTableSingle { get; set; }
            public List<ErrorTableSingle> errorTableSingle { get; set; }
            public List<ProcessedTableSingle> processedTableSingle { get; set; }
            public List<PredictedTableSingle> predictedTableSingle { get; set; }
            public EquipmentProcess equipmentProcess { get; set; }
        }
        public class StagingTableSingle
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public string Value { get; set; }
            public string Date { get; set; }
            public BatchTable batchTable { get; set; }
        }
        public class CleanTableSingle
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public string Value { get; set; }
            public string Date { get; set; }
            public BatchTable batchTable { get; set; }
        }
        public class ErrorTableSingle
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public string Value { get; set; }
            public string Date { get; set; }
            public BatchTable batchTable { get; set; }
        }
        public class ProcessedTableSingle
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public string Value { get; set; }
            public string Date { get; set; }
            public BatchTable batchTable { get; set; }
        }
        public class PredictedTableSingle
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public string Value { get; set; }
            public string Date { get; set; }
            public BatchTable batchTable { get; set; }
        }
    }
}
