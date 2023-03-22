
namespace CRMApp.Models
{
    public class CallsCommModel
    {
        // AllCallsReg Properties
        public int allcallsreg_key { get; set; } = -1;
        public int p_allcallsreg { get; set; } = -1;
        public string firmname { get; set; } = "";
        public string issuedescription { get; set; } = "";
        public int Issuetype { get; set; } = 0;
        public string TextIssuetype { get; set; } = "";

        // CRMTasks Properties
        public int CRMTasks_Key { get; set; } = -1;
        public int P_CRMTasks { get; set; } = -1;

        // CRMCommunication Properties
        public int CRMCommunication_key { get; set; } = 0;
        public string Commtext { get; set; } = "";
        public string LinkType { get; set; } = "";
        public string FrmtCreationDate { get; set; } = "";
        public int LinkCode { get; set; } = 0;
        public string TextLogincode { get; set; } = "";
        public int CommunicationType { get; set; } = 0;
        public string TextCommunicationType { get; set; } = "";
        // CRMDocuments Properties
        public int CRMDocumentsLink_Key { get; set; } = 0;
        public int P_CRMDocumentsLink { get; set; } = 0;
        public string FileName { get; set; } = "";
        public string LinkURL { get; set; } = "";
    }
}