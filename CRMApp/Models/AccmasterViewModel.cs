using System;

namespace CRMApp
{
    public class Accmasterviewmodel
    {
        public int Accmaster_key { get; set; } = -1;
        public int Accmaster_key1 { get; set; } = -1;
        public int P_acccode { get; set; } = -1;
        public string AccName { get; set; } = "";
        public int rowstatus { get; set; } = 0;
        public double creditamt { get; set; }
        public double debitamt { get; set; }
        public double Balance { get; set; }
        public string Remarks { get; set; } = "";
        public DateTime mtimestamp { get; set; }
        public string Mobile { get; set; } = "";
        public string PostalAddress1 { get; set; } = "";
        public string PostalAddress2 { get; set; } = "";
        public string PostalAddress3 { get; set; } = "";
        public string PostalAddress4 { get; set; } = "";
        public string ContactPerson { get; set; } = "";
        public int Hometown { get; set; }
        public string Email { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Status { get; set; } = "";
        public string gstin { get; set; } = "";
        public int prevacccode { get; set; } = 0;
        public string prevaccmaster { get; set; } = "";
        public int gstintype { get; set; } = 0;
        public int websessions_key { get; set; }
        public int acctype { get; set; } = 0;
        public string compositefield { get; set; } = "";
        public int under { get; set; }
        public string Accounttype { get; set; } = "";
        public string TextHometown { get; set; } = "";
    }
}