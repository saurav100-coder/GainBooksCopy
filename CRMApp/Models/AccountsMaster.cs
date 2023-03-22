using System;
using System.Collections;

namespace CRMApp.Models
{
    public class AccountsMaster
    {
        public int CRMAccounts_Key { get; set; } = 0;
        public int P_CRMAccounts { get; set; } = 0;
        public int LoginCode { get; set; } = 0;
        public string AccountName { get; set; } = "";
        public string mobileno { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Email { get; set; } = "";
        public string Website { get; set; } = "";
        public int ParentAccount { get; set; } = 0;
        public string TextParentAccount { get; set; } = "";
        public string Address1 { get; set; } = "";
        public string Address2 { get; set; } = "";
        public int Hometown { get; set; } = 0;
        public string TextHomeTown { get; set; } = "";
        public string District { get; set; } = "";
        public string State { get; set; } = "";
        public string Country { get; set; } = "";
        // field to use in location customhelper.
        public Hashtable HashHomeTown { get; set; } = new Hashtable();
        public int Industry { get; set; } = 0;
        public Hashtable HashIndustry { get; set; } = new Hashtable();
        public int BussType { get; set; } = 0;
        public string TextBussType { get; set; } = "";
        public string FacebookId { get; set; } = "";
        public string TwitterID { get; set; } = "";
        // field to show proper dropdownlist of employee/dealer for ownerId accordingly.
        public string OwnerType { get; set; } = "";
        public int OwnerID { get; set; } = 0;
        public string Details { get; set; } = "";
        public int Cn_pref_ContactMethod { get; set; } = 0;
        public Hashtable HashCn_pref_ContactMethod { get; set; } = new Hashtable();
        public int Cn_pref_Email { get; set; } = 0;
        public int Cn_pref_Bulkemail { get; set; } = 0;
        public DateTime mtimestamp { get; set; }
        public int Websessions_key { get; set; } = 0;
        public DateTime CreationDate { get; set; }
        public string FrmtCreationDate { get; set; } = "";
    }
}