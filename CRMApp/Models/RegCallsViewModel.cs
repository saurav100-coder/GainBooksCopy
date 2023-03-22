using System;
using System.ComponentModel.DataAnnotations;

namespace CRMApp.Models
{

    public class RegCallsViewModel
    {

        public int AllCallsReg_key { get; set; } = 0;
        public int P_AllCallsReg { get; set; } = 0;
        public int RowStatus { get; set; } = 0;
        // <Required(ErrorMessage:="Firm name  is required")>
        public string Firmname { get; set; } = "";
        public string Contactperson { get; set; } = "";
        public string EmailId { get; set; } = "";
        [StringLength(10)]
        [Required(ErrorMessage = "Mobile Number is required")]
        public string Mobileno { get; set; } = "";
        public int BusinessTypes { get; set; }
        public string timeTakentoComplete { get; set; } = "";
        public string TextBusinessTypes { get; set; } = "";
        [Required(ErrorMessage = "Location  is required")]
        public string Location { get; set; } = "";
        public int Issuetype { get; set; } = 0;
        public string TextIssuetype { get; set; } = "";
        public string onsiteflag { get; set; } = "";
        public string Issuedescription { get; set; } = "";
        public string FileName { get; set; } = "";
        public int Status { get; set; }
        public string TextStatus { get; set; } = "";
        public string TextTaskStatus { get; set; } = "";

        public string ModifiedBy { get; set; } = "";
        public DateTime Creationdate { get; set; }
        public string TxtRegisterDate { get; set; } = "";
        public int PriorityOrder { get; set; }
        public string RemarkSaral { get; set; } = "";
        public string TextAssignedto { get; set; } = "";
        public string TextServicingDealer { get; set; } = "";
        public int OnsiteCount { get; set; }
        public string Source { get; set; } = "";
        public string Textsource { get; set; } = "Not Available";
        // Public Property RegCallsDt As New DataTable
        public string hasRemarks { get; set; } = "";
        public int callFreqCount { get; set; } = 0;
        public DateTime lastcalltime { get; set; }
        public string txtlastcalltime { get; set; } = "";


        public string IsDeffered { get; set; } = "N";
        public DateTime NextActionDate { get; set; }
        public string FrmtNextActionDate { get; set; } = "";
        // Public Property TextTaskStatus As DateTime



        public string FrmtCreationDate { get; set; } = "";
        public int LoginCode { get; set; }

        public string EngageStatus { get; set; } = "";
        public string EngageBy { get; set; } = "";
        public string EngageTime { get; set; } = "";
        public string TextLogincode { get; set; } = "";

        public string IsPendingMoreThanDays { get; set; } = "";

        public int assignedto { get; set; }
        public int p_customers { get; set; }

        public string Tags { get; set; } = "";
        public string TxtBilledUpto { get; set; } = "";
        public string TxtEmpAssigned { get; set; } = "";
        public string combinedAddress { get; set; } = "";
        public string Email { get; set; } = "";
        public string Custcode { get; set; } = "";

    }
}