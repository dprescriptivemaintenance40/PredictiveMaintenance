using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using static Plant.Models.EquipmentTables.EquipmentDataProcess;

namespace Plant.Models.EquipmentTables
{
    public class CompressorDataProcess
    {
        public class StagingTableCompressor
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public string Value { get; set; }
            public string Date { get; set; }
            public BatchTable batchTable { get; set; }
        }
        public class CleanTableCompressor
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public string Value { get; set; }
            public string Date { get; set; }
            public BatchTable batchTable { get; set; }
        }
        public class ErrorTableCompressor
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public int rowAffected { get; set; }
            public string Description { get; set; }
            public BatchTable batchTable { get; set; }
        }
        public class ProcessedTableCompressor
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public string Value { get; set; }
            public string Date { get; set; }
            public BatchTable batchTable { get; set; }
        }
        public class PredictedTableCompressor
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
