using System;

namespace CRMApp.Models
{
    public class TempContactModel
    {
        public int tempContacts_Key { get; set; } 
        public int p_tempContacts { get; set; } 
        public string? custcode { get; set; } 
        public string? email { get; set; } 
        public string? mobno { get; set; }
        public string? otp { get; set; }
        public DateTime mtimestamp { get; set; }
        public string? txtmtimestamp { get; set; }
        public int p_customers { get; set; }
        public string? custname { get; set; }
        public int hometown { get; set; }
        public string? txthometown { get; set; }

    }

}