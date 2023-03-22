using System;

namespace CRMApp.Models
{
    public class TaskActivityMaster
    {
        public int SrNo { get; set; }
        public int TaskId { get; set; }
        public string ActivityType { get; set; } = "";
        public string TableName { get; set; } = "";
        public int ActionFrom { get; set; }
        public string Text { get; set; } = "";
        public DateTime Datetime { get; set; }
        public string FrmDateTime { get; set; } = "";
    }
}