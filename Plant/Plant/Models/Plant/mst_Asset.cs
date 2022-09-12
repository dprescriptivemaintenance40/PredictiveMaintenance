﻿using System.ComponentModel.DataAnnotations.Schema;
namespace Plant.Models.Plant
{
    public class mst_Asset
    {
        public int AssetId { get; set; }
        public int PlantId { get; set; }
        public string AssetName { get; set; }
        public int? Id_fk { get; set; }

        public Plants plants { get; set; }
    }
}
