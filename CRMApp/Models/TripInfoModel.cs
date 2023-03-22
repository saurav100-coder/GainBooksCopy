using System;

namespace CRMApp.Models
{

    public class TripInfoModel
    {


        public int tripinfo_key { get; set; } = -1;
        public int p_tripinfo { get; set; } = -1;
        public int rowstatus { get; set; }
        public string tripid { get; set; } = "";
        public int duration { get; set; }
        public decimal avgspeed { get; set; }
        public decimal covereddistance { get; set; }
        public string startloc { get; set; } = "";
        public string endloc { get; set; } = "";
        public int userlogin_key { get; set; }
        public DateTime devicetimestamp { get; set; }
        public DateTime mtimestamp { get; set; }
        public int websessions_key { get; set; }
        public string tripstatus { get; set; } = "";
        public DateTime starttime { get; set; }
        public DateTime endtime { get; set; }
        public string triplbl { get; set; } = "";
        public string FrmtStartTime { get; set; } = "";
        public string FrmtEndTime { get; set; } = "";
        public string accname { get; set; } = "";
        public string FrmtDuration { get; set; } = "";

    }

}