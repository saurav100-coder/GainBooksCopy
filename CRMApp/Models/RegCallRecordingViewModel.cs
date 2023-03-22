using System;

namespace CRMApp.Models
{
    public class RegCallRecordingViewModel
    {
        public int callrecordings_key { get; set; } = -1;
        public int p_callrecordings { get; set; } = -1;
        public int rowstatus { get; set; } = 0;
        public string linktype { get; set; } = "";
        public int linkcode { get; set; }
        public string source { get; set; } = "";
        public int linkcustactid { get; set; }
        public string filename { get; set; } = "";
        public string linkurl { get; set; } = "";
        public int websessions_key { get; set; }
        public DateTime mtimestamp { get; set; }
        public string Mobileno { get; set; } = "";
        public string Textmtimestamp { get; set; } = "";
        public string Location { get; set; } = "";
        public string Firmname { get; set; } = "";

        public string TextIssuetype { get; set; } = "";
        public string Issuedescription { get; set; } = "";
        public string TextStatus { get; set; } = "";
        public string TextAssignedto { get; set; } = "";
        public string TextServicingDealer { get; set; } = "";

        public string TextCallTime { get; set; } = "";

    }
}