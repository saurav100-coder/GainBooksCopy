using System;

namespace CRMApp.Models
{
    public class ViewSettingMaster
    {
        public int ViewSettings_key { get; set; } = -1;
        public int P_viewsettings { get; set; } = -1;
        public int Rowstatus { get; set; }
        public string Viewid { get; set; } = "";
        public string Infotype { get; set; } = "";
        public string Infostring { get; set; } = "";
        public int Userlogin_key { get; set; }
        public int Websessions_key { get; set; }
        public DateTime mtimestamp { get; set; }

    }

}