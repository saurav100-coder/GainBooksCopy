using System;
using System.ComponentModel.DataAnnotations;

namespace CRMApp.Models
{

    public class SaleIEMSModel
    {

        public int saleiems_key { get; set; } = -1;
        public int p_saleiems { get; set; } = -1;
        public int rowstatus { get; set; } = 0;
        [Required]
        public string shopcode { get; set; } = "";
        public string licensee_code { get; set; } = "";
        [Required]
        public string groupcode { get; set; } = "";
        [Required]
        public string brandcode { get; set; } = "";
        [Required]
        public string packingcode { get; set; } = "";
        [Required]
        public int sale_qty { get; set; }
        [Required]
        public decimal mrp { get; set; }
        public decimal total { get; set; }
        [Required]
        public DateTime saledate { get; set; }
        public string invoiceid { get; set; } = "";
        [Required]
        public string invoicetype { get; set; } = "";

        public string frmtsaledate { get; set; } = "";
        public string shopname { get; set; } = "";
        public string grouptype { get; set; } = "";
        public string brandname { get; set; } = "";
        public string packingdesc { get; set; } = "";




    }

}