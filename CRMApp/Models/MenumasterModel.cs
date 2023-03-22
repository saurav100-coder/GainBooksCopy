
namespace CRMApp
{
    public class MenumasterModel
    {
        public int menumaster_key { get; set; }
        public int p_menumaster { get; set; }
        public int rowstatus { get; set; }
        public string text { get; set; } = "";
        public string prgname { get; set; } = "";
        public string usedin { get; set; } = "";
        public string menuitemyn { get; set; } = "";
        public int under { get; set; }
        public string menulabelweb { get; set; } = "";
        public string menulabelapp { get; set; } = "";
        public string synchstatus { get; set; } = "";
        public string webicon { get; set; } = "";
        public string appicon { get; set; } = "";
        public int webmenuorder { get; set; }
        public int appmenuorder { get; set; }
        public string webmenuurl { get; set; } = "";
        public string show_on_home { get; set; } = "";
        public int apphomeorder { get; set; }
    }
}