using System;

namespace CRMApp.Models
{
    public class RegistrationTranViewModel
    {
        public int RegistrationTran_Key { get; set; }
        public int P_customers { get; set; }
        public int Rowstatus { get; set; }
        public DateTime RegsendDate { get; set; }
        public string textRegsendDate { get; set; } = "";
        public string Regtype { get; set; } = "";
        public string Regtype2 { get; set; } = "";
        public DateTime AllowuptoDate { get; set; }
        public string textAllowuptoDate { get; set; } = "";
        public DateTime Openedupto { get; set; }
        public string textOpenedupto { get; set; } = "";
        public string Lan { get; set; } = "";
        public int Node { get; set; }
        public int Websessions_key { get; set; }
        public DateTime timestamp { get; set; }
        public string textTimestamp { get; set; } = "";
    }
}