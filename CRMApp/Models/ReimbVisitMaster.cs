using System;

namespace CRMApp.Models
{
    public class ReimbVisitMaster
    {
        // Dim df1 As New DataFunctions.DataFunctions
        // Dim GF1 As New GlobalFunction1.GlobalFunction1
        // Dim gf2 As New GlobalFunction2.GlobalFunction2
        // Dim clsreimbvisit As New ReimbVisit.ReimbVisit.ReimbVisit
        public int ReimbVisit_Key { get; set; } = 0;
        public int P_ReimbVisit { get; set; } = 0;
        public int Rowstatus { get; set; } = 0;
        public int CallId { get; set; } = 0;
        public decimal KmDistance { get; set; }
        public int TripId { get; set; } = 0;
        public DateTime StartDate { get; set; }
        public string TxtStartDate { get; set; } = "";
        public DateTime EndDate { get; set; }
        public string TxtEndDate { get; set; } = "";
        public string DistanceFlag { get; set; } = "";
        public string Firmname { get; set; } = "";
        public string StartLocation { get; set; } = "";
        public string EndLocation { get; set; } = "";
        public int P_imagefile { get; set; } = 0;
        public string TripName { get; set; } = "";
        public int LoginCode { get; set; } = 0;
        public string LoginType { get; set; } = "";
        public DateTime mtimestamp { get; set; }
        public string Txtmtimestamp { get; set; } = "";
        public int Websessions_Key { get; set; } = 0;

        // 'Moved in CallsLib
        // Public Function GetTripRembData(ByVal logintype As String, ByVal logincode As Integer) As DataTable
        // Dim dt As New DataTable
        // Dim ClsReimbvisit As New ReimbVisit.ReimbVisit.ReimbVisit
        // Dim selectquery As String = "Select ReimbVisit.TripName,ReimbVisit.StartDate,ReimbVisit.EndDate, ReimbVisit.KmDistance,ReimbVisit.CallId,ReimbVisit.StartLocation, ReimbVisit.EndLocation,
        // IssuesFilegst.Firmname,ReimbVisit.P_imagefile
        // from
        // ReimbVisit ReimbVisit
        // Left Join
        // IssuesFilegst IssuesFilegst
        // On ReimbVisit.CallId=IssuesFilegst.P_IssuesFilegst    
        // where(IssuesFilegst.rowstatus = 0 Or ReimbVisit.CalliD = 0) and LoginType='" & logintype & "' And LoginCode=" & logincode & ""

        // dt = df1.SqlExecuteDataTable(ClsReimbvisit.ServerDatabase, selectquery)
        // dt = df1.AddColumnsInDataTable(dt, "TxtStartDate,TxtEndDate", "System.String,System.String")
        // For i = 0 To dt.Rows.Count - 1
        // Dim StartDate As Date = df1.GetCellValue(dt.Rows(i), "startDate")
        // dt.Rows(i).Item("TxtStartDate") = StartDate.ToString("dd-MM-yyyy hh:mm tt")
        // Dim EndDate As Date = df1.GetCellValue(dt.Rows(i), "EndDate")
        // dt.Rows(i).Item("TxtEndDate") = EndDate.ToString("dd-MM-yyyy hh:mm tt")
        // Next

        // Return dt
        // End Function

        // 'Not used in Controller
        // Public Function GetTripImage(ByVal imagekey As Integer) As String
        // Dim ClsImageFile As New ImageFile.ImageFile
        // Dim ImageStr As String = ""
        // Dim Imagedt As New DataTable
        // Dim selectquery As String = String.Format("Select Contents from ImageFile where ImageFile_key=" & imagekey & "")
        // Imagedt = df1.SqlExecuteDataTable(ClsImageFile.ServerDatabase, selectquery)
        // ' Dim Objjf As New jsonFunctions
        // 'ImageStr = Objjf.DataTableToJSONWithJSONNet(Imagedt)
        // ' ImageStr = Imagedt.Rows(0).Item("Contents").ToString.Trim
        // Return ImageStr
        // End Function

        // 'Moved in CallsLib
        // Public Function GetDataForReimbursement(ByVal startdate As String, ByVal enddate As String) As DataTable
        // Dim reimbdt As New DataTable
        // Dim selectquery As String = " Select ReimbVisit.TripId,ReimbVisit.TripName,ReimbVisit.StartDate as Date, ReimbVisit.KmDistance,ReimbVisit.CallId,Customers.CustName,ReimbVisit.StartLocation, ReimbVisit.EndLocation,  
        // Employees.EmpName
        // from
        // ReimbVisit ReimbVisit
        // Left Join
        // IssuesFilegst IssuesFilegst
        // On ReimbVisit.CallId=IssuesFilegst.P_IssuesFilegst
        // Left Join
        // Customers Customers
        // On IssuesFilegst.P_Customers=Customers.P_Customers
        // inner Join
        // Employees Employees
        // On ReimbVisit.LoginCode=Employees.P_Employees
        // where((IssuesFilegst.rowstatus = 0 And Customers.rowstatus = 0) Or ReimbVisit.CalliD = 0) And Employees.Rowstatus=0 And ReimbVisit.startdate between '" & startdate & "' and '" & enddate & "' "
        // reimbdt = df1.SqlExecuteDataTable(clsreimbvisit.ServerDatabase, selectquery)



        // Return reimbdt
        // End Function

        // 'Moved in CallsLib
        // Public Function GetDataForReimbursement(ByVal startdate As String, ByVal enddate As String, ByVal empid As Integer) As DataTable
        // Dim empdtreimbdt As New DataTable
        // Dim selectquery As String = " Select ReimbVisit.TripId,ReimbVisit.TripName,ReimbVisit.StartDate as Date, ReimbVisit.KmDistance,ReimbVisit.CallId,Customers.CustName,ReimbVisit.StartLocation, ReimbVisit.EndLocation,  
        // Employees.EmpName
        // from
        // ReimbVisit ReimbVisit
        // Left Join
        // IssuesFilegst IssuesFilegst
        // On ReimbVisit.CallId=IssuesFilegst.P_IssuesFilegst
        // Left Join
        // Customers Customers
        // On IssuesFilegst.P_Customers=Customers.P_Customers
        // inner Join
        // Employees Employees
        // On ReimbVisit.LoginCode=Employees.P_Employees
        // where((IssuesFilegst.rowstatus = 0 And Customers.rowstatus = 0) Or ReimbVisit.CalliD = 0) And Employees.Rowstatus=0 And ReimbVisit.startdate between '" & startdate & "' and '" & enddate & "' and LoginCode = " & empid & ""
        // empdtreimbdt = df1.SqlExecuteDataTable(clsreimbvisit.ServerDatabase, selectquery)
        // Return empdtreimbdt
        // End Function

        // 'Not used in Controller
        // Public Function GetDataForReimbursement(ByVal empid As Integer, ByVal startdate As Date, ByVal enddate As Date) As Double
        // Dim empdisdt As New DataTable
        // Dim empdistance As Double = 0.0
        // Dim getempdistancequery As String = " Select sum(KmDistance) from ReimbVisit where startdate >= '" & startdate & "' and enddate <='" & enddate & "' and  LoginCode = '" & empid & "'"
        // empdisdt = df1.SqlExecuteDataTable(clsreimbvisit.ServerDatabase, getempdistancequery)
        // If empdisdt.Rows.Count > 0 Then
        // empdistance = Convert.ToDouble(empdisdt.Rows(0).Item(0))
        // End If
        // Return empdistance
        // End Function

        // 'Not used in controller
        // Public Function getTripReimbImageByKey(imagekey As Integer) As Byte()
        // Dim image As Byte() = Nothing
        // Dim selectquery As String = String.Format("Select Contents from ImageFile where ImageFile_key=" & imagekey & "")
        // Dim Imagedt As DataTable = df1.SqlExecuteDataTable(clsreimbvisit.ServerDatabase, selectquery)
        // If Imagedt.Rows.Count > 0 Then
        // image = Imagedt.Rows(0).Item("Contents")
        // End If
        // Return image
        // End Function
    }
}