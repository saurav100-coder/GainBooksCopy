using System;
using System.ComponentModel.DataAnnotations;

namespace CRMApp.Models
{
    public class RegCalls
    {

        #region RegCalls Properties
        public int AllCallsReg_key { get; set; } = -1;
        public int P_AllCallsReg { get; set; } = -1;
        public int P_Customers { get; set; } = -1;
        public int RowStatus { get; set; } = 0;
        [Required(ErrorMessage = "Firm name  is required")]
        public string? Firmname { get; set; } 
        public string? Contactperson { get; set; } 
        public string? Emailid { get; set; } 
        [StringLength(10)]
        [Required(ErrorMessage = "Mobile Number is required")]
        public string? Mobileno { get; set; } 
        public int Businesstype { get; set; }
        public string TextBusinessTypes { get; set; } = "";
        // <Required(ErrorMessage:="Location  is required")>
        public string? Location { get; set; } 
        public int Issuetype { get; set; } = 0;
        public string TextIssuetype { get; set; } = "";
        public string Issuedescription { get; set; } = "";
        public string TextLoginCode { get; set; } = "";
        public string UploadfileName { get; set; } = "";
        public int Status { get; set; }
        public string InfoString { get; set; } = "";
        public string TextStatus { get; set; } = "";
        public int modifiedby { get; set; }
        public DateTime Creationdate { get; set; }
        public int PriorityOrder { get; set; }
        public string RemarkSaral { get; set; } = "";


        public string CreationDate1 { get; set; } = "";
        public int LoginCode { get; set; }
        public string Compositefield { get; set; } = "";
        public string FrmtCreationdate { get; set; } = "";

        public DateTime registerdate { get; set; }
        public int duration { get; set; }


        #endregion

    }
}