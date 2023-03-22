namespace CRMApp.Models
{
    public class OrderItem
    {
        public string? Prodcode { get; set; }
        public int Qty { get; set; }
        public decimal Rate { get; set; }
        public decimal Itemtotal { get; set; }
    }
}
