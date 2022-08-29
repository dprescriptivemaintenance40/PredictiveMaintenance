﻿namespace Plant.Models.Plant
{
    public class CentrifugalPredictedTable
    {
        public int Id { get; set; }
        public int CPId { get; set; }
        public DateTime Date { get; set; }
        public string Vibration3H { get; set; }
        public CentrifugalParameter centrifugalParameter;
    }
}
