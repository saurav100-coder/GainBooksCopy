using System;

namespace CRMApp.Models
{
    public class CRMTasksMaster
    {
        private static CustomerControl.Variables cc1 = new CustomerControl.Variables("WebGodaddy");
        private static DataFunctions.DataFunctions df1 = new DataFunctions.DataFunctions(ref cc1);

        public int CRMTasks_Key { get; set; } = -1;
        public int P_CRMTasks { get; set; } = -1;
        public string Logintype { get; set; } = "";
        public int Logincode { get; set; } = 0;
        public string TaskTitle { get; set; } = "";
        public string Tasktype { get; set; } = "";
        public string? TaskDescription { get; set; } 
        public int Taskstatus { get; set; } = 0;
        public string TextTaskStatus { get; set; } = "";
        public DateTime DueDate { get; set; }
        public string FrmtStartDate { get; set; } = "";
        // Public Property FrmtDueDate As String = Now.Date.ToString("yyyy-MM-dd")
        public string FrmtDueDate { get; set; } = df1.GetDateTimeISTNow().ToString("yyyy-MM-ddTHH:mm tt"); // DateTime.Now.ToString("yyyy-MM-ddThh:mm tt") 'df1.getDateTimeISTNow.ToString("yyyy-MM-ddThh:mm tt")
        // Public Property LinkType As String = ""
        // Public Property linkCode As Int32 = 0
        public DateTime NextActionDate { get; set; }
        public DateTime StartDate { get; set; }
        public int Websessions_key { get; set; } = 0;
        public int CreatedBY { get; set; } = 0;
        public int Assignedto { get; set; } = 0;
        public string TextAssignedto { get; set; } = "";
        public int Under { get; set; } = 0;
        public string TextCreatedBy { get; set; } = "";

        // CRMCommunication Properties
        public int CRMCommunication_key { get; set; } = 0;
        public string Commtext { get; set; } = "";
        public string LinkType { get; set; } = "";
        public string FrmtCreationDate { get; set; } = "";
        public int LinkCode { get; set; } = 0;
        public string TextLogincode { get; set; } = "";
        public int CommunicationType { get; set; } = 0;
        public string TextCommunicationType { get; set; } = "";
        // CRMCollaborator Properties
        public int CRMCollaborator_key { get; set; } = 0;
        public int P_CRMCollaborator { get; set; } = 0;
        // Public Property LinkType As String
        public string TxtCollaborator { get; set; } = "";
        // Public Property LinkCode As Int32 = 0
        // Public Property TextLogincode As String = ""

        public int CRMDocumentsLink_Key { get; set; } = 0;
        public int P_CRMDocumentsLink { get; set; } = 0;
        public string FileName { get; set; } = "";
        public string LinkURL { get; set; } = "";

        public string hasSubtasks { get; set; } = "";
        public string Tags { get; set; } = "";

        public int priority { get; set; }
        public string TextPriority { get; set; } = "";

        public string FrmtLastActionTime { get; set; } = "";



    }
}