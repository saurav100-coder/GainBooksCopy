
namespace CRMApp.Models
{

    public class BillItemsModel
    {

        public int billitems_key { get; set; }
        public int p_billitems { get; set; }
        public int rowstatus { get; set; }
        public int p_billheader { get; set; }
        public int itemsno { get; set; }
        public string prodname { get; set; } = "";
        public string packing { get; set; } = "";
        public decimal itemqty { get; set; }
        public decimal sellingprice { get; set; }
        public decimal itemamount { get; set; }
        public string lotorexpry { get; set; } = "";
        public string txtexpiry { get; set; } = "";
        public string batchno { get; set; } = "";










    }

}