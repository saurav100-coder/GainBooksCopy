using ClosedXML.Excel;
using CRMApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using System.Collections;
using System.Data;
using System.IO.Compression;
using System.Text;

namespace CRMApp.Controllers
{
    public class CRMController : Controller
    {

        private object _SessionControl = null;
        public CustomerControl.Variables SessionControl
        {
            get
            {
                return (CustomerControl.Variables)_SessionControl;
            }
            set
            {
                _SessionControl = value;
            }
        }
        private object? _rdc = null;
        public RegisterDllClass.ValidateClass rdc
        {
            get
            {
                if (_rdc is null)
                {
                    var argSessionInstance = SessionControl;
                    _rdc = new RegisterDllClass.ValidateClass(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _rdc = (RegisterDllClass.ValidateClass)_rdc;
                }
                return (RegisterDllClass.ValidateClass)_rdc;
            }
        }
        private object? _GF1 = null;
        private GlobalFunction1.GlobalFunction1 GF1
        {
            get
            {
                if (_GF1 is null)
                {
                    var argSessionInstance = SessionControl;
                    _GF1 = new GlobalFunction1.GlobalFunction1(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _GF1 = (GlobalFunction1.GlobalFunction1)_GF1;
                }
                return (GlobalFunction1.GlobalFunction1)_GF1;
            }
        }
        private object? _df1 = null;
        private DataFunctions.DataFunctions df1
        {
            get
            {
                if (_df1 is null)
                {
                    var argSessionInstance = SessionControl;
                    _df1 = new DataFunctions.DataFunctions(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _df1 = (DataFunctions.DataFunctions)_df1;
                }
                return (DataFunctions.DataFunctions)_df1;
            }
        }
        private object? _cfc1 = null;
        private CommonFunctionsCloud.CommonFunctionsCloud cfc1
        {
            get
            {
                if (_cfc1 is null)
                {
                    var argSessionInstance = SessionControl;
                    _cfc1 = new CommonFunctionsCloud.CommonFunctionsCloud(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _cfc1 = (CommonFunctionsCloud.CommonFunctionsCloud)_cfc1;
                }
                return (CommonFunctionsCloud.CommonFunctionsCloud)_cfc1;
            }
        }
        private object? _libcustomerfeature = null;
        private CustomerFeatureLib.CustomerFeatureFunctions libcustomerfeature
        {
            get
            {
                if (_libcustomerfeature is null)
                {
                    var argSessionInstance = SessionControl;
                    _libcustomerfeature = new CustomerFeatureLib.CustomerFeatureFunctions(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _libcustomerfeature = (CustomerFeatureLib.CustomerFeatureFunctions)_libcustomerfeature;
                }
                return (CustomerFeatureLib.CustomerFeatureFunctions)_libcustomerfeature;
            }
        }
        private object? _DCLib = null;
        private DataTypeConversionLib.DataTypeConversionFunctions DCLib
        {
            get
            {
                if (_DCLib is null)
                {
                    var argSessionInstance = SessionControl;
                    _DCLib = new DataTypeConversionLib.DataTypeConversionFunctions(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _DCLib = (DataTypeConversionLib.DataTypeConversionFunctions)_DCLib;
                }
                return (DataTypeConversionLib.DataTypeConversionFunctions)_DCLib;
            }
        }
        private object? _libSaralAuth = null;
        private SaralAuthLib.LoginFunctions libSaralAuth
        {
            get
            {
                if (_libSaralAuth is null)
                {
                    var argSessionInstance = SessionControl;
                    _libSaralAuth = new SaralAuthLib.LoginFunctions(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _libSaralAuth = (SaralAuthLib.LoginFunctions)_libSaralAuth;
                }
                return (SaralAuthLib.LoginFunctions)_libSaralAuth;
            }
        }
        private object? _saleOrderLib = null;
        private SalesOrderLibrary.SalesOrderFunction saleOrderLib
        {
            get
            {
                if (_saleOrderLib is null)
                {
                    var argSessionInstance = SessionControl;
                    _saleOrderLib = new SalesOrderLibrary.SalesOrderFunction(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _saleOrderLib = (SalesOrderLibrary.SalesOrderFunction)_saleOrderLib;
                }
                return (SalesOrderLibrary.SalesOrderFunction)_saleOrderLib;
            }
        }
        private object? _libCRMTasks = null;
        private CRMTasksLibrary.CRMTasksFunction libCRMTasks
        {
            get
            {
                if (_libCRMTasks is null)
                {
                    var argSessionInstance = SessionControl;
                    _libCRMTasks = new CRMTasksLibrary.CRMTasksFunction(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _libCRMTasks = (CRMTasksLibrary.CRMTasksFunction)_libCRMTasks;
                }
                return (CRMTasksLibrary.CRMTasksFunction)_libCRMTasks;
            }
        }
        private object? _libMobileNotification = null;
        private MobileNotificationLib.MobileNotificationClass libMobileNotification
        {
            get
            {
                if (_libMobileNotification is null)
                {
                    var argSessionInstance = SessionControl;
                    _libMobileNotification = new MobileNotificationLib.MobileNotificationClass(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _libMobileNotification = (MobileNotificationLib.MobileNotificationClass)_libMobileNotification;
                }
                return (MobileNotificationLib.MobileNotificationClass)_libMobileNotification;
            }
        }
        private object? _libCalls = null;
        private CallsLibrary.CallsFunctions libCalls
        {
            get
            {
                if (_libCalls is null)
                {
                    var argSessionInstance = SessionControl;
                    _libCalls = new CallsLibrary.CallsFunctions(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _libCalls = (CallsLibrary.CallsFunctions)_libCalls;
                }
                return (CallsLibrary.CallsFunctions)_libCalls;
            }
        }
        private object? _libemployee = null;
        private EmployeeLib.EmployeeFunctions libemployee
        {
            get
            {
                if (_libemployee is null)
                {
                    var argSessionInstance = SessionControl;
                    _libemployee = new EmployeeLib.EmployeeFunctions(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _libemployee = (EmployeeLib.EmployeeFunctions)_libemployee;
                }
                return (EmployeeLib.EmployeeFunctions)_libemployee;
            }
        }
        private object? _GF2 = null;
        private GlobalFunction2.GlobalFunction2 GF2
        {
            get
            {
                if (_GF2 is null)
                {
                    var argSessionInstance = SessionControl;
                    _GF2 = new GlobalFunction2.GlobalFunction2(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _GF2 = (GlobalFunction2.GlobalFunction2)_GF2;
                }
                return (GlobalFunction2.GlobalFunction2)_GF2;
            }
        }

        private GoggleApiFunction.Class1 gflib = new GoggleApiFunction.Class1();
        DataTable DtInfoTable = new DataTable();
        DataTable DtInfoTableuser = new DataTable();
        string authorizedMsg = "You are not authorized for this option. Please contact to system administrator.";


        public void SetSessionControl(int userloginkey_Saralweb)
        {
            SessionControl = new CustomerControl.Variables(HttpContext.Session.GetString("saraltype"), ControlTxtFile: HttpContext.Session.GetString("textcontrolfile"), encrypted: true);
            DataTable dt = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase, "select userid  from userlogin where userlogin_key=" + userloginkey_Saralweb);
            if (dt.Rows.Count>0)
            {
                SessionControl = new CustomerControl.Variables(HttpContext.Session.GetString("saraltype"), mcorpid: df1.GetCellValue(dt.Rows[0], "userid").ToString()?.Trim(), ControlTxtFile: HttpContext.Session.GetString("textcontrolfile"));
                df1.SessionControl = SessionControl;
                var argSessionControl = SessionControl;
                df1.SetDbCredentials(ref argSessionControl);
                SessionControl = argSessionControl;

                var argSessionControl2 = SessionControl;
                SetSessionControlOnDLL(ref argSessionControl2);
                SessionControl = argSessionControl2;
                SetInfoTables();
            }
        }
        public void SetSessionControlUsingCoprid(string corpid)
        {
            var cc1 = new CustomerControl.Variables(HttpContext.Session.GetString("saraltype"), mcorpid: corpid, ControlTxtFile: HttpContext.Session.GetString("textcontrolfile"), encrypted: true);
            SessionControl = cc1;
            var argSessionControl = SessionControl;
            df1.SetDbCredentials(ref argSessionControl);
            SessionControl = argSessionControl;

            var argSessionControl2 = SessionControl;
            SetSessionControlOnDLL(ref argSessionControl2);
            SessionControl = argSessionControl2;
            SetInfoTables();
        }
        public void SetSessionControlOnDLL(ref CustomerControl.Variables sessionControl)
        {
            rdc.SessionControl = sessionControl;
            GF1.SessionControl = sessionControl;
            df1.SessionControl = sessionControl;
            cfc1.SessionControl = sessionControl;
            libcustomerfeature.SessionControl = sessionControl;
            DCLib.SessionControl = sessionControl;
            libSaralAuth.SessionControl = sessionControl;
            saleOrderLib.SessionControl = sessionControl;
            libCRMTasks.SessionControl = sessionControl;
            libMobileNotification.SessionControl = sessionControl;
            libCalls.SessionControl = sessionControl;
            libemployee.SessionControl = sessionControl;
        }

        public void SetInfoTables()
        {
            if (DtInfoTable == null || DtInfoTable.Rows.Count == 0)
            {
                DtInfoTable = libSaralAuth.GetInfoTable(SessionControl.UserServerDatabase);
            }
            if (DtInfoTableuser == null || DtInfoTableuser.Rows.Count == 0)
            {
                DtInfoTableuser = libSaralAuth.GetInfoTableUser(SessionControl.UserServerDatabase);
            }
        }


        /// <summary>
        /// Home page after login
        /// </summary>
        /// <returns></returns>
        public ActionResult Home()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase"))) 
            {
                return View();
            }
            return RedirectToAction("LogOut", "Home");

        }

        /// <summary>
        /// function to send message to customer from manageregcalls page
        /// </summary>
        /// <param name="PCall">P_issuesfilegst of call</param>
        /// <param name="calltype">Calltype of call  "L" For Lead "C" for Customer(issuesfilegst)</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult CallTransfer(int PCall, string calltype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "calltransfertolead", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow callRow;
                int result = 0;
                if (calltype.ToString().Trim().ToLower() == "c")
                {
                    callRow = libCalls.getCallRowfromP_allcallsreg(PCall, SessionControl.UserServerDatabase);
                    result = libCalls.ConvertIssuerowtoLeadrow(callRow, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""), SessionControl.UserServerDatabase);
                }
                else
                {
                    callRow = libCalls.getCallRowfromP_crmlead(PCall,SessionControl.UserServerDatabase);
                    result = libCalls.ConvertLeadrowtoIssuerow(callRow, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""), SessionControl.UserServerDatabase);
                }

                if (result > 0)
                    return Json("success");
                else
                    return Json("Error");
            }
            return Json("NotAuthorized");
        }

        /// <summary>
        /// function to Mark Call as duplicate on ManageRegCalls page
        /// </summary>
        /// <param name="MainCallid">P_allcallsReg of call</param>
        /// <param name="DuplicateCallkey"></param>
        /// <returns></returns>
        public JsonResult CallMarkAsDuplicate(int MainCallid, int DuplicateCallkey, string calltype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "callmarkasduplicate", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (ModelState.IsValid)
                {
                    DataRow DuplicateissuefilegstRow;
                    int callId;
                    DataRow MainissuefilegstRow;
                    var LastCallDate = default(DateTime);
                    if (calltype.ToString().Trim().ToLower() == "c")
                    {
                        DuplicateissuefilegstRow = libCalls.getCallRowfromAllCallsReg_key(DuplicateCallkey, SessionControl.UserServerDatabase);
                        callId = Convert.ToInt32(DuplicateissuefilegstRow["p_allcallsreg"]);
                        MainissuefilegstRow = libCalls.getCallRowfromP_allcallsreg(MainCallid, SessionControl.UserServerDatabase, "Firmname");
                        var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(callId, "C",SessionControl.UserServerDatabase, "calltime");
                        if (lastcallrow is not null)
                            LastCallDate = Convert.ToDateTime(lastcallrow["calltime"]);
                    }
                    else
                    {
                        DuplicateissuefilegstRow = libCalls.getCallRowfromCrmlead_key(DuplicateCallkey, SessionControl.UserServerDatabase);
                        callId = Convert.ToInt32(DuplicateissuefilegstRow["p_crmlead"]);
                        MainissuefilegstRow = libCalls.getCallRowfromP_crmlead(MainCallid, "Topic");
                        var CallFreqRow = libCalls.getLastcallFreqrowFromP_allcallsreg(callId, "L", SessionControl.UserServerDatabase, "calltime");
                        if (CallFreqRow is not null)
                            LastCallDate = Convert.ToDateTime(CallFreqRow["calltime"]);
                    }
                    DataRow taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode(calltype.ToString().Trim(), callId, SessionControl.UserServerDatabase, "p_crmtasks,crmtasks_key");
                    DataTable dtremarks = libCRMTasks.GetRemarkDataOfATask(Convert.ToInt32(df1.GetCellValue(taskRow, "p_crmtasks", "integer")),SessionControl.UserServerDatabase);


                    if (Convert.ToDateTime(dtremarks.Rows[0]["CreationDate"]) < LastCallDate)
                        return Json("NoRemarkAfterLastCall");

                    DataRow taskRowOld = libCRMTasks.GetTasksRowFromLinkTypeLinkCode(calltype.ToString().Trim(), MainCallid, SessionControl.UserServerDatabase, "p_crmtasks");
                    if (dtremarks.Rows.Count > 0)
                    {
                        string P_CRMCommunications = "";
                        for (int i = 0, loopTo = dtremarks.Rows.Count - 1; i <= loopTo; i++)
                            P_CRMCommunications += df1.GetCellValue(dtremarks.Rows[i], "P_CRMCommunication") + ",";
                        
                        if (P_CRMCommunications.Last() == ',')
                            P_CRMCommunications = P_CRMCommunications.Substring(0, P_CRMCommunications.Length - 1);

                        int result = libCRMTasks.UpdateLinkCodeinCRMCommunication(P_CRMCommunications, Convert.ToInt32(df1.GetCellValue(taskRowOld, "p_crmtasks")), SessionControl.UserServerDatabase);
                    }
                    int s = libCalls.UpdateCallIdinCallFreq(callId, MainCallid, calltype.ToString().Trim(), SessionControl.UserServerDatabase);
                    int k = libCalls.deleteCall(callId.ToString(), calltype, SessionControl.UserServerDatabase);
                    return Json("true");
                }
            }
            return Json("");
        }

        /// <summary>
        /// function to closecall on ManageRegCalls page
        /// </summary>
        /// <param name="Pid">P_allcallsreg of call</param>
        /// <param name="calledfrom"></param>
        /// <returns></returns>
        public JsonResult CallClosed(int Pid, string calledfrom)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");
            
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "callclose", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return Json("");
                
                if (ModelState.IsValid)
                {
                    DataRow IssueRow = libCalls.getCallRowfromP_allcallsreg(Pid, SessionControl.UserServerDatabase);
                    DataRow taskrow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode("C", Pid, SessionControl.UserServerDatabase, "p_crmtasks,Assignedto");
                    if (taskrow["assignedto"] is DBNull || string.IsNullOrEmpty(df1.GetCellValue(taskrow, "assignedto", "string").ToString()))
                    {
                        return Json("CallNotAssigned");
                    }
                    else if (Convert.ToInt32(df1.GetCellValue(taskrow, "assignedto", "integer")) != Convert.ToInt32(sessionRow["LinkCode"]))
                    {
                        return Json("CallNotAssignedtoLoggedInEmployee");
                    }
                    var crmcommRow = libCRMTasks.GetRemarkDataOfATask(Convert.ToInt32(df1.GetCellValue(taskrow, "p_crmtasks", "Integer")), SessionControl.UserServerDatabase);
                    if (IssueRow["P_Customers"] is DBNull == true || Convert.ToInt32(IssueRow["P_Customers"]) == -1 || Convert.ToInt32(IssueRow["P_Customers"]) == 0)
                    {
                        return Json("CustomerNotLink");
                    }

                    DataRow lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Pid, "C", SessionControl.UserServerDatabase, "calltime");

                    DateTime LastCallDate = Convert.ToDateTime(df1.GetCellValue(lastcallrow, "calltime", "datetime"));
                    if (crmcommRow.Rows.Count == 0)
                    {
                        return Json("NoRemarkAfterLastCall");
                    }
                    else if (Convert.ToDateTime(crmcommRow.Rows[0]["CreationDate"])< LastCallDate)
                    {
                        return Json("NoRemarkAfterLastCall");
                    }
                    string? Issuedescreption = IssueRow["Issuedescription"].ToString()?.Trim();
                    string? Mobileno = IssueRow["Mobileno"].ToString()?.Trim();
                    string? email = IssueRow["Emailid"].ToString()?.Trim();
                    bool success = libCalls.CallClose(IssueRow, sessionRow, SessionControl.UserServerDatabase, DtInfoTableuser );

                    if (success == true)
                    {
                        //string Message = "Dear Sir/Mam, call id:"  + IssueRow["p_allcallsreg"].ToString()  + (string.IsNullOrEmpty(Issuedescreption?.Trim()) ? "": " regarding " + Issuedescreption ) + @" has been marked completed and is closed from our end.<br/>In case you are not satisfied with the resolution, kindly mail at nehagupta@saralerp.com, hcgupta@saralerp.com<br/><br/><br/>Regards<br/>Saral Team<br/>Customer Care";
                        //string msg = "Dear Sir/Mam, call id:" + IssueRow["p_allcallsreg"].ToString() + (string.IsNullOrEmpty(Issuedescreption?.Trim())? "": " regarding " + Issuedescreption) + @" has been marked completed and is closed from our end. In case you are not satisfied with the resolution, kindly mail at nehagupta@saralerp.com, hcgupta@saralerp.com Thanks Saral Team";
                        string templateText = libSaralAuth.GetMsgTemplateTextByTemplateType(3182, SessionControl.UserServerDatabase);
                        Hashtable varHash = new Hashtable();
                        varHash = GF1.AddItemToHashTable(ref varHash, "callid", IssueRow["p_allcallsreg"].ToString());
                        varHash = GF1.AddItemToHashTable(ref varHash, "issuedescription", Issuedescreption);
                        string msg = cfc1.evaluateVariable(templateText, varHash);

                        DataTable dtmsg = new DataTable();
                        dtmsg = cfc1.CreateMsgQueueDt("M", msg, "", Mobileno, "", "N");
                        cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);


                        //Message = Message + Convert.ToChar(201) + "Notification : Call closed at Saral";
                        //dtmsg = cfc1.CreateMsgQueueDt("E", Message, "", email?.ToString().Trim().ToLower(), "", "N");
                        dtmsg = cfc1.CreateMsgQueueDt("E", msg, "", email?.ToString().Trim().ToLower(), "", "N");
                        cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);
                    }
                    else
                    {
                        return Json("false");
                    }
                }

                else
                {
                    return Json("false");
                }
            }
            return Json("");
        }

        /// <summary>
        /// Close multiple calls
        /// </summary>
        /// <param name="callIds">Comma Separated p_allcallsreg</param>
        /// <returns></returns>
        public JsonResult MultilpleCallClosed(string callIds)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "callclose", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                if (sessionRow is null)
                    return Json("");

                string resultStr = string.Empty;
                string callNotAssignedStr = string.Empty;
                string callNotAssignedtoLoggedInEmployeeStr = string.Empty;
                string customerNotLinkStr = string.Empty;
                string noRemarkAfterLastCall = string.Empty;
                int successInt = 0;
                var dtmsg = new DataTable();
                string p_crmtasks = string.Empty;

                DataTable dtAllCallsReg = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "allcallsreg", "p_allcallsreg in(" + callIds + ")");
                DataTable dtCrmTasks = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "crmtasks", "linktype='C' and rowstatus = 0 and linkcode in (" + callIds + ")", "p_crmtasks,linkcode,assignedto");
                for (int j = 0; j <= dtCrmTasks.Rows.Count - 1; j++)
                    p_crmtasks += "," + df1.GetCellValue(dtCrmTasks.Rows[j], "p_crmtasks", "integer").ToString();
                
                if (!string.IsNullOrEmpty(p_crmtasks.Trim()) && p_crmtasks.First() == ',')
                    p_crmtasks = p_crmtasks.Substring(1, p_crmtasks.Length - 1);

                var dtCrmComm = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "CRMCommunication", "linktype = 'T' and linkcode in (" + p_crmtasks + ")", "linkcode,CreationDate");

                var callIdsArr = callIds.Trim().Split(',');
                for (int i = 0 ; i <= callIdsArr.Length - 1; i++)
                {
                    var taskrow = dtCrmTasks.Select("linkcode=" + callIdsArr[i]).FirstOrDefault();
                    if (taskrow is null)
                        continue;

                    if (taskrow["assignedto"] is DBNull || string.IsNullOrEmpty(df1.GetCellValue(taskrow, "assignedto", "string").ToString()))
                    {
                        callNotAssignedStr = callNotAssignedStr + "," + callIdsArr[i];
                        continue;
                    }
                    else if (Convert.ToInt32(df1.GetCellValue(taskrow, "assignedto", "integer"))!= Convert.ToInt32(sessionRow["LinkCode"]))
                    {
                        callNotAssignedtoLoggedInEmployeeStr = callNotAssignedtoLoggedInEmployeeStr + "," + callIdsArr[i];
                        continue;
                    }

                    var IssueRow = dtAllCallsReg.Select("p_allcallsreg=" + callIdsArr[i]).FirstOrDefault();
                    if (IssueRow == null)
                        continue;
                    
                    if (IssueRow["P_Customers"] is DBNull == true || Convert.ToInt32(IssueRow["P_Customers"]) == -1 || Convert.ToInt32(IssueRow["P_Customers"])== 0)
                    {
                        customerNotLinkStr = customerNotLinkStr + "," + callIdsArr[i];
                        continue;
                    }

                    var crmcommRow = dtCrmComm.Select("linkcode=" + Convert.ToInt32(df1.GetCellValue(taskrow, "p_crmtasks", "integer")));
                    if (crmcommRow.Length == 0)
                    {
                        noRemarkAfterLastCall = noRemarkAfterLastCall + "," + callIdsArr[i];
                        continue;
                    }
                    else
                    {
                        var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(callIdsArr[i]), "C", SessionControl.UserServerDatabase, "calltime");
                        DateTime LastCallDate = Convert.ToDateTime(df1.GetCellValue(lastcallrow, "calltime", "datetime"));
                        if (Convert.ToDateTime(crmcommRow[0]["CreationDate"]) < LastCallDate )
                        {
                            noRemarkAfterLastCall = noRemarkAfterLastCall + "," + callIdsArr[i];
                            continue;
                        }
                    }

                    string? Issuedescreption = IssueRow["Issuedescription"].ToString()?.Trim();
                    string? Mobileno = IssueRow["Mobileno"].ToString()?.Trim();
                    string? email = IssueRow["Emailid"].ToString()?.Trim(); 
                    bool success = libCalls.CallClose(IssueRow, sessionRow, SessionControl.UserServerDatabase, DtInfoTableuser );
                    if (success)
                    {
                        successInt = successInt + 1;
                        //string Message ="Dear Sir/Mam, call id:" + IssueRow["p_allcallsreg"].ToString() + (string.IsNullOrEmpty(Issuedescreption?.Trim())? "" : " regarding " + Issuedescreption) + @" has been marked completed and is closed from our end.<br/>In case you are not satisfied with the resolution, kindly mail at nehagupta@saralerp.com, hcgupta@saralerp.com<br/><br/><br/>Regards<br/>Saral Team<br/>Customer Care";
                        //string msg = "Dear Sir/Mam, call id:" + IssueRow["p_allcallsreg"].ToString() + (string.IsNullOrEmpty(Issuedescreption?.Trim()) ? "" : " regarding " + Issuedescreption) + @" has been marked completed and is closed from our end. In case you are not satisfied with the resolution, kindly mail at nehagupta@saralerp.com, hcgupta@saralerp.com Thanks Saral Team";

                        string templateText = libSaralAuth.GetMsgTemplateTextByTemplateType(3182, SessionControl.UserServerDatabase);
                        Hashtable varHash = new Hashtable();
                        varHash = GF1.AddItemToHashTable(ref varHash, "callid", IssueRow["p_allcallsreg"].ToString());
                        varHash = GF1.AddItemToHashTable(ref varHash, "issuedescription", Issuedescreption);
                        string msg = cfc1.evaluateVariable(templateText, varHash);

                        dtmsg = cfc1.CreateMsgQueueDtNew(ref dtmsg, "M", msg, "", Mobileno, "", "N");
                        // Message = Message + Convert.ToChar(201) + "Notification : Call closed at Saral";
                        //dtmsg = cfc1.CreateMsgQueueDtNew(ref dtmsg, "E", Message, "", email?.ToString().Trim().ToLower(), "", "N");
                        dtmsg = cfc1.CreateMsgQueueDtNew(ref dtmsg, "E", msg, "", email?.ToString().Trim().ToLower(), "", "N");
                    }
                }

                if (successInt > 0)
                    cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);

                if (successInt > 0 & string.IsNullOrEmpty(callNotAssignedStr.Trim()) & string.IsNullOrEmpty(callNotAssignedtoLoggedInEmployeeStr.Trim()) & string.IsNullOrEmpty(customerNotLinkStr.Trim()) & string.IsNullOrEmpty(noRemarkAfterLastCall.Trim()))
                {
                    resultStr = "All Calls have closed successfully.";
                }
                else
                {
                    if (!string.IsNullOrEmpty(callNotAssignedStr.Trim()))
                        resultStr = resultStr + Environment.NewLine + "Please Assign calls: " + (callNotAssignedStr.Trim().StartsWith(",")? callNotAssignedStr.Substring(1, callNotAssignedStr.Length - 1): callNotAssignedStr);
                    if (!string.IsNullOrEmpty(callNotAssignedtoLoggedInEmployeeStr.Trim()))
                        resultStr =resultStr + Environment.NewLine + "Calls: " + (callNotAssignedtoLoggedInEmployeeStr.Trim().StartsWith(",") ? callNotAssignedtoLoggedInEmployeeStr.Substring(1, callNotAssignedtoLoggedInEmployeeStr.Length - 1): callNotAssignedtoLoggedInEmployeeStr + " can only be closed by whomever it is assigned.");
                    if (!string.IsNullOrEmpty(customerNotLinkStr.Trim()))
                        resultStr = resultStr + Environment.NewLine + "Please link customer to Calls: " + (customerNotLinkStr.Trim().StartsWith(",")? customerNotLinkStr.Substring(1, customerNotLinkStr.Length - 1) : customerNotLinkStr);
                    if (!string.IsNullOrEmpty(noRemarkAfterLastCall.Trim()))
                        resultStr = resultStr + Environment.NewLine + "Please add remark to close Calls: " + (noRemarkAfterLastCall.Trim().StartsWith(",") ? noRemarkAfterLastCall.Substring(1, noRemarkAfterLastCall.Length - 1) : noRemarkAfterLastCall);
                }
                return Json(resultStr);
            }
            return Json("");
        }



        /// <summary>
        /// Delete multiple calls
        /// </summary>
        /// <param name="callIds">Comma Separated p_allcallsreg</param>
        /// <returns></returns>
        public JsonResult MultilpleCallDelete(string callIds)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));


            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")))
            {
                if (libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "calldelete", HttpContext.Session.GetString("serverdatabase")))
                {
                    DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                    if (sessionRow is null)
                        return Json("");

                    string resultStr = string.Empty;
                    string resultType = string.Empty;
                    int a = libCalls.deleteCall(callIds,"C",SessionControl.UserServerDatabase);
                    if (a > 0)
                    {
                        resultStr = "Call deleted successfully";
                        resultType = "success";
                    }
                    else
                    {
                        resultStr = "Something went wrong. Please try again later";
                        resultType = "error";
                    }
                    return Json(new[] {resultStr, resultType });
                }
                return Json(new[] { authorizedMsg , "info"});
            }
            return Json("");
        }


        /// <summary>
        /// function to increase onsiteCount from ManageRegCalls page
        /// </summary>
        /// <param name="PCall">P_AllCalllsReg of a call</param>
        /// <returns></returns>
        public JsonResult GetCurrentOnsiteVisit(int PCall)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "onsitevisit", HttpContext.Session.GetString("serverdatabase")))
            {
                if (ModelState.IsValid)
                {
                    var callRow = libCalls.getCallRowfromP_allcallsreg(PCall, SessionControl.UserServerDatabase, "OnsiteCount");
                    int OnsiteCount =Convert.ToInt32(df1.GetCellValue(callRow, "OnsiteCount", "integer"));
                    if (OnsiteCount == -1)
                        return Json("0");
                    else
                        return Json(OnsiteCount);
                }
                return Json("N/A");
            }
            return Json("");
        }

        /// <summary>
        /// function to increase onsiteCount from ManageRegCalls page
        /// </summary>
        /// <param name="PCall">P_AllCalllsReg of a call</param>
        /// <returns></returns>
        public JsonResult OnsiteVisit(int PCall)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "onsitevisit", HttpContext.Session.GetString("serverdatabase")))
            {
                if (ModelState.IsValid)
                {
                    int k = libCalls.UpdateOnsiteCount(PCall, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""), SessionControl.UserServerDatabase);
                    if (k <= 0)
                        return Json("Success");
                }
                return Json("success");
            }
            return Json("");
        }

        /// <summary>
        /// function to assign a call to an employee
        /// </summary>
        /// <param name="Callid">CallId of call</param>
        /// <param name="empId">p_acccode of employee</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult CallAssignedTo(int Callid, int empId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");
            
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
           

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "callassignto", HttpContext.Session.GetString("serverdatabase")))
            {
                bool success = false;
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (ModelState.IsValid)
                {
                    int p_acccode = empId;  
                    var AllCallsRegRow = libCalls.getCallRowfromP_allcallsreg(Callid, SessionControl.UserServerDatabase);
                    success = libCalls.CallAssigntoEmp(AllCallsRegRow, sessionRow, p_acccode, SessionControl.UserServerDatabase);
                    if (success == true)
                    {
                        var empRow = libSaralAuth.getAccMasterRowForp_acccode(p_acccode, SessionControl.UserServerDatabase, "email,accname");
                        string? email = empRow["Email"].ToString()?.Trim();
                        string AssignedBy = HttpContext.Session.GetString("loginname") ??"";
                        string Message = "Dear " + empRow["accname"].ToString() + "<br/><br/>Call: " + AllCallsRegRow["FirmName"].ToString()?.Trim() + "<br/>has been Assigned to you by " + AssignedBy.ToString().Trim();
                        if (!string.IsNullOrEmpty(email?.ToString().Trim()))
                        {
                            Message = Message + Convert.ToChar(201) + "Call Assigned";
                            var dtmsg = cfc1.CreateMsgQueueDt("E", Message, "", email, "", "N");
                            cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);
                        }
                    }
                }
                return Json(success.ToString());
            }
            return Json("");
        }

        /// <summary>
        /// function to send message to customer from manageregcalls page
        /// </summary>
        /// <param name="PCall">P_issuesfilegst of call</param>
        /// <param name="MobNo">Mobile no of the customer</param>
        /// <param name="Message">Message to be sent</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult MsgToCustomer(int PCall, string MobNo, string Message, string calltype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");
            
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
           

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "msgtocustomer", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string phone = MobNo;
                var dtmsg = cfc1.CreateMsgQueueDt("M", Message, "", phone, "", "N");
                cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);
                TempData["Message"] = "Message Sent to Customer";
                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode(calltype.ToString().Trim(), PCall, SessionControl.UserServerDatabase, "p_crmtasks");
                var dtissuescomm1 = libCRMTasks.CreateCRMCommunicationDt(Message, "T", Convert.ToInt32(taskRow["p_crmtasks"]), 2740);
                libCRMTasks.AddRowInCRMcommunication(dtissuescomm1, sessionRow, SessionControl.UserServerDatabase);
                return Json("success");
            }
            return Json("");
        }

        /// <summary>
        /// function to linkcustomer to a call on manageregcall page
        /// </summary>
        /// <param name="CallId">P_AllCallsReg</param>
        /// <param name="P_Customers"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult LinkCustomer(int CallId, int P_Customers)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "linkcustomer", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int P_AllCallsReg = CallId;

                var dtcust = libcustomerfeature.getCustomerRowFromP_customers(P_Customers, SessionControl.UserServerDatabase);
                var changedfields = new Hashtable();
                changedfields = GF1.AddItemToHashTable(ref changedfields, "p_customers", P_Customers);
                changedfields = GF1.AddItemToHashTable(ref changedfields, "Firmname", df1.GetCellValue(dtcust, "CustName"));
                changedfields = GF1.AddItemToHashTable(ref changedfields, "Emailid", df1.GetCellValue(dtcust, "Email"));
                int MainBussCode = 0;
                if (df1.GetCellValue(dtcust, "MainBussCode") is DBNull == false)
                {
                    MainBussCode = Convert.ToInt32(df1.GetCellValue(dtcust, "MainBussCode"));
                }
                changedfields = GF1.AddItemToHashTable(ref changedfields, "Businesstype", MainBussCode);

                string hometownText = cfc1.GetNameOfInfoFromInfotableFromP_infotable(Convert.ToInt32(df1.GetCellValue(dtcust, "HomeTown")), SessionControl.UserServerDatabase);
                changedfields = GF1.AddItemToHashTable(ref changedfields, "Location", hometownText);
                changedfields = GF1.AddItemToHashTable(ref changedfields, "ContactPerson", df1.GetCellValue(dtcust, "Contactperson"), false);
                int success = libCalls.InsertUpdateAllCallsReg(ref P_AllCallsReg, ref changedfields, sessionRow, SessionControl.UserServerDatabase);

                return Json("success");
            }
            return Json("");
        }

        /// <summary>
        /// function to send email to customer on ManageRegCalls
        /// </summary>
        /// <param name="PCall"></param>
        /// <param name="EmailId"></param>
        /// <param name="Message"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult MailToCustomer(int PCall, string EmailId, string Message, string calltype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "mailtocustomer", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string email = EmailId;
                if (!string.IsNullOrEmpty(email.ToString().Trim()))
                {
                    Message = Message + Convert.ToChar(201) + "Call ID:" + PCall + "- Important communication from Team Saral";
                    var dtmsg = cfc1.CreateMsgQueueDt("E", Message, "", email, "", "N");
                    cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);
                    ViewBag.email = email.ToString();
                }
                TempData["Message"] = "Email Sent to Customer";
                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode(calltype.ToString().Trim(), PCall, SessionControl.UserServerDatabase, "p_crmtasks");
                var dtissuescomm1 = libCRMTasks.CreateCRMCommunicationDt(Message, "T", Convert.ToInt32(taskRow["p_crmtasks"]), 2741);
                int k = libCRMTasks.AddRowInCRMcommunication(dtissuescomm1, sessionRow, SessionControl.UserServerDatabase);
                if (k <= 0)
                    ModelState.AddModelError(0.ToString(), "An error occured while processing the requested operation. Please try again later.");
                
                return Json("success");
            }
            return Json("");
        }

        /// <summary>
        /// Function to export PendingCalls in excel
        /// </summary>
        /// <returns></returns>
        public FileResult? ExportToExcel()
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var datatablemain = libCalls.ExportCallsToExcel(DtInfoTable ,DtInfoTableuser , SessionControl.UserServerDatabase);
            using (var wb = new XLWorkbook())
            {
                wb.Worksheets.Add(datatablemain, "sheet1");
                using (var Stream1 = new MemoryStream())
                {
                    wb.SaveAs(Stream1);
                    return File(Stream1.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "RegisteredCalls.xlsx");
                }
            }
        }

        /// <summary>
        /// EditRegCalls get function
        /// </summary>
        /// <param name="P_allCallReg"></param>
        /// <param name="CalledFrom"></param>
        /// <param name="LCustomer"></param>
        /// <returns></returns>
        public ActionResult EditRegCalls(int? P_allCallReg, string CalledFrom = "", bool LCustomer = false)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");
            
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
           

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "editregcall", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                var objRegCalls = new RegCalls();
                if (ModelState.IsValid)
                {
                    var dtIssue = libCalls.getCallRowfromP_allcallsreg(Convert.ToInt32(P_allCallReg), SessionControl.UserServerDatabase);
                    objRegCalls = DCLib.GetModelFromDataRow<RegCalls>(dtIssue);

                    objRegCalls.Mobileno = objRegCalls.Mobileno.ToString().Trim();
                    objRegCalls.P_AllCallsReg = Convert.ToInt32(P_allCallReg);
                    if (string.IsNullOrEmpty(objRegCalls.UploadfileName.Trim()))
                        objRegCalls.UploadfileName = "None";
                    
                    if ((object)objRegCalls.Creationdate is DBNull == false)
                        objRegCalls.FrmtCreationdate = objRegCalls.Creationdate.ToString("dd-MM-yyyy hh:mm tt");
                }

                // 'Added by aslam
                string condition = "infotype='compositestring' and viewid='callform' and  rowstatus=0 ";
                var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                if (dr is not null)
                    objRegCalls.InfoString = df1.GetCellValue(dr, "infostring").ToString()??"";
                else
                    objRegCalls.InfoString = "";
               
                return View(objRegCalls);
            }
            return RedirectToAction("LogOut", "Home");
        }

        // Fill input dropdown(This is a General function)
        public JsonResult GetDataforDropdown(string tableName, string displayColumnName, string keyColumnName, string where, string? order = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (string.IsNullOrEmpty(order?.Trim()))
                order = keyColumnName;

            string sqlstr = string.Empty;
            if (tableName.ToLower() == "infotable")
            {
                sqlstr = "select * from infotableuser where " + where;
                var DtInfotableUser = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
                where = where + " and (updateflag<>'D' or updateflag is null)";
                if (DtInfotableUser.Rows.Count > 0)
                {
                    sqlstr = "select  " + displayColumnName + "," + keyColumnName + " from infotableuser where " + where + " order by " + order;
                }
                else
                {
                    sqlstr = "select  " + displayColumnName + "," + keyColumnName + " from " + tableName + " where " + where + " order by " + order;
                }
            }

            else
            {
                sqlstr = "select  " + displayColumnName + "," + keyColumnName + " from " + tableName + " where " + where + " order by " + order;
            }
            var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
            return Json(JsonConvert.SerializeObject(dt)); 
        }

        /// <summary>
        /// EditRegCalls post function
        /// </summary>
        /// <param name="mRegCalls"></param>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost()]
        [ValidateAntiForgeryToken()]
        public ActionResult EditRegCalls(RegCalls mRegCalls, IFormCollection fc)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "editregcall", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
               
                if (ModelState.IsValid)
                {
                    bool StatusClosed = false;
                    string settingsstring = df1.GetCellValue(libSaralAuth.getUserSettingsRowFromUserLogin_key(Convert.ToInt32(LoginRow["Userlogin_key"]), SessionControl.UserServerDatabase), "settingsstring", "string").ToString() ?? "";
                    string AllowCloseCallWithoutLinkingCustomer = "";
                    if (!string.IsNullOrEmpty(settingsstring))
                    {
                        AllowCloseCallWithoutLinkingCustomer = libSaralAuth.GetPropertyValfromSettingsString(settingsstring, "AllowCloseCallWithoutLinkingCustomer");
                    }

                    int status = 0;
                   // DataTable dtinfotableuser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
                    if (DtInfoTableuser.Rows.Count > 0)
                    {
                        var drWorkFlowStatus = DtInfoTableuser.Select("infotype=67").FirstOrDefault();
                        if (!(drWorkFlowStatus == null))
                        {
                            status = Convert.ToInt32(df1.GetCellValue(drWorkFlowStatus, "nameofinfo", "integer"));
                        }
                    }

                    if (mRegCalls.Status != 0 & mRegCalls.Status == status)
                    {
                        switch (AllowCloseCallWithoutLinkingCustomer ?? "")
                        {
                            case "Y":
                                {
                                    StatusClosed = true;
                                    break;
                                }
                            case "N":
                                {
                                    if (mRegCalls.P_Customers == -1 | mRegCalls.P_Customers == 0)
                                    {
                                        TempData["Message"] = "Call Is Not linked To customer, please link customer , then close the call.";
                                        ViewData["color"] = "Error";
                                        return View(mRegCalls);
                                    }
                                    else
                                    {
                                        StatusClosed = true;
                                    }

                                    break;
                                }

                            case "":
                                {
                                    if (mRegCalls.P_Customers == -1 | mRegCalls.P_Customers == 0)
                                    {
                                        TempData["Message"] = "Call Is Not linked To customer, please link customer , then close the call.";
                                        ViewData["color"] = "Error";
                                        return View(mRegCalls);
                                    }
                                    else
                                    {
                                        StatusClosed = true;
                                    }

                                    break;
                                }
                        }
                    }

                    DataRow? dtr = null;
                    var dthash = new Hashtable();

                    // 'Added by aslam for compositefield
                    string? InfoString = "";
                    string condition = "infotype='compositestring' and viewid='callform' and  rowstatus=0 ";
                    var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                    if (dr is not null)
                    {
                        InfoString = df1.GetCellValue(dr, "infostring").ToString();
                    }

                    if (!string.IsNullOrEmpty(InfoString))
                    {
                        string compositeFinalValue = "";
                        var ctrls = InfoString.Split('#');
                        var joinedctrls = new string[ctrls.Length + 1];
                        for (int i = 0, loopTo = ctrls.Length - 1; i <= loopTo; i++)
                        {
                            var ctrl = ctrls[i].Split('~');
                            string value = fc[ctrl[2]];
                            compositeFinalValue += string.IsNullOrEmpty(compositeFinalValue)? ctrl[1] + "~" + ctrl[2] + "~" + value : "#" + ctrl[1] + "~" + ctrl[2] + "~" + value;
                        }
                        mRegCalls.Compositefield = compositeFinalValue;
                    }

                    if (StatusClosed == true)
                    {
                        var ts = mRegCalls.Creationdate - mRegCalls.registerdate;
                        int duration = (int)Math.Round(ts.TotalSeconds);
                        mRegCalls.duration = duration;
                        mRegCalls.modifiedby = Convert.ToInt32(df1.GetCellValue(sessionRow, "linkcode", "integer"));
                    }

                    dtr = DCLib.GetDataRowFromModel<RegCalls>(mRegCalls);
                    dthash = GF1.CreateHashTable(dtr);
                    dthash = GF1.AddItemToHashTable(ref dthash, "IssueType", fc["IssueType"], true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "Businesstype", fc["Buss"], true);


                    int argid = mRegCalls.P_AllCallsReg;
                    libCalls.InsertUpdateAllCallsReg(ref argid, ref dthash, sessionRow, SessionControl.UserServerDatabase);
                    mRegCalls.P_AllCallsReg = argid;


                    if (StatusClosed == true)
                    {
                        DataRow dttasks = (DataRow)libCRMTasks.GetActiveTaskRowForAParticularCall(mRegCalls.P_AllCallsReg, SessionControl.UserServerDatabase);
                        libCRMTasks.TaskClose(Convert.ToInt32(dttasks["crmtasks_key"]), sessionRow, SessionControl.UserServerDatabase);

                        string email = mRegCalls.Emailid;
                       // string msg = "Dear " + mRegCalls.Contactperson + ", " + mRegCalls.Firmname + "  Your call registered at Saral";
                       // string Message = "Dear " + mRegCalls.Contactperson + ", " + mRegCalls.Firmname + "<br/><br/>Your call registered at Saral";
                        //if (!string.IsNullOrEmpty(mRegCalls.Issuedescription))
                        //{
                        //    Message += " regarding the issue \" " + mRegCalls.Issuedescription + " \"";
                        //    msg += " regarding the issue  \" " + mRegCalls.Issuedescription + " \"";
                        //}
                       // Message += @" has been marked completed and is closed from our end.<br/>In case you are not satisfied with the resolution, kindly mail at nehagupta@saralerp.com, hcgupta@saralerp.com<br/><br/><br/>Regards<br/>Saral Team<br/>Customer Care";
                        //msg += @" has been marked completed and is closed from our end. In case you are not satisfied with the resolution, kindly mail at nehagupta@saralerp.com, hcgupta@saralerp.com Thanks Saral Team";

                        string templateText = libSaralAuth.GetMsgTemplateTextByTemplateType(3182, SessionControl.UserServerDatabase);
                        Hashtable varHash = new Hashtable();
                        varHash = GF1.AddItemToHashTable(ref varHash, "callid", mRegCalls.P_AllCallsReg);
                        varHash = GF1.AddItemToHashTable(ref varHash, "issuedescription", mRegCalls.Issuedescription);
                        string msg = cfc1.evaluateVariable(templateText, varHash);

                        string MobNo = mRegCalls.Mobileno.ToString().Trim();
                        if (!string.IsNullOrEmpty(MobNo))
                        {
                            var dtmsg = cfc1.CreateMsgQueueDt("M", msg, "", MobNo, "", "N");
                            cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);

                        }
                        if (!string.IsNullOrEmpty(email.ToString().Trim()))
                        {
                            //Message = Message + Convert.ToChar(201) + "Notification: Call closed at Saral";
                            //var dtmsg = cfc1.CreateMsgQueueDt("E", Message, "", email, "", "N");
                            var dtmsg = cfc1.CreateMsgQueueDt("E", msg, "", email, "", "N");
                            cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);
                        }
                    }
                }
                else
                {
                    ModelState.AddModelError("0", "An error occured while storing your Information. Please try again later.");
                    return View(mRegCalls);
                }
                return RedirectToAction("ManageRegCalls");
            }
            return RedirectToAction("LogOut", "Home");
        }

        [HttpPost]
        public ActionResult AddRemarkView(IFormCollection fc, RegCalls ObjRegCalls)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return RedirectToAction("LogOut", "Home");
                
                var mRegCalls = new RegCalls();
                string strremark = fc["remark"];
                int issid = Convert.ToInt32(fc["issueId"]); 
                var dtissuefilegst = libCalls.getCallRowfromAllCallsReg_key(issid, "p_issuesfilegst");
                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode("C", Convert.ToInt32(dtissuefilegst["p_issuesfilegst"]), "p_crmtasks");
                var dtissuescomm1 = libCRMTasks.CreateCRMCommunicationDt(strremark, "T", Convert.ToInt32(taskRow["p_crmtasks"]), 2739);
                libCRMTasks.AddRowInCRMcommunication(dtissuescomm1, sessionRow, SessionControl.UserServerDatabase);

                string calledfrom = fc["calledfrom"];
                if (calledfrom == "ManageRegCalls")
                {
                    HttpContext.Session.Remove("page");
                    return RedirectToAction("ManageRegCalls");
                }
                else if (calledfrom == "EditRegCalls")
                {
                    HttpContext.Session.Remove("page");
                    //return RedirectToAction("EditRegCalls", new { ID = Session["clsissue"].PrevRow("Issuesfilegstkey") });
                }
                else
                {
                    HttpContext.Session.Remove("page");
                    return RedirectToAction("ManageYearEndFirmTransferCalls");
                }
                return RedirectToAction("LogOut", "Home");
            }

            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// function to addRemark to a call on ManageRegCalls view
        /// </summary>
        /// <returns></returns>
        public JsonResult AddCallRemark(int CallId, string remark)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addcallremark", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string strremark = remark;
                string filename1 = "";
                string RegfolderPath = "";

                if (Request.Form.Files.Count > 0)
                {
                    var File = Request.Form.Files[0]; // Uploaded file
                    // Use the following properties to get file's name, size and MIMEType
                    if (!string.IsNullOrEmpty(File.FileName))
                    {
                        DataRow userRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                        string userID = userRow["UserID"].ToString()??"";

                        // UploadFileToFTP("userID/documents", File.FileName, "saralerp.com", "gbftpuser", "gbftpuser@1234")
                        RegfolderPath = MyServer.MapPath(HttpContext.Session.GetString("corpid") + "/documents/").Replace(@"sites\gainbooks.com", "gainbooksdata");
                        if (!Directory.Exists(RegfolderPath))
                            Directory.CreateDirectory(RegfolderPath);
                        
                        if (File is not null)
                        {
                            string Filename = File.FileName;
                            filename1 = Path.GetFileNameWithoutExtension(File.FileName);
                            string filepathName = RegfolderPath + Filename;
                            filename1 = cfc1.CheckAndCreateFileName(Filename, RegfolderPath);
                            //File.SaveAs(RegfolderPath + filename1); //Aslam_File_Check_done
                            using (FileStream fs = new FileStream(RegfolderPath + filename1, FileMode.Create))
                            {
                                File.CopyTo(fs);
                            }

                        }
                        TempData["link"] ="~/GainBooksData/" + HttpContext.Session.GetString("corpid") + "/documents/" + filename1;
                    }
                }
                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode("C", CallId, SessionControl.UserServerDatabase, "p_crmtasks");
                var dtissuescomm1 = libCRMTasks.CreateCRMCommunicationDt(strremark, "T", Convert.ToInt32(taskRow["p_crmtasks"]), 2739);
                int p_crmcomm = libCRMTasks.AddRowInCRMcommunication(dtissuescomm1, sessionRow, SessionControl.UserServerDatabase);
                var crmDocumentsLink = libCRMTasks.CreateCRMDocumentLinkDt(p_crmcomm, "T", filename1, "/GainBooksData/" + HttpContext.Session.GetString("corpid") + "/documents/" + filename1, "");
                int p_crmdocumentsLink = Convert.ToInt32(libCRMTasks.ADDRowInCrmDocumentsLink(crmDocumentsLink, sessionRow, SessionControl.UserServerDatabase));

                return Json("");
            }
            return Json("");
        }

        /// <summary>
        /// function to get Active employee list 
        /// </summary>
        /// <returns></returns>
        public JsonResult GetActiveEmployeeofCS()
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var dt = libSaralAuth.GetActiveEmployeesFromAccMaster(SessionControl.UserServerDatabase, "P_acccode,AccName"); //libSaralAuth.GetActiveEmployeesEmplTypeWise(SessionControl.UserServerDatabase, "P_acccode,AccName");
            var datatableData = new DataTypeConversionLib.DTResult<Accmasterviewmodel>();
            datatableData = (DataTypeConversionLib.DTResult<Accmasterviewmodel>)DCLib.ConvertDTtoModal<Accmasterviewmodel>(dt);
            return Json(datatableData);
        }

        /// <summary>
        /// function to send PendingCalls report through crm
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult SendPendingCalls(IFormCollection fc)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "sendpendingcall", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string dt = fc["PendingCallsDate"];
                var dtc = new DateTime();

                if (string.IsNullOrEmpty(dt))
                    dtc = df1.GetDateTimeISTNow();
                else
                    dtc = Convert.ToDateTime(dt);

                var dt1 = libCRMTasks.sendPendingCallsDt(DtInfoTable ,DtInfoTableuser , dtc, SessionControl.UserServerDatabase);
                string emailbody = libCRMTasks.GetPendingCallsEmailFormat(dt1, dtc);
                var DtEmp = libSaralAuth.GetActiveEmployeesEmplTypeWise(SessionControl.UserServerDatabase, "Email");  //GetActiveEmployeesEmplTypeWise("Email");
                //string emailIds ="93nishayadav@gmail.com, hcgupta@saralerp.com";
                StringBuilder strBuilder = new StringBuilder();
                strBuilder.Append("nehagupta@saralerp.com,hcgupta@saralerp.com,reetika@saralerp.com");
                for (int i = 0, loopTo = DtEmp.Rows.Count - 1; i <= loopTo; i++) 
                { 
                    if (strBuilder.Length>0)
                    {
                        strBuilder.Append(",");
                    }
                    strBuilder.Append(df1.GetCellValue(DtEmp.Rows[i], "Email","string").ToString()?.Trim());
                    //emailIds += ", " + DtEmp.Rows[i]["Email"].ToString()?.Trim();
                }
                string emailIds = strBuilder.ToString();
                gflib.SendEmail(emailIds, "PendingCalls:" + dtc.ToString("dd-MM-yyyy hh:mm tt"), emailbody, @"C:\cntr_dir\googleapiconfig.txt");
                TempData["Message"] = "Emails has been sent to :" + emailIds;
                return RedirectToAction("SendCallsReport", new { ViewBag.Message });
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// function to send pending calls excel through windows service
        /// </summary>
        /// <returns></returns>
        public ActionResult? SendPendingCallsExcel()
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var dtct = df1.GetDateTimeISTNow();
            string EmailidText = MyServer.MapPath("App_Data/EmailList.Txt");
            string functionname = "SendPendingCalls";
            string type = "production".ToLower();
            var argSessionInstance = SessionControl;
            var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
            SessionControl = argSessionInstance;
            var dtinfotable = df1.SqlExecuteDataTable(clsinfotable.ServerDatabase, "select * from infotable where infotype=38");
            string FullFilename = SessionControl.DataFolderServerPhysicalPath + @"\Employees\PendingCalls_" + dtct.ToString("dd-MM-yyyy_hh_mm_tt") + ".xlsx";
            var DtEmp = GetActiveEmployeesEmplTypeWise("Email");
            string emailIds = "93nishayadav@gmail.com";
            for (int i = 0, loopTo = DtEmp.Rows.Count - 1; i <= loopTo; i++)
                emailIds += "," + DtEmp.Rows[i]["Email"].ToString()?.Trim();
            
            gflib.SendEmail(emailIds, "PendingCalls:" + dtct.ToString("dd-MM-yyyy hh:mm tt"), "", @"C:\cntr_dir\googleapiconfig.txt", FullFilePath: FullFilename);
            return null;
        }

        /// <summary>
        /// function to send pending calls email through windows service
        /// </summary>
        /// <returns></returns>
        public ActionResult? SendPendingCalls1()
        {
            //SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            SetSessionControlUsingCoprid("Neha8591");
            DateTime dtct = df1.GetDateTimeISTNow();
            //string EmailidText = MyServer.MapPath("App_Data/EmailList.Txt");
            //CustomerControl.Variables argSessionInstance = SessionControl;
            //var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
            //SessionControl = argSessionInstance;
            //var dtinfotable = df1.SqlExecuteDataTable(clsinfotable.ServerDatabase, "select * from infotable where infotype=38");
            //DataTable dtinfotableuser = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotableuser", "infotype=38 and rowstatus=0 and (updateflag <>'D' or updateflag is null)", "p_infotable,nameofinfo");
            //DataTable dtinfotable = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotableuser", "infotype=38 and rowstatus=0 and (updateflag <>'D' or updateflag is null)", "p_infotable,nameofinfo");
            //var dtinfotable = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "select * from infotable where infotype=38");
            //var dt = libCRMTasks.sendPendingCallsDt(dtinfotable, dtinfotableuser, dtct, SessionControl.UserServerDatabase);
            var DtEmp = libSaralAuth.GetEmpsForSendCallsReport("sendpendingcall", SessionControl.UserServerDatabase, "Email");
            var dt = libCRMTasks.sendPendingCallsDt(DtInfoTable, DtInfoTableuser, dtct, SessionControl.UserServerDatabase);
            string emailbody = libCRMTasks.GetPendingCallsEmailFormat(dt, dtct);
            //var DtEmp =libSaralAuth.GetActiveEmployeesEmplTypeWise(SessionControl.UserServerDatabase,"Email");
            //var DtEmp = libSaralAuth.GetEmpsForSendCallsReport("sendpendingcall",SessionControl.UserServerDatabase,"Email");
            string emailIds = "nehagupta@saralerp.com,hcgupta@saralerp.com,reetika@saralerp.com";
            if (DtEmp is not null)
            {
                for (int i = 0, loopTo = DtEmp.Rows.Count - 1; i <= loopTo; i++)
                    emailIds += "," + DtEmp.Rows[i]["Email"].ToString()?.Trim();
            }

            gflib.SendEmail(emailIds, "PendingCalls:" + dtct.ToString("dd-MM-yyyy hh:mm tt"), emailbody, @"C:\cntr_dir\googleapiconfig.txt");

            return null;
        }

        /// <summary>
        /// Post function to send Completed calls report from CRM
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult? SendCompCalls(IFormCollection fc)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "sendcompcall", HttpContext.Session.GetString("serverdatabase")))
            {
                var DtEmp = GetActiveEmployeesEmplTypeWise("Email");
                string emailIds = "93nishayadav@gmail.com,hcgupta@saralerp.com";
                for (int i = 0; i <= DtEmp.Rows.Count - 1; i++)
                    emailIds += "," + DtEmp.Rows[i]["Email"].ToString()?.Trim();

                DateTime creationdate;
                if (!string.IsNullOrEmpty(fc["CompCallsDate"]))
                {
                    creationdate = Convert.ToDateTime(fc["CompCallsDate"]);
                }
                else
                {
                    creationdate = df1.GetDateTimeISTNow();
                }
                string subject1 = "Completed Calls: " + creationdate.ToString("dd-MM-yyyy");
                DataTable dtinfotable = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotable", "rowstatus=0 and  infotype=38 and (updateflag<>'D' or updateflag is null)");
                DataTable dtinfotableuser = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotableuser", "rowstatus=0 and infotype=38 and (updateflag<>'D' or updateflag is null)");
                //DataTable dt = (DataTable)libCalls.sendCompletedCallsdt(DtInfoTable, creationdate, SessionControl.UserServerDatabase);
                DataTable dt = (DataTable)libCalls.sendCompletedCallsdt(dtinfotable, dtinfotableuser, creationdate, SessionControl.UserServerDatabase);
                string emailbody = libCalls.GetCompletedCallsEmailFormat(dt, creationdate);
                gflib.SendEmail(emailIds, "CompletedCalls:" + creationdate.ToString("dd-MM-yyyy hh:mm tt"), emailbody, @"C:\cntr_dir\googleapiconfig.txt");
                TempData["Message"] = "Email has been sent to :" + emailIds;
                return RedirectToAction("SendCallsReport", new { ViewBag.Message });
            }
            return null;

        }

        /// <summary>
        /// function to send email of completed calls through service
        /// </summary>
        /// <param name="Calldate"></param>
        /// <returns></returns>
        public ActionResult? SendCompCalls1(DateTime Calldate = default)
        {
            SetSessionControlUsingCoprid("Neha8591");
            //SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            //DataRow? sessionrow = null;
            //string EmailidText = MyServer.MapPath("App_Data/EmailList.Txt");
            //string functionname = "SendCompCalls";
            //string type = "Production".ToLower();

            //var DtEmp =libSaralAuth.GetActiveEmployeesEmplTypeWise(SessionControl.UserServerDatabase,"Email");
            var DtEmp = libSaralAuth.GetEmpsForSendCallsReport("sendcompcall", SessionControl.UserServerDatabase, "Email");
            string emailIds = "nehagupta@saralerp.com,hcgupta@saralerp.com,reetika@saralerp.com,";
            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0, loopTo = DtEmp.Rows.Count - 1; i <= loopTo; i++)
            {
                if (strBuilder.Length>0)
                {
                    strBuilder.Append(",");
                }
                strBuilder.Append(df1.GetCellValue(DtEmp.Rows[i], "Email","string").ToString()?.Trim());
                //emailIds += "," + DtEmp.Rows[i]["Email"].ToString()?.Trim();
            }
            emailIds += strBuilder.ToString();
            DateTime cd = df1.GetDateTimeISTNow();
            Calldate = new DateTime(cd.Year, cd.Month, cd.Day, 0, 0, 0);
            //var argSessionInstance = SessionControl;
            //var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
            //SessionControl = argSessionInstance;
            //var dtinfotable = df1.SqlExecuteDataTable(clsinfotable.ServerDatabase, "select * from infotable where infotype=38");
            //DataTable dtinfotable = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotable", "rowstatus=0 and  infotype=38 and (updateflag<>'D' or updateflag is null)");
            //DataTable dtinfotableuser = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotableuser", "rowstatus=0 and infotype=38 and (updateflag<>'D' or updateflag is null)");

            string subject1 = "Completed Calls: " + Calldate.ToString("dd-MM-yyyy");
            //DataTable dt = (DataTable)libCalls.sendCompletedCallsdt(dtinfotable,dtinfotableuser, Calldate, SessionControl.UserServerDatabase);
            DataTable dt = (DataTable)libCalls.sendCompletedCallsdt(DtInfoTable, DtInfoTableuser, Calldate, SessionControl.UserServerDatabase);
            string emailbody = libCalls.GetCompletedCallsEmailFormat(dt, Calldate);
            gflib.SendEmail(emailIds, "CompletedCalls:" + Calldate.ToString("dd-MM-yyyy hh:mm tt"), emailbody, @"C:\cntr_dir\googleapiconfig.txt"); // 
            return null;
        }

        /// <summary>
        /// function to send Completed calls excel from service
        /// </summary>
        /// <param name="Calldate"></param>
        /// <returns></returns>
        public ActionResult? SendCompCallExcel(DateTime Calldate = default)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow? sessionrow = null;
            string EmailidText = MyServer.MapPath("App_Data/EmailList.Txt");
            string functionname = "SendCompCalls";
            var DtEmp = GetActiveEmployeesEmplTypeWise("Email");
            string emailIds = "93nishayadav@gmail.com";
            for (int i = 0, loopTo = DtEmp.Rows.Count - 1; i <= loopTo; i++)
                emailIds += "," + DtEmp.Rows[i]["Email"].ToString()?.Trim();

            SendPendingCalls1();
            Calldate = new DateTime(df1.GetDateTimeISTNow().Year, df1.GetDateTimeISTNow().Month, df1.GetDateTimeISTNow().Day, 0, 0, 0);
            var argSessionInstance = SessionControl;
            var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
            SessionControl = argSessionInstance;
            //var dtinfotable = df1.SqlExecuteDataTable(clsinfotable.ServerDatabase, "select * from infotable where infotype=38");
            DataTable dtinfotable = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotable", "rowstatus=0 and  infotype=38 and (updateflag<>'D' or updateflag is null)");
            DataTable dtinfotableuser = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotableuser", "rowstatus=0 and infotype=38 and (updateflag<>'D' or updateflag is null)");


            string subject1 = "Completed Calls: " + Calldate.ToString("dd-MM-yyyy");
            DataTable dt = (DataTable)libCalls.sendCompletedCallsdt(dtinfotable,dtinfotableuser, Calldate, SessionControl.UserServerDatabase);
            string FullFilename = SessionControl.DataFolderServerPhysicalPath + @"\Employees\CompCalls_" + Calldate.ToString("dd-MM-yyyy_hh_mm_tt") + ".xlsx";
            string Excelfilename = cfc1.ExportDataToExcel(dt, FullFilename);
            gflib.SendEmail(emailIds, "CompletedCalls:" + Calldate.ToString("dd-MM-yyyy hh:mm tt"), "", @"C:\cntr_dir\googleapiconfig.txt", FullFilePath: Excelfilename);
            return null;
        }

        /// <summary>
        /// Returns Accmasterdt containing all the active employees according to emplType
        /// </summary>
        /// <param name="EmplType">Columns to be returned in accmaster datarow</param>
        /// <returns></returns>
        public DataTable GetActiveEmployeesEmplTypeWise(string columnString = "*", string EmplType = "C")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var argSessionInstance = SessionControl;
            var clsUserLogin = new UserLogin.UserLogin.UserLogin(ref argSessionInstance);
            SessionControl = argSessionInstance;
            string selecStr = "select " + columnString + " from Employees where rowstatus = 0 and status=2696 and EmplType='" + EmplType + "'";
            var DtEmp = df1.SqlExecuteDataTable(clsUserLogin.ServerDatabase, selecStr);
            if (DtEmp.Rows.Count > 0)
            {
                return DtEmp;
            }
            return null;
        }

        public ActionResult SendCallsReport(string Message = "")
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "sendcallreport", HttpContext.Session.GetString("serverdatabase")))
            {
                ViewBag.Message = Message;
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Get of RegisterCalls
        /// </summary>
        /// <returns></returns>
        [HttpGet()]
        public ActionResult RegisterCalls()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return RedirectToAction("LogOut", "Home");
               
                var objRegCalls = new RegCalls();
                // 'Added by aslam
                string condition = "infotype='compositestring' and viewid='callform' and  rowstatus=0 ";
                var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                if (dr is not null)
                    objRegCalls.InfoString = df1.GetCellValue(dr, "infostring").ToString() ?? "";
                else
                    objRegCalls.InfoString = "";

                return View(objRegCalls);
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Post function to RegisterCall
        /// </summary>
        /// <param name="mRegCalls">Model</param>
        /// <param name="fc"></param>
        /// <param name="pic">file uploaded</param>
        /// <returns></returns>
        [HttpPost()]
        [ValidateAntiForgeryToken()]
        public async Task<ActionResult> RegisterCalls(RegCalls mRegCalls, IFormCollection fc, IFormFile pic)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return RedirectToAction("LogOut", "Home");

            
            if (ModelState.IsValid)
            {
                DataRow? dtr = null;
                dtr = DCLib.GetDataRowFromModel<RegCalls>(mRegCalls);
                var dthash = new Hashtable();
                dthash = GF1.CreateHashTable(dtr);

                int fcIssueType =Convert.ToInt32(fc["IssueType"]);
                int fcBuss = Convert.ToInt32(fc["Buss"]);

                if (fcBuss == 0)
                    fcBuss =-2;

                if (fcIssueType==0)
                    fcIssueType = -2;

                // Added by aslam for workflow status
                int status = 0;
                // DataTable dtInfotableUser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));

             //   DtInfoTableuser = libSaralAuth.getInfotableuserForInfotype(66, SessionControl.UserServerDatabase);

                if (DtInfoTableuser .Rows.Count > 0)
                {
                    var drCallReg = DtInfoTableuser.Select("infotype=66").FirstOrDefault();
                    if (!(drCallReg == null))
                    {
                        status =Convert.ToInt32(df1.GetCellValue(drCallReg, "nameofinfo").ToString()?.Trim());
                    }
                }

                dthash = GF1.AddItemToHashTable(ref dthash, "source", "Employee Registered", true);
                dthash = GF1.AddItemToHashTable(ref dthash, "IssueType", fcIssueType, true);
                dthash = GF1.AddItemToHashTable(ref dthash, "Businesstype", fcBuss, true);
                dthash = GF1.AddItemToHashTable(ref dthash, "status", status, true);
                dthash = GF1.AddItemToHashTable(ref dthash, "RegisterDate", df1.GetDateTimeISTNow(), true);
                dthash = GF1.AddItemToHashTable(ref dthash, "lastcalltime", df1.GetDateTimeISTNow(), true);

                dthash = GF1.AddItemToHashTable(ref dthash, "registeredby", "E", true);
                string RegfolderPath = "";
                //RegfolderPath = MyServer.MapPath("RegisterCallsFiles/").Replace("CRM", "WebApp");
                RegfolderPath = MyServer.MapPath(HttpContext.Session.GetString("corpid") + "/documents/").Replace(@"sites\gainbooks.com", "gainbooksdata");

                string Filename = "";
                if (pic is not null)
                {
                    Filename = cfc1.CheckAndCreateFileName(pic.FileName, RegfolderPath);
                    //pic.SaveAs(RegfolderPath + Filename);  //Aslam_File_Check_done
                    using (FileStream fs = new FileStream(RegfolderPath + Filename, FileMode.Create))
                    {
                        pic.CopyTo(fs);
                    }
                }
                dthash = GF1.AddItemToHashTable(ref dthash, "UploadfileName", Filename, true);

                // 'Added by aslam for compositefield
                string InfoString = "";
                string condition = "infotype='compositestring' and viewid='callform' and  rowstatus=0 ";  
                var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition,SessionControl.UserServerDatabase);
                if (dr is not null)
                {
                    InfoString = df1.GetCellValue(dr, "infostring").ToString() ?? "";
                }

                if (!string.IsNullOrEmpty(InfoString))
                {
                    string compositeFinalValue = "";
                    var ctrls = InfoString.Split('#');
                    var joinedctrls = new string[ctrls.Length + 1];
                    var compositeBuilder = new StringBuilder();
                    for (int i = 0, loopTo = ctrls.Length - 1; i <= loopTo; i++)
                    {
                        var ctrl = ctrls[i].Split('~');
                        string value = fc[ctrl[2]];
                        //compositeFinalValue += string.IsNullOrEmpty(compositeFinalValue)? ctrl[1] + "~" + ctrl[2] + "~" + value: "#" + ctrl[1] + "~" + ctrl[2] + "~" + value;
                        if (compositeBuilder.Length > 0)
                        {
                            compositeBuilder.Append("#");
                        }
                        compositeBuilder.Append(ctrl[1] + "~" + ctrl[2] + "~" + value);
                    }
                    compositeFinalValue = compositeBuilder.ToString();
                    mRegCalls.Compositefield = compositeFinalValue;
                    dthash = GF1.AddItemToHashTable(ref dthash, "Compositefield", compositeFinalValue, true);
                }

                int argid = mRegCalls.AllCallsReg_key;
                int p_issuesfileGst =  libCalls.InsertUpdateAllCallsReg(ref argid, ref dthash, sessionRow,SessionControl.UserServerDatabase);
                mRegCalls.AllCallsReg_key = argid;

                var dtHashCRM = new Hashtable();
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "CRMTasks_Key", -1);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "P_CRMTasks", -1);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "TaskTitle", mRegCalls.Firmname?.ToString().Trim());
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "Tasktype", "S");
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "TaskDescription", mRegCalls.Issuedescription);

                int TaskInitialStatus = Convert.ToInt32(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(76, SessionControl.UserServerDatabase));
                //dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "Taskstatus", 3008);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "Taskstatus", TaskInitialStatus);

                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "linktype", "C");
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "linkcode", p_issuesfileGst);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "startdate", df1.GetDateTimeISTNow());
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "under", 0);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "assignedto", sessionRow["Linkcode"]);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "assignedtotype", sessionRow["Linktype"]);
                int argid1 = -1;
                int p_crmTasks = libCRMTasks.InsertUpdateCRMTasks(ref argid1, ref dtHashCRM,SessionControl.UserServerDatabase, sessionRow, cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? ""));

                // 'Insert multiple tags
                string tags = fc["multiTags"];
                if (p_issuesfileGst > 0  && !string.IsNullOrEmpty(tags?.Trim()))
                {
                    var hashTableList = new List<Hashtable>();
                    var tagskeyArr = tags.Split(',');
                    for (int p = 0; p <= tagskeyArr.Length - 1; p++)
                    {
                        var Taghash = new Hashtable();
                        Taghash = GF1.AddItemToHashTable(ref Taghash, "linktype", "C");
                        Taghash = GF1.AddItemToHashTable(ref Taghash, "tagkey", tagskeyArr[p]);
                        Taghash = GF1.AddItemToHashTable(ref Taghash, "linkcode", p_issuesfileGst);
                        Taghash = GF1.AddItemToHashTable(ref Taghash, "p_tags", -1);
                        hashTableList.Add(Taghash);
                    }

                    libSaralAuth.InsertUpdateMultipleTags("-1", ref hashTableList, sessionRow, SessionControl.UserServerDatabase);
                }

                string timestamp = df1.GetDateTimeISTNow().ToString("dd-MM-yyyy HH:mm tt");
                int noOfPendingCall = libCalls.GetPendingCallsCount(SessionControl.UserServerDatabase);
                //string message = "Dear Sir/Mam. Your Call has been registered successfully at " + timestamp + ". Call Id: " + p_issuesfileGst + ". You are in queue at number " + noOfPendingCall + ". We will get back to you soon.Thank you -Team Saral";
                //string msg = "Dear Sir/Mam. Your Call has been registered successfully at " + timestamp + ". <br/> CallId: " + p_issuesfileGst + ". You are in queue at number " + noOfPendingCall + "<br/> We will get back to you soon.<br/>Thank you Team Saral.";

                string templateText = libSaralAuth.GetMsgTemplateTextByTemplateType(3180, SessionControl.UserServerDatabase);
                Hashtable varHash = new Hashtable();
                varHash = GF1.AddItemToHashTable(ref varHash, "callid", p_issuesfileGst);
                varHash = GF1.AddItemToHashTable(ref varHash, "timestamp", timestamp);
                varHash = GF1.AddItemToHashTable(ref varHash, "noOfPendingCall", noOfPendingCall);
                string message = cfc1.evaluateVariable(templateText, varHash);

                string email = fc["EmailId"];
                ////cfc1.SendMsg(mRegCalls.Mobileno, message);
                //cfc1.SendMsg_old(mRegCalls.Mobileno, message);

                CancellationTokenSource cts = new CancellationTokenSource();
                cts.CancelAfter(30000);  //Cancel Task after 30 seconds
                try
                {
                    await cfc1.SendMsg_oldAsync(mRegCalls.Mobileno, message, cts.Token);
                }
                catch (OperationCanceledException ex)
                {
                }
                finally 
                {
                    cts.Dispose();
                }


                string Title = "Call Registered";
                string Groupkeyname = "RegCalls_SaralAppDemo2";
                var EmpIdsList = new List<int>();
                message = "";
                string Firm = fc["Firmname"];
                string IssueD = fc["IssueDescription"];
                int NotIssueint = Convert.ToInt32(fc["Issuetype"]);
                mRegCalls = null;
                //return RedirectToAction("Success");
                string isRedirect = fc["isRedirect"];

                if (isRedirect.ToUpper().Trim() == "Y")
                {
                    return RedirectToAction("ManageRegCalls");
                }
                else
                {
                    TempData["msg"] = "Your Service Request has been registered successfully.";
                    return RedirectToAction("RegisterCalls");
                }
               
            }
            else
            {
                return RedirectToAction("RegisterCalls");
            }
            
        }

        /// <summary>
        /// Function to add Collaborator to a Call
        /// </summary>
        /// <param name="PCall">P_issuesfilegst </param>
        /// <param name="collaboratorId">P_acccode of emp selected</param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AddCallCollaborators(int PCall, int collaboratorId, string calltype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addcallcollaborator", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (ModelState.IsValid)
                {
                    var CRMTasks = libCRMTasks.GetTasksRowFromLinkTypeLinkCode(calltype.ToString().Trim(), PCall, SessionControl.UserServerDatabase, "p_crmtasks");
                    int P_CRMTasks = Convert.ToInt32(CRMTasks["P_CRMTasks"]);
                    bool isCollab = libCRMTasks.IsCollaborator(calltype.ToString().Trim(), P_CRMTasks, collaboratorId.ToString(), SessionControl.UserServerDatabase);
                    if (isCollab)
                        return Json("Already Collborate");
                    
                    var dtcallcollaborator = libCRMTasks.CreateCollaboratersDt(calltype.ToString().Trim(), P_CRMTasks.ToString(), collaboratorId, "E");
                    libCRMTasks.AddCollaboratorToATask(dtcallcollaborator, sessionRow, SessionControl.UserServerDatabase);
                }
                return Json("success");
            }
            return Json("");
        }

        public ActionResult Success()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ManageRegCallsMV2()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services", HttpContext.Session.GetString("serverdatabase")))
            {
                ViewBag.Message = "By Date~2~date|By Firm Name~3~string|By ServicingDealer~4~integer|By Location~5~string|By Issue~6~string|By AssignTo~7~integer|By CallId~8~integer|By Mobile No~9~string";
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        [HttpGet]
        public ActionResult EmployeeCallsSummary()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "EmployeeCallSummary", HttpContext.Session.GetString("serverdatabase")))
                return View();

            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// function to download call summary of employees
        /// </summary>
        /// <returns></returns>
        [HttpPost()]
        public ActionResult EmployeeCallsSummary(IFormCollection fc)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DateTime creationdateMin = Convert.ToDateTime(fc["FromDate"]);
            DateTime creationdateMax = Convert.ToDateTime(fc["ToDate"]);

            var dt = new DataTable();
            int loginCode = Convert.ToInt32(fc["LoginCode"]);
            int Days = (int)DateAndTime.DateDiff(DateInterval.Day, creationdateMin, creationdateMax);  //Aslam_days_check
            dt = df1.AddColumnsInDataTable(ref dt, "S.No,Report");
            string topic = "NumberofCallsworkedon,Calls worked on but not closed,NumberofCallsCompleted,Pendingcalls due for more than 3 working days,Total number of pending calls at the end of the day,No of calls assigned to employee on that day,Total no of remark of that day of an employee,\",Average time worked by call engage status,Average Time taken to complete a call in the month,Number of Calls Pending for more than 3 working days in the month";
            var topicArr = topic.Split(',');
            for (int m = 0; m <= topicArr.Length - 1; m++)
            {
                var nRow = dt.NewRow();
                nRow["S.No"] = m + 1;
                nRow["Report"] = topicArr[m];
                dt.Rows.Add(nRow);
            }

            int PendingCallsDueMoreThan3Days = 0;
            for (int i = 0; i <= Days; i++)
            {
                var startDate = creationdateMin.AddDays(i);
                var endDate = creationdateMin.AddDays(i);
                dt = df1.AddColumnsInDataTable(ref dt, startDate.ToString("dd-MM-yyyy"));
                dt.Rows[0][i + 2] = libCalls.NumberOfCallsedWorkedOnWithCloseCalls(loginCode, startDate, endDate, SessionControl.UserServerDatabase);
                dt.Rows[2][i + 2] = libCalls.getNoOfClosedCallsExcludingUnlinkCustomers(startDate, endDate, SessionControl.UserServerDatabase, loginCode);
                dt.Rows[3][i + 2] = libCalls.pendingCallsDueFormorethanDays(loginCode, endDate, SessionControl.UserServerDatabase, 3);
                PendingCallsDueMoreThan3Days = PendingCallsDueMoreThan3Days + libCalls.pendingCallsDueFormorethanDays(loginCode, endDate, SessionControl.UserServerDatabase, 3);
                dt.Rows[5][i + 2] = libCalls.TotalNoOfCallsAssignToanEmployee(loginCode, startDate, endDate, SessionControl.UserServerDatabase);                
            }
            dt.Rows[8][2] = libCalls.Averagetimeworkedbycallengagestatus(loginCode, creationdateMin, creationdateMax, SessionControl.UserServerDatabase);
            dt.Rows[9][2] = libCalls.AverageTimetakenToCompleteCall(loginCode, creationdateMin, creationdateMax, SessionControl.UserServerDatabase);
            dt.Rows[10][2] = PendingCallsDueMoreThan3Days;

            var accRow = libSaralAuth.getAccMasterRowForp_acccode(loginCode, SessionControl.UserServerDatabase, "AccName");
            using (var wb = new XLWorkbook())
            {
                wb.Worksheets.Add(dt, "sheet1");
                using (var Stream1 = new MemoryStream())
                {
                    wb.SaveAs(Stream1);
                    return File(Stream1.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "CallSummary_" + df1.GetCellValue(accRow, "AccName").ToString()?.Trim() + ".xlsx");
                }
            }

            return null;
        }

        [HttpGet]
        public ActionResult ManageRegCalls1()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"),"ManageCalls", HttpContext.Session.GetString("serverdatabase")))
            {
                ViewBag.Message = "By Date~2~date|By Firm Name~3~string|By Name~4~string|By Location~6~string|By Issue~7~string|ByStatus~9~string";
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }


        //Manage RegCalls Related Functions
        [HttpGet]
        public ActionResult ManageRegCalls()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"),HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services",HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? LoginRow = null;
                if (HttpContext.Session.GetString("userloginrow") is not null)
                {
                    LoginRow =cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                }
                // Changed by aslam
                ViewBag.Message = "Date~2~date|Firm Name~3~string|Location~5~string|Issue~6~string|AssignTo~7~integer|CallId~8~integer|Mobile No~9~string|DateTime~10~datetime|Source~11~integer|Tags~12~integer".ToString();
                string searchcondition = "infotype='searchstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=" + LoginRow?["Userlogin_key"];
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string? Infostring = df1.GetCellValue(searchdr, "infostring", "string").ToString();
                var infoStringArr = Infostring?.Split('@');
                ViewBag.filterString = infoStringArr?[0];
                string sortcondition = "infotype='sortstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=" + LoginRow?["Userlogin_key"];
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr == null)
                {
                    sortcondition = "infotype='sortstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }
                
                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");

                // 'Added by aslam for hover strip
                string hoverStripcondition = "infotype='hoverstripstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key="+ LoginRow?["Userlogin_key"];
                var hoverStripdr = libSaralAuth.GetViewSettingsRowforLcondition(hoverStripcondition, SessionControl.UserServerDatabase);
                if (hoverStripdr == null)
                {
                    hoverStripcondition = "infotype='hoverstripstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=0";
                    hoverStripdr = libSaralAuth.GetViewSettingsRowforLcondition(hoverStripcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.hoverStripString = df1.GetCellValue(hoverStripdr, "infostring", "string");

                ViewBag.showAllCalls = "N";
                if (libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "showallcalls", HttpContext.Session.GetString("serverdatabase")))
                {
                    ViewBag.showAllCalls = "Y";
                }

                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }


        [HttpGet]
        public ActionResult ManageAllRegCalls()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManageAllCalls", HttpContext.Session.GetString("serverdatabase")))
            {
                //ViewBag.Message = "By Date~2~date|By Firm Name~3~string|By ServicingDealer~4~integer|By Location~5~string|By Issue~6~string|By AssignTo~7~integer";
                //return View();
                DataRow? LoginRow = null;
                if (HttpContext.Session.GetString("userloginrow") is not null)
                {
                    LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                }
                string searchcondition = "infotype='searchstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=" + LoginRow?["Userlogin_key"];
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string? Infostring = df1.GetCellValue(searchdr, "infostring", "string").ToString();
                var infoStringArr = Infostring?.Split('@');
                ViewBag.filterString = infoStringArr?[0];
                string sortcondition = "infotype='sortstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=" + LoginRow?["Userlogin_key"];
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr == null)
                {
                    sortcondition = "infotype='sortstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }

                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");

                string hoverStripcondition = "infotype='hoverstripstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=" + LoginRow?["Userlogin_key"];
                var hoverStripdr = libSaralAuth.GetViewSettingsRowforLcondition(hoverStripcondition, SessionControl.UserServerDatabase);
                if (hoverStripdr == null)
                {
                    hoverStripcondition = "infotype='hoverstripstring' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=0";
                    hoverStripdr = libSaralAuth.GetViewSettingsRowforLcondition(hoverStripcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.hoverStripString = df1.GetCellValue(hoverStripdr, "infostring", "string");

                bool allowToSendFeedbackURL= libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "allowtosendfeedbackurl", SessionControl.UserServerDatabase);
                ViewBag.AllowToSendFeedbackURL = allowToSendFeedbackURL;

                ViewBag.showAllCalls = "N";
                if (libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "showallcalls", HttpContext.Session.GetString("serverdatabase")))
                {
                    ViewBag.showAllCalls = "Y";
                }


                return View();

            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// prepare Customer grid according to firmname with combined address 
        /// </summary>
        /// <param name="firmname">string with more than 3 character of firmname</param>
        /// <returns></returns>
        public JsonResult FindCustomersCombinedAddress(string firmname)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");

            
            string lcondition = "CustName like '" + firmname.ToLower() + "%' ";
            string colStr = "P_Customers, Contactperson,CustCode,Email,CustName,MobNo,MainBussCode,OnsiteFlag,HomeTown,PostalAddress1,PostalAddress2,PostalAddress3,PostalAddress4,billedupto";

            //var dt = libcustomerfeature.getcustomersDataTableCombinedAddress(lcondition, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase, colStr);

            var dt = libcustomerfeature.getcustomersDataTableCombinedAddress(lcondition, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase, colStr);
            if (dt.Rows.Count > 0)
            {
                DataTypeConversionLib.DTResult<CustomerMaster> datatabledata;
                datatabledata = (DataTypeConversionLib.DTResult<CustomerMaster>)DCLib.ConvertDTtoModal<CustomerMaster>(dt);
                var jsonResult = Json(datatabledata);
                return jsonResult;
            }
            else
            {
                return Json("error");
            }
        }


        /// <summary>
        /// get customer row according to custcode
        /// </summary>
        /// <param name="CustCode"></param>
        /// <returns></returns>
        public JsonResult FindCustomersbyCustCode(string CustCode)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");

            
            DataTable dt;
            //string lcondition = "CustCode='" + CustCode + "'";
            string lcondition = "CustCode like '" + CustCode.ToLower() + "%'";
            //dt = libcustomerfeature.getcustomersDatatable(lcondition, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
            string colStr = "P_Customers, Contactperson,CustCode,Email,CustName,MobNo,MainBussCode,OnsiteFlag,HomeTown,PostalAddress1,PostalAddress2,PostalAddress3,PostalAddress4,billedupto";
            dt = libcustomerfeature.getcustomersDataTableCombinedAddress(lcondition, DtInfoTable ,DtInfoTableuser , SessionControl.UserServerDatabase, colStr);
            if (dt.Rows.Count > 0)
            {
                DataTypeConversionLib.DTResult<CustomerMaster> datatabledata;
                datatabledata = (DataTypeConversionLib.DTResult<CustomerMaster>)DCLib.ConvertDTtoModal<CustomerMaster>(dt);
                var jsonResult = Json(datatabledata);
                return jsonResult;
            }
            return Json("error");

        }

        /// <summary>
        /// action for deffertask functionality on ManagePendingTask view
        /// </summary>
        /// <param name="Callid">p_issuesfilegst</param>
        /// <param name="NextActionDate"></param>
        /// <returns></returns>
        public JsonResult DefferCalls(int Callid, string NextActionDate, string calltype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "deffercall", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode(calltype.ToString().Trim(), Callid, SessionControl.UserServerDatabase, "p_crmtasks");
                bool success = libCalls.DefferTask(Convert.ToInt32(df1.GetCellValue(taskRow, "crmtasks_key")), NextActionDate, sessionRow, SessionControl.UserServerDatabase);
                return Json("true");
            }
            return Json("");
        }

        /// <summary>
        /// Used in getting pending calls list in crm in manage regcalls
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <param name="ServerOrderValue"></param>
        /// <returns></returns>
        public JsonResult AjaxGetJsonDataSortManageRegCalls(string id, int? start, int pSize = 20, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
          
            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");

            int Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

            DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            string SortCondition = "P_CRMTasks asc,Creationdate desc";
            if (!string.IsNullOrEmpty(id))
                SortCondition = cfc1.GetSortStringFromFrontEndForManageRegCalls(id, SortCondition);
            
            string condition = string.Empty;
            if (!string.IsNullOrEmpty(search))
                condition =cfc1.GetSearchString(search); 

            if (string.IsNullOrEmpty(search))
            {
                string searchValueStr = "infotype='searchvalue' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]);
                var searchValuedr = libSaralAuth.GetViewSettingsRowforLcondition(searchValueStr, SessionControl.UserServerDatabase);
                if (searchValuedr is null)
                {
                    searchValueStr = "infotype='searchvalue' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=0";
                    searchValuedr = libSaralAuth.GetViewSettingsRowforLcondition(searchValueStr, SessionControl.UserServerDatabase);
                }
                if (!(searchValuedr is null))
                {
                    if (!string.IsNullOrEmpty(df1.GetCellValue(searchValuedr, "infostring", "string").ToString()?.Trim()) && df1.GetCellValue(searchValuedr, "infostring", "string") is DBNull == false)
                    {
                        string searchValue = df1.GetCellValue(searchValuedr, "infostring", "string").ToString()?.Trim() ?? "";
                        Hashtable dtVariablHash = GF1.CreateHashTable(cfc1.CSVToDataRow(HttpContext.Session.GetString("variablevalues")));
                        string searchCondition = cfc1.evaluateVariable(searchValue, dtVariablHash);
                        //string searchCondition = cfc1.evaluateVariable(searchValue, (Hashtable)Session["variablevalues"]);
                        condition = condition + cfc1.GetSearchString(searchCondition);  //Aslam_variablevalues_check

                    }
                }
            }

            // Commented for myoperator Temporarily -Neha , Aslam
          //  DataTable dtInfotableUser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
            if(DtInfoTableuser .Rows.Count > 0)
            { 
                var drWorkFlowStatus = DtInfoTableuser.Select("infotype=65").FirstOrDefault();
                if (!(drWorkFlowStatus == null))
                   condition = condition + " and m1.Status in (" + df1.GetCellValue(drWorkFlowStatus, "nameofinfo").ToString()?.Trim() + ")";

            }

            int a = libCalls.getRowsCountAllCallsReg(Loginkey, condition, SessionControl.UserServerDatabase);
            var dtEmp = libSaralAuth.GetActiveEmployeesFromAccMaster(SessionControl.UserServerDatabase, "p_acccode,accname");

            if (string.IsNullOrEmpty(order))
                order = "lastcalltime desc";

            var dtcalls = libCalls.getPendingRegCallsDataGrid_new(Loginkey, Convert.ToInt32(start), DtInfoTable , DtInfoTableuser, dtEmp, SessionControl.UserServerDatabase, condition, order, 50);
            df1.AddColumnsInDataTable(ref dtcalls, "hasRemarks,callFreqCount,LastCallDate,TxtLastCallDate,EngageStatus,EngageBy,EngageTime,IsPendingMoreThanDays,combinedAddress,TxtBilledUpto,TxtEmpAssigned,Email,Custcode", "System.String,System.Int32,System.DateTime,System.string,System.String,System.String,system.string,system.string,system.string,system.string,system.string,system.string,system.string");

            // 'added by aslam on 12/03/2021
            string commaSeperatedPissuesfilegst = string.Empty;
            if (dtcalls.Rows.Count > 0)
            {
                var strBuilder = new StringBuilder();
                for (int i = 0, loopTo = dtcalls.Rows.Count - 1; i <= loopTo; i++)
                {
					if (strBuilder.Length>0)
					{
                        strBuilder.Append(",");
					}

                    strBuilder.Append(df1.GetCellValue(dtcalls.Rows[i], "p_allcallsreg","integer"));

                    //if (string.IsNullOrEmpty(commaSeperatedPissuesfilegst))
                    //{
                    //    commaSeperatedPissuesfilegst = df1.GetCellValue(dtcalls.Rows[i], "p_allcallsreg").ToString()?? "";
                    //}
                    //else
                    //{
                    //    commaSeperatedPissuesfilegst =commaSeperatedPissuesfilegst + "," + df1.GetCellValue(dtcalls.Rows[i], "p_allcallsreg");
                    //}
                }
                commaSeperatedPissuesfilegst = strBuilder.ToString();
            }

            var engageDt = new DataTable();
            if (!string.IsNullOrEmpty(commaSeperatedPissuesfilegst.Trim()))
            {
                string argserverdatabase = SessionControl.UserServerDatabase;
                engageDt = libCalls.getcallengageddtforp_issuesfilegst(commaSeperatedPissuesfilegst, ref argserverdatabase, "p_issuesfilegst,engagestatus,logincode,starttime");
            }

            var pendingCallsDt = libCalls.getPendingCallsMorethanDays(SessionControl.UserServerDatabase, "m1.p_AllCallsReg");



            //Added by aslam
            string p_customers = string.Empty;
            if (dtcalls.Rows.Count > 0)
            {
                var strBuilder = new StringBuilder();
                for (int i = 0, loopTo = dtcalls.Rows.Count - 1; i <= loopTo; i++)
                {
                    if (strBuilder.Length > 0)
                    {
                        strBuilder.Append(",");
                    }

                    strBuilder.Append(df1.GetCellValue(dtcalls.Rows[i], "p_customers", "integer"));
                }
                p_customers = strBuilder.ToString();
            }

            DataTable dtCustomers = libcustomerfeature.GetCustomerGenDataByP_customer(p_customers, SessionControl.UserServerDatabase);

            DataTable dtremarks;
            var currentTime = df1.GetDateTimeISTNow();
          //  DataTable infotable = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));
            if (dtcalls.Rows.Count > 0)
            {
                for (int i = 0, loopTo1 = dtcalls.Rows.Count - 1; i <= loopTo1; i++)
                {
                    var engageRow = engageDt.Select("p_issuesfilegst=" + Convert.ToInt32(df1.GetCellValue(dtcalls.Rows[i], "P_AllCallsReg"))).FirstOrDefault();
                    if (engageRow is not null)
                    {
                        string status = DtInfoTable.Select("P_Infotable=" + Convert.ToInt32(df1.GetCellValue(engageRow, "engagestatus"))).FirstOrDefault()?["NameofInfo"].ToString()?? "";  
                        var empRow = dtEmp.Select("p_acccode=" + Convert.ToInt32(df1.GetCellValue(engageRow, "logincode"))).FirstOrDefault();
                        string statuschangetime = libCalls.GetDateTimeDiffFromTwoDates(Convert.ToDateTime(df1.GetCellValue(engageRow, "starttime").ToString()), currentTime).ToString() ?? "" ;
                        dtcalls.Rows[i]["EngageStatus"] = status.Trim() + " by ";
                        dtcalls.Rows[i]["EngageBy"] = df1.GetCellValue(empRow, "AccName", "string"); 
                        dtcalls.Rows[i]["EngageTime"] = "  " + statuschangetime + " ago";
                    }
                    dtremarks = libCRMTasks.LatestRemarkDateOfATask(Convert.ToInt32(df1.GetCellValue(dtcalls.Rows[i], "p_crmtasks1")), SessionControl.UserServerDatabase);
                    DateTime LastCallDate = Convert.ToDateTime(dtcalls.Rows[i]["registerdate"]);
                    if (dtremarks.Rows.Count == 0)
                    {
                        DateTime LastRemarkDate = Convert.ToDateTime(dtcalls.Rows[i]["registerdate"]);
                        dtcalls.Rows[i]["hasRemarks"] = "N";


                        int count = libCalls.GetCountCallFreqForP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), LastRemarkDate, SessionControl.UserServerDatabase);
                        //if (count > 0)
                        //{
                        //    var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), "C", SessionControl.UserServerDatabase, "calltime");
                        //    LastCallDate = Convert.ToDateTime(df1.GetCellValue(lastcallrow, "calltime", "datetime"));
                        //    dtcalls.Rows[i]["LastCallDate"] = LastCallDate;
                        //    dtcalls.Rows[i]["TxtLastCallDate"] = LastCallDate.ToString("dd-MM-yyyy hh:mm tt");
                        //}
                        //else
                        //{
                        //    dtcalls.Rows[i]["LastCallDate"] = LastRemarkDate;
                        //    dtcalls.Rows[i]["TxtLastCallDate"] = LastRemarkDate.ToString("dd-MM-yyyy hh:mm tt");
                        //}
                        dtcalls.Rows[i]["callFreqCount"] = count;
                    }
                    else if (dtremarks.Rows.Count > 0)
                    {
                        dtcalls.Rows[i]["hasRemarks"] = "Y";
                        DateTime LastRemarkDate = Convert.ToDateTime(dtremarks.Rows[0]["CreationDate"]);
                        int count = libCalls.GetCountCallFreqForP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), LastRemarkDate, SessionControl.UserServerDatabase);
                        dtcalls.Rows[i]["callFreqCount"] = count;
                        //var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), "C", SessionControl.UserServerDatabase, "calltime");
                        //LastCallDate = Convert.ToDateTime(df1.GetCellValue(lastcallrow, "calltime", "datetime"));

                        //if (LastCallDate == Convert.ToDateTime("0001-01-01 00:00:00.000"))
                        //{
                        //    DateTime tempdate = Convert.ToDateTime(df1.GetCellValue(dtcalls.Rows[i], "registerdate"));
                        //    dtcalls.Rows[i]["LastCallDate"] = df1.GetCellValue(dtcalls.Rows[i], "registerdate");
                        //    dtcalls.Rows[i]["TxtLastCallDate"] = tempdate.ToString("dd-MM-yyyy hh:mm tt");
                        //}
                        //else
                        //{
                        //    dtcalls.Rows[i]["LastCallDate"] = LastCallDate;
                        //    dtcalls.Rows[i]["TxtLastCallDate"] = LastCallDate.ToString("dd-MM-yyyy hh:mm tt");
                        //}

                    }

                    var pendingRow = pendingCallsDt.Select("p_AllCallsReg="+ Convert.ToInt32(dtcalls.Rows[i]["p_AllCallsReg"])).FirstOrDefault();
                    if (!(pendingRow is null))
                    {
                        dtcalls.Rows[i]["IsPendingMoreThanDays"] = "Y";
                    }
                    else
                    {
                        dtcalls.Rows[i]["IsPendingMoreThanDays"] = "N";
                    }

                    if (dtCustomers is not null && dtCustomers.Rows.Count>0)
                    {
                       DataRow? accRow = dtCustomers.Select("p_customers='" + df1.GetCellValue(dtcalls.Rows[i], "p_customers","integer") + "'").FirstOrDefault();
                       dtcalls.Rows[i]["combinedAddress"] = df1.GetCellValue(accRow, "combinedAddress","string");
                       dtcalls.Rows[i]["TxtBilledUpto"] = df1.GetCellValue(accRow, "TxtBilledUpto", "string");
                       dtcalls.Rows[i]["TxtEmpAssigned"] = df1.GetCellValue(accRow, "TxtEmpAssigned", "string");
                        dtcalls.Rows[i]["Email"] = df1.GetCellValue(accRow, "email", "string");
                        dtcalls.Rows[i]["Custcode"] = df1.GetCellValue(accRow, "custcode", "string");
                    }
                    else
                    {
                        dtcalls.Rows[i]["combinedAddress"] = "";
                        dtcalls.Rows[i]["TxtBilledUpto"] = "";
                        dtcalls.Rows[i]["TxtEmpAssigned"] = "";
                        dtcalls.Rows[i]["Email"] = "";
                        dtcalls.Rows[i]["Custcode"] = "";
                    }

                }
            }

            // 'Change by aslam for sorting
            if (string.IsNullOrEmpty(order))
            {
                var view = new DataView(dtcalls);
                view.Sort = "lastcalltime desc";
                dtcalls = view.ToTable();
            }


            var objdatatableToList = new DataTypeConversionLib.DTResult<RegCallsViewModel>();
            objdatatableToList = (DataTypeConversionLib.DTResult<RegCallsViewModel>)DCLib.ConvertDTtoModal<RegCallsViewModel>(dtcalls, Convert.ToInt32(start), a, dtcalls.Rows.Count);
            
            return Json(objdatatableToList);
        }


        /// <summary>
        /// Export Calls Data into Excel
        /// </summary>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public JsonResult AjaxExportCalls(string search = "", string order = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");

            int Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

            DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            string condition = string.Empty;
            if (!string.IsNullOrEmpty(search))
                condition = cfc1.GetSearchString(search); 

            if (string.IsNullOrEmpty(search?.Trim()))
            {
                string searchValueStr = "infotype='searchvalue' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]);
                var searchValuedr = libSaralAuth.GetViewSettingsRowforLcondition(searchValueStr, SessionControl.UserServerDatabase);
                if (searchValuedr == null)
                {
                    searchValueStr = "infotype='searchvalue' and viewid='manageregcalls' and  rowstatus=0 and Userlogin_key=0";
                    searchValuedr = libSaralAuth.GetViewSettingsRowforLcondition(searchValueStr, SessionControl.UserServerDatabase);
                }
                if (!(searchValuedr == null))
                {
                    if (!string.IsNullOrEmpty(df1.GetCellValue(searchValuedr, "infostring", "string").ToString()?.Trim()) && df1.GetCellValue(searchValuedr, "infostring", "string") is DBNull == false)
                    {
                        string searchValue = df1.GetCellValue(searchValuedr, "infostring", "string").ToString()?.Trim() ?? "";
                        Hashtable dtVariablHash = GF1.CreateHashTable(cfc1.CSVToDataRow(HttpContext.Session.GetString("variablevalues")));
                        string searchCondition = cfc1.evaluateVariable(searchValue, dtVariablHash);
                        condition = condition + cfc1.GetSearchString(searchCondition);  
                        //string searchCondition = cfc1.evaluateVariable(searchValue, (Hashtable)Session["variablevalues"]);
                        //condition = condition + GetSearchString(searchCondition); //Aslam_variablevalues_check
                    }
                }
            }

         //   DataTable dtInfotableUser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
            if (DtInfoTableuser .Rows.Count > 0)
            {
                var drWorkFlowStatus = DtInfoTableuser.Select("infotype=65").FirstOrDefault();
                if (!(drWorkFlowStatus == null))
                    condition = condition + " and m1.Status in (" + df1.GetCellValue(drWorkFlowStatus, "nameofinfo").ToString()?.Trim() + ")";

            }

            int a = libCalls.getRowsCountAllCallsReg(Loginkey,condition, SessionControl.UserServerDatabase);
            var dtEmp = libSaralAuth.GetActiveEmployeesFromAccMaster(SessionControl.UserServerDatabase, "p_acccode,accname");
            if (string.IsNullOrEmpty(order))
                order = "registerdate desc";

         //   var dtcalls = libCalls.getPendingRegCallsDataGrid_new(0, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), dtInfotableUser, dtEmp, SessionControl.UserServerDatabase, condition, order, a);
            var dtcalls = libCalls.getPendingRegCallsDataGrid_new(Loginkey,0, DtInfoTable , DtInfoTableuser , dtEmp, SessionControl.UserServerDatabase, condition, order, a);

            df1.AddColumnsInDataTable(ref dtcalls, "hasRemarks,callFreqCount,LastCallDate,TxtLastCallDate,EngageStatus,EngageBy,EngageTime,IsPendingMoreThanDays", "System.String,System.Int32,System.DateTime,System.string,System.String,System.String,system.string,system.string");

            // 'added by aslam on 12/03/2021
            string commaSeperatedPissuesfilegst = string.Empty;
            if (dtcalls.Rows.Count > 0)
            {
                for (int i = 0; i <= dtcalls.Rows.Count - 1; i++)
                {
                    if (string.IsNullOrEmpty(commaSeperatedPissuesfilegst))
                    {
                        commaSeperatedPissuesfilegst = df1.GetCellValue(dtcalls.Rows[i], "p_allcallsreg").ToString()?? "";
                    }
                    else
                    {
                        commaSeperatedPissuesfilegst = commaSeperatedPissuesfilegst + "," + df1.GetCellValue(dtcalls.Rows[i], "p_allcallsreg").ToString();
                    }
                }
            }

            var engageDt = new DataTable();
            if (!string.IsNullOrEmpty(commaSeperatedPissuesfilegst.Trim()))
            {
                string argserverdatabase = SessionControl.UserServerDatabase;
                engageDt = libCalls.getcallengageddtforp_issuesfilegst(commaSeperatedPissuesfilegst, ref argserverdatabase, "p_issuesfilegst,engagestatus,logincode,starttime");
            }

            var pendingCallsDt = libCalls.getPendingCallsMorethanDays(SessionControl.UserServerDatabase, "m1.p_AllCallsReg");

            DataTable dtremarks;
            var currentTime = df1.GetDateTimeISTNow();
          //  DataTable infotable = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));

            if (dtcalls.Rows.Count > 0)
            {
                for (int i = 0; i <= dtcalls.Rows.Count - 1; i++)
                {
                    var engageRow = engageDt.Select("p_issuesfilegst=" + Convert.ToInt32(df1.GetCellValue(dtcalls.Rows[i], "P_AllCallsReg"))).FirstOrDefault();
                    if (engageRow is not null)
                    {
                        string status = DtInfoTable .Select("P_Infotable=" + Convert.ToInt32(df1.GetCellValue(engageRow, "engagestatus"))).FirstOrDefault()?["NameofInfo"].ToString() ?? "";
                        var empRow = dtEmp.Select("p_acccode=" + Convert.ToInt32(df1.GetCellValue(engageRow, "logincode"))).FirstOrDefault();
                        string statuschangetime =libCalls.GetDateTimeDiffFromTwoDates(Convert.ToDateTime(df1.GetCellValue(engageRow, "starttime")), currentTime).ToString()?? "";
                        dtcalls.Rows[i]["EngageStatus"] = status.Trim() + " by ";
                        dtcalls.Rows[i]["EngageBy"] = df1.GetCellValue(empRow, "AccName", "string");
                        dtcalls.Rows[i]["EngageTime"] = "  " + statuschangetime + " ago";
                    }
                    dtremarks = libCRMTasks.LatestRemarkDateOfATask(Convert.ToInt32(df1.GetCellValue(dtcalls.Rows[i], "p_crmtasks1")), SessionControl.UserServerDatabase);
                    DateTime LastCallDate = Convert.ToDateTime(dtcalls.Rows[i]["registerdate"]);
                    if (dtremarks.Rows.Count == 0)
                    {
                        DateTime LastRemarkDate = Convert.ToDateTime(dtcalls.Rows[i]["registerdate"]);
                        dtcalls.Rows[i]["hasRemarks"] = "N";


                        int count = libCalls.GetCountCallFreqForP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), LastRemarkDate, SessionControl.UserServerDatabase);
                        if (count > 0)
                        {
                            var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), "C", SessionControl.UserServerDatabase, "calltime");
                            LastCallDate = Convert.ToDateTime(df1.GetCellValue(lastcallrow, "calltime", "datetime"));

                            dtcalls.Rows[i]["LastCallDate"] = LastCallDate;
                            dtcalls.Rows[i]["TxtLastCallDate"] = LastCallDate.ToString("dd-MM-yyyy hh:mm tt");
                        }
                        else
                        {
                            dtcalls.Rows[i]["LastCallDate"] = LastRemarkDate;
                            dtcalls.Rows[i]["TxtLastCallDate"] = LastRemarkDate.ToString("dd-MM-yyyy hh:mm tt");
                        }
                        dtcalls.Rows[i]["callFreqCount"] = count;
                    }
                    else if (dtremarks.Rows.Count > 0)
                    {
                        dtcalls.Rows[i]["hasRemarks"] = "Y";
                        DateTime LastRemarkDate =  Convert.ToDateTime(dtremarks.Rows[0]["CreationDate"]);
                        int count = libCalls.GetCountCallFreqForP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), LastRemarkDate, SessionControl.UserServerDatabase);
                        dtcalls.Rows[i]["callFreqCount"] = count;
                        var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), "C", SessionControl.UserServerDatabase, "calltime");
                        LastCallDate =  Convert.ToDateTime(df1.GetCellValue(lastcallrow, "calltime", "datetime"));

                        if (LastCallDate ==  Convert.ToDateTime("0001-01-01 00:00:00.000"))
                        {
                            DateTime tempdate =  Convert.ToDateTime(df1.GetCellValue(dtcalls.Rows[i], "registerdate"));
                            dtcalls.Rows[i]["LastCallDate"] = df1.GetCellValue(dtcalls.Rows[i], "registerdate");
                            dtcalls.Rows[i]["TxtLastCallDate"] = tempdate.ToString("dd-MM-yyyy hh:mm tt");
                        }
                        else
                        {
                            dtcalls.Rows[i]["LastCallDate"] = LastCallDate;
                            dtcalls.Rows[i]["TxtLastCallDate"] = LastCallDate.ToString("dd-MM-yyyy hh:mm tt");
                        }

                    }

                    var pendingRow = pendingCallsDt.Select("p_AllCallsReg=" + Convert.ToInt32(dtcalls.Rows[i]["p_AllCallsReg"])).FirstOrDefault();
                    if (pendingRow is not null)
                    {
                        dtcalls.Rows[i]["IsPendingMoreThanDays"] = "Y";
                    }
                    else
                    {
                        dtcalls.Rows[i]["IsPendingMoreThanDays"] = "N";
                    }

                }
            }

            // 'Change by aslam for sorting
            if (string.IsNullOrEmpty(order))
            {
                var view = new DataView(dtcalls);
                view.Sort = "registerdate desc";
                dtcalls = view.ToTable();
            }

            var finalDt = new DataTable();
            finalDt = df1.AddColumnsInDataTable(ref finalDt, "SrNo,CallId,Date,Firm,Name,Mobile,Location,Issue,Description,Status,AssignedTo,LastCallTime,OnSiteFlag,NextActionDate,CallSource,Tags", "System.integer,System.integer,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string");



            if (dtcalls.Rows.Count > 0)
            {
                int srno = 0;
                for (int m = 0; m <= dtcalls.Rows.Count - 1; m++)
                {
                    var newRow = finalDt.NewRow();
                    srno = srno + 1;
                    newRow["SrNo"] = srno;
                    newRow["CallId"] = df1.GetCellValue(dtcalls.Rows[m], "p_allcallsreg", "integer");
                    newRow["Date"] = df1.GetCellValue(dtcalls.Rows[m], "txtregisterdate", "string");
                    newRow["Firm"] = df1.GetCellValue(dtcalls.Rows[m], "firmname", "string");
                    newRow["Name"] = df1.GetCellValue(dtcalls.Rows[m], "contactperson", "string");
                    newRow["Mobile"] = df1.GetCellValue(dtcalls.Rows[m], "mobileno", "string");
                    newRow["Location"] = df1.GetCellValue(dtcalls.Rows[m], "location", "string");
                    newRow["Issue"] = df1.GetCellValue(dtcalls.Rows[m], "textissuetype", "string");
                    newRow["Description"] = df1.GetCellValue(dtcalls.Rows[m], "issuedescription", "string");
                    newRow["Status"] = df1.GetCellValue(dtcalls.Rows[m], "textstatus", "string");
                    newRow["AssignedTo"] = df1.GetCellValue(dtcalls.Rows[m], "textassignedto", "string");
                    newRow["LastCallTime"] = df1.GetCellValue(dtcalls.Rows[m], "TxtLastCallDate", "string");
                    newRow["OnSiteFlag"] = df1.GetCellValue(dtcalls.Rows[m], "onsitecount", "string");
                    newRow["NextActionDate"] = df1.GetCellValue(dtcalls.Rows[m], "frmtnextactiondate", "string");
                    newRow["CallSource"] = df1.GetCellValue(dtcalls.Rows[m], "source", "string");
                    newRow["Tags"] = df1.GetCellValue(dtcalls.Rows[m], "Tags", "string");
                    finalDt.Rows.Add(newRow);
                }

                string filePath = MyServer.MapPath("App_Data/");
                string fileName = "CallsData_" + HttpContext.Session.GetString("corpid") + df1.GetDateTimeISTNow().ToString("ddMM_HHmmss") + ".xlsx";
                cfc1.ExportDataToExcel(finalDt, filePath + fileName);
                return Json(fileName);
            }
            else
            {
                return Json("0");
            }

        }

        public JsonResult AjaxExportAllCalls(string search = "", string order = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");

            int Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

            string condition = string.Empty;
            if (!string.IsNullOrEmpty(search))
                condition = cfc1.GetSearchString(search);

         //   DataTable dtInfotableUser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
            //only closed calls
            if (DtInfoTableuser .Rows.Count > 0)
            {
                var drWorkFlowStatus = DtInfoTableuser.Select("infotype=67").FirstOrDefault();
                if (!(drWorkFlowStatus == null))
                    condition = condition + " and m1.Status in (" + df1.GetCellValue(drWorkFlowStatus, "nameofinfo").ToString()?.Trim() + ")";

            }
            int a = libCalls.getRowsCountAllCallsReg(Loginkey,condition, SessionControl.UserServerDatabase);
            var dtEmp = libSaralAuth.GetActiveEmployeesFromAccMaster(SessionControl.UserServerDatabase, "p_acccode,accname");

            if (string.IsNullOrEmpty(order))
                order = "registerdate desc";

            var dtcalls = libCalls.getPendingRegCallsDataGrid_new(Loginkey,0, DtInfoTable , DtInfoTableuser, dtEmp, SessionControl.UserServerDatabase, condition, order, 50);
            df1.AddColumnsInDataTable(ref dtcalls, "LastCallDate,TxtLastCallDate", "System.DateTime,System.string");

            DataTable dtremarks;
            var currentTime = df1.GetDateTimeISTNow();
          //  DataTable infotable = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));
            if (dtcalls.Rows.Count > 0)
            {
                for (int i = 0, loopTo1 = dtcalls.Rows.Count - 1; i <= loopTo1; i++)
                {
                    dtremarks = libCRMTasks.LatestRemarkDateOfATask(Convert.ToInt32(df1.GetCellValue(dtcalls.Rows[i], "p_crmtasks1")), SessionControl.UserServerDatabase);
                    DateTime LastCallDate = Convert.ToDateTime(dtcalls.Rows[i]["registerdate"]);
                    if (dtremarks.Rows.Count == 0)
                    {
                        DateTime LastRemarkDate = Convert.ToDateTime(dtcalls.Rows[i]["registerdate"]);
                        int count = libCalls.GetCountCallFreqForP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), LastRemarkDate, SessionControl.UserServerDatabase);
                        if (count > 0)
                        {
                            var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), "C", SessionControl.UserServerDatabase, "calltime");
                            LastCallDate = Convert.ToDateTime(df1.GetCellValue(lastcallrow, "calltime", "datetime"));
                            dtcalls.Rows[i]["LastCallDate"] = LastCallDate;
                            dtcalls.Rows[i]["TxtLastCallDate"] = LastCallDate.ToString("dd-MM-yyyy hh:mm tt");
                        }
                        else
                        {
                            dtcalls.Rows[i]["LastCallDate"] = LastRemarkDate;
                            dtcalls.Rows[i]["TxtLastCallDate"] = LastRemarkDate.ToString("dd-MM-yyyy hh:mm tt");
                        }
                    }
                    else if (dtremarks.Rows.Count > 0)
                    {
                        DateTime LastRemarkDate = Convert.ToDateTime(dtremarks.Rows[0]["CreationDate"]);
                        var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), "C", SessionControl.UserServerDatabase, "calltime");
                        LastCallDate = Convert.ToDateTime(df1.GetCellValue(lastcallrow, "calltime", "datetime"));

                        if (LastCallDate == Convert.ToDateTime("0001-01-01 00:00:00.000"))
                        {
                            DateTime tempdate = Convert.ToDateTime(df1.GetCellValue(dtcalls.Rows[i], "registerdate"));
                            dtcalls.Rows[i]["LastCallDate"] = df1.GetCellValue(dtcalls.Rows[i], "registerdate");
                            dtcalls.Rows[i]["TxtLastCallDate"] = tempdate.ToString("dd-MM-yyyy hh:mm tt");
                        }
                        else
                        {
                            dtcalls.Rows[i]["LastCallDate"] = LastCallDate;
                            dtcalls.Rows[i]["TxtLastCallDate"] = LastCallDate.ToString("dd-MM-yyyy hh:mm tt");
                        }

                    }
                }
            }

            // 'Change by aslam for sorting
            if (string.IsNullOrEmpty(order))
            {
                var view = new DataView(dtcalls);
                view.Sort = "registerdate desc";
                dtcalls = view.ToTable();
            }

            var finalDt = new DataTable();
            finalDt = df1.AddColumnsInDataTable(ref finalDt, "SrNo,CallId,Date,Firm,Name,Mobile,Location,Issue,Description,Status,AssignedTo,LastCallTime,OnSiteFlag,NextActionDate,CallSource,Tags", "System.integer,System.integer,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string");



            if (dtcalls.Rows.Count > 0)
            {
                int srno = 0;
                for (int m = 0; m <= dtcalls.Rows.Count - 1; m++)
                {
                    var newRow = finalDt.NewRow();
                    srno = srno + 1;
                    newRow["SrNo"] = srno;
                    newRow["CallId"] = df1.GetCellValue(dtcalls.Rows[m], "p_allcallsreg", "integer");
                    newRow["Date"] = df1.GetCellValue(dtcalls.Rows[m], "txtregisterdate", "string");
                    newRow["Firm"] = df1.GetCellValue(dtcalls.Rows[m], "firmname", "string");
                    newRow["Name"] = df1.GetCellValue(dtcalls.Rows[m], "contactperson", "string");
                    newRow["Mobile"] = df1.GetCellValue(dtcalls.Rows[m], "mobileno", "string");
                    newRow["Location"] = df1.GetCellValue(dtcalls.Rows[m], "location", "string");
                    newRow["Issue"] = df1.GetCellValue(dtcalls.Rows[m], "textissuetype", "string");
                    newRow["Description"] = df1.GetCellValue(dtcalls.Rows[m], "issuedescription", "string");
                    newRow["Status"] = df1.GetCellValue(dtcalls.Rows[m], "textstatus", "string");
                    newRow["AssignedTo"] = df1.GetCellValue(dtcalls.Rows[m], "textassignedto", "string");
                    newRow["LastCallTime"] = df1.GetCellValue(dtcalls.Rows[m], "TxtLastCallDate", "string");
                    newRow["OnSiteFlag"] = df1.GetCellValue(dtcalls.Rows[m], "onsitecount", "string");
                    newRow["NextActionDate"] = df1.GetCellValue(dtcalls.Rows[m], "frmtnextactiondate", "string");
                    newRow["CallSource"] = df1.GetCellValue(dtcalls.Rows[m], "source", "string");
                    newRow["Tags"] = df1.GetCellValue(dtcalls.Rows[m], "Tags", "string");
                    finalDt.Rows.Add(newRow);
                }

                string filePath = MyServer.MapPath("App_Data/");
                string fileName = "AllCallsData_" + HttpContext.Session.GetString("corpid") + df1.GetDateTimeISTNow().ToString("ddMM_HHmmss") + ".xlsx";
                cfc1.ExportDataToExcel(finalDt, filePath + fileName);
                return Json(fileName);
            }
            else
            {
                return Json("0");
            }

        }


        /// <summary>
        /// function to get CallEngageStatusList from infotable
        /// </summary>
        /// <returns></returns>
        public JsonResult CallEngageStatusList()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "viewcallremark", HttpContext.Session.GetString("serverdatabase")))
            {
                var dt = GetDataFromInfotable(56, SessionControl.UserServerDatabase, "P_Infotable,NameOfInfo");
                if (dt is null)
                    return Json("");
                var datatableData = new DataTypeConversionLib.DTResult<InfotableMaster>();
                datatableData = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt);
                return Json(datatableData);
            }
            return Json("");
        }

        /// <summary>
        /// function to get data from infotable according to infotype
        /// </summary>
        /// <param name="infoType"></param>
        /// <param name="ColStr"></param>
        /// <returns></returns>
        public DataTable GetDataFromInfotable(int infoType, string serverdatabase, string ColStr = "*")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var dt = new DataTable();
            string query = string.Format("select " + ColStr + " from infotable where Infotype=" + infoType + " and Rowstatus=0");
            dt = df1.SqlExecuteDataTable(serverdatabase, query);
            return dt;
        }

        /// <summary>
        /// Function to add Collaborator to a Call
        /// </summary>
        /// <param name="CallId">P_allcallsreg </param>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AddCallEngageStatus(int CallId, int status)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addcallcollaborator", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""); ;

                int result = libCalls.SetCallEngageStatus(CallId, status, sessionRow, SessionControl.UserServerDatabase);
                string statustext = cfc1.GetNameOfInfoFromInfotableFromP_infotable(status, SessionControl.UserServerDatabase);
                var empRow = libSaralAuth.getAccMasterRowForp_acccode(Convert.ToInt32(sessionRow["linkcode"]), SessionControl.UserServerDatabase, "AccName");

                string engageStatusString =statustext.Trim() + " by " + empRow["AccName"].ToString();
                if (result > 0)
                    return Json(engageStatusString);
                else
                    return Json("");

            }

            return Json("");
        }

        //Commented by aslam
        //// this ajax function is called by the client for each draw of the information on the page (i.e. when paging, ordering, searching, etc.). 
        //public JsonResult AjaxAllRegCallsData(int? start, int pSize = 20, string search = "", string order = "")
        //{
        //    if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
        //        return Json("");
        //    SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
        //    if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManageAllCalls", HttpContext.Session.GetString("serverdatabase")))
        //    {
        //        string condition = libCalls.GetSearchStringForPendingRegCalls(search);
        //        int a = libCalls.getRowsCountOfCompletedCalls(condition, SessionControl.UserServerDatabase);
        //        var dtcalls = libCalls.getALLRegCallsGrid_new(Convert.ToInt32(start), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), condition, order, pSize.ToString());
        //        // System.Web.HttpContext.Current.Session("issueFilegst") = dtcalls
        //        var datatableData = new DataTypeConversionLib.DTResult<RegCallsViewModel>();
        //        datatableData = (DataTypeConversionLib.DTResult<RegCallsViewModel>)DCLib.ConvertDTtoModal<RegCallsViewModel>(dtcalls, (int)start, a, dtcalls.Rows.Count);
        //        return Json(datatableData);
        //    }
        //    return Json("");
        //}

        public JsonResult AjaxAllRegCallsData(int? start, int pSize = 20, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");
            

            int Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

            string condition = string.Empty;
            if (!string.IsNullOrEmpty(search))
                condition = cfc1.GetSearchString(search);

           // DataTable dtInfotableUser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
            //Only show Closed calls
            if (DtInfoTableuser .Rows.Count > 0)
            {
                var drWorkFlowStatus = DtInfoTableuser.Select("infotype=67").FirstOrDefault();
                if (!(drWorkFlowStatus == null))
                    condition = condition + " and m1.Status in (" + df1.GetCellValue(drWorkFlowStatus, "nameofinfo").ToString()?.Trim() + ")";

            }

            int a = libCalls.getRowsCountAllCallsReg(Loginkey,condition, SessionControl.UserServerDatabase);
            var dtEmp = libSaralAuth.GetActiveEmployeesFromAccMaster(SessionControl.UserServerDatabase, "p_acccode,accname");

            if (string.IsNullOrEmpty(order))
                order = "registerdate desc";

            var dtcalls = libCalls.getPendingRegCallsDataGrid_new(Loginkey,Convert.ToInt32(start), DtInfoTable , DtInfoTableuser, dtEmp, SessionControl.UserServerDatabase, condition, order, 50);
            df1.AddColumnsInDataTable(ref dtcalls, "LastCallDate,TxtLastCallDate", "System.DateTime,System.string");

            DataTable dtremarks;
            var currentTime = df1.GetDateTimeISTNow();
            //DataTable infotable = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));
            if (dtcalls.Rows.Count > 0)
            {
                for (int i = 0, loopTo1 = dtcalls.Rows.Count - 1; i <= loopTo1; i++)
                {
                    dtremarks = libCRMTasks.LatestRemarkDateOfATask(Convert.ToInt32(df1.GetCellValue(dtcalls.Rows[i], "p_crmtasks1")), SessionControl.UserServerDatabase);
                    DateTime LastCallDate = Convert.ToDateTime(dtcalls.Rows[i]["registerdate"]);
                    if (dtremarks.Rows.Count == 0)
                    {
                        DateTime LastRemarkDate = Convert.ToDateTime(dtcalls.Rows[i]["registerdate"]);
                        int count = libCalls.GetCountCallFreqForP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), LastRemarkDate, SessionControl.UserServerDatabase);
                        if (count > 0)
                        {
                            var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), "C", SessionControl.UserServerDatabase, "calltime");
                            LastCallDate = Convert.ToDateTime(df1.GetCellValue(lastcallrow, "calltime", "datetime"));
                            dtcalls.Rows[i]["LastCallDate"] = LastCallDate;
                            dtcalls.Rows[i]["TxtLastCallDate"] = LastCallDate.ToString("dd-MM-yyyy hh:mm tt");
                        }
                        else
                        {
                            dtcalls.Rows[i]["LastCallDate"] = LastRemarkDate;
                            dtcalls.Rows[i]["TxtLastCallDate"] = LastRemarkDate.ToString("dd-MM-yyyy hh:mm tt");
                        }
                    }
                    else if (dtremarks.Rows.Count > 0)
                    {
                        DateTime LastRemarkDate = Convert.ToDateTime(dtremarks.Rows[0]["CreationDate"]);
                        var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["P_AllCallsReg"]), "C", SessionControl.UserServerDatabase, "calltime");
                        LastCallDate = Convert.ToDateTime(df1.GetCellValue(lastcallrow, "calltime", "datetime"));

                        if (LastCallDate == Convert.ToDateTime("0001-01-01 00:00:00.000"))
                        {
                            DateTime tempdate = Convert.ToDateTime(df1.GetCellValue(dtcalls.Rows[i], "registerdate"));
                            dtcalls.Rows[i]["LastCallDate"] = df1.GetCellValue(dtcalls.Rows[i], "registerdate");
                            dtcalls.Rows[i]["TxtLastCallDate"] = tempdate.ToString("dd-MM-yyyy hh:mm tt");
                        }
                        else
                        {
                            dtcalls.Rows[i]["LastCallDate"] = LastCallDate;
                            dtcalls.Rows[i]["TxtLastCallDate"] = LastCallDate.ToString("dd-MM-yyyy hh:mm tt");
                        }

                    }
                }
            }

            // 'Change by aslam for sorting
            if (string.IsNullOrEmpty(order))
            {
                var view = new DataView(dtcalls);
                view.Sort = "registerdate desc";
                dtcalls = view.ToTable();
            }


            var objdatatableToList = new DataTypeConversionLib.DTResult<RegCallsViewModel>();
            objdatatableToList = (DataTypeConversionLib.DTResult<RegCallsViewModel>)DCLib.ConvertDTtoModal<RegCallsViewModel>(dtcalls, Convert.ToInt32(start), a, dtcalls.Rows.Count);

            return Json(objdatatableToList);
        }


        public ActionResult AddCommunication()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return RedirectToAction("LogOut", "Home");
                
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// function to get Remarks of a particular call according to CallId
        /// </summary>
        /// <param name="CallId">P_AllCallsReg</param>
        /// <returns></returns>
        public JsonResult AddRemarkData(int? CallId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "viewcallremark", HttpContext.Session.GetString("serverdatabase")))
            {

                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode("C", Convert.ToInt32(CallId), SessionControl.UserServerDatabase, "p_crmtasks");
                var dtremarks = libCRMTasks.GetRemarkDataOfATask(Convert.ToInt32(df1.GetCellValue(taskRow, "p_crmtasks", "integer")), SessionControl.UserServerDatabase);

                var datatableData = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                datatableData = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dtremarks, 1, dtremarks.Rows.Count);
                return Json(datatableData);
            }
            return Json("");
        }

        public JsonResult ajaxEnquiryData(int? id, int? start, int pSize = 20, string direction = "F", string search = "", string order = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "enquiry", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string LoginType = "";
                int Loginkey;
                var argSessionInstance = SessionControl;
                var clswebsession = new WebSessions.WebSessions.WebSessions(ref argSessionInstance);
                SessionControl = argSessionInstance;
                if (sessionRow is not null)
                {
                    LoginType = sessionRow["linktype"].ToString()??"";
                    Loginkey =Convert.ToInt32(sessionRow["linkcode"]);
                }
                else if (Request.Cookies["SessionKey"] is not null)
                {
                    //var cookie = Request.Cookies["SessionKey"];
                    string session_key = Request.Cookies["SessionKey"] ?? ""; //cookie.Value;
                    object argClsObject = clswebsession;
                    string argSearchFieldName = "";
                    var mWebsessions = df1.SeekRecordTableClass(ref argClsObject, Convert.ToInt32(session_key), SearchFieldName: ref argSearchFieldName);
                    clswebsession = (WebSessions.WebSessions.WebSessions)argClsObject;
                    Loginkey =Convert.ToInt32(mWebsessions["linkcode"]);
                    LoginType = mWebsessions["linktype"].ToString() ?? "";
                }
                var dt = new DataTable();
                var argSessionInstance1 = SessionControl;
                var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance1);
                SessionControl = argSessionInstance1;
                string Query = string.Format("Select Visitors.*, Enquiry.* From Visitors Join Enquiry On Visitors.Visitors_Key = Enquiry.LoginCode Order by EnqDate DESC");
                dt = df1.SqlExecuteDataTable(clsinfotable.ServerDatabase, Query);
                df1.AddColumnsInDataTable(ref dt, "TextEnqDate", "System.String");
                for (int i = 0, loopTo = dt.Rows.Count - 1; i <= loopTo; i++)
                {
                    DateTime temp = Convert.ToDateTime(dt.Rows[i]["EnqDate"]);
                    dt.Rows[i]["TextEnqDate"] = temp.ToString("dd/MM/yyyy h:mm:ss tt");
                }
                var DtInfoTable = new DataTable();
                if (HttpContext.Session.GetString("infotable") is null)
                {
                    DtInfoTable = df1.GetDataFromSql(HttpContext.Session.GetString("serverdatabase"), "InfoTable", "*", "", "", "", "InfoType,NameOfInfo", clsinfotable.PrimaryKey);
                    HttpContext.Session.SetString("infotable", JsonConvert.SerializeObject(DtInfoTable));
                }
                else
                {
                   // DtInfoTable = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));
                }
                dt = df1.AddingNameForCodesPrimaryColsInfotable(dt, "BusinessType", "TextBusinessType", DtInfoTable, DtInfoTableuser , "NameOfInfo");
                var datatableData = new DataTypeConversionLib.DTResult<EnquiryViewModel>();
                datatableData = (DataTypeConversionLib.DTResult<EnquiryViewModel>)DCLib.ConvertDTtoModal<EnquiryViewModel>(dt, Convert.ToInt32(start), dt.Rows.Count, dt.Rows.Count);
                return Json(datatableData);
            }
            return Json("");
        }

        public ActionResult Enquiry()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services", HttpContext.Session.GetString("serverdatabase")))
                return View();

            return RedirectToAction("LogOut", "Home");
        }


        public FileResult Download(string FileName = "")
        {
            string FileName1 = FileName.ToString().Trim().ToLower();
            var filesCol = GetFiles();
            string CurrentFileName = (from fls in filesCol where fls.FileName == FileName1 select fls.FilePath).First();
            string contentType = string.Empty;
            if (CurrentFileName.Contains(".pdf"))
            {
                contentType = "application/pdf";
            }
            else if (CurrentFileName.Contains(".docx"))
            {
                contentType = "application/docx";
            }
            else if (CurrentFileName.Contains(".txt"))
            {
                contentType = "application/txt";
            }
            else if (CurrentFileName.Contains(".jpg") | CurrentFileName.Contains(".jpeg"))
            {
                contentType = "application/jpg";
            }
            else if (CurrentFileName.Contains(".png"))
            {
                contentType = "application/jpg";
            }
            else if (CurrentFileName.Contains(".epl"))
            {
                contentType = "application/txt";
            }
            else if (CurrentFileName.Contains(".csv") | CurrentFileName.Contains(".xls") | CurrentFileName.Contains(".xlsx"))
            {
                contentType = "application/xls";
            }


            //return File(CurrentFileName, contentType, FileName);
           
            var memory = new MemoryStream();
            using (var stream = new FileStream(CurrentFileName, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, contentType, FileName);
        }

        public List<DownloadFilesInfo> GetFiles()
        {
            var lstFiles = new List<DownloadFilesInfo>();
            // for gcp'
            string a = MyServer.MapPath("RegisterCallsFiles/");
            string b = a.Replace(@"crm.saralerp.com\", @"saralerp.com\");
            // Dim b = a
            // end
            var dirInfo = new DirectoryInfo(b);
            int i = 0;
            foreach (var item in dirInfo.GetFiles())
            {

                lstFiles.Add(new DownloadFilesInfo()
                {
                    FileId = i + 1,
                    FileName = item.Name.ToLower(),
                    FilePath = (dirInfo.FullName + @"\" + item.Name).ToLower()
                });
                i = i + 1;
            }
            return lstFiles;
        }

        [HttpPost()]
        public ActionResult GetTripReports(IFormCollection fc)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TripReport", HttpContext.Session.GetString("serverdatabase")))
            {
                var dt1 = new DataTable();
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string LoginType = "";
                int Loginkey;
                var argSessionInstance = SessionControl;
                var clswebsession = new WebSessions.WebSessions.WebSessions(ref argSessionInstance);
                SessionControl = argSessionInstance;
                if (sessionRow is not null)
                {
                    LoginType = sessionRow["linktype"].ToString() ?? "";
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                }
                else if (Request.Cookies["SessionKey"] is not null)
                {
                    //var cookie = Request.Cookies["SessionKey"];
                    string session_key = Request.Cookies["SessionKey"] ?? "" ; //cookie.Value;
                    object argClsObject = clswebsession;
                    string argSearchFieldName = "WebSessions_Key";
                    var mWebsessions = df1.SeekRecordTableClass(ref argClsObject, Convert.ToInt32(session_key), ref argSearchFieldName);
                    clswebsession = (WebSessions.WebSessions.WebSessions)argClsObject;
                    Loginkey =Convert.ToInt32(mWebsessions["linkcode"]);
                }

                string startdate = fc["FromDate"] + " 00:00:00";
                string enddate = fc["ToDate"] + " 23:59:59";
                string Subject = "";

                if (string.IsNullOrEmpty(fc["FromDate"]))
                {
                    TempData["Message"] = "Please Set Your Start Date.";
                    return RedirectToAction("TripReports");
                }

                if (string.IsNullOrEmpty(fc["ToDate"]))
                {
                    TempData["Message"] = "Please Set Your End Date.";
                    return RedirectToAction("TripReports");
                }
                if (Convert.ToDateTime(startdate) > Convert.ToDateTime(enddate) )
                {
                    TempData["Message"] = "Please Set correct Date Range.";
                    return RedirectToAction("TripReports");
                }
                else if (startdate == enddate )
                {
                    Subject = "Daily_Report: " + startdate.ToString();
                }
                else
                {
                    Subject = "Daily_Report: " + startdate.ToString() + " - " + enddate.ToString();
                }
                int empId = Convert.ToInt32(fc["EmployeeId"]);

                string EmailidText = MyServer.MapPath("App_Data/EmailList.Txt");
                string functionname = "SendCompTasks";
                string type = "Production".ToLower();
                var regCalls = new RegCalls();
                // Dim emailIds As String = regCalls.EmailidFromTxtFile(EmailidText, functionname, type)


                // Dim ReimbVisitMasterObj As New ReimbVisitMaster
                string Subject1 = "Reimbursement Details " + " " + fc["FromDate"] + " - " + fc["ToDate"];

                string Filename = "ReimbursementDetails.xlsx";
                string Excelfilename = "";
                // Dim FullFilename As String = GlobalControl.Variables.DataFolderServerPhysicalPath & "/Employees/ReimbReports/" & Filename
                string FullFilename = SessionControl.DataFolderServerPhysicalPath + "/Employees/ReimbReports/" + Filename;
                if (empId == 0)
                {
                    // Dim reimbdt As DataTable = ReimbVisitMasterObj.GetDataForReimbursement(startdate, enddate)
                    var reimbdt = libCalls.GetDataForReimbursement(startdate, enddate, SessionControl.UserServerDatabase);
                    Excelfilename = cfc1.ExportDataToExcel(reimbdt, FullFilename);
                    gflib.SendEmail("nehagupta@saralerp.com", Subject1, "", @"C:\cntr_dir\googleapiconfig.txt", FullFilePath: Excelfilename);
                }

                // GF2.SendingEmail("nehagupta@saralerp.com", Subject1, "", Excelfilename)
                // HomeController.SendingEmail("nehagupta@saralerp.com", Subject1, "", Excelfilename)
                else
                {
                    // Dim empimbdt As DataTable = ReimbVisitMasterObj.GetDataForReimbursement(startdate, enddate, empId)
                    var empimbdt = libCalls.GetDataForReimbursement(startdate, enddate, empId,SessionControl.UserServerDatabase);
                    Excelfilename = cfc1.ExportDataToExcel(empimbdt, FullFilename);
                    gflib.SendEmail("nehagupta@saralerp.com", Subject1, "", @"C:\cntr_dir\googleapiconfig.txt", FullFilePath: Excelfilename);

                    // HomeController.SendingEmail("nehagupta@saralerp.com", Subject1, "", Excelfilename)
                }
                return RedirectToAction("TripReports");
            }
            return Json("");
        }


        public FileResult GetTripReportsForEmployees(IFormCollection fc)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return null;

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TripEmployeeReport", HttpContext.Session.GetString("serverdatabase")))
            {
                var dt1 = new DataTable();
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string LoginType = "";
                int Loginkey;
                var argSessionInstance = SessionControl;
                var clswebsession = new WebSessions.WebSessions.WebSessions(ref argSessionInstance);
                SessionControl = argSessionInstance;
                if (sessionRow is not null)
                {
                    LoginType = sessionRow["linktype"].ToString() ?? "";
                    Loginkey =Convert.ToInt32(sessionRow["linkcode"]);
                }
                else if (Request.Cookies["SessionKey"] is not null)
                {
                    //var cookie = Request.Cookies["SessionKey"];
                    string session_key = Request.Cookies["SessionKey"] ?? "" ; //cookie.Value;
                    object argClsObject = clswebsession;
                    string argSearchFieldName = "";
                    var mWebsessions = df1.SeekRecordTableClass(ref argClsObject, Convert.ToInt32(session_key), SearchFieldName: ref argSearchFieldName);
                    clswebsession = (WebSessions.WebSessions.WebSessions)argClsObject;
                    Loginkey = Convert.ToInt32(mWebsessions["linkcode"]);
                    LoginType = mWebsessions["linktype"].ToString() ?? "";
                }
                else
                {
                    return null;
                }

                string startdate = fc["FromDate"] + " 00:00:00";
                string enddate = fc["ToDate"] + " 23:59:59";

                int empId = Loginkey;

                string Subject = "";

                if (string.IsNullOrEmpty(fc["FromDate"]))
                    TempData["Message"] = "Please Set Your Start Date.";


                if (string.IsNullOrEmpty(fc["ToDate"]))
                    TempData["Message"] = "Please Set Your End Date.";

                if (Convert.ToDateTime(startdate) > Convert.ToDateTime(enddate))
                {
                    TempData["Message"] = "Please Set correct Date Range.";
                }
                // Return RedirectToAction("TripReportsForEmployees")
                else if ((startdate  == enddate))
                {
                    Subject = "Daily_Report: " + startdate.ToString();
                }
                else
                {
                    Subject = "Daily_Report: " + startdate.ToString() + " - " + enddate.ToString();
                }


                string EmailidText = MyServer.MapPath("~/App_Data/EmailList.Txt");
                string functionname = "SendCompTasks";
                string type =("Production").ToLower() ;
                var regCalls = new RegCalls();

                // Dim ReimbVisitMasterObj As New ReimbVisitMaster
                string Filename = "ReimbursementDetails.xlsx";
                string Excelfilename = "";
                // Dim FullFilename As String = GlobalControl.Variables.DataFolderServerPhysicalPath & "~/Employees/ReimbReports/" & Filename
                string FullFilename = SessionControl.DataFolderServerPhysicalPath + "~/Employees/ReimbReports/" + Filename;
                string Subject1 = "Reimbursement Details " + " " + fc["FromDate"] + " - " + fc["ToDate"];
                // Dim empimbdt As DataTable = ReimbVisitMasterObj.GetDataForReimbursement(startdate, enddate, empId)
                var empimbdt = libCalls.GetDataForReimbursement(startdate, enddate, empId, SessionControl.UserServerDatabase);
                // Dim CRMControllerObj As New CRMController
                // Dim lstFiles As New List(Of DownloadFilesInfo)
                // Dim empimbdt As DataTable = objRegistration.GetDtForCustomerExcel(empimbdt)
                using (var wb = new XLWorkbook())
                {
                    wb.Worksheets.Add(empimbdt, "sheet1");
                    using (var Stream1 = new MemoryStream())
                    {
                        wb.SaveAs(Stream1);
                        return File(Stream1.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ReimbursementDetails.xlsx");
                    }
                }
            }
            return null;
        }

        [HttpGet()]
        public ActionResult TripReports()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TripReport", HttpContext.Session.GetString("serverdatabase")))
                return View();

            return RedirectToAction("LogOut", "Home");
        }

        public ActionResult TripReportsForEmployees()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TripEmployeeReport", HttpContext.Session.GetString("serverdatabase")))
                return View();

            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// to get collaborators of a call according to callid
        /// </summary>
        /// <param name="CallId">P_issuesfilegst of a call</param>
        /// <returns></returns>
        public JsonResult AddCallCollaboratorsData(int CallId, string calltype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "callcollaboraterdata", HttpContext.Session.GetString("serverdatabase")))
            {
                var CRMTasks = libCRMTasks.GetTasksRowFromLinkTypeLinkCode(calltype.ToString().Trim(), CallId,SessionControl.UserServerDatabase, "p_crmtasks");
                int P_CRMTasks = Convert.ToInt32(CRMTasks["P_CRMTasks"]);
                var dt = libCRMTasks.GetCollaboratorsOfATask(P_CRMTasks,SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, recordsTotal: dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        public JsonResult DeleteCollaborator(int? id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }


            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "deletecallcollaborator", HttpContext.Session.GetString("serverdatabase")))
            {
                int result = libCRMTasks.deleteCollaborator(Convert.ToInt32(id), SessionControl.UserServerDatabase);
                if (result > 0)
                {
                    return Json("Success");
                }
            }
            return Json("");
        }

        public ActionResult ManageCustomers()
        {
            // If Session("AuthKey") Is Nothing Or Session("AuthKey") = "" Then Return RedirectToAction("LogOut", "Home")
            // If libSaralAuth.IsAuthenticated(Session("AuthKey"), Session("ServerDatabase")) AndAlso libSaralAuth.IsAuthorized(Session("AuthKey"), "Customers", Session("ServerDatabase")) Then
            string a = TempData["Message"]?.ToString()?? "";
            ViewBag.filter = "By Name~CustName~string|By Allow Upto~AllowUpto~date";
            return View();
            // End If
            // Return RedirectToAction("LogOut", "Home")
        }

        [HttpGet]
        public ActionResult CustomerForm(string exitmode, int? id, string CalledFrom = "")
        {
            // If Session("AuthKey") Is Nothing Or Session("AuthKey") = "" Then Return RedirectToAction("LogOut", "Home")
            // If libSaralAuth.IsAuthenticated(Session("AuthKey")) AndAlso libSaralAuth.IsAuthorized(Session("AuthKey"), "Dealer") Then

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }


            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            int Loginkey;
            string LoginType = "";
            var argSessionInstance = SessionControl;
            var clswebsession = new WebSessions.WebSessions.WebSessions(ref argSessionInstance);
            SessionControl = argSessionInstance;
            if (sessionRow is not null)
            {
                Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                LoginType =sessionRow["linktype"].ToString();
            }
            else
            {
                return RedirectToAction("LogOut", "Home");
            }
            
            var CustomerObj = new CustomerMaster();
            var argSessionInstance1 = SessionControl;
            var ClsCustomers = new Customers.Customers.Customers(ref argSessionInstance1);
            SessionControl = argSessionInstance1;
            if (ModelState.IsValid)
            {
                // Fill customerMaster object according to a customer
                if (exitmode == "Edit" | exitmode == "Delete")
                {
                    CustomerObj.Customers_Key = Convert.ToInt32(id);
                    string lcondition = "RowStatus=0 and Customers_Key=" + id;
                    var dt = df1.GetDataFromSql(ClsCustomers.ServerDatabase, ClsCustomers.TableName, "*", "", lcondition, "", "");
                    ClsCustomers.PrevRow = df1.UpdateDataRows(ClsCustomers.PrevRow, dt.Rows[0]);

                    if (ClsCustomers.PrevRow["P_Customers"] is DBNull == false)
                    {
                        CustomerObj.P_Customers =Convert.ToInt32(ClsCustomers.PrevRow["P_Customers"]);
                    }
                    if (ClsCustomers.PrevRow["CustCode"] is DBNull == false)
                    {
                        CustomerObj.CustCode = ClsCustomers.PrevRow["CustCode"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["CustName"] is DBNull == false)
                    {
                        CustomerObj.CustName = ClsCustomers.PrevRow["CustName"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["Contactperson"] is DBNull == false)
                    {
                        CustomerObj.Contactperson = ClsCustomers.PrevRow["Contactperson"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["PostalAddress1"] is DBNull == false)
                    {
                        CustomerObj.PostalAddress1 = ClsCustomers.PrevRow["PostalAddress1"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["PostalAddress2"] is DBNull == false)
                    {
                        CustomerObj.PostalAddress2 = ClsCustomers.PrevRow["PostalAddress2"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["PostalAddress3"] is DBNull == false)
                    {
                        CustomerObj.PostalAddress3 = ClsCustomers.PrevRow["PostalAddress3"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["PostalAddress4"] is DBNull == false)
                    {
                        CustomerObj.PostalAddress4 = ClsCustomers.PrevRow["PostalAddress4"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["Pincode"] is DBNull == false)
                    {
                        CustomerObj.Pincode =ClsCustomers.PrevRow["Pincode"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["MobNo"] is DBNull == false)
                    {
                        CustomerObj.MobNo = ClsCustomers.PrevRow["MobNo"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["Phone"] is DBNull == false)
                    {
                        CustomerObj.Phone = ClsCustomers.PrevRow["Phone"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["Email"] is DBNull == false)
                    {
                        CustomerObj.Email = ClsCustomers.PrevRow["Email"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["HomeTown"] is DBNull == false)
                    {
                        if (Convert.ToInt32(ClsCustomers.PrevRow["Hometown"]) > 0)
                        {
                            // CustomerObj.HashHomeTown = GF1.AddItemToHashTable(CustomerObj.HashHomeTown, "HomeTown", ClsCustomers.PrevRow("HomeTown"))
                            // CustomerObj.HashHomeTown = GF1.AddItemToHashTable(CustomerObj.HashHomeTown, "NewRowFlag", False)
                            CustomerObj.HomeTown = Convert.ToInt32(ClsCustomers.PrevRow["Hometown"]);
                            // CustomerObj.TextHomeTown = ClsCustomers.PrevRow("TextHomeTown")

                            CustomerObj.TextHomeTown = cfc1.GetNameOfInfoFromInfotableFromP_infotable(Convert.ToInt32(df1.GetCellValue(ClsCustomers.PrevRow, "HomeTown", "integer")), SessionControl.UserServerDatabase);
                        }
                        else if (Convert.ToInt32(ClsCustomers.PrevRow["Hometown"])== -99)
                        {
                            CustomerObj.HomeTown = Convert.ToInt32(ClsCustomers.PrevRow["Hometown"]);
                            CustomerObj.TextHomeTown = "Not Available";
                        }

                    }
                    if (ClsCustomers.PrevRow["MainBussCode"] is DBNull == false)
                    {
                        CustomerObj.MainBussCode = Convert.ToInt32(ClsCustomers.PrevRow["MainBussCode"]);
                    }
                    if (ClsCustomers.PrevRow["ProductCode"] is DBNull == false)
                    {
                        CustomerObj.ProductCode = Convert.ToInt32(ClsCustomers.PrevRow["ProductCode"]);
                    }
                    if (ClsCustomers.PrevRow["EmpAssigned"] is DBNull == false)
                    {
                        CustomerObj.EmpAssigned = Convert.ToInt32(ClsCustomers.PrevRow["EmpAssigned"]);
                    }
                    if (ClsCustomers.PrevRow["CustomerStatus"] is DBNull == false)
                    {
                        CustomerObj.CustomerStatus = ClsCustomers.PrevRow["CustomerStatus"].ToString() ?? "";
                    }

                    if (ClsCustomers.PrevRow["ActivationDate"] is DBNull == false)
                    {
                        DateTime a = Convert.ToDateTime(ClsCustomers.PrevRow["ActivationDate"]);
                        CustomerObj.TxtActivationDate = a.ToString("yyyy-MM-dd");
                        CustomerObj.ActivationDate = Convert.ToDateTime(ClsCustomers.PrevRow["ActivationDate"]);
                    }
                    if (ClsCustomers.PrevRow["status"] is DBNull == false)
                    {
                        CustomerObj.status = Convert.ToInt32(ClsCustomers.PrevRow["status"]);
                    }
                    if (ClsCustomers.PrevRow["amcmonth"] is DBNull == false)
                    {
                        CustomerObj.amcmonth = ClsCustomers.PrevRow["amcmonth"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["website"] is DBNull == false)
                    {
                        CustomerObj.website = ClsCustomers.PrevRow["website"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["Facebookid"] is DBNull == false)
                    {
                        CustomerObj.Facebookid = ClsCustomers.PrevRow["Facebookid"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["Twitterid"] is DBNull == false)
                    {
                        CustomerObj.Twitterid =ClsCustomers.PrevRow["Twitterid"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["Linkedin"] is DBNull == false)
                    {
                        CustomerObj.Linkedin = ClsCustomers.PrevRow["Linkedin"].ToString() ?? "";
                    }
                    if (ClsCustomers.PrevRow["Industry"] is DBNull == false)
                    {
                        CustomerObj.Industry = Convert.ToInt32(ClsCustomers.PrevRow["Industry"]);
                    }
                    if (ClsCustomers.PrevRow["mtimestamp"] is DBNull == false)
                    {
                        CustomerObj.mtimestamp = Convert.ToDateTime(ClsCustomers.PrevRow["mtimestamp"]);
                    }
                    if (ClsCustomers.PrevRow["WebSessions_key"] is DBNull == false)
                    {
                        CustomerObj.WebSessions_key = Convert.ToInt32(ClsCustomers.PrevRow["WebSessions_key"]);
                    }
                    if (ClsCustomers.PrevRow["CustomerType"] is DBNull == false)
                    {
                        CustomerObj.CustomerType = Convert.ToInt32(ClsCustomers.PrevRow["CustomerType"]);
                    }
                    if (ClsCustomers.PrevRow["GSTIN"] is DBNull == false)
                    {
                        CustomerObj.GSTIN = ClsCustomers.PrevRow["GSTIN"].ToString() ?? "";
                    }

                }


               HttpContext.Session.SetString("calledfrom", CalledFrom);

            }
            return View(CustomerObj);
            // End If
            // Return RedirectToAction("LogOut", "Home")
        }


        [HttpPost()]
        [ValidateAntiForgeryToken()]
        public ActionResult CustomerForm(IFormCollection fc, CustomerMaster CustomerObj)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (ModelState.IsValid)
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey;
                string LoginType = "";

                if (sessionRow is not null)
                {
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                    LoginType = sessionRow["linktype"].ToString() ?? "";
                }
                else
                {
                    return RedirectToAction("LogOut", "Home");
                }

                DataRow? dtr = null;
                dtr = DCLib.GetDataRowFromModel<CustomerMaster>(CustomerObj);
                var dthash = new Hashtable();
                dthash = GF1.CreateHashTable(dtr);
                dthash = GF1.AddItemToHashTable(ref dthash, "source", 3067, true);


                // dthash = GF1.AddItemToHashTable(dthash, "IssueType", fc("IssueType"), True)
                // dthash = GF1.AddItemToHashTable(dthash, "Businesstype", fc("Buss"), True)
                // dthash = GF1.AddItemToHashTable(dthash, "status", 2732, True)
                // dthash = GF1.AddItemToHashTable(dthash, "RegisterDate", df1.getDateTimeISTNow(), True)
                // dthash = GF1.AddItemToHashTable(dthash, "registeredby", "E", True)
                // Dim clscustomers1 As New Customers.Customers.Customers

                if (!string.IsNullOrEmpty(fc["searchString"]))
                    dthash = GF1.AddItemToHashTable(ref dthash, "HomeTown", fc["homeTown"], true);

                int argid = CustomerObj.Customers_Key;
                int P_Customers = Convert.ToInt32(libcustomerfeature.InsertUpdateInCustomers(ref argid, ref dthash, sessionRow, SessionControl.UserServerDatabase)) ;//  Convert.ToInt32(InsertUpdateInCustomers(ref argid, ref dthash, sessionRow, SessionControl.UserServerDatabase)); //Aslam_hashtbale_check_done
                CustomerObj.Customers_Key = argid;

                if (P_Customers < 0)
                {
                    ModelState.AddModelError(0.ToString(), "An Error occured While storing your Information .Please Try again later.");
                    return View(CustomerObj);
                }
                else
                {
                    TempData["Message"] = "Customer is Edited Successfully";
                    return RedirectToAction("ManageCustomers");
                }
            }
            else
            {
                return View(CustomerObj);
            }
        }


        /// <summary>
        /// function to insert/update rows in Customers table
        /// </summary>
        /// <param name="id">-1 for insert and Customers_key for update</param>
        /// <param name="ChangedFieldsValuesPair">hashtable containing cgange values and columns</param>
        /// <param name="sessionrow">SessionRow of Current Loggedin user</param>
        /// <param name="serverdatabase">serverdatabase</param>
        /// <returns></returns>
        //public int InsertUpdateInCustomers(ref int id, ref Hashtable ChangedFieldsValuesPair, DataRow sessionrow, string serverdatabase)
        //{
        //    SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
        //    var argSessionInstance = SessionControl;
        //    var clsCustomers = new Customers.Customers.Customers(ref argSessionInstance);
        //    SessionControl = argSessionInstance;
        //    clsCustomers.ServerDatabase = serverdatabase;

        //    string seljt = "select * from Customers where Customers_Key=" + id + "";
        //    var dtJT = df1.SqlExecuteDataTable(serverdatabase, seljt);
        //    // THIS IS FOR UPDATING A ROW
        //    if (dtJT.Rows.Count > 0)
        //    {
        //        clsCustomers.PrevRow = df1.UpdateDataRows(clsCustomers.PrevRow, dtJT.Rows[0]);
        //        for (int k = 0, loopTo = ChangedFieldsValuesPair.Keys.Count - 1; k <= loopTo; k++)
        //        {
        //            if (clsCustomers.CurrDt.Columns.Contains(Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k))))
        //            {
        //                clsCustomers.CurrRow.Item(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)) = GF1.GetValueFromHashTable(ChangedFieldsValuesPair, Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)));
        //            }
        //        }
        //        clsCustomers.CurrRow["WebSessions_Key"] = sessionrow["WebSessions_Key"];
        //        clsCustomers.CurrRow["mtimestamp"] = df1.GetDateTimeISTNow();

        //        var clsobj = new object[] { clsCustomers };
        //        int kl = cfc1.SaveIntodbGetKey(clsobj, clsCustomers.TableName, "Customers_Key");
        //        return kl;
        //    }
        //    else
        //    {
        //        // To insert in a Employee Table
        //        for (int k = 0, loopTo1 = ChangedFieldsValuesPair.Keys.Count - 1; k <= loopTo1; k++)
        //        {
        //            if (clsCustomers.CurrDt.Columns.Contains(Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k))))
        //            {
        //                clsCustomers.CurrRow.Item(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)) = GF1.GetValueFromHashTable(ChangedFieldsValuesPair, Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)));
        //            }
        //        }
        //        clsCustomers.CurrRow["WebSessions_Key"] = sessionrow["WebSessions_Key"];
        //        clsCustomers.CurrRow["mtimestamp"] = df1.GetDateTimeISTNow();

        //        var clsobj = new object[] { clsCustomers };
        //        int kl = cfc1.SaveIntodbGetKey(clsobj, clsCustomers.TableName, "Customers_Key");
        //        return kl;
        //    }
        //}

        /// <summary>
        /// Creates the sort/order string which is used in paging method in grid
        /// </summary>
        /// <param name="orderString">string in the format-OrderofcolumnOnGrid:Columnname:asc/desc</param>
        /// <returns></returns>
        public string GetSortStringFromFrontEndForCustomer(string orderString = "", string SortCondition = "")
        {
            if (!string.IsNullOrEmpty(SortCondition))
            {
                SortCondition = SortCondition + ",";
            }
            string[] id2;
            id2 = orderString.Split(":");

            // Dim view As New DataView(Obj.RegCallsDt) 'Put your original dataset into a dataview
            if (id2[1] == "Contactperson")
            {
                if (id2[2] == "asc")
                {
                    SortCondition += "Contactperson ASC"; // Sort your data view
                }
                else if (id2[2] == "desc")
                {
                    SortCondition += "Contactperson DESC"; // Sort your data view
                }
            }
            else if (id2[1] == "Creationdate")
            {
                // view.Sort = "Creationdate"
                if (id2[2] == "asc")
                {
                    SortCondition += "Creationdate ASC"; // 
                }
                else if (id2[2] == "desc")
                {
                    SortCondition += "Creationdate DESC"; // 
                }
            }
            else if (id2[1] == "Firmname")
            {
                // view.Sort = "Firmname"
                if (id2[2] == "asc")
                {
                    SortCondition += "Firmname ASC"; // 
                }
                else if (id2[2] == "desc")
                {
                    SortCondition += "Firmname DESC"; // 
                }
            }
            else if (id2[1] == "Location")
            {
                // view.Sort = "Location"
                if (id2[2] == "asc")
                {
                    SortCondition += "Location ASC"; // 
                }
                else if (id2[2] == "desc")
                {
                    SortCondition += "Location DESC"; // 
                }
            }
            else if (id2[1] == "Callid")
            {
                // view.Sort = "Callid"
                if (id2[2] == "asc")
                {
                    SortCondition += "P_AllCallsReg ASC"; // 
                }
                else if (id2[2] == "desc")
                {
                    SortCondition += "P_AllCallsReg DESC"; // 
                }
            }
            return SortCondition;
        }


        public JsonResult ajaxGetCustomerData(int? start, int pSize = 20, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json(""); // ("LogOut", "Home")
            
           
            // Dim SortCondition As String = "CustName asc,ActivationDate desc"
            string SortCondition = "Customers_key asc";
            string lcondition ="EmpAssigned=" + Convert.ToInt32(sessionRow["LinkCode"]);

            string condition = GetSearchStringForManageCustomers(search, lcondition, SessionControl.UserServerDatabase);
            int a = getRowsCountManageCustomers(condition, SessionControl.UserServerDatabase);

            if (Convert.ToInt32(start) == 1)
                start = 0;

            var dt = getManageCustomersDataGrid(Convert.ToInt32(start), DtInfoTable , SessionControl.UserServerDatabase, condition, SortCondition, pSize);
            string lorder = "CustName";
            var objdatatableToList = new DataTypeConversionLib.DTResult<CustomerMaster>();
            objdatatableToList = (DataTypeConversionLib.DTResult<CustomerMaster>)DCLib.ConvertDTtoModal<CustomerMaster>(dt, Convert.ToInt32(start), a, dt.Rows.Count);
            return Json(objdatatableToList);
        }


        /// <summary>
        /// get pending registered calls data 
        /// </summary>
        /// <param name="start"></param>
        /// <param name="dtinfotable"></param>
        /// <param name="serverdatabase"></param>
        /// <param name="lcondition"></param>
        /// <param name="lOrder"></param>
        /// <param name="psize"></param>
        /// <returns></returns>
        public DataTable getManageCustomersDataGrid(int start, DataTable dtinfotable, string serverdatabase, string lcondition = "", string lOrder = "", int psize = 20)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var argSessionInstance = SessionControl;
            var clsCustomers = new Customers.Customers.Customers(ref argSessionInstance);
            SessionControl = argSessionInstance;
            var dt = new DataTable();
            // lcondition = "Rowstatus=0 and " & lcondition
            string argServerDataBase = clsCustomers.ServerDatabase;
            string argLtable = clsCustomers.TableName;
            string argLfieldList = "*";
            string argLJoinStmt = "";
            string argLfilter = "";
            int argTotalRows = -1;
            dt = df1.GetDataFromSqlFixedRows(ref argServerDataBase, ref argLtable, ref argLfieldList, ref argLJoinStmt, ref lcondition, ref argLfilter, ref lOrder, ref start, psize, ref argTotalRows);
            clsCustomers.ServerDatabase = argServerDataBase;
            dt = df1.AddingNameForCodesPrimaryColsInfotable(dt, "MainBussCode,ProductCode,HomeTown", "TextMainBussCode,TextProductCode,TextHomeTown", dtinfotable, DtInfoTableuser , "NameOfInfo");
            df1.AddColumnsInDataTable(ref dt, "TxtActivationDate", "System.String");
            for (int i = 0, loopTo = dt.Rows.Count - 1; i <= loopTo; i++)
            {
                DateTime a = Convert.ToDateTime(dt.Rows[i]["ActivationDate"]);
                dt.Rows[i]["TxtActivationDate"] = a.ToString("dd-MM-yyyy");
            }
            return dt;
        }

        /// <summary>
        /// Creates the search string which is used in paging method in grid
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public string GetSearchStringForManageCustomers(string Search, string lcondition, string serverdatabase)
        {

            string searchColumn = "";
            if (!string.IsNullOrEmpty(Search))
            {
                var search2 = Search.Split(':');
                var search1 = search2[0].Split(',');
                if (search1.Length == 2)
                    searchColumn = search1[1];
                else
                    searchColumn = search1[2];
                if (search2[1] == "date")
                {
                    if (!string.IsNullOrEmpty(search1[0]) & !string.IsNullOrEmpty(search1[1]))
                    {
                        DateTime min = Convert.ToDateTime(search1[0]);
                        DateTime max = Convert.ToDateTime(search1[1]);
                        lcondition = lcondition + " and " + searchColumn + " between '" + min.ToString("yyyy-MM-dd 00:00:00.000") + "' and '" + max.ToString("yyyy-MM-dd 23:59:59.000") + "'";
                    }
                    else if (string.IsNullOrEmpty(search1[0]) & !string.IsNullOrEmpty(search1[1]))
                    {
                        DateTime max = Convert.ToDateTime(search1[1]);
                        lcondition = lcondition + " and " + searchColumn + "<='" + max.ToString("MM-dd-yyyy") + "'";
                    }
                    else if (!string.IsNullOrEmpty(search1[0]) & string.IsNullOrEmpty(search1[1]))
                    {
                        DateTime min = Convert.ToDateTime(search1[0]);
                        lcondition = lcondition + " and " + searchColumn + " >= '" + min.ToString("MM-dd-yyyy") + "'";
                    }
                    else if (string.IsNullOrEmpty(search1[0]) & string.IsNullOrEmpty(search1[1]))
                    {
                    }
                }
                else if (search2[1] == "string")
                {
                    // Dim search1 = search2(0).Split(",")
                    string searchValue = search1[0].ToLower();
                    // Dim searchColumn As String = search1(1)
                    lcondition = lcondition + " and " + searchColumn + " Like '" + searchValue + "%'";
                }
                else if (search2[1] == "integer")
                {
                    // Dim search1 = search2(0).Split(",")
                    string searchValue = search1[0];
                    // Dim searchColumn As String = search1(1)
                    lcondition = lcondition + " and " + searchColumn + " = " + searchValue;
                }
            }
            return lcondition;
        }

        /// <summary>
        /// get total Customers's rows count 
        /// </summary>
        /// <param name="lcondition"></param>
        /// <param name="serverdatabase"></param>
        /// <returns></returns>
        public int getRowsCountManageCustomers(string lcondition, string serverdatabase)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return 0;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (!string.IsNullOrEmpty(lcondition))
                lcondition = "and " + lcondition;
            string query = string.Format("select count(*) as RCount from Customers where RowStatus=0 " + lcondition);
            var dt = df1.SqlExecuteDataTable(serverdatabase, query);
            return Convert.ToInt32(dt.Rows[0]["RCount"]);
        }


        public ActionResult ContactsForm(string exitmode, int? id)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "contactform", HttpContext.Session.GetString("serverdatabase")))
            {
                var ContactsObj = new CRMContactsViewModel();
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string LoginType = "";
                int Loginkey;
                var argSessionInstance = SessionControl;
                var clswebsession = new WebSessions.WebSessions.WebSessions(ref argSessionInstance);
                SessionControl = argSessionInstance;
                if (sessionRow is not null)
                {
                    LoginType = sessionRow["Linktype"].ToString()?? "";
                    Loginkey = Convert.ToInt32(sessionRow["Linkcode"]);
                }
                if (ModelState.IsValid)
                {
                    var argSessionInstance1 = SessionControl;
                    var ClsCRMContacts = new CRMContacts.CRMContacts.CRMContacts(ref argSessionInstance1);
                    SessionControl = argSessionInstance1;
                    // Fill AccountsForm object according to a Account Record
                    if (exitmode == "Edit" | exitmode == "Delete")
                    {
                        ContactsObj.CRMContacts_Key = Convert.ToInt32(id);
                        ClsCRMContacts.PrevRow = df1.UpdateDataRows(ClsCRMContacts.PrevRow, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("crmcontacts")).Rows.Find(id));
                        // ClsCRMContacts.PrevRow = Session("CRMContacts").Rows.Find(id)
                        if (ClsCRMContacts.PrevRow["P_CRMContacts"] is DBNull == false)
                        {
                            ContactsObj.P_CRMContacts = Convert.ToInt32(ClsCRMContacts.PrevRow["P_CRMContacts"]);
                        }

                        if (ClsCRMContacts.PrevRow["LinkCode"] is DBNull == false)
                        {
                            ContactsObj.LinkCode = Convert.ToInt32(ClsCRMContacts.PrevRow["LinkCode"]);
                        }
                        if (ClsCRMContacts.PrevRow["LinkTableCode"] is DBNull == false)
                        {
                            ContactsObj.LinkTableCode = ClsCRMContacts.PrevRow["LinkTableCode"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["Fullname"] is DBNull == false)
                        {
                            ContactsObj.Fullname = ClsCRMContacts.PrevRow["Fullname"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["JobTitle"] is DBNull == false)
                        {
                            ContactsObj.JobTitle = Convert.ToInt32(ClsCRMContacts.PrevRow["JobTitle"]);
                        }

                        if (ClsCRMContacts.PrevRow["Email"] is DBNull == false)
                        {
                            ContactsObj.Email = ClsCRMContacts.PrevRow["Email"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["BusinessPhone"] is DBNull == false)
                        {
                            ContactsObj.BusinessPhone = ClsCRMContacts.PrevRow["BusinessPhone"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["MobilePhone"] is DBNull == false)
                        {
                            ContactsObj.MobilePhone = ClsCRMContacts.PrevRow["MobilePhone"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["Address1"] is DBNull == false)
                        {
                            ContactsObj.Address1 = ClsCRMContacts.PrevRow["Address1"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["Address2"] is DBNull == false)
                        {
                            ContactsObj.Address2 = ClsCRMContacts.PrevRow["Address2"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["ContactMethod"] is DBNull == false)
                        {
                            ContactsObj.ContactMethod = Convert.ToInt32(ClsCRMContacts.PrevRow["ContactMethod"]);
                        }
                        if (ClsCRMContacts.PrevRow["Hometown"] is DBNull == false)
                        {
                            if (Convert.ToInt32(ClsCRMContacts.PrevRow["Hometown"])> 0)
                            {
                                var argHashTableControl = ContactsObj.HashHometown;
                                ContactsObj.HashHometown = GF1.AddItemToHashTable(ref argHashTableControl, "HomeTown", ClsCRMContacts.PrevRow["HomeTown"]);
                                
                                var argHashTableControl1 = ContactsObj.HashHometown;
                                ContactsObj.HashHometown = GF1.AddItemToHashTable(ref argHashTableControl1, "NewRowFlag", false);

                                ContactsObj.Hometown = Convert.ToInt32(ClsCRMContacts.PrevRow["Hometown"]);
                                // CustomerObj.TextHomeTown = ClsCustomers.PrevRow("TextHomeTown")

                              //  var argLDataTable = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));
                                DataRow CRow = df1.FindRowByPrimaryCols(ref DtInfoTableuser , ContactsObj.HashHometown["hometown"]);
                                ContactsObj.TextHomeTown = CRow["NameOfInfo"].ToString()?.Trim() ?? "";
                            }
                            else if (Convert.ToInt32(ClsCRMContacts.PrevRow["Hometown"])== -99)
                            {
                                ContactsObj.Hometown = Convert.ToInt32(ClsCRMContacts.PrevRow["Hometown"]);
                                ContactsObj.TextHomeTown = "Not Available";
                            }

                        }
                        if (ClsCRMContacts.PrevRow["Facebook"] is DBNull == false)
                        {
                            ContactsObj.Facebook = ClsCRMContacts.PrevRow["Facebook"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["Twitter"] is DBNull == false)
                        {
                            ContactsObj.Twitter = ClsCRMContacts.PrevRow["Twitter"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["Linkedin"] is DBNull == false)
                        {
                            ContactsObj.Linkedin = ClsCRMContacts.PrevRow["Linkedin"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["MaritalStatus"] is DBNull == false)
                        {
                            ContactsObj.MaritalStatus = Convert.ToInt32(ClsCRMContacts.PrevRow["MaritalStatus"]);
                        }
                        if (ClsCRMContacts.PrevRow["Spouse"] is DBNull == false)
                        {
                            ContactsObj.Spouse = ClsCRMContacts.PrevRow["Spouse"].ToString() ?? "";
                        }
                        if (ClsCRMContacts.PrevRow["Birthday"] is DBNull == false)
                        {
                            DateTime a = Convert.ToDateTime(ClsCRMContacts.PrevRow["Birthday"]);
                            ContactsObj.Birthday = a.ToString("yyyy-MM-dd");
                        }
                        if (ClsCRMContacts.PrevRow["Anniversary"] is DBNull == false)
                        {
                            DateTime a = Convert.ToDateTime(ClsCRMContacts.PrevRow["Anniversary"]);
                            ContactsObj.Anniversary = a.ToString("yyyy-MM-dd");
                        }
                        if (ClsCRMContacts.PrevRow["Personalnotes"] is DBNull == false)
                        {
                            ContactsObj.Personalnotes = ClsCRMContacts.PrevRow["Personalnotes"].ToString() ?? "";
                        }
                    }
                }
                // Session("ClsCRMContacts") = ClsCRMContacts
                return View(ContactsObj);
            }
            return RedirectToAction("LogOut", "Home");
        }

        [HttpPost]
        public ActionResult ContactsForm(IFormCollection fc, CRMContactsViewModel ContactObj)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "contactform", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string LoginType = "";
                int Loginkey;
                var argSessionInstance = SessionControl;
                var clswebsession = new WebSessions.WebSessions.WebSessions(ref argSessionInstance);
                SessionControl = argSessionInstance;
                if (sessionRow is not null)
                {
                    LoginType = sessionRow["Linktype"].ToString() ?? "";
                    Loginkey = Convert.ToInt32(sessionRow["Linkcode"]);
                }
                else if (Request.Cookies["SessionKey"] is not null)
                {
                    //var cookie = Request.Cookies["SessionKey"];
                    string session_key = Request.Cookies["SessionKey"]?.ToString() ?? "" ;  //cookie.Value;
                    object argClsObject = clswebsession;
                    string argSearchFieldName = "";
                    var mWebsessions = df1.SeekRecordTableClass(ref argClsObject, Convert.ToInt32(session_key), SearchFieldName: ref argSearchFieldName);
                    clswebsession = (WebSessions.WebSessions.WebSessions)argClsObject;
                    Loginkey = Convert.ToInt32(mWebsessions["linkcode"]);
                    LoginType = mWebsessions["linktype"].ToString() ?? "";
                }
                if (ModelState.IsValid)
                {
                    var hashContactMethod = new Hashtable();
                    var hashJobTitle = new Hashtable();
                    var HashHomeTown = new Hashtable();
                    // Code to populate Hashtable of hometown column from formcollection according to values.
                    // If fc("AddHomeTown") = "-1" Then
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "NewRowFlag", True)
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "HomeTown", fc("AddHomeTown"))
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "HomeTownText", fc("AddOtherHomeTown"))
                    // If fc("AddCountry") = "-1" Then
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "Country", fc("AddCountry"))
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "CountryText", fc("AddOtherCountry"))
                    // Else
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "Country", fc("AddCountry"))
                    // End If
                    // If fc("AddState") = "-1" Then
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "State", fc("AddState"))
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "StateText", fc("AddOtherState"))
                    // Else
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "State", fc("AddState"))
                    // End If
                    // If fc("AddDistrict") = "-1" Then
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "District", fc("AddDistrict"))
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "DistrictText", fc("AddOtherDistrict"))
                    // Else
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "District", fc("AddDistrict"))
                    // End If
                    // ContactObj.HashHometown = HashHomeTown
                    // Else
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "NewRowFlag", False)
                    // HashHomeTown = GF1.AddItemToHashTable(HashHomeTown, "HomeTown", fc("AddHomeTown"))
                    // ContactObj.Hometown = fc("AddHomeTown")
                    // ContactObj.HashHometown = HashHomeTown
                    // End If
                    // Code to populate Hashtable of MainBussCode column from formcollection according to values.
                    // If fc("ContactMethod") = "-1" And fc("ContactMethod") <> Nothing Then
                    // hashContactMethod = GF1.AddItemToHashTable(hashContactMethod, "NewRowFlag", True)
                    // hashContactMethod = GF1.AddItemToHashTable(hashContactMethod, "NameOfInfo", fc("OtherContactMethod"))
                    // hashContactMethod = GF1.AddItemToHashTable(hashContactMethod, "Verified", "N")
                    // hashContactMethod = GF1.AddItemToHashTable(hashContactMethod, "GeneratedBy", "U")
                    // hashContactMethod = GF1.AddItemToHashTable(hashContactMethod, "under", 0)
                    // hashContactMethod = GF1.AddItemToHashTable(hashContactMethod, "InfoType", "8")
                    // hashContactMethod = GF1.AddItemToHashTable(hashContactMethod, "RowStatus", 0)
                    // ContactObj.HashContactMethod = hashContactMethod
                    // Else
                    // ContactObj.ContactMethod = fc("ContactMethod")
                    // End If
                    // If fc("JobTitle") = "-1" And fc("JobTitle") <> Nothing Then
                    // hashJobTitle = GF1.AddItemToHashTable(hashJobTitle, "NewRowFlag", True)
                    // hashJobTitle = GF1.AddItemToHashTable(hashJobTitle, "NameOfInfo", fc("OtherJobTitle"))
                    // hashJobTitle = GF1.AddItemToHashTable(hashJobTitle, "Verified", "N")
                    // hashJobTitle = GF1.AddItemToHashTable(hashJobTitle, "GeneratedBy", "U")
                    // hashJobTitle = GF1.AddItemToHashTable(hashJobTitle, "under", 0)
                    // hashJobTitle = GF1.AddItemToHashTable(hashJobTitle, "infotype", "P")
                    // hashJobTitle = GF1.AddItemToHashTable(hashJobTitle, "RowStatus", 0)
                    // ContactObj.HashJobTitle = hashJobTitle
                    // Else
                    // ContactObj.JobTitle = fc("JobTitle")
                    // End If
                    // ContactObj.AccountName = fc("AccountName")
                    // ContactObj.MaritalStatus = fc("MaritalStatus")

                    TempData["ContactObj"] = ContactObj;
                    return Redirect(Url.Action("SubmitContactForm"));
                }
                else
                {
                    return View(ContactObj);
                }
                return View(ContactObj);
            }
            return RedirectToAction("LogOut", "Home");
        }

        public ActionResult SubmitContactForm()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "contactform", HttpContext.Session.GetString("serverdatabase")))
            {
                var ContactObj = new CRMContactsViewModel();
                ContactObj = (CRMContactsViewModel)TempData["ContactObj"];
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string LoginType = "";
                int Loginkey;
                var argSessionInstance = SessionControl;
                var clswebsession = new WebSessions.WebSessions.WebSessions(ref argSessionInstance);
                SessionControl = argSessionInstance;
                if (sessionRow is not null)
                {
                    LoginType = sessionRow["linktype"].ToString() ?? "";
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                }
                else if (Request.Cookies["SessionKey"] is not null)
                {
                    //var cookie = Request.Cookies["SessionKey"];
                    string session_key = Request.Cookies["SessionKey"] ?? "" ; //cookie.Value;
                    object argClsObject = clswebsession;
                    string argSearchFieldName = "";
                    var mWebsessions = df1.SeekRecordTableClass(ref argClsObject, Convert.ToInt32(session_key), SearchFieldName: ref argSearchFieldName);
                    clswebsession = (WebSessions.WebSessions.WebSessions)argClsObject;
                    Loginkey = Convert.ToInt32(mWebsessions["linkcode"]);
                    LoginType = mWebsessions["linktype"].ToString()?? "";
                }
                var HashPublicValues = new Hashtable();
                // assigning values from form to currentRow of respective classes'
                var argSessionInstance1 = SessionControl;
                var ClsCRMContacts1 = new CRMContacts.CRMContacts.CRMContacts(ref argSessionInstance1);
                SessionControl = argSessionInstance1;
                //ClsCRMContacts1 = (CRMContacts.CRMContacts.CRMContacts)Session["ClsCRMContacts"];
                ClsCRMContacts1.TableType = "H";

                if (ContactObj?.Hometown != -1)
                {
                    ClsCRMContacts1.CurrRow["Hometown"] = ContactObj?.Hometown;
                }
                else if (ContactObj.Hometown == -1)
                {
                    if (ContactObj.HashHometown.Count != 0)
                    {
                        ClsCRMContacts1.CurrRow["HashHometown"] = ContactObj.HashHometown;
                    }
                }
                if (ContactObj?.JobTitle != -1)
                {
                    ClsCRMContacts1.CurrRow["JobTitle"] = ContactObj?.JobTitle;
                }
                else if (ContactObj.JobTitle == -1)
                {
                    if (ContactObj.HashJobTitle.Count != 0)
                    {
                        ClsCRMContacts1.CurrRow["HashJobTitle"] = ContactObj.HashJobTitle;
                    }
                }
                if (ContactObj?.ContactMethod !=-1)
                {
                    ClsCRMContacts1.CurrRow["ContactMethod"] = ContactObj?.ContactMethod;
                }
                else if (ContactObj.ContactMethod == -1)
                {
                    if (ContactObj.HashContactMethod.Count != 0)
                    {
                        ClsCRMContacts1.CurrRow["HashContactMethod"] = ContactObj.HashContactMethod;
                    }
                }

                // ClsCRMContacts1.CurrRow("LinkCode") = Loginkey
                ClsCRMContacts1.CurrRow["Fullname"] = ContactObj?.Fullname;
                // ClsCRMContacts1.CurrRow("LinkTableCode") = "D"
                ClsCRMContacts1.CurrRow["Email"] = ContactObj?.Email;
                ClsCRMContacts1.CurrRow["BusinessPhone"] = ContactObj?.BusinessPhone;
                ClsCRMContacts1.CurrRow["MobilePhone"] = ContactObj?.MobilePhone;
                ClsCRMContacts1.CurrRow["Address1"] = ContactObj?.Address1;
                ClsCRMContacts1.CurrRow["Address2"] = ContactObj?.Address2;
                ClsCRMContacts1.CurrRow["Facebook"] = ContactObj?.Facebook;
                ClsCRMContacts1.CurrRow["Twitter"] = ContactObj?.Twitter;
                ClsCRMContacts1.CurrRow["Linkedin"] = ContactObj?.Linkedin;
                ClsCRMContacts1.CurrRow["MaritalStatus"] = ContactObj?.MaritalStatus;
                ClsCRMContacts1.CurrRow["Spouse"] = ContactObj?.Spouse;
                if (ContactObj?.Birthday is not null)
                    ClsCRMContacts1.CurrRow["Birthday"] = ContactObj?.Birthday;
                if (ContactObj?.Anniversary is not null)
                    ClsCRMContacts1.CurrRow["Anniversary"] = ContactObj?.Anniversary;
                ClsCRMContacts1.CurrRow["Personalnotes"] = ContactObj?.Personalnotes;


                var argSessionInstance2 = SessionControl;
                var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance2);
                SessionControl = argSessionInstance2;
                var argSessionInstance3 = SessionControl;
                var ClsUserLogin = new UserLogin.UserLogin.UserLogin(ref argSessionInstance3);
                SessionControl = argSessionInstance3;
                // DataTable of grid has been already associated in gridcontrols
                var aClsObject = new object[] { ClsCRMContacts1, ClsUserLogin, clsinfotable };
                // Dim aClsObject() As Object = {ClsCRMContacts1, ClsInfoTable}
                string mserverdb = df1.GetServerMDFForTransanction(aClsObject);
                var mytrans = df1.BeginTransaction(mserverdb);
                var aLastKeysValues = new Hashtable();
                aClsObject = df1.SetKeyValueIfNewInsert(ref mytrans, ref aClsObject);
                try
                {
                    bool sqlexec = df1.CheckTableClassUpdations(ref aClsObject);
                    aClsObject = df1.LastKeysPlus(ref mytrans, aClsObject, ref aLastKeysValues);
                    // HashPublicValues = GF1.AddItemToHashTable(HashPublicValues, "mTypeCode", "D")
                    aClsObject = df1.SetFinalFieldsValues(ref aClsObject, HashPublicValues);
                    // database CRUD logic

                    if (sqlexec == true)
                    {
                        var jk = default(int);
                        jk = df1.InsertUpdateDeleteSqlTables(ref mytrans, aClsObject, ref jk);
                        mytrans.Commit();
                        // Dim DtInfoTable As DataTable = df1.GetDataFromSql(Session("serverdatabase"), "", "", "InfoType,NameOfInfo")
                        // Dim DtInfoTable As DataTable = df1.GetDataFromSql(Session("serverdatabase"), "InfoTable", "*", "", "", "", "InfoType,NameOfInfo", "*", clsinfotable.PrimaryKey) 
                        DataTable DtInfoTable = df1.GetDataFromSql(HttpContext.Session.GetString("serverdatabase"), "InfoTable", "*", "", "", "", "InfoType,NameOfInfo", clsinfotable.PrimaryKey);
                        HttpContext.Session.SetString("infotable", JsonConvert.SerializeObject(DtInfoTable));
                    }
                }
                catch (Exception ex)
                {
                    mytrans.Rollback();
                   HttpContext.Session.Clear();
                    // TempData("error") = df1.QuitError(ex, Err, ErrorToString)   'commented by aslam
                    return RedirectToAction("Error1");
                   
                    ModelState.AddModelError(0.ToString(), "An error occured while storing your Information .Please try again later.");
                    return View(ContactObj);
                }
                mytrans.Dispose();
                HttpContext.Session.Remove("exitmode");
                HttpContext. Session.Remove("clscrmcontacts");
                HttpContext.Session.Remove("id");
                return RedirectToAction("ManageContacts");
            }
            return RedirectToAction("LogOut", "Home");
        }

        [HttpGet]
        public ActionResult TaskFileView()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TaskFileView", HttpContext.Session.GetString("serverdatabase")))
                return View();

            return RedirectToAction("LogOut", "Home");
        }

        // //Manage Account grid related Functions
        public ActionResult ManageAccounts()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManageAccounts", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string LoginType = "";
                int Loginkey;
                var argSessionInstance = SessionControl;
                var clswebsession = new WebSessions.WebSessions.WebSessions(ref argSessionInstance);
                SessionControl = argSessionInstance;
                if (sessionRow is not null)
                {
                    LoginType =sessionRow["linktype"].ToString() ?? "";
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                }
                ViewBag.Message = "By Name~AccountName~string|By Email~Email~string|By Website~Website~string";
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }


        public JsonResult AjaxAccountData(int? id, int? start, int pSize = 20, string direction = "F", string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManageAccounts", HttpContext.Session.GetString("serverdatabase")))
            {
                var AccountsObj = new CRMAccountsViewModel();
                string lcondition = "RowStatus=0";
                string lorder = "AccountName";
                int StartNo = Convert.ToInt32(start);
                var dt = new DataTable();
                var startpnt = new Hashtable();
                var argSessionInstance = SessionControl;
                var clscrmaccounts = new CRMAccounts.CRMAccounts.CRMAccounts(ref argSessionInstance);
                SessionControl = argSessionInstance;
                startpnt.Add(clscrmaccounts.PrimaryKey, "col0");
                startpnt.Add(id, "col1");
                startpnt.Add(ServerOrderValue, "col2");
                if (!string.IsNullOrEmpty(search))
                {
                    lcondition = cfc1.GetSearchStringFromFrontEnd(search, lcondition);
                }
                if (!string.IsNullOrEmpty(order) )
                {
                    var order1 = order.Split('~');
                    string OrderDir = order1[2].ToLower();
                    string OrderColumn = order1[0];
                    string OrderValue = order1[1].ToLower();
                    // lorder = OrderColumn & " " & OrderDir
                    lorder = OrderColumn;
                    startpnt.Remove("col2");
                    startpnt.Add(OrderValue, "col2");
                }
                int sortColumn = -1;
                string sortDirection = "asc";
                // 'Commented by aslam
                // AccountsObj.CRMAccountsDT = df1.GetDataFixedRows(clscrmaccounts.ServerDatabase, clscrmaccounts.TableName, clscrmaccounts.AllFields, "", lcondition, "", lorder, pSize, startpnt, direction, -1, -1)
                string argServerDataBase = clscrmaccounts.ServerDatabase;
                string argLtable = clscrmaccounts.TableName;
                string argLfieldList = clscrmaccounts.AllFields;
                string argLJoinStmt = "";
                string argLfilter = "";
                int argStartRowPostion = Convert.ToInt32(start);
                int argTotalRows = -1;
                AccountsObj.CRMAccountsDT = df1.GetDataFromSqlFixedRows(ref argServerDataBase, ref argLtable, ref argLfieldList, ref argLJoinStmt, ref lcondition, ref argLfilter, ref lorder, ref argStartRowPostion, pSize, ref argTotalRows);
                clscrmaccounts.ServerDatabase = argServerDataBase;
                start = argStartRowPostion;
                int a = df1.RowsCount(clscrmaccounts.ServerDatabase, clscrmaccounts.TableName, lcondition, lorder);

                var argSessionInstance1 = SessionControl;
                var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance1);
                SessionControl = argSessionInstance1;
              //  var DtInfoTable = new DataTable();
                if (HttpContext.Session.GetString("infotable") is null)
                {
                    // DtInfoTable = df1.GetDataFromSql(Session("serverdatabase"), "InfoTable", "*", "", "", "", "InfoType,NameOfInfo", "*", clsinfotable.PrimaryKey)
                 //   DtInfoTable = df1.GetDataFromSql(HttpContext.Session.GetString("serverdatabase"), "InfoTable", "*", "", "", "", "InfoType,NameOfInfo", clsinfotable.PrimaryKey);
                   // HttpContext.Session.SetString("infotable", JsonConvert.SerializeObject(DtInfoTable));
                }
                else
                {
                 //   DtInfoTable = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));
                }
                HttpContext.Session.SetString("crmaccounts", JsonConvert.SerializeObject(AccountsObj.CRMAccountsDT));
                var objdatatableToList = new DataTypeConversionLib.DTResult<AccountsMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<AccountsMaster>)DCLib.ConvertDTtoModal<AccountsMaster>(AccountsObj.CRMAccountsDT);

                objdatatableToList.draw = (int)start;
                objdatatableToList.recordsTotal = a;

                return Json(objdatatableToList);
            }
            return Json("");

        }


        // //ManageContacts Grid Related Functions
        public ActionResult ManageContacts()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManageContacts", HttpContext.Session.GetString("serverdatabase")))
            {
                ViewBag.Message = "By Name~Fullname~string|By Email~Email~string";
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        public JsonResult AjaxContactsData(int? id, int? start, int pSize = 20, string direction = "F", string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManageContacts", HttpContext.Session.GetString("serverdatabase")))
            {
                var argSessionInstance = SessionControl;
                var ClsCRMContacts = new CRMContacts.CRMContacts.CRMContacts(ref argSessionInstance);
                SessionControl = argSessionInstance;
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string LoginType = "";
                int Loginkey;
                var argSessionInstance1 = SessionControl;
                var clswebsession = new WebSessions.WebSessions.WebSessions(ref argSessionInstance1);
                SessionControl = argSessionInstance1;
                if (sessionRow is not null)
                {
                    LoginType = sessionRow["linktype"].ToString() ?? "";
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                }
                string lcondition = "RowStatus=0";
                string lorder = "Fullname";
                int StartNo = Convert.ToInt32(start);
                var dt = new DataTable();
                var startpnt = new Hashtable();
                startpnt.Add(ClsCRMContacts.PrimaryKey, "col0");
                startpnt.Add(id, "col1");
                startpnt.Add(ServerOrderValue, "col2");
                if (!string.IsNullOrEmpty(search) & search != "null")
                {

                    lcondition = cfc1.GetSearchStringFromFrontEnd(search, lcondition);
                }
                if (!string.IsNullOrEmpty(order) & order != "null")
                {
                    var order1 = order.Split('~');
                    string OrderDir =order1[2].ToLower();
                    string OrderColumn = order1[0];
                    string OrderValue = order1[1].ToLower();
                    // lorder = OrderColumn & " " & OrderDir
                    lorder = OrderColumn;
                    startpnt.Remove("col2");
                    startpnt.Add(OrderValue, "col2");
                }
                // 'Commented by aslam
                // dt = df1.GetDataFixedRows(ClsCRMContacts.ServerDatabase, ClsCRMContacts.TableName, ClsCRMContacts.AllFields, "", lcondition, "", lorder, pSize, startpnt, direction, -1, -1)
                string argServerDataBase = ClsCRMContacts.ServerDatabase;
                string argLtable = ClsCRMContacts.TableName;
                string argLfieldList = ClsCRMContacts.AllFields;
                string argLJoinStmt = "";
                string argLfilter = "";
                int argStartRowPostion = Convert.ToInt32(start);
                int argTotalRows = -1;
                dt = df1.GetDataFromSqlFixedRows(ref argServerDataBase, ref argLtable, ref argLfieldList, ref argLJoinStmt, ref lcondition, ref argLfilter, ref lorder, ref argStartRowPostion, pSize, ref argTotalRows);
                ClsCRMContacts.ServerDatabase = argServerDataBase;
                start = argStartRowPostion;
                int a = df1.RowsCount(ClsCRMContacts.ServerDatabase, ClsCRMContacts.TableName, lcondition, "");
                var DtInfoTable = new DataTable();
                var argSessionInstance2 = SessionControl;
                var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance2);
                SessionControl = argSessionInstance2;
                if (HttpContext.Session.GetString("infotable") is null)
                {
                    // DtInfoTable = df1.GetDataFromSql(Session("serverdatabase"), "InfoTable", "*", "", "", "", "InfoType,NameOfInfo", "*", clsinfotable.PrimaryKey)
                   // DtInfoTable = df1.GetDataFromSql(HttpContext.Session.GetString("serverdatabase"), "InfoTable", "*", "", "", "", "InfoType,NameOfInfo", clsinfotable.PrimaryKey);
                    //HttpContext.Session.SetString("infotable", JsonConvert.SerializeObject(DtInfoTable));
                }
                else
                {
                    //DtInfoTable = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));
                }
                var ContactsObj = new CRMContactsViewModel();

                dt = df1.AddingNameForCodesPrimaryColsInfotable(dt, "JobTitle", "TextJobTitle", DtInfoTable, DtInfoTableuser , "NameOfInfo");
                HttpContext.Session.SetString("crmcontacts", JsonConvert.SerializeObject(dt));

                var datatableData = new DataTypeConversionLib.DTResult<ContactsMaster>();
                datatableData = (DataTypeConversionLib.DTResult<ContactsMaster>)DCLib.ConvertDTtoModal<ContactsMaster>(dt, StartNo, a, dt.Rows.Count);

                return Json(datatableData); 
            }
            return Json("");

        }


        public ActionResult Error1()
        {
            return View("~/Views/Shared/Error1.vbhtml");
        }

        public ActionResult Index()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "") is null)
                return RedirectToAction("LogOut", "Home");
            
            
            var argSessionInstance = SessionControl;
            var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
            SessionControl = argSessionInstance;
            var dtinfotable = df1.SqlExecuteDataTable(clsinfotable.ServerDatabase, "select infotable_key, p_infotable,nameofinfo,infotype,under from infotable");
            HttpContext.Session.SetString("infotable" , JsonConvert.SerializeObject(dtinfotable));

            // Dim dtEmp As DataTable = GetActiveEmployeesFromAccMaster(Session("ServerDatabase"), "p_acccode,accname")
            // Session("Employees") = dtEmp

            // Return RedirectToAction("ManageRegCall")
            return View("index1");
        }

        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult AccountsGrid()
        {
            return View();
        }


        public JsonResult AccountGridData()
        {

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            // Dim sessionRow As DataRow = Nothing
            // If Session("WebSessionRow") IsNot Nothing AndAlso Then
            // sessionRow = Session("WebSessionRow")
            // ElseIf Request.Cookies("SessionKey") IsNot Nothing Then
            // Dim cookie As HttpCookie = Request.Cookies("SessionKey")
            // Else
            // AgainLogin()
            // End If
           // DataTable DtInfoTable;
            var argSessionInstance = SessionControl;
            var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
            SessionControl = argSessionInstance;
            if (HttpContext.Session.GetString("infotable") is null)
            {
                // DtInfoTable = df1.GetDataFromSql(clsinfotable, "", "", "InfoType,NameOfInfo")
               // DtInfoTable = df1.GetDataFromSql(HttpContext.Session.GetString("serverdatabase"), "InfoTable", "*", "", "", "", "InfoType,NameOfInfo", clsinfotable.PrimaryKey);
                //HttpContext.Session.SetString("infotable" , JsonConvert.SerializeObject(DtInfoTable));
            }
            else
            {
                //DtInfoTable = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));
            }
            var AccountsObj = new CRMAccountsViewModel();

            string query = string.Format("SELECT CRMAccounts_Key,P_CRMAccounts,AccountName,HomeTown FROM [CRMAccounts] where RowStatus = 0");
            AccountsObj.CRMAccountsDT = df1.SqlExecuteDataTable(clsinfotable.ServerDatabase, query);
            AccountsObj.CRMAccountsDT = df1.AddingNameForCodesPrimaryColsInfotable(AccountsObj.CRMAccountsDT, "HomeTown", "TextHometown", DtInfoTable ,DtInfoTableuser , "NameOfInfo");
            var argLDataTable = AccountsObj.CRMAccountsDT;
            AccountsObj.CRMAccountsDT = df1.AddColumnsInDataTable(ref argLDataTable, "District,State,Country");
            AccountsObj.CRMAccountsDT = argLDataTable;
            for (int i = 0, loopTo = AccountsObj.CRMAccountsDT.Rows.Count - 1; i <= loopTo; i++)
            {
                if (AccountsObj.CRMAccountsDT.Rows[i]["HomeTown"] is DBNull == false)
                {
                    int TownId = Convert.ToInt32(AccountsObj.CRMAccountsDT.Rows[i]["HomeTown"]);
                    if (TownId != 0)
                    {
                        var TownRow = df1.FindRowByPrimaryCols(ref DtInfoTable, TownId);
                        if (TownRow is not null)
                        {
                            var DRow = df1.FindRowByPrimaryCols(ref DtInfoTable, TownRow["Under"]);
                            AccountsObj.CRMAccountsDT.Rows[i]["District"] = DRow["NameOfInfo"].ToString()?.Trim();
                            var SRow = df1.FindRowByPrimaryCols(ref DtInfoTable, DRow["Under"]);
                            AccountsObj.CRMAccountsDT.Rows[i]["State"] = SRow["NameOfInfo"].ToString()?.Trim();
                            var cRow = df1.FindRowByPrimaryCols(ref DtInfoTable, SRow["Under"]);
                            AccountsObj.CRMAccountsDT.Rows[i]["Country"] = cRow["NameOfInfo"].ToString()?.Trim();
                        }
                        else
                        {
                            AccountsObj.CRMAccountsDT.Rows[i]["TextHometown"] = "";
                            AccountsObj.CRMAccountsDT.Rows[i]["District"] = "";
                            AccountsObj.CRMAccountsDT.Rows[i]["State"] = "";
                            AccountsObj.CRMAccountsDT.Rows[i]["Country"] = "";
                        }
                    }
                    else
                    {
                        AccountsObj.CRMAccountsDT.Rows[i]["TextHometown"] = "";
                        AccountsObj.CRMAccountsDT.Rows[i]["District"] = "";
                        AccountsObj.CRMAccountsDT.Rows[i]["State"] = "";
                        AccountsObj.CRMAccountsDT.Rows[i]["Country"] = "";
                    }
                }
            }


            var datatableData = new DataTypeConversionLib.DTResult<AccountsMaster>();
            datatableData = (DataTypeConversionLib.DTResult<AccountsMaster>)DCLib.ConvertDTtoModal<AccountsMaster>(AccountsObj.CRMAccountsDT, 0, AccountsObj.CRMAccountsDT.Rows.Count, AccountsObj.CRMAccountsDT.Rows.Count);
            return Json(datatableData);
        }

        public ActionResult LocationGrid()
        {
            return View();
        }
        public ActionResult LocationGridForModal()
        {
            return View();
        }

        public JsonResult LocationGridData()
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            //DataTable DtInfoTable;
            var argSessionInstance = SessionControl;
            var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
            SessionControl = argSessionInstance;
            if (HttpContext.Session.GetString("infotable") is null)
            {
                // DtInfoTable = df1.GetDataFromSql(Session("serverdatabase"), "InfoTable", "*", "", "", "", "InfoType,NameOfInfo", "*", clsinfotable.PrimaryKey)
              //  DtInfoTable = df1.GetDataFromSql(HttpContext.Session.GetString("serverdatabase"), "InfoTable", "*", "", "", "", "InfoType,NameOfInfo", clsinfotable.PrimaryKey);
                //HttpContext.Session.SetString("infotable" , JsonConvert.SerializeObject(DtInfoTable));
            }
            else
            {
             //   DtInfoTable = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));
            }
            DataTable dt;
            string query = string.Format("SELECT * FROM [InfoTable] where RowStatus = 0 and InfoType=21");
            dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, query);
            dt = df1.AddingNameForCodesPrimaryColsInfotable(dt, "p_infotable", "TextHometown", DtInfoTable , DtInfoTableuser , "NameOfInfo");
            dt = df1.AddColumnsInDataTable(ref dt, "District,State,Country");
            for (int i = 0, loopTo = dt.Rows.Count - 1; i <= loopTo; i++)
            {

                // Dim TownId As Integer = dt.Rows(i).Item("InfoTable_Key")
                // Dim TownRow As DataRow = df1.FindRowByPrimaryCols(DtInfoTable, TownId)

                if (Convert.ToInt32(df1.GetCellValue(dt.Rows[i], "Under")) > 0)
                {
                    if (dt.Rows[i] is not null)
                    {
                        // 'Changed by aslam                       
                        //var DRow = DtInfoTable.Select("p_infotable=" + Convert.ToInt32(df1.GetCellValue(dt.Rows[i], "Under"))).FirstOrDefault();
                        var DRow = DtInfoTable.Select("p_infotable='" + Convert.ToInt32(df1.GetCellValue(dt.Rows[i], "Under")) +"'").FirstOrDefault();
                        dt.Rows[i]["District"] = DRow?["NameOfInfo"].ToString()?.Trim();
                        var SRow = DtInfoTable.Select("p_infotable='" + Convert.ToInt32(df1.GetCellValue(DRow, "Under"))+"'").FirstOrDefault();
                        dt.Rows[i]["State"] = SRow?["NameOfInfo"].ToString()?.Trim();
                        var cRow = DtInfoTable.Select("p_infotable='" + Convert.ToInt32(df1.GetCellValue(SRow, "Under"))+"'").FirstOrDefault();
                        dt.Rows[i]["Country"] = cRow?["NameOfInfo"].ToString()?.Trim();
                    }
                }
            }


            var datatableData = new DataTypeConversionLib.DTResult<LocationMaster>();
            datatableData = (DataTypeConversionLib.DTResult<LocationMaster>)DCLib.ConvertDTtoModal<LocationMaster>(dt, 0, dt.Rows.Count, dt.Rows.Count);
            return Json(datatableData);

        }

        /// <summary>
        /// Function to send email Consolidated report of all the employee's today's tasks and their remarks through wondows service as api
        /// </summary>      
        /// <returns>Its an API to send daily Report</returns>
        public ActionResult DailyTaskReport()
        {
            //if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            //{
            //    return null;
            //}

            //SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            SetSessionControlUsingCoprid("Neha8591");
            var dt1 = new DataTable();
            var creationdate = df1.GetDateTimeISTNow();
            var creationdateMin = new DateTime(creationdate.Year, creationdate.Month, creationdate.Day, 0, 0, 0);
            var creationdateMax = new DateTime(creationdate.Year, creationdate.Month, creationdate.Day, 23, 59, 59);
            // Dim creationdateMin As DateTime = New DateTime(creationdate.Year, creationdate.Month, 16, 0, 0, 0)
            // Dim creationdateMax As DateTime = New DateTime(creationdate.Year, creationdate.Month, 16, 23, 59, 59)
            //string EmailidText = MyServer.MapPath("App_Data/EmailList.Txt");
            //string functionname = "SendCompTasks";
            //string type = "Production".ToLower();
            //var regCalls = new RegCalls();
            //string emailIds = libCalls.EmailidFromTxtFile(EmailidText, functionname, type);
            string mailText = "";
            int CloseCountAll = libCalls.getNoOfClosedCallsExcludingUnlinkCustomers(creationdateMin, creationdateMax, SessionControl.UserServerDatabase, 0);
            mailText += "<p>Total Calls Worked on: " + libCalls.getTotalWorkingCalls(0, creationdateMin, creationdateMax, SessionControl.UserServerDatabase) + "</p>";
            mailText += "<p>Total Calls Closed:  " + CloseCountAll + "</p>";
            var DtAcc = libSaralAuth.GetActiveEmployeesFromAccMaster(SessionControl.UserServerDatabase,"P_acccode,accname,Email");
            for (int i = 0, loopTo = DtAcc.Rows.Count - 1; i <= loopTo; i++)
            {
                int loginCode = Convert.ToInt32(DtAcc.Rows[i]["P_acccode"]);
                //DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax, SessionControl.UserServerDatabase);
                //DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax,libSaralAuth.GetInfoTable(SessionControl.UserServerDatabase),libSaralAuth.GetInfoTableUser(SessionControl.UserServerDatabase), SessionControl.UserServerDatabase);
                DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax,DtInfoTable,DtInfoTableuser, SessionControl.UserServerDatabase);
                mailText += "<h4>Daily Report of " +  DtAcc.Rows[i]["accname"] + "</h4>";
                if (Calldt.Rows.Count > 0)
                {
                    int CloseCount = libCalls.getNoOfClosedCallsExcludingUnlinkCustomers(creationdateMin, creationdateMax, SessionControl.UserServerDatabase, loginCode);
                    mailText += "<p>Total Calls Worked on: " + libCalls.getTotalWorkingCalls(loginCode, creationdateMin, creationdateMax, SessionControl.UserServerDatabase) + "</p>";
                    mailText += "<p>Total Calls Closed:  " + CloseCount + "</p>";
                }
                mailText = libCRMTasks.GetDailyCallsReportmailText(Calldt, mailText);
                DataTable Taskdt = (DataTable)libCRMTasks.GetTasksReportDt("E", Convert.ToInt32(DtAcc.Rows[i]["P_acccode"]), creationdateMin, creationdateMax, SessionControl.UserServerDatabase, LinkTypeCondition: "(m2.LinkType<>'C' OR m2.LinkType IS NULL)");
                mailText = libCRMTasks.GetDailyTaskReportmailText(Taskdt, mailText);
                mailText += "<hr/>";
            }
            string Subject = "Daily_Report: " + creationdate.ToString("yyyy-MM-dd");

            // SendingEmail("93nishayadav@gmail.com", Subject, mailText, FullFilename)
            // GF2.SendingEmail(emailIds, Subject, mailText)
            string emailIds = "nehagupta@saralerp.com,hcgupta@saralerp.com,reetika@saralerp.com"; 
            gflib.SendEmail(emailIds, Subject, mailText, @"C:\cntr_dir\googleapiconfig.txt");
            return default;
            // GF2.SendingEmail("93nishayadav@gmail.com", Subject, mailText)
        }


        /// <summary>
        /// Function to send Excel with email Consolidated report of all the employee's today's tasks and their remarks through wondows service as api
        /// </summary>      
        /// <returns>Its an API to send daily Report excel</returns>
        public ActionResult DailyTaskReportExcel()
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var dt1 = new DataTable();
            var creationdate = df1.GetDateTimeISTNow();
            // Dim creationdate As DateTime = New DateTime(2020, 1, 16, 0, 0, 0)
            var creationdateMin = new DateTime(creationdate.Year, creationdate.Month, creationdate.Day, 0, 0, 0);
            var creationdateMax = new DateTime(creationdate.Year, creationdate.Month, creationdate.Day, 23, 59, 59);
            // Dim creationdateMin As DateTime = New DateTime(creationdate.Year, creationdate.Month, 16, 0, 0, 0)
            // Dim creationdateMax As DateTime = New DateTime(creationdate.Year, creationdate.Month, 16, 23, 59, 59)
            string EmailidText = MyServer.MapPath("App_Data/EmailList.Txt");
            string functionname = "SendCompTasks";
            string type = "production";
            var regCalls = new RegCalls();
            string emailIds = libCalls.EmailidFromTxtFile(EmailidText, functionname, type);

            string mailText = "";
            var DtAcc = libSaralAuth.GetActiveEmployeesFromAccMaster("P_acccode,accname,Email");
            var Tempdt = new DataTable();
            Tempdt = df1.AddColumnsInDataTable(ref Tempdt, "ColumnNames");
            int RowCount = 0;
            for (int i = 0, loopTo = DtAcc.Rows.Count - 1; i <= loopTo; i++)
            {
                string CallColumns = "FirmName,Issuetype,Issuedescription,Notes,ServicingDealer,RemarkTime,status,CreationDate";
                string tasksColumns = "title,desctription,notes,TaskStatus,timestamp,RemarkTime";
                var CallColumnsArr = CallColumns.Split(',');
                var tasksColumnsArr = tasksColumns.Split(',');

                var nRow = Tempdt.NewRow();
                nRow["ColumnNames"] = "EmployeeName";
                Tempdt.Rows.Add(nRow);
                int ColCount = 1;

                int loginCode =Convert.ToInt32(DtAcc.Rows[i]["P_acccode"]);
                Tempdt = df1.AddColumnsInDataTable(ref Tempdt, ColCount.ToString());
                Tempdt.Rows[RowCount][1] = DtAcc.Rows[i]["accname"].ToString()?.Trim();
                //DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax, SessionControl.UserServerDatabase);
                //DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax,libSaralAuth.GetInfoTable(SessionControl.UserServerDatabase),libSaralAuth.GetInfoTableUser(SessionControl.UserServerDatabase), SessionControl.UserServerDatabase);
                DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax,DtInfoTable,DtInfoTableuser, SessionControl.UserServerDatabase);

                if (Calldt.Rows.Count > 0)
                {
                    for (int j = 0, loopTo1 = CallColumnsArr.Length - 1; j <= loopTo1; j++)
                    {
                        var Row = Tempdt.NewRow();
                        Row["ColumnNames"] = CallColumnsArr[j].ToString();
                        Tempdt.Rows.Add(Row);
                    }
                    RowCount += 1;
                    for (int k = 0, loopTo2 = Calldt.Rows.Count - 1; k <= loopTo2; k++)
                    {
                        // Tempdt.Rows(RowCount + 0).Item(ColCount) = ColCount
                        Tempdt.Rows[RowCount + 0][ColCount] = Calldt.Rows[k]["FirmName"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 1][ColCount] = Calldt.Rows[k]["Issuetype"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 2][ColCount] = Calldt.Rows[k]["Issuedescription"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 3][ColCount] = Calldt.Rows[k]["Notes"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 4][ColCount] = Calldt.Rows[k]["servicingdealer"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 5][ColCount] = Calldt.Rows[k]["TimeStamp"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 6][ColCount] = Calldt.Rows[k]["TaskStatus"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 7][ColCount] = Calldt.Rows[k]["CreationDate"].ToString()?.Trim();

                        ColCount += 1;
                        Tempdt = df1.AddColumnsInDataTable(ref Tempdt, ColCount.ToString());
                    }
                    RowCount = Tempdt.Rows.Count - 1;
                }

                var mRow = Tempdt.NewRow();
                mRow["ColumnNames"] = "";
                Tempdt.Rows.Add(mRow);
                RowCount = Tempdt.Rows.Count + 1;
                mailText +="<h4>Daily Report of "  + DtAcc.Rows[i]["accname"] + "</h4>";
                mailText = libCRMTasks.GetDailyCallsReportmailText(Calldt, mailText);


                DataTable Taskdt = (DataTable)libCRMTasks.GetTasksReportDt("E", Convert.ToInt32(DtAcc.Rows[i]["P_acccode"]), creationdateMin, creationdateMax, SessionControl.UserServerDatabase, LinkTypeCondition: "(m2.LinkType<>'C' OR m2.LinkType IS NULL)");
                ColCount = 0;
                if (Taskdt.Rows.Count > 0)
                {

                    for (int m = 0, loopTo3 = tasksColumnsArr.Length - 1; m <= loopTo3; m++)
                    {
                        var taskRow = Tempdt.NewRow();
                        taskRow["ColumnNames"] = tasksColumnsArr[m].ToString();
                        Tempdt.Rows.Add(taskRow);
                    }
                    RowCount += 1;
                    for (int h = 0, loopTo4 = Taskdt.Rows.Count - 1; h <= loopTo4; h++)
                    {
                        ColCount = h + 1;
                        if (ColCount > Tempdt.Columns.Count - 1)
                        {
                            Tempdt = df1.AddColumnsInDataTable(ref Tempdt, ColCount.ToString());
                        }
                        Tempdt.Rows[RowCount + 0][ColCount] = Taskdt.Rows[h]["Title"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 1][ColCount] = Taskdt.Rows[h]["Description"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 2][ColCount] = Taskdt.Rows[h]["Notes"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 3][ColCount] = Taskdt.Rows[h]["TaskStatus"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 4][ColCount] = Taskdt.Rows[h]["TimeStamp"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 5][ColCount] = Taskdt.Rows[h]["CreationDate"].ToString()?.Trim();
                    }
                }
                var lRow = Tempdt.NewRow();
                lRow["ColumnNames"] = "";
                Tempdt.Rows.Add(lRow);
                RowCount = Tempdt.Rows.Count;
                mailText = libCRMTasks.GetDailyTaskReportmailText(Taskdt, mailText);
                mailText += "<hr/>";

            }
            string Subject = "Daily_Report: " + creationdate.ToString("yyyy-MM-dd");
            // Dim FullFilename As String = GlobalControl.Variables.DataFolderServerPhysicalPath & "\Employees\MasterDailyReport" & creationdate.ToString("yyyy-MM-dd_hh_mm_ss") & ".xlsx"
            string FullFilename = SessionControl.DataFolderServerPhysicalPath + @"\Employees\MasterDailyReport" + creationdate.ToString("yyyy-MM-dd_hh_mm_ss") + ".xlsx";
            string Excelfilename = cfc1.ExportDataToExcel(Tempdt, FullFilename);
            // Dim emailSent As Boolean = CRMTasksMaster.emailForCompletedTeamTasks(Loginkey, creationdate, emailIds)
            // Dim mailText As String = libCRMTasks.emailDailyTasks(13, creationdate, creationdate, 0, Session("InfoTable"))
            // SendingEmail("93nishayadav@gmail.com", Subject, mailText, FullFilename)
            // GF2.SendingEmail(emailIds, Subject, mailText)
            gflib.SendEmail(emailIds, Subject, mailText, @"C:\cntr_dir\googleapiconfig.txt", FullFilePath: Excelfilename);
            return default;
            // GF2.SendingEmail("93nishayadav@gmail.com", Subject, mailText)

        }


        public ActionResult ChangeRegMobileofCustomer()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ChangeCustomerMobileNo", HttpContext.Session.GetString("serverdatabase")))
            {
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// json function to verify otp to change registered mobile number
        /// </summary>
        /// <param name="otp">OTP from popup</param>
        /// <param name="P_Customer">P_customer for customer for which registered number has to be changed</param>
        /// <param name="MobNo">Correct number which needs to be updated</param>
        /// <returns></returns>
        public JsonResult VerifyOTPforChngCustomerMob(string otp, int P_Customer, string MobNo)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ChangeCustomerMobileNo", HttpContext.Session.GetString("serverdatabase")))
            {
                // Dim libcust As New CustomerFeatureLib.CustomerFeatureFunctions
                //var argSessionInstance = SessionControl;
                //var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
                //SessionControl = argSessionInstance;
                //string success = "true";
                // Dim custRow As DataRow = libcust.getCustomerRowFromP_customers(P_Customer, Session("ServerDatabase"))
                String serverdatabase = "";
                if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 17488) {
                    serverdatabase = SessionControl.MainServerDatabase;
                }
                else {
                    serverdatabase = SessionControl.UserServerDatabase ;
                }


                    var custRow = libcustomerfeature.getCustomerRowFromP_customers(P_Customer, serverdatabase );
                string selCust = "select top 1 * from tempcontacts where rowstatus=0 and status = 'P' and p_customers =" + P_Customer + " order by mtimestamp desc";
                var dttemp = df1.SqlExecuteDataTable(serverdatabase , selCust);
                if (dttemp.Rows.Count > 0)
                {
                    string otp1 = df1.GetCellValue(dttemp.Rows[0], "otp", "string").ToString()?.Trim() ?? "";
                    if (otp1 == otp)
                    {
                        string updStr =("update tempcontacts set status = 'V' where tempcontacts_key = " + Convert.ToInt32(dttemp.Rows[0]["tempcontacts_key"]));
                        //df1.SqlExecuteNonQuery(clsinfotable.ServerDatabase, updStr);
                        df1.SqlExecuteNonQuery(serverdatabase , updStr);
                        var changedfields = new Hashtable();
                        changedfields = GF1.AddItemToHashTable(ref changedfields, "MobNo", MobNo);
                        // Dim p_customers As Integer = libcustomerfeature.InsertUpdateInCustomers(custRow("Customers_key"), changedfields, Session("websessionrow"), Session("ServerDatabase"))
                        int argid = Convert.ToInt32(custRow["Customers_key"]);
                        int p_customers =Convert.ToInt32(libcustomerfeature.InsertUpdateInCustomers(ref argid, ref changedfields, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""), SessionControl.UserServerDatabase));
                        if ((Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 17488))
                        {
                            String upd = "update customers set mobno='" + MobNo + "' where rowstatus=0 and p_customers =" + P_Customer;
                                df1.SqlExecuteNonQuery(SessionControl.MainServerDatabase, upd);
                          //  p_customers = Convert.ToInt32(libcustomerfeature.InsertUpdateInCustomers(ref argid, ref changedfields, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""), SessionControl .UserServerDatabase ));
                        }
                        return Json("true");
                    }
                }
                return Json("false");
            }
            return Json("");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="P_Customer"></param>
        /// <param name="MobNo"></param>
        /// <returns></returns>
        public JsonResult sendOTP(int P_Customer, string MobNo)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            DataRow custRow;

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ChangeCustomerMobileNo", HttpContext.Session.GetString("serverdatabase")))
            {
                // Dim libcust As New CustomerFeatureLib.CustomerFeatureFunctions
                // Dim custRow As DataRow = libcust.getCustomerRowFromP_customers(P_Customer, Session("ServerDatabase"))
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 17488){
                     custRow = libcustomerfeature.getCustomerRowFromP_customers(P_Customer, SessionControl.MainServerDatabase,"customers_key,p_customers,mobno,email,rowstatus" );
                  
                }
                else
                {
                     custRow = libcustomerfeature.getCustomerRowFromP_customers(P_Customer, SessionControl.UserServerDatabase, "customers_key,p_customers,mobno,email,rowstatus");

                }
                var dtcust = custRow.Table;

                if (MobNo.Length == 10)
                {
                    dtcust.Rows[0]["MobNo"] = MobNo.ToString();
                    if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 17488)
                    {

                        libcustomerfeature.SendOTP(dtcust, sessionRow, SessionControl.MainServerDatabase , "", "regmobnochange");

                    }else
                    {
                        libcustomerfeature.SendOTP(dtcust, sessionRow, SessionControl.UserServerDatabase , "", "regmobnochange");

                    }
                    //libcust.SendOTP(dtcust, Session("websessionrow"),, "regmobnochange")
                    // libcust.SendOTP(dtcust, Session("websessionrow"), "A", "regmobnochange")
                    return Json("success");
                }
                return Json("Error");
            }
            return Json("");
        }

        /// <summary>
        /// function to send daily task report to employees from Windows service
        /// </summary>
        /// <returns></returns>
        public ActionResult? DailyTaskReportForEmployees(string startdt = "1990-01-01")
        {
            //Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            //SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            SetSessionControlUsingCoprid("Neha8591");
            DateTime creationdate = df1.GetDateTimeISTNow();
            DateTime creationdateMin = new DateTime();
            DateTime creationdateMax = new DateTime();

            if (startdt== "1990-01-01")
            {
                creationdateMin = new DateTime(creationdate.Year, creationdate.Month, creationdate.Day, 0, 0, 0);
                creationdateMax = new DateTime(creationdate.Year, creationdate.Month, creationdate.Day, 23, 59, 59);
            }
            else
            {
                DateTime gn = DateTime.Parse(startdt);
                creationdateMin = new DateTime(gn.Year, gn.Month, gn.Day, 0, 0, 0);
                creationdateMax = new DateTime(gn.Year, gn.Month, gn.Day, 23, 59, 59);
            }

            var DtAcc = libSaralAuth.GetActiveEmployeesFromAccMaster(SessionControl.UserServerDatabase,"P_acccode,accname,Email");
            //DataTable dtinfotable = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotable", "rowstatus=0 and  infotype=39 and (updateflag<>'D' or updateflag is null)");
            //DataTable dtinfotableuser = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotableuser", "rowstatus=0 and infotype=39 and (updateflag<>'D' or updateflag is null)");
            for (int i = 0, loopTo = DtAcc.Rows.Count - 1; i <= loopTo; i++)
            {

                //string Subject = "Daily_Report: " + creationdate.ToString("yyyy-MM-dd") + " Of " + DtAcc.Rows[i]["accname"].ToString();
                string Subject = "Daily_Report: " + creationdateMin.ToString("yyyy-MM-dd") + " Of " + df1.GetCellValue(DtAcc.Rows[i],"accname","string");
                string mailText = String.Empty;
                int loginCode =Convert.ToInt32(df1.GetCellValue(DtAcc.Rows[i],"P_acccode","integer"));
                //DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax,dtinfotable,dtinfotableuser, SessionControl.UserServerDatabase);
                DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                mailText += "<h4>Daily Report of " + df1.GetCellValue(DtAcc.Rows[i],"accname","string").ToString()?.Trim()+ "</h4>";
                if (Calldt.Rows.Count>0)
                {
                    int CloseCount = libCalls.getNoOfClosedCallsExcludingUnlinkCustomers(creationdateMin, creationdateMax, SessionControl.UserServerDatabase, loginCode);
                    mailText += "<p>Total Calls Worked on: " + libCalls.getTotalWorkingCalls(loginCode, creationdateMin, creationdateMax, SessionControl.UserServerDatabase) + " | Total Calls Closed:  " + CloseCount + "</p>";
                   // mailText += "<p>Total Calls Closed:  " + CloseCount + "</p>";
                    int incomingduration = libCalls.getcalldurationfromCallFreq (creationdateMin, creationdateMax, SessionControl.UserServerDatabase,0, loginCode, "3111");
                    int Outgoingduration = libCalls.getcalldurationfromCallFreq(creationdateMin, creationdateMax, SessionControl.UserServerDatabase,0, loginCode, "3112");
                    int incomingcount = libCalls.getcountfromcallfreq (creationdateMin, creationdateMax, SessionControl.UserServerDatabase,0, loginCode, "3110,3111,3114,3116,3115");
                    int outgoingcount = libCalls.getcountfromcallfreq(creationdateMin, creationdateMax, SessionControl.UserServerDatabase,0, loginCode, "3112,3113");

                    mailText += "<p> Total Incoming duration:  " + cfc1 .GetTimeStringfromSeconds (   incomingduration) + " |  Total outgoing duration: " + cfc1 .GetTimeStringfromSeconds ( Outgoingduration) +   "</p>";
                    mailText += "<p> Total Incoming count:  " + incomingcount  + " |  Total outgoing count: " + outgoingcount  + "</p>";


                }

                mailText = libCRMTasks.GetDailyCallsReportmailText(Calldt, mailText);

                DataTable Taskdt = (DataTable)libCRMTasks.GetTasksReportDt("E", Convert.ToInt32(DtAcc.Rows[i]["P_acccode"]), creationdateMin, creationdateMax, SessionControl.UserServerDatabase, LinkTypeCondition: "(m2.LinkType<>'C' OR m2.LinkType IS NULL)");
                mailText = libCRMTasks.GetDailyTaskReportmailText(Taskdt, mailText);
                mailText += "<hr/>";
                // SendingEmail("93nishayadav@gmail.com", Subject, mailText, FullFilename)

                string email = DtAcc.Rows[i]["Email"].ToString()?.Trim() + ",nehagupta@saralerp.com,hcgupta@saralerp.com,reetika@saralerp.com";
                gflib.SendEmail(email, Subject, mailText, @"C:\cntr_dir\googleapiconfig.txt");

            }
            return Json("");
        }


        public ActionResult DailyTaskExcelReportForEmployees()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var creationdate = df1.GetDateTimeISTNow();
            var creationdateMin = new DateTime(creationdate.Year, creationdate.Month, creationdate.Day, 0, 0, 0);
            var creationdateMax = new DateTime(creationdate.Year, creationdate.Month, creationdate.Day, 23, 59, 59);

            // Dim creationdateMin As DateTime = New DateTime(creationdate.Year, creationdate.Month, 11, 0, 0, 0)
            // Dim creationdateMax As DateTime = New DateTime(creationdate.Year, creationdate.Month, 11, 23, 59, 59)

            string Subject = "Daily_Report: " + creationdate.ToString("yyyy-MM-dd");
            var DtAcc = libSaralAuth.GetActiveEmployeesFromAccMaster("P_acccode,accname,Email");
            for (int i = 0, loopTo = DtAcc.Rows.Count - 1; i <= loopTo; i++)
            {
                string mailText = "";
                var Tempdt = new DataTable();
                Tempdt = df1.AddColumnsInDataTable(ref Tempdt, "ColumnNames");
                int RowCount = 0;
                string CallColumns = "FirmName,Issuetype,Issuedescription,Notes,ServicingDealer,RemarkTime,status,CreationDate";
                string tasksColumns = "title,desctription,notes,TaskStatus,timestamp,RemarkTime";
                var CallColumnsArr = CallColumns.Split(',');
                var tasksColumnsArr = tasksColumns.Split(',');

                var nRow = Tempdt.NewRow();
                nRow["ColumnNames"] = "EmployeeName";
                Tempdt.Rows.Add(nRow);
                int ColCount = 1;

                int loginCode = Convert.ToInt32(DtAcc.Rows[i]["P_acccode"]);
                Tempdt = df1.AddColumnsInDataTable(ref Tempdt, ColCount.ToString());
                Tempdt.Rows[RowCount][1] = DtAcc.Rows[i]["accname"].ToString()?.Trim();
                //DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax, SessionControl.UserServerDatabase);
                //DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax,libSaralAuth.GetInfoTable(SessionControl.UserServerDatabase),libSaralAuth.GetInfoTableUser(SessionControl.UserServerDatabase), SessionControl.UserServerDatabase);
                DataTable Calldt = (DataTable)libCRMTasks.GetCallsReportDt("E", loginCode, creationdateMin, creationdateMax,DtInfoTable,DtInfoTableuser, SessionControl.UserServerDatabase);

                if (Calldt.Rows.Count > 0)
                {
                    for (int j = 0, loopTo1 = CallColumnsArr.Length - 1; j <= loopTo1; j++)
                    {
                        var Row = Tempdt.NewRow();
                        Row["ColumnNames"] = CallColumnsArr[j].ToString();
                        Tempdt.Rows.Add(Row);
                    }
                    RowCount += 1;
                    for (int k = 0, loopTo2 = Calldt.Rows.Count - 1; k <= loopTo2; k++)
                    {
                        // Tempdt.Rows(RowCount + 0).Item(ColCount) = ColCount
                        Tempdt.Rows[RowCount + 0][ColCount] = Calldt.Rows[k]["FirmName"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 1][ColCount] = Calldt.Rows[k]["Issuetype"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 2][ColCount] = Calldt.Rows[k]["Issuedescription"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 3][ColCount] = Calldt.Rows[k]["Notes"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 4][ColCount] = Calldt.Rows[k]["servicingdealer"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 5][ColCount] = Calldt.Rows[k]["TimeStamp"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 6][ColCount] = Calldt.Rows[k]["TaskStatus"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 7][ColCount] = Calldt.Rows[k]["CreationDate"].ToString()?.Trim();

                        ColCount += 1;
                        Tempdt = df1.AddColumnsInDataTable(ref Tempdt, ColCount.ToString());
                    }
                    RowCount = Tempdt.Rows.Count - 1;
                }
                var mRow = Tempdt.NewRow();
                mRow["ColumnNames"] = "";
                Tempdt.Rows.Add(mRow);

                mailText += "<h4>Daily Report of "+ DtAcc.Rows[i]["accname"] + "</h4>";
                mailText = libCRMTasks.GetDailyCallsReportmailText(Calldt, mailText);

                DataTable Taskdt = (DataTable)libCRMTasks.GetTasksReportDt("E", Convert.ToInt32(DtAcc.Rows[i]["P_acccode"]), creationdateMin, creationdateMax, SessionControl.UserServerDatabase, LinkTypeCondition: "(m2.LinkType<>'C' OR m2.LinkType IS NULL)");
                ColCount = 0;
                if (Taskdt.Rows.Count > 0)
                {

                    for (int m = 0, loopTo3 = tasksColumnsArr.Length - 1; m <= loopTo3; m++)
                    {
                        var taskRow = Tempdt.NewRow();
                        taskRow["ColumnNames"] = tasksColumnsArr[m].ToString();
                        Tempdt.Rows.Add(taskRow);
                    }
                    RowCount += 1;
                    for (int h = 0, loopTo4 = Taskdt.Rows.Count - 1; h <= loopTo4; h++)
                    {
                        ColCount = h + 1;
                        if (ColCount > Tempdt.Columns.Count - 1)
                        {
                            Tempdt = df1.AddColumnsInDataTable(ref Tempdt, ColCount.ToString());
                        }
                        Tempdt.Rows[RowCount + 0][ColCount] = Taskdt.Rows[h]["Title"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 1][ColCount] = Taskdt.Rows[h]["Description"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 2][ColCount] = Taskdt.Rows[h]["Notes"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 3][ColCount] = Taskdt.Rows[h]["TaskStatus"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 4][ColCount] = Taskdt.Rows[h]["TimeStamp"].ToString()?.Trim();
                        Tempdt.Rows[RowCount + 5][ColCount] = Taskdt.Rows[h]["CreationDate"].ToString()?.Trim();
                    }
                }

                mailText = libCRMTasks.GetDailyTaskReportmailText(Taskdt, mailText);
                mailText += "<hr/>";

                string name = DtAcc.Rows[i]["accname"].ToString()?.Trim();
                name = name.Replace(" ", "_");
                // Dim FullFilename As String = GlobalControl.Variables.DataFolderServerPhysicalPath & "\Employees\DailyReport" & creationdate.ToString("yyyy-MM-dd") & name & ".xlsx"
                string FullFilename = SessionControl.DataFolderServerPhysicalPath + @"\Employees\DailyReport" + creationdate.ToString("yyyy-MM-dd") + name + ".xlsx";
                string Excelfilename = cfc1.ExportDataToExcel(Tempdt, FullFilename);
                // SendingEmail("93nishayadav@gmail.com", Subject, mailText, FullFilename)
                // GF2.SendingEmail(DtAcc.Rows(i).Item("Email").ToString.Trim, Subject, mailText)
                gflib.SendEmail(DtAcc.Rows[i]["Email"].ToString()?.Trim(), Subject, mailText, @"C:\cntr_dir\googleapiconfig.txt", FullFilePath: Excelfilename);

            }
            return null;
        }

        private void WriteToFile(string text, string FilePath)
        {
            // Dim path1 As String = Server.MapPath("~/App_Data/FileLog.txt")
            using (var writer = new StreamWriter(FilePath, true))
            {
                writer.WriteLine(string.Format(text, DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt")));
                writer.Close();
            }
        }

        /// <summary>
        /// Action to show ManageTripRemb view
        /// </summary>
        /// <returns>ManageTripRemb view</returns>
        public ActionResult ManageTripRemb()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManageTripRemb", HttpContext.Session.GetString("serverdatabase")))
                return View();

            return RedirectToAction("LogOut", "Home");
        }

        public JsonResult ajaxTripRembData(int? start, int pSize = 20, string search = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManageTripRemb", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string LoginType = sessionRow["linktype"]?.ToString() ?? "";
                int Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                var dt = new DataTable();
                // Dim objReimbVisitMaster As New ReimbVisitMaster
                // dt = objReimbVisitMaster.GetTripRembData(LoginType, Loginkey)
                dt = libCalls.GetTripRembData(LoginType, Loginkey,SessionControl.UserServerDatabase);
                var datatableData = new DataTypeConversionLib.DTResult<ReimbVisitMaster>();
                datatableData = (DataTypeConversionLib.DTResult<ReimbVisitMaster>)DCLib.ConvertDTtoModal<ReimbVisitMaster>(dt, Convert.ToInt32(start), dt.Rows.Count, dt.Rows.Count);
                return Json(datatableData);
            }
            return Json("");
        }


        public ActionResult ajaxTripRembImage(int? imagekey)
        {

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManageTripRemb", HttpContext.Session.GetString("serverdatabase")))
            {
                byte[] image = null;
                var argSessionInstance = SessionControl;
                var ClsImageFile = new ImageFile.ImageFile.ImageFile(ref argSessionInstance);
                SessionControl = argSessionInstance;
                string ImageStr = "";
                var Imagedt = new DataTable();
                string selectquery = string.Format("Select Contents from ImageFile where ImageFile_key=" + imagekey + "");
                Imagedt = df1.SqlExecuteDataTable(ClsImageFile.ServerDatabase, selectquery);
                if (Imagedt.Rows.Count > 0)
                {
                    image = (byte[])Imagedt.Rows[0]["Contents"];
                }

                return File(image, "image/*");
            }
            return RedirectToAction("LogOut", "Home");
        }


        /// <summary>
        /// Get function for create Employee login link in Utility menu
        /// </summary>
        /// <returns></returns>
        public ActionResult CreateEmployeeLogin()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            // If Session("AuthKey") Is Nothing Or Session("AuthKey") = "" Then Return RedirectToAction("LogOut", "Home")
            // If libSaralAuth.IsAuthenticated(Session("AuthKey")) AndAlso libSaralAuth.IsAuthorized(Session("AuthKey"), "CreateEmployeeLogin") Then
            var EmployeesMasterObj = new EmployeesMaster();
            var argSessionInstance = SessionControl;
            var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
            SessionControl = argSessionInstance;
            var dtinfotable = df1.SqlExecuteDataTable(clsinfotable.ServerDatabase, "select infotable_key, p_infotable,nameofinfo,infotype,under from infotable");
           HttpContext.Session.SetString("infotable" , JsonConvert.SerializeObject(dtinfotable));
            return View(EmployeesMasterObj);

            // End If
            // Return RedirectToAction("LogOut", "Home")
        }

        /// <summary>
        /// Post function to create employee login  of new employees
        /// </summary>
        /// <param name="fc"></param>
        /// <param name="EmployeesMasterObj"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult CreateEmployeeLogin(IFormCollection fc, EmployeesMaster EmployeesMasterObj)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            // If Session("AuthKey") Is Nothing Or Session("AuthKey") = "" Then Return RedirectToAction("LogOut", "Home")
            // If libSaralAuth.IsAuthenticated(Session("AuthKey")) AndAlso libSaralAuth.IsAuthorized(Session("AuthKey"), "CreateEmployeeLogin") Then
            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
           
            var argSessionInstance = SessionControl;
            var ClsEmployees1 = new Employees.Employees.Employees(ref argSessionInstance);
            SessionControl = argSessionInstance;
            var argSessionInstance1 = SessionControl;
            var ClsAccMaster1 = new Accmaster.Accmaster.Accmaster(ref argSessionInstance1);
            SessionControl = argSessionInstance1;

            DataRow? dtr = null;
            // Dim ghj As String = fc.AllKeys

            var dthash = DCLib.ConvertIFCToHashTable(fc, ClsEmployees1);
            dthash = GF1.AddItemToHashTable(ref dthash, "Under", 13, true);
            var dtHashAccMaster = new Hashtable();
            dtHashAccMaster = DCLib.ConvertIFCToHashTable(fc, ClsAccMaster1);
            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "AccMaster_key", -1);
            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "P_acccode", -1);
            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "AccName", EmployeesMasterObj.EmpName.ToString().Trim());
            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Mobile", EmployeesMasterObj.MobNo.ToString().Trim());
            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "mtimestamp", df1.GetDateTimeISTNow());
            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "under", 9);
            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Phone", EmployeesMasterObj.MobNo.ToString().Trim());
            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Status", "Y");
            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "acctype", 3042);
            int argid = -1;
            var P_acccode = InsertUpdateInAcc_Master(ref argid, ref dtHashAccMaster, sessionRow);
            dthash = GF1.AddItemToHashTable(ref dthash, "P_acccode", P_acccode, true);
            int argid1 = EmployeesMasterObj.Employees_Key;
            int P_Employees =Convert.ToInt32(InsertUpdateInEmployee(ref argid1, ref dthash, sessionRow));
            EmployeesMasterObj.Employees_Key = argid1;

            var dtHashUserLogin = new Hashtable();
            string password = libSaralAuth.GenerateRandomPass(8);
            string username = EmployeesMasterObj.Email.ToString().Trim();
            string Address = fc["PostalAddress1"].ToString().Trim() + "," + fc["PostalAddress2"].ToString().Trim() + "," + fc["PostalAddress3"].ToString().Trim() + "," + fc["PostalAddress4"].ToString().Trim();
            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "UserLogin_key", -1);
            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "UserId", username);
            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Email", EmployeesMasterObj.Email.ToString().Trim());
            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Pwd", password);
            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Address", Address.ToString().Trim());
            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Name", EmployeesMasterObj.EmpName.ToString().Trim());
            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Mobile", EmployeesMasterObj.MobNo.ToString().Trim());
            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Linkcode", P_acccode);
            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Linktype", "E");
            int argid2 = -1;
            int UserLogin_key = libSaralAuth.InsertUpdateUserLogin(ref argid2, ref dtHashUserLogin, SessionControl.UserServerDatabase);

            // Dim WebRoles As String = cfc1.GetNameOfInfoFromInfotable(3063)
            string WebRoles = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,86,87,88,89,90,91,92,93,94";
            var dtHashUserRoles = new Hashtable();
            dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "UserRoles_key", -1);
            dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "P_userRoles", -1);
            dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "UserLogin_key", UserLogin_key);
            dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "WebRoles", WebRoles.ToString().Trim());
            int argP_userRoles = -1;
            int UserRoles_key = libSaralAuth.InsertUpdateUserRoles(ref argP_userRoles, ref dtHashUserRoles, SessionControl.UserServerDatabase);
            // dtHashAccMaster = GF1.AddItemToHashTable(dtHashAccMaster, "websessions_key", EmployeesMasterObj.Email.ToString.Trim)
            TempData["UserName"] = username;
            TempData["Password"] = password;

            return View("ShowID");
            // End If
            return RedirectToAction("LogOut", "Home");
        }

        public int InsertUpdateInEmployee(ref int id, ref Hashtable ChangedFieldsValuesPair, DataRow sessionrow)
        {
            //SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            //var argSessionInstance = SessionControl;
            //var clsEmployees = new Employees.Employees.Employees(ref argSessionInstance);
            //SessionControl = argSessionInstance;
            //string seljt = "select * from Employees where P_Employees=" + id + " and RowStatus = 0";
            //var dtJT = df1.SqlExecuteDataTable(clsEmployees.ServerDatabase, seljt);
            //// THIS IS FOR UPDATING A ROW
            //if (dtJT.Rows.Count > 0)
            //{
            //    clsEmployees.PrevRow = df1.UpdateDataRows(clsEmployees.PrevRow, dtJT.Rows[0]);
            //    for (int k = 0, loopTo = ChangedFieldsValuesPair.Keys.Count - 1; k <= loopTo; k++)
            //    {
            //        if (clsEmployees.CurrDt.Columns.Contains(Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k))))
            //        {
            //            clsEmployees.CurrRow.Item(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)) = GF1.GetValueFromHashTable(ChangedFieldsValuesPair, Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)));
            //        }
            //    }
            //    clsEmployees.CurrRow["ActionDate"] = df1.GetDateTimeISTNow();
            //    clsEmployees.CurrRow["WebSessions_Key"] = sessionrow["WebSessions_Key"];
            //    var clsobj = new object[] { clsEmployees };
            //    int kl = cfc1.SaveIntodbGetKey(clsobj, clsEmployees.TableName, "P_employees");
            //    return kl;
            //}
            //else
            //{
            //    // To insert in a Employee Table
            //    for (int k = 0, loopTo1 = ChangedFieldsValuesPair.Keys.Count - 1; k <= loopTo1; k++)
            //    {
            //        if (clsEmployees.CurrDt.Columns.Contains(Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k))))
            //        {
            //            clsEmployees.CurrRow.Item(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)) = GF1.GetValueFromHashTable(ChangedFieldsValuesPair, Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)));
            //        }
            //    }
            //    clsEmployees.CurrRow["ActionDate"] = df1.GetDateTimeISTNow();
            //    // clsEmployees.CurrRow.Item("WebSessions_Key") = sessionrow.Item("WebSessions_Key")
            //    var clsobj = new object[] { clsEmployees };
            //    int kl = cfc1.SaveIntodbGetKey(clsobj, clsEmployees.TableName, "P_employees");
            //    return kl;
            //}

            return 0;
        }

        /// <summary>
        /// Insert/ updates Accmaster table
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ChangedFieldsValuesPair"></param>
        /// <param name="sessionrow"></param>
        /// <returns></returns>
        public int InsertUpdateInAcc_Master(ref int id, ref Hashtable ChangedFieldsValuesPair, DataRow sessionrow)
        {
            //SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            //var argSessionInstance = SessionControl;
            //var clsAccMaster = new Accmaster.Accmaster.Accmaster(ref argSessionInstance);
            //SessionControl = argSessionInstance;
            //// Dim clsAccMaster As New Accmaster.Accmaster.Accmaster(SessionControl)
            //string seljt = "select * from Accmaster where P_acccode=" + id + " and rowstatus = 0";
            //var dtJT = df1.SqlExecuteDataTable(clsAccMaster.ServerDatabase, seljt);
            //// THIS IS FOR UPDATING A ROW
            //if (dtJT.Rows.Count > 0)
            //{
            //    clsAccMaster.PrevRow = df1.UpdateDataRows(clsAccMaster.PrevRow, dtJT.Rows[0]);
            //    for (int k = 0, loopTo = ChangedFieldsValuesPair.Keys.Count - 1; k <= loopTo; k++)
            //    {
            //        if (clsAccMaster.CurrDt.Columns.Contains(Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k))))
            //        {
            //            clsAccMaster.CurrRow.Item(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)) = GF1.GetValueFromHashTable(ChangedFieldsValuesPair, Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)));
            //        }
            //    }
            //    clsAccMaster.CurrRow["mtimestamp"] = df1.GetDateTimeISTNow();
            //    // clsAccMaster.CurrRow.Item("websessions_key") = sessionrow.Item("WebSessions_Key")
            //    var clsobj = new object[] { clsAccMaster };
            //    int kl = cfc1.SaveIntodbGetKey(clsobj, clsAccMaster.TableName, "p_acccode");
            //    return kl;
            //}
            //else
            //{
            //    // To insert in a Accmaster table
            //    for (int k = 0, loopTo1 = ChangedFieldsValuesPair.Keys.Count - 1; k <= loopTo1; k++)
            //    {
            //        if (clsAccMaster.CurrDt.Columns.Contains(Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k))))
            //        {
            //            clsAccMaster.CurrRow.Item(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)) = GF1.GetValueFromHashTable(ChangedFieldsValuesPair, Conversions.ToString(ChangedFieldsValuesPair.Keys.ElementAtOrDefault(k)));
            //        }
            //    }
            //    clsAccMaster.CurrRow["mtimestamp"] = df1.GetDateTimeISTNow();
            //    // clsAccMaster.CurrRow.Item("websessions_key") = sessionrow.Item("WebSessions_Key")
            //    var clsobj = new object[] { clsAccMaster };
            //    int kl = cfc1.SaveIntodbGetKey(clsobj, clsAccMaster.TableName, "P_acccode");
            //    return kl;
            //}
            return 0;
        }

        /// <summary>
        /// Funftion to show ShowId view containing credentials of newly created employee/dealers
        /// </summary>
        /// <returns></returns>
        public ActionResult ShowID()
        {

            return View();
        }

        [HttpGet]
        public ActionResult CallRecordingOfRegCalls()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallRecordingOfRegCalls", HttpContext.Session.GetString("serverdatabase")))
            {
                // ViewBag.Message = "By Date~2~date|By Firm Name~3~string|By ServicingDealer~4~integer|By Location~5~string|By Issue~6~string|By AssignTo~7~integer|By CallId~8~integer|By Mobile No~9~string"
                ViewBag.Message = "Date~2~date|Firm Name~3~string|Employee~4~integer|CallId~5~Integer";
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                
                string searchcondition = "infotype='searchstring' and viewid='callrecording' and  rowstatus=0 and Userlogin_key=" +  LoginRow["Userlogin_key"] + "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='callrecording' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string Infostring = df1.GetCellValue(searchdr, "infostring", "string").ToString() ?? "";
                var infoStringArr = Infostring.Split('@');
                ViewBag.filterString = infoStringArr[0];
                string sortcondition = "infotype='sortstring' and viewid='callrecording' and  rowstatus=0 and Userlogin_key=" + LoginRow["Userlogin_key"] + "";
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr is null)
                {
                    sortcondition = "infotype='sortstring' and viewid='callrecording' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");


                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }


        /// <summary>
        /// Used in getting pending calls list in crm in manage regcalls
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <param name="ServerOrderValue"></param>
        /// <returns></returns>
        public JsonResult ajaxGetCallRecordingOfRegCalls(string id, int? start, int pSize = 20, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json(""); // ("LogOut", "Home")

            // Dim SortCondition As String = "Linkcode asc"
            // If Not id = "" Then
            // SortCondition = cfc1.GetSortStringFromFrontEndForManageRegCalls(id, SortCondition)
            // End If
            string condition = "";
            // Dim condition As String = libCalls.GetSearchStringForPendingRegCalls(search)
            if (!string.IsNullOrEmpty(search))
            {
                condition = cfc1.GetSearchString(search); // this function convert raw search string into sql string 
            }
            // Dim dtEmp As DataTable = libSaralAuth.GetActiveEmployeesFromAccMaster(GlobalControl.Variables.UserServerDatabase, "p_acccode,accname")
            var dtEmp = libSaralAuth.GetActiveEmployeesFromAccMaster(SessionControl.UserServerDatabase, "p_acccode,accname");
            int a = libCalls.getRowsCountCallRecording(Convert.ToInt32(sessionRow["LinkCode"]), condition, SessionControl.UserServerDatabase);

            var dtcalls = libCalls.GetCallRecordingOfRegCalls(Convert.ToInt32(sessionRow["LinkCode"]), Convert.ToInt32(start),DtInfoTable ,DtInfoTableuser , dtEmp, SessionControl.UserServerDatabase, condition, order??"", pSize);

            var objdatatableToList = new DataTypeConversionLib.DTResult<RegCallRecordingViewModel>();
            objdatatableToList = (DataTypeConversionLib.DTResult<RegCallRecordingViewModel>)DCLib.ConvertDTtoModal<RegCallRecordingViewModel>(dtcalls, Convert.ToInt32(start), a, dtcalls.Rows.Count);
            return Json(objdatatableToList);
        }

        /// <summary>
        /// Function to return mp3 file to play file in browser
        /// </summary>
        /// <param name="Filename">name of amr file</param>
        /// <returns></returns>
        public FileResult PlayAudio(string Filename, string LinkUrl)
        {
            string mpath = @"C:\inetpub\GainbooksData\" + HttpContext.Session.GetString("corpid") + @"\recording\";
            // Filename = "dummycallrecord.amr"
            string FullFilename = @"C:\inetpub" + LinkUrl.Replace("/", @"\"); // mpath & Filename

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (System.IO.File.Exists(FullFilename))
            {
                mpath = mpath + Path.GetFileNameWithoutExtension(Filename) + ".mp3";
                bool mp3FilePresent = false;
                if (System.IO.File.Exists(mpath))
                {
                    mp3FilePresent = true;
                }
                if (mp3FilePresent == false)
                    cfc1.convertAmrTomp3(FullFilename, mpath, MyServer.MapPath("App_Data/ffmpeg.exe"));


                //return File(mpath, "audio/mpeg");
                var memory = new MemoryStream();
                using (var stream = new FileStream(mpath, FileMode.Open))
                {
                    stream.CopyTo(memory);
                }
                memory.Position = 0;
                return File(memory, "audio/mpeg", Path.GetFileNameWithoutExtension(Filename) + ".mp3");

            }
            else
            {
                return null;
            }

        }


        /// <summary>
        /// function to return amr file for download
        /// </summary>
        /// <param name="Filename">amr filename</param>
        /// <returns></returns>
        public JsonResult downloadRecordedRegCall(string Filename, string LinkUrl)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");
            string FullFilename = @"C:\inetpub" + LinkUrl.Replace("/", @"\");
            if (System.IO.File.Exists(FullFilename))
            {
                return Json(new { FullFilepath = FullFilename, contentType = "audio/amr", filename = Filename });
            }
            else
            {
                return Json("err");
            }
        }

        public FileResult DownloadFile(string FullFilepath, string contentType, string filename)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return null;


            //return File(FullFilepath, contentType, filename);
            
            var memory = new MemoryStream();
            using (var stream = new FileStream(FullFilepath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, contentType, filename);

        }

        /// <summary>
        /// Compress all files and download zip file
        /// </summary>
        /// <param name="LinkUrl">comma seperated file relative path</param>
        /// <returns></returns>
        public FileResult downloadMultipleRecordedRegCall(string LinkUrl)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return null;

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string basepath = @"C:\inetpub";
            string baseDirectory = basepath + @"\GainBooksData\"+ HttpContext.Session.GetString("corpid") + @"\recording\";
            string outputZipFileName = "Recording_" + df1.GetDateTimeISTNow().ToString("yyyyMMddHHmmss") + ".zip";
            string outputFilepath = baseDirectory + outputZipFileName;

            if (!string.IsNullOrEmpty(LinkUrl?.Trim()))
            {
                // 'Files
                var arrOfFilesToZip = LinkUrl.Split(',');
                using (var archive = ZipFile.Open(outputFilepath, ZipArchiveMode.Create))
                {
                    for (int i = 0, loopTo = arrOfFilesToZip.Length - 1; i <= loopTo; i++)
                    {
                        string amrFilePath = basepath + arrOfFilesToZip[i].Replace("/", @"\");
                        if (System.IO.File.Exists(amrFilePath))
                        {
                            archive.CreateEntryFromFile(amrFilePath, Path.GetFileName(amrFilePath));
                        }
                    }
                }
            }
            // 'Directory
            else if (Directory.Exists(baseDirectory))
            {
                var arrOfFilesToZip = Directory.GetFiles(baseDirectory, "*.amr");
                using (var archive = ZipFile.Open(outputFilepath, ZipArchiveMode.Create))
                {
                    for (int i = 0, loopTo1 = arrOfFilesToZip.Length - 1; i <= loopTo1; i++)
                        archive.CreateEntryFromFile(arrOfFilesToZip[i], Path.GetFileName(arrOfFilesToZip[i]));
                }
            }
            if (!System.IO.File.Exists(outputFilepath))
            {
                System.IO.File.Create(outputFilepath).Close();
            }
            //// Return File(outputFilepath, "application/octet-stream", Path.GetFileName(outputFilepath))
            //Response.Clear();
            //Response.Headers.Add("Content-Disposition", "attachment;filename=" + Path.GetFileName(outputFilepath));
            //Response.ContentType = "application/octet-stream";

            ////Response.WriteFile(outputFilepath);
            ////Response.Flush();
            ////System.IO.File.Delete(outputFilepath);
            ////Response.End();

            //return Json("success");

            
            var memory = new MemoryStream();
            using (var stream = new FileStream(outputFilepath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, "application/octet-stream", Path.GetFileName(outputFilepath));

        }

        /// <summary>
        /// function to get Message template text from P_msgtemplate
        /// </summary>
        /// <returns></returns>
        public JsonResult GetMessageTemplateText(int TempId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string MsgText = libCalls.evaluateMsg(TempId, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""), SessionControl.UserServerDatabase);
            return Json(MsgText);
        }



        public ActionResult ManageAllRegCallsKanban()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Manageallcallskanban", HttpContext.Session.GetString("serverdatabase")))
                return View();
            
            return RedirectToAction("LogOut", "Home");

        }

        public JsonResult AllRegCalls()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Manageallcallskanban", HttpContext.Session.GetString("serverdatabase")))
            {
                // Dim allcallsregObj As New AllCallsRegMaster
                // Dim dt As DataTable = allcallsregObj.GetIssuesfilegstAllData(Session("ServerDatabase"))
                var dt = libCalls.GetIssuesfilegstAllData(DtInfoTable ,DtInfoTableuser , SessionControl.UserServerDatabase);
                var dtstatus = dt.DefaultView.ToTable(true, new[] { "Status", "TextStatus" });
                var statusList = DCLib.ConvertDataTable<StatusModel>(dtstatus);
                var objdatatableToList = DCLib.ConvertDataTable<AllCallsRegMaster>(dt);
                return Json(new { Data = objdatatableToList, StatusList = statusList });
            }
            return Json("");
        }


        // added by aslam for AddAndLinkCustomer
        public JsonResult AddAndLinkCustomer(CustomerMaster CustomerObj, IFormCollection fc)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "linkcustomer", HttpContext.Session.GetString("serverdatabase")))
            {
                // CreateCustomer
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                
                string email = fc["CustEmail"];
                string CallId = fc["CallId"];
                CustomerObj.Email = email;
                CustomerObj.P_Customers = -1;
                DataRow? dtr = null;
                dtr = DCLib.GetDataRowFromModel<CustomerMaster>(CustomerObj);
                var dthash = GF1.CreateHashTable(dtr);
                dthash = GF1.AddItemToHashTable(ref dthash, "empAssigned", sessionRow["linkcode"], true);
                var dtHashAccMaster = new Hashtable();
                int P_Customers = 0;
                var resultHash = new Hashtable();
                var dthashCrmContacts = new Hashtable();
                var dthashCrmPhone = new Hashtable();
                // 'New Code for customer
                dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "AccName", CustomerObj.CustName, true);
                dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Mobile", CustomerObj.MobNo, true);
                dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Contactperson", CustomerObj.Contactperson, true);
                dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Status", "Y");
                dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "acctype", 3041);
                dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "email", CustomerObj.Email, true);

                dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "fullname", CustomerObj.Contactperson, true);
                dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "email", CustomerObj.Email, true);
                dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "mobilephone", CustomerObj.MobNo, true);
                dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "isprimarycontact", "Y", true);

                dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "number", CustomerObj.MobNo, true);
                dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "isregistered", "Y", true);
                if (!string.IsNullOrEmpty(CustomerObj.MobNo))
                {
                    dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "ismobile", "Y", true);
                }

                // resultHash = libcustomerfeature.InsertUpdateAccmasterCustomerCrmContactsCrmPhone(-1, dtHashAccMaster, -1, dthash, -1, dthashCrmContacts, -1, dthashCrmPhone, GlobalControl.Variables.UserServerDatabase, Session("WebSessionRow"))
                int argp_acccode = -1;
                int argP_Customers = -1;
                int argp_crmcontacts = -1;
                int argp_crmphone = -1;
                resultHash = libcustomerfeature.InsertUpdateAccmasterCustomerCrmContactsCrmPhone(ref argp_acccode, ref dtHashAccMaster, ref argP_Customers, ref dthash, ref argp_crmcontacts, ref dthashCrmContacts, ref argp_crmphone, ref dthashCrmPhone, SessionControl.UserServerDatabase, sessionRow);
                P_Customers = Convert.ToInt32(resultHash["p_customers"]);

                // 'LinkCustomer
                int P_AllCallsReg = Convert.ToInt32(CallId);
                var dtcust = libcustomerfeature.getCustomerRowFromP_customers(P_Customers, SessionControl.UserServerDatabase);
                // libcustomerfeature.getCustomerRowFromcustomers_key(Customers_key, Session("ServerDatabase"))
                var changedfields = new Hashtable();
                changedfields = GF1.AddItemToHashTable(ref changedfields, "p_customers", df1.GetCellValue(dtcust, "p_customers"));
                changedfields = GF1.AddItemToHashTable(ref changedfields, "Firmname", df1.GetCellValue(dtcust, "CustName"));
                changedfields = GF1.AddItemToHashTable(ref changedfields, "ContactPerson", df1.GetCellValue(dtcust, "Contactperson"), false);
                changedfields = GF1.AddItemToHashTable(ref changedfields, "Emailid", df1.GetCellValue(dtcust, "Email"));
                int MainBussCode = 0;
                if (df1.GetCellValue(dtcust, "MainBussCode") is DBNull == false)
                {
                    MainBussCode = Convert.ToInt32(df1.GetCellValue(dtcust, "MainBussCode"));
                }
                changedfields = GF1.AddItemToHashTable(ref changedfields, "Businesstype", MainBussCode);

                if (Convert.ToInt32(df1.GetCellValue(dtcust, "HomeTown")) !=  0)
                {
                    string hometownText = cfc1.GetNameOfInfoFromInfotableFromP_infotable(Convert.ToInt32(df1.GetCellValue(dtcust, "HomeTown")), SessionControl.UserServerDatabase);
                    changedfields = GF1.AddItemToHashTable(ref changedfields, "Location", hometownText);
                }
                int success = libCalls.InsertUpdateAllCallsReg(ref P_AllCallsReg, ref changedfields, sessionRow, SessionControl.UserServerDatabase);
                return Json("success");
            }
            return Json("");
        }


        // 'Added by aslam for CallsCommunication
        public ActionResult ManageCallsComm()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallsComm", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");

                ViewBag.Message = "Date~2~date|Firm Name~3~string|Issue~4~Integer|Description~5~string|RemarkBy~6~integer|CallId~7~integer";

                string searchcondition = "infotype='searchstring' and viewid='manageCallsComm' and  rowstatus=0 and Userlogin_key=" + LoginRow["Userlogin_key"]  + "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                if (searchdr == null)
                {
                    searchcondition = "infotype='searchstring' and viewid='manageCallsComm' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string Infostring = df1.GetCellValue(searchdr, "infostring", "string").ToString()?? "";
                var infoStringArr = Infostring.Split('@');
                ViewBag.filterString = infoStringArr[0];
                string sortcondition = "infotype='sortstring' and viewid='manageCallsComm' and  rowstatus=0 and Userlogin_key=" + LoginRow["Userlogin_key"] + "";
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr is null)
                {
                    sortcondition = "infotype='sortstring' and viewid='manageCallsComm' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");

                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }


        public JsonResult ajaxManageCallsComm(int? start, int pSize = 20, string search = "", string order = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallsComm", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey =0 ;
                if (sessionRow is not null)
                {
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                }
                string condition = string.Empty;
                if (!string.IsNullOrEmpty(search))
                {
                    condition = cfc1.GetSearchString(search); // this function convert raw search string into sql string 
                }
                int a = libCalls.GetRowsCountCallsCommDataForGrid(Loginkey,SessionControl.UserServerDatabase, condition);
                var dt = libCalls.GetCallsCommDataForGrid(Loginkey, start, DtInfoTable ,DtInfoTableuser , SessionControl.UserServerDatabase, pSize, condition, order);
                var dataTableData = new DataTypeConversionLib.DTResult<CallsCommModel>();
                dataTableData = (DataTypeConversionLib.DTResult<CallsCommModel>)DCLib.ConvertDTtoModal<CallsCommModel>(dt, Convert.ToInt32(start), a, dt.Rows.Count);
                return Json(dataTableData);
            }
            return Json("");
        }


        /// <summary>
        /// function to send remark excel of a call id to the given emailid in manageregcall
        /// </summary>
        /// <param name="callid"></param>
        /// <param name="calltype"></param>
        /// <param name="emailId"></param>
        /// <returns></returns>
        [HttpPost()]
        public JsonResult SendRemarkInEmail(int callid, string calltype, string emailId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "viewcallremark", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                
                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode(calltype, callid, SessionControl.UserServerDatabase, "p_crmtasks");
                var dtremarks = libCRMTasks.GetRemarkDataOfATask(Convert.ToInt32(df1.GetCellValue(taskRow, "p_crmtasks", "integer")), SessionControl.UserServerDatabase);
                string Filename = callid + "_remark" + df1.GetDateTimeISTNow().ToString("dd_MM_yyyy_hh_mm") + ".xlsx";
                var dt = new DataTable();
                dt = df1.AddColumnsInDataTable(ref dt, "S.No,Remark,Commtype,Date,CreatedBy");
                if (dtremarks.Rows.Count > 0)
                {
                    for (int i = 0, loopTo = dtremarks.Rows.Count - 1; i <= loopTo; i++)
                    {
                        var aa = dt.NewRow();
                        aa["S.No"] = i + 1;
                        aa["Remark"] = dtremarks.Rows[i]["Commtext"];
                        aa["Commtype"] = dtremarks.Rows[i]["TextCommunicationtype"];
                        aa["Date"] = dtremarks.Rows[i]["FrmtCreationDate"];
                        aa["CreatedBy"] = dtremarks.Rows[i]["TextLogincode"];
                        dt.Rows.Add(aa);
                    }
                }
                // Dim FullFilename As String = Server.MapPath("~/Employees/" & Filename)
                // Dim filepath As String = Path.GetDirectoryName(FullFilename)
                // 'If Not Directory.Exists(filepath) Then
                // '    Directory.CreateDirectory(filepath)
                // 'Else
                // '    Dim di As System.IO.DirectoryInfo = New DirectoryInfo(filepath)
                // '    For Each file As FileInfo In di.GetFiles()
                // '        file.Delete()
                // '    Next
                // 'End If
                // cfc1.ExportDataToExcel(dt, FullFilename)
                // Dim subject As String = "Remarks of CallId:" & callid
                // gflib.SendEmail(emailId, subject, "", "C:\cntr_dir\googleapiconfig.txt",, FullFilename)

                string RegfolderPath = MyServer.MapPath(HttpContext.Session.GetString("corpid") + "/documents/" + Filename).Replace(@"sites\gainbooks.com", "gainbooksdata");
                cfc1.ExportDataToExcel(dt, RegfolderPath);
                string subject = "Remarks of CallId:" + callid;
                gflib.SendEmail(emailId, subject, "", @"C:\cntr_dir\googleapiconfig.txt", FullFilePath: RegfolderPath);
                // gflib.SendEmail("aslam2321@gmail.com", "TEST", "", "C:\cntr_dir\googleapiconfig.txt")


                return Json("Success");
            }
            return Json("");

        }



        /// <summary>
        /// function to download excel of remarks of a call in view remark in manageregcall
        /// </summary>
        /// <param name="callid"></param>
        /// <param name="calltype"></param>
        /// <returns></returns>
        public FileResult remarkExportToExcel(int callid, string calltype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return null;

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "viewcallremark", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
              
                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode(calltype, callid,SessionControl.UserServerDatabase, "p_crmtasks");
                var dtremarks = libCRMTasks.GetRemarkDataOfATask(Convert.ToInt32(df1.GetCellValue(taskRow, "p_crmtasks", "integer")),SessionControl.UserServerDatabase);
                string Filename = callid + "_ProgressNote" + df1.GetDateTimeISTNow().ToString("dd_MM_yyyy_hh_mm") + ".xlsx";
                var dt = new DataTable();
                dt = df1.AddColumnsInDataTable(ref dt, "S.No,ProgressNote,Date,AddedBy");
                if (dtremarks.Rows.Count > 0)
                {
                    int m = 0;
                    for (int i = 0, loopTo = dtremarks.Rows.Count - 1; i <= loopTo; i++)
                    {
                        if (!string.IsNullOrEmpty(df1.GetCellValue(dtremarks.Rows[i], "Commtext", "string").ToString()))
                        {
                            var aa = dt.NewRow();
                            m += 1;
                            aa["S.No"] = m;
                            aa["ProgressNote"] = df1.GetCellValue(dtremarks.Rows[i], "Commtext", "string");
                            aa["Date"] = df1.GetCellValue(dtremarks.Rows[i], "FrmtCreationDate");
                            aa["AddedBy"] = df1.GetCellValue(dtremarks.Rows[i], "TextLogincode", "string");
                            dt.Rows.Add(aa);
                        }
                    }
                }


                using (var wb = new XLWorkbook())
                {
                    wb.Worksheets.Add(dt, "sheet1");
                    using (var Stream1 = new MemoryStream())
                    {
                        wb.SaveAs(Stream1);
                        return File(Stream1.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", Filename);
                    }
                }
            }
            return null;

        }

        /// <summary>
        /// Retrun json data of Tasg for a Call
        /// </summary>
        /// <param name="Callid"></param>
        /// <returns></returns>
        public JsonResult ShowTagsData(int Callid)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"),HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services", HttpContext.Session.GetString("serverdatabase")))
            {
                var dt = libCalls.GetTagsOfACall(Callid,DtInfoTable ,DtInfoTableuser , SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<TagsMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<TagsMaster>)DCLib.ConvertDTtoModal<TagsMaster>(dt, recordsTotal: dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        /// <summary>
        /// Delete tag from tags table
        /// </summary>
        /// <param name="p_tags"></param>
        /// <returns></returns>
        public JsonResult DeleteTag(int p_tags)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"),HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services", HttpContext.Session.GetString("serverdatabase")))
            {
                int result = libCalls.deleteTag(p_tags, SessionControl.UserServerDatabase);
                if (result > 0)
                {
                    return Json("Success");
                }
            }
            return Json("");
        }

        /// <summary>
        /// Add tag for a Call in tags table
        /// </summary>
        /// <param name="Callid"></param>
        /// <param name="p_infotable"></param>
        /// <returns></returns>
        public JsonResult AjaxAddCallTags(int Callid, int p_infotable)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return Json("");
                
                
                var dtTagsHash = new Hashtable();
                dtTagsHash = GF1.AddItemToHashTable(ref dtTagsHash, "linktype", "C", true);
                dtTagsHash = GF1.AddItemToHashTable(ref dtTagsHash, "tagkey", p_infotable, true);
                dtTagsHash = GF1.AddItemToHashTable(ref dtTagsHash, "linkcode", Callid, true);
                bool duplicate = libSaralAuth.CheckDuplicateForTagsTable("C", p_infotable, Callid, SessionControl.UserServerDatabase);
                if (duplicate)
                {
                    return Json("Already Added");
                }
                int argP_tags = -1;
                int a = libSaralAuth.InsertUpdateTags(ref argP_tags, ref dtTagsHash, sessionRow, SessionControl.UserServerDatabase);
                if (a > 0)
                {
                    return Json("true");
                }
                else
                {
                    return Json("err");
                }
            }
            return Json("");
        }

        /// <summary>
        /// Add Multiple Tags on Multiple calls
        /// </summary>
        /// <param name="Callids">Comma Separated p_allcallsreg</param>
        /// <param name="tagkeys">Comma Separated p_infotable for Tags</param>
        /// <returns></returns>
        public JsonResult AjaxAddMultipleTags(string Callids, string tagkeys)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return Json("");
                

                var hashTableList = new List<Hashtable>();
                string lcondition = " rowstatus=0 and linktype='C' and tagkey in (" + tagkeys + ") and linkcode in (" + Callids + ")";
                var dtTags = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "tags", lcondition, "p_tags,tagkey,linkcode");

                var callidsArr = Callids.Split(',');
                var tagkeysArr = tagkeys.Split(',');

                for (int i = 0, loopTo = callidsArr.Length - 1; i <= loopTo; i++)
                {
                    for (int j = 0, loopTo1 = tagkeysArr.Length - 1; j <= loopTo1; j++)
                    {
                        var dtRow = dtTags.Select("tagkey=" + tagkeysArr[j] + " and linkcode=" + callidsArr[i]).FirstOrDefault();
                        if (dtRow == null)
                        {
                            var Taghash = new Hashtable();
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "linktype", "C");
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "tagkey", tagkeysArr[j]);
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "linkcode", callidsArr[i]);
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "p_tags", -1);
                            hashTableList.Add(Taghash);
                        }
                    }
                }
                if (hashTableList.Count > 0)
                {
                    int a = libSaralAuth.InsertUpdateMultipleTags("-1", ref hashTableList, sessionRow, SessionControl.UserServerDatabase);
                    if (a > 0)
                    {
                        return Json("true");
                    }
                    else
                    {
                        return Json("err");
                    }
                }
                else
                {
                    return Json("Already Added");
                }




            }
            return Json("");
        }


        /// <summary>
        /// retrun Call Activity details
        /// </summary>
        /// <param name="callid"></param>
        /// <returns></returns>
        public JsonResult GetCallActivityLog(int callid)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Services", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow userloginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");

                var dt = libCalls.GetCallActivityData(callid,Convert.ToInt32(df1.GetCellValue(userloginRow, "linkcode", "integer")), SessionControl.UserServerDatabase);

                var objdatatableToList = new DataTypeConversionLib.DTResult<TaskActivityMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<TaskActivityMaster>)DCLib.ConvertDTtoModal<TaskActivityMaster>(dt, 1, dt.Rows.Count, 0);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        // 'Added by aslam
        /// <summary>
        /// EditRegCalls from Detail pane
        /// </summary>
        /// <param name="mRegCalls"></param>
        /// <param name="fc"></param>
        /// <returns></returns>
        public JsonResult EditCall(RegCalls mRegCalls, IFormCollection fc)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "editregcall", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
               
                string responseMsg = "";
                if (ModelState.IsValid)
                {
                    bool StatusClosed = false;
                    string settingsstring = df1.GetCellValue(libSaralAuth.getUserSettingsRowFromUserLogin_key(Convert.ToInt32(LoginRow["Userlogin_key"]), SessionControl.UserServerDatabase), "settingsstring", "string").ToString() ?? "";
                    string AllowCloseCallWithoutLinkingCustomer = "";
                    if (!string.IsNullOrEmpty(settingsstring))
                    {
                        AllowCloseCallWithoutLinkingCustomer = libSaralAuth.GetPropertyValfromSettingsString(settingsstring, "AllowCloseCallWithoutLinkingCustomer");
                    }

                    int status = 0;
                 //   DataTable dtinfotableuser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
                    if (DtInfoTableuser .Rows.Count > 0)
                    {
                        var drWorkFlowStatus = DtInfoTableuser .Select("infotype=67").FirstOrDefault();
                        if (!(drWorkFlowStatus is null))
                        {
                            status = Convert.ToInt32(df1.GetCellValue(drWorkFlowStatus, "nameofinfo", "integer"));
                        }
                    }

                    if (mRegCalls.Status != 0 & mRegCalls.Status == status)
                    {
                        switch (AllowCloseCallWithoutLinkingCustomer ?? "")
                        {
                            case "Y":
                                {
                                    StatusClosed = true;
                                    break;
                                }
                            case "N":
                                {
                                    if (mRegCalls.P_Customers == -1 | mRegCalls.P_Customers == 0)
                                    {
                                        responseMsg = "Call Is Not linked To customer, please link customer , then close the call.";
                                        return Json(responseMsg);
                                    }
                                    else
                                    {
                                        StatusClosed = true;
                                    }

                                    break;
                                }

                            case "":
                                {
                                    if (mRegCalls.P_Customers == -1 | mRegCalls.P_Customers == 0)
                                    {
                                        responseMsg = "Call Is Not linked To customer, please link customer , then close the call.";
                                        return Json(responseMsg);
                                    }
                                    else
                                    {
                                        StatusClosed = true;
                                    }

                                    break;
                                }
                        }
                    }

                    DataRow? dtr = null;
                    var dthash = new Hashtable();
                    var argSessionInstance = SessionControl;
                    var clsAllCallsReg = new AllCallsReg.AllCallsReg.AllCallsReg(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    dthash = DCLib.ConvertIFCToHashTable(fc, clsAllCallsReg);
                    dthash = GF1.AddItemToHashTable(ref dthash, "modifiedby", df1.GetCellValue(sessionRow, "linkcode", "integer"), true);

                    if (StatusClosed == true)
                    {
                        var dtIssue = libCalls.getCallRowfromP_allcallsreg(mRegCalls.P_AllCallsReg, SessionControl.UserServerDatabase, "Creationdate,registerdate");
                        TimeSpan ts = (TimeSpan)(Convert.ToDateTime(df1.GetCellValue(dtIssue, "Creationdate", "string")) - Convert.ToDateTime(df1.GetCellValue(dtIssue, "registerdate", "string")));
                        int duration = (int)Math.Round(ts.TotalSeconds);
                        dthash = GF1.AddItemToHashTable(ref dthash, "duration", duration, true);
                    }

                    int argid = mRegCalls.P_AllCallsReg;
                    libCalls.InsertUpdateAllCallsReg(ref argid, ref dthash, sessionRow, SessionControl.UserServerDatabase);
                    mRegCalls.P_AllCallsReg = argid;

                    if (StatusClosed == true)
                    {
                        DataRow dttasks = (DataRow)libCRMTasks.GetActiveTaskRowForAParticularCall(mRegCalls.P_AllCallsReg, SessionControl.UserServerDatabase);
                        libCRMTasks.TaskClose(Convert.ToInt32(dttasks["crmtasks_key"]), sessionRow, SessionControl.UserServerDatabase);

                        string email = mRegCalls.Emailid;
                        //                        string msg = "Dear " + mRegCalls.Contactperson + ", " + mRegCalls.Firmname + "  Your call registered at Saral";
                        //                        string Message = "Dear " + mRegCalls.Contactperson + ", " + mRegCalls.Firmname + "<br/><br/>Your call registered at Saral";
                        //                        if (!string.IsNullOrEmpty(mRegCalls.Issuedescription))
                        //                        {
                        //                            Message += " regarding the issue \" " + mRegCalls.Issuedescription + " \"";
                        //                            msg += " regarding the issue  \" " + mRegCalls.Issuedescription + " \"";
                        //                        }
                        //                        Message += @" has been marked completed and is closed from our end.<br/>In case you are not satisfied with the resolution, kindly mail at nehagupta@saralerp.com, hcgupta@saralerp.com<br/><br/><br/>Regards<br/>Saral Team<br/>Customer Care";
                        //                        msg += @" has been marked completed and is closed from our end. In case you are not satisfied with the resolution, kindly mail at nehagupta@saralerp.com, hcgupta@saralerp.com
                        //Thanks
                        //Saral Team";

                        string templateText = libSaralAuth.GetMsgTemplateTextByTemplateType(3182, SessionControl.UserServerDatabase);
                        Hashtable varHash = new Hashtable();
                        varHash = GF1.AddItemToHashTable(ref varHash, "callid", mRegCalls.P_AllCallsReg);
                        varHash = GF1.AddItemToHashTable(ref varHash, "issuedescription", mRegCalls.Issuedescription);
                        string msg = cfc1.evaluateVariable(templateText, varHash);

                        string MobNo = mRegCalls.Mobileno.ToString().Trim();
                        if (!string.IsNullOrEmpty(MobNo))
                        {
                            var dtmsg = cfc1.CreateMsgQueueDt("M", msg, "", MobNo, "", "N");
                            cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);

                        }
                        if (!string.IsNullOrEmpty(email))
                        {
                            //Message = Message + Convert.ToChar(201) + "Notification: Call closed at Saral";
                            //var dtmsg = cfc1.CreateMsgQueueDt("E", Message, "", email, "", "N");
                            var dtmsg = cfc1.CreateMsgQueueDt("E", msg, "", email, "", "N");
                            cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);
                        }
                    }
                }
                else
                {
                    responseMsg = "An error occured while storing your Information. Please try again later.";
                    return Json(responseMsg);
                }
                return Json("success");
            }
            return Json("LogOut");
        }

        // 'Added by aslam for PublicFeedbackUrl
        public JsonResult CreateFeedbackUrlForCall(int P_AllCallsReg)
        {
            // 'Check session
            if (HttpContext.Session.GetString("userloginrow") is null | HttpContext.Session.GetString("saralloginrow") is null)
            {
                return Json("logout");
            }

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            string PublicFeedbackUrl = string.Empty;
            DataRow UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            DataRow SaralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
            

            var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode("C", P_AllCallsReg, SessionControl.UserServerDatabase, "p_crmtasks");
            if (taskRow == null)
            {
                return Json("");
            }

            // CorpId~Userid~P_CrmTasks
            int p_crmtasks = Convert.ToInt32(df1.GetCellValue(taskRow, "p_crmtasks", "integer"));
            string queryStr = SaralLoginRow?["userid"].ToString()?.Trim().ToUpper() + "~" + UserLoginRow?["userid"].ToString()?.Trim().ToUpper() + "~" + p_crmtasks;
            var vm1 = new ValidateMachine.SimpleEncClass("q");
            string encStr = vm1.EncryptData(queryStr);
            encStr = System.Net.WebUtility.UrlEncode(encStr); //Url.Encode(encStr); //Aslam_Encode_check_done
            //if (HttpContext.Request.Host.ToString().ToLower().Contains("localhost"))
            //{
            //    PublicFeedbackUrl = string.Format("{0}://{1}:{2}/PublicUrl/Feedback?encStr={3}", HttpContext.Request.Scheme, HttpContext.Request.Host, HttpContext.Request.Host.Port, encStr);
            //}
            //else
            //{
            //    PublicFeedbackUrl = string.Format("{0}://{1}/PublicUrl/Feedback?encStr={2}", HttpContext.Request.Scheme, HttpContext.Request.Host, encStr);
            //}
            string encStr2 = System.Net.WebUtility.UrlEncode(encStr);  //double encoded url
            //PublicFeedbackUrl = string.Format("{0}://{1}/PublicUrl/Feedback?encStr={2}", HttpContext.Request.Scheme, HttpContext.Request.Host, encStr);
            PublicFeedbackUrl = string.Format("{0}://{1}/PublicUrl/Feedback?encStr={2}", HttpContext.Request.Scheme, HttpContext.Request.Host, encStr2);
            DataRow callsRow= libCalls.getCallRowfromP_allcallsreg(P_AllCallsReg,SessionControl.UserServerDatabase,"mobileno");
            string whatsAppShareLink = cfc1.CreateWhatsAppShareLink(df1.GetCellValue(callsRow, "mobileno", "string").ToString(), PublicFeedbackUrl);
            //return Json(PublicFeedbackUrl);
            return Json(whatsAppShareLink);
        }



        /// <summary>
        /// Show Pending OTP's for Change Customer Reg. mobile number
        /// </summary>
        /// <returns></returns>
        public ActionResult PendingOTP()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "pendingotp", HttpContext.Session.GetString("serverdatabase")))
            {
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Get Pending OTP for Grid
        /// </summary>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <param name="ServerOrderValue"></param>
        /// <returns></returns>
        public JsonResult ajaxPendingOTP(int? start, int pSize = 20, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "pendingotp", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return Json("");
                DataTable dt = new DataTable ();
                //DataTable dt = libcustomerfeature.GetPendingOtpData(libSaralAuth.GetInfoTable(SessionControl.UserServerDatabase), libSaralAuth.GetInfoTableUser(SessionControl.UserServerDatabase), SessionControl.UserServerDatabase, Convert.ToInt32(start), pSize);
                if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 17488)
                {
                   dt  = libcustomerfeature.GetPendingOtpData(DtInfoTable, DtInfoTableuser, SessionControl.MainServerDatabase, Convert.ToInt32(start), pSize);
                }
                else
                {
                     dt = libcustomerfeature.GetPendingOtpData(DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase , Convert.ToInt32(start), pSize);
                }
                var objdatatableToList = new DataTypeConversionLib.DTResult<TempContactModel>();
                objdatatableToList = (DataTypeConversionLib.DTResult<TempContactModel>)DCLib.ConvertDTtoModal<TempContactModel>(dt, Convert.ToInt32(start), dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            else
            {
                return Json("");
            }

            
        }

        /// <summary>
        /// Return Json Data for Grid Search Control
        /// </summary>
        /// <param name="headerDtStr"></param>
        /// <param name="tableName"></param>
        /// <param name="lJoin"></param>
        /// <param name="lCondition"></param>
        /// <param name="lOrder"></param>
        /// <returns></returns>
        public JsonResult GetDataforGridSearchControl(string headerDtStr, string tableName, string lJoin, string lCondition, string? lOrder = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            DataTable headerdt = DCLib.ConvertJSONToDataTableNew(headerDtStr);


            StringBuilder lSelectBuilder = new StringBuilder();
            StringBuilder txtColumnsBuiler = new StringBuilder();
            StringBuilder txtColumnTypesBuiler = new StringBuilder();
           
            StringBuilder tableCodesFieldsBuilder = new StringBuilder();
            StringBuilder addingNameBuilder = new StringBuilder();

            List<string> dateColumnList = new List<string>();

            for (int i = 0; i < headerdt.Rows.Count; i++)
            {
                string sqlColumn = df1.GetCellValue(headerdt.Rows[i], "SqlColumn", "string").ToString()??"";

                lSelectBuilder.Append(sqlColumn).Append(",");

                //TxtFields needs to add in return dt
                if (Convert.ToBoolean(headerdt.Rows[i]["NeedTxtField"]))
                {
                    txtColumnsBuiler.Append("txt").Append(sqlColumn).Append(",");
                    txtColumnTypesBuiler.Append("system.string").Append(",");

                    if (!Convert.ToBoolean(headerdt.Rows[i]["TxtFieldIsDate"]))
                    {
                        tableCodesFieldsBuilder.Append(sqlColumn).Append(",");
                        addingNameBuilder.Append("txt").Append(sqlColumn).Append(",");
                    }
                    else
                    {
                        dateColumnList.Add(sqlColumn);
                    }
                }
            }

            string lSelect = lSelectBuilder.ToString().TrimEnd(',');
            string txtColumnsName = txtColumnsBuiler.ToString().TrimEnd(',');
            string txtColumnsType = txtColumnTypesBuiler.ToString().TrimEnd(',');
           
            string tableCodesFields = tableCodesFieldsBuilder.ToString().TrimEnd(',');
            string addingName = addingNameBuilder.ToString().TrimEnd(',');

            string sqlstr = string.Empty;
            sqlstr = "select  " + lSelect + " from " + tableName;

            if (!string.IsNullOrEmpty(lJoin))
            {
                sqlstr += " " + lJoin;
            }

            if (!string.IsNullOrEmpty(lCondition))
            {
                sqlstr += " where " + lCondition;
            }

            if (!string.IsNullOrEmpty(lOrder))
            {
                sqlstr += " order by " + lOrder;
            }


            var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
            if (!string.IsNullOrWhiteSpace(txtColumnsName))
            {
                dt = df1.AddColumnsInDataTable(ref dt, txtColumnsName, txtColumnsType);
            }

            if (!string.IsNullOrWhiteSpace(tableCodesFields))
            {
                dt = df1.AddingNameForCodesPrimaryColsInfotable(dt, tableCodesFields, addingName, DtInfoTable, DtInfoTableuser, "nameofinfo");
            }
            

            if (dateColumnList.Count > 0)
            {
                for (int j = 0; j < dt.Rows.Count; j++)
                {
                    for (int k = 0; k < dateColumnList.Count; k++)
                    {
                        if (dt.Rows[j][dateColumnList[k]] is not DBNull)
                        {
                            DateTime temp = Convert.ToDateTime(df1.GetCellValue(dt.Rows[j],dateColumnList[k], "string"));
                            dt.Rows[j]["txt" + dateColumnList[k]] = temp.ToString("dd-MM-yyyy");
                        }
                    }
                }
            }
            
            return Json(JsonConvert.SerializeObject(dt));
        }















    }
}




