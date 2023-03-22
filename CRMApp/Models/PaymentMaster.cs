using System;

namespace CRMApp.Models
{
    public class PaymentMaster
    {
        public int Payment_Key { get; set; } = 0;
        public int P_Payment { get; set; } = 0;
        public int PaymentMode { get; set; } = 0;
        public string TextPaymentMode { get; set; } = "";
        public DateTime PaymentDate { get; set; }
        public string PaymentDate1 { get; set; } = "";
        public int BenAccount { get; set; }
        public string TextBenAccount { get; set; } = "";
        public int CustBankName { get; set; }
        public string IFSCCode { get; set; } = "";
        public string ChqDDNo { get; set; } = "";
        public DateTime ChqDDDate { get; set; }
        public string ChqDDDate1 { get; set; } = "";
        public int ChqDDIssueBranch { get; set; }
        public decimal Amount { get; set; }
        public string TextAmount { get; set; } = "";
        public string Proceedings { get; set; } = "";
        public string VerifyCode { get; set; } = "";
        public string TextVerifyCode { get; set; } = "";
        public int P_acccode { get; set; } = 0;
        public string TextAmountAdjusted { get; set; } = "";
        public string TextP_acccode { get; set; } = "";
        public int CommissionTo { get; set; }
        public string TextCommissionTo { get; set; } = "";
        // Public Property Proceedings As String
        public string AmountAdjusted { get; set; } = "";
        public string Textmtimestamp { get; set; } = "";
        public int HeaderNo { get; set; }
        public string Status { get; set; } = "";
        public int VerifyEmp { get; set; }
        public string TextVerifyEmp { get; set; } = "";
        public DateTime VerifyDate { get; set; }
        public string VerifyDate1 { get; set; } = "";
        public int CreditedCode { get; set; }
        public string TextCreditedCode { get; set; } = "";
        public string HandleBy { get; set; } = "";
        public int WebSessions_Key { get; set; }
        public string TextStatus { get; set; } = "";
        public string AvailableAmount { get; set; } = "";
        public string CustCode { get; set; } = "";
        public decimal Discount { get; set; }
        public string Textdiscount { get; set; } = "";
        // Public Property PaymentDT As New DataTable
        // Public Property Modeofdelivery As String
        // Public Property BankName As String
        // Public Property AccountName As String
        // Public Property TransRefNo As String
    }
}