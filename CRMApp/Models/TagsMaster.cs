using System;

namespace CRMApp.Models
{
    public class TagsMaster
    {
        public int tags_key { get; set; }
        public int p_tags { get; set; }
        public int rowstatus { get; set; }
        public string linktype { get; set; } = "";
        public int tagkey { get; set; }
        public int linkcode { get; set; }
        public int websessions_key { get; set; }
        public DateTime mtimestamp { get; set; }
        public string FrmtmTimestamp { get; set; } = "";
        public string txttagname { get; set; } = "";
    }
}