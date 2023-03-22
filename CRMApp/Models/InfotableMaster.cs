
namespace CRMApp
{
    public class InfotableMaster
    {
        public int Infotable_key { get; set; }
        public int P_infotable { get; set; }
        public int RowStatus { get; set; }
        public int Infotype { get; set; }
        public string NameOfInfo { get; set; } = "";

        public int Under { get; set; }
        public string InfoDesc { get; set; } = "";
        public string GeneratedBy { get; set; } = "";
        public string Verified { get; set; } = "";
        public string Department { get; set; } = "";

    }
}