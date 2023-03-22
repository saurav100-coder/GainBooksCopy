using CRMApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CRMApp.Controllers
{
    public class MessageTemplateController : Controller
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

        #region SHOW TEMPLATE LIST ON VIEW

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
                return View();

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
                objdatatableToList = (DataTypeConversionLib.DTResult<MsgTemplateMater>)DCLib.ConvertDTtoModal<MsgTemplateMater>(dt, Convert.ToInt32(start), a, dt.Rows.Count);
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
            var dt = libSaralAuth.GetVariableList(SessionControl.UserServerDatabase);
            var DataList = DCLib.ConvertDataTable<VariableMaster>(dt);
            return Json(DataList);
        }
        #endregion



        #region FORM MEHTODS
        // FORM GET METHOD
        public ActionResult MessageTemplateForm(string exitmode, int? id)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
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
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "messagetemplateform", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (ModelState.IsValid)
                {
                    var dataRow = DCLib.GetDataRowFromModel<MsgTemplateMater>(msgTemplateObj);
                    var ChangedFieldsValuesPairHashTable = gf1.CreateHashTable(dataRow);
                    int argP_msgtemplate = msgTemplateObj.P_msgtemplate;
                    int i = libSaralAuth.InsertUpdateMsgTemplate(ref argP_msgtemplate, ref ChangedFieldsValuesPairHashTable, sessionRow, SessionControl.UserServerDatabase);
                    msgTemplateObj.P_msgtemplate = argP_msgtemplate;
                    return RedirectToAction("ManageMessageTemplates");
                }
                else
                {
                    ModelState.AddModelError("0", "An error occured while storing your Information .Please try again later.");
                    return View(msgTemplateObj);
                }
            }
            return RedirectToAction("logOut", "Home");
        }

        #endregion



    }
}
