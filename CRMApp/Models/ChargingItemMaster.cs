using System;

namespace CRMApp.Models
{
    public class ChargingItemMaster
    {
        public int p_chargingitems { get; set; }
        public int ServiceCode { get; set; }
        public string TextServiceCode { get; set; } = "";
        public DateTime ChargingFromDate { get; set; }
        public string FrmtChargingFromDate { get; set; } = "";
        public DateTime ChargingToDate { get; set; }
        public string FrmtChargingToDate { get; set; } = "";
        public decimal TaxableAmount { get; set; }
        public decimal Quantity { get; set; }
        public decimal ProductRate { get; set; }

    }
}