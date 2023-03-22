using System;

namespace CRMApp.Models
{
    public class CRMLeadMaster
    {
        public int CRMLead_key { get; set; } = -1;
        public int P_CRMLead { get; set; } = -1;
        public int RowStatus { get; set; } = 0;
        public int Logincode { get; set; } = 0;
        public DateTime CreationDate { get; set; }
        public string Topic { get; set; } = "";
        public int PurchaseTime { get; set; } = 0;
        public int ContactCode { get; set; } = 0;
        public int DecisionMaker { get; set; } = 0;

        public double Budget { get; set; }
        public int BusinessType { get; set; } = 0;
        public int AnnualRevenue { get; set; } = 0;
        public int TransEntryDaily { get; set; } = 0;
        public int TransEntryMonthly { get; set; } = 0;
        public int SalesBillDaily { get; set; } = 0;
        public int SalesBillMonthly { get; set; } = 0;
        public string ComputerYN { get; set; } = "Y";
        public int AccountingSoftUsed { get; set; } = 0;
        public string InternetYN { get; set; } = "Y";
        public int AccountCode { get; set; } = 0;
        public string TextAccountCode { get; set; } = "";

        public int Stage { get; set; } = 0;
        public string QualifyTag { get; set; } = "";
        public int Websessions_Key { get; set; } = 0;
        public DateTime mTimestamp { get; set; }
        public int Status { get; set; } = 0;
        public string Mobileno { get; set; } = "";
        public string email { get; set; } = "";
        public DateTime Registerdate { get; set; }
        public string source { get; set; } = "";
        public string Contactperson { get; set; } = "";
        public string Compositefield { get; set; } = "";


        // 'Added by aslam
        public string InfoString { get; set; } = "";
    }
}