using System;

namespace CRMApp.Models
{

    public class SrlOrdModel
    {

        public int srl_ord_key { get; set; }
        public int p_srl_ord { get; set; }
        public string orderid { get; set; } = "";
        public decimal totalamt { get; set; }
        public DateTime billdate { get; set; }
        public string prodname { get; set; } = "";
        public string packing { get; set; } = "";
        public int qty { get; set; }
        public decimal rate { get; set; }
        public string frmtbilldate { get; set; } = "";





    }

}