using System;

namespace CRMApp.Models
{
    public class VariableMaster
    {
        public int Variabletable_key { get; set; }
        public int P_VariableTable { get; set; }
        public int rowstatus { get; set; }
        public string VariableName { get; set; } = "";
        public string VariableType { get; set; } = "";
        public string VariableVal { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime mTimestamp { get; set; }
        public int Websessions_key { get; set; }

    }
}