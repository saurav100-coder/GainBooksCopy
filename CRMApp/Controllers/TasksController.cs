using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using CRMApp.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CRMApp.Controllers
{
    public class TasksController : Controller
    {
        #region Objects of dll

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

        //private DataTable DtInfoTable;
        //private CRMTasksMaster ObjCRMTasksMaster = new CRMTasksMaster();
        //private GoggleApiFunction.Class1 gflib = new GoggleApiFunction.Class1();
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
            GF1.SessionControl = sessionControl;
            df1.SessionControl = sessionControl;
            cfc1.SessionControl = sessionControl;
            DCLib.SessionControl = sessionControl;
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

        #endregion
        #region Tasks

        public JsonResult MultipleTaskClose(string TaskKeys)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "taskclose", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int SuccessInt = 0;
                int HasSubtaskInt = 0;
                string? TaskIds = "";
                string lcondition = "and crmtasks_key in(" + TaskKeys + ")";
                var dt = libCRMTasks.getCRMTasksDataUsingCondition(lcondition, SessionControl.UserServerDatabase, "crmTasks_key, p_crmtasks");

                var TaskKeyArr = TaskKeys.Trim().Split(',');
                for (int i = 0, loopTo = TaskKeyArr.Length - 1; i <= loopTo; i++)
                {
                    string success = libCRMTasks.TaskClose(Convert.ToInt32(TaskKeyArr[i]), sessionRow, SessionControl.UserServerDatabase, true);
                    if (success.ToLower() == "true")
                    {
                        SuccessInt = SuccessInt + 1;
                    }
                    else if (success.ToLower() == "hassubtask")
                    {
                        int p_crmtasks = Convert.ToInt32(dt.Select("crmtasks_key=" + TaskKeyArr[i]).FirstOrDefault()?["p_crmtasks"]);      //rituka
                        TaskIds =Convert.ToString(string.IsNullOrEmpty(TaskIds)? p_crmtasks : TaskIds + "," + p_crmtasks);
                        HasSubtaskInt = HasSubtaskInt + 1;
                    }
                }
                string msg = "";
                string msgType = "";
                if (HasSubtaskInt == 0 & SuccessInt > 0)
                {
                    msg = "All Tasks have closed successfully.";
                    msgType = "success";
                }
                else if (HasSubtaskInt > 0 & SuccessInt == 0)
                {
                    msg = "Please close subtasks for Task ids - " + TaskIds;
                    msgType = "error";
                }
                else if (HasSubtaskInt > 0 & SuccessInt > 0)
                {
                    msg = "Some Tasks have closed successfully. Some Tasks (ids - " + TaskIds + ") have subtasks so please close subtask first.";
                    msgType = "error";
                }
                return Json(new[] { msg, msgType });
            }
            return Json("");
        }

        public JsonResult TaskClose(int? id, string calledfrom)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "taskclose", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                string success = libCRMTasks.TaskClose(Convert.ToInt32(id), sessionRow, SessionControl.UserServerDatabase, true);
                if (success.ToLower() == "true")
                {
                    return Json("true");
                }
                else if (success.ToLower() == "false")
                {
                    return Json("false");
                }
                else
                {
                    return Json("HasSubTask");
                }
            }
            return Json("");
        }

        public JsonResult AddTasksRemark()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addtaskremark", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                string filename1 = "";
                string RegfolderPath = "";
            
                if (Request.Form.Files.Count > 0)
                {
                    var File = Request.Form.Files[0]; // Uploaded file          //rituka
                    // Use the following properties to get file's name, size and MIMEType
                    if (!string.IsNullOrEmpty(File.FileName))
                    {
                        DataRow userRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                        string userID = Convert.ToString(userRow["UserID"]) ?? "";

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
                            //File.SaveAs(RegfolderPath + filename1); //Aslam_File_check_done
                            using (FileStream fs = new FileStream(RegfolderPath + filename1, FileMode.Create))
                            {
                                File.CopyTo(fs);
                            }
                        }
                        TempData["link"] = "~/GainBooksData/" + HttpContext.Session.GetString("corpid") + "/documents/" + filename1;
                    }
                }

                int taskId = Convert.ToInt32(Request.Form["taskId"]);
                string linktype = "T";
                if (taskId == 0)
                    linktype = "G";

                var dtcomm = libCRMTasks.CreateCRMCommunicationDt(Request.Form["remark"], linktype, taskId, 2739);
                int p_crmcomm = libCRMTasks.AddRowInCRMcommunication(dtcomm, sessionRow, SessionControl.UserServerDatabase);
                var crmDocumentsLink = libCRMTasks.CreateCRMDocumentLinkDt(p_crmcomm, "T", filename1, "/GainBooksData/"+ HttpContext.Session.GetString("corpid")+ "/documents/"+ filename1, "");
                int p_crmdocumentsLink = Convert.ToInt32(libCRMTasks.ADDRowInCrmDocumentsLink(crmDocumentsLink, sessionRow, SessionControl.UserServerDatabase));
                return Json("");
            }
            return Json("");
    
        }

        /// <summary>
        /// subtasks json data for under 
        /// </summary>
        /// <param name="under"></param>
        /// <returns></returns>
        public JsonResult AjaxPendingSubTasks(int under)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

                //var dt = libCRMTasks.GetPendingSubTasksUsingUnder(under, Loginkey, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                var dt = libCRMTasks.GetPendingSubTasksUsingUnder(under, Loginkey, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList) ;
            }
            return Json("");
        }



        /// <summary>
        /// Return Tasks list for taskstatus in (infotype=75)
        /// </summary>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <param name="ServerOrderValue"></param>
        /// <returns></returns>
        public JsonResult AjaxPendingTasks(int? start, int pSize = 50, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

                DataRow? UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");

                string condition = string.Empty;
                if (!string.IsNullOrEmpty(search))
                    condition = cfc1.GetSearchString(search); 
                

                // 'Added by aslam
                if (condition.Trim().ToLower().Contains("taskstatus") == false)
                {
                    //DataTable dtInfotableUser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
                    if (DtInfoTableuser.Rows.Count > 0)
                    {
                        var drTaskStatus = DtInfoTableuser.Select("infotype=75").FirstOrDefault();
                        if (!(drTaskStatus is null))
                            condition = condition + " and Taskstatus in (" + df1.GetCellValue(drTaskStatus, "nameofinfo").ToString()?.Trim() + ")";
                        
                    }
                }

                //int a = libCRMTasks.getPendingTasksCountofanEmp(Loginkey, SessionControl.UserServerDatabase, condition);
                Boolean hardcoded = false;
                if (SessionControl.corpid.Trim().ToLower() == "neha8591" && (UserLoginRow["userid"].ToString()?.Trim().ToLower() == "bika0001" | UserLoginRow["userid"].ToString()?.Trim().ToLower() == "abhi0003"))
                    hardcoded = true;

                if (string.IsNullOrWhiteSpace(order))
                    order = "lastactiontime desc";

                int a = libCRMTasks.getPendingTasksCountofanEmp(Loginkey, SessionControl.UserServerDatabase, condition,hardcoded);
                //var dt = libCRMTasks.GetPendingTasksDataForGrid(Loginkey, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), start, SessionControl.UserServerDatabase, pSize, condition, order,hardcoded);
                var dt = libCRMTasks.GetPendingTasksDataForGrid(Loginkey, DtInfoTable, DtInfoTableuser, start, SessionControl.UserServerDatabase, pSize, condition, order, hardcoded);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, Convert.ToInt32(start), a, dt.Rows.Count);
                return Json(objdatatableToList);     
            }
            return Json("");
        }


        /// <summary>
        /// Retrun All Task list 
        /// </summary>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <param name="ServerOrderValue"></param>
        /// <returns></returns>
        public JsonResult AjaxAllTasks(int? start, int pSize = 50, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

                DataRow? UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");

                string condition = string.Empty;
                if (!string.IsNullOrEmpty(search))
                    condition = cfc1.GetSearchString(search);


                ////int a = libCRMTasks.getPendingTasksCountofanEmp(Loginkey, SessionControl.UserServerDatabase, condition);
                ////var dt = libCRMTasks.GetPendingTasksDataForGrid(Loginkey, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), start, SessionControl.UserServerDatabase, pSize, condition, order);

                Boolean hardcoded = false;
                if (SessionControl.corpid.Trim().ToLower() == "neha8591" && (UserLoginRow["userid"].ToString()?.Trim().ToLower() == "bika0001" | UserLoginRow["userid"].ToString()?.Trim().ToLower() == "abhi0003"))
                    hardcoded = true;

                if (string.IsNullOrWhiteSpace(order))
                    order = "lastactiontime desc";

                int a = libCRMTasks.getPendingTasksCountofanEmp(Loginkey, SessionControl.UserServerDatabase, condition,hardcoded);
                //var dt = libCRMTasks.GetPendingTasksDataForGrid(Loginkey, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), start, SessionControl.UserServerDatabase, pSize, condition, order,hardcoded);
                var dt = libCRMTasks.GetPendingTasksDataForGrid(Loginkey, DtInfoTable, DtInfoTableuser, start, SessionControl.UserServerDatabase, pSize, condition, order, hardcoded);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, Convert.ToInt32(start), a, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        public JsonResult AjaxTaskFileData(int? id, int? start, int pSize = 20, string direction = "F", string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TaskFileView", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                var Loginkey = default(int);
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

                string condition = string.Empty;
                if (!string.IsNullOrEmpty(search))
                    condition = cfc1.GetSearchString(search);

                var dt = libCRMTasks.GetTasksFileDataForGrid(Loginkey, SessionControl.UserServerDatabase, condition);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        public JsonResult FilterPendingTask(string filterText)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                if (HttpContext.Session.GetString("websessionrow") is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

                //var dt = libCRMTasks.GetFilterPendingTasksDataForGrid(Loginkey, filterText, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                var dt = libCRMTasks.GetFilterPendingTasksDataForGrid(Loginkey, filterText, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        public JsonResult AjaxCompletedTasks(int? id, int? start, int pSize = 20, string direction = "F", string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CompletedTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;

                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

                //var dt = libCRMTasks.GetCompletedTasksDataForGrid(Loginkey, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                var dt = libCRMTasks.GetCompletedTasksDataForGrid(Loginkey, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        public JsonResult AddTaskCollaborators(int Taskid, int Taskkey, int collaboratorId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addtaskcollaborators", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

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
                        bool isSubCollab = libCRMTasks.IsCollaborator("T", Convert.ToInt16(P_crmtasks[i]), collaboratorId.ToString(), SessionControl.UserServerDatabase);
                        if (!isSubCollab)
                        {
                            var dtCRMSubtaskCollaborator = libCRMTasks.CreateCollaboratersDt("T", Convert.ToInt16(P_crmtasks[i]).ToString(), collaboratorId, "E");
                            int s = libCRMTasks.AddCollaboratorToATask(dtCRMSubtaskCollaborator, sessionRow, SessionControl.UserServerDatabase);
                        }
                    }
                }
                if (k <= 0)
                {
                    ModelState.AddModelError(0.ToString(), "An error occured while storing your Information .Please try again later.");
                    return Json("false");
                }

                string? TaskTitle = "Not available";
                string? TaskDescription = "Not available";
                var DtTasksRow = libCRMTasks.getTasksRowforCrmTasks_key(Taskkey, SessionControl.UserServerDatabase);
                TaskTitle = Convert.ToString(df1.GetCellValue(DtTasksRow, "TaskTitle"));
                TaskDescription = Convert.ToString(df1.GetCellValue(DtTasksRow, "TaskDescription"));
                string Message = "You are added as collaborator by " + Convert.ToString(HttpContext.Session.GetString("loginname")) + "on Task id=" + Taskid + "<br>Task Title: " + TaskTitle + "<br>Task Description:" + TaskDescription;
                var dtempRow = libSaralAuth.getAccMasterRowForp_acccode(collaboratorId, SessionControl.UserServerDatabase);
                string? empmail = Convert.ToString(dtempRow["email"]);
                Message = Message + Convert.ToChar(201) + "Notification From Saral";
                var dtmsg = cfc1.CreateMsgQueueDt("E", Message, "", empmail, "", "N");

                return Json("true");
            }
            return Json("");
        }

        /// <summary>
        /// View for Pending tasks
        /// </summary>
        /// <returns></returns>
        public ActionResult ManagePendingTasks()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                ViewBag.under = df1.GetCellValue(LoginRow, "linkcode", "integer");

                var dtEmp = libSaralAuth.GetActiveEmployeesUnderManager(SessionControl.UserServerDatabase, Convert.ToInt32(df1.GetCellValue(LoginRow, "linkcode", "integer")), "p_acccode,accname");

                if (dtEmp is not null  && dtEmp.Rows.Count > 0)
                {
                    ViewBag.Message = "Start Date~2~date|Due Date~3~date|TaskId~4~integer|Title~5~string|Task Description~6~string|Status~7~integer|AssignedTo~8~integer|CreatedBy~9~integer|MyTasks~10~string|TeamTasks~11~integer|Tags~12~integer|Priority~13~integer";
                }
                else
                {
                    ViewBag.Message = "Start Date~2~date|Due Date~3~date|TaskId~4~integer|Title~5~string|Task Description~6~string|Status~7~integer|AssignedTo~8~integer|CreatedBy~9~integer|MyTasks~10~string|Tags~12~integer|Priority~13~integer";
                }
                string? searchcondition = "infotype='searchstring' and viewid='managependingtask' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(df1.GetCellValue(LoginRow, "Userlogin_key", "integer")) + "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='managependingtask' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string Infostring =df1.GetCellValue(searchdr, "infostring", "string").ToString() ?? "";
                var infoStringArr = Infostring.Split('@');

                if (dtEmp is not null && dtEmp.Rows.Count > 0)
                {
                    infoStringArr[0] += "|12~TeamTask~2$DROPDOWN#accmaster#AccName#P_acccode#Status='Y' and rowstatus=0 and acctype = 3042# #Select Employee~integer~teamemptasks";
                }

                ViewBag.filterString = infoStringArr[0];
                string? sortcondition = "infotype='sortstring' and viewid='managependingtask' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(df1.GetCellValue(LoginRow, "Userlogin_key", "integer")) + "";
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr is null)
                {
                    sortcondition = "infotype='sortstring' and viewid='managependingtask' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");


                //Check showalltasks right
                ViewBag.showAllTasks = "N";
                if (libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "showalltasks", HttpContext.Session.GetString("serverdatabase")))
                {
                    ViewBag.showAllTasks = "Y";
                }

                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }


        /// <summary>
        /// View for All Task
        /// </summary>
        /// <returns></returns>
        public ActionResult ManageAllTasks()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CompletedTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                ViewBag.under = df1.GetCellValue(LoginRow, "linkcode", "integer");

                var dtEmp = libSaralAuth.GetActiveEmployeesUnderManager(SessionControl.UserServerDatabase, Convert.ToInt32(df1.GetCellValue(LoginRow, "linkcode", "integer")), "p_acccode,accname");

                if (dtEmp is not null  && dtEmp.Rows.Count > 0)
                {
                    ViewBag.Message = "Start Date~2~date|Due Date~3~date|TaskId~4~integer|Title~5~string|Task Description~6~string|Status~7~integer|AssignedTo~8~integer|CreatedBy~9~integer|MyTasks~10~string|TeamTasks~11~integer|Tags~12~integer";
                }
                else
                {
                    ViewBag.Message = "Start Date~2~date|Due Date~3~date|TaskId~4~integer|Title~5~string|Task Description~6~string|Status~7~integer|AssignedTo~8~integer|CreatedBy~9~integer|MyTasks~10~string|Tags~12~integer";
                }
                string? searchcondition = "infotype='searchstring' and viewid='managependingtask' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(df1.GetCellValue(LoginRow, "Userlogin_key", "integer")) + "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='managependingtask' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string Infostring = df1.GetCellValue(searchdr, "infostring", "string").ToString() ?? "";
                var infoStringArr = Infostring.Split('@');

                if (dtEmp is not null && dtEmp.Rows.Count > 0)
                {
                    infoStringArr[0] += "|12~TeamTask~2$DROPDOWN#accmaster#AccName#P_acccode#Status='Y' and rowstatus=0 and acctype = 3042# #Select Employee~integer~teamemptasks";
                }

                ViewBag.filterString = infoStringArr[0];
                string? sortcondition = "infotype='sortstring' and viewid='managependingtask' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(df1.GetCellValue(LoginRow, "Userlogin_key", "integer"))+ "";
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr is null)
                {
                    sortcondition = "infotype='sortstring' and viewid='managependingtask' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");


                //Check showalltasks right
                ViewBag.showAllTasks = "N";
                if (libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "showalltasks", HttpContext.Session.GetString("serverdatabase")))
                {
                    ViewBag.showAllTasks = "Y";
                }


                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        public ActionResult ManageCompletedTasks()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CompletedTasks", HttpContext.Session.GetString("serverdatabase")))
                return View();
            
            return RedirectToAction("LogOut", "Home");
        }

        public ActionResult ManageTasksComm()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TasksComm", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow LoginRow= cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                ViewBag.Message = "Date~2~date|Title~3~string|Task Description~5~string|Status~6~integer|ProgressNotesBy~7~integer|TaskId~8~integer|Tags~9~integer";

                string searchcondition = "infotype='searchstring' and viewid='manageTaskComm' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='manageTaskComm' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string Infostring =df1.GetCellValue(searchdr, "infostring", "string").ToString() ?? "";
                var infoStringArr = Infostring.Split('@');
                ViewBag.filterString = infoStringArr[0];
                string sortcondition = "infotype='sortstring' and viewid='manageTaskComm' and  rowstatus=0 and Userlogin_key="+ Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr is null)
                {
                    sortcondition = "infotype='sortstring' and viewid='manageTaskComm' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");

                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }


        public ActionResult CRMSubTasksForm(string exitmode, int? PCRMTasks)
        {
            //Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "createsubtask", HttpContext.Session.GetString("serverdatabase")))
            {

                var mainTaskRow = libCRMTasks.getTasksRowforP_CrmTasks(Convert.ToInt32(PCRMTasks), SessionControl.UserServerDatabase, "TaskTitle");
                ViewBag.TaskTitle = df1.GetCellValue(mainTaskRow, "TaskTitle", "string");
                ViewBag.Taskid = Convert.ToInt32(PCRMTasks);

                var TasksObj = new CRMTasksMaster();
                if (ModelState.IsValid)
                    TasksObj.Under = Convert.ToInt32(PCRMTasks);
                
                ViewBag.CalledFrom = exitmode.ToLower();
                return View(TasksObj);
            }
            return RedirectToAction("LogOut", "Home");
        }

        [HttpPost()]
        public ActionResult CRMSubTasksForm(IFormCollection fc, CRMTasksMaster objCRMTasks)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "createsubtask", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                if (ModelState.IsValid)
                {
                    int TaskCloseStatus = int.Parse(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(77, SessionControl.UserServerDatabase).ToString().Trim());
                    int TaskInitialStatus = int.Parse(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(76, SessionControl.UserServerDatabase).ToString().Trim());
                    if (objCRMTasks.Taskstatus == TaskCloseStatus) // 3009 Then
                    {
                        bool HasSubtask = libCRMTasks.DoesTaskHasSubTask(objCRMTasks.P_CRMTasks, SessionControl.UserServerDatabase);
                        if (HasSubtask == true)
                        {
                            ModelState.AddModelError("0", "To close this task first close all subtasks of this task.");
                            return View(objCRMTasks);
                        }
                    }
                 
                    //var argSessionInstance = SessionControl;
                    //var ClsCRMTasks = new CRMTasks.CRMTasks.CRMTasks(ref argSessionInstance);
                    //SessionControl = argSessionInstance;
                    //var dthash = DCLib.ConvertFCToHashTable(fc, ClsCRMTasks);

                    DataRow? dtr = null;
                    dtr = DCLib.GetDataRowFromModel<CRMTasksMaster>(objCRMTasks);
                    var dthash = new Hashtable();
                    dthash = GF1.CreateHashTable(dtr);


                    dthash = GF1.AddItemToHashTable(ref dthash, "TaskType", "M");
                    dthash = GF1.AddItemToHashTable(ref dthash, "LinkType", "T", true);
                    if (objCRMTasks.Taskstatus == 0)
                    {
                        dthash = GF1.AddItemToHashTable(ref dthash, "Taskstatus", TaskInitialStatus, true);
                    }
                    else if (objCRMTasks.Taskstatus == TaskCloseStatus) // 3009 Then
                    {
                        dthash = GF1.AddItemToHashTable(ref dthash, "CloseDate", df1.GetDateTimeISTNow(), true);
                    }
                    if (objCRMTasks.Assignedto == 0)
                    {
                        dthash = GF1.AddItemToHashTable(ref dthash, "Assignedto", sessionRow["linkcode"], true);
                        dthash = GF1.AddItemToHashTable(ref dthash, "assigntodate", df1.GetDateTimeISTNow(), true);
                        dthash = GF1.AddItemToHashTable(ref dthash, "Assignedtotype", "E", true);
                    }

                    if (objCRMTasks.Assignedto != 0)
                        dthash = GF1.AddItemToHashTable(ref dthash, "assigntodate", df1.GetDateTimeISTNow(), true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "nextactiondate", new DateTime(1900, 1, 1), true);


                    int argid = objCRMTasks.P_CRMTasks;
                    int P_CRMTasks = libCRMTasks.InsertUpdateCRMTasks(ref argid, ref dthash, SessionControl.UserServerDatabase, sessionRow, cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? ""));
                    if (P_CRMTasks > 0)
                        libCRMTasks.SendNotificationsForTaskAssignment(P_CRMTasks, Convert.ToString(HttpContext.Session.GetString("loginname")), SessionControl.UserServerDatabase, sessionRow);
                    

                    // 'Insert multiple tags
                    string tags = fc["frmTags"];
                    if (P_CRMTasks > 0 & !string.IsNullOrEmpty(tags?.Trim()))
                    {
                        var hashTableList = new List<Hashtable>();
                        var tagskeyArr = tags.Split(',');
                        for (int p = 0, loopTo = tagskeyArr.Length - 1; p <= loopTo; p++)
                        {
                            var Taghash = new Hashtable();
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "linktype", "T");
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "tagkey", tagskeyArr[p]);
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "linkcode", P_CRMTasks);
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "p_tags", -1);
                            hashTableList.Add(Taghash);
                        }

                        libSaralAuth.InsertUpdateMultipleTags("-1", ref hashTableList, sessionRow, SessionControl.UserServerDatabase);
                    }

                    HttpContext.Session.Remove("exitmode");
                    HttpContext.Session.Remove("clscrmtasks");
                    HttpContext.Session.Remove("id");
                    return RedirectToAction("ManagePendingTasks");
                }
                else
                {
                    ModelState.AddModelError(0.ToString(), "An error occured while storing your Information .Please try again later.");
                    return View(objCRMTasks);
                }
                //return View(objCRMTasks);
            }
            return RedirectToAction("LogOut", "Home");
        }

        public ActionResult CRMTasksForm(string exitmode, int? id)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CreateTask", HttpContext.Session.GetString("serverdatabase")))
            {
                var TasksObj = new CRMTasksMaster();
                if (ModelState.IsValid)
                {
                    // Fill AccountsForm object according to a Account Record
                    if (exitmode == "Edit" | exitmode == "Delete")
                    {
                        TasksObj.CRMTasks_Key = Convert.ToInt32(id);

                        var dtRow = libCRMTasks.getTasksRowforCrmTasks_key(Convert.ToInt32(id), SessionControl.UserServerDatabase);

                        TasksObj = DCLib.GetModelFromDataRow<CRMTasksMaster>(dtRow);
                        if (dtRow["DueDate"] is DBNull == false)
                        {
                            DateTime a = Convert.ToDateTime(dtRow["DueDate"]);
                            TasksObj.FrmtDueDate = a.ToString("yyyy-MM-dd");
                        }
                        if (dtRow["StartDate"] is DBNull == false)
                        {
                            DateTime a = Convert.ToDateTime(dtRow["StartDate"]);
                            TasksObj.FrmtStartDate = a.ToString("yyyy-MM-dd");
                        }
                    }
                }
                ViewBag.CalledFrom = exitmode?.ToLower() ;
                return View(TasksObj);
            }
            return RedirectToAction("LogOut", "Home");
        }

        [HttpPost]
        public ActionResult CRMTasksForm(IFormCollection fc, CRMTasksMaster objCRMTasks)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "createtask", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                if (ModelState.IsValid)
                {
                     int TaskCloseStatus = int.Parse(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(77, SessionControl.UserServerDatabase).ToString().Trim());
                    int TaskInitialStatus = int.Parse(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(76, SessionControl.UserServerDatabase).ToString().Trim());
                    if (objCRMTasks.Taskstatus == TaskCloseStatus) // 3009 Then
                    {
                        bool HasSubtask = libCRMTasks.DoesTaskHasSubTask(objCRMTasks.P_CRMTasks, SessionControl.UserServerDatabase);
                        if (HasSubtask == true)
                        {
                            ModelState.AddModelError("0", "To close this task first close all subtasks of this task.");
                            return View(objCRMTasks);
                        }
                    }
                    //var argSessionInstance = SessionControl;
                    //var ClsCRMTasks = new CRMTasks.CRMTasks.CRMTasks(ref argSessionInstance);
                    //SessionControl = argSessionInstance;
                    //var dthash = DCLib.ConvertFCToHashTable(fc, ClsCRMTasks);

                    DataRow? dtr = null;
                    dtr = DCLib.GetDataRowFromModel<CRMTasksMaster>(objCRMTasks);
                    var dthash = new Hashtable();
                    dthash = GF1.CreateHashTable(dtr);

                    dthash = GF1.AddItemToHashTable(ref dthash, "TaskType", "M");
                    dthash = GF1.AddItemToHashTable(ref dthash, "LinkType", "T", true);
                    if (objCRMTasks.Taskstatus == 0)
                    {
                        dthash = GF1.AddItemToHashTable(ref dthash, "Taskstatus", TaskInitialStatus, true);
                    }
                    else if (objCRMTasks.Taskstatus == TaskCloseStatus) // 3009 Then
                    {
                        dthash = GF1.AddItemToHashTable(ref dthash, "CloseDate", df1.GetDateTimeISTNow(), true);
                    }
                    if (objCRMTasks.Assignedto == 0)
                    {
                        dthash = GF1.AddItemToHashTable(ref dthash, "Assignedto", sessionRow["linkcode"], true);
                        dthash = GF1.AddItemToHashTable(ref dthash, "assigntodate", df1.GetDateTimeISTNow(), true);
                        dthash = GF1.AddItemToHashTable(ref dthash, "Assignedtotype", "E", true);
                    }
                    if (objCRMTasks.Assignedto != 0)
                        dthash = GF1.AddItemToHashTable(ref dthash, "assigntodate", df1.GetDateTimeISTNow(), true);
                    dthash = GF1.AddItemToHashTable(ref dthash, "nextactiondate", new DateTime (1900,1,1), true);


                    var attendee = new[] { "info@saralerp.com" };
                    int argid = objCRMTasks.P_CRMTasks;
                    int P_CRMTasks = libCRMTasks.InsertUpdateCRMTasks(ref argid, ref dthash, SessionControl.UserServerDatabase, sessionRow, cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? ""));     //rituka
                    if (P_CRMTasks > 0)
                        libCRMTasks.SendNotificationsForTaskAssignment(P_CRMTasks, Convert.ToString(HttpContext.Session.GetString("loginname")), SessionControl.UserServerDatabase, sessionRow);
                    
                    HttpContext.Session.Remove("exitmode");


                    // 'Insert multiple tags
                    string tags = fc["multiTags"];
                    if (P_CRMTasks > 0 & !string.IsNullOrEmpty(tags?.Trim()))
                    {
                        var hashTableList = new List<Hashtable>();
                        var tagskeyArr = tags.Split(',');
                        for (int p = 0, loopTo = tagskeyArr.Length - 1; p <= loopTo; p++)
                        {
                            var Taghash = new Hashtable();
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "linktype", "T");
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "tagkey", tagskeyArr[p]);
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "linkcode", P_CRMTasks);
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "p_tags", -1);
                            hashTableList.Add(Taghash);
                        }

                        libSaralAuth.InsertUpdateMultipleTags("-1", ref hashTableList, sessionRow, SessionControl.UserServerDatabase);
                    }

                    return RedirectToAction("ManagePendingTasks");
                }
                else
                {
                    ModelState.AddModelError(0.ToString(), "An error occured while storing your Information .Please try again later.");
                    return View(objCRMTasks);
                }
            }
            return RedirectToAction("LogOut", "Home");
        }

        public JsonResult AddTasksRemarkData(int taskId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "taskremarkdata", HttpContext.Session.GetString("serverdatabase")))
            {
                var dt = libCRMTasks.GetRemarkDataOfATask(taskId, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, 0);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        public JsonResult ajaxManageTasksComm(int? id, int? start, int pSize = 20, string direction = "F", string search = "", string order = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TasksComm", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

                DataRow? UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");

                string condition = string.Empty;
                if (!string.IsNullOrEmpty(search))
                    condition = cfc1.GetSearchString(search);

                //int a = libCRMTasks.GetRowsCountTasksCommDataForGrid_New(Loginkey, SessionControl.UserServerDatabase, condition);
                //var dt = libCRMTasks.GetTasksCommDataForGrid_New(Loginkey, start, SessionControl.UserServerDatabase, pSize, condition, order);

                Boolean hardcoded = false;
                if (SessionControl.corpid.Trim().ToLower() == "neha8591" && (UserLoginRow["userid"].ToString()?.Trim().ToLower() == "bika0001" | UserLoginRow["userid"].ToString()?.Trim().ToLower() == "abhi0003"))
                    hardcoded = true;

                int a = libCRMTasks.GetRowsCountTasksCommDataForGrid_New(Loginkey, SessionControl.UserServerDatabase, condition,hardcoded);
                var dt = libCRMTasks.GetTasksCommDataForGrid_New(Loginkey, start, SessionControl.UserServerDatabase, pSize, condition, order,hardcoded);
                var dataTableData = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                dataTableData = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, Convert.ToInt32(start), a, dt.Rows.Count);
                return Json(dataTableData);
            }
            return Json("");
        }


        public JsonResult ajaxLatestTasksComm(string FilterText)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            int Loginkey =0;
            if (sessionRow is not null)
                Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
            
            DataTable dt = (DataTable)libCRMTasks.GetLatestTasksCommDataForGrid(Loginkey, SessionControl.UserServerDatabase);
            var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
            objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
            return Json(objdatatableToList);
        }

        public JsonResult ajaxTodaysTasksComm(string filterText)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            int Loginkey = 0;
            if (sessionRow is not null)
                Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
            
            DataTable dt = (DataTable)libCRMTasks.GetTodaysTasksCommDataForGrid(Loginkey, SessionControl.UserServerDatabase);
            var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
            objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
            return Json(objdatatableToList);
        }


        public JsonResult AddCollaboratorsData(int? TaskId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "taskcollaboratordata", HttpContext.Session.GetString("serverdatabase")))
            {
                var dt = libCRMTasks.GetCollaboratorsOfATask(Convert.ToInt32(TaskId), SessionControl.UserServerDatabase);
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
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "deletetaskcollaborator", HttpContext.Session.GetString("serverdatabase")))
            {
                int result = libCRMTasks.deleteCollaborator(Convert.ToInt32(id), SessionControl.UserServerDatabase);
                if (result > 0)
                    return Json("Success");
                
            }
            return Json("");
        }
        #endregion
        #region Team Tasks
        [HttpGet()]
        public ActionResult TeamTasksLog()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Log", HttpContext.Session.GetString("serverdatabase")))           
                return View();
            
            return RedirectToAction("LogOut", "Home");
        }

        public JsonResult AjaxTeamTasks()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                
                //var dt = libCRMTasks.GetTeamTasksDataForGrid(Loginkey, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                var dt = libCRMTasks.GetTeamTasksDataForGrid(Loginkey, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }


        [HttpPost()]
        public JsonResult dateSearchInTaskComm(string fromDate, string toDate, int emp, string calledBy)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TasksComm", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                
                if (string.IsNullOrEmpty(fromDate))
                {
                    fromDate = df1.GetDateTimeISTNow().ToString("yyyy-MM-dd 00:00:00");
                }
                else
                {
                    fromDate = fromDate + " 00:00:00";
                }
                if (string.IsNullOrEmpty(toDate))
                {
                    toDate = df1.GetDateTimeISTNow().ToString("yyyy-MM-dd 23:59:59");
                }
                else
                {
                    toDate = toDate + " 23:59:59";
                }
                DataTable dt = (DataTable)libCRMTasks.GetTasksCommByDateForGrid(Loginkey, fromDate, toDate, emp, calledBy, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        [HttpPost()]
        public JsonResult RemarkBySearchInTaskComm(int? empId)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            int Loginkey =0;
            if (sessionRow is not null)
            {
                Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
            }
            else
            {
                return Json("");
            }

            
            if (empId == 0 | empId is null)
                empId = Loginkey;

            DataTable dt = (DataTable)libCRMTasks.GetTasksCommByRemarkByForGrid(Loginkey, Convert.ToInt32(empId), SessionControl.UserServerDatabase);
            var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
            objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
            return Json(objdatatableToList);
        }

        [HttpPost()]
        public JsonResult TeamRemarkBySearchInTaskComm(int? empId, string calledBy)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TasksComm", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

                if (empId == 0 | empId is null)
                    empId = Loginkey;

                //var dt = libCRMTasks.GetTeamTasksCommByRemarkByForGrid(Loginkey, Convert.ToInt32(empId), calledBy, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), SessionControl.UserServerDatabase);
                var dt = libCRMTasks.GetTeamTasksCommByRemarkByForGrid(Loginkey, Convert.ToInt32(empId), calledBy, DtInfoTable, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        public JsonResult FilterTeamTaskComm(string filterText)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TasksComm", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                
                var dt = libCRMTasks.GetTeamTasksCommDataForGrid(Loginkey, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }


        public ActionResult TodaysTeamTasksComm()
        {
            if (HttpContext.Session.GetString("websessionrow") is null)
            {
                return RedirectToAction("LogOut", "Home");
            }
            return View();
        }

        public ActionResult LatestTeamTasksComm()
        {
            if (HttpContext.Session.GetString("websessionrow") is null)
            {
                return RedirectToAction("LogOut", "Home");
            }
            return View();
        }

        public ActionResult TeamTasksComm()
        {
            if (HttpContext.Session.GetString("websessionrow") is null)
            {
                return RedirectToAction("LogOut", "Home");
            }
            return View();
        }

        public JsonResult ajaxTeamTasksComm(int? id, int? start, int pSize = 20, string direction = "F", string search = "", string order = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetString("userloginkey_saralweb")));
            DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            int Loginkey =0;
            if (sessionRow is not null)
            {
                Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
            }
            else
            {
                return Json("");
            }

            var dt = libCRMTasks.GetTeamTasksCommDataForGrid(Loginkey, SessionControl.UserServerDatabase);
            var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
            objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
            return Json(objdatatableToList);
        }

        public JsonResult ajaxLatestTeamTasksComm(int? id, int? start, int pSize = 20, string direction = "F", string search = "", string order = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetString("userloginkey_saralweb")));
            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""); ;
            int Loginkey =0;
            if (sessionRow  is not null)
            {
                Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
            }
            else
            {
                return Json("");
            }
            
            var dt = libCRMTasks.GetLatestTeamTasksCommDataForGrid(Loginkey, SessionControl.UserServerDatabase);
            var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
            objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
            return Json(objdatatableToList);
        }

        public JsonResult ajaxTodaysTeamTasksComm(int? id, int? start, int pSize = 20, string direction = "F", string search = "", string order = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetString("userloginkey_saralweb")));
            DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            int Loginkey = 0;
            if (sessionRow is not null)
            {
                Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
            }
            else
            {
                return Json("");
            }
            
            var dt = libCRMTasks.GetTodaysTeamTasksCommDataForGrid(Loginkey, SessionControl.UserServerDatabase);
            var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
            objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
            return Json(objdatatableToList);
        }

        [HttpPost]
        public ActionResult SendCompTeamTasks(IFormCollection fc)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Log", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""); 
                int Loginkey =0 ;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                
                string Subject = "";
                DateTime creationdateFrom;
                DateTime creationdateTo;
                if (!string.IsNullOrEmpty(fc["FromDate"]))
                {
                    creationdateFrom = Convert.ToDateTime(fc["FromDate"]);
                }
                else
                {
                    creationdateFrom = df1.GetDateTimeISTNow();
                }
                if (!string.IsNullOrEmpty(fc["ToDate"]))
                {
                    creationdateTo = Convert.ToDateTime(fc["ToDate"]);
                }
                else
                {
                    creationdateTo = df1.GetDateTimeISTNow();
                }
                if (creationdateFrom > creationdateTo)
                {
                    TempData["Message"] = "Please set correct Date Range.";
                    return RedirectToAction("TeamTasksLog");
                }
                else if (creationdateFrom == creationdateTo)
                {
                    Subject = "Daily_Report: " + creationdateFrom.ToString("dd-MM-yyyy");
                }
                else
                {
                    Subject = "Daily_Report: " + creationdateFrom.ToString("dd-MM-yyyy") + " - " + creationdateTo.ToString("dd-MM-yyyy");
                }
                int empId = Convert.ToInt32(fc["EmployeeId"]);
                string EmailidText = MyServer.MapPath("App_Data/EmailList.Txt");         //rituka
                string functionname = "SendCompTasks";
                string type = "production";
                var regCalls = new RegCalls();
                string emailIds = libCalls.EmailidFromTxtFile(EmailidText, functionname, type);
                TempData["Message"] = "Emails has been sent to:" + emailIds;
                return RedirectToAction("TeamTasksLog");
            }
            return RedirectToAction("LogOut", "Home");
        }

        [HttpPost()]
        public JsonResult TeamCompletedTasksBy(int? empId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");
            
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CompletedTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                
                if (empId == 0 | empId is null)
                    empId = Loginkey;

                //var dt = libCRMTasks.GetTeamCompletedTasksByDataForGrid(Loginkey, Convert.ToInt32(empId), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                var dt = libCRMTasks.GetTeamCompletedTasksByDataForGrid(Loginkey, Convert.ToInt32(empId), DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        public JsonResult EmployeeFile(int? empId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TaskFileView", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""); 
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);

                if (empId == 0 | empId is null)
                    empId = Loginkey;

                var dt = libCRMTasks.GetTeamTasksFileDataForGrid(Loginkey, Convert.ToInt32(empId), SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<CRMTasksMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<CRMTasksMaster>)DCLib.ConvertDTtoModal<CRMTasksMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }
        [HttpGet]
        public ActionResult TaskFileView()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                RedirectToAction("LogOut", "Home");
            
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "TaskFileView", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                string? searchcondition = "infotype='searchstring' and viewid='taskfileview' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(df1.GetCellValue(LoginRow, "Userlogin_key", "integer")) + "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='taskfileview' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string Infostring = df1.GetCellValue(searchdr, "infostring", "string").ToString() ?? "";
                var infoStringArr = Infostring.Split('@');
                ViewBag.filterString = infoStringArr[0];

                return View();

            }    
            
            return RedirectToAction("LogOut", "Home");
        }

        #endregion


        public JsonResult CreatePublicUrlForTask(int P_CrmTasks)
        {
            // 'Check session
            if (HttpContext.Session.GetString("userloginrow") is null | HttpContext.Session.GetString("saralloginrow") is null)
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string PublicTaskUrl = string.Empty;
            DataRow UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            DataRow SaralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");

            // CorpId~Userid~P_CrmTasks
            string queryStr =SaralLoginRow["userid"].ToString()?.Trim().ToUpper() + "~" + UserLoginRow["userid"].ToString()?.Trim().ToUpper() + "~" + P_CrmTasks;
            string encStr = vm1.EncryptData(queryStr);
            encStr = System.Net.WebUtility.UrlEncode(encStr); //Aslam_urlencode_check_done //Url.Encode(encStr);       //rituka
            // Dim finalEncStr As String = libSaralAuth.handleAuthForbrckets(encStr)
            //if (HttpContext.Request.Host.ToString().ToLower().Contains("localhost"))
            //{
            //    PublicTaskUrl = string.Format("{0}://{1}:{2}/PublicUrl/Task?encStr={3}", HttpContext.Request.Scheme, HttpContext.Request.Host, HttpContext.Request.Host.Port, encStr);
            //}
            //else
            //{
            //    PublicTaskUrl = string.Format("{0}://{1}/PublicUrl/Task?encStr={2}", HttpContext.Request.Scheme, HttpContext.Request.Host, encStr);
            //}
            PublicTaskUrl = string.Format("{0}://{1}/PublicUrl/Task?encStr={2}", HttpContext.Request.Scheme, HttpContext.Request.Host, encStr);
            return Json(PublicTaskUrl);
        }

        /// <summary>
        /// Json Function for Edit Task
        /// </summary>
        /// <param name="fc"></param>
        /// <param name="objCRMTasks"></param>
        /// <returns></returns>
        public JsonResult EditTask(IFormCollection fc, CRMTasksMaster objCRMTasks)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");
            
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "createtask", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""); 

                if (ModelState.IsValid)
                {
                    int TaskCloseStatus = int.Parse(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(77, SessionControl.UserServerDatabase).ToString().Trim());
                    int TaskInitialStatus = int.Parse(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(76, SessionControl.UserServerDatabase).ToString().Trim());
                    if (objCRMTasks.Taskstatus == TaskCloseStatus) // 3009 Then
                    {
                        bool HasSubtask = libCRMTasks.DoesTaskHasSubTask(objCRMTasks.P_CRMTasks, SessionControl.UserServerDatabase);
                        if (HasSubtask == true)
                            return Json("err-close");
                        
                    }
                    var argSessionInstance = SessionControl;
                    var ClsCRMTasks = new CRMTasks.CRMTasks.CRMTasks(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    var dthash = DCLib.ConvertIFCToHashTable(fc, ClsCRMTasks);

                    //DataRow? dtr = null;
                    //dtr = DCLib.GetDataRowFromModel<CRMTasksMaster>(objCRMTasks);
                    //var dthash = new Hashtable();
                    //dthash = GF1.CreateHashTable(dtr);

                    dthash = GF1.AddItemToHashTable(ref dthash, "TaskType", "M");
                    if (objCRMTasks.Taskstatus == 0)
                    {
                        dthash = GF1.AddItemToHashTable(ref dthash, "Taskstatus", TaskInitialStatus, true);
                    }
                    else if (objCRMTasks.Taskstatus == TaskCloseStatus) // 3009 Then
                    {
                        dthash = GF1.AddItemToHashTable(ref dthash, "CloseDate", df1.GetDateTimeISTNow(), true);
                    }
                    if (objCRMTasks.Assignedto == 0)
                    {
                        dthash = GF1.AddItemToHashTable(ref dthash, "Assignedto", sessionRow["linkcode"], true);
                        dthash = GF1.AddItemToHashTable(ref dthash, "Assignedtotype", "E", true);
                    }

                    var attendee = new[] { "info@saralerp.com" };
                    int argid = objCRMTasks.P_CRMTasks;
                    int P_CRMTasks = libCRMTasks.InsertUpdateCRMTasks(ref argid, ref dthash, SessionControl.UserServerDatabase, sessionRow, cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? ""));
                    if (P_CRMTasks > 0)
                        libCRMTasks.SendNotificationsForTaskAssignment(P_CRMTasks, HttpContext.Session.GetString("loginname"), SessionControl.UserServerDatabase, sessionRow);
                    

                    return Json("success");
                }

                else
                {
                    return Json("err-try");
                }
            }
            return Json("");

        }

        public ActionResult TaskDetail(int Taskid)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                ViewBag.Taskid = Convert.ToInt32(Taskid);
                ViewBag.Webview = "N";
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }




        /// <summary>
        /// Action result for webview in Mobile APP
        /// </summary>
        /// <param name="Taskid"></param>
        /// <param name="authkey"></param>
        /// <param name="userlogin_key"></param>
        /// <param name="websessions_key"></param>
        /// <param name="userloginkey_saralweb"></param>
        /// <returns></returns>
        public ActionResult TaskDetails(int Taskid, string authkey, int userlogin_key, int websessions_key, int userloginkey_saralweb)
        {
            HttpContext.Session.SetString("serverdatabase", "0_srv_0.1_mdf_1");      //rituka
            HttpContext.Session.SetString("authkey", authkey);
            SetSessionControl(userlogin_key);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                RedirectToAction("LogOut", "Home");

            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                ViewBag.Taskid = Convert.ToInt32(Taskid);
                ViewBag.Webview = "Y";
                var argSessionInstance = SessionControl;
                var clswebsessions = new WebSessions.WebSessions.WebSessions(ref argSessionInstance);
                SessionControl = argSessionInstance;
                clswebsessions.ServerDatabase = SessionControl.UserServerDatabase;
                object argClsObject = clswebsessions;
                string argSearchFieldName = "";
                var sessionrow = df1.SeekRecordTableClass(ref argClsObject, websessions_key, SearchFieldName: ref argSearchFieldName);
                clswebsessions = (WebSessions.WebSessions.WebSessions)argClsObject;
                //HttpContext.Session.GetString("websessionrow") = sessionrow;
                HttpContext.Session.SetString("websessionrow", cfc1.DataRowToCSV(sessionrow));

                var dtuserlogin = libSaralAuth.getUserLoginRowFromUserLoginKey(userloginkey_saralweb, SessionControl.MainServerDatabase);
                HttpContext.Session.SetString("saralloginrow", cfc1.DataRowToCSV(dtuserlogin)); //Session["SaralLoginRow"] = dtuserlogin;
                //Session["corpid"] = Strings.Trim(Conversions.ToString(df1.GetCellValue(dtuserlogin, "userid", "string")));
                HttpContext.Session.SetString("corpid", df1.GetCellValue(dtuserlogin, "userid", "string").ToString()?.Trim() ?? "");

                // Dim dtuserlogin1 As DataRow = libSaralAuth.getUserLoginRowFromUserLoginKey(userlogin_key, GlobalControl.Variables.UserServerDatabase)
                var dtuserlogin1 = libSaralAuth.getUserLoginRowFromUserLoginKey(userlogin_key, SessionControl.UserServerDatabase);
                //Session["UserLoginRow"] = dtuserlogin1;
                HttpContext.Session.SetString("userloginrow", cfc1.DataRowToCSV(dtuserlogin1));

                DataRow? mAccMaster = null;
                // mAccMaster = df1.getRowFromP_value(GlobalControl.Variables.UserServerDatabase, "accmaster", "*", "P_acccode", dtuserlogin1.Item("linkcode"))
                mAccMaster = df1.getRowFromP_value(SessionControl.UserServerDatabase, "accmaster", "*", "P_acccode", Convert.ToInt32(dtuserlogin1["linkcode"]));
                HttpContext.Session.SetString("accmasterrow", cfc1.DataRowToCSV(mAccMaster)); //Session["AccMasterRow"] = mAccMaster;
                //Session["LoginName"] = mAccMaster["accname"].ToString().Trim();
                 HttpContext.Session.SetString("loginname", mAccMaster["accname"].ToString()?.Trim() ?? "");

                return View("TaskDetail");
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Get Task detail by Taskid
        /// </summary>
        /// <param name="Taskid"></param>
        /// <returns></returns>
        public JsonResult AjaxTaskDetail(int Taskid)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey =0 ;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                
                //// Dim dtCrmTasks As DataTable = libCRMTasks.getTaskDetail(Taskid, Session("InfoTable"), Session("infotableuser"), GlobalControl.Variables.UserServerDatabase)
                //var dtCrmTasks = libCRMTasks.getTaskDetail(Taskid, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                var dtCrmTasks = libCRMTasks.getTaskDetail(Taskid,DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                return Json(JsonConvert.SerializeObject(dtCrmTasks));
            }
            return Json("");
        }


        public JsonResult DownloadRemarkFile(string filename, string filepath)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

                string contentType = string.Empty;
            filename = filename.ToLower();
            if (filename.Contains(".pdf"))
            {
                contentType = "application/pdf";
            }
            else if (filename.Contains(".docx"))
            {
                contentType = "application/docx";
            }
            else if (filename.Contains(".txt"))
            {
                contentType = "application/txt";
            }
            else if (filename.Contains(".jpg") | filename.Contains(".jpeg"))
            {
                contentType = "application/jpg";
            }
            else if (filename.Contains(".png"))
            {
                contentType = "application/jpg";
            }
            else if (filename.Contains(".csv") | filename.Contains(".xls") | filename.Contains(".xlsx"))
            {
                contentType = "application/xls";
            }
            else
            {
                contentType = "application/octet-stream";
            }

            string FullFilepath = @"C:\inetpub" + filepath.Replace("/", @"\");
            if (System.IO.File.Exists(FullFilepath))
            {
                return Json(new { FullFilepath, contentType, filename });
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
        /// Retrun json data of Tasg for a Task
        /// </summary>
        /// <param name="TaskId"></param>
        /// <returns></returns>
        public JsonResult ShowTagsData(int TaskId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                //var dt = libCRMTasks.GetTagsOfATask(TaskId, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                var dt = libCRMTasks.GetTagsOfATask(TaskId, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<TagsMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<TagsMaster>)DCLib.ConvertDTtoModal<TagsMaster>(dt, recordsTotal: dt.Rows.Count);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        /// <summary>
        /// Add tag for a task in tags table
        /// </summary>
        /// <param name="Taskid"></param>
        /// <param name="p_infotable"></param>
        /// <returns></returns>
        public JsonResult AjaxAddTaskTags(int Taskid, int p_infotable)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                if (sessionRow is null)
                    return Json("");
                
                var dtTagsHash = new Hashtable();
                dtTagsHash = GF1.AddItemToHashTable(ref dtTagsHash, "linktype", "T", true);
                dtTagsHash = GF1.AddItemToHashTable(ref dtTagsHash, "tagkey", p_infotable, true);
                dtTagsHash = GF1.AddItemToHashTable(ref dtTagsHash, "linkcode", Taskid, true);
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
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                int result = libCRMTasks.deleteTag(p_tags, SessionControl.UserServerDatabase);
                if (result > 0)
                    return Json("Success");
                
            }
            return Json("");
        }

        /// <summary>
        /// Export pending task in excelsheet
        /// </summary>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public JsonResult AjaxExportPendingTasks(string search = "", string order = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""); 
                int Loginkey =0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                
                string condition = string.Empty;
                if (!string.IsNullOrEmpty(search))
                    condition = cfc1.GetSearchString(search);
                
                if (condition.Trim().ToLower().Contains("taskstatus") == false)
                {
                    //DataTable dtInfotableUser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
                    if (DtInfoTableuser.Rows.Count > 0)
                    {
                        var drTaskStatus = DtInfoTableuser.Select("infotype=75").FirstOrDefault();
                        if (!(drTaskStatus is null))
                            condition = condition + " and Taskstatus in (" + df1.GetCellValue(drTaskStatus, "nameofinfo") + ")";
                        
                    }
                }

                int a = libCRMTasks.getPendingTasksCountofanEmp(Loginkey, SessionControl.UserServerDatabase, condition);
                //var dt = libCRMTasks.GetPendingTasksDataForGrid(Loginkey, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), 0, SessionControl.UserServerDatabase, a, condition, order);
                var dt = libCRMTasks.GetPendingTasksDataForGrid(Loginkey, DtInfoTable, DtInfoTableuser, 0, SessionControl.UserServerDatabase, a, condition, order);
                if (dt.Rows.Count > 0)
                {
                    string columnsStr = "Taskstatus,DueDate,StartDate,Assignedto,CreatedBY,Under,HasSubtasks";
                    dt = RemoveDataTablecolumns(ref dt, columnsStr);

                    dt.Columns["TextTaskStatus"].ColumnName = "Task Status";
                    dt.Columns["FrmtStartDate"].ColumnName = "Start Date";
                    dt.Columns["FrmtDueDate"].ColumnName = "Due Date";
                    dt.Columns["TextAssignedto"].ColumnName = "Assigned To";
                    dt.Columns["TextCreatedBy"].ColumnName = "Created By";
                    dt.Columns["P_CRMTasks"].ColumnName = "Task Id";


                    string filePath = MyServer.MapPath("App_Data/");          //rituka
                    string fileName = "PendingTasks_" + df1.GetDateTimeISTNow().ToString("ddMM_HHmmss") + ".xlsx";
                    // df1.CreateExcelFromDataTable(dt, filePath & fileName)
                    cfc1.ExportDataToExcel(dt, filePath + fileName);
                    return Json(fileName);
                }
                else
                {
                    return Json("0");
                }
            }
            return Json("");
        }



        /// <summary>
        /// Export all Tasks in excelsheet
        /// </summary>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public JsonResult AjaxExportAllTasks(string search = "", string order = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "PendingTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""); 
                int Loginkey = 0;
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                
                string condition = string.Empty;
                if (!string.IsNullOrEmpty(search))
                    condition = cfc1.GetSearchString(search);

                int a = libCRMTasks.getPendingTasksCountofanEmp(Loginkey, SessionControl.UserServerDatabase, condition);
                //var dt = libCRMTasks.GetPendingTasksDataForGrid(Loginkey, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), 0, SessionControl.UserServerDatabase, a, condition, order);
                var dt = libCRMTasks.GetPendingTasksDataForGrid(Loginkey, DtInfoTable,DtInfoTableuser, 0, SessionControl.UserServerDatabase, a, condition, order);
                if (dt.Rows.Count > 0)
                {
                    string columnsStr = "Taskstatus,DueDate,StartDate,Assignedto,CreatedBY,Under,HasSubtasks";
                    dt = RemoveDataTablecolumns(ref dt, columnsStr);

                    dt.Columns["TextTaskStatus"].ColumnName = "Task Status";
                    dt.Columns["FrmtStartDate"].ColumnName = "Start Date";
                    dt.Columns["FrmtDueDate"].ColumnName = "Due Date";
                    dt.Columns["TextAssignedto"].ColumnName = "Assigned To";
                    dt.Columns["TextCreatedBy"].ColumnName = "Created By";
                    dt.Columns["P_CRMTasks"].ColumnName = "Task Id";


                    string filePath = MyServer.MapPath("App_Data/");
                    string fileName = "AllTasks_" + df1.GetDateTimeISTNow().ToString("ddMM_HHmmss") + ".xlsx";
                    cfc1.ExportDataToExcel(dt, filePath + fileName);
                    return Json(fileName);
                }
                else
                {
                    return Json("0");
                }
            }
            return Json("");
        }


        public JsonResult AjaxExportCompletedTasks()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CompletedTasks", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? ""); 
                int Loginkey = 0;
                if (HttpContext.Session.GetString("websessionrow") is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                
                //var dt = libCRMTasks.GetCompletedTasksDataForGrid(Loginkey, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                var dt = libCRMTasks.GetCompletedTasksDataForGrid(Loginkey, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                if (dt.Rows.Count > 0)
                {
                    string columnsStr = "logintype,logincode,rowstatus,tasktype,taskstatus,linktype,linkcode,nextactiondate,startdate,createdby,assignedto,createdbyType,assignedtoType,mtimestamp,websessions_key,";
                    columnsStr = columnsStr + "under,autotaskconfiglink,assigntoDate,compositefield,tasktemplateid,assignedext,closedate,duedate";
                    dt = RemoveDataTablecolumns(ref dt, columnsStr);

                    dt.Columns["texttaskstatus"].ColumnName = "Task Status";
                    dt.Columns["FrmtStartDate"].ColumnName = "Start Date";
                    dt.Columns["FrmtDueDate"].ColumnName = "Due Date";
                    dt.Columns["P_CRMTasks"].ColumnName = "Task Id";


                    string filePath = MyServer.MapPath("App_Data/");
                    string fileName = "CompletedTasks_" + df1.GetDateTimeISTNow().ToString("ddMM_HHmmss") + ".xlsx";
                    df1.CreateExcelFromDataTable(ref dt, filePath + fileName);
                    return Json(fileName);
                }
                else
                {
                    return Json("0");
                }
            }
            return Json("");
        }

        public ActionResult downloadTaskExcel(string filename)
        {
            //Response.Clear();
            //Response.Headers.Add("Content-Disposition", "attachment;filename=" + filename);     //rituka
            //Response.ContentType = "application/xls";
            ////Response.WriteFile(Server.MapPath("~/App_Data/") + filename);
            ////Response.Flush();
            ////if (System.IO.File.Exists(MyServer.MapPath("App_Data/") + filename))
            ////{
            ////    System.IO.File.Delete(MyServer.MapPath("App_Data/") + filename);
            ////}
            ////Response.End();
            //return default;

            string filePath = MyServer.MapPath(@"App_Data\" + filename);
            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, "application/xls", filename);
        }


        public DataTable RemoveDataTablecolumns(ref DataTable Dt, string columns)
        {
            if (Dt.Rows.Count > 0)
            {
                var cols = columns.Split(',');
                for (int i = 0, loopTo = cols.Length - 1; i <= loopTo; i++)
                {
                    if (Dt.Columns.Contains(cols[i]))
                        Dt.Columns.Remove(cols[i]);
                    
                }
            }
            return Dt;
        }


        /// <summary>
        /// retrun Task Activity details
        /// </summary>
        /// <param name="taskId"></param>
        /// <returns></returns>
        public JsonResult GetTaskActivityLog(int taskId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "taskremarkdata", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow? userloginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");

                var dt = libCRMTasks.GetTaskActivityData(taskId, Convert.ToInt32(df1.GetCellValue(userloginRow, "linkcode", "integer")), SessionControl.UserServerDatabase);

                var objdatatableToList = new DataTypeConversionLib.DTResult<TaskActivityMaster>();
                objdatatableToList = (DataTypeConversionLib.DTResult<TaskActivityMaster>)DCLib.ConvertDTtoModal<TaskActivityMaster>(dt, 1, dt.Rows.Count, 0);
                return Json(objdatatableToList);
            }
            return Json("");
        }

        /// <summary>
        /// Add multiple Tags on Task
        /// </summary>
        /// <param name="Taskids"></param>
        /// <param name="tagkeys"></param>
        /// <returns></returns>
        public JsonResult AjaxAddMultipleTags(string Taskids, string tagkeys)
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
                string lcondition = " rowstatus=0 and linktype='T' and tagkey in (" + tagkeys + ") and linkcode in (" + Taskids + ")";
                var dtTags = libSaralAuth.GetDataFromTableUsingCondition(SessionControl.UserServerDatabase, "tags", lcondition, "p_tags,tagkey,linkcode");

                var TaskidsArr = Taskids.Split(',');
                var tagkeysArr = tagkeys.Split(',');

                for (int i = 0, loopTo = TaskidsArr.Length - 1; i <= loopTo; i++)
                {
                    for (int j = 0, loopTo1 = tagkeysArr.Length - 1; j <= loopTo1; j++)
                    {
                        var dtRow = dtTags.Select("tagkey=" + tagkeysArr[j] + " and linkcode=" + TaskidsArr[i]).FirstOrDefault();
                        if (dtRow is null)
                        {
                            var Taghash = new Hashtable();
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "linktype", "T");
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "tagkey", tagkeysArr[j]);
                            Taghash = GF1.AddItemToHashTable(ref Taghash, "linkcode", TaskidsArr[i]);
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
      

    }





}