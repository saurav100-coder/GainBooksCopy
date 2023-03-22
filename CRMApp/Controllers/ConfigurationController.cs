using System;
using System.Collections;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Text;
using CRMApp.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;


namespace CRMApp.Controllers
{
    public class ConfigurationController : Controller
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

        private ValidateMachine.SimpleEncClass vm1 = new ValidateMachine.SimpleEncClass("q");

        DataTable DtInfoTable = new DataTable();
        DataTable DtInfoTableuser = new DataTable();
        string authorizedMsg = "You are not authorized for this option. Please contact to system administrator.";
        string authenticatedMsg = "Current session has expired. Please login again.";

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

        // GET: Configuration
        public ActionResult Index()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "configDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                ViewBag.showPublicUrlDiv = false;
                if (SessionControl.corpid.ToUpper().Trim()=="NEHA8591")
                {
                    DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                    //Neha mam or Aslam
                    if (Convert.ToInt32(df1.GetCellValue(LoginRow, "Userlogin_key","integer"))==6 || Convert.ToInt32(df1.GetCellValue(LoginRow, "Userlogin_key", "integer")) == 16646)
                    {
                        ViewBag.showPublicUrlDiv = true;
                    }
                }
                return View("Dashboard");
            }
            return RedirectToAction("LogOut", "Home");
        }



        public ActionResult ManageUsersSetting()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageusersettings", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow userLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                DataRow saralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
                if (df1.GetCellValue(userLoginRow, "userid", "string").ToString()?.Trim().ToLower() == df1.GetCellValue(saralLoginRow, "userid", "string").ToString()?.Trim().ToLower() )
                {
                    ViewBag.isAdmin =true;
                    ViewBag.p_acccode = df1.GetCellValue(userLoginRow, "linkcode", "integer");
                }
                //neha mam userlogin_key in NEHA8591
                else if (string.Equals(SessionControl.corpid.Trim(), "NEHA8591", StringComparison.OrdinalIgnoreCase) && Convert.ToInt32(df1.GetCellValue(userLoginRow, "Userlogin_key", "integer")) == 6)
                {
                    ViewBag.isAdmin = true;
                    ViewBag.p_acccode = df1.GetCellValue(userLoginRow, "linkcode", "integer");
                }
                else
                {
                    ViewBag.isAdmin =false;
                }
                return View();
            }

            return RedirectToAction("LogOut", "Home");
        }




        #region ConfigDashboard
        /// <summary>
        /// function to Add/edit/delete IssueType in InfotableUser.
        /// </summary>
        /// <returns></returns>
        public JsonResult SubmitIssueType(int pid, string issueTypeText, string Exitmode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addIssueType", HttpContext.Session.GetString("serverdatabase")))
            {
                int result = 0;
                if (Exitmode.ToLower() == "create")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(-1, 38, issueTypeText.Trim(), "I");
                    int argp_infotable = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "edit")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, 38, issueTypeText.Trim(), "U");
                    int argp_infotable1 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable1, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "delete")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, 38, issueTypeText.Trim(), "D");
                    int argp_infotable2 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable2, ref dtHash, SessionControl.UserServerDatabase);
                }

                if (result > 0)
                {
                    RefreshInfotableUserInSession();
                    return Json("Success");
                }
                else
                {
                    return Json("Error");
                }
            }
            return Json("logout");
        }

        /// <summary>
        /// function to get IssueType  from InfotableUser.
        /// </summary>
        /// <returns></returns>
        public JsonResult getIssueType()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "getIssuetype", HttpContext.Session.GetString("serverdatabase")))
            {
                DataTable dt = libSaralAuth.getInfotableuserForInfotype(38, SessionControl.UserServerDatabase);
                DataTypeConversionLib.DTResult<InfotableMaster> objdatatableToList = new DataTypeConversionLib.DTResult<InfotableMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt, 0, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("logout");
        }



        /// <summary>
        /// function to Add/edit/delete WorkFlowStatus in InfotableUser.
        /// </summary>
        /// <returns></returns>
        public JsonResult SubmitWorkFlowStatus(int pid, string text, string Exitmode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addWorkFlowStatus", HttpContext.Session.GetString("serverdatabase")))
            {
                int result = 0;
                if (Exitmode.ToLower() == "create")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(-1, 39, text.Trim(), "I");
                    int argp_infotable = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "edit")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, 39, text.Trim(), "U");
                    int argp_infotable1 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable1, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "delete")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, 39, text.Trim(), "D");
                    int argp_infotable2 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable2, ref dtHash, SessionControl.UserServerDatabase);
                }

                if (result > 0)
                {
                    RefreshInfotableUserInSession();
                    return Json("Success");
                }
                else
                {
                    return Json("Error");
                }
            }
            return Json("logout");
        }


        /// <summary>
        /// function to get workFlowStatus from InfotableUser.
        /// </summary>
        /// <returns></returns>
        public JsonResult getWorkFlowStatus()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "getWorkFlowStatus", HttpContext.Session.GetString("serverdatabase")))
            {
                DataTable dt = libSaralAuth.getInfotableuserForInfotype(39, SessionControl.UserServerDatabase);
                DataTypeConversionLib.DTResult<InfotableMaster> objdatatableToList = new DataTypeConversionLib.DTResult<InfotableMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt, 0, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("logout");
        }


        public JsonResult getTags()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "configDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                //DataTable dt = libSaralAuth.getInfotableuserForInfotype(68, SessionControl.UserServerDatabase);
                DataTable dt = libSaralAuth.getTagsDataForAllDepartment(SessionControl.UserServerDatabase);
                DataTypeConversionLib.DTResult<InfotableMaster> objdatatableToList = new DataTypeConversionLib.DTResult<InfotableMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt, 0, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("logout");
        }

        public JsonResult SubmitTags(int pid, string text, string Exitmode, int infotype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "configDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                int result = 0;
                if (Exitmode.ToLower() == "create")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(-1, infotype, text.Trim(), "I");
                    int argp_infotable = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "edit")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, infotype, text.Trim(), "U");
                    int argp_infotable1 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable1, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "delete")
                {
                    DataTable dtTags = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "tags", " rowstatus=0 and tagkey=" + pid);
                    if (!(dtTags == null) && dtTags.Rows.Count > 0)
                        return Json("Tags");

                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, infotype, text.Trim(), "D");
                    int argp_infotable2 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable2, ref dtHash, SessionControl.UserServerDatabase);
                }

                if (result > 0)
                {
                    RefreshInfotableUserInSession();
                    return Json("Success");
                }
                else
                {
                    return Json("Error");
                }
            }
            return Json("logout");
        }


        /// <summary>
        /// Task Priorities values from Infotableuser where infotype=78
        /// </summary>
        /// <returns></returns>
        public JsonResult getTaskPriority()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "configDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                DataTable dt = libSaralAuth.getInfotableuserForInfotype(78, SessionControl.UserServerDatabase);
                DataTypeConversionLib.DTResult<InfotableMaster> objdatatableToList = new DataTypeConversionLib.DTResult<InfotableMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt, 0, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("logout");
        }

        /// <summary>
        /// Insert Update Delete TaskPriority from infotableUser
        /// </summary>
        /// <param name="pid"></param>
        /// <param name="text"></param>
        /// <param name="Exitmode"></param>
        /// <returns></returns>
        public JsonResult SubmitTaskPriority(int pid, string text, string Exitmode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "configDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                int result = 0;
                if (Exitmode.ToLower() == "create")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(-1, 78, text.Trim(), "I");
                    int argp_infotable = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "edit")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, 78, text.Trim(), "U");
                    int argp_infotable1 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable1, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "delete")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, 78, text.Trim(), "D");
                    int argp_infotable2 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable2, ref dtHash, SessionControl.UserServerDatabase);
                }

                if (result > 0)
                {
                    RefreshInfotableUserInSession();
                    return Json("Success");
                }
                else
                {
                    return Json("Error");
                }
            }
            return Json("logout");
        }


        /// <summary>
        /// function to Add/Edit/Delete CustomerGroups  in InfotableUser.
        /// </summary>
        /// <returns></returns>
        public JsonResult SubmitCustomerGroups(int pid, string text, string Exitmode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }


            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addCustomerGroups", HttpContext.Session.GetString("serverdatabase")))
            {
                int result = 0;
                if (Exitmode.ToLower() == "create")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(-1, 57, text.Trim(), "I");
                    int argp_infotable = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "edit")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, 57, text.Trim(), "U");
                    int argp_infotable1 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable1, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "delete")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, 57, text.Trim(), "D");
                    int argp_infotable2 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable2, ref dtHash, SessionControl.UserServerDatabase);
                }

                if (result > 0)
                {
                    RefreshInfotableUserInSession();
                    return Json("Success");
                }
                else
                {
                    return Json("Error");
                }
            }
            return Json("logout");
        }
    
        /// <summary>
        /// function to get CustomerGroups from InfotableUser.
        /// </summary>
        /// <returns></returns>
        public JsonResult getCustomerGroups()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "getCustomerGroups", HttpContext.Session.GetString("serverdatabase")))
            {
                DataTable dt = libSaralAuth.getInfotableuserForInfotype(57, SessionControl.UserServerDatabase);
                DataTypeConversionLib.DTResult<InfotableMaster> objdatatableToList = new DataTypeConversionLib.DTResult<InfotableMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt, 0, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("logout");
        }

        /// <summary>
        /// function to Add/Edit/Delete Departments  in InfotableUser.
        /// </summary>
        /// <returns></returns>
        public JsonResult SubmitDepartments(int pid, string text, string Exitmode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addDepartments", HttpContext.Session.GetString("serverdatabase")))
            {
                int result = 0;
                if (Exitmode.ToLower() == "create")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(-1, 28, text.Trim(), "I");
                    string empDept = "calls";
                    if (Convert.ToInt32(HttpContext.Session.GetInt32("mainbusscode")) == 859)
                        empDept = "SaleOrder";
                    
                    DataTable dtinfotb = libSaralAuth.getInfotableFromInfotypeAndNameofInfo(28, empDept, SessionControl.UserServerDatabase);
                    if (dtinfotb.Rows.Count > 0)
                        dtHash = GF1.AddItemToHashTable(ref dtHash, "infodes", df1.GetCellValue(dtinfotb.Rows[0], "infodes", "string"), true);
                    
                    int argp_infotable = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "edit")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, 28, text.Trim(), "U");
                    int argp_infotable1 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable1, ref dtHash, SessionControl.UserServerDatabase);
                }
                else if (Exitmode.ToLower() == "delete")
                {
                    Hashtable dtHash = libSaralAuth.CreateInfotableUserHashTable(pid, 28, text.Trim(), "D");
                    int argp_infotable2 = Convert.ToInt32(dtHash["p_infotable"]);
                    result = libSaralAuth.InsertUpdateInfotableUser(ref argp_infotable2, ref dtHash, SessionControl.UserServerDatabase);
                }

                if (result > 0)
                {
                    RefreshInfotableUserInSession();
                    return Json("Success");
                }
                else
                {
                    return Json("Error");
                }
            }
            return Json("logout");
        }

     

        /// <summary>
        /// function to get Departments from InfotableUser.
        /// </summary>
        /// <returns></returns>
        public JsonResult getDepartments()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "getDepartments", HttpContext.Session.GetString("serverdatabase")))
            {
                 DataTable dt = libSaralAuth.getInfotableuserForInfotype(28, SessionControl.UserServerDatabase);
                DataTypeConversionLib.DTResult<InfotableMaster> objdatatableToList = new DataTypeConversionLib.DTResult<InfotableMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt, 0, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("logout");
        }

        #endregion
        #region UserRoles
        public ActionResult ManageUserRoles()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageUserRoles", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow userLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                DataRow saralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
                if (df1.GetCellValue(userLoginRow, "userid", "string").ToString()?.Trim().ToLower() == df1.GetCellValue(saralLoginRow, "userid", "string").ToString()?.Trim().ToLower())
                {
                    ViewBag.isAdmin = true;
                    ViewBag.p_acccode = df1.GetCellValue(userLoginRow, "linkcode", "integer");
                }
                //neha mam userlogin_key in NEHA8591
                else if (string.Equals(SessionControl.corpid.Trim(), "NEHA8591", StringComparison.OrdinalIgnoreCase) && Convert.ToInt32(df1.GetCellValue(userLoginRow, "Userlogin_key", "integer")) == 6)
                {
                    ViewBag.isAdmin = true;
                    ViewBag.p_acccode = df1.GetCellValue(userLoginRow, "linkcode", "integer");
                }
                else
                {
                    ViewBag.isAdmin = false;
                }
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        // Get Employees for ddEmp DropDown
        public JsonResult GetEmployees()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageUserRoles", HttpContext.Session.GetString("serverdatabase")))
            {
                var dtEmployees = libSaralAuth.GetActiveEmployeesFromAccMaster(SessionControl.UserServerDatabase, "AccName,P_acccode");
                return Json(JsonConvert.SerializeObject(dtEmployees));
            }
            return Json("");
        }



        /// <summary>
        /// Get UserSettings DataTable for an employee
        /// </summary>
        /// <returns></returns>
        public JsonResult GetUsersSettingsForEmp(int P_acccode = -1)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageusersettings", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow userLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                DataRow SaralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");

                if (P_acccode == -1)
                    P_acccode = Convert.ToInt32(df1.GetCellValue(userLoginRow, "linkcode", "integer"));

                // 'Get usersetting for selected user 
                var drUserLoginKey = libSaralAuth.getUserLoginRowFromP_acccode(P_acccode, SessionControl.UserServerDatabase, "UserLogin_key,userid,linktype");
                var drusersettings = libSaralAuth.getUserSettingsRowFromUserLogin_key(Convert.ToInt32(df1.GetCellValue(drUserLoginKey, "UserLogin_key", "integer")), SessionControl.UserServerDatabase, "settingsstring");
                string? settingString = (string?)df1.GetCellValue(drusersettings, "settingsstring", "string");

                var moduleassigned = "3191";
                if (!string.Equals(df1.GetCellValue(drUserLoginKey,"linktype","string")?.ToString()?.Trim(),"C",StringComparison.OrdinalIgnoreCase))
                {
                    var dtEmp = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "Employees", "rowstatus = 0 and p_acccode=" + P_acccode, "moduleassigned");
                    if (dtEmp is not null && dtEmp.Rows.Count > 0)
                    {
                        moduleassigned = df1.GetCellValue(dtEmp.Rows[0], "moduleassigned", "string")?.ToString()?.Trim();
                    }
                }
               
                string comStr = "Select p_settingmaster,RTrim(LTrim(settingname)) as settingname,settinglabelweb,settingvaluesweb,RTrim(LTrim(inputtypeweb)) as inputtypeweb, RTrim(LTrim(module)) as module  from settingmaster where rowstatus=0 and (updateflag is  null or updateflag<>'D') and (isactive <>'N' or isactive is null)";
                string[] moduleArr = moduleassigned?.Split(",");
                string sqlstr = string.Empty;
                for (int j = 0; j < moduleArr.Length; j++)
                {
                    if (!string.IsNullOrEmpty(sqlstr))
                    {
                        sqlstr += " union ";
                    }
                    sqlstr += comStr + " and module like '%" + moduleArr[j].ToString().Trim() + "%'";
                }

                //If login user is  admin
                if (df1.GetCellValue(SaralLoginRow, "userid", "string").ToString()?.Trim().ToLower() == df1.GetCellValue(userLoginRow, "userid", "string").ToString()?.Trim().ToLower())
                {
                    if (!string.IsNullOrEmpty(sqlstr))
                    {
                        sqlstr += " union ";
                    }
                    sqlstr += comStr + " and module like '%3188%'";
                }

                DataTable dtShopControl = saleOrderLib.getShopControlDatatable(DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                if (!(dtShopControl is null) && dtShopControl.Rows.Count > 0)
                {
                    if (dtShopControl.Columns.Contains("settings") && !(dtShopControl.Rows[0]["settings"] is DBNull) && !string.IsNullOrEmpty(df1.GetCellValue(dtShopControl.Rows[0], "settings", "string").ToString()?.Trim()))
                    {
                        settingString = settingString + "~" + df1.GetCellValue(dtShopControl.Rows[0], "settings", "string").ToString()?.Trim();
                    }
                }

                DataTable dtSettingMaster = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
                dtSettingMaster = df1.AddColumnsInDataTable(ref dtSettingMaster, "selectedvalue", "system.string");

                for (int i = 0, loopTo = dtSettingMaster.Rows.Count - 1; i <= loopTo; i++)
                {
                    if (df1.GetCellValue(dtSettingMaster.Rows[i], "inputtypeweb", "string").ToString()?.Trim().ToLower() == "textbox")
                    {
                        dtSettingMaster.Rows[i]["selectedvalue"] = df1.GetCellValue(dtSettingMaster.Rows[i], "settingvaluesweb", "string");
                    }
                    else
                    {
                        string selectedValue = GF1.GetKeywordValueFromCompositeField(settingString, Convert.ToString(df1.GetCellValue(dtSettingMaster.Rows[i], "settingname", "string")), "~", "=");
                        if (!string.IsNullOrEmpty(selectedValue.Trim()))
                        {
                            dtSettingMaster.Rows[i]["selectedvalue"] = selectedValue;
                        }
                    }

                }

                //Make Module wise json string 
                DataTable dtinfo = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotable", " infotype=84 and rowstatus=0 and (updateflag<>'D' or updateflag is null) and p_infotable in (" + moduleassigned + ")", "nameofinfo,p_infotable");
                StringBuilder strBuilder = new StringBuilder();
                StringBuilder strResultBuilder = new StringBuilder();

                //For Common Settings
                for (int j = 0; j < dtinfo.Rows.Count; j++)
                {
                    DataRow[] dr = dtSettingMaster.Select("module like '%" + Convert.ToInt32(df1.GetCellValue(dtinfo.Rows[j],"p_infotable","integer") )+"%' ");
                    for (int k = 0; k < dr.Length; k++)
                    {
                        strBuilder.Append(dr[k]["settingname"]?.ToString()?.Trim()).Append(",");
                    }
                }

                var commonSettingArr = strBuilder.ToString().TrimEnd(',').Split(",").GroupBy(item => item).Where(grp => grp.Count() > 1).Select(grp => grp.Key).ToArray();
                string commonSettings = string.Join(",",commonSettingArr.Select(item=>"'" + item+"'").ToArray());
                if (commonSettingArr.Length>0)
                {
                    DataTable dtCommonSettings = dtSettingMaster.Select("settingname in (" + commonSettings + ")").CopyToDataTable();
                    if (strResultBuilder.Length > 0)
                    {
                        strResultBuilder.Append(",");
                    }
                    strResultBuilder.Append("{\"module\":\"").Append("Common").Append("\",\"settings\":").Append(JsonConvert.SerializeObject(dtCommonSettings)).Append("}");
                }
                //End Common Settings


                //Module wise settings
                for (int j = 0; j < dtinfo.Rows.Count; j++)
                {
                    string condition = "module like '%" + Convert.ToInt32(df1.GetCellValue(dtinfo.Rows[j], "p_infotable", "integer")) + "%'";
                    if (commonSettingArr.Length>0)
                    {
                        condition += " and settingname not in (" + commonSettings + ")";
                    }
                    DataRow[] dr = dtSettingMaster.Select(condition);
                    if (dr.Length>0)
                    {
                        var dt = dr.CopyToDataTable();
                        if (strResultBuilder.Length > 0)
                        {
                            strResultBuilder.Append(",");
                        }
                        strResultBuilder.Append("{\"module\":\"").Append(df1.GetCellValue(dtinfo.Rows[j], "nameofinfo", "string").ToString()?.Trim()).Append("\",\"settings\":").Append(JsonConvert.SerializeObject(dt)).Append("}");
                    }
                }

                //If login user is  admin
                if ((df1.GetCellValue(SaralLoginRow, "userid", "string").ToString()?.Trim().ToLower() == df1.GetCellValue(userLoginRow, "userid", "string").ToString()?.Trim().ToLower()) && !moduleassigned.Contains("3188"))
                {
                    string condition = "module like '%3188%'";
                    if (commonSettingArr.Length > 0)
                    {
                        condition += " and settingname not in (" + commonSettings + ")";
                    }
                    DataRow[] dr = dtSettingMaster.Select(condition);
                    if (dr.Length > 0)
                    {
                        var dt = dr.CopyToDataTable();
                        if (strResultBuilder.Length > 0)
                        {
                            strResultBuilder.Append(",");
                        }
                        strResultBuilder.Append("{\"module\":\"").Append("Admin").Append("\",\"settings\":").Append(JsonConvert.SerializeObject(dt)).Append("}");
                    }
                }


                string resultJson =  strResultBuilder.ToString();
                return Json("[" + resultJson + "]");

                //return Json(JsonConvert.SerializeObject(dtSettingMaster));
            }
            return Json("");
        }




        public JsonResult UpdateSettings(string userSettingString, string shopControlString = "", int P_acccode = -1)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageusersettings", HttpContext.Session.GetString("serverdatabase")))
            {
                string updateMsg = "";
                DataRow? userLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                DataRow? SaralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                if (P_acccode == -1)
                    P_acccode = Convert.ToInt32(df1.GetCellValue(userLoginRow, "linkcode", "integer"));

                var drUserLoginKey = libSaralAuth.getUserLoginRowFromP_acccode(P_acccode, SessionControl.UserServerDatabase, "UserLogin_key,userid");
                var drusersettings = libSaralAuth.getUserSettingsRowFromUserLogin_key(Convert.ToInt32(df1.GetCellValue(drUserLoginKey, "UserLogin_key", "integer")), SessionControl.UserServerDatabase, "p_usersettings,settingsstring");

                string finalSettingString = string.Empty;

                if (drusersettings is not null)
                {
                    string settingStr = df1.GetCellValue(drusersettings, "settingsstring","string")?.ToString()?.Trim()??"";
                    var settingsArr = settingStr.Split("~");
                    for (int i = 0; i < settingsArr.Length; i++)
                    {
                        string[] kvPair = Convert.ToString(settingsArr[i].ToString().Trim()).Split("=");
                        string value =  GF1.GetKeywordValueFromCompositeField(userSettingString, kvPair[0], "~", "=");
                        if (!string.IsNullOrEmpty(value))
                        {
                            settingsArr[i] = kvPair[0] + "=" + value;
                        }
                    }
                    finalSettingString = string.Join(",", settingsArr);
                }
                else
                {
                    finalSettingString = userSettingString;

                }

                var userSettingHashTable = new Hashtable();
                //userSettingHashTable = GF1.AddItemToHashTable(ref userSettingHashTable, "settingsstring", userSettingString, true);
                userSettingHashTable = GF1.AddItemToHashTable(ref userSettingHashTable, "settingsstring", finalSettingString, true);

                userSettingHashTable = GF1.AddItemToHashTable(ref userSettingHashTable, "updateflag", "U", true);
                //var drusersettings = libSaralAuth.getUserSettingsRowFromUserLogin_key(Convert.ToInt32(df1.GetCellValue(drUserLoginKey, "UserLogin_key", "integer")), SessionControl.UserServerDatabase, "p_usersettings");
                int argid = Convert.ToInt32(df1.GetCellValue(drusersettings, "p_usersettings", "integer"));
                var updateDone = libSaralAuth.InsertUpdateInUserSettings(ref argid, ref userSettingHashTable, SessionControl.UserServerDatabase, sessionRow);

                if (!string.IsNullOrEmpty(shopControlString?.Trim()) && (df1.GetCellValue(drUserLoginKey, "userid", "string").ToString()?.Trim().ToLower() ?? "") == (df1.GetCellValue(SaralLoginRow, "userid", "string").ToString()?.Trim().ToLower() ?? ""))
                {
                    var shopControlHashTable = new Hashtable();
                    shopControlHashTable = GF1.AddItemToHashTable(ref shopControlHashTable, "settings", shopControlString, true);
                    var dtShopControl = saleOrderLib.getShopControlDatatable(DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                    if (!(dtShopControl == null) && dtShopControl.Rows.Count > 0)
                    {
                        int argp_shopcontrol = Convert.ToInt32(df1.GetCellValue(dtShopControl.Rows[0], "p_shopcontrol", "integer"));
                        saleOrderLib.InsertUpdateShopControl(ref argp_shopcontrol, ref shopControlHashTable, sessionRow, SessionControl.UserServerDatabase);
                    }
                }


                //Set to null Fcmtoken 
                Hashtable userLoginHashTable = new Hashtable();
                userLoginHashTable = GF1.AddItemToHashTable(ref userLoginHashTable,"fcmtoken","");
                userLoginHashTable = GF1.AddItemToHashTable(ref userLoginHashTable, "updateflag", "U");
                int argUserLoginKey = Convert.ToInt32(df1.GetCellValue(drUserLoginKey, "UserLogin_key", "integer"));
                int a = libSaralAuth.InsertUpdateUserLogin(ref argUserLoginKey, ref userLoginHashTable, SessionControl.UserServerDatabase);

                if (Convert.ToInt32(updateDone) > 0)
                {
                    updateMsg = "Setting updated successfully";
                }
                else
                {
                    updateMsg = "Something went wrong, Please try again later";
                }

                return Json(new[] { updateDone, updateMsg });
            }
            return Json(new[] { (object)0, "Session Timeout,Please Login again." });
        }



        // Get MenuMaster data for emplSector
        public JsonResult GetMenuMasterForEmp(int P_acccode=-1)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageUserRoles", HttpContext.Session.GetString("serverdatabase")))
            {
                string errorMsg = "";
                string resultJson = "";
                DataRow? userLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                
                if (P_acccode == -1)
                    P_acccode = Convert.ToInt32(df1.GetCellValue(userLoginRow, "linkcode", "integer"));

                //var drEmplSector = libSaralAuth.getEmployeeRowForAccmaster(P_acccode, SessionControl.UserServerDatabase, "moduleassigned ");
                //if (drEmplSector["moduleassigned"] is DBNull)
                //{
                //    drEmplSector = libSaralAuth.getEmployeeRowForAccmaster(P_acccode, SessionControl.UserServerDatabase, "Department as moduleassigned");
                //}

                var drUserLoginKey = libSaralAuth.getUserLoginRowFromP_acccode(P_acccode, SessionControl.UserServerDatabase, "UserLogin_key,linktype");

                string moduleassigned = "3191";
                if (!string.Equals(df1.GetCellValue(drUserLoginKey, "linktype", "string")?.ToString()?.Trim(), "C", StringComparison.OrdinalIgnoreCase))
                {
                    var drEmplSector = libSaralAuth.getEmployeeRowForAccmaster(P_acccode, SessionControl.UserServerDatabase, "moduleassigned ");
                    if (drEmplSector is not null)
                    {
                        moduleassigned = df1.GetCellValue(drEmplSector, "moduleassigned", "string")?.ToString()?.Trim();
                    }
                }

                if (!string.IsNullOrWhiteSpace(moduleassigned))       
                {
                        
                    // Get roles for user from userroles table
                    //var drUserLoginKey = libSaralAuth.getUserLoginRowFromP_acccode(P_acccode, SessionControl.UserServerDatabase, "UserLogin_key");
                    var drRoles = libSaralAuth.GetUserRolesFromUserLogin_key(Convert.ToInt32(drUserLoginKey["UserLogin_key"]), SessionControl.UserServerDatabase);

                    string? userWebRoles = "";
                    string? userAppRoles = "";

                    if (!(drRoles["WebRoles"] is DBNull))
                    {
                        userWebRoles = Convert.ToString(drRoles["WebRoles"]);
                    }
                    if (!(drRoles["AppRoles"] is DBNull))
                    {
                        userAppRoles = Convert.ToString(drRoles["AppRoles"]);
                    }


                    //DataTable dtinfo = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase,"infotableuser"," infotype=84 and rowstatus=0 and (updateflag<>'D' or updateflag is null) and p_infotable in ("+ df1.GetCellValue(drEmplSector, "moduleassigned", "string").ToString() + ")","nameofinfo,infodes");
                    DataTable dtinfo = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "infotable", " infotype=84 and rowstatus=0 and (updateflag<>'D' or updateflag is null) and p_infotable in (" + moduleassigned + ")", "nameofinfo,infodes");
                    if (dtinfo is not null && dtinfo.Rows.Count>0)
                    {
                        StringBuilder strBuilderWeb = new StringBuilder();
                        StringBuilder strBuilderApp = new StringBuilder();
                        for (int j = 0; j < dtinfo.Rows.Count; j++)
                        {
                            string? settingsstr = df1.GetCellValue(dtinfo.Rows[j], "infodes", "string").ToString()?.Trim();
                            if (!string.IsNullOrEmpty(settingsstr?.Trim())) 
                            {
                                var splitByHash = settingsstr?.Split('#');
                                strBuilderWeb.Append(splitByHash?[0]).Append(",");
                                strBuilderApp.Append(splitByHash?[1]).Append(",");
                            }
                        }

                        //Get Common Roles
                        var commonWebArr = strBuilderWeb.ToString().TrimEnd(',').Split(",").GroupBy(item => item).Where(grp => grp.Count() > 1).Select(grp => grp.Key).ToArray();
                        var commonAppArr = strBuilderApp.ToString().TrimEnd(',').Split(",").GroupBy(item => item).Where(grp => grp.Count() > 1).Select(grp => grp.Key).ToArray();

                        StringBuilder strResultBuilder = new StringBuilder();
                        var dtCommonWebRoles = new DataTable();
                        var dtCommonAppRoles = new DataTable();
                        if (commonWebArr.Length>0 )
                        {
                            // Get Roles from MenuMaster Table using p_menumaster
                            dtCommonWebRoles = libSaralAuth.GetMenuMasterDataTableForMenuMaster_keys(string.Join(",", commonWebArr).ToString(), SessionControl.UserServerDatabase);
                            df1.AddColumnsInDataTable(ref dtCommonWebRoles, "TxtEnabled", "System.String");
                            // Check if Previously Assigned roles
                            dtCommonWebRoles = libSaralAuth.CheckPreviouslyEnableRoles(userWebRoles, dtCommonWebRoles);
                        }

                        if (commonAppArr.Length>0)
                        {
                            // Get Roles from MenuMaster Table using p_menumaster
                            dtCommonAppRoles = libSaralAuth.GetMenuMasterDataTableForMenuMaster_keys(string.Join(",", commonAppArr).ToString(), SessionControl.UserServerDatabase);
                            df1.AddColumnsInDataTable(ref dtCommonAppRoles, "TxtEnabled", "System.String");
                            // Check if Previously Assigned roles
                            dtCommonAppRoles = libSaralAuth.CheckPreviouslyEnableRoles(userAppRoles, dtCommonAppRoles);
                        }
                        
                        if (strResultBuilder.Length > 0)
                        {
                            strResultBuilder.Append(",");
                        }
                        strResultBuilder.Append("{\"module\":\"").Append("Common").Append("\",\"webroles\":").Append(JsonConvert.SerializeObject(dtCommonWebRoles)).Append(",\"approles\":").Append(JsonConvert.SerializeObject(dtCommonAppRoles)).Append("}");

                        //End of Common Roles

                        
                        for (int i = 0; i < dtinfo.Rows.Count; i++)
                        {
                            string? settingsstr = df1.GetCellValue(dtinfo.Rows[i],"infodes","string").ToString()?.Trim();
                            if (!string.IsNullOrEmpty(settingsstr?.Trim()))
                            {
                                var splitByHash = settingsstr?.Split('#');
                                var finalwebRoles = splitByHash?[0]?.Split(",").Except(commonWebArr).ToArray();
                                var finalappRoles = splitByHash?[1]?.Split(",").Except(commonAppArr).ToArray();
                                
                                var dtWebRoles = new DataTable();
                                var dtAppRoles = new DataTable();

                                if (finalwebRoles?.Length>0 )
                                {
                                    // Get Roles from MenuMaster Table using p_menumaster
                                    dtWebRoles = libSaralAuth.GetMenuMasterDataTableForMenuMaster_keys(string.Join(",",finalwebRoles).ToString(), SessionControl.UserServerDatabase);
                                    df1.AddColumnsInDataTable(ref dtWebRoles, "TxtEnabled", "System.String");
                                    // Check if Previously Assigned roles
                                    dtWebRoles = libSaralAuth.CheckPreviouslyEnableRoles(userWebRoles, dtWebRoles);
                                }

                                if (finalappRoles?.Length>0)
                                {
                                    dtAppRoles = libSaralAuth.GetMenuMasterDataTableForMenuMaster_keys(string.Join(",", finalappRoles).ToString(), SessionControl.UserServerDatabase);
                                    df1.AddColumnsInDataTable(ref dtAppRoles, "TxtEnabled", "System.String");
                                    // Check if Previously Assigned roles
                                    dtAppRoles = libSaralAuth.CheckPreviouslyEnableRoles(userAppRoles, dtAppRoles);
                                }
                                if (strResultBuilder.Length > 0)
                                {
                                    strResultBuilder.Append(",");
                                }
                                strResultBuilder.Append("{\"module\":\"").Append(df1.GetCellValue(dtinfo.Rows[i], "nameofinfo", "string").ToString()?.Trim()).Append("\",\"webroles\":").Append(JsonConvert.SerializeObject(dtWebRoles)).Append(",\"approles\":").Append(JsonConvert.SerializeObject(dtAppRoles)).Append("}");
                            }
                        }
                            
                        resultJson += strResultBuilder.ToString();
                    }
                    else
                    {
                        errorMsg = "Nothing To preview.";
                    }

                }
                else
                {
                    //errorMsg = "Please assign Sector/Department to the Employee.";
                    errorMsg = "Please assign Module to the user.";
                }
                
                return Json(new[] { "["+resultJson+"]" ,errorMsg});
            }
            return Json("");
        }

        // Update Roles in UserRoles Table
        public JsonResult UpdateUserRoles(string type, string EnableRoles, string DisableRoles, int P_acccode=-1)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageUserRoles", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? userLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                
                if (P_acccode == -1)
                    P_acccode = Convert.ToInt32(df1.GetCellValue(userLoginRow, "linkcode", "integer"));

                var drUserLoginKey = libSaralAuth.getUserLoginRowFromP_acccode(P_acccode, SessionControl.UserServerDatabase, "UserLogin_key");
                var drRoles = libSaralAuth.GetUserRolesFromUserLogin_key(Convert.ToInt32(drUserLoginKey["UserLogin_key"]), SessionControl.UserServerDatabase);

                string? userWebRoles = "";
                string? userAppRoles = "";
                if (!(drRoles["WebRoles"] is DBNull))
                {
                    userWebRoles = Convert.ToString(drRoles["WebRoles"]);
                }
                if (!(drRoles["AppRoles"] is DBNull))
                {
                    userAppRoles = Convert.ToString(drRoles["AppRoles"]);
                }

                string updatedAppRoles = "";
                string updatedWebRoles = "";

                EnableRoles = EnableRoles ?? "";
                DisableRoles = DisableRoles ?? "";

                // Operations for App
                if (type.ToLower() == "app")
                {
                    var userAppRolesArray = userAppRoles?.Trim().Split(',');
                    var enableAppRolesArray = EnableRoles.Split(',');
                    var disableAppRolesArray = DisableRoles.Split(',');

                    // Add Enable Roles to userAppRolesArray
                    userAppRolesArray = libSaralAuth.AddEnableRolesInArray(userAppRolesArray, enableAppRolesArray);

                    // Remove Disable Roles from userAppRolesArray
                    userAppRolesArray = libSaralAuth.RemoveDisableRolesFromArray(userAppRolesArray, disableAppRolesArray);

                    // Get Updated Roles string from userAppRolesArray
                    updatedAppRoles = libSaralAuth.GetUpdatedRoles(userAppRolesArray);
                }
                // End Operations for App

                // Operations for Web
                if (type.ToLower() == "web")
                {
                    var userWebRolesArray = userWebRoles?.Trim().Split(',');
                    var enableWebRolesArray = EnableRoles.Split(',');
                    var disableWebRolesArray = DisableRoles.Split(',');

                    // Add Enable Roles in userWebRolesArray
                    userWebRolesArray = libSaralAuth.AddEnableRolesInArray(userWebRolesArray, enableWebRolesArray);

                    // Remove Disable Roles from userWebRolesArray
                    userWebRolesArray = libSaralAuth.RemoveDisableRolesFromArray(userWebRolesArray, disableWebRolesArray);

                    // Get Updated Roles string from userWebRolesArray
                    updatedWebRoles = libSaralAuth.GetUpdatedRoles(userWebRolesArray);
                }
                // End Operations for Web



                string RoleType = "";
                int updateDone = 0;
                string updateMsg = "";

                if (type.ToLower() == "web")
                {
                    drRoles["WebRoles"] = updatedWebRoles;
                    RoleType = "Web-Roles";
                }
                if (type.ToLower() == "app")
                {
                    drRoles["AppRoles"] = updatedAppRoles;
                    RoleType = "App-Roles";
                }

                var ChangedFieldsValuesPairHashTable = GF1.CreateHashTable(drRoles);
                ChangedFieldsValuesPairHashTable = GF1.AddItemToHashTable(ref ChangedFieldsValuesPairHashTable, "mtimestamp", df1.GetDateTimeISTNow(), true);
                int argP_userRoles = Convert.ToInt32(drRoles["p_userroles"]);
                updateDone = libSaralAuth.InsertUpdateUserRoles(ref argP_userRoles, ref ChangedFieldsValuesPairHashTable, SessionControl.UserServerDatabase);

                //Set to null Fcmtoken 
                Hashtable userLoginHashTable = new Hashtable();
                userLoginHashTable = GF1.AddItemToHashTable(ref userLoginHashTable, "fcmtoken", "");
                userLoginHashTable = GF1.AddItemToHashTable(ref userLoginHashTable, "updateflag", "U");
                int argUserLoginKey = Convert.ToInt32(df1.GetCellValue(drUserLoginKey, "UserLogin_key", "integer"));
                int a = libSaralAuth.InsertUpdateUserLogin(ref argUserLoginKey, ref userLoginHashTable, SessionControl.UserServerDatabase);

                if (updateDone > 0)
                {
                    updateMsg = RoleType + " data updated successfully";
                }
                else
                {
                    updateMsg = "No new data to change in " + RoleType;
                }
                return Json(new[] { updateDone.ToString(), updateMsg });
            }
            return Json("");
        }



        #endregion
        #region Manage ViewSettings
        // GET: ViewSettings
        public ActionResult ManageViewSettings(string infotype = "", string viewid = "")
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageviewsettings", HttpContext.Session.GetString("serverdatabase")))
            {
                // These values comes from grid hover menu(cusomize hoverStrip)
                ViewBag.infotype = infotype;
                ViewBag.viewid = viewid;
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        // This will use to fill Infotype and view Dropdown
        public JsonResult GetDistinctData(string columnName, string tableName, string lcondition="")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageviewsettings", HttpContext.Session.GetString("serverdatabase")))
            {
                var dtDistinctData = libSaralAuth.GetDistinctDataFromViewSettingsForColumn(columnName, tableName, SessionControl.UserServerDatabase,lcondition);
                return Json(JsonConvert.SerializeObject(dtDistinctData));
            }
            return Json("");
        }

        // This will use to fill ViewSetting Table
        public JsonResult GetViewSettingData(string InfoType, string ViewId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageviewsettings", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                DataRow drViewSetting;
                var objViewSetting = new ViewSettingMaster();

                // First Check for current user data
                string? Lcondition = "infotype='" + InfoType.Trim() + "' and viewid='" + ViewId.Trim() + "' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                drViewSetting = libSaralAuth.GetViewSettingsRowforLcondition(Lcondition, SessionControl.UserServerDatabase);

                // if data not exist then show default data
                if (drViewSetting is null)
                {
                    Lcondition = "infotype='" + InfoType.Trim() + "' and viewid='" + ViewId.Trim() + "' and rowstatus=0 and Userlogin_key=0";
                    drViewSetting = libSaralAuth.GetViewSettingsRowforLcondition(Lcondition, SessionControl.UserServerDatabase);
                }

                objViewSetting = DCLib.GetModelFromDataRow<ViewSettingMaster>(drViewSetting);
                return Json(objViewSetting);
            }
            return Json("");
        }


        public JsonResult SaveViewSetting(ViewSettingMaster objViewSetting)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageviewsettings", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                var dtViewSetting = new DataTable();
                DataRow drViewSetting;


                objViewSetting.mtimestamp = df1.GetDateTimeISTNow();
                objViewSetting.Websessions_key = Convert.ToInt32(sessionRow["websessions_key"]);     //rituka
                objViewSetting.Userlogin_key = Convert.ToInt32(LoginRow["Userlogin_key"]);

                string? Lcondition ="infotype='" + objViewSetting.Infotype + "' and viewid='" + objViewSetting.Viewid + "' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                drViewSetting = libSaralAuth.GetViewSettingsRowforLcondition(Lcondition, SessionControl.UserServerDatabase);

                if (!(drViewSetting is null))
                {
                    objViewSetting.ViewSettings_key = Convert.ToInt32(drViewSetting["ViewSettings_key"]);
                    objViewSetting.P_viewsettings = Convert.ToInt32(drViewSetting["P_viewsettings"]);
                }

                var dataRow = DCLib.GetDataRowFromModel<ViewSettingMaster>(objViewSetting);
                var ChangedFieldsValuesPairHashTable = GF1.CreateHashTable(dataRow);

                int argP_viewsettings = Convert.ToInt32(ChangedFieldsValuesPairHashTable["p_viewsettings"]);
                int insertUpdateDone = libSaralAuth.InsertUpdateViewSettings(ref argP_viewsettings, ref ChangedFieldsValuesPairHashTable, SessionControl.UserServerDatabase);

                string msg = "";
                if (insertUpdateDone > 0)
                {
                    msg = "Data save successfully.";
                }
                return Json(new[] { (object)insertUpdateDone, msg });
            }
            return Json("");
        }




        #endregion
        #region Manage MessageTemplate
        // VIEW FOR SHOW ALL TEMPLATES
        public ActionResult ManageMessageTemplates()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managemessagetemplate", HttpContext.Session.GetString("serverdatabase")))
            {
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        // JSON RESULT TO SHOW TEMPLATE ON MANAGE MESSAGE TEMPLATES VIEW
        public JsonResult AllMessageTemplates(int? start, int pSize = 10, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managemessagetemplate", HttpContext.Session.GetString("serverdatabase")))
            {
                int a = libSaralAuth.GetMstTemplateCount(SessionControl.UserServerDatabase);
                //var dt = libSaralAuth.GetmsgTemplateDataForGrid(Convert.ToInt32(start), pSize, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                var dt = libSaralAuth.GetmsgTemplateDataForGrid(Convert.ToInt32(start), pSize, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<MsgTemplateMater>();
                objdatatableToList = (DataTypeConversionLib.DTResult<MsgTemplateMater>)DCLib.ConvertDTtoModal<MsgTemplateMater>(dt,Convert.ToInt32(start), a, dt.Rows.Count);
                return Json(objdatatableToList);    
            }
            return Json("");
        }

        // JSON RESULT TO BIND VARIABLE LIST ON MANAGE MESSAGE TEMPLATES VIEW
        public JsonResult GetVariablesList()
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var variableObj = new VariableMaster();
            var dt = libSaralAuth.GetVariableList(Convert.ToString(SessionControl.UserServerDatabase));
            var DataList = DCLib.ConvertDataTable<VariableMaster>(dt);
            return Json(DataList);
        }
        #endregion

        #region Manage Employee
        /// <summary>
        /// Manage employees view
        /// </summary>
        /// <returns></returns>
        public ActionResult ManageEmployees()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageemployees", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");

                ViewBag.Message = "Date~2~dateOfjoining|Name~3~string|EmpId~4~integer|Department~5~integer|Designation~6~integer|Mobile No~7~string";
                string? searchcondition = "infotype='searchstring' and viewid='manageemployees' and  rowstatus=0 and Userlogin_key="+ Convert.ToInt32(LoginRow["Userlogin_key"])+ "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);

                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='manageemployees' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string Infostring = df1.GetCellValue(searchdr, "infostring", "string").ToString() ?? "";
                string[] infoStringArr = Infostring.Split('@');
                ViewBag.filterString = infoStringArr[0].ToString();

                string? sortcondition = "infotype='sortstring' and viewid='manageemployees' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"])+ "";
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr is null)
                {
                    sortcondition = "infotype='sortstring' and viewid='manageemployees' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }

                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string").ToString();
               
                string? hoverStripcondition ="infotype='hoverstripstring' and viewid='manageemployees' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"])+ "";
                var hoverStripdr = libSaralAuth.GetViewSettingsRowforLcondition(hoverStripcondition, SessionControl.UserServerDatabase);
                if (hoverStripdr is null)
                {
                    hoverStripcondition = "infotype='hoverstripstring' and viewid='manageemployees' and  rowstatus=0 and Userlogin_key=0";
                    hoverStripdr = libSaralAuth.GetViewSettingsRowforLcondition(hoverStripcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.hoverStripString = df1.GetCellValue(hoverStripdr, "infostring", "string").ToString();

                string? deviceType = Convert.ToString(HttpContext.Session.GetString("devicetype"));
                string viewName = deviceType == "D"? "ManageEmployees": "ManageEmployeesMV";
                return View(viewName);
            }
            return RedirectToAction("LogOut", "Home");
        }

        public ActionResult ManageEmployeesMV()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageemployees", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
               

                ViewBag.Message = "Date~2~dateOfjoining|Name~3~string|EmpId~4~integer|Department~5~integer|Designation~6~integer|Mobile No~7~string";
                string? searchcondition = "infotype='searchstring' and viewid='manageemployees' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);

                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='manageemployees' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                ViewBag.filterString = df1.GetCellValue(searchdr, "infostring", "string");
                string sortcondition = "infotype='sortstring' and viewid='manageemployees' and  rowstatus=0 and Userlogin_key="+ Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr is null)
                {
                    sortcondition = "infotype='sortstring' and viewid='manageemployees' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }

                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Used in getting employees list in Configuration
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <param name="ServerOrderValue"></param>
        /// <returns></returns>
        public JsonResult AjaxGetEmployeesData(string id, int? start, int pSize = 20, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageemployees", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return Json("");
                
                string? SortCondition = string.IsNullOrEmpty(order)? "EmpName asc" :order;
                string condition = " And (updateflag<>'D' or updateflag is null) ";
                if (!string.IsNullOrEmpty(search))
                    condition = condition + cfc1.GetSearchString(search); 
                

                int a = libSaralAuth.getRowsCountofActiveEmployees(SessionControl.UserServerDatabase, condition);

                //var dtEmp = libSaralAuth.GetActiveEmployeesDatagrid(Convert.ToInt32(start), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase, condition, SortCondition, 50);
                var dtEmp = libSaralAuth.GetActiveEmployeesDatagrid(Convert.ToInt32(start), DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase, condition, SortCondition, 50);

                var objdatatableToList = new DataTypeConversionLib.DTResult<EmployeesMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<EmployeesMaster>)DCLib.ConvertDTtoModal<EmployeesMaster>(dtEmp, Convert.ToInt32(start), a, dtEmp.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }
        /// <summary>
        /// function to send the employee credentials via email
        /// </summary>
        /// <param name="email"></param>
        /// <param name="userid"></param>
        /// <param name="pwd"></param>
        /// <returns></returns>
        [HttpPost()]
        public JsonResult SendEmpCredentialsInEmail(string email, string userid, string pwd)
        {
            var gflib = new GoggleApiFunction.Class1();
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "employeesform", HttpContext.Session.GetString("serverdatabase")))
            {
                string mtext = "Dear<br/><br/> Your Gainbooks Credentials are:<br/>UserName:&nbsp;&nbsp;" + userid + " <br/> Password:&nbsp;&nbsp;" + pwd + "<br/><br/> Regards<br/> Gainbooks Team";
                string subject = "Gainbooks Credentials";
                gflib.SendEmail(email, subject, mtext, @"C:\cntr_dir\googleapiconfig.txt");
                return Json("Success");
            }
            return Json("");
        }
        // VIEW FOR SHOW ALL TEMPLATES
        public ActionResult ShowID()
        {
            TempData.Keep();
            return View();

        }
        /// <summary>
        /// get employees form for edit and delete and create employee
        /// </summary>
        /// <param name="P_employee"></param>
        /// <param name="exitmode"></param>
        /// <returns></returns>
        public ActionResult EmployeesForm(int? P_employee, string exitmode = "create")
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "employeesform", HttpContext.Session.GetString("serverdatabase")))
            {
                var EmployeesMasterObj = new EmployeesMaster();
                if (exitmode.ToLower() == "edit" | exitmode.ToLower() == "delete")
                {
                    DataRow dtRow = libSaralAuth.GetEmployeeRowbyP_employees(Convert.ToInt32(P_employee), SessionControl.UserServerDatabase);
                    EmployeesMasterObj = DCLib.GetModelFromDataRow<EmployeesMaster>(dtRow);
                    if (df1.GetCellValue(dtRow, "HomeTown", "Integer") is not null && EmployeesMasterObj.HomeTown != 0)
                    {
                        EmployeesMasterObj.TxtHomeTown = cfc1.GetNameOfInfoFromInfotableFromP_infotable(EmployeesMasterObj.HomeTown, SessionControl.UserServerDatabase);
                    }
                }
                EmployeesMasterObj.exitmode = exitmode;

                string condition = "infotype='compositestring' and viewid='employeeForm' and  rowstatus=0 ";
                var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                if (dr is not null)
                    EmployeesMasterObj.InfoString = df1.GetCellValue(dr, "infostring", "string").ToString() ?? "";
                else
                    EmployeesMasterObj.InfoString = "";

                return View(EmployeesMasterObj);

            }
            return RedirectToAction("LogOut", "Home");
        }


        /// <summary>

        ///     ''' Converts all keys of formcollection object to hashtable as per their datatypes mentioned in tableclass

        ///     ''' </summary>

        ///     ''' <param name="fc">FormCollection object to be converted</param>

        ///     ''' <param name="tableCls">Corresponding tableclass object from which datatypes has to be extracted</param>

        ///     ''' <returns></returns>
        //public Hashtable ConvertFCToHashTable(IFormCollection fc, object tableCls)
        //{
        //    Hashtable kl1 = new Hashtable();
        //    string Method_Name = "ConvertFCToHashTable";
        //    string[] param_names = new[] { "fc", "tableCls" };
        //    object[] param_values = new[] { fc, tableCls }; rdc.StartMethod(Method_Name, param_names, param_values);
        //    DataTable dtschema = tableCls.schematable;
        //    // Dim jk() As String = {}
        //    for (var kl = 0; kl <= fc.Keys.Count  - 1; kl++)
        //    {
        //        string keyname = fc.Keys.ElementAt [kl];
        //        DataRow dtr = dtschema.Rows.Find(keyname);
        //        object mvalue = fc.Get(kl);
        //        if (!dtr == null)
        //        {
        //            string mdatatype = dtr.Item("Data_type");
        //            switch (Strings.LCase(mdatatype))
        //            {
        //                case "char":
        //                case "nchar":
        //                case "varchar":
        //                    {
        //                        try
        //                        {
        //                            string mvalueStr = System.Convert.ToString(mvalue);
        //                            kl1 = GF1.AddItemToHashTable(kl1, fc.AllKeys(kl), mvalueStr);
        //                        }
        //                        catch
        //                        {
        //                            kl1 = GF1.AddItemToHashTable(kl1, fc.AllKeys(kl), "");
        //                        }

        //                        break;
        //                    }

        //                case "int":
        //                case "tinyint":
        //                    {
        //                        try
        //                        {
        //                            int mvalueStr = System.Convert.ToInt32(mvalue);
        //                            kl1 = GF1.AddItemToHashTable(kl1, fc.AllKeys(kl), mvalueStr);
        //                        }
        //                        catch
        //                        {
        //                            kl1 = GF1.AddItemToHashTable(kl1, fc.AllKeys(kl), -1);
        //                        }

        //                        break;
        //                    }

        //                case "datetime":
        //                    {
        //                        try
        //                        {
        //                            DateTime mvalueStr = System.Convert.ToDateTime(mvalue);
        //                            kl1 = GF1.AddItemToHashTable(kl1, fc.AllKeys(kl), mvalueStr);
        //                        }
        //                        catch
        //                        {
        //                            kl1 = GF1.AddItemToHashTable(kl1, fc.AllKeys(kl), new DateTime(1901, 1, 1));
        //                        }

        //                        break;
        //                    }

        //                case "numeric":
        //                    {
        //                        try
        //                        {
        //                            decimal mvalueStr = System.Convert.ToDecimal(mvalue);
        //                            kl1 = GF1.AddItemToHashTable(kl1, fc.AllKeys(kl), mvalueStr);
        //                        }
        //                        catch
        //                        {
        //                            kl1 = GF1.AddItemToHashTable(kl1, fc.AllKeys(kl), 0.0);
        //                        }

        //                        break;
        //                    }
        //            }
        //        }
        //    }
        //    rdc.EndMethod();
        //    return kl1;
        //}




        /// <summary>
        /// Post function to create employee login  of new employees
        /// </summary>
        /// <param name="fc"></param>
        /// <param name="EmployeesMasterObj"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult EmployeesForm(IFormCollection fc, EmployeesMaster EmployeesMasterObj, string exitmode = "create")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            string prgname = String.Empty;
            switch (EmployeesMasterObj.exitmode?.Trim().ToLower())
            {
                case "create":
                    prgname = "createemployee";
                    break;

                case "edit":
                    prgname = "editemployee";
                    break;

                case "delete":
                    prgname = "deleteemployee";
                    break;

                default:
                    prgname = "";
                    break;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")))
            {
                if (libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), prgname, HttpContext.Session.GetString("serverdatabase")))
                {
                    if (ModelState.IsValid)
                    {
                        DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                        var argSessionInstance = SessionControl;
                        var ClsEmployees1 = new Employees.Employees.Employees(ref argSessionInstance);
                        SessionControl = argSessionInstance;
                        var argSessionInstance1 = SessionControl;
                        var ClsAccMaster1 = new Accmaster.Accmaster.Accmaster(ref argSessionInstance1);
                        SessionControl = argSessionInstance1;
                        var dtHashAccMaster = new Hashtable();
                        var dtHashUserLogin = new Hashtable();
                        var dtHashUserRoles = new Hashtable();
                        var dtHashUsersettings = new Hashtable();
                        int P_acccode;

                        //var dthash = DCLib.ConvertFCToHashTable(fc, ClsEmployees1);
                        var dthash = DCLib.ConvertIFCToHashTable(fc, ClsEmployees1);
                        dthash = GF1.AddItemToHashTable(ref dthash, "activeyn", "Y");

                        //dtHashAccMaster = DCLib.ConvertFCToHashTable(fc, ClsAccMaster1);
                        dtHashAccMaster = DCLib.ConvertIFCToHashTable(fc, ClsAccMaster1);

                        string? InfoString = "";
                        string condition = "infotype='compositestring' and viewid='employeeForm' and  rowstatus=0 ";
                        var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                        if (dr is not null)
                        {
                            InfoString = Convert.ToString(df1.GetCellValue(dr, "infostring"));
                        }

                        if (!string.IsNullOrEmpty(InfoString))
                        {
                            string? compositeFinalValue = "";
                            var ctrls = InfoString.Split('#');
                            var joinedctrls = new string[ctrls.Length + 1];
                            for (int i = 0, loopTo = ctrls.Length - 1; i <= loopTo; i++)
                            {
                                var ctrl = ctrls[i].Split('~');
                                string value = fc[ctrl[2]];
                                compositeFinalValue = Convert.ToString(compositeFinalValue + (string.IsNullOrEmpty(compositeFinalValue) ? ctrl[1] + "~" + ctrl[2] + "~" + value : "#" + ctrl[1] + "~" + ctrl[2] + "~" + value));
                            }
                            EmployeesMasterObj.Compositefield = compositeFinalValue;
                            dthash = GF1.AddItemToHashTable(ref dthash, "Compositefield", compositeFinalValue, true);
                        }


                        if (exitmode.ToLower() == "edit" | exitmode.ToLower() == "delete")
                        {
                            var accRow = libSaralAuth.GetAccMasterRowForEmployeeId(Convert.ToInt32(fc["P_employees"]), SessionControl.UserServerDatabase, "P_acccode");
                            if (accRow is not null)
                                dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "P_acccode", accRow["P_acccode"], true);

                            //check moduleassigned value
                            var empRow = libSaralAuth.GetEmployeeRowbyP_employees(EmployeesMasterObj.P_Employees,SessionControl.UserServerDatabase, "moduleassigned");
                            string oldModuleassigned = df1.GetCellValue(empRow, "moduleassigned", "string").ToString()?.Trim()??"";
                            string newModuleassigned = fc["moduleassigned"];

                            string[] strs1 = newModuleassigned.Split(",");
                            string[] strs2 = oldModuleassigned.Split(",");
                            string moduleassignedDiff = String.Join(",", strs1.Except(strs2).Union(strs2.Except(strs1)));
                            //end of checking 

                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "AccName", EmployeesMasterObj.EmpName, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Mobile", EmployeesMasterObj.MobNo, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "email", EmployeesMasterObj.Email, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress1", EmployeesMasterObj.PostalAddress1, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress2", EmployeesMasterObj.PostalAddress2, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress3", EmployeesMasterObj.PostalAddress3, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress4", EmployeesMasterObj.PostalAddress4, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Remarks", EmployeesMasterObj.Proceedings, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "HomeTown", fc["homeTown"], true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Contactperson", EmployeesMasterObj.EmpName, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Status", "Y", true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Phone", EmployeesMasterObj.Phone, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "under", (EmployeesMasterObj.Under == 0 ? 1 : EmployeesMasterObj.Under), true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "updateflag", "U", true);

                            int argid = Convert.ToInt32(dtHashAccMaster["P_acccode"]);
                            P_acccode = Convert.ToInt32(libSaralAuth.InsertUpdateInAcc_Master(ref argid, ref dtHashAccMaster, sessionRow, SessionControl.UserServerDatabase));
                            dthash = GF1.AddItemToHashTable(ref dthash, "p_acccode", dtHashAccMaster["P_acccode"], true);
                            dthash = GF1.AddItemToHashTable(ref dthash, "updateflag", "U", true);
                            dthash = GF1.AddItemToHashTable(ref dthash, "Under", (EmployeesMasterObj.Under == 0 ? 1 : EmployeesMasterObj.Under), true);

                            int argP_employees = EmployeesMasterObj.P_Employees;
                            int P_Employees = Convert.ToInt32(libSaralAuth.InsertUpdateInEmployee(ref argP_employees, ref dthash, sessionRow, SessionControl.UserServerDatabase));

                            string Address = fc["PostalAddress1"].ToString().Trim() + "," + fc["PostalAddress2"].ToString().Trim() + "," + fc["PostalAddress3"].ToString().Trim() + "," + fc["PostalAddress4"].ToString().Trim();

                            var userloginRow = libSaralAuth.getUserLoginRowFromP_acccode(Convert.ToInt32(accRow?["p_acccode"]), SessionControl.UserServerDatabase, "Userlogin_key");
                            if (userloginRow is not null)
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "userlogin_key", userloginRow["Userlogin_key"], true);

                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Email", EmployeesMasterObj.Email?.ToString().Trim());
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Address", Address.ToString().Trim());
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Name", EmployeesMasterObj.EmpName?.ToString().Trim());
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Mobile", EmployeesMasterObj.MobNo);
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "updateflag", "U");

                            int argid1 = Convert.ToInt32(dtHashUserLogin["userlogin_key"]);
                            int UserLogin_key = libSaralAuth.InsertUpdateUserLogin(ref argid1, ref dtHashUserLogin, SessionControl.UserServerDatabase);

                            //If need to update userroles or usersettings
                            if (!string.IsNullOrWhiteSpace(moduleassignedDiff))
                            {
                                string nameofInfoModule = libSaralAuth.GetNameofInfoFromInfotableUserByP_infotable(newModuleassigned, SessionControl.UserServerDatabase);
                                
                                if (string.IsNullOrEmpty(nameofInfoModule))
                                    nameofInfoModule = "calls";

                                string? settingsstr = "";
                                settingsstr = libSaralAuth.GetCombinedInfoDesForModule(nameofInfoModule, SessionControl.UserServerDatabase);
                                var splitByHash = settingsstr?.Split('#');

                                string WebRoles = splitByHash[0];
                                string appRoles = splitByHash[1];
                                string serviceroles = splitByHash[2];
                                string usersettings = splitByHash[3];

                                var drUserRoles = libSaralAuth.GetUserRolesFromUserLogin_key(Convert.ToInt32(userloginRow["Userlogin_key"]),SessionControl.UserServerDatabase);
                                
                                dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "P_userroles", df1.GetCellValue(drUserRoles, "P_userroles", "integer"),true);
                                dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "WebRoles", WebRoles.ToString().Trim());
                                dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "AppRoles", appRoles.ToString().Trim());
                                dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "serviceroles", serviceroles.ToString().Trim());

                                int argP_userRoles = Convert.ToInt32(dtHashUserRoles["P_userroles"]);
                                int UserRoles_key = libSaralAuth.InsertUpdateUserRoles(ref argP_userRoles, ref dtHashUserRoles, SessionControl.UserServerDatabase);

                                var dtUserSettings = libSaralAuth.getUserSettingsRowFromUserLogin_key(Convert.ToInt32(userloginRow["Userlogin_key"]), SessionControl.UserServerDatabase);
                                dtHashUsersettings = GF1.AddItemToHashTable(ref dtHashUsersettings, "p_usersettings", df1.GetCellValue(dtUserSettings, "p_usersettings", "integer"), true);
                                dtHashUsersettings = GF1.AddItemToHashTable(ref dtHashUsersettings, "settingsstring", usersettings.ToString().Trim());
                                dtHashUsersettings = GF1.AddItemToHashTable(ref dtHashUsersettings, "updateflag", "U");
                                dtHashUsersettings = GF1.AddItemToHashTable(ref dtHashUsersettings, "websessions_key", df1.GetCellValue(sessionRow, "websessions_key", "integer"));
                                int argid4 = Convert.ToInt32(dtHashUsersettings["p_usersettings"]); 
                                var usersettings_key = libSaralAuth.InsertUpdateInUserSettings(ref argid4, ref dtHashUsersettings, SessionControl.UserServerDatabase);
                            }

                            return RedirectToAction("ManageEmployees");
                        }
                        else
                        {
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "P_acccode", -1, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "AccName", EmployeesMasterObj.EmpName?.ToString().Trim());
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Mobile", EmployeesMasterObj.MobNo, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress1", EmployeesMasterObj.PostalAddress1, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress2", EmployeesMasterObj.PostalAddress2, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress3", EmployeesMasterObj.PostalAddress3, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress4", EmployeesMasterObj.PostalAddress4, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Remarks", EmployeesMasterObj.Proceedings, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "HomeTown", fc["homeTown"], true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Contactperson", EmployeesMasterObj.EmpName, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "under", (EmployeesMasterObj.Under == 0 ? 1 : EmployeesMasterObj.Under), true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Phone", EmployeesMasterObj.Phone, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Status", "Y");
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "acctype", 3042);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "updateflag", "I", true);

                            int argid2 = Convert.ToInt32(dtHashAccMaster["P_acccode"]);
                            P_acccode = Convert.ToInt32(libSaralAuth.InsertUpdateInAcc_Master(ref argid2, ref dtHashAccMaster, sessionRow, SessionControl.UserServerDatabase));

                            dthash = GF1.AddItemToHashTable(ref dthash, "Under", (EmployeesMasterObj.Under == 0 ? 1 : EmployeesMasterObj.Under), true);
                            dthash = GF1.AddItemToHashTable(ref dthash, "p_acccode", P_acccode, true);
                            dthash = GF1.AddItemToHashTable(ref dthash, "updateflag", "I", true);
                            int argP_employees1 = EmployeesMasterObj.P_Employees;
                            int P_Employees = Convert.ToInt32(libSaralAuth.InsertUpdateInEmployee(ref argP_employees1, ref dthash, sessionRow, SessionControl.UserServerDatabase));
                            EmployeesMasterObj.P_Employees = argP_employees1;

                            string Address = fc["PostalAddress1"].ToString().Trim() + "," + fc["PostalAddress2"].ToString().Trim() + "," + fc["PostalAddress3"].ToString().Trim() + "," + fc["PostalAddress4"].ToString().Trim();
                            string password = string.Empty;
                            if (Convert.ToInt32(HttpContext.Session.GetInt32("mainbusscode")) == 859)
                            {
                                password = EmployeesMasterObj.EmpName?.Replace(" ", "").Substring(0, 4) + "1234";
                            }
                            else
                            {
                                password = libSaralAuth.GenerateRandomPass(8);
                            }

                            string userid = libSaralAuth.getLastcharFromUlname(EmployeesMasterObj.EmpName?.Substring(0, 4), SessionControl.UserServerDatabase);
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "UserId", userid);
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Pwd", password);

                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "userlogin_key", -1);
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Email", EmployeesMasterObj.Email?.ToString().Trim());
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Address", Address.ToString().Trim());
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Name", EmployeesMasterObj.EmpName?.ToString().Trim());
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Mobile", EmployeesMasterObj.MobNo);
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Linkcode", P_acccode);
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Linktype", "E");
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "updateflag", "I");

                            int argid3 = Convert.ToInt32(dtHashUserLogin["userlogin_key"]);
                            int UserLogin_key = libSaralAuth.InsertUpdateUserLogin(ref argid3, ref dtHashUserLogin, SessionControl.UserServerDatabase);


                            if (Convert.ToInt32(HttpContext.Session.GetInt32("mainbusscode")) == 859)
                            {
                                var srlHash = new Hashtable();
                                srlHash = GF1.AddItemToHashTable(ref srlHash, "srl_pro_key", -1, true);
                                srlHash = GF1.AddItemToHashTable(ref srlHash, "p_srl_pro", -1, true);
                                srlHash = GF1.AddItemToHashTable(ref srlHash, "prodname", EmployeesMasterObj.EmpName?.ToString().Trim(), true);
                                srlHash = GF1.AddItemToHashTable(ref srlHash, "itemtype", "A", true);
                                srlHash = GF1.AddItemToHashTable(ref srlHash, "websessions_key", df1.GetCellValue(sessionRow, "websessions_key", "integer"), true);
                                string prodcode = saleOrderLib.generateProdcodeForItemType("A", SessionControl.UserServerDatabase);
                                srlHash = GF1.AddItemToHashTable(ref srlHash, "prodcode", prodcode, true);
                                string argprodcode = (-1).ToString();
                                string argcustcode = "";
                                saleOrderLib.InsertUpdateInSRLPro(ref argprodcode, ref argcustcode, ref srlHash, SessionControl.UserServerDatabase);
                            }

                            string WebRoles = "";
                            string appRoles = "";
                            // NameofInfo for emplSector
                            string nameofInfoModule = "";
                            //if (EmployeesMasterObj.Department > 0)
                            //{
                            //  nameofInfoDept = cfc1.GetNameOfInfoFromInfotableFromP_infotable(EmployeesMasterObj.Department, SessionControl.UserServerDatabase);
                            //}
                            string moduleassigned = fc["moduleassigned"];
                            if (!string.IsNullOrWhiteSpace(moduleassigned))
                            {
                                nameofInfoModule = libSaralAuth.GetNameofInfoFromInfotableUserByP_infotable(moduleassigned,SessionControl.UserServerDatabase);
                            }

                            if (string.IsNullOrEmpty(nameofInfoModule))
                                nameofInfoModule = "calls";

                            string? settingsstr = "";
                            ///Commented by aslam
                            //var dtinfotb = libSaralAuth.getInfotableUserForCondition(" and infotype = 28 and nameofinfo ='" + nameofInfoDept.ToString()?.Trim() + "' ", SessionControl.UserServerDatabase, "infodes");
                            //if (dtinfotb is not null)
                            //{
                            //    if (dtinfotb.Rows.Count > 0)
                            //    {
                            //        settingsstr = Convert.ToString(df1.GetCellValue(dtinfotb.Rows[0], "infodes", "string"));
                            //    }
                            //}

                            settingsstr = libSaralAuth.GetCombinedInfoDesForModule(nameofInfoModule, SessionControl.UserServerDatabase);
                            var splitByHash = settingsstr?.Split('#');

                            WebRoles = splitByHash[0];
                            appRoles = splitByHash[1];
                            string serviceroles = splitByHash[2];
                            string usersettings = splitByHash[3];

                            dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "P_userRoles", -1);
                            dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "UserLogin_key", UserLogin_key);
                            dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "WebRoles", WebRoles.ToString().Trim());
                            dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "AppRoles", appRoles.ToString().Trim());
                            dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "serviceroles", serviceroles.ToString().Trim());

                            int argP_userRoles = Convert.ToInt32(dtHashUserRoles["P_userroles"]);
                            int UserRoles_key = libSaralAuth.InsertUpdateUserRoles(ref argP_userRoles, ref dtHashUserRoles, SessionControl.UserServerDatabase);


                            dtHashUsersettings = GF1.AddItemToHashTable(ref dtHashUsersettings, "p_usersettings", -1);
                            dtHashUsersettings = GF1.AddItemToHashTable(ref dtHashUsersettings, "UserLogin_key", UserLogin_key);
                            dtHashUsersettings = GF1.AddItemToHashTable(ref dtHashUsersettings, "settingsstring", usersettings.ToString().Trim());
                            dtHashUsersettings = GF1.AddItemToHashTable(ref dtHashUsersettings, "activeyn", "Y");
                            dtHashUsersettings = GF1.AddItemToHashTable(ref dtHashUsersettings, "updateflag", "I");
                            dtHashUsersettings = GF1.AddItemToHashTable(ref dtHashUsersettings, "websessions_key", df1.GetCellValue(sessionRow, "websessions_key", "integer"));
                            int argid4 = -1;
                            var usersettings_key = libSaralAuth.InsertUpdateInUserSettings(ref argid4, ref dtHashUsersettings, SessionControl.UserServerDatabase);


                            TempData["UserName"] = userid;
                            TempData["Password"] = password;
                            return RedirectToAction("ShowID");


                        }
                    }
                    else
                    {
                        ModelState.AddModelError(0.ToString(), "An error occured while storing your Information .Please try again later.");

                        return View(EmployeesMasterObj);
                    }

                }
                //ViewBag.message = authorizedMsg;
                //return View(EmployeesMasterObj);

                TempData["message"] = authorizedMsg;
                if (EmployeesMasterObj.exitmode?.Trim().ToLower() == "edit")
                {
                    return RedirectToAction("EmployeesForm", new { @P_employee = EmployeesMasterObj.P_Employees, @exitmode = EmployeesMasterObj.exitmode });
                }
                else
                {
                    return RedirectToAction("EmployeesForm");
                }
            }
            TempData["Message"] = authenticatedMsg;
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Reset Employee password
        /// </summary>
        /// <param name="p_acccode"></param>
        /// <returns></returns>
        [HttpGet]
        public ActionResult ResetEmpPassword(int p_acccode)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            DataRow? SaralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
            if (SaralLoginRow is null)
                return RedirectToAction("LogOut", "Home");
            
            var userloginRow = libSaralAuth.getUserLoginRowFromP_acccode(p_acccode, SessionControl.UserServerDatabase, "Userlogin_key,userid,name");
            if (userloginRow is not null)
            {
                var dtHashUserLogin = new Hashtable();
                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "userlogin_key", userloginRow["Userlogin_key"], true);
                string password = string.Empty;
                if (Convert.ToInt32(HttpContext.Session.GetInt32("mainbusscode")) == 859)
                {
                    password = df1.GetCellValue(userloginRow, "name", "string").ToString()?.Substring(0, 4) + "1234";
                }
                else
                {
                    password = libSaralAuth.GenerateRandomPass(8);
                }
                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Pwd", password, true);
                int argid = Convert.ToInt32(dtHashUserLogin["userlogin_key"]);
                int UserLogin_key = libSaralAuth.InsertUpdateUserLogin(ref argid, ref dtHashUserLogin, SessionControl.UserServerDatabase);

                if ((SaralLoginRow["userid"].ToString()?.Trim() ?? "") == (userloginRow["userid"].ToString()?.Trim() ?? ""))
                {
                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "userlogin_key", SaralLoginRow["userlogin_key"], true);
                    int argid1 = Convert.ToInt32(dtHashUserLogin["userlogin_key"]);
                    libSaralAuth.InsertUpdateUserLogin(ref argid1, ref dtHashUserLogin, SessionControl.MainServerDatabase);
                    
                }

                TempData["UserName"] = df1.GetCellValue(userloginRow, "userid", "string").ToString()?.Trim();
                TempData["Password"] = password;
                return RedirectToAction("ShowID");
            }
            else
            {
                return RedirectToAction("LogOut", "Home");
            }
        }

        #endregion

        #region ManageCustomers
        public ActionResult ManageCustomers()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managecustomers", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");

                ViewBag.Message = "Custcode~2~string|Name~3~string|CustomerId~4~integer|Date~5~date|Mobile No~6~string";
                string? searchcondition = "infotype='searchstring' and viewid='managecustomers' and  rowstatus=0 and Userlogin_key="+ Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);

                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='managecustomers' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string Infostring = df1.GetCellValue(searchdr, "infostring", "string").ToString() ?? "";
                var infoStringArr = Infostring.Split('@');
                ViewBag.filterString = infoStringArr[0];

                string? sortcondition = "infotype='sortstring' and viewid='managecustomers' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr is null)
                {
                    sortcondition = "infotype='sortstring' and viewid='managecustomers' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }

                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");

                string? hoverStripcondition = "infotype='hoverstripstring' and viewid='managecustomers' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                var hoverStripdr = libSaralAuth.GetViewSettingsRowforLcondition(hoverStripcondition, SessionControl.UserServerDatabase);
                if (hoverStripdr is null)
                {
                    hoverStripcondition = "infotype='hoverstripstring' and viewid='managecustomers' and  rowstatus=0 and Userlogin_key=0";
                    hoverStripdr = libSaralAuth.GetViewSettingsRowforLcondition(hoverStripcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.hoverStripString = df1.GetCellValue(hoverStripdr, "infostring", "string");


                return View();

            }
            return RedirectToAction("LogOut", "Home");
        }
        [HttpGet]
        public ActionResult CustomerForm(int? P_customers, string exitmode = "create")
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "customersform", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey =0;
                string? LoginType = "";
                if (sessionRow is not null)
                {
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                    LoginType = Convert.ToString(sessionRow["linktype"]);
                }
                else
                {
                    return RedirectToAction("LogOut", "Home");
                }
                var CustomerObj = new CustomerMaster();
                if (exitmode.ToLower() == "edit" | exitmode.ToLower() == "delete")
                {
                    var dtRow = libSaralAuth.GetCustomerRowbyP_customers(Convert.ToInt32(P_customers), SessionControl.UserServerDatabase);
                    CustomerObj = DCLib.GetModelFromDataRow<CustomerMaster>(dtRow);
                    if (df1.GetCellValue(dtRow, "HomeTown", "Integer") is not null && CustomerObj.HomeTown != 0)
                    {
                        CustomerObj.TextHomeTown = cfc1.GetNameOfInfoFromInfotableFromP_infotable(CustomerObj.HomeTown, SessionControl.UserServerDatabase);
                    }
                }
                CustomerObj.exitmode = exitmode;
                string condition = "infotype='compositestring' and viewid='customerForm' and  rowstatus=0 ";
                var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                if (dr is not null)
                    CustomerObj.InfoString = df1.GetCellValue(dr, "infostring","string").ToString() ?? ""; 
                else
                    CustomerObj.InfoString = "";

                return View(CustomerObj);



            }
            return RedirectToAction("LogOut", "Home");
        }
        [HttpPost()]
        [ValidateAntiForgeryToken()]
        public ActionResult CustomerForm(IFormCollection fc, CustomerMaster CustomerObj)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }
            string prgname = String.Empty;
            switch (CustomerObj.exitmode?.Trim().ToLower())
            {
                case "create":
                    prgname = "createcustomer";
                    break;

                case "edit":
                    prgname = "editcustomer";
                    break;

                case "delete":
                    prgname = "deletecustomer";
                    break;

                default:
                    prgname = "";
                    break;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) )
            {
                if (libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), prgname, HttpContext.Session.GetString("serverdatabase")))
                {
                    if (ModelState.IsValid)
                    {
                        DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                        int Loginkey = 0;
                        if (sessionRow is not null)
                        {
                            Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                        }
                        else
                        {
                            return RedirectToAction("LogOut", "Home");
                        }
                        DataRow? dtr = null;
                        var dtHashAccMaster = new Hashtable();
                        dtr = DCLib.GetDataRowFromModel<CustomerMaster>(CustomerObj);
                        var dthash = new Hashtable();
                        dthash = GF1.CreateHashTable(dtr);
                        dthash = GF1.AddItemToHashTable(ref dthash, "empAssigned", sessionRow["linkcode"], true);
                        int P_Customers = 0;
                        var resultHash = new Hashtable();
                        var dthashCrmContacts = new Hashtable();
                        var dthashCrmPhone = new Hashtable();

                        string? InfoString = "";
                        string condition = "infotype='compositestring' and viewid='customerForm' and  rowstatus=0 ";
                        var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                        if (dr is not null)
                        {
                            InfoString = Convert.ToString(df1.GetCellValue(dr, "infostring"));
                        }

                        if (!string.IsNullOrEmpty(InfoString))
                        {
                            string? compositeFinalValue = "";
                            var ctrls = InfoString.Split('#');
                            var joinedctrls = new string[ctrls.Length + 1];
                            for (int i = 0, loopTo = ctrls.Length - 1; i <= loopTo; i++)
                            {
                                var ctrl = ctrls[i].Split('~');
                                string value = fc[ctrl[2]];
                                compositeFinalValue = Convert.ToString(compositeFinalValue + (string.IsNullOrEmpty(compositeFinalValue) ? ctrl[1] + "~" + ctrl[2] + "~" + value : "#" + ctrl[1] + "~" + ctrl[2] + "~" + value));
                            }
                            CustomerObj.Compositefield = compositeFinalValue;
                            dthash = GF1.AddItemToHashTable(ref dthash, "Compositefield", compositeFinalValue, true);
                        }


                        string Address = fc["PostalAddress1"].ToString().Trim() + "," + fc["PostalAddress2"].ToString().Trim() + "," + fc["PostalAddress3"].ToString().Trim() + "," + fc["PostalAddress4"].ToString().Trim();

                        if (CustomerObj.exitmode.ToLower() == "edit" | CustomerObj.exitmode.ToLower() == "delete")
                        {
                            dthash = GF1.AddItemToHashTable(ref dthash, "updateflag", "U", true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "AccName", CustomerObj.CustName, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Mobile", CustomerObj.MobNo, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress1", CustomerObj.PostalAddress1, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress2", CustomerObj.PostalAddress2, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress3", CustomerObj.PostalAddress3, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress4", CustomerObj.PostalAddress4, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "HomeTown", fc["homeTown"], true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Contactperson", CustomerObj.Contactperson, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "email", CustomerObj.Email, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Phone", CustomerObj.Phone, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "updateflag", "U", true);

                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "fullname", CustomerObj.Contactperson, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "email", CustomerObj.Email, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "facebook", CustomerObj.Facebookid, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "twitter", CustomerObj.Twitterid, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "linkedin", CustomerObj.Linkedin, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "address1", CustomerObj.PostalAddress1, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "address2", CustomerObj.PostalAddress2, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "HomeTown", fc["homeTown"], true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "updateflag", "U", true);

                            dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "number", CustomerObj.MobNo, true);
                            dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "isregistered", "Y", true);
                            dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "updateflag", "U", true);

                            if (!string.IsNullOrEmpty(CustomerObj.MobNo))
                            {
                                dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "ismobile", "Y", true);
                                dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "number", CustomerObj.MobNo, true);
                                dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "mobilephone", CustomerObj.MobNo, true);
                            }
                            else
                            {
                                dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "number", CustomerObj.Phone, true);
                                dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "mobilephone", CustomerObj.Phone, true);
                            }


                            string sqlstr1 = " and isprimarycontact='Y'  and  p_acccode=" + CustomerObj.p_acccode;
                            var dt1 = libcustomerfeature.GetCRMContactsDatatable(sqlstr1, SessionControl.UserServerDatabase, "p_crmcontacts");
                            int p_crmcontacts = 0;
                            if (dt1.Rows.Count > 0)
                            {
                                p_crmcontacts = Convert.ToInt32(df1.GetCellValue(dt1.Rows[0], "p_crmcontacts", "integer"));
                            }
                            int p_crmphone = 0;
                            sqlstr1 = " and  isregistered = 'Y' and  p_acccode=" + CustomerObj.p_acccode;
                            dt1 = libcustomerfeature.GetCRMPhoneDatatable(sqlstr1, SessionControl.UserServerDatabase, "p_crmphone");
                            if (dt1.Rows.Count > 0)
                            {
                                p_crmphone = Convert.ToInt32(df1.GetCellValue(dt1.Rows[0], "p_crmphone", "integer"));
                            }
                            else
                            {
                                sqlstr1 = " and isregistered = 'Y' and  p_crmcontacts=" + p_crmcontacts;
                                dt1 = libcustomerfeature.GetCRMPhoneDatatable(sqlstr1, SessionControl.UserServerDatabase, "p_crmphone");
                                if (dt1.Rows.Count > 0)
                                {
                                    p_crmphone = Convert.ToInt32(df1.GetCellValue(dt1.Rows[0], "p_crmphone", "Integer"));
                                }
                            }
                            int argp_acccode = CustomerObj.p_acccode;
                            int argP_Customers = CustomerObj.P_Customers;
                            resultHash = libcustomerfeature.InsertUpdateAccmasterCustomerCrmContactsCrmPhone(ref argp_acccode, ref dtHashAccMaster, ref argP_Customers, ref dthash, ref p_crmcontacts, ref dthashCrmContacts, ref p_crmphone, ref dthashCrmPhone, SessionControl.UserServerDatabase, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""));
                            CustomerObj.p_acccode = argp_acccode;
                            CustomerObj.P_Customers = argP_Customers;
                            P_Customers = Convert.ToInt32(resultHash["p_customers"]);
                            if (P_Customers < 0)
                            {
                                ModelState.AddModelError(string.Empty, "An Error occured While storing your Information .Please Try again later.");
                                return View(CustomerObj);
                            }
                            else
                            {
                                if (!string.IsNullOrEmpty(CustomerObj.Phone))
                                {
                                    var argSessionInstance = SessionControl;
                                    var clscrmphone1 = new CRMPhone.CRMPhone.CRMPhone(ref argSessionInstance);
                                    SessionControl = argSessionInstance;
                                    clscrmphone1.ServerDatabase = SessionControl.UserServerDatabase; // GlobalControl.Variables.UserServerDatabase
                                    string? sqlstr11 = " And  islandline = 'Y' and  p_acccode=" + Convert.ToInt32(resultHash["p_acccode"]);
                                    var dtcrm11 = libcustomerfeature.GetCRMPhoneDatatable(sqlstr11, SessionControl.UserServerDatabase);
                                    if (dtcrm11 is not null)
                                    {
                                        if (dtcrm11.Rows.Count > 0)
                                        {
                                            clscrmphone1.PrevRow = df1.UpdateDataRows(clscrmphone1.PrevRow, dtcrm11.Rows[0]);
                                            clscrmphone1.CurrRow["updateflag"] = "U";
                                        }
                                        else
                                        {
                                            clscrmphone1.CurrRow["crmphone_key"] = -1;
                                            clscrmphone1.CurrRow["p_crmphone"] = -1;
                                            clscrmphone1.CurrRow["updateflag"] = "I";
                                        }
                                    }
                                    clscrmphone1.CurrRow["p_acccode"] = resultHash["p_acccode"];
                                    clscrmphone1.CurrRow["p_crmcontacts"] = resultHash["p_crmcontacts"];
                                    clscrmphone1.CurrRow["number"] = CustomerObj.Phone;
                                    clscrmphone1.CurrRow["islandline"] = "Y";
                                    clscrmphone1.CurrRow["iswhatsappno"] = "N";
                                    var fgobj = new object[] { clscrmphone1 };
                                    cfc1.SaveIntodb(fgobj);

                                }


                                var dtHashUserLogin = new Hashtable();
                                var userloginRow = libSaralAuth.getUserLoginRowFromP_acccode(CustomerObj.p_acccode, SessionControl.UserServerDatabase, "Userlogin_key");
                                if (userloginRow is not null)
                                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "userlogin_key", userloginRow["Userlogin_key"], true);

                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Email", CustomerObj.Email);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Address", Address);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Name", CustomerObj.CustName);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Mobile", CustomerObj.MobNo);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "updateflag", "U");

                                int argid = Convert.ToInt32(dtHashUserLogin["userlogin_key"]);
                                int UserLogin_key = libSaralAuth.InsertUpdateUserLogin(ref argid, ref dtHashUserLogin, SessionControl.UserServerDatabase);

                                TempData["Message"] = "Customer is Edited Successfully";
                                return RedirectToAction("ManageCustomers");
                            }
                        }
                        else
                        {
                            string newcustCode = libcustomerfeature.ValidateAndReturnCorrectCustcode(CustomerObj.CustCode.Trim(), CustomerObj.CustName.Trim(), SessionControl.UserServerDatabase, "userlogin");
                            if ((newcustCode.Trim() ?? "") != (CustomerObj.CustCode.Trim() ?? ""))
                            {
                                ModelState.AddModelError("CustCode", CustomerObj.CustCode + " may be already exists or not in correct pattern.You can use " + newcustCode);
                                return View(CustomerObj);
                            }



                            dthash = GF1.AddItemToHashTable(ref dthash, "updateflag", "I", true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "AccName", CustomerObj.CustName, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Mobile", CustomerObj.MobNo, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress1", CustomerObj.PostalAddress1, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress2", CustomerObj.PostalAddress2, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress3", CustomerObj.PostalAddress3, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress4", CustomerObj.PostalAddress4, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "HomeTown", fc["homeTown"], true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Contactperson", CustomerObj.Contactperson, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Status", "Y");
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "acctype", 3041);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Phone", CustomerObj.Phone, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "email", CustomerObj.Email, true);
                            dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "updateflag", "I", true);


                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "fullname", CustomerObj.Contactperson, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "email", CustomerObj.Email, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "facebook", CustomerObj.Facebookid, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "twitter", CustomerObj.Twitterid, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "linkedin", CustomerObj.Linkedin, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "address1", CustomerObj.PostalAddress1, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "address2", CustomerObj.PostalAddress2, true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "HomeTown", fc["homeTown"], true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "isprimarycontact", "Y", true);
                            dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "updateflag", "I", true);

                            dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "isregistered", "Y", true);
                            dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "updateflag", "I", true);
                            if (!string.IsNullOrEmpty(CustomerObj.MobNo))
                            {
                                dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "ismobile", "Y", true);
                                dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "number", CustomerObj.MobNo, true);
                                dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "mobilephone", CustomerObj.MobNo, true);
                            }
                            else
                            {
                                dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "number", CustomerObj.Phone, true);
                                dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "mobilephone", CustomerObj.Phone, true);
                            }

                            int argp_acccode1 = -1;
                            int argP_Customers1 = CustomerObj.P_Customers;
                            int argp_crmcontacts = -1;
                            int argp_crmphone = -1;
                            resultHash = libcustomerfeature.InsertUpdateAccmasterCustomerCrmContactsCrmPhone(ref argp_acccode1, ref dtHashAccMaster, ref argP_Customers1, ref dthash, ref argp_crmcontacts, ref dthashCrmContacts, ref argp_crmphone, ref dthashCrmPhone, SessionControl.UserServerDatabase, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""));
                            CustomerObj.P_Customers = argP_Customers1;
                            P_Customers = Convert.ToInt32(resultHash["p_customers"]);
                            int P_acccode = Convert.ToInt32(resultHash["p_acccode"]);
                            if (P_Customers < 0)
                            {
                                ModelState.AddModelError(string.Empty, "An Error occured While storing your Information .Please Try again later.");
                                return View(CustomerObj);
                            }
                            else
                            {
                                if (!string.IsNullOrEmpty(CustomerObj.Phone))
                                {
                                    var argSessionInstance1 = SessionControl;
                                    var clscrmphone1 = new CRMPhone.CRMPhone.CRMPhone(ref argSessionInstance1);
                                    SessionControl = argSessionInstance1;
                                    clscrmphone1.ServerDatabase = SessionControl.UserServerDatabase; // GlobalControl.Variables.UserServerDatabase
                                    string? sqlstr11 = " and  islandline = 'Y' and  p_acccode=" + Convert.ToInt32(resultHash["p_acccode"]);
                                    var dtcrm11 = libcustomerfeature.GetCRMPhoneDatatable(sqlstr11, SessionControl.UserServerDatabase);
                                    if (dtcrm11 is not null)
                                    {
                                        if (dtcrm11.Rows.Count > 0)
                                        {
                                            clscrmphone1.PrevRow = df1.UpdateDataRows(clscrmphone1.PrevRow, dtcrm11.Rows[0]);
                                            clscrmphone1.CurrRow["updateflag"] = "U";
                                        }
                                        else
                                        {
                                            clscrmphone1.CurrRow["crmphone_key"] = -1;
                                            clscrmphone1.CurrRow["p_crmphone"] = -1;
                                            clscrmphone1.CurrRow["updateflag"] = "I";
                                        }
                                    }
                                    clscrmphone1.CurrRow["p_acccode"] = resultHash["p_acccode"];
                                    clscrmphone1.CurrRow["p_crmcontacts"] = resultHash["p_crmcontacts"];
                                    clscrmphone1.CurrRow["number"] = CustomerObj.Phone;
                                    clscrmphone1.CurrRow["islandline"] = "Y";
                                    clscrmphone1.CurrRow["iswhatsappno"] = "N";
                                    var fgobj = new object[] { clscrmphone1 };
                                    cfc1.SaveIntodb(fgobj);

                                }

                                var dtHashUserLogin = new Hashtable();
                                string userid = CustomerObj.CustCode.Trim();
                                string password = libSaralAuth.GenerateRandomPass(8);

                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "UserId", userid);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Pwd", password);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "userlogin_key", -1);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Email", CustomerObj.Email);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Address", Address);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Name", CustomerObj.CustName);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Mobile", CustomerObj.MobNo);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Linkcode", P_acccode);
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Linktype", "C");
                                dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "updateflag", "I");

                                int argid1 = Convert.ToInt32(dtHashUserLogin["userlogin_key"]);
                                int UserLogin_key = libSaralAuth.InsertUpdateUserLogin(ref argid1, ref dtHashUserLogin, SessionControl.UserServerDatabase);


                                // 'Insert multiple tags
                                string tags = fc["multiTags"];
                                if (P_Customers > 0 & !string.IsNullOrEmpty(tags?.Trim()))
                                {
                                    var hashTableList = new List<Hashtable>();
                                    var tagskeyArr = tags.Split(',');
                                    for (int p = 0, loopTo = tagskeyArr.Length - 1; p <= loopTo; p++)
                                    {
                                        var Taghash = new Hashtable();
                                        Taghash = GF1.AddItemToHashTable(ref Taghash, "linktype", "B");
                                        Taghash = GF1.AddItemToHashTable(ref Taghash, "tagkey", tagskeyArr[p]);
                                        Taghash = GF1.AddItemToHashTable(ref Taghash, "linkcode", P_Customers);
                                        Taghash = GF1.AddItemToHashTable(ref Taghash, "p_tags", -1);
                                        hashTableList.Add(Taghash);
                                    }

                                    libSaralAuth.InsertUpdateMultipleTags("-1", ref hashTableList, sessionRow, SessionControl.UserServerDatabase);
                                }

                                TempData["Message"] = "Customer is Added Successfully";
                                return RedirectToAction("ManageCustomers");
                            }
                        }
                    }
                    else
                    {
                        return View(CustomerObj);
                    }
                }
                //ViewBag.message = authorizedMsg;
                //return View(CustomerObj);
                TempData["message"] = authorizedMsg;
                if (CustomerObj.exitmode?.Trim().ToLower() =="edit")
                {
                    return RedirectToAction("CustomerForm", new { @P_customers = CustomerObj.P_Customers, @exitmode = CustomerObj.exitmode });
                }
                else
                {
                    return RedirectToAction("CustomerForm");
                }
            }
            TempData["Message"] = authenticatedMsg;
            return RedirectToAction("LogOut", "Home");
        }




        public JsonResult AjaxDeleteEmployee(int p_employees, int p_acccode)
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
                if (libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "deleteemployee", HttpContext.Session.GetString("serverdatabase")))
                {
                    DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                    if (sessionRow is null)
                        return Json("");


                    var dtHashAccMaster = new Hashtable();
                    var dtHashEmployee = new Hashtable();
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "updateflag", "D");
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Status", "N");
                    dtHashEmployee = GF1.AddItemToHashTable(ref dtHashEmployee, "updateflag", "D");
                    dtHashEmployee = GF1.AddItemToHashTable(ref dtHashEmployee, "activeyn", "N");


                    int delAcc = Convert.ToInt32(libSaralAuth.InsertUpdateInAcc_Master(ref p_acccode, ref dtHashAccMaster, sessionRow, SessionControl.UserServerDatabase));
                    int delEmp = Convert.ToInt32(libSaralAuth.InsertUpdateInEmployee(ref p_employees, ref dtHashEmployee, sessionRow, SessionControl.UserServerDatabase));

                    var dtHashUserLogin = new Hashtable();
                    var userloginRow = libSaralAuth.getUserLoginRowFromP_acccode(p_acccode, SessionControl.UserServerDatabase, "Userlogin_key");
                    if (userloginRow is not null)
                    {
                        dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "userlogin_key", userloginRow["Userlogin_key"], true);
                        dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "updateflag", "D", true);

                        int argid = Convert.ToInt32(dtHashUserLogin["userlogin_key"]);
                        int UserLogin_key = libSaralAuth.InsertUpdateUserLogin(ref argid, ref dtHashUserLogin, SessionControl.UserServerDatabase);

                        var usersettingsRow = libSaralAuth.getUserSettingsRowFromUserLogin_key(Convert.ToInt32(dtHashUserLogin["userlogin_key"]), SessionControl.UserServerDatabase, "p_usersettings");
                        if (usersettingsRow is not null)
                        {
                            var dthashUserSettings = new Hashtable();
                            dthashUserSettings = GF1.AddItemToHashTable(ref dthashUserSettings, "updateflag", "D");
                            dthashUserSettings = GF1.AddItemToHashTable(ref dthashUserSettings, "activeyn", "N");

                            int argid1 = Convert.ToInt32(usersettingsRow["p_usersettings"]);
                            int usersettings_key = Convert.ToInt32(libSaralAuth.InsertUpdateInUserSettings(ref argid1, ref dthashUserSettings, SessionControl.UserServerDatabase));

                        }
                    }

                    return Json("Success");
                }
                return Json(authorizedMsg);
            }
            TempData["Message"] = authenticatedMsg;
            return Json("");
        }


        public JsonResult AjaxDeleteCustomer(int p_customers, int p_acccode)
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
                if (libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "deletecustomer", HttpContext.Session.GetString("serverdatabase")))
                {
                    DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                    if (sessionRow is null)
                        return Json("");


                    var dtHash = new Hashtable();
                    var resultHash = new Hashtable();
                    var dtHashAccMaster = new Hashtable();
                    var dthashCrmContacts = new Hashtable();
                    var dthashCrmPhone = new Hashtable();

                    var p_crmcontacts = default(int);

                    dtHash = GF1.AddItemToHashTable(ref dtHash, "updateflag", "D");
                    dtHash = GF1.AddItemToHashTable(ref dtHash, "activeflag", "N");
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "updateflag", "D");
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "status", "N");
                    dthashCrmContacts = GF1.AddItemToHashTable(ref dthashCrmContacts, "updateflag", "D");
                    dthashCrmPhone = GF1.AddItemToHashTable(ref dthashCrmPhone, "updateflag", "D");

                    string sqlstr1 = " And  isprimarycontact='Y'  and  p_acccode=" + p_acccode;
                    var dt1 = libcustomerfeature.GetCRMContactsDatatable(sqlstr1, SessionControl.UserServerDatabase, "p_crmcontacts");
                    if (dt1.Rows.Count > 0)
                    {
                        p_crmcontacts = Convert.ToInt32(df1.GetCellValue(dt1.Rows[0], "p_crmcontacts", "integer"));
                    }

                    var p_crmphone = 0;

                    sqlstr1 = " and  isregistered = 'Y' and  p_acccode=" + p_acccode;
                    dt1 = libcustomerfeature.GetCRMPhoneDatatable(sqlstr1, SessionControl.UserServerDatabase, "p_crmphone");
                    if (dt1.Rows.Count > 0)
                    {
                        p_crmphone = Convert.ToInt32(df1.GetCellValue(dt1.Rows[0], "p_crmphone", "integer"));
                    }
                    else
                    {
                        sqlstr1 = " and  isregistered = 'Y' and  p_crmcontacts=" + p_crmcontacts;
                        dt1 = libcustomerfeature.GetCRMPhoneDatatable(sqlstr1, SessionControl.UserServerDatabase, "p_crmphone");
                        if (dt1.Rows.Count > 0)
                        {
                            p_crmphone = Convert.ToInt32(df1.GetCellValue(dt1.Rows[0], "p_crmphone", "integer"));
                        }
                    }

                    resultHash = libcustomerfeature.InsertUpdateAccmasterCustomerCrmContactsCrmPhone(ref p_acccode, ref dtHashAccMaster, ref p_customers, ref dtHash, ref p_crmcontacts, ref dthashCrmContacts, ref p_crmphone, ref dthashCrmPhone, SessionControl.UserServerDatabase, cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""));
                    p_customers = Convert.ToInt32(resultHash["p_customers"]);
                    if (p_customers > 0)
                    {
                        var dtHashUserLogin = new Hashtable();
                        var userloginRow = libSaralAuth.getUserLoginRowFromP_acccode(p_acccode, SessionControl.UserServerDatabase, "Userlogin_key");
                        if (userloginRow is not null)
                        {
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "userlogin_key", userloginRow["Userlogin_key"], true);
                            dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "updateflag", "D", true);
                            int argid = Convert.ToInt32(dtHashUserLogin["userlogin_key"]);
                            int UserLogin_key = libSaralAuth.InsertUpdateUserLogin(ref argid, ref dtHashUserLogin, SessionControl.UserServerDatabase);

                        }
                    }
                    return Json("Success");
                }
                return Json(authorizedMsg);
            }
            TempData["Message"] = authenticatedMsg;
            return Json("");
            
        }




        public JsonResult AjaxGetCustomersData(string id, int? start, int pSize = 20, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managecustomers", HttpContext.Session.GetString("serverdatabase")))
            {

                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return Json("");
                

                string? SortCondition = string.IsNullOrEmpty(order) ? "Custname asc" : order;

                //string condition = " And (updateflag<>'D' or updateflag is null) ";
                string condition = string.Empty;
                if (!string.IsNullOrEmpty(search))
                {
                    condition = condition + cfc1.GetSearchString(search); // this function convert raw search string                                     into sql string
                }

                int a = libSaralAuth.getRowsCountManageCustomers(condition, Convert.ToString(sessionRow["LinkCode"]), SessionControl.UserServerDatabase);
                //var dt = libSaralAuth.getManageCustomersDataGrid(Convert.ToInt32(start), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase, Convert.ToInt32(sessionRow["LinkCode"]), condition, SortCondition, pSize);
                var dt = libSaralAuth.getManageCustomersDataGrid(Convert.ToInt32(start), DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase, Convert.ToInt32(sessionRow["LinkCode"]), condition, SortCondition, pSize);
               
                var objdatatableToList = new DataTypeConversionLib.DTResult<CustomerMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CustomerMaster>)DCLib.ConvertDTtoModal<CustomerMaster>(dt, Convert.ToInt32(start), a, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }
        #endregion


        #region FORM MEHTODS
        // FORM GET METHOD
        public ActionResult MessageTemplateForm(string exitmode, int? id)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "messagetemplateform", HttpContext.Session.GetString("serverdatabase")))
            {
                var msgTemplateObj = new MsgTemplateMater();
                if (ModelState.IsValid)
                {
                    if (exitmode == "Edit")
                    {
                        var dtRow = libSaralAuth.GetMsgTemplateRowforP_msgtemplate(Convert.ToInt32(id), SessionControl.UserServerDatabase);
                        msgTemplateObj = DCLib.GetModelFromDataRow<MsgTemplateMater>(dtRow);
                    }
                }
                return View(msgTemplateObj);
            }
            return RedirectToAction("logOut", "Home");
        }

        // FORM POST METHOD
        [HttpPost]
        public ActionResult MessageTemplateForm(MsgTemplateMater msgTemplateObj)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "messagetemplateform", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                if (ModelState.IsValid)
                {
                    var dataRow = DCLib.GetDataRowFromModel<MsgTemplateMater>(msgTemplateObj);
                    var ChangedFieldsValuesPairHashTable = GF1.CreateHashTable(dataRow);
                    int argP_msgtemplate = msgTemplateObj.P_msgtemplate;
                    int i = libSaralAuth.InsertUpdateMsgTemplate(ref argP_msgtemplate, ref ChangedFieldsValuesPairHashTable, sessionRow, SessionControl.UserServerDatabase);
                    msgTemplateObj.P_msgtemplate = argP_msgtemplate;
                    return RedirectToAction("ManageMessageTemplates");
                }
                else
                {
                    ModelState.AddModelError(0.ToString(), "An error occured while storing your Information .Please try again later.");
                    return View(msgTemplateObj);
                }
            }
            return RedirectToAction("logOut", "Home");
        }
        #endregion
        #region Import Employees
        public JsonResult ImportEmployeesFromExcel()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageemployees", HttpContext.Session.GetString("serverdatabase")))
            {
                string filename1 = "";
                string ProjectFolderPath = "";
                if (Request.Form.Files.Count > 0)      //rituka
                {
                    var File = Request.Form.Files[0]; // Uploaded file
                    // Use the following properties to get file's name, size and MIMEType
                    if (!string.IsNullOrEmpty(File.FileName))
                    {
                        DataRow userRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                        string? userID = Convert.ToString(userRow["UserID"]);
                        ProjectFolderPath = MyServer.MapPath("GainBooksData/" + userID?.ToString()?.Trim() + "/Employees/"+ HttpContext.Session.GetString("loginname") + "/Files/");
                        if (!Directory.Exists(ProjectFolderPath))
                        {
                            Directory.CreateDirectory(ProjectFolderPath);
                        }
                        if (File is not null)
                        {
                            string Filename = File.FileName;
                            filename1 = Path.GetFileNameWithoutExtension(File.FileName);
                            string filepathName = ProjectFolderPath + Filename;
                            filename1 = cfc1.CheckAndCreateFileName(Filename, ProjectFolderPath);
                            //File.SaveAs(ProjectFolderPath + filename1); //Aslam_file_check
                            using (FileStream fs = new FileStream(ProjectFolderPath + filename1, FileMode.Create))
                            {
                                File.CopyTo(fs);
                            }
                        }
                    }
                }
                var dt = df1.GetDataFromExcel(ProjectFolderPath + filename1);
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
               

                int P_acccode;
                for (int i = 0, loopTo = dt.Rows.Count - 1; i <= loopTo; i++)
                {
                    var dtHashAccMaster = new Hashtable();
                    var dtHashUserLogin = new Hashtable();
                    var dtHashUserRoles = new Hashtable();
                    var dthash = new Hashtable();
                    string? Address = df1.GetCellValue(dt.Rows[i], "Address", "string").ToString()?.Trim();
                    string postalAddress1 = "";
                    string postalAddress2 = "";
                    string postalAddress3 = "";
                    string postalAddress4 = "";
                    if (Address?.Length < 50)
                    {
                        postalAddress1 = Address;
                    }
                    else if (Address?.Length > 50)
                    {
                        postalAddress1 = Address.Substring(0, 49);
                        postalAddress2 = Address.Substring(50, Address.Length - 1);
                    }
                    else if (Address.Length > 100)
                    {
                        postalAddress1 = Address.Substring(0, 49);
                        postalAddress2 = Address.Substring(50, 99);
                        postalAddress3 = Address.Substring(100, Address.Length - 1);
                    }
                    else if (Address.Length > 150)
                    {
                        postalAddress1 = Address.Substring(0, 49);
                        postalAddress2 = Address.Substring(50, 99);
                        postalAddress3 = Address.Substring(99, 149);
                        postalAddress3 = Address.Substring(150, Address.Length - 1);
                    }
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "P_acccode", -1, true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "AccName", df1.GetCellValue(dt.Rows[i], "EmpName", "string"), true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Mobile", df1.GetCellValue(dt.Rows[i], "MobNo", "string"), true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress1", postalAddress1, true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress2", postalAddress2, true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress3", postalAddress3, true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "PostalAddress4", postalAddress4, true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Remarks", df1.GetCellValue(dt.Rows[i], "Remarks", "string"), true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Email", df1.GetCellValue(dt.Rows[i], "Email", "string"), true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Contactperson", df1.GetCellValue(dt.Rows[i], "EmpName", "string"), true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Pincode", df1.GetCellValue(dt.Rows[i], "Pincode", "string"));
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Phone", df1.GetCellValue(dt.Rows[i], "Phone", "string"), true);
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "Status", "Y");
                    dtHashAccMaster = GF1.AddItemToHashTable(ref dtHashAccMaster, "acctype", 3042);
                    
                    int argid = Convert.ToInt32(dtHashAccMaster["p_acccode"]);
                    P_acccode = Convert.ToInt32(libSaralAuth.InsertUpdateInAcc_Master(ref argid, ref dtHashAccMaster, sessionRow, SessionControl.UserServerDatabase));
                   
                    dthash = GF1.AddItemToHashTable(ref dthash, "EmpName", df1.GetCellValue(dt.Rows[i], "EmpName", "string"), true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "FatherName", df1.GetCellValue(dt.Rows[i], "FatherName", "string"), true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "Sex", df1.GetCellValue(dt.Rows[i], "Sex", "string"), true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "DtBirth", df1.GetCellValue(dt.Rows[i], "DateOfBirth", "datetime"), true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "Mobile", df1.GetCellValue(dt.Rows[i], "MobNo", "string"), true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "PostalAddress1", postalAddress1, true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "PostalAddress2", postalAddress2, true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "PostalAddress3", postalAddress3, true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "PostalAddress4", postalAddress4, true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "status", 2696, true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "Proceedings", df1.GetCellValue(dt.Rows[i], "Remarks", "string"), true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "Email", df1.GetCellValue(dt.Rows[i], "Email", "string"), true);
                    if (df1.GetCellValue(dt.Rows[i], "DateOfJoining", "datetime") is not null)
                        dthash = GF1.AddItemToHashTable(ref dthash, "DateOfJoining", df1.GetCellValue(dt.Rows[i], "DateOfJoining", "datetime"), true);

                    dthash = GF1.AddItemToHashTable(ref dthash, "Pincode", df1.GetCellValue(dt.Rows[i], "Pincode", "string"));
                    dthash = GF1.AddItemToHashTable(ref dthash, "Phone", df1.GetCellValue(dt.Rows[i], "Phone", "string"), true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "ActiveYN", "Y");
                    dthash = GF1.AddItemToHashTable(ref dthash, "department", 2682);
                    dthash = GF1.AddItemToHashTable(ref dthash, "MaritalStatus", df1.GetCellValue(dt.Rows[i], "MaritalStatus", "string"));
                    dthash = GF1.AddItemToHashTable(ref dthash, "Under", 13, true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "p_acccode", P_acccode, true);
                    int argP_employees = -1;
                    int P_Employees = Convert.ToInt32(libSaralAuth.InsertUpdateInEmployee(ref argP_employees, ref dthash, sessionRow, SessionControl.UserServerDatabase));


                    string? userName = Convert.ToString(df1.GetCellValue(dt.Rows[i], "EmpName", "string"));
                    userName = userName?.Replace(" ", "");
                    string password = libSaralAuth.GenerateRandomPass(8);
                    string qry = "select top 1 userid from userlogin where UserId like '" + userName + "%' order by userlogin_key desc";
                    var dt1 = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, qry);
                    if (dt1.Rows.Count - 1 < 0)
                    {
                        userName = userName + "@1";
                    }
                    else
                    {
                        string? oldUserName = df1.GetCellValue(dt1.Rows[i], "UserId").ToString()?.Trim();
                        var oldUserNameArr = oldUserName.Split('@');
                        int no = Convert.ToInt32(oldUserNameArr[1]);
                        userName = userName + "@" + (no + 1);
                    }
                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "UserId", userName);
                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Pwd", password);

                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "userlogin_key", -1);
                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Email", df1.GetCellValue(dt.Rows[i], "Email", "string").ToString()?.Trim());
                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Address", Address.ToString().Trim());
                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Name", df1.GetCellValue(dt.Rows[i], "EmpName", "string").ToString()?.Trim());
                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Mobile", df1.GetCellValue(dt.Rows[i], "MobNo", "string").ToString()?.Trim());
                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Linkcode", P_acccode);
                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "ActiveYN", "Y");
                    dtHashUserLogin = GF1.AddItemToHashTable(ref dtHashUserLogin, "Linktype", "E");
                    
                    int argid1 = Convert.ToInt32(dtHashUserLogin["userlogin_key"]);
                    int UserLogin_key = libSaralAuth.InsertUpdateUserLogin(ref argid1, ref dtHashUserLogin, SessionControl.UserServerDatabase);
                    

                    string WebRoles = "";
                    string appRoles = "";
                    // NameofInfo for emplSector
                    // 2682 for service department
                    //string nameOfInfo = cfc1.GetNameOfInfoFromInfotableFromP_infotable(2682, SessionControl.UserServerDatabase, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")));
                    string nameOfInfo = cfc1.GetNameOfInfoFromInfotableFromP_infotable(2682, SessionControl.UserServerDatabase, DtInfoTable);

                    var splitByTilde = nameOfInfo.Split('~');
                    if (splitByTilde.Length == 2)
                    {
                        var splitByHash = splitByTilde[1].Split('#');
                        WebRoles = splitByHash[0];
                        appRoles = splitByHash[1];
                    }
                    dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "P_userRoles", -1);
                    dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "UserLogin_key", UserLogin_key);
                    dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "WebRoles", WebRoles.ToString().Trim());
                    dtHashUserRoles = GF1.AddItemToHashTable(ref dtHashUserRoles, "AppRoles", appRoles.ToString().Trim());
                    
                    int argP_userRoles = Convert.ToInt32(dtHashUserRoles["P_userroles"]);
                    int UserRoles_key = libSaralAuth.InsertUpdateUserRoles(ref argP_userRoles, ref dtHashUserRoles, SessionControl.UserServerDatabase);
                    
                }
                return Json("");
            }
            return Json("");
        }
        #endregion
        #region Import Customers
        public JsonResult ImportCustomersFromExcel()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managecustomers", HttpContext.Session.GetString("serverdatabase")))
            {
                string filename1 = "";
                if (Request.Form.Files.Count > 0)        //rituka
                {
                    var File = Request.Form.Files[0]; // Uploaded file
                    // Use the following properties to get file's name, size and MIMEType
                    if (!string.IsNullOrEmpty(File.FileName.Trim()))
                    {
                        DataRow userRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                        string userID = userRow["UserID"].ToString()??"";

                        string RegfolderPath = MyServer.MapPath(HttpContext.Session.GetString("corpid") + "/documents/").Replace(@"sites\gainbooks.com", "gainbooksdata");

                        // ProjectFolderPath = GlobalControl.Variables.DataFolderServerPhysicalPath & "/Employees/"
                        // Else
                        if (!Directory.Exists(RegfolderPath))
                        {
                            Directory.CreateDirectory(RegfolderPath);
                        }
                        // End If


                        if (File is not null)
                        {
                            string Filename = File.FileName;
                            filename1 = Path.GetFileNameWithoutExtension(File.FileName);
                            string filepathName = RegfolderPath + Filename;
                            filename1 = cfc1.CheckAndCreateFileName(Filename, RegfolderPath);
                            //File.SaveAs(RegfolderPath + filename1); //Aslam_file_check
                            using (FileStream fs = new FileStream(RegfolderPath + filename1, FileMode.Create))
                            {
                                File.CopyTo(fs);
                            }

                            // Dim dt As DataTable = GetDataFromExcel(RegfolderPath & filename1)
                            // WriteToFileNew(dt.Rows.Count & " after getdt")

                            Process objProcess;
                            try
                            {
                                objProcess = new Process();
                                objProcess.StartInfo.FileName = MyServer.MapPath("bin/importcustomers.exe"); // RegfolderPath & filename1
                                string argstr = Convert.ToString(RegfolderPath + filename1 + "|" +HttpContext.Session.GetString("corpid") + "|" + df1.GetCellValue(cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""), "websessions_key", "integer"));
                                objProcess.StartInfo.Arguments = "\"" + argstr + "\"";
                                objProcess.StartInfo.WindowStyle = ProcessWindowStyle.Normal;
                                objProcess.Start();

                                // Wait until the process passes back an exit code 
                                objProcess.WaitForExit();

                                // Free resources associated with this process
                                objProcess.Close();
                            }

                            catch
                            {
                                WriteToFileNew("Could not start process " + RegfolderPath + filename1);
                            }


                          
                            return Json("");
                        }
                    }
                }
            }
            return Json("");
        }

        //Aslam_comment
        /// <summary>
        /// Get data table from an excel file
        /// </summary>
        /// <param name="FullExcelFile">Full exel file name with path and extension</param>
        /// <param name="LCondition">Where Clause as string , it is case sensitive</param>
        /// <param name="Lorder">Order By Clause as string</param>
        /// <param name="PrimaryCols">Comma separated string of primary columns</param>
        /// <param name="SheetName" >SheetName of excel from which data fetched,default is first sheet</param>
        /// <returns>Data table of rows</returns>
        /// <remarks></remarks>
        //public DataTable GetDataFromExcel(string FullExcelFile, string LCondition = "", string Lorder = "", string PrimaryCols = "", string SheetName = "")
        //{
        //    // If GlobalControl.Variables.AuthenticationChecked <> dllInteger Then Return Nothing : Exit Function
        //    var Dt = new DataTable();
        //    try
        //    {
        //        //rituka
        //        string msheet1 = "Sheet1"; // IIf(SheetName.Length = 0, FirstExcelSheetName(FullExcelFile), SheetName)
        //        string? ExcelVersion = Convert.ToString(Interaction.IIf(Strings.LCase(FullExcelFile).Contains("xlsx"), "N", "O"));
        //        string? ConnectionString = Convert.ToString(Interaction.IIf(ExcelVersion == "N", "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + FullExcelFile + ";Extended Properties=Excel 12.0;", "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + FullExcelFile + ";Extended Properties=Excel 8.0; "));
        //        var ConnectionObject = new System.Data.OleDb.OleDbConnection(ConnectionString);
        //        string? QryString = Convert.ToString(Operators.ConcatenateObject("select  * from [" + msheet1 + "$]", Interaction.IIf(LCondition.Length == 0, "", " where " + LCondition)));
        //        QryString = Convert.ToString(Operators.ConcatenateObject(QryString, Interaction.IIf(Lorder.Length > 0, " order by " + Lorder, "")));
        //        // GlobalControl.Variables.ErrorString = QryString
        //        SessionControl.ErrorString = QryString;
        //        df1.SetPrimaryColumns(ref Dt, PrimaryCols);
        //        var ExcelAdapter = new System.Data.OleDb.OleDbDataAdapter(QryString, ConnectionObject);
        //        var aa = new System.Data.OleDb.OleDbCommand();
        //        ExcelAdapter.Fill(Dt);
        //        ExcelAdapter.Dispose();
        //        ConnectionObject.Close();
        //        ConnectionObject.Dispose();
        //    }

        //    catch (Exception ex)
        //    {
        //        WriteToFileNew(ex.Message + " getdatafromexcel");
        //        Console.WriteLine(ex.Message + "  " + Information.Err().Description);
        //    }
        //    return Dt;
        //}

        private void WriteToFileNew(string text)
        {
            string path1 = @"C:\inetpub\GainBooksData\TEST7974\documents\myfilelog.txt";
            using (var writer = new StreamWriter(path1, true))
            {
                writer.WriteLine(text);
                writer.Close();
            }
        }
      

        /// <summary>
        /// This method refresh Session("infotableuser") when user make changes in infotableuser from ConfigDashboard
        /// </summary>
        public void RefreshInfotableUserInSession()
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) > 0)
            {
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                var argSessionInstance = SessionControl;
                var ClsInfoTable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
                SessionControl = argSessionInstance;
                string Lcondition = " rowstatus=0 And (updateflag<>'D' or updateflag is null)";      //rituka
                DataTable DtInfoTableUser = df1.GetDataFromSql(HttpContext.Session.GetString("serverdatabase"), "InfoTableUser", "*", "", Lcondition, "", "InfoType,NameOfInfo", ClsInfoTable.PrimaryKey);
                HttpContext.Session.SetString("infotableuser", JsonConvert.SerializeObject(DtInfoTableUser));
            }
            
        }

        /// <summary>
        /// Add customer to customer group
        /// </summary>
        /// <returns></returns>
        public JsonResult AjaxAddCustomertoGroup(string p_acccode, int p_infotable)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");
            
            
            string msg = string.Empty;
            int a = 0;
            var dtTagsHash = new Hashtable();
            dtTagsHash = GF1.AddItemToHashTable(ref dtTagsHash, "linktype", "R", true);
            dtTagsHash = GF1.AddItemToHashTable(ref dtTagsHash, "tagkey", p_infotable, true);
            var pacccodeArr = p_acccode.Trim().Split(',');
            for (int i = 0, loopTo = pacccodeArr.Length - 1; i <= loopTo; i++)
            {
                dtTagsHash = GF1.AddItemToHashTable(ref dtTagsHash, "linkcode", pacccodeArr[i], true);
                bool duplicate = libSaralAuth.CheckDuplicateForTagsTable("R", p_infotable, Convert.ToInt32(pacccodeArr[i]), SessionControl.UserServerDatabase);
                if (!duplicate)
                {
                    int argP_tags = -1;
                    libSaralAuth.InsertUpdateTags(ref argP_tags, ref dtTagsHash, sessionRow, SessionControl.UserServerDatabase);
                }

            }

            return Json("True");
        }

        #endregion


        #region ShopControl
        [HttpGet]
        public ActionResult ShopDetail()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
               return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ShopControl", HttpContext.Session.GetString("serverdatabase")))
            {
                //var dt = saleOrderLib.getShopControlDatatable(DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                var dt = saleOrderLib.getShopControlDatatable(DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);

                var shopControlObj = new ShopControlModel();
                if (dt.Rows.Count > 0)
                {
                    ViewBag.ViewType = "show";
                    var dtRow = dt.Rows[0];
                    shopControlObj = DCLib.GetModelFromDataRow<ShopControlModel>(dtRow);
                }
                else
                {
                    ViewBag.viewType = "add";
                    if (shopControlObj.fyenddate.ToString("yyyy-MM-dd") == "0001-01-01")
                    {
                        shopControlObj.fyenddate = Convert.ToDateTime(df1.GetDateTimeISTNow().ToString("yyyy-MM-dd"));
                    }
                    if (shopControlObj.fystartdate.ToString("yyyy-MM-dd") == "0001-01-01")
                    {
                        shopControlObj.fystartdate = Convert.ToDateTime(df1.GetDateTimeISTNow().ToString("yyyy-MM-dd"));
                    }
                    if (shopControlObj.startdatetime.ToString("yyyy-MM-dd") == "0001-01-01")
                    {
                        shopControlObj.startdatetime = Convert.ToDateTime(df1.GetDateTimeISTNow().ToString("yyyy-MM-dd"));
                    }
                    if (shopControlObj.nextdatetime.ToString("yyyy-MM-dd") == "0001-01-01")
                    {
                        shopControlObj.nextdatetime = Convert.ToDateTime(df1.GetDateTimeISTNow().ToString("yyyy-MM-dd"));
                    }
                   
                }
                return View(shopControlObj);
            }
            return RedirectToAction("LogOut", "Home");
        }


        [HttpPost]
        [ValidateAntiForgeryToken()]
        public ActionResult ShopDetail(ShopControlModel shopControlObj)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "ShopControl", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
               
                if (ModelState.IsValid)
                {
                    DataRow? dtr = null;
                    dtr = DCLib.GetDataRowFromModel<ShopControlModel>(shopControlObj);

                    var dthash = new Hashtable();
                    dthash = GF1.CreateHashTable(dtr);

                    int a = 0;
                    if (shopControlObj.p_shopcontrol > 0)
                    {
                        dthash = GF1.AddItemToHashTable(ref dthash, "mtimestamp", df1.GetDateTimeISTNow());
                        int argp_shopcontrol = shopControlObj.p_shopcontrol;
                        a = saleOrderLib.InsertUpdateShopControl(ref argp_shopcontrol, ref dthash, sessionRow, SessionControl.UserServerDatabase);
                        shopControlObj.p_shopcontrol = argp_shopcontrol;
                        return RedirectToAction("ShopDetail");
                    }
                    else
                    {
                        // 'Insert
                        dthash = GF1.AddItemToHashTable(ref dthash, "corpid", HttpContext.Session.GetString("corpid"));
                        dthash = GF1.AddItemToHashTable(ref dthash, "mtimestamp", df1.GetDateTimeISTNow());
                        
                        int argp_shopcontrol1 = -1;
                        a = saleOrderLib.InsertUpdateShopControl(ref argp_shopcontrol1, ref dthash, sessionRow, SessionControl.UserServerDatabase);
                        return RedirectToAction("ShopDetail");
                    }
                }
                else
                {
                    return View(shopControlObj);
                }
            }
            return RedirectToAction("LogOut", "Home");
        }
        #endregion


        /// <summary>
        /// Generate Public URL for Register Service Request, Order
        /// </summary>
        /// <param name="corpid"></param>
        /// <param name="urlType"></param>
        /// <returns></returns>
        public JsonResult GeneratePublicURL(string corpid,string urlType)
        {
            // 'Check session
            if (HttpContext.Session.GetString("userloginrow") is null | HttpContext.Session.GetString("saralloginrow") is null)
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string PublicUrl = string.Empty;
            string ActionName = string.Empty;

            // CorpId~URLType
            //string queryStr = corpid.Trim().ToUpper() + "~" + urlType.Trim().ToUpper();
            string queryStr = corpid.Trim().ToUpper();

            if (string.Equals(urlType, "servicerequest", StringComparison.OrdinalIgnoreCase))
            {
                queryStr += "~" + urlType.Trim().ToUpper();
                ActionName = "RegisterServiceRequest";
            }

            if (string.Equals(urlType, "createorder",StringComparison.OrdinalIgnoreCase))
            {
                ActionName = "OrderForm";
            }
            

            string encStr = vm1.EncryptData(queryStr);
            encStr = System.Net.WebUtility.UrlEncode(encStr);
            PublicUrl = string.Format("{0}://{1}/PublicUrl/{2}?encStr={3}", HttpContext.Request.Scheme, HttpContext.Request.Host,ActionName, encStr);
            return Json(PublicUrl);
        }


        /// <summary>
        /// Add multiple Tags on Multiple customers (for customers linktype is 'B')
        /// </summary>
        /// <param name="p_customers"></param>
        /// <param name="tagkeys"></param>
        /// <returns></returns>
        public JsonResult AjaxAddMultipleTags(string p_customers, string tagkeys)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managecustomers", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return Json("");


                var hashTableList = new List<Hashtable>();
                string lcondition = " rowstatus=0 and linktype='B' and tagkey in (" + tagkeys + ") and linkcode in (" + p_customers + ")";
                var dtTags = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "tags", lcondition, "p_tags,tagkey,linkcode");

                var  p_customersArr = p_customers.Split(',');
                var tagkeysArr = tagkeys.Split(',');

                for (int i = 0, loopTo = p_customersArr.Length - 1; i <= loopTo; i++)
                {
                    for (int j = 0, loopTo1 = tagkeysArr.Length - 1; j <= loopTo1; j++)
                    {
                        var dtRow = dtTags.Select("tagkey=" + tagkeysArr[j] + " and linkcode=" + p_customersArr[i]).FirstOrDefault();
                        if (dtRow is null)
                        {
                            var Taghash = new Hashtable();
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "linktype", "B");
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "tagkey", tagkeysArr[j]);
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "linkcode", p_customersArr[i]);
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

        public JsonResult AjaxDeleteMsgTemplate(int p_msgTemplate)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managemessagetemplate", HttpContext.Session.GetString("serverdatabase")))
            {

                int a = libSaralAuth.DeleteMsgTemplate(p_msgTemplate, SessionControl.UserServerDatabase);
                if (a>0)
                {
                    return Json("Success");
                }
                return Json("something went wrong. Please try again later.");

            }
            return Json("");
        }


        /// <summary>
        /// ManageCompositeField (Add,Edit)
        /// </summary>
        /// <returns></returns>
        public ActionResult ManageCompositeFields()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managecompositefield", HttpContext.Session.GetString("serverdatabase"))) 
            {
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }


        public JsonResult GetCompositeString(int p_viewsettings)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managecompositefield", HttpContext.Session.GetString("serverdatabase")))  
            {
                string lcondition = " rowstatus=0 and p_viewsettings =" + p_viewsettings ;
                DataRow dr = libSaralAuth.GetViewSettingsRowforLcondition(lcondition, SessionControl.UserServerDatabase);
                if (dr is not null)
                {
                    return Json(df1.GetCellValue(dr,"infostring","string"));
                }
                return Json("");
            }
            return Json("logout");
        }


        public JsonResult SaveCompositeString(int p_viewsettings,string compositeString)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managecompositefield", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                var dtHash = new Hashtable();
                dtHash = GF1.AddItemToHashTable(ref dtHash, "mtimestamp", df1.GetDateTimeISTNow());
                dtHash = GF1.AddItemToHashTable(ref dtHash, "Websessions_key", Convert.ToInt32(sessionRow["websessions_key"]));
                dtHash = GF1.AddItemToHashTable(ref dtHash, "p_viewsettings", p_viewsettings);
                dtHash = GF1.AddItemToHashTable(ref dtHash, "updateflag","U");
                dtHash = GF1.AddItemToHashTable(ref dtHash, "infostring", compositeString);

                int insertUpdateDone = libSaralAuth.InsertUpdateViewSettings(ref p_viewsettings, ref dtHash, SessionControl.UserServerDatabase);

                string msg = "";
                if (insertUpdateDone > 0)
                {
                    
                    return Json("success");
                }
                return Json("error");
            }
            return Json("logout");
        }
    }
}
