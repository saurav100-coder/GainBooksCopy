using System;
using System.Collections;

namespace CRMApp.Models
{
    public class ContactsMaster
    {
        public int CRMContacts_Key { get; set; } = 0;
        public int P_CRMContacts { get; set; } = 0;
        // Public Property LoginCode As Int32 = 0
        public string LinkTableCode { get; set; } = "";
        public int LinkCode { get; set; } = 0;
        public string Fullname { get; set; } = "";
        public int JobTitle { get; set; } = 0;
        public string TextJobTitle { get; set; } = "";
        // Public Property Accountname As Int32 = 0
        // Public Property TextAccountName As String = ""
        public string Email { get; set; } = "";
        public string BusinessPhone { get; set; } = "";
        public string MobilePhone { get; set; } = "";
        public int ContactMethod { get; set; } = 0;
        public Hashtable HashContactMethod { get; set; } = new Hashtable();
        public string Address1 { get; set; } = "";
        public string Address2 { get; set; } = "";
        public int Hometown { get; set; } = 0;
        // to be used in location html helper
        public Hashtable HashHometown { get; set; } = new Hashtable();
        public string Facebook { get; set; } = "";
        public string Twitter { get; set; } = "";
        public string Linkedin { get; set; } = "";
        public int MaritalStatus { get; set; } = 0;
        public string Spouse { get; set; } = "";
        public DateTime Birthday { get; set; }
        public DateTime Anniversary { get; set; }
        public string Personalnotes { get; set; } = "";



    }
}