using System;

namespace CRMApp
{
    public class NotificationMaster
    {
        public int Notification_key { get; set; }
        public int P_notification { get; set; }
        public int RowStatus { get; set; }
        public string NotificationSubject { get; set; } = "";
        public string NotificationText { get; set; } = "";
        public string UsedInWeb { get; set; } = "";
        public int NotificationStatus_Web { get; set; }
        public string UsedInApp { get; set; } = "";
        public int NotificationStatus_App { get; set; }
        public int From_P_acccode { get; set; }
        public string To_P_acccode { get; set; } = "";
        public int websessions_key { get; set; }
        public DateTime mtimestamp { get; set; }
        public string FrmmTimestamp { get; set; } = "";
        public string NotificationType { get; set; } = "";
        public DateTime NotificationDateTime { get; set; }
        public string NotificationURL { get; set; } = "";
        public string FrmNotificationDateTime { get; set; } = "";


        // Dim df1 As New DataFunctions.DataFunctions
        // Dim gf1 As New GlobalFunction1.GlobalFunction1
        // Dim cfc1 As New CommonFunctionsCloud.CommonFunctionsCloud


        // ''' <summary>
        // ''' This function return seen and unseen notification for a user
        // ''' </summary>
        // ''' <param name="P_acccode"></param>
        // ''' <param name="serverdatabase"></param>
        // ''' <returns></returns>
        // Public Function GetAllNotificationsForUser(ByVal P_acccode As String, ByVal serverdatabase As String) As DataTable
        // Dim sqlstr As String = "select * from notification where rowstatus=0 and To_P_acccode='" & P_acccode & "' and UsedInWeb='Y' order by  NotificationDateTime desc"
        // Dim dt As DataTable = df1.SqlExecuteDataTable(serverdatabase, sqlstr)
        // df1.AddColumnsInDataTable(dt, "FrmNotificationDateTime", "System.String")
        // For i = 0 To dt.Rows.Count - 1
        // If IsDBNull(dt.Rows(i).Item("NotificationDateTime")) = False Then
        // Dim temp As DateTime = dt.Rows(i).Item("NotificationDateTime")
        // dt.Rows(i).Item("FrmNotificationDateTime") = temp.ToString("dd/MM/yyyy hh:mm:ss tt")
        // Else
        // dt.Rows(i).Item("FrmNotificationDateTime") = ""
        // End If
        // Next
        // Return dt
        // End Function

        // ''' <summary>
        // ''' This function return unseen notification for a user
        // ''' </summary>
        // ''' <param name="P_acccode"></param>
        // ''' <param name="serverdatabase"></param>
        // ''' <returns></returns>
        // Public Function GetAllUnseenNotificationsForUser(ByVal P_acccode As String, ByVal serverdatabase As String) As DataTable
        // Dim sqlstr As String = "select * from notification where rowstatus=0 and To_P_acccode='" & P_acccode & "' and UsedInWeb='Y' and NotificationStatus_Web=0 order by  NotificationDateTime desc"
        // Dim dt As DataTable = df1.SqlExecuteDataTable(serverdatabase, sqlstr)
        // df1.AddColumnsInDataTable(dt, "FrmNotificationDateTime", "System.String")
        // For i = 0 To dt.Rows.Count - 1
        // If IsDBNull(dt.Rows(i).Item("NotificationDateTime")) = False Then
        // Dim temp As DateTime = dt.Rows(i).Item("NotificationDateTime")
        // dt.Rows(i).Item("FrmNotificationDateTime") = temp.ToString("dd/MM/yyyy hh:mm:ss tt")
        // Else
        // dt.Rows(i).Item("FrmNotificationDateTime") = ""
        // End If
        // Next
        // Return dt
        // End Function

        // ''' <summary>
        // ''' Return number of rows for unseen Notification of a user
        // ''' </summary>
        // ''' <param name="P_acccode"></param>
        // ''' <param name="serverdatabase"></param>
        // ''' <returns></returns>
        // Public Function CountUnseenNotifications(ByVal P_acccode As String, ByVal serverdatabase As String) As Integer
        // Dim unseenNotifications As Integer
        // Dim sqlstr As String = "select count(*) from notification where RowStatus=0 and UsedInWeb='Y' and NotificationStatus_Web=0 and To_P_acccode='" & P_acccode & "' "
        // Dim dt As DataTable = df1.SqlExecuteDataTable(serverdatabase, sqlstr)
        // unseenNotifications = dt.Rows(0)(0)
        // Return unseenNotifications
        // End Function



        // 'return NotificationStatus_web = 0 rows for a user (Unseen notifications)
        // Public Function GetUnseenNotificationsForUserbyDateTime(ByRef P_acccode As String, ByVal serverdatabase As String) As DataTable
        // Dim sqlstr As String = "select * from notification where rowstatus=0 and To_P_acccode='" & P_acccode & "' and UsedInWeb='Y'  and NotificationStatus_Web=0 and NotificationDateTime<'" & DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss tt") & "'"
        // Dim dt As DataTable = df1.SqlExecuteDataTable(serverdatabase, sqlstr)
        // Return dt
        // End Function



    }
}