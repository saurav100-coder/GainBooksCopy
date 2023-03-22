using CRMApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using System.Collections;
using System.Data;
using System.Text;

namespace CRMApp.Controllers
{
    public class PublicUrlController : Controller
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

        private ValidateMachine.SimpleEncClass vm1 = new ValidateMachine.SimpleEncClass("q");
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

        public ActionResult Appointment(string encStr)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            if (UserLoginRow is null)
            {
                ViewBag.customLayout = "_Nav.vbhtml";
            }
            else
            {
                ViewBag.customLayout = "_Layout.vbhtml";
            }
            string test = Convert.ToString(CreateEncrstringForAppointment(HttpContext.Session.GetString("corpid"), 21));
            ViewBag.encStr = CreateEncrstringForAppointment(HttpContext.Session.GetString("corpid"), 21);
            // Dim dtTaskStatus As New DataTable
            // Dim dtAssignedTo As New DataTable
            string queryStr = vm1.DecryptData(test);
            var strArr = queryStr.Split("~");
            SetSessionControlUsingCoprid(strArr[0]);
            int p_acccode = Convert.ToInt32(strArr[1]);
            ViewBag.p_acccode = (object)p_acccode;
            return View();
        }

        // GET: PublicUrl
        public ActionResult Task(string encStr)
        {
            

            // 'CorpId~Userid~P_CrmTasks
            try
            {

                string queryStr = vm1.DecryptData(encStr);
                var strArr =queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                DataRow UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                if (UserLoginRow is null)
                {
                    ViewBag.customLayout = "_Nav.cshtml";
                }
                else
                {
                    ViewBag.customLayout = "_Layout.cshtml";
                }
                ViewBag.encStr = encStr;

                var dtTaskStatus = new DataTable();
                var dtAssignedTo = new DataTable();

                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();

                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }

                        HttpContext.Session.SetString("serverdatabase", "0_srv_0.1_mdf_1");
                        HttpContext.Session.SetInt32("userloginkey_saralweb", Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return View();
        }


        /// <summary>
        /// To create appointment link for a particular doctor
        /// </summary>
        /// <param name="p_acccode"></param>
        /// <returns></returns>
        public JsonResult CreatePublicUrlForAppointment(string corpid, int p_acccode)
        {
            // 'Check session
            if (HttpContext.Session.GetString("userloginrow") is null | HttpContext.Session.GetString("saralloginrow") is null)
            {
                return Json("logout");
            }

            string PublicTaskUrl = string.Empty;
            SetSessionControlUsingCoprid(corpid);
            DataRow UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            DataRow SaralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");

            // CorpId~Userid~P_CrmTasks
            string queryStr = SaralLoginRow["corpid"].ToString()?.Trim().ToUpper() + "~" + p_acccode;
            string encStr = vm1.EncryptData(queryStr);
            encStr = System.Net.WebUtility.UrlEncode(encStr);
            // Dim finalEncStr As String = libSaralAuth.handleAuthForbrckets(encStr)
            if (HttpContext.Request.Host.ToString().ToLower().Contains("localhost"))
            {
                PublicTaskUrl = string.Format("{0}://{1}:{2}/PublicUrl/Task?encStr={3}", HttpContext.Request.Scheme, HttpContext.Request.Host, HttpContext.Request.Host.Port, encStr);
            }
            else
            {
                PublicTaskUrl = string.Format("{0}://{1}/PublicUrl/Task?encStr={2}", HttpContext.Request.Scheme, HttpContext.Request.Host, encStr);
            }
            return Json(PublicTaskUrl);
        }


        /// <summary>
        /// Retrun task dt
        /// </summary>
        /// <param name="encStr"></param>
        /// <returns></returns>
        public JsonResult AjaxGetTask(string encStr)
        {
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                var dtCrmTasks = new DataTable();
                // 'CorpId~Userid~P_CrmTasks
                // 'Need Database 
                SetSessionControlUsingCoprid(strArr[0]);
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase); // Check User From SaralWeb "0_srv_0.3_mdf_3"
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1",df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }
                    string sqlstr = "Select crmtasks_key, p_crmtasks,tasktitle,taskdescription,taskstatus,StartDate,DueDate,assignedto,CreatedBy,under from CrmTasks where rowstatus=0 and P_CrmTasks=" + strArr[2];
                    dtCrmTasks = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
                    //dtCrmTasks = df1.AddingNameForCodesPrimaryColsInfotable(dtCrmTasks, "Taskstatus", "TextTaskStatus", DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), "NameOfInfo");
                    dtCrmTasks = df1.AddingNameForCodesPrimaryColsInfotable(dtCrmTasks, "Taskstatus", "TextTaskStatus", DtInfoTable, DtInfoTableuser, "NameOfInfo");
                    df1.AddColumnsInDataTable(ref dtCrmTasks, "FrmtStartDate, FrmtDueDate,TextAssignedto,TextCreatedBy", "System.String, System.String,System.String,System.String");

                    for (int i = 0, loopTo = dtCrmTasks.Rows.Count - 1; i <= loopTo; i++)
                    {
                        if (dtCrmTasks.Rows[i]["StartDate"] is DBNull == false)
                        {
                            DateTime temp = Convert.ToDateTime(dtCrmTasks.Rows[i]["StartDate"]);
                            dtCrmTasks.Rows[i]["FrmtStartDate"] = temp.ToString("dd/MM/yyyy HH:mm tt");
                        }
                        else
                        {
                            dtCrmTasks.Rows[i]["FrmtStartDate"] = "";
                        }
                        if (dtCrmTasks.Rows[i]["DueDate"] is DBNull == false)
                        {
                            DateTime temp = Convert.ToDateTime(dtCrmTasks.Rows[i]["DueDate"]);
                            dtCrmTasks.Rows[i]["FrmtDueDate"] = temp.ToString("dd/MM/yyyy HH:mm tt");
                        }
                        else
                        {
                            dtCrmTasks.Rows[i]["FrmtDueDate"] = "";
                        }
                        if (dtCrmTasks.Rows[i]["Assignedto"] is DBNull == false)
                        {
                            var dtr = libSaralAuth.getAccMasterRowForp_acccode(Convert.ToInt32(dtCrmTasks.Rows[i]["Assignedto"]), SessionControl.UserServerDatabase);
                            if (dtr is not null)
                            {
                                dtCrmTasks.Rows[i]["TextAssignedto"] = dtr["accname"].ToString()?.Trim();
                            }
                        }
                        if (dtCrmTasks.Rows[i]["CreatedBy"] is DBNull == false)
                        {
                            var dtr = libSaralAuth.getAccMasterRowForp_acccode(Convert.ToInt32(dtCrmTasks.Rows[i]["CreatedBy"]), SessionControl.UserServerDatabase);
                            if (dtr is not null)
                            {
                                dtCrmTasks.Rows[i]["TextCreatedBy"] = dtr["accname"].ToString()?.Trim();
                            }
                        }
                    }
                }

                return Json(JsonConvert.SerializeObject(dtCrmTasks));
            }
            catch (Exception ex)
            {
                return Json("err");
            }

        }

        // 'Added by aslam
        /// <summary>
        /// Json Function for Edit Task
        /// </summary>
        /// <param name="fc"></param>
        /// <param name="objCRMTasks"></param>
        /// <returns></returns>
        public JsonResult EditTask(IFormCollection fc, CRMTasksMaster objCRMTasks, string encStr)
        {
            try
            {
                // 'CorpId~Userid~P_CrmTasks
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase); // Check User From SaralWeb "0_srv_0.3_mdf_3"
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }
                    if (ModelState.IsValid)
                    {
                        int TaskCloseStatus = int.Parse(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(77, SessionControl.UserServerDatabase).ToString().Trim());
                        int TaskInitialStatus = int.Parse(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(76, SessionControl.UserServerDatabase).ToString().Trim());

                        if (objCRMTasks.Taskstatus == TaskCloseStatus) //3009
                        {
                            bool HasSubtask = libCRMTasks.DoesTaskHasSubTask(objCRMTasks.P_CRMTasks, SessionControl.UserServerDatabase);
                            if (HasSubtask == true)
                            {
                                return Json("err-close");
                            }
                        }
                        DataRow? dtr = null;
                        var argSessionInstance = SessionControl;
                        var ClsCRMTasks = new CRMTasks.CRMTasks.CRMTasks(ref argSessionInstance);
                        SessionControl = argSessionInstance;
                        var dthash = DCLib.ConvertIFCToHashTable(fc, ClsCRMTasks);

                        dthash = gf1.AddItemToHashTable(ref dthash, "TaskType", "M");
                        if (objCRMTasks.Taskstatus == 0)
                        {
                            //dthash = gf1.AddItemToHashTable(ref dthash, "Taskstatus", 3008, true);
                            dthash = gf1.AddItemToHashTable(ref dthash, "Taskstatus", TaskInitialStatus, true);
                        }
                        else if (objCRMTasks.Taskstatus == TaskCloseStatus) //3009
                        {
                            dthash = gf1.AddItemToHashTable(ref dthash, "CloseDate", df1.GetDateTimeISTNow(), true);
                        }
                        if (objCRMTasks.Assignedto == 0)
                        {
                            dthash = gf1.AddItemToHashTable(ref dthash, "Assignedto", df1.GetCellValue(sessionRow, "linkcode", "integer"), true);
                            // dthash = GF1.AddItemToHashTable(dthash, "Assignedtodate", df1.getDateTimeISTNow, True)
                            dthash = gf1.AddItemToHashTable(ref dthash, "Assignedtotype", "E", true);
                        }
                        int argid = objCRMTasks.P_CRMTasks;
                        int P_CRMTasks = libCRMTasks.InsertUpdateCRMTasks(ref argid, ref dthash, SessionControl.UserServerDatabase, sessionRow, cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? ""));
                        objCRMTasks.P_CRMTasks = argid;
                        if (P_CRMTasks > 0)
                            libCRMTasks.SendNotificationsForTaskAssignment(P_CRMTasks, HttpContext.Session.GetString("loginname")??"", SessionControl.UserServerDatabase, sessionRow);

                        return Json("success");
                    }
                    else
                    {
                        return Json("err-try");
                    }
                }
                return Json("err");
            }
            catch (Exception ex)
            {
                return Json("err");
            }
        }


        /// <summary>
        /// Add Task Remark
        /// </summary>
        /// <param name="encStr"></param>
        /// <returns></returns>
        public JsonResult AddTasksRemark(string encStr)
        {
            try
            {
                // 'CorpId~Userid~P_CrmTasks
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }
                    string filename1 = "";
                    string RegfolderPath = "";
                    if (Request.Form.Files.Count > 0)
                    {
                        var File = Request.Form.Files[0]; // Uploaded file
                        if (!string.IsNullOrEmpty(File.FileName))
                        {
                            RegfolderPath = MyServer.MapPath(strArr[0] + "/documents/").Replace(@"sites\gainbooks.com", "gainbooksdata");
                            if (!Directory.Exists(RegfolderPath))
                                Directory.CreateDirectory(RegfolderPath);
                            
                            if (File is not null)
                            {
                                string Filename = File.FileName;
                                filename1 = Path.GetFileNameWithoutExtension(File.FileName);
                                string filepathName = RegfolderPath + Filename;
                                filename1 = cfc1.CheckAndCreateFileName(Filename, RegfolderPath);
                                //File.SaveAs(RegfolderPath + filename1); //Aslam_File_check_done
                                using (FileStream fs = new FileStream(RegfolderPath + filename1, FileMode.Create))
                                {
                                    File.CopyTo(fs);
                                }
                            }
                            TempData["link"] = "~/GainBooksData/" + strArr[0] + "/documents/" + filename1;
                        }
                    }
                    int taskId = Convert.ToInt32(Request.Form["taskId"]);
                    string linktype = (taskId == 0? "G": "T");
                    var dtcomm = libCRMTasks.CreateCRMCommunicationDt(Request.Form["remark"], linktype, taskId, 2739);
                    int p_crmcomm = libCRMTasks.AddRowInCRMcommunication(dtcomm, sessionRow, SessionControl.UserServerDatabase);
                    var crmDocumentsLink = libCRMTasks.CreateCRMDocumentLinkDt(p_crmcomm, "T", filename1, RegfolderPath + filename1, "");
                    int p_crmdocumentsLink =Convert.ToInt32(libCRMTasks.ADDRowInCrmDocumentsLink(crmDocumentsLink, sessionRow, SessionControl.UserServerDatabase));
                    return Json("success");
                }
                return Json("err");
            }
            catch (Exception ex)
            {
                return Json("err");
            }
        }

        /// <summary>
        /// Load Remarks for a task
        /// </summary>
        /// <param name="encStr"></param>
        /// <param name="taskId"></param>
        /// <returns></returns>
        public JsonResult LoadTasksRemarkData(string encStr, int taskId)
        {
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }
                    var dt = libCRMTasks.GetRemarkDataOfATask(taskId, SessionControl.UserServerDatabase);
                    var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                    objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, 0);
                    return Json(objdatatableToList);
                }
                return Json("err");
            }
            catch (Exception ex)
            {
                return Json("err");
            }
        }



        /// <summary>
        /// Add Collaborator in a task
        /// </summary>
        /// <param name="encStr"></param>
        /// <param name="Taskid"></param>
        /// <param name="Taskkey"></param>
        /// <param name="collaboratorId"></param>
        /// <returns></returns>
        public JsonResult AddTaskCollaborators(string encStr, int Taskid, int Taskkey, int collaboratorId)
        {
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                
                SetSessionControlUsingCoprid(strArr[0]);
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }
                    bool isCollab = libCRMTasks.IsCollaborator("T", Taskid, collaboratorId.ToString(), SessionControl.UserServerDatabase);
                    if (isCollab)
                        return Json("Already Collborate");
                    
                    var dtCRMCollaborator = libCRMTasks.CreateCollaboratersDt("T", Taskid.ToString(), collaboratorId, "E");
                    int k = libCRMTasks.AddCollaboratorToATask(dtCRMCollaborator, sessionRow, SessionControl.UserServerDatabase);
                    string P_CrmSubTasks = libCRMTasks.GetP_SubTaskOfaTask(Taskid, SessionControl.UserServerDatabase);
                    if (!string.IsNullOrEmpty(P_CrmSubTasks))
                    {
                        var P_crmtasks = P_CrmSubTasks.Split(',');
                        for (int i = 0, loopTo = P_crmtasks.Length - 1; i <= loopTo; i++)
                        {
                            bool isSubCollab = libCRMTasks.IsCollaborator("T", Convert.ToInt32(P_crmtasks[i]), collaboratorId.ToString(), SessionControl.UserServerDatabase);
                            if (!isSubCollab)
                            {
                                var dtCRMSubtaskCollaborator = libCRMTasks.CreateCollaboratersDt("T", Convert.ToInt32(P_crmtasks[i]).ToString(), collaboratorId, "E");
                                int s = libCRMTasks.AddCollaboratorToATask(dtCRMSubtaskCollaborator, sessionRow, SessionControl.UserServerDatabase);
                            }
                        }
                    }
                    if (k <= 0)                    
                        return Json("err");

                    string TaskTitle = "Not available";
                    string TaskDescription = "Not available";
                    var DtTasksRow = libCRMTasks.getTasksRowforCrmTasks_key(Taskkey, SessionControl.UserServerDatabase);
                    TaskTitle = df1.GetCellValue(DtTasksRow, "TaskTitle").ToString() ??"";
                    TaskDescription = df1.GetCellValue(DtTasksRow, "TaskDescription").ToString() ?? "";
                    string Message = "You are added as collaborator by on Task id=" + Taskid + "<br>Task Title: " + TaskTitle + "<br>Task Description:" + TaskDescription;
                    var dtempRow = libSaralAuth.getAccMasterRowForp_acccode(collaboratorId, SessionControl.UserServerDatabase);
                    string empmail = dtempRow["email"].ToString() ?? "";
                    Message = Message + Convert.ToChar(201) + "Notification From Saral";
                    var dtmsg = cfc1.CreateMsgQueueDt("E", Message, "", empmail, "", "N");
                    return Json("true");
                }
                return Json("err");
            }
            catch (Exception ex)
            {
                return Json("err");
            }
        }

        /// <summary>
        /// Load all collaborator 
        /// </summary>
        /// <param name="encStr"></param>
        /// <param name="TaskId"></param>
        /// <returns></returns>
        public JsonResult LoadCollaboratorsData(string encStr, int? TaskId)
        {
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }

                    var dt = libCRMTasks.GetCollaboratorsOfATask(Convert.ToInt32(TaskId), SessionControl.UserServerDatabase);
                    var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                    objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, recordsTotal: dt.Rows.Count);
                    return Json(objdatatableToList);
                }
                return Json("err");
            }
            catch (Exception ex)
            {
                return Json("err");
            }
        }

        /// <summary>
        /// Delete Collaborator Data
        /// </summary>
        /// <param name="encStr"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DeleteCollaborator(string encStr, int? id)
        {
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1",df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }

                    int result = libCRMTasks.deleteCollaborator(Convert.ToInt32(id), SessionControl.UserServerDatabase);
                    if (result > 0)
                        return Json("Success");
                    
                }
                return Json("err");
            }
            catch (Exception ex)
            {
                return Json("err");
            }


        }


        /// <summary>
        /// Retrun json data of Tasg for a Task
        /// </summary>
        /// <param name="encStr"></param>
        /// <param name="TaskId"></param>
        /// <returns></returns>
        public JsonResult ShowTagsData(string encStr, int TaskId)
        {
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr =queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }
                    //var dt = libCRMTasks.GetTagsOfATask(TaskId, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                    var dt = libCRMTasks.GetTagsOfATask(TaskId, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                    var objdatatableToList = new DataTypeConversionLib.DTResult<TagsMaster>();
                    objdatatableToList = (DataTypeConversionLib.DTResult<TagsMaster>)DCLib.ConvertDTtoModal<TagsMaster>(dt, recordsTotal: dt.Rows.Count);
                    return Json(objdatatableToList);
                }
                return Json("err");
            }
            catch (Exception ex)
            {
                return Json("err");
            }


        }

        /// <summary>
        /// Add tag for a task in tags table
        /// </summary>
        /// <param name="encStr"></param>
        /// <param name="Taskid"></param>
        /// <param name="p_infotable"></param>
        /// <returns></returns>
        public JsonResult AjaxAddTaskTags(string encStr, int Taskid, int p_infotable)
        {
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""); 
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 =df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }
                    var dtTagsHash = new Hashtable();
                    dtTagsHash = gf1.AddItemToHashTable(ref dtTagsHash, "linktype", "T", true);
                    dtTagsHash = gf1.AddItemToHashTable(ref dtTagsHash, "tagkey", p_infotable, true);
                    dtTagsHash = gf1.AddItemToHashTable(ref dtTagsHash, "linkcode", Taskid, true);
                    bool duplicate = libSaralAuth.CheckDuplicateForTagsTable("T", p_infotable, Taskid, SessionControl.UserServerDatabase);
                    if (duplicate)
                        return Json("Already Added");

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
                return Json("err");
            }
            catch (Exception ex)
            {
                return Json("err");
            }

        }


        /// <summary>
        /// Delete tag from tags table
        /// </summary>
        /// <param name="encStr"></param>
        /// <param name="p_tags"></param>
        /// <returns></returns>
        public JsonResult DeleteTag(string encStr, int p_tags)
        {
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {                    
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }

                    int result = libCRMTasks.deleteTag(p_tags, SessionControl.UserServerDatabase);
                    if (result > 0)
                        return Json("Success");

                }
                return Json("err");
            }
            catch (Exception ex)
            {
                return Json("err");
            }

        }


        // GET: PublicUrl/Feedback
        public ActionResult Feedback(string encStr)
        {
            // 'CorpId~Userid~P_CrmTasks
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                ViewBag.encStr = encStr;
                SetSessionControlUsingCoprid(strArr[0]);
                DataRow UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                if (UserLoginRow is null)
                {
                    ViewBag.customLayout = "_Nav.cshtml";
                }
                else
                {
                    ViewBag.customLayout = "_Layout.cshtml";
                }
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        HttpContext.Session.SetString("serverdatabase", "0_srv_0.1_mdf_1");
                        HttpContext.Session.SetInt32("userloginkey_saralweb", Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));

                    }
                }
            }
            catch (Exception ex)
            {
                ViewBag.pageNotFound = "Y";
            }

            return View();
        }

        /// <summary>
        /// Insert Feedback-point or Feedback-remark into CRMTasks table for p_crmtasks
        /// </summary>
        /// <param name="encStr"></param>
        /// <param name="feedbckpoints"></param>
        /// <param name="feedbckremrks"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AjaxSubmitFeedback(string encStr, string feedbckpoints, string feedbckremrks)
        {
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                int p_crmtasks = Convert.ToInt32(strArr[2]);
                SetSessionControlUsingCoprid(strArr[0]);
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase);
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid1_mdf_1 = "TEST7981";
                            SessionControl.pwd1_mdf_1 = "TEST7981";
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                        else
                        {
                            var argHashTableControl1 = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                            SessionControl.MDFFiles = argHashTableControl1;
                            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            var argSessionControl2 = SessionControl;
                            SetSessionControlOnDLL(ref argSessionControl2);
                            SessionControl = argSessionControl2;
                        }
                    }
                    var crmTasksHash = new Hashtable();
                    crmTasksHash = gf1.AddItemToHashTable(ref crmTasksHash, "feedbckpoints", feedbckpoints, true);
                    crmTasksHash = gf1.AddItemToHashTable(ref crmTasksHash, "feedbckremrks", feedbckremrks, true);

                    var crmTaskRow = libCRMTasks.getTasksRowforP_CrmTasks(p_crmtasks, SessionControl.UserServerDatabase, "assignedto");
                    crmTasksHash = gf1.AddItemToHashTable(ref crmTasksHash, "assignedto", df1.GetCellValue(crmTaskRow, "assignedto", "integer"), true);

                    int a = libCRMTasks.InsertUpdateCRMTasks(ref p_crmtasks, ref crmTasksHash, SessionControl.UserServerDatabase, sessionRow, cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? ""));
                    if (a > 0)
                    {
                        return Json("true");
                    }
                    else
                    {
                        return Json("err");
                    }
                }
                return Json("err");
            }
            catch (Exception ex)
            {
                return Json("err");
            }
        }


        public ActionResult Availabilitysetting()
        {

            return View();
        }


        public JsonResult GetDoctorData(string DoctorId)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }
            try
            {
                var dt = new DataTable();
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallsComm", HttpContext.Session.GetString("serverdatabase")))
                {
                    string sSql = "Select m.accname,(m.postaladdress1+m.postaladdress2+m.postaladdress3+m.postaladdress4) as Add1,m.mobile from availsetting a inner join accmaster m on a.p_acccode=m.p_acccode where a.p_acccode=21 and rtype='M'";
                    dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sSql);
                }
                return Json(JsonConvert.SerializeObject(dt));
            }
            catch (Exception ex)
            {
                return Json("err");
            }
        }



        public JsonResult GetSchedule(string DoctorId, string AppointmentDate, string slotDuration)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            try
            {
                var dt = new DataTable();
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallsComm", HttpContext.Session.GetString("serverdatabase")))
                {
                    string sSql = "Select convert(varchar, startdttime, 8) as [StartTime],convert(varchar, enddttime, 8) as [EndTime] from availsetting a" 
                                + " where rtype='R' and [month]=Month('" + AppointmentDate + "')  and p_acccode=" + DoctorId + " and convert(date, startdttime, 105)<=CAST('" + AppointmentDate + "' AS date) and convert(date, enddttime, 105)>=CAST('" + AppointmentDate + "' AS date) ";
                    dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sSql);
                }
                var mSLot = new List<TimeSlot>();
                if (dt.Rows.Count > 0 & Conversion.Val(slotDuration) > 0)
                {
                    // 'Dim mSLot As List(Of TimeSlot) = New List(Of TimeSlot)()
                    for (int i = 0, loopTo = dt.Rows.Count - 1; i <= loopTo; i++)
                    {
                        string EndTime = dt.Rows[i]["EndTime"].ToString();
                        string StartTime = dt.Rows[i]["StartTime"].ToString();
                        string tmpStartTime = StartTime;
                        Line1:
                        DateTime date1 = DateTime.Parse(tmpStartTime, System.Globalization.CultureInfo.CurrentCulture);
                        DateTime x30MinsLater = date1.AddMinutes(Convert.ToDouble(slotDuration));
                        string t = x30MinsLater.ToString("HH:mm");

                        TimeSlot model = new TimeSlot();
                        model.StartTime = Convert.ToDateTime(tmpStartTime).ToString("HH:mm");
                        model.EndTime = t;
                        mSLot.Add(model);

                        tmpStartTime = t;
                        
                        if (Conversion.Val(tmpStartTime) < Conversion.Val(EndTime))
                            goto Line1;
                        
                    }
                }
                return Json(JsonConvert.SerializeObject(mSLot));
            }
            catch (Exception ex)
            {
                return Json("err");
            }
        }

        public JsonResult GetSlots(string DoctorId)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            try
            {
                var dt = new DataTable();
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallsComm", HttpContext.Session.GetString("serverdatabase")))
                {
                    string sSql = "Select slotduration from availsetting a" + " where rtype='M'  and p_acccode=" + DoctorId + "";
                    dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sSql);
                }

                return Json(JsonConvert.SerializeObject(dt));
            }
            catch (Exception ex)
            {
                return Json("err");
            }
        }

        public string CreateEncrstringForAppointment(string corpid, int p_acccode)
        {
            SetSessionControlUsingCoprid(corpid);
            // 'Check session
            if (HttpContext.Session.GetString("userloginrow") is null | HttpContext.Session.GetString("saralloginrow") is null)
            {
                return ""; 
            }
            string PublicTaskUrl = string.Empty;
            DataRow SaralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
            // CorpId~Userid~P_CrmTasks
            string queryStr = (SaralLoginRow["userid"].ToString()?.Trim() ?? "").ToUpper() + "~" + p_acccode;
            string encStr = vm1.EncryptData(queryStr);
            return encStr;            
        }


        [HttpPost()]
        [ValidateAntiForgeryToken()]
        public ActionResult SavePatient(IFormCollection fc, CustomerMaster CustomerObj)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            if (ModelState.IsValid)
            {
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
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
                dthash = gf1.CreateHashTable(dtr);
                dthash = gf1.AddItemToHashTable(ref dthash, "source", 3067, true);

                if (fc["searchString"].ToString() is not null)
                {
                    dthash = gf1.AddItemToHashTable(ref dthash, "HomeTown", fc["homeTown"], true);
                }
            }
            else
            {
                return View(CustomerObj);
            }

            return default;
        }


        [HttpGet]
        public ActionResult RegisterServiceRequest(string encStr)
        {
            var objRegCalls = new RegCalls();
            // 'CorpId~URLType
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                ViewBag.encStr = encStr;
                SetSessionControlUsingCoprid(strArr[0]);
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            SetSessionControlUsingCoprid("Test7981");
                        }
                        else
                        {
                            SetSessionControlUsingCoprid(df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim()??"");
                        }
                        HttpContext.Session.SetString("serverdatabase", "0_srv_0.1_mdf_1");
                        HttpContext.Session.SetInt32("userloginkey_saralweb", Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));

                       
                        string condition = "infotype='compositestring' and viewid='callform' and  rowstatus=0 ";
                        var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                        if (dr is not null)
                            objRegCalls.InfoString = df1.GetCellValue(dr, "infostring").ToString() ?? "";
                        else
                            objRegCalls.InfoString = "";


                        var drShopControl = saleOrderLib.GetShopControlRow(SessionControl.UserServerDatabase, "shopcode,corpid,shopname,licenseename,shopaddress, printingphone,registeredphone,printshopno");
                        var drCustomer = libcustomerfeature.getCustomerRowFromCustcode(strArr[0],SessionControl.MainServerDatabase,"mobno,Email");
                        ViewBag.shopControl = drShopControl;
                        ViewBag.customer = drCustomer;
                    }
                }
            }
            catch (Exception ex)
            {
            }

            return View(objRegCalls);
        }

        [HttpPost]
        public async Task<ActionResult> RegisterServiceRequest(string encStr, RegCalls mRegCalls, IFormCollection fc, IFormFile pic)
        {
            // 'CorpId~URLType
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                ViewBag.encStr = encStr;
                SetSessionControlUsingCoprid(strArr[0]);
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); 
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            SetSessionControlUsingCoprid("Test7981");
                        }
                        else
                        {
                            SetSessionControlUsingCoprid(df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim() ?? "");
                        }
                        HttpContext.Session.SetString("serverdatabase", "0_srv_0.1_mdf_1");
                        HttpContext.Session.SetInt32("userloginkey_saralweb", Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));

                        if (ModelState.IsValid)
                        {
                            DataRow? sessionRow = null;
                            DataRow?  userloginrow = null;
                            DataRow? dtr = null;
                            dtr = DCLib.GetDataRowFromModel<RegCalls>(mRegCalls);
                            var dthash = new Hashtable();
                            dthash = gf1.CreateHashTable(dtr);

                            int fcIssueType = Convert.ToInt32(fc["IssueType"]);
                            //int fcBuss = Convert.ToInt32(fc["Buss"]);

                            //if (fcBuss == 0)
                            //    fcBuss = -2;

                            if (fcIssueType == 0)
                                fcIssueType = -2;

                            // Added by aslam for workflow status
                            int status = 0;
                            //DataTable dtInfotableUser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
                            if (DtInfoTableuser.Rows.Count > 0)
                            {
                                var drCallReg = DtInfoTableuser.Select("infotype=66").FirstOrDefault();
                                if (!(drCallReg == null))
                                {
                                    status = Convert.ToInt32(df1.GetCellValue(drCallReg, "nameofinfo").ToString()?.Trim());
                                }
                            }

                            dthash = gf1.AddItemToHashTable(ref dthash, "source", "Customer  Registered", true);
                            dthash = gf1.AddItemToHashTable(ref dthash, "IssueType", fcIssueType, true);
                            //dthash = gf1.AddItemToHashTable(ref dthash, "Businesstype", fcBuss, true);
                            dthash = gf1.AddItemToHashTable(ref dthash, "status", status, true);
                            dthash = gf1.AddItemToHashTable(ref dthash, "RegisterDate", df1.GetDateTimeISTNow(), true);
                            dthash = gf1.AddItemToHashTable(ref dthash, "registeredby", "C", true);
                            string RegfolderPath = "";
                            
                            RegfolderPath = MyServer.MapPath(SessionControl.corpid + "/documents/").Replace(@"sites\gainbooks.com", "gainbooksdata");

                            string Filename = "";
                            if (pic is not null)
                            {
                                Filename = cfc1.CheckAndCreateFileName(pic.FileName, RegfolderPath);
                                using (FileStream fs = new FileStream(RegfolderPath + Filename, FileMode.Create))
                                {
                                    pic.CopyTo(fs);
                                }
                            }
                            dthash = gf1.AddItemToHashTable(ref dthash, "UploadfileName", Filename, true);

                            // 'Added by aslam for compositefield
                            string InfoString = "";
                            string condition = "infotype='compositestring' and viewid='callform' and  rowstatus=0 ";
                            var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
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
                                    if (compositeBuilder.Length > 0)
                                    {
                                        compositeBuilder.Append("#");
                                    }
                                    compositeBuilder.Append(ctrl[1] + "~" + ctrl[2] + "~" + value);
                                }
                                compositeFinalValue = compositeBuilder.ToString();
                                mRegCalls.Compositefield = compositeFinalValue;
                                dthash = gf1.AddItemToHashTable(ref dthash, "Compositefield", compositeFinalValue, true);
                            }

                            int argid = mRegCalls.AllCallsReg_key;
                            int p_issuesfileGst = libCalls.InsertUpdateAllCallsReg(ref argid, ref dthash, sessionRow, SessionControl.UserServerDatabase);
                            mRegCalls.AllCallsReg_key = argid;

                            var dtHashCRM = new Hashtable();
                            dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "CRMTasks_Key", -1);
                            dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "P_CRMTasks", -1);
                            dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "TaskTitle", mRegCalls.Firmname?.ToString().Trim());
                            dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "Tasktype", "S");
                            dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "TaskDescription", mRegCalls.Issuedescription);

                            int TaskInitialStatus = Convert.ToInt32(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(76, SessionControl.UserServerDatabase));
                            //dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "Taskstatus", 3008);
                            dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "Taskstatus", TaskInitialStatus);
                            
                            dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "linktype", "C");
                            dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "linkcode", p_issuesfileGst);
                            dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "startdate", df1.GetDateTimeISTNow());
                            dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "under", 0);
                            //dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "assignedto", sessionRow["Linkcode"]);
                            //dtHashCRM = gf1.AddItemToHashTable(ref dtHashCRM, "assignedtotype", sessionRow["Linktype"]);
                            int argid1 = -1;
                            int p_crmTasks = libCRMTasks.InsertUpdateCRMTasks(ref argid1, ref dtHashCRM, SessionControl.UserServerDatabase, sessionRow,userloginrow);

                            string timestamp = df1.GetDateTimeISTNow().ToString("dd-MM-yyyy HH:mm tt");
                            int noOfPendingCall = libCalls.GetPendingCallsCount(SessionControl.UserServerDatabase);
                            var drShopControl = saleOrderLib.GetShopControlRow(SessionControl.UserServerDatabase, "shopname");
                            string message = "Dear Sir/Mam. Your Service Request has been registered successfully at " + timestamp + ". Service Request Id: " + p_issuesfileGst + ". You are in queue at number " + noOfPendingCall + ". We will get back to you soon.Thank you -Team " + df1.GetCellValue(drShopControl,"shopname","string").ToString()?.Trim();
                            string msg = "Dear Sir/Mam. Your Service Request has been registered successfully at " + timestamp + ". <br/> Service Request Id: " + p_issuesfileGst + ". You are in queue at number " + noOfPendingCall + "<br/> We will get back to you soon.<br/>Thank you Team " + df1.GetCellValue(drShopControl, "shopname", "string").ToString()?.Trim();

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

                            ////string Title = "Call Registered";
                            ////string Groupkeyname = "RegCalls_SaralAppDemo2";
                            ////var EmpIdsList = new List<int>();
                            ////message = "";
                            ////string Firm = fc["Firmname"];
                            ////string IssueD = fc["IssueDescription"];
                            ////int NotIssueint = Convert.ToInt32(fc["Issuetype"]);
                            ////mRegCalls = null;
                            return RedirectToAction("Success");
                        }
                        else
                        {
                            return RedirectToAction("RegisterServiceRequest", new { encStr= encStr});
                        }

                    }
                }
            }
            catch (Exception ex)
            {
            }

            return RedirectToAction("RegisterServiceRequest", new { encStr = encStr });
        }


        public ActionResult Success()
        {
            return View();
        }

        public ActionResult GainbooksWebsite()
        {
            return View();
        }

        public ActionResult OperationalModule()
        {
            return View();
        }

        public ActionResult FinancialModule()
        {
            return View();
        }

        public ActionResult LoginForm()
        {
            return View();
        }

        public ActionResult ContactUs()
        {
            return View();
        }

        public ActionResult PartnerwithUs()
        {
            return View();
        }

        public ActionResult AboutUs()
        {
            return View();
        }


        [HttpGet]
        public ActionResult OrderForm(string encStr)
        {
            // 'CorpId~Userid
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                //DataRow UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");

                //if (UserLoginRow is null)
                //{
                //    ViewBag.customLayout = "_Nav.cshtml";
                //}
                //else
                //{
                //    ViewBag.customLayout = "_Layout.cshtml";
                //}
                ViewBag.encStr = encStr;
                //ViewBag.currentDate = df1.GetDateTimeISTNow().ToString("yyyy-MM-dd");

                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            SetSessionControlUsingCoprid("Test7981");
                        }
                        else
                        {
                            SetSessionControlUsingCoprid(df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim() ?? "");
                        }

                        HttpContext.Session.SetString("serverdatabase", "0_srv_0.1_mdf_1");
                        HttpContext.Session.SetInt32("userloginkey_saralweb", Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));

                        var drShopControl = saleOrderLib.GetShopControlRow(SessionControl.UserServerDatabase, "shopcode,corpid,shopname,licenseename,shopaddress, printingphone,registeredphone,printshopno");
                        var drCustomer = libcustomerfeature.getCustomerRowFromCustcode(strArr[0], SessionControl.MainServerDatabase, "mobno,Email");
                        ViewBag.shopControl = drShopControl;
                        ViewBag.customer = drCustomer;
                    }
                }

            }
            catch (Exception)
            {

            }

            return View("PublicOrderForm");
        }

        [HttpPost]
        public ActionResult OrderForm([FromBody] OrderMaster order)
        {
            // 'CorpId~Userid
            try
            {
                string queryStr = vm1.DecryptData(order.EncStr);
                var strArr = queryStr.Split("~");
                SetSessionControlUsingCoprid(strArr[0]);
                ViewBag.encStr = order.EncStr;
                //ViewBag.currentDate = df1.GetDateTimeISTNow().ToString("yyyy-MM-dd");

                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            SetSessionControlUsingCoprid("Test7981");
                        }
                        else
                        {
                            SetSessionControlUsingCoprid(df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim() ?? "");
                        }

                        HttpContext.Session.SetString("serverdatabase", "0_srv_0.1_mdf_1");
                        HttpContext.Session.SetInt32("userloginkey_saralweb", Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));
                    }


                    StringBuilder strBuilder = new StringBuilder();

                    //make prodcode string
                    for (int k = 0; k < order.OrderItems?.Count; k++)
                    {
                        strBuilder.Append(",").Append("'").Append(order.OrderItems[k].Prodcode).Append("'");
                    }
                    string prodcodes = strBuilder.ToString();
                    if (prodcodes.StartsWith(','))
                    {
                        prodcodes = prodcodes.Substring(1, prodcodes.Length - 1);
                    }


                    // Get totstock of prodcodes
                    DataTable dtSrlPro = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "srl_pro", " rowstatus=0 and prodcode in(" + prodcodes + ")", "prodcode,totstock,prodname");

                    //Check qty or totstock condition
                    for (int m = 0; m < order.OrderItems?.Count; m++)
                    {
                        DataRow? drSrlPro = dtSrlPro.Select("prodcode='" + order.OrderItems[m].Prodcode + "'").FirstOrDefault();
                        if (Convert.ToInt32(order.OrderItems[m].Qty) > Convert.ToInt32(df1.GetCellValue(drSrlPro, "totstock", "integer")))
                        {
                            return Json("Ordered quantity of '" + df1.GetCellValue(drSrlPro, "prodname", "string")?.ToString()?.Trim() + "' is greater than current stock. Order will not be generated. Maximum permissible quantity is " + Convert.ToInt32(df1.GetCellValue(drSrlPro, "totstock", "integer")));
                        }
                    }

                    DataRow? sessionRow = null;//cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                    string billDate = df1.GetDateTimeISTNow().ToString("yyyy-MM-dd HH:mm:ss.fff");
                    //Selected Customer's Custcode
                    string? custcode = order.Custcode;
                    string? mobile = order.Mobile;
                    string? deliverymode = order.Deliverymode;
                    string? remarks = order.Remarks;

                    //logged in user's p_acccode
                    //int p_acccode = Convert.ToInt32(df1.GetCellValue(sessionRow, "linkcode", "integer")); //order.P_acccode;

                    DataRow dtcust = libcustomerfeature.getCustomerRowFromCustcode(custcode, SessionControl.UserServerDatabase, "p_acccode,custname");
                    //Selected Customer p_acccode
                    int partyp_acccode = Convert.ToInt32(df1.GetCellValue(dtcust, "p_acccode", "integer"));
                    //Selected Customer Name
                    string? name = df1.GetCellValue(dtcust, "custname", "string").ToString();

                    decimal grossamt = 0.0m;

                    for (int i = 0; i <= order.OrderItems?.Count - 1; i++)
                        grossamt = grossamt + Convert.ToDecimal(order.OrderItems[i].Itemtotal);

                    Hashtable changebillheader = new Hashtable();
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "billheader_key", -1);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "p_billheader", -1);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "billno", "1");
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "billdate", billDate);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "grossamt", grossamt);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "netamount", grossamt);
                    //changebillheader = gf1.AddItemToHashTable(ref changebillheader, "p_acccode", p_acccode);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "entrytype", "O");
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "synchstatus", "N");
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "mtimestamp", billDate);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "placeddatetime", billDate);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "custcode", custcode);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "name", name);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "mobile", mobile);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "partyp_acccode", partyp_acccode);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "deliverymode", deliverymode);
                    changebillheader = gf1.AddItemToHashTable(ref changebillheader, "remarks", remarks);

                    List<Hashtable> billitemHash = new List<Hashtable>();
                    for (int j = 0; j <= order.OrderItems?.Count - 1; j++)
                    {
                        Hashtable changebillitem = new Hashtable();
                        changebillitem = gf1.AddItemToHashTable(ref changebillitem, "billitems_key", -1);
                        changebillitem = gf1.AddItemToHashTable(ref changebillitem, "p_billitems", -1);
                        changebillitem = gf1.AddItemToHashTable(ref changebillitem, "itemsno", j + 1);
                        changebillitem = gf1.AddItemToHashTable(ref changebillitem, "prodcode", order.OrderItems[j].Prodcode);
                        changebillitem = gf1.AddItemToHashTable(ref changebillitem, "itemqty", order.OrderItems[j].Qty);
                        changebillitem = gf1.AddItemToHashTable(ref changebillitem, "sellingprice", order.OrderItems[j].Rate);
                        changebillitem = gf1.AddItemToHashTable(ref changebillitem, "itemamount", order.OrderItems[j].Itemtotal);
                        changebillitem = gf1.AddItemToHashTable(ref changebillitem, "entrytype", "O");
                        billitemHash.Add(changebillitem);
                    }

                    Hashtable resulthash = saleOrderLib.insertbillheaderbillitemsPharma(-1, changebillheader, billitemHash, SessionControl.UserServerDatabase, sessionRow);
                    int billno = 0;
                    if (resulthash.Count == 1 || resulthash.Count == 0)
                    {
                        return Json("error");
                    }
                    else
                    {
                        billno = Convert.ToInt32(gf1.GetValueFromHashTable(resulthash, "billno"));
                        return Json("success");
                    }


                }

            }
            catch (Exception ex)
            {
                return Json("error");
            }
            return Json("error");
        }


        public JsonResult ProductInfoGet(string encStr, int? start, int pSize = 50, string search = "", string order = "", string? itemtype = "B")
        {
            string jsondata = string.Empty;
            try
            {
                string queryStr = vm1.DecryptData(encStr);
                var strArr = queryStr.Split("~");
                var dtCrmTasks = new DataTable();
                // 'CorpId~Userid 
                SetSessionControlUsingCoprid(strArr[0]);
                var dtuserlogin = libSaralAuth.UserExist(strArr[0], SessionControl.MainServerDatabase);
                if (dtuserlogin is not null)
                {
                    var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase); // Get DB credentials from SaralWeb
                    if (dtdbcustconfig is not null)
                    {
                        if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                        {
                            SetSessionControlUsingCoprid("Test7981");
                        }
                        else
                        {
                            SetSessionControlUsingCoprid(df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim() ?? "");
                        }
                    }


                    string condition = string.Empty;
                    if (!string.IsNullOrEmpty(search))
                        condition = cfc1.GetSearchString(search);

                    condition = " and baserate <> 0 " + condition;
                    int a = saleOrderLib.GetSrlProCount(SessionControl.UserServerDatabase, condition, itemtype);
                    DataTable dt = saleOrderLib.getSrlproDetails(start, SessionControl.UserServerDatabase, pSize, condition, order, itemtype);
                    //jsondata = "{\"recordsTotal\":" + a + ",\"draw\":" + start + ",\"data\":[";
                    jsondata = "{\"recordsTotal\":" + a + ",\"draw\":" + start + ",\"data\":"+JsonConvert.SerializeObject(dt) +"}";

                    //if (dt.Rows.Count > 0)
                    //{
                    //    string prodcodes = "";
                    //    for (int j = 0; j <= dt.Rows.Count - 1; j++)
                    //    {
                    //        prodcodes += ",'" + Convert.ToString(df1.GetCellValue(dt.Rows[j], "prodcode", "string")) + "'";
                    //    }
                    //    if (Convert.ToString(prodcodes.Trim().First()) == ",")
                    //        prodcodes = prodcodes.Substring(1, prodcodes.Length - 1);


                    //    DataTable dtBch = saleOrderLib.GetSrlBchdatabyProdcode(prodcodes, SessionControl.UserServerDatabase, "");

                    //    for (int i = 0; i < dt.Rows.Count; i++)
                    //    {
                    //        DataRow srlProRow = dt.Rows[i];
                    //        DataRow[] srlBchRows = dtBch.Select("prodcode='" + df1.GetCellValue(srlProRow, "prodcode", "string").ToString() + "'");
                    //        if (srlBchRows.Count() > 0)
                    //        {
                    //            DataTable dtSrlBch = srlBchRows.CopyToDataTable();
                    //            DataTable dtSrlPro = dt.Clone();
                    //            dtSrlPro.ImportRow(srlProRow);
                    //            string tempSrlProJson = JsonConvert.SerializeObject(dtSrlPro);
                    //            tempSrlProJson = tempSrlProJson.Substring(1, tempSrlProJson.Length - 3);
                    //            tempSrlProJson += ",\"srlBch\":" + JsonConvert.SerializeObject(dtSrlBch) + "},";
                    //            jsondata += tempSrlProJson;
                    //        }
                    //    }
                    //}

                    //jsondata = jsondata.TrimEnd(',');
                    //jsondata += "]}";
                }

                return Json(jsondata);
            }
            catch (Exception ex)
            {
                return Json("err");
            }

        }





    }

    public class TimeSlot
    {
        public string StartTime { get; set; } = "";
        public string EndTime { get; set; } = "";
    }
}










  

