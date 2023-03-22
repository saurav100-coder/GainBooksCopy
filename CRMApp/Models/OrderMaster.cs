namespace CRMApp.Models
{
    public class OrderMaster
    {
        public List<OrderItem>? OrderItems { get; set; }
        public string? Custcode { get; set; }
        public string? Mobile { get; set; }
        public string? Deliverymode { get; set; }
        public string? Remarks { get; set; }
        public string? EncStr { get; set; }
    }

}
