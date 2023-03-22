using System;

namespace CRMApp.Models
{
    public class AllCallsRegMaster
    {
        public int AllcallsReg_key { get; set; } = -1;
        public int P_AllcallsReg { get; set; } = -1;
        public int RowStatus { get; set; }
        public string Firmname { get; set; } = "";
        public string Contactperson { get; set; } = "";
        public string Emailid { get; set; } = "";
        public string Mobileno { get; set; } = "";
        public int Businesstype { get; set; }
        public int Issuetype { get; set; }
        public string Location { get; set; } = "";
        public string Issuedescription { get; set; } = "";
        public string UploadfileName { get; set; } = "";
        public int Status { get; set; }
        public string Remarksaral { get; set; } = "";
        public int modifiedby { get; set; }
        public DateTime Creationdate { get; set; }
        public DateTime RegisterDate { get; set; }
        public int PriorityOrder { get; set; }
        public int Websessions_key { get; set; }
        public int P_customers { get; set; }
        public int OnsiteCount { get; set; }
        public string registeredby { get; set; } = "";
        public int P_dealers { get; set; }
        public string Source { get; set; } = "";
        public string TextStatus { get; set; } = "";

    }

}