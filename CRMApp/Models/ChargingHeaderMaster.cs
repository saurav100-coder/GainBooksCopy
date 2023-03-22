using System;

namespace CRMApp.Models
{
    public class ChargingHeaderMaster
    {
        public int ChargingHeader_Key { get; set; } = 0;
        public int HeaderNo { get; set; } = 0;
        public int RowStatus { get; set; } = 0;
        public DateTime BillDate { get; set; }
        public string BillDate1 { get; set; } = "";
        public string BillType { get; set; } = "";
        public string BillSeries { get; set; } = "";
        public int BillNo { get; set; } = 0;
        public int ProfarmaNo { get; set; }
        public DateTime ProfarmaDate { get; set; }
        public int OrderHeader { get; set; } = 0;
        public string Textmtimestamp { get; set; } = "";
        public string CustName { get; set; } = "";
        public int DebitedCode { get; set; }
        public int EmployeeCode { get; set; }
        public string PaymentFlag { get; set; } = "";
        public string TextPaymentFlag { get; set; } = "";
        public string HandleBy { get; set; } = "";
        public decimal GrandTotal { get; set; }
        public int BillinSession { get; set; } = 0;
        public decimal RoundOffAmt { get; set; }
        public int WebSessions_key { get; set; }
    }
}