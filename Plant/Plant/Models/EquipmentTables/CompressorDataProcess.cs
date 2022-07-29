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
        public class CompressorObjectModel
        {
            public int Id { get; set; }
            public string Date { get; set; }
            public string TD1Value { get; set; }
        }
        public class StagingTableCompressor
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public DateTime Date { get; set; }
            public string TD1 { get; set; }
            public string TS1 { get; set; }
            public string TD2 { get; set; }
            public string TS2 { get; set; }
            public string PD1 { get; set; }
            public string PD2 { get; set; }
            public string DT1 { get; set; }
            public string DT2 { get; set; }
            public string PR1 { get; set; }
            public string PR2 { get; set; }
            public BatchTable batchTable { get; set; }
        }
        public class CleanTableCompressor
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public DateTime Date { get; set; }
            public float TD1 { get; set; }
            public float TS1 { get; set; }
            public float TD2 { get; set; }
            public float TS2 { get; set; }
            public float PD1 { get; set; }
            public float PD2 { get; set; }
            public float DT1 { get; set; }
            public float DT2 { get; set; }
            public float PR1 { get; set; }
            public float PR2 { get; set; }
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
            public DateTime Date { get; set; }
            public float TD1 { get; set; }
            public float TS1 { get; set; }
            public float TD2 { get; set; }
            public float TS2 { get; set; }
            public float PD1 { get; set; }
            public float PD2 { get; set; }
            public float DT1 { get; set; }
            public float DT2 { get; set; }
            public float PR1 { get; set; }
            public float PR2 { get; set; }
            public BatchTable batchTable { get; set; }
        }
        public class PredictedTableCompressor
        {
            public int Id { get; set; }

            [ForeignKey("batchTable")]
            public int BatchId { get; set; }
            public DateTime Date { get; set; }
            public float TD1 { get; set; }
            public float TS1 { get; set; }
            public float TD2 { get; set; }
            public float TS2 { get; set; }
            public float PD1 { get; set; }
            public float PD2 { get; set; }
            public float DT1 { get; set; }
            public float DT2 { get; set; }
            public float PR1 { get; set; }
            public float PR2 { get; set; }
            public BatchTable batchTable { get; set; }
        }
    }
}
