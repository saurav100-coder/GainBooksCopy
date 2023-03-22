using System;
using System.Data;

namespace CRMApp.Models
{
    public class CRMAccountsViewModel
    {
        public int CRMAccounts_Key { get; set; } = -1;
        public int P_CRMAccounts { get; set; } = -1;
        public int LoginCode { get; set; } = 0;
        public string AccountName { get; set; } = "";
        public string AccountName1 { get; set; } = "";
        public string Phone { get; set; } = "";
        public string Email { get; set; } = "";
        public string Website { get; set; } = "";
        public int ParentAccount { get; set; } = 0;
        public string TextParentAccount { get; set; } = "";
        public string Address1 { get; set; } = "";
        public string Address2 { get; set; } = "";
        public int Hometown { get; set; } = 0;
        public int BussType { get; set; } = 0;
        public string TextBussType { get; set; } = "";
        public string TextHometown { get; set; } = "";
        public string District { get; set; } = "";
        public string State { get; set; } = "";
        public string Country { get; set; } = "";
        // field to use in location customhelper.
        // Public Property HashHometown As New Hashtable
        public int Industry { get; set; } = 0;
        // Public Property HashIndustry As New Hashtable

        public string FacebookId { get; set; } = "";
        public string TwitterID { get; set; } = "";
        // field to show proper dropdownlist of employee/dealer for ownerId accordingly.
        public string OwnerType { get; set; } = "";
        public int OwnerID { get; set; } = 0;
        public string Details { get; set; } = "";
        public int Cn_pref_ContactMethod { get; set; } = 0;
        // Public Property HashCn_pref_ContactMethod As New Hashtable
        public int Cn_pref_Email { get; set; } = 0;
        public int Cn_pref_Bulkemail { get; set; } = 0;
        public DateTime mtimestamp { get; set; }
        public int Websessions_key { get; set; } = 0;
        public DateTime CreationDate { get; set; }
        public string mobileno { get; set; } = "";

        public DataTable CRMAccountsDT { get; set; } = new DataTable();

    }
}