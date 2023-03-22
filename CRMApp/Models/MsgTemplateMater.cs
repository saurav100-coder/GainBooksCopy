using System;

namespace CRMApp.Models
{
    public class MsgTemplateMater
    {
        public int Msgtemplate_key { get; set; } = -1;
        public int P_msgtemplate { get; set; } = -1;
        public int rowstatus { get; set; }
        public int Templatetype { get; set; }
        public string Title { get; set; } = "";
        public string Text { get; set; } = "";
        public DateTime mTimestamp { get; set; }
        public string FrmmTimestamp { get; set; } = "";
        public int Websessions_key { get; set; } = 0;
        public string Active { get; set; } = "Y";
        public string TextTemplatetype { get; set; } = "";

    }
}