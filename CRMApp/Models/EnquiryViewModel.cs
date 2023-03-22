using System;

namespace CRMApp.Models
{
    public class EnquiryViewModel
    {
        public int Enquiry_Key { get; set; } = 0;
        public int P_Enquiry { get; set; } = 0;
        public string EnqMessage { get; set; } = "";
        public string EnqType { get; set; } = "";
        public DateTime EnqDate { get; set; }
        public string TextEnqDate { get; set; } = "";
        public int LoginCode { get; set; } = 0; // Here LoginCode=Visitors_key

        public int Visitors_Key { get; set; } = 0;
        public int P_Visitors { get; set; } = 0;
        public string VisitorName { get; set; } = "";
        public string ContactNumber { get; set; } = "";
        public string CurrentOrg { get; set; } = "";
        public int BusinessType { get; set; } = 0;
        public string TextBusinessType { get; set; } = "";
        public string Email { get; set; } = "";
    }
}