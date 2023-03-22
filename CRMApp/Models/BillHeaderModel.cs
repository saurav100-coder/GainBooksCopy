using System;

namespace CRMApp.Models
{
    public class BillHeaderModel
    {
        public int billheader_key { get; set; }
        public int p_billheader { get; set; }
        public int rowstatus { get; set; }
        public string billseries { get; set; } = "";
        public int billno { get; set; }
        public DateTime billdate { get; set; }
        public decimal grossamt { get; set; }
        public decimal discount { get; set; }
        public decimal addition { get; set; }
        public decimal netamount { get; set; }
        public string frmtbilldate { get; set; } = "";
        public string txtpaymentmode { get; set; } = "";
        public int pmtmode { get; set; }
        public string txtsalesman { get; set; } = "";
        public string txtcustomer { get; set; } = "";
        public string orderid { get; set; } = "";
        public string frmtmtimestamp { get; set; } = "";
        public string deliverymode { get; set; } = "";
        public string remarks { get; set; } = "";









    }

}