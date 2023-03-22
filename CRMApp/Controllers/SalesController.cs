using CRMApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Data;

namespace CRMApp.Controllers
{
    public class SalesController : Controller
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
        private object? _gf1 = null;
        private GlobalFunction1.GlobalFunction1 gf1
        {
            get
            {
                if (_gf1 is null)
                {
                    var argSessionInstance = SessionControl;
                    _gf1 = new GlobalFunction1.GlobalFunction1(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _gf1 = (GlobalFunction1.GlobalFunction1)_gf1;
                }
                return (GlobalFunction1.GlobalFunction1)_gf1;
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

        DataTable DtInfoTable = new DataTable();
        DataTable DtInfoTableuser = new DataTable();

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
            gf1.SessionControl = sessionControl;
            df1.SessionControl = sessionControl;
            DCLib.SessionControl = sessionControl;
            cfc1.SessionControl = sessionControl;
            libSaralAuth.SessionControl = sessionControl;           
            libCRMTasks.SessionControl = sessionControl;
            libCalls.SessionControl = sessionControl;
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
        /// function to get Remarks of a particular call according to CallId
        /// </summary>
        /// <param name="key">P_crmlead</param>
        /// <returns></returns>
        public JsonResult AddRemarkData(int? key)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "viewcrmLeadcallremark", HttpContext.Session.GetString("serverdatabase")))
            {
                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode("L", Convert.ToInt32(key), SessionControl.UserServerDatabase, "p_crmtasks");
                var dtremarks = libCRMTasks.GetRemarkDataOfATask(Convert.ToInt32(df1.GetCellValue(taskRow, "p_crmtasks", "integer")), SessionControl.UserServerDatabase);
                var datatableData = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                datatableData = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dtremarks, 1, dtremarks.Rows.Count);
                return Json(datatableData);
            }
            return Json("");
        }


        /// <summary>
        /// function to linkcustomer to a call on manageregcall page
        /// </summary>
        /// <param name="CallId">P_issuesfilegst</param>
        /// <param name="P_crmaccounts"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult LinkAccount(int CallId, int P_crmaccounts)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "linkaccount", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int P_crmlead = CallId;
                var dtcust = libCalls.getCRMAccountRowFromP_CRMAccounts(P_crmaccounts, SessionControl.UserServerDatabase);
                var changedfields = new Hashtable();
                changedfields = gf1.AddItemToHashTable(ref changedfields, "AccountCode", P_crmaccounts);
                changedfields = gf1.AddItemToHashTable(ref changedfields, "Email", df1.GetCellValue(dtcust, "Email"));
                changedfields = gf1.AddItemToHashTable(ref changedfields, "HomeTown", df1.GetCellValue(dtcust, "HomeTown"));
                int success = libCalls.InsertUpdateCRMLead(ref P_crmlead, ref changedfields, sessionRow, SessionControl.UserServerDatabase);
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
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "crmLeadcallassign", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                bool success = false;
                if (ModelState.IsValid)
                {
                    int p_acccode = empId;
                    var crmleadRow = libCalls.getCallRowfromP_crmlead(Callid, SessionControl.UserServerDatabase);
                    success = libCalls.LeadCallAssigntoEmp(crmleadRow, sessionRow, p_acccode, SessionControl.UserServerDatabase);
                    if (success == true)
                    {
                        var empRow = libSaralAuth.getAccMasterRowForp_acccode(p_acccode, "email,accname");
                        string email = empRow["Email"].ToString()?.Trim() ?? "";
                        string AssignedBy = HttpContext.Session.GetString("loginname") ??"";
                        string Message = "Dear " + empRow["accname"] + "<br/><br/>Call: "+ crmleadRow["Topic"].ToString()?.Trim() + "<br/>has been Assigned to you by "+ AssignedBy.ToString().Trim();
                        if (!string.IsNullOrEmpty(email.ToString().Trim()))
                        {
                            Message = Message + Convert.ToChar(201) + "Call Assigned";
                            var dtmsg = cfc1.CreateMsgQueueDt("E", Message, "", email, "", "N");
                            // cfc1.InsertIntoMsgQueue(dtmsg, sessionRow)
                        }
                    }
                }
                return Json(success.ToString());
            }
            return Json("");
        }

        /// <summary>
        /// function to addRemark to a call on ManageRegCalls view
        /// </summary>
        /// <returns></returns>
        public JsonResult AddCallRemark()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addcrmleadcallremark", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string strremark = Request.Form["remark"];
                int callid = Convert.ToInt32(Request.Form["CallIdForRemark"]);
                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode("L", callid, SessionControl.UserServerDatabase, "p_crmtasks");
                var dtissuescomm1 = libCRMTasks.CreateCRMCommunicationDt(strremark, "T", Convert.ToInt32(taskRow["p_crmtasks"]), 2739);
                libCRMTasks.AddRowInCRMcommunication(dtissuescomm1, sessionRow, SessionControl.UserServerDatabase);
                return Json("");
            }
            return Json("");
        }

        // 'Added by aslam
        public JsonResult AjaxGetdataFromInfotableByInfotype(int infotype)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }
            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            //string sqlstr = "select nameofinfo,p_infotable from infotable where infotype=" + infotype + " order by nameofinfo";
            string sqlstr = "select nameofinfo,p_infotable from infotableuser where rowstatus=0 and (updateflag<>'D' or updateflag is null) and infotype=" + infotype + " order by nameofinfo";
            var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
            if (dt.Rows.Count==0)
            {
                sqlstr = "select nameofinfo,p_infotable from infotable where rowstatus=0 and (updateflag<>'D' or updateflag is null) and infotype=" + infotype + " order by nameofinfo";
                dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
            }
             
            if (dt.Rows.Count > 0)
            {
                DataTypeConversionLib.DTResult<InfotableMaster> datatabledata;
                datatabledata = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt);
                return Json(datatabledata);
            }
            else
            {
                return Json("error");
            }
        }


        public ActionResult LeadForm(int? P_crmLead, string exitmode = "create", string CalledFrom = "")
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "crmleadform", HttpContext.Session.GetString("serverdatabase")))
            {
                var LeadObj = new CRMLeadMaster();
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                if (ModelState.IsValid)
                {

                    // Fill AccountsForm object according to a Account Record
                    if (exitmode.ToLower() == "edit" | exitmode.ToLower() == "delete")
                    {
                        var CRMLeadRow = libCalls.getCallRowfromP_crmlead(Convert.ToInt32(P_crmLead), SessionControl.UserServerDatabase);
                        LeadObj.CRMLead_key = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "CRMLead_key"));
                        LeadObj.P_CRMLead = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "P_CRMLead"));
                        LeadObj.Logincode = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "LoginCode"));
                        LeadObj.CreationDate = Convert.ToDateTime(df1.GetCellValue(CRMLeadRow, "CreationDate"));
                        LeadObj.Topic = df1.GetCellValue(CRMLeadRow, "Topic").ToString() ?? "";
                        LeadObj.PurchaseTime = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "PurchaseTime"));
                        LeadObj.Budget = Convert.ToDouble(df1.GetCellValue(CRMLeadRow, "Budget"));
                        LeadObj.BusinessType = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "BusinessType"));

                        LeadObj.AnnualRevenue = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "AnnualRevenue"));

                        LeadObj.TransEntryDaily = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "TransEntryDaily"));
                        LeadObj.TransEntryMonthly = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "TransEntryMonthly"));
                        LeadObj.SalesBillDaily = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "SalesBillDaily"));
                        LeadObj.SalesBillMonthly = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "SalesBillMonthly"));
                        LeadObj.ComputerYN = df1.GetCellValue(CRMLeadRow, "ComputerYN").ToString()??"";
                        LeadObj.AccountingSoftUsed = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "AccountingSoftUsed"));
                        LeadObj.InternetYN = df1.GetCellValue(CRMLeadRow, "InternetYN").ToString() ?? "";
                        LeadObj.AccountCode = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "AccountCode"));
                        if (LeadObj.AccountCode > 0)
                        {
                            var accountRow = libCalls.getCRMAccountRowFromP_CRMAccounts(LeadObj.AccountCode, SessionControl.UserServerDatabase);
                            LeadObj.TextAccountCode = df1.GetCellValue(accountRow, "AccountName").ToString() ?? "";
                        }
                        LeadObj.Status = Convert.ToInt32(df1.GetCellValue(CRMLeadRow, "Status"));
                        LeadObj.Mobileno = df1.GetCellValue(CRMLeadRow, "Mobileno").ToString() ?? "";
                        LeadObj.email = df1.GetCellValue(CRMLeadRow, "email").ToString() ?? "";
                        LeadObj.Registerdate = Convert.ToDateTime(df1.GetCellValue(CRMLeadRow, "Registerdate"));
                        LeadObj.source = df1.GetCellValue(CRMLeadRow, "source").ToString() ?? "";
                        LeadObj.Contactperson = df1.GetCellValue(CRMLeadRow, "Contactperson").ToString() ?? "";
                        LeadObj.Compositefield = df1.GetCellValue(CRMLeadRow, "Compositefield", "string").ToString() ?? "";
                        string condition = "infotype='compositestring' and viewid='leadform' and  rowstatus=0 ";
                        var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                        if (dr is not null)
                            LeadObj.InfoString = df1.GetCellValue(dr, "infostring").ToString() ?? "";
                        else
                            LeadObj.InfoString = "";
                    }
                    else
                    {
                        string condition = "infotype='compositestring' and viewid='leadform' and  rowstatus=0 ";
                        var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                        if (dr is not null)
                            LeadObj.InfoString = df1.GetCellValue(dr, "infostring").ToString() ?? "";
                        else
                            LeadObj.InfoString = "";

                    }
                    ViewBag.ExitMode = exitmode;
                    return View(LeadObj);
                }
            }
            return RedirectToAction("LogOut", "Home");
        }


        [HttpPost()]
        [ValidateAntiForgeryToken()]
        public ActionResult LeadForm(IFormCollection fc, CRMLeadMaster LeadObj)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "crmleadform", HttpContext.Session.GetString("serverdatabase")))
            {
                if (ModelState.IsValid)
                {
                    DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                    if (sessionRow is null)
                        return RedirectToAction("LogOut", "Home");
                   
                    DataRow? dtr = null;
                    dtr = DCLib.GetDataRowFromModel<CRMLeadMaster>(LeadObj);
                    var dthash = new Hashtable();
                    dthash = gf1.CreateHashTable(dtr);
                    string exitmode = fc["exitmode"];

                    // 'Added by aslam
                    string InfoString = "";
                    string condition = "infotype='compositestring' and viewid='leadform' and  rowstatus=0 ";
                    var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                    if (dr is not null)
                    {
                        InfoString = df1.GetCellValue(dr, "infostring").ToString()?? "";
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
                            compositeFinalValue += string.IsNullOrEmpty(compositeFinalValue)? ctrl[1] + "~" + ctrl[2] + "~" + value: "#" + ctrl[1] + "~" + ctrl[2] + "~" + value;
                        }
                        LeadObj.Compositefield = compositeFinalValue;
                        dthash = gf1.AddItemToHashTable(ref dthash, "Compositefield", compositeFinalValue, true);
                    }
                    if (exitmode.ToLower() == "edit" | exitmode.ToLower() == "delete")
                    {
                        int argLeadid = LeadObj.P_CRMLead;
                        int P_lead = libCalls.InsertUpdateCRMLead(ref argLeadid, ref dthash, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""), SessionControl.UserServerDatabase);
                        LeadObj.P_CRMLead = argLeadid;
                    }
                    else
                    {
                        dthash = gf1.AddItemToHashTable(ref dthash, "topic", "testing", true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "source", "Employee Registered", true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "status", 3114, true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "RegisterDate", df1.GetDateTimeISTNow(), true);
                        int argLeadid1 = -1;
                        int P_lead = libCalls.InsertUpdateCRMLead(ref argLeadid1, ref dthash, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""), SessionControl.UserServerDatabase);
                        var dtHashCRM = new Hashtable();
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "CRMTasks_Key", -1);
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "P_CRMTasks", -1);
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "TaskTitle", "testing");
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "Tasktype", "S");
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "Taskstatus", 3008);
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "linktype", "L");
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "linkcode", P_lead);
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "startdate", df1.GetDateTimeISTNow());
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "under", 0);
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "assignedto", sessionRow["Linkcode"]);
                        dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "assignedtotype", sessionRow["Linktype"]);
                        int argid = -1;
                        int p_crmTasks = libCRMTasks.InsertUpdateCRMTasks(ref argid, ref dtHashCRM, SessionControl.UserServerDatabase, sessionRow, cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? ""));
                    }
                    return RedirectToAction("ManageCRMLead");
                }
                return View(LeadObj);
            }
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
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManagecrmAccounts", HttpContext.Session.GetString("serverdatabase")))
            {
                ViewBag.Message = "By Name~AccountName~string|By Email~Email~string|By Website~Website~string|By AccountId~P_CRMAccounts~integer";
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        
        public ActionResult ManageCRMLead()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Managecrmlead", HttpContext.Session.GetString("serverdatabase")))
            {
                ViewBag.Message = "By Date~2~date|By Topic~3~string|By AssignTo~7~integer|By CallId~8~integer|By Mobile No~9~string";
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        public JsonResult AjaxAccountData(int? start, int pSize = 20, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ManagecrmAccounts", HttpContext.Session.GetString("serverdatabase")))
            {
                string lcondition = "RowStatus=0";
                string lorder = "AccountName";

                var dt = new DataTable();
                if (start==1)
                    start = 0;

                if (!string.IsNullOrEmpty(search))
                    lcondition = cfc1.GetSearchStringFromFrontEnd(search, lcondition);

                //dt = libCalls.getCRMAccountsDataGrid(Convert.ToInt32(start), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase, lcondition, "", pSize);
                dt = libCalls.getCRMAccountsDataGrid(Convert.ToInt32(start), DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase, lcondition, "", pSize);

                var argSessionInstance = SessionControl;
                var clsinfotable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
                SessionControl = argSessionInstance;
                int a = df1.RowsCount(clsinfotable.ServerDatabase, "CRMAccounts", lcondition, lorder);
                var objdatatableToList = new DataTypeConversionLib.DTResult<AccountsMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<AccountsMaster>)DCLib.ConvertDTtoModal<AccountsMaster>(dt, (int)start, a, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("Logout");

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
        public JsonResult AjaxGetPendingCRMLead(string id, int? start, int pSize = 20, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Managecrmlead", HttpContext.Session.GetString("serverdatabase")))
            {
                if (start==1)
                    start = 0;
             
                string SortCondition = "P_CRMTasks asc,Creationdate desc";
                if (!string.IsNullOrEmpty(id))
                    SortCondition = cfc1.GetSortStringFromFrontEndForManageRegCalls(id, SortCondition);
                
                string condition = libCalls.GetSearchStringForPendingRegCalls(search);
                int a = libCalls.getRowsCountPendingCRMLead(condition, SessionControl.UserServerDatabase);
                //var dtcalls = libCalls.getPendingcrmleadCallsDataGrid(Convert.ToInt32(start), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase, condition, "", pSize);
                var dtcalls = libCalls.getPendingcrmleadCallsDataGrid(Convert.ToInt32(start), DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase, condition, "", pSize);
                df1.AddColumnsInDataTable(ref dtcalls, "hasRemarks,callFreqCount,LastCallDate,TxtLastCallDate,EngageStatus,EngageBy,EngageTime", "System.String,System.Int32,System.DateTime,System.string,System.String,System.String,system.string");

                DataTable dtremarks;
                var currentTime = df1.GetDateTimeISTNow();
                if (dtcalls.Rows.Count > 0)
                {
                    for (int i = 0, loopTo = dtcalls.Rows.Count - 1; i <= loopTo; i++)
                    {
                        dtremarks = libCRMTasks.LatestRemarkDateOfATask(Convert.ToInt32(df1.GetCellValue(dtcalls.Rows[i], "p_crmtasks")), SessionControl.UserServerDatabase);
                        DateTime LastCallDate = Convert.ToDateTime(dtcalls.Rows[i]["registerdate"]);
                        if (dtremarks.Rows.Count == 0)
                        {
                            DateTime LastRemarkDate = Convert.ToDateTime(dtcalls.Rows[i]["registerdate"]);
                            dtcalls.Rows[i]["hasRemarks"] = "N";


                            int count = libCalls.GetCountCallFreqForP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["p_crmlead"]), LastRemarkDate, SessionControl.UserServerDatabase, "L");
                            if (count > 0)
                            {
                                var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["p_crmlead"]), SessionControl.UserServerDatabase, "L", "calltime");
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
                            DateTime LastRemarkDate = Convert.ToDateTime(dtremarks.Rows[0]["CreationDate"]);
                            int count = libCalls.GetCountCallFreqForP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["p_crmlead"]), LastRemarkDate, SessionControl.UserServerDatabase, "L");
                            dtcalls.Rows[i]["callFreqCount"] = count;

                            var lastcallrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(dtcalls.Rows[i]["p_crmlead"]), SessionControl.UserServerDatabase, "L", "calltime");
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

                var view = new DataView(dtcalls);
                view.Sort = "LastCallDate ASC";
                dtcalls = view.ToTable();
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMLeadViewModel>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMLeadViewModel>)DCLib.ConvertDTtoModal<CRMLeadViewModel>(dtcalls, (int)start, a, dtcalls.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }


        public ActionResult AccountsForm(int? P_crmaccounts, string exitmode = "create", string CalledFrom = "")
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "crmaccountform", HttpContext.Session.GetString("serverdatabase")))
            {
                ViewBag.Title = "Accounts Form";
                ViewBag.SubTitle = "ManageAccounts";
                var argSessionInstance = SessionControl;
                var clscrmaccounts = new CRMAccounts.CRMAccounts.CRMAccounts(ref argSessionInstance);
                SessionControl = argSessionInstance;
                var AccountsObj = new CRMAccountsViewModel();
                if (ModelState.IsValid)
                {

                    // Fill AccountsForm object according to a Account Record
                    if (exitmode.ToLower() == "edit" | exitmode.ToLower() == "delete")
                    {
                        AccountsObj.P_CRMAccounts = Convert.ToInt32(P_crmaccounts);
                        var crmaccountRow = libCalls.getCRMAccountRowFromP_CRMAccounts(Convert.ToInt32(P_crmaccounts), SessionControl.UserServerDatabase);

                        if (crmaccountRow["P_CRMAccounts"] is DBNull == false)
                        {
                            AccountsObj.P_CRMAccounts =Convert.ToInt32(df1.GetCellValue(crmaccountRow, "P_CRMAccounts").ToString()?.Trim());
                        }
                        if (crmaccountRow["LoginCode"] is DBNull == false)
                        {
                            AccountsObj.LoginCode =Convert.ToInt32(df1.GetCellValue(crmaccountRow, "LoginCode"));
                        }
                        if (crmaccountRow["AccountName"] is DBNull == false)
                        {
                            AccountsObj.AccountName = df1.GetCellValue(crmaccountRow, "AccountName").ToString()??"";
                            AccountsObj.AccountName1 = df1.GetCellValue(crmaccountRow, "AccountName").ToString()?? "";
                        }
                        if (crmaccountRow["BussType"] is DBNull == false)
                        {
                            AccountsObj.BussType =Convert.ToInt32(df1.GetCellValue(crmaccountRow, "BussType"));
                        }
                        if (crmaccountRow["Phone"] is DBNull == false)
                        {
                            AccountsObj.Phone = df1.GetCellValue(crmaccountRow, "Phone").ToString() ?? "";
                        }
                        if (crmaccountRow["Email"] is DBNull == false)
                        {
                            AccountsObj.Email =df1.GetCellValue(crmaccountRow, "Email").ToString() ?? "";
                        }
                        if (crmaccountRow["Website"] is DBNull == false)
                        {
                            AccountsObj.Website = df1.GetCellValue(crmaccountRow, "Website").ToString() ?? "";
                        }
                        if (crmaccountRow["ParentAccount"] is DBNull == false)
                        {
                            if (Convert.ToInt32(crmaccountRow["ParentAccount"]) > 0)
                            {
                                AccountsObj.ParentAccount =Convert.ToInt32(df1.GetCellValue(crmaccountRow, "ParentAccount"));
                                var CRow = libCalls.getCRMAccountRowFromP_CRMAccounts(Convert.ToInt32(df1.GetCellValue(crmaccountRow, "ParentAccount")), "AccountName");
                                if (CRow is not null)
                                    AccountsObj.TextParentAccount = CRow["AccountName"].ToString()?.Trim()?? "";
                                else
                                    AccountsObj.TextParentAccount = "";
                            }

                        }
                        if (crmaccountRow["Address1"] is DBNull == false)
                        {
                            AccountsObj.Address1 = df1.GetCellValue(crmaccountRow, "Address1").ToString() ??"";
                        }
                        if (crmaccountRow["Address2"] is DBNull == false)
                        {
                            AccountsObj.Address2 = df1.GetCellValue(crmaccountRow, "Address2").ToString() ?? "";
                        }
                        if (crmaccountRow["Hometown"] is DBNull == false)
                        {
                            if (Convert.ToInt32(crmaccountRow["Hometown"]) > 0 )
                            {
                                AccountsObj.Hometown =Convert.ToInt32(df1.GetCellValue(crmaccountRow, "Hometown"));
                                //var lDataTableArg = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable"));
                                var lDataTableArg = DtInfoTable;
                                DataRow CRow = df1.FindRowByPrimaryCols(ref lDataTableArg, AccountsObj.Hometown);
                                AccountsObj.TextHometown = CRow["NameOfInfo"].ToString()?.Trim() ?? "";
                            }
                            else if (Convert.ToInt32(crmaccountRow["Hometown"]) ==-99)
                            {
                                AccountsObj.Hometown =Convert.ToInt32(crmaccountRow["Hometown"]);
                                AccountsObj.TextHometown = "Not Available";
                            }
                        }
                        if (crmaccountRow["Industry"] is DBNull == false)
                        {
                            AccountsObj.Industry =Convert.ToInt32(df1.GetCellValue(crmaccountRow, "Industry"));
                        }
                        if (crmaccountRow["FacebookId"] is DBNull == false)
                        {
                            AccountsObj.FacebookId = df1.GetCellValue(crmaccountRow, "FacebookId").ToString() ?? "";
                        }
                        if (crmaccountRow["TwitterID"] is DBNull == false)
                        {
                            AccountsObj.TwitterID = df1.GetCellValue(crmaccountRow, "TwitterID").ToString() ?? "";
                        }
                        // If IsDBNull(clscrmaccounts.PrevRow("OwnerID")) = False Then
                        // AccountsObj.OwnerID = clscrmaccounts.PrevRow("OwnerID")
                        // End If
                        if (crmaccountRow["Details"] is DBNull == false)
                        {
                            AccountsObj.Details =df1.GetCellValue(crmaccountRow, "Details").ToString() ?? "";
                        }
                        if (crmaccountRow["Cn_pref_ContactMethod"] is DBNull == false)
                        {
                            AccountsObj.Cn_pref_ContactMethod =Convert.ToInt32(df1.GetCellValue(crmaccountRow, "Cn_pref_ContactMethod"));
                        }
                        if (crmaccountRow["Cn_pref_Email"] is DBNull == false)
                        {
                            AccountsObj.Cn_pref_Email =Convert.ToInt32(df1.GetCellValue(crmaccountRow, "Cn_pref_Email"));
                        }
                        if (crmaccountRow["Cn_pref_Bulkemail"] is DBNull == false)
                        {
                            AccountsObj.Cn_pref_Bulkemail =Convert.ToInt32(df1.GetCellValue(crmaccountRow, "Cn_pref_Bulkemail"));
                        }
                        if (crmaccountRow["CreationDate"] is DBNull == false)
                        {
                            AccountsObj.CreationDate = Convert.ToDateTime(df1.GetCellValue(crmaccountRow, "CreationDate"));
                        }
                        if (crmaccountRow["mobileno"] is DBNull == false)
                        {
                            AccountsObj.mobileno = df1.GetCellValue(crmaccountRow, "mobileno").ToString() ?? "" ;
                        }
                    }

                }
                ViewBag.ExitMode = exitmode;
                return View(AccountsObj);
            }
            return RedirectToAction("LogOut", "Home");
        }


        [HttpPost()]
        [ValidateAntiForgeryToken()]
        public ActionResult AccountsForm(IFormCollection fc, CRMAccountsViewModel AccountObj)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "crmaccountform", HttpContext.Session.GetString("serverdatabase")))
            {
                if (ModelState.IsValid)
                {
                    DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                    DataRow? dtr = null;
                    dtr = DCLib.GetDataRowFromModel<CRMAccountsViewModel>(AccountObj);
                    var dthash = new Hashtable();
                    dthash = gf1.CreateHashTable(dtr);
                    if (string.IsNullOrEmpty(fc["AccountCode"]))
                        dthash = gf1.AddItemToHashTable(ref dthash, "ParentAccount", 0, true);
                    else
                        dthash = gf1.AddItemToHashTable(ref dthash, "ParentAccount", fc["AccountCode"], true);
                    dthash = gf1.AddItemToHashTable(ref dthash, "AccountName", fc["AccountName1"], true);
                    string exitmode = fc["exitmode"];
                    if (exitmode.ToLower() == "edit" | exitmode.ToLower() == "delete")
                    {
                        int argP_CRMAccounts = AccountObj.P_CRMAccounts;
                        int P_crmaccounts = libCalls.InsertUpdateCRMAccounts(ref argP_CRMAccounts, ref dthash, sessionRow, SessionControl.UserServerDatabase);
                        AccountObj.P_CRMAccounts = argP_CRMAccounts;
                    }
                    else
                    {
                        int argP_CRMAccounts1 = -1;
                        libCalls.InsertUpdateCRMAccounts(ref argP_CRMAccounts1, ref dthash, sessionRow, SessionControl.UserServerDatabase);
                    }
                    return RedirectToAction("ManageAccounts");
                }
                return View(AccountObj);
            }
            return RedirectToAction("LogOut", "Home");
        }





    }
}
