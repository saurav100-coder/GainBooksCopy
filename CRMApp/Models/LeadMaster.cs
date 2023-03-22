using System;

namespace CRMApp.Models
{
    public class LeadMaster
    {
        public int Lead_Key { get; set; }
        public DateTime CreationDate { get; set; }
        public int LoginCode { get; set; }
        public string Topic { get; set; } = "";
        public int PurchaseTime { get; set; }
        public int ContactCode { get; set; }
        public int DecisionMaker { get; set; }
        public double Budget { get; set; }
        public string PurchaseProcess { get; set; } = "";
        public int BussType { get; set; }
        public double AnnualRevenue { get; set; }
        public double TransEntryDaily { get; set; }
        public double TransEntryMonthly { get; set; }
        public double SalesBillDaily { get; set; }
        public double SalesBillMonthly { get; set; }
        public int ComputerYN { get; set; }
        public int AccountingSoftUsed { get; set; }
        public int InternetYN { get; set; }
        public int AccountCode { get; set; }
    }
}