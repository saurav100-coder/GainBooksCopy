using System;

namespace CRMApp.Models
{
    public class EnquiryMaster
    {
        public int Enquiry_Key { get; set; } = 0;
        public int P_Enquiry { get; set; } = 0;
        public int Rowstatus { get; set; } = 0;
        public string EnqMessage { get; set; } = "";
        public string EnqType { get; set; } = "";
        public DateTime EnqDate { get; set; }
        public string TextEnqDate { get; set; } = "";
        public int LoginCode { get; set; } = 0;

        public int LoginType { get; set; } = 0;
        public int ProductCode { get; set; } = 0;
        public int RequestDemo { get; set; } = 0;
        public int DemoType { get; set; } = 0;
        public int ImageFileFlag { get; set; } = 0;
        public int ImageFileKey { get; set; } = 0;
        public int Resolved { get; set; } = 0;
        public int NextCallDate { get; set; } = 0;
        public string Proceedings { get; set; } = "";
        public int ActionBy { get; set; } = 0;

        public string Name { get; set; } = "";
        public string email { get; set; } = "";
        public string MobNo { get; set; } = "";
        public string subject { get; set; } = "";

    }
}