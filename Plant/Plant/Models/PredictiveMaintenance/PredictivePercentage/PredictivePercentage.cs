//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

namespace Plant.Models.PredictiveMaintenance
{
    public class PredictivePercentage
    {
            public int Id { get; set; }
            public string Date { get; set; }
            public string Predicted { get; set; }
            public string Historical { get; set; }
            public string Difference { get; set; }
            public string Percentage { get; set; }

    }
}
