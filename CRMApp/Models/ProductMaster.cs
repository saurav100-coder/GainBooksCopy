using System;

namespace CRMApp.Models
{
    public class ProductMaster
    {

        public string? prodname { get; set; } 
        public string? prodcode { get; set; } 
        public string? displcode { get; set; }
        public string? packing { get; set; } 
        public string? locked { get; set; }
        public string? userprodcode { get; set; } 
        public int minorderqty { get; set; }=0;
        public int maxorderqty { get; set; }=0;
        public decimal mrp { get; set; }
        public decimal ptr { get; set; }
        public decimal baserate { get; set; }
        public string? infoString { get; set; }
        public string? compositefields { get; set; }

    }
}