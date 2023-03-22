using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections;
using System.Data;
using System.Net;

namespace CRMApp.Controllers
{
    public class DevUtilityController : Controller
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
        private object? _so = null;
        private SalesOrderLibrary.SalesOrderFunction so
        {
            get
            {
                if (_so is null)
                {
                    var argSessionInstance = SessionControl;
                    _so = new SalesOrderLibrary.SalesOrderFunction(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _so = (SalesOrderLibrary.SalesOrderFunction)_so;
                }
                return (SalesOrderLibrary.SalesOrderFunction)_so;
            }
        }


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
        }

        public void SetSessionControlOnDLL(ref CustomerControl.Variables sessionControl)
        {
            rdc.SessionControl = sessionControl;
            gf1.SessionControl = sessionControl;
            df1.SessionControl = sessionControl;
            DCLib.SessionControl = sessionControl;
            cfc1.SessionControl = sessionControl;
            libSaralAuth.SessionControl = sessionControl;
            so.SessionControl = sessionControl;
        }

        // GET: DevUtility
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UpdateInfotable()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            // Dim A As InfoTable.InfoTable.InfoTable
            // If libSaralAuth.IsAuthenticated(Session("AuthKey"), Session("ServerDatabase")) AndAlso libSaralAuth.IsAuthorized(Session("AuthKey"), "managecustomers", Session("ServerDatabase")) Then
            DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            ViewBag.Message = "By P_Infotable~2~integer|By InfoType~3~integer|By NameOfInfo~4~string";
            string searchcondition = "infotype='searchstring' and viewid='updateinfotable' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
            var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition,SessionControl.UserServerDatabase);

            if (searchdr is null)
            {
                searchcondition = "infotype='searchstring' and viewid='updateinfotable' and  rowstatus=0 and Userlogin_key=0";
                searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition,SessionControl.UserServerDatabase);
            }

            ViewBag.filterString = df1.GetCellValue(searchdr, "infostring", "string");
            string sortcondition ="infotype='sortstring' and viewid='updateinfotable' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"])+ "";
            var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition,SessionControl.UserServerDatabase);
            if (sortdr is null)
            {
                sortcondition = "infotype='sortstring' and viewid='updateinfotable' and  rowstatus=0 and Userlogin_key=0";
                sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition,SessionControl.UserServerDatabase);
            }

            ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");
            return View();

            // End If
            // Return RedirectToAction("LogOut", "Home")
        }

        // 'Added by aslam for update CRMTemplate infotable
        /// <summary>
        /// 
        /// </summary>
        /// <param name="infotableModel"></param>
        /// <param name="exitMode"></param>
        /// <returns></returns>
        public JsonResult AjaxUpdateInfotable(InfotableMaster infotableModel, string exitMode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");
            
            infotableModel.GeneratedBy = "S";
            infotableModel.Verified = "Y";
            DataRow? dtr = null;
            dtr = DCLib.GetDataRowFromModel<InfotableMaster>(infotableModel);
            var dtHash = new Hashtable();
            dtHash = gf1.CreateHashTable(dtr);

            if (exitMode.ToLower() == "edit")
            {
                dtHash = gf1.AddItemToHashTable(ref dtHash, "updateflag", "U");
            }
            else if (exitMode.ToLower() == "delete")
            {
                dtHash = gf1.AddItemToHashTable(ref dtHash, "updateflag", "D");
            }
            else if (exitMode.ToLower() == "add")
            {
                dtHash = gf1.AddItemToHashTable(ref dtHash, "updateflag", "I");
                dtHash["infotable_key"] = -1;
                dtHash["p_infotable"] = -1;
            }

            int argP_InfoTable = Convert.ToInt32(dtHash["p_infotable"]);
            int P_InfoTable = libSaralAuth.InsertUpdateInfotable(ref argP_InfoTable, ref dtHash, SessionControl.TemplateServerDatabase);
            if (P_InfoTable > 0)
                return Json("success");
            else
                return Json("Error");

        }

        // 'Added by aslam for update CRMTemplate infotable
        /// <summary>
        /// Get Infotable records to show on grid
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <param name="ServerOrderValue"></param>
        /// <returns></returns>
        public JsonResult AjaxGetInfotTableDataFromCRMTemplate(string id, int? start, int pSize = 20, string search = "", string order = "", string ServerOrderValue = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            // If libSaralAuth.IsAuthenticated(Session("AuthKey"), Session("ServerDatabase")) AndAlso libSaralAuth.IsAuthorized(Session("AuthKey"), "managecustomers", Session("ServerDatabase")) Then
            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");
           
            string SortCondition = "infotype asc";
            string condition = "";
            if (!string.IsNullOrEmpty(search))
                condition = cfc1.GetSearchString(search); 

          
            int a = libSaralAuth.getRowsCountInfotable(condition, SessionControl.TemplateServerDatabase);  // CRMTemplate
            var dt = libSaralAuth.getInfotableDataGrid(Convert.ToInt32(start), SessionControl.TemplateServerDatabase, condition, SortCondition, pSize);

            var objdatatableToList = new DataTypeConversionLib.DTResult<InfotableMaster>();
            objdatatableToList = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt, Convert.ToInt32(start), a, dt.Rows.Count);
            return Json(objdatatableToList);
            // End If
            // Return Nothing
        }


        public ActionResult UpdateDatabse()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "updatedbs", HttpContext.Session.GetString("serverdatabase")))
                return View();

            return RedirectToAction("LogOut", "Home");
        }

        public JsonResult callUpdatefunction(string CorpId, string rewritemasters, string winebus)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "updatedbs", HttpContext.Session.GetString("serverdatabase")))
            {
                // Dim df1 As New DataFunctions.DataFunctions
                // Dim GF1 As New GlobalFunction1.GlobalFunction1
                string filename = "UpdateDbLog_" + df1.GetDateTimeISTNow().ToString("ddMMyyyy_hhmmss") + ".txt";
                string path = MyServer.MapPath("App_Data/" + filename);
                CorpId =string.IsNullOrEmpty(CorpId?.Trim())? "ALL": CorpId;
                if (CorpId?.Trim().ToLower() == "all")
                {
                    // Get All Active Cusotmers
                    var customersDt = new DataTable();
                    if (winebus == "N")
                    {
                        customersDt = libSaralAuth.getAllActiveCustomers();      // Mainserver
                    }
                    else
                    {
                        if (winebus == "Y")
                        {
                            // ' businestype = 859
                            var argHashTableControl = SessionControl.MDFFiles;
                            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "2_mdf_2", "WineTemplate");
                            SessionControl.MDFFiles = argHashTableControl;
                            SessionControl.userid2_mdf_2 = "WineTemplate";
                            SessionControl.pwd2_mdf_2 = "etalpmeteniw";
                            df1.SessionControl = SessionControl;
                            libSaralAuth.SessionControl = SessionControl;
                        }

                        customersDt = libSaralAuth.getAllActiveWineCustomers();
                    }
                    // Make Comma Seperated CorpIds
                    string CorpIds = "";
                    if (customersDt.Rows.Count > 0)
                    {
                        for (int i = 0, loopTo = customersDt.Rows.Count - 1; i <= loopTo; i++)
                        {
                            if (string.IsNullOrEmpty(CorpIds))
                            {
                                CorpIds ="'" + df1.GetCellValue(customersDt.Rows[i], "custcode") + "'";
                            }
                            else
                            {
                                CorpIds = CorpIds + ",'" + df1.GetCellValue(customersDt.Rows[i], "custcode") + "'";
                            }
                        }
                    }
                    // Get DbCredentials in to DataTable
                    var dbCredentialsDt = libSaralAuth.getDbCredentials(CorpIds);  // Mainserver
                    // Now execute program for every customer 
                    if (customersDt.Rows.Count > 0)
                    {
                        for (int i = 0, loopTo1 = customersDt.Rows.Count - 1; i <= loopTo1; i++)
                        {
                            CorpId = df1.GetCellValue(customersDt.Rows[i], "custcode").ToString() ?? "";
                            var nRow = dbCredentialsDt.Select("custcode='" + CorpId + "'").FirstOrDefault();
                            if (nRow is not null)
                            {
                                if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                                {
                                    var argHashTableControl1 = SessionControl.MDFFiles;
                                    SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", "TEST7981");
                                    SessionControl.MDFFiles = argHashTableControl1;
                                    SessionControl.userid1_mdf_1 = "TEST7981";
                                    SessionControl.pwd1_mdf_1 = "TEST7981";
                                    df1.SessionControl = SessionControl;
                                    libSaralAuth.SessionControl = SessionControl;
                                }
                                else
                                {
                                    var argHashTableControl2 = SessionControl.MDFFiles;
                                    SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl2, "1_mdf_1", df1.GetCellValue(nRow, "dbname", "string").ToString()?.Trim());
                                    SessionControl.MDFFiles = argHashTableControl2;
                                    SessionControl.userid1_mdf_1 = df1.GetCellValue(nRow, "userid", "string").ToString()?.Trim();
                                    SessionControl.pwd1_mdf_1 = df1.GetCellValue(nRow, "pwd", "string").ToString()?.Trim();
                                    df1.SessionControl = SessionControl;
                                    libSaralAuth.SessionControl = SessionControl;
                                }
                                string custcode =df1.GetCellValue(nRow, "custcode", "string").ToString()?.Trim() ?? "";
                                string txtString = Environment.NewLine + "Start UpdateDb processing for " + custcode;
                                txtString += Environment.NewLine + "Start DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                                string r = "";
                                r = libSaralAuth.UpdateDbs(SessionControl.TemplateServerDatabase, SessionControl.UserServerDatabase);
                                txtString += Environment.NewLine + "Query for " + custcode + " : " + r;
                                int a = 0;
                                a = df1.SqlExecuteNonQuery(SessionControl.UserServerDatabase, r);
                                txtString += Environment.NewLine + "Execution status for " + custcode + " : " + (a == 0? "Fail": "Success");
                                txtString += Environment.NewLine + "End DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                                txtString += Environment.NewLine + "End UpdateDb processing for " + custcode;
                                WriteLogFile(path, txtString);

                                // 'InsertUpdateDelete Maste Tables data
                                // ''1)infotable,2)infotableuser,3) menumaster,4) viewsettings

                                var dthash = new Hashtable();
                                if (rewritemasters == "Y")
                                {
                                    dthash = gf1.AddItemToHashTable(ref dthash, "infotable", 0);
                                    dthash = gf1.AddItemToHashTable(ref dthash, "infotableuser", 0);
                                    dthash = gf1.AddItemToHashTable(ref dthash, "menumaster", 0);
                                    dthash = gf1.AddItemToHashTable(ref dthash, "viewsettings", 0);
                                    dthash = gf1.AddItemToHashTable(ref dthash, "srl_pro", 0);
                                    dthash = gf1.AddItemToHashTable(ref dthash, "srl_bch", 0);
                                    dthash = gf1.AddItemToHashTable(ref dthash, "iemsgroups", 0);
                                }
                                else
                                {
                                    // dthash = libSaralAuth.CreateHashableforUpdateMasters("A", GlobalControl.Variables.UserServerDatabase)
                                    dthash = libSaralAuth.CreateHashableforUpdateMasters("A", SessionControl.UserServerDatabase);
                                }

                                txtString = Environment.NewLine + "Start UpdateMasterTables processing for " + custcode;
                                txtString += Environment.NewLine + "Start DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                                // r = UpdateMastersTable(dthash, custcode, GlobalControl.Variables.UserServerDatabase)
                                r = UpdateMastersTable(dthash, custcode, SessionControl.UserServerDatabase);

                                // '  r = UpdateMastersTable(dthash, custcode, GlobalControl.Variables.UserServerDatabase)

                                txtString += Environment.NewLine + r;
                                txtString += Environment.NewLine + "End DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                                txtString += Environment.NewLine + "End UpdateMasterTables processing for " + custcode;
                                WriteLogFile(path, txtString);
                            }
                        }
                    }
                }
                else
                {
                    // Get DbCredentials into DataTable
                    // User can send multiple databse name in comma seperated string
                    string rawCorpIdsStr = CorpId;
                    var CorpIdsArr = CorpId.Split(',');
                    string CorpIds = "";
                    if (CorpIdsArr.Length > 0)
                    {
                        for (int i = 0, loopTo2 = CorpIdsArr.Length - 1; i <= loopTo2; i++)
                            CorpIds = string.IsNullOrEmpty(CorpIds)? "'" + CorpIdsArr[i] + "'" : CorpIds + ",'" + CorpIdsArr[i] + "'";
                    }
                    var dbCredentialsDt = libSaralAuth.getDbCredentials(CorpIds);
                    // 'Create and Update Databse Tables,Columns            
                    for (int j = 0, loopTo3 = CorpIdsArr.Length - 1; j <= loopTo3; j++)
                    {
                        var nRow = dbCredentialsDt.Select("custcode='" + CorpIdsArr[j] + "'").FirstOrDefault();
                        if (nRow is not null)
                        {
                            if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                            {
                                var argHashTableControl3 = SessionControl.MDFFiles;
                                SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl3, "1_mdf_1", "TEST7981");
                                SessionControl.MDFFiles = argHashTableControl3;
                                SessionControl.userid1_mdf_1 = "TEST7981";
                                SessionControl.pwd1_mdf_1 = "TEST7981";
                                df1.SessionControl = SessionControl;
                                libSaralAuth.SessionControl = SessionControl;
                            }
                            else
                            {
                                var argHashTableControl4 = SessionControl.MDFFiles;
                                SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl4, "1_mdf_1", df1.GetCellValue(nRow, "dbname", "string").ToString()?.Trim());
                                SessionControl.MDFFiles = argHashTableControl4;
                                SessionControl.userid1_mdf_1 = df1.GetCellValue(nRow, "userid", "string").ToString()?.Trim();
                                SessionControl.pwd1_mdf_1 = df1.GetCellValue(nRow, "pwd", "string").ToString()?.Trim();
                                df1.SessionControl = SessionControl;
                                libSaralAuth.SessionControl = SessionControl;
                            }
                            
                            string custcode =df1.GetCellValue(nRow, "custcode", "string").ToString()?.Trim()?? "";
                            string txtString = Environment.NewLine + "Start UpdateDb processing for " + custcode;
                            txtString += Environment.NewLine + "Start DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                            string r = "";
                            txtString += Environment.NewLine + "Query for " + custcode + " : " + r;
                            int a = 0;
                            txtString += Environment.NewLine + "Execution status for " + custcode + " : " + (a == 0? "Fail": "Success");
                            txtString += Environment.NewLine + "End DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                            txtString += Environment.NewLine + "End UpdateDb processing for " + custcode;

                            WriteLogFile(path, txtString);

                            // 'InsertUpdateDelete Maste Tables data
                            // ''1)infotable,2)infotableuser,3) menumaster,4) viewsettings
                            var dthash = new Hashtable();

                            if (rewritemasters == "Y")
                            {
                                dthash = gf1.AddItemToHashTable(ref dthash, "infotable", 0);
                                dthash = gf1.AddItemToHashTable(ref dthash, "infotableuser", 0);
                                dthash = gf1.AddItemToHashTable(ref dthash, "menumaster", 0);
                                dthash = gf1.AddItemToHashTable(ref dthash, "viewsettings", 0);
                                dthash = gf1.AddItemToHashTable(ref dthash, "srl_pro", 0);
                                dthash = gf1.AddItemToHashTable(ref dthash, "srl_bch", 0);
                                dthash = gf1.AddItemToHashTable(ref dthash, "iemsgroups", 0);
                            }
                            else
                            {
                                // dthash = libSaralAuth.CreateHashableforUpdateMasters("A", GlobalControl.Variables.UserServerDatabase)
                                dthash = libSaralAuth.CreateHashableforUpdateMasters("A", SessionControl.UserServerDatabase);

                            }


                            txtString = Environment.NewLine + "Start UpdateMasterTables processing for " + custcode;
                            txtString += Environment.NewLine + "Start DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                            r = UpdateMastersTable(dthash, custcode, SessionControl.UserServerDatabase);
                            txtString += Environment.NewLine + r;
                            txtString += Environment.NewLine + "End DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                            txtString += Environment.NewLine + "End UpdateMasterTables processing for " + custcode;
                            WriteLogFile(path, txtString);
                        }
                    }
                }
                return Json(filename);
            }
            else
            {
                return Json("");

            }
        }


        public string UpdateMastersTable(Hashtable dthash, string custcode, string serverdatabase, bool rewritemasters = false)
        {
            string result = "";
            if (!(dthash is null))
            {
                foreach (DictionaryEntry kvp in dthash)
                {
                    switch (kvp.Key.ToString()?.ToLower())
                    {
                        case "infotable":
                            {
                                result += Environment.NewLine + "For Infotable : Infotable_key = " + kvp.Value;
                                int argUserDbInfotable_key = Convert.ToInt32(kvp.Value);
                                int a = libSaralAuth.InsertUpdateDeleteInfotableFromCrmtemplate(ref argUserDbInfotable_key);
                                result  +=Environment.NewLine + "For Infotable : Execution Status = " + (a == 0? "Fail": "Success");
                                break;
                            }
                        case "infotableuser":
                            {
                                result += Environment.NewLine + "For Infotableuser : Infotable_key = " + kvp.Value;
                                int argUserDbInfotable_key1 = Convert.ToInt32(kvp.Value);
                                int a = libSaralAuth.InsertUpdateDeleteInfotableUserFromCrmtemplate(ref argUserDbInfotable_key1);
                                result += Environment.NewLine + "For Infotableuser : Execution Status = " + (a == 0 ? "Fail" : "Success");
                                break;
                            }
                        case "menumaster":
                            {
                                result += Environment.NewLine + "For Menumaster : Menumaster_key = " + kvp.Value;
                                int argUserDbMenumaster_key = Convert.ToInt32(kvp.Value);
                                int a = libSaralAuth.InsertUpdateDeleteMenumasterFromCrmtemplate(ref argUserDbMenumaster_key);
                                result += Environment.NewLine + "For Menumaster : Execution Status = " + (a == 0 ? "Fail" : "Success");
                                break;
                            }
                        case "viewsettings":
                            {
                                result += Environment.NewLine + "For Viewsettings : Viewsettings_key = " + kvp.Value;
                                int argUserDbViewsettings_key = Convert.ToInt32(kvp.Value);
                                int a = libSaralAuth.InsertUpdateDeleteViewsettingsFromCrmtemplate(ref argUserDbViewsettings_key);
                                result += Environment.NewLine + "For Viewsettings : Execution Status = " + (a == 0 ? "Fail" : "Success");
                                break;
                            }

                        case "srl_pro":
                            {
                                result +=Environment.NewLine + "For srl_pro : Viewsettings_key = " + kvp.Value;
                                int a = so.rewritesrlproFromCrmtemplate(ref custcode, SessionControl.UserServerDatabase);
                                result += Environment.NewLine + "For srl_pro : Execution Status = " + (a == 0 ? "Fail" : "Success");
                                break;
                            }


                        case "srl_bch":
                            {
                                result += Environment.NewLine + "For srl_pro : Viewsettings_key = " + kvp.Value;
                                int a = so.rewritesrlbchFromCrmtemplate(ref custcode, SessionControl.UserServerDatabase);
                                result += Environment.NewLine + "For srl_pro : Execution Status = " + (a == 0 ? "Fail" : "Success");
                                break;
                            }

                        case "iemsgroups":
                            {
                                result += Environment.NewLine + "For srl_pro : Viewsettings_key = " + kvp.Value;
                                int a = so.rewriteiemsgroupsFromCrmtemplate(ref custcode, SessionControl.UserServerDatabase);
                                result +=Environment.NewLine + "For srl_pro : Execution Status = " + (a == 0 ? "Fail" : "Success");
                                break;
                            }
                    }
                }
            }
            return result;
        }

        public void WriteLogFile(string Filepath, string TxtString)
        {
            if (!System.IO.File.Exists(Filepath))
                System.IO.File.Create(Filepath).Close();
            
            using (var writer = new StreamWriter(Filepath, true))
            {
                writer.WriteLine(TxtString);
                writer.Close();
            }
        }


        public ActionResult downloadUpdateDbLogFile(string filename)
        {
            //Response.Clear();
            //Response.Headers.Add("Content-Disposition", "attachment;filename=" + filename);
            //Response.ContentType = "text/plain";
            ////Response.WriteFile(Server.MapPath("~/App_Data/") + filename);
            ////Response.Flush();
            //if (System.IO.File.Exists(MyServer.MapPath("App_Data/") + filename))
            //{
            //    System.IO.File.Delete(MyServer.MapPath("App_Data/") + filename);
            //}
            ////Response.End();
            //return default;
            string filePath = MyServer.MapPath(@"App_Data\" + filename);
            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath,FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, "text/plain",filename);
        }

        public JsonResult CreateFoldersOnServer(string foldername)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var customerdt = libSaralAuth.getAllActiveWineCustomers();
            string folderpath = "C:/inetpub/gainbooksdata";
            cfc1.CreateFolder(customerdt, folderpath, foldername);
            return Json("True");
        }

        public ActionResult UpdateMenumaster()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "updatemenumaster", HttpContext.Session.GetString("serverdatabase")))
                return View();

            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Get menumaster datagrid
        /// </summary>
        /// <param name="databaseName"></param>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public JsonResult AjaxGetMenumasterData(string databaseName, int? start, int pSize = 20, string search = "", string order = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "updatemenumaster", HttpContext.Session.GetString("serverdatabase")))
            {
                if (string.IsNullOrEmpty(databaseName?.Trim()))
                    return Json("");
                
                string SortCondition = "p_menumaster desc";
                string condition = "";
                if (!string.IsNullOrEmpty(search))
                    condition = cfc1.GetSearchString(search); 
                

                int a = 0;
                var dt = new DataTable();
                if (databaseName?.Trim().ToLower() == "crmtemplate")
                {
                    a = libSaralAuth.getRowsCountMenumaster(condition, SessionControl.TemplateServerDatabase);
                    dt = libSaralAuth.getMenumasterDataGrid(Convert.ToInt32(start), SessionControl.TemplateServerDatabase, condition, SortCondition, pSize);
                }
                else if (databaseName?.Trim().ToLower() == "winetemplate")
                {
                    setWineTemplate();
                    a = libSaralAuth.getRowsCountMenumaster(condition, SessionControl.TemplateServerDatabase);
                    dt = libSaralAuth.getMenumasterDataGrid(Convert.ToInt32(start), SessionControl.TemplateServerDatabase, condition, SortCondition, pSize);
                    setCRMTemplate();
                }
                else if (databaseName?.Trim().ToLower() == "genwinetemplate")
                {
                    setGenWineTemplate();
                    a = libSaralAuth.getRowsCountMenumaster(condition, SessionControl.TemplateServerDatabase);
                    dt = libSaralAuth.getMenumasterDataGrid(Convert.ToInt32(start), SessionControl.TemplateServerDatabase, condition, SortCondition, pSize);
                    setCRMTemplate();
                }
                else if (databaseName?.Trim().ToLower() == "pharmatemplate")
                {
                    setPharmaTemplate();
                    a = libSaralAuth.getRowsCountMenumaster(condition, SessionControl.TemplateServerDatabase);
                    dt = libSaralAuth.getMenumasterDataGrid(Convert.ToInt32(start), SessionControl.TemplateServerDatabase, condition, SortCondition, pSize);
                    setCRMTemplate();
                }
                else
                {
                    var dtuserlogin = libSaralAuth.UserExist(databaseName, SessionControl.MainServerDatabase);
                    if (dtuserlogin is null)
                        return Json("db");

                    //string result = setUserDatabase(Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));
                    //if (result == "db")
                    //    return Json("db");

                    SetSessionControl(Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));

                    var cc2 = SessionControl;
                    var lf1 = new SaralAuthLib.LoginFunctions(ref cc2);

                    a = lf1.getRowsCountMenumaster(condition, SessionControl.UserServerDatabase);
                    dt = lf1.getMenumasterDataGrid(Convert.ToInt32(start), SessionControl.UserServerDatabase, condition, SortCondition, pSize);

                    //dtuserlogin = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
                    //setUserDatabase(Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));

                    SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                }

                var objdatatableToList = new DataTypeConversionLib.DTResult<MenumasterModel>();
                objdatatableToList = (DataTypeConversionLib.DTResult<MenumasterModel>)DCLib.ConvertDTtoModal<MenumasterModel>(dt, Convert.ToInt32(start), a, dt.Rows.Count);
                return Json(objdatatableToList);

            }
            return Json("");
        }



        public void setCRMTemplate()
        {
            var argHashTableControl = SessionControl.MDFFiles;
            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "2_mdf_2", "crmtemplate");
            SessionControl.MDFFiles = argHashTableControl;
            SessionControl.userid2_mdf_2 = "crmtemplate";
            SessionControl.pwd2_mdf_2 = "crmtemplate";

            var argSessionControl2 = SessionControl;
            SetSessionControlOnDLL(ref argSessionControl2);
            SessionControl = argSessionControl2;
        }

        public void setWineTemplate()
        {
            var argHashTableControl = SessionControl.MDFFiles;
            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "2_mdf_2", "WineTemplate");
            SessionControl.MDFFiles = argHashTableControl;
            SessionControl.userid2_mdf_2 = "WineTemplate";
            SessionControl.pwd2_mdf_2 = "etalpmeteniw";

            var argSessionControl2 = SessionControl;
            SetSessionControlOnDLL(ref argSessionControl2);
            SessionControl = argSessionControl2;
        }

        public void setGenWineTemplate()
        {
            var argHashTableControl = SessionControl.MDFFiles;
            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "2_mdf_2", "genwinetemplate");
            SessionControl.MDFFiles = argHashTableControl;
            SessionControl.userid2_mdf_2 = "genwinetemplate";
            SessionControl.pwd2_mdf_2 = "genwinetemplate";

            var argSessionControl2 = SessionControl;
            SetSessionControlOnDLL(ref argSessionControl2);
            SessionControl = argSessionControl2;
        }

        public void setPharmaTemplate()
        {
            var argHashTableControl = SessionControl.MDFFiles;
            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "2_mdf_2", "PharmaTemplate");
            SessionControl.MDFFiles = argHashTableControl;
            SessionControl.userid2_mdf_2 = "PharmaTemplate";
            SessionControl.pwd2_mdf_2 = "PharmaTemplate";

            var argSessionControl2 = SessionControl;
            SetSessionControlOnDLL(ref argSessionControl2);
            SessionControl = argSessionControl2;
        }

        public string setUserDatabase(int userlogin_key)
        {
            var dtdbcustconfig = libSaralAuth.GetDatabaseDetailsFromUserlogin_key(userlogin_key, SessionControl.MainServerDatabase);
            if (dtdbcustconfig is null)
                return "db";

            var argHashTableControl = SessionControl.MDFFiles;
            SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
            SessionControl.MDFFiles = argHashTableControl;
            SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
            SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();

            var argSessionControl2 = SessionControl;
            SetSessionControlOnDLL(ref argSessionControl2);
            SessionControl = argSessionControl2;


            return "success";
        }

        /// <summary>
        /// Add or Edit menumaster
        /// </summary>
        /// <param name="databaseName"></param>
        /// <param name="objMenumaster"></param>
        /// <param name="exitMode"></param>
        /// <returns></returns>
        public JsonResult AjaxAddUpdateMenumaster(string databaseName, MenumasterModel objMenumaster, string exitMode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");
            
            
            DataRow? dtr = null;
            dtr = DCLib.GetDataRowFromModel<MenumasterModel>(objMenumaster);
            var dtHash = new Hashtable();
            dtHash = gf1.CreateHashTable(dtr);

            if (exitMode.ToLower() == "edit")
            {
                dtHash = gf1.AddItemToHashTable(ref dtHash, "updateflag", "U");
            }
            else if (exitMode.ToLower() == "add")
            {
                dtHash = gf1.AddItemToHashTable(ref dtHash, "updateflag", "I");
                dtHash = gf1.AddItemToHashTable(ref dtHash, "p_menumaster", -1, true);
                dtHash = gf1.AddItemToHashTable(ref dtHash, "menumaster_key", -1, true);
            }
            int p_menumaster = 0;

            if (databaseName?.Trim().ToLower() == "crmtemplate")
            {
                int argp_menumaster = Convert.ToInt32(dtHash["p_menumaster"]);
                p_menumaster = libSaralAuth.InsertUpdateMenuMaster(ref argp_menumaster, ref dtHash, SessionControl.TemplateServerDatabase);
            }
            else if (databaseName?.Trim().ToLower() == "winetemplate")
            {
                setWineTemplate();
                int argp_menumaster2 = Convert.ToInt32(dtHash["p_menumaster"]);
                p_menumaster = libSaralAuth.InsertUpdateMenuMaster(ref argp_menumaster2, ref dtHash, SessionControl.TemplateServerDatabase);
                setCRMTemplate();
            }
            else if (databaseName?.Trim().ToLower() == "genwinetemplate")
            {
                setGenWineTemplate();
                int argp_menumaster2 = Convert.ToInt32(dtHash["p_menumaster"]);
                p_menumaster = libSaralAuth.InsertUpdateMenuMaster(ref argp_menumaster2, ref dtHash, SessionControl.TemplateServerDatabase);
                setCRMTemplate();
            }
            else if (databaseName?.Trim().ToLower() == "pharmatemplate")
            {
                setPharmaTemplate();
                int argp_menumaster2 = Convert.ToInt32(dtHash["p_menumaster"]);
                p_menumaster = libSaralAuth.InsertUpdateMenuMaster(ref argp_menumaster2, ref dtHash, SessionControl.TemplateServerDatabase);
                setCRMTemplate();
            }
            else
            {
                var dtuserlogin = libSaralAuth.UserExist(databaseName, SessionControl.MainServerDatabase);
                if(dtuserlogin is null)
                    return Json("db");

                //string result = setUserDatabase(Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));
                //if (result == "db")
                //    return Json("db");

                SetSessionControl(Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));

                var cc2 = SessionControl;
                var lf1 =new SaralAuthLib.LoginFunctions(ref cc2);

                int argp_menumaster1 = Convert.ToInt32(dtHash["p_menumaster"]);
                p_menumaster = lf1.InsertUpdateMenuMaster(ref argp_menumaster1, ref dtHash, SessionControl.UserServerDatabase);
                //dtuserlogin = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
                //setUserDatabase(Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            }

            if (p_menumaster > 0)
                return Json("success");
            else
                return Json("Error");

        }



        /// <summary>
        /// Delete menumaster row
        /// </summary>
        /// <param name="databaseName"></param>
        /// <param name="p_menumaster"></param>
        /// <returns></returns>
        public JsonResult AjaxDeleteMenumaster(string databaseName, int p_menumaster)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return Json("");

            var dthash = new Hashtable();
            dthash = gf1.AddItemToHashTable(ref dthash, "updateflag", "D", true);
            dthash = gf1.AddItemToHashTable(ref dthash, "p_menumaster", p_menumaster, true);

            int a = 0;

            if (databaseName?.Trim().ToLower() == "crmtemplate")
            {
                int argp_menumaster = Convert.ToInt32(dthash["p_menumaster"]);
                a = libSaralAuth.InsertUpdateMenuMaster(ref argp_menumaster, ref dthash, SessionControl.TemplateServerDatabase);
            }
            else if (databaseName?.Trim().ToLower() == "winetemplate")
            {
                setWineTemplate();
                int argp_menumaster2 = Convert.ToInt32(dthash["p_menumaster"]);
                a = libSaralAuth.InsertUpdateMenuMaster(ref argp_menumaster2, ref dthash, SessionControl.TemplateServerDatabase);
                setCRMTemplate();
            }
            else if (databaseName?.Trim().ToLower() == "genwinetemplate")
            {
                setGenWineTemplate();
                int argp_menumaster2 = Convert.ToInt32(dthash["p_menumaster"]);
                a = libSaralAuth.InsertUpdateMenuMaster(ref argp_menumaster2, ref dthash, SessionControl.TemplateServerDatabase);
                setCRMTemplate();
            }
            else if (databaseName?.Trim().ToLower() == "pharmatemplate")
            {
                setPharmaTemplate();
                int argp_menumaster2 = Convert.ToInt32(dthash["p_menumaster"]);
                a = libSaralAuth.InsertUpdateMenuMaster(ref argp_menumaster2, ref dthash, SessionControl.TemplateServerDatabase);
                setCRMTemplate();
            }
            else
            {
                var dtuserlogin = libSaralAuth.UserExist(databaseName, SessionControl.MainServerDatabase);
                if(dtuserlogin is null)
                    return Json("db");

                //string result = setUserDatabase(Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));
                //if (result == "db")
                //    return Json("db");

                SetSessionControl(Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));

                var cc2 = SessionControl;
                var lf1 = new SaralAuthLib.LoginFunctions(ref cc2);

                int argp_menumaster1 = Convert.ToInt32(dthash["p_menumaster"]);
                a = lf1.InsertUpdateMenuMaster(ref argp_menumaster1, ref dthash, SessionControl.UserServerDatabase);
                //dtuserlogin = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
                //setUserDatabase(Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            }

            if (a > 0)
                return Json("success");
            else
                return Json("Error");
        }


        public JsonResult RunSqlQuery(string sqlQuery, string CorpId, string winebus)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "updatedbs", HttpContext.Session.GetString("serverdatabase")))
            {
                string filename = "RunSQLQueryLog_" + df1.GetDateTimeISTNow().ToString("ddMMyyyy_hhmmss") + ".txt";
                string path = MyServer.MapPath("App_Data/" + filename);
                CorpId = string.IsNullOrEmpty(CorpId?.Trim())? "ALL": CorpId;
                if (CorpId?.Trim().ToLower() == "all")
                {
                    // Get All Active Cusotmers
                    var customersDt = new DataTable();
                    if (winebus == "N")
                    {
                        customersDt = libSaralAuth.getAllActiveCustomers();      // Mainserver
                    }
                    else
                    {
                        customersDt = libSaralAuth.getAllActiveWineCustomers();
                    }
                    // Make Comma Seperated CorpIds
                    string CorpIds = "";
                    if (customersDt.Rows.Count > 0)
                    {
                        for (int i = 0, loopTo = customersDt.Rows.Count - 1; i <= loopTo; i++)
                        {
                            if (string.IsNullOrEmpty(CorpIds))
                            {
                                CorpIds = "'"+ df1.GetCellValue(customersDt.Rows[i], "custcode") + "'";
                            }
                            else
                            {
                                CorpIds =CorpIds + ",'" + df1.GetCellValue(customersDt.Rows[i], "custcode") + "'";
                            }
                        }
                    }
                    // Get DbCredentials in to DataTable
                    var dbCredentialsDt = libSaralAuth.getDbCredentials(CorpIds);  // Mainserver
                    if (customersDt.Rows.Count > 0)
                    {
                        string txtString = Environment.NewLine + "SQL Query : " + sqlQuery.Trim();
                        for (int i = 0, loopTo1 = customersDt.Rows.Count - 1; i <= loopTo1; i++)
                        {
                            CorpId = df1.GetCellValue(customersDt.Rows[i], "custcode").ToString()?? "";
                            var nRow = dbCredentialsDt.Select("custcode='" + CorpId + "'").FirstOrDefault();
                            if (nRow is not null)
                            {
                                var argHashTableControl = SessionControl.MDFFiles;
                                SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", df1.GetCellValue(nRow, "dbname", "string").ToString()?.Trim());
                                SessionControl.MDFFiles = argHashTableControl;
                                SessionControl.userid1_mdf_1 = df1.GetCellValue(nRow, "userid", "string").ToString()?.Trim();
                                SessionControl.pwd1_mdf_1 = df1.GetCellValue(nRow, "pwd", "string").ToString()?.Trim();
                                df1.SessionControl = SessionControl;
                                libSaralAuth.SessionControl = SessionControl;

                                string custcode = df1.GetCellValue(nRow, "custcode", "string").ToString()?.Trim()??"";
                                txtString += Environment.NewLine + "Start processing for " + custcode;
                                txtString += Environment.NewLine + "Start DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                                int a = 0;
                                a = df1.SqlExecuteNonQuery(SessionControl.UserServerDatabase, sqlQuery);
                                txtString += Environment.NewLine + "Execution status for " + custcode + " : " + (a == 0? "Fail" : "Success");
                                txtString += Environment.NewLine + "Number of affected rows for " + custcode + " : " + a;
                                txtString += Environment.NewLine + "End DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                                txtString += Environment.NewLine + "End processing for " + custcode;
                            }
                        }
                        WriteLogFile(path, txtString);
                    }
                }
                else
                {
                    var CorpIdsArr = CorpId.Split(',');
                    string CorpIds = "";
                    if (CorpIdsArr.Length > 0)
                    {
                        for (int i = 0, loopTo2 = CorpIdsArr.Length - 1; i <= loopTo2; i++)
                            CorpIds = string.IsNullOrEmpty(CorpIds) ? "'" + CorpIdsArr[i] + "'" : CorpIds + ",'" + CorpIdsArr[i] + "'";
                    }
                    var dbCredentialsDt = libSaralAuth.getDbCredentials(CorpIds);
                    string txtString = Environment.NewLine + "SQL Query : " + sqlQuery.Trim();
                    for (int j = 0, loopTo3 = CorpIdsArr.Length - 1; j <= loopTo3; j++)
                    {
                        if (CorpIdsArr[j].Trim().ToLower() == "crmtemplate")
                        {
                            setCRMTemplate();
                            string custcode = "CRMTemplate";
                            txtString += Environment.NewLine + "Start processing for " + custcode;
                            txtString += Environment.NewLine + "Start DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                            int a = 0;
                            a = df1.SqlExecuteNonQuery(SessionControl.TemplateServerDatabase, sqlQuery.Trim());
                            txtString +=Environment.NewLine + "Execution status for " + custcode + " : " + (a == 0? "Fail" : "Success");
                            txtString += Environment.NewLine + "Number of affected rows for " + custcode + " : " + a;
                            txtString += Environment.NewLine + "End DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                            txtString += Environment.NewLine + "End processing for " + custcode;
                        }
                        else if (CorpIdsArr[j].Trim().ToLower() == "winetemplate")
                        {
                            setWineTemplate();
                            string custcode = "WineTemplate";
                            txtString += Environment.NewLine + "Start processing for " + custcode;
                            txtString += Environment.NewLine + "Start DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                            int a = 0;
                            a = df1.SqlExecuteNonQuery(SessionControl.TemplateServerDatabase, sqlQuery.Trim());
                            txtString +=Environment.NewLine + "Execution status for " + custcode + " : " + (a == 0 ? "Fail" : "Success");
                            txtString += Environment.NewLine + "Number of affected rows for " + custcode + " : " + a;
                            txtString += Environment.NewLine + "End DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                            txtString += Environment.NewLine + "End processing for " + custcode;
                        }
                        else
                        {
                            var nRow = dbCredentialsDt.Select("custcode='" + CorpIdsArr[j].Trim() + "'").FirstOrDefault();
                            if (nRow is not null)
                            {
                                var argHashTableControl1 = SessionControl.MDFFiles;
                                SessionControl.MDFFiles = gf1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(nRow, "dbname", "string").ToString()?.Trim());
                                SessionControl.MDFFiles = argHashTableControl1;
                                SessionControl.userid1_mdf_1 = df1.GetCellValue(nRow, "userid", "string").ToString()?.Trim();
                                SessionControl.pwd1_mdf_1 = df1.GetCellValue(nRow, "pwd", "string").ToString()?.Trim()  ;
                                df1.SessionControl = SessionControl;
                                libSaralAuth.SessionControl = SessionControl;
                                string custcode = df1.GetCellValue(nRow, "custcode", "string").ToString()?.Trim() ?? "";
                                txtString += Environment.NewLine + "Start processing for " + custcode;
                                txtString += Environment.NewLine + "Start DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                                int a = 0;
                                a = df1.SqlExecuteNonQuery(SessionControl.UserServerDatabase, sqlQuery.Trim());
                                txtString +=Environment.NewLine + "Execution status for " + custcode + " : "+ (a == 0? "Fail":"Success");
                                txtString += Environment.NewLine + "Number of affected rows for " + custcode + " : " + a;
                                txtString += Environment.NewLine + "End DateTime for " + custcode + " : " + df1.GetDateTimeISTNow().ToString("dd/MM/yyyy hh:mm:ss tt");
                                txtString += Environment.NewLine + "End processing for " + custcode;
                            }
                        }
                    }
                    WriteLogFile(path, txtString);
                }
                return Json(filename);
            }
            else
            {
                return Json("");
            }
        }

        /// <summary>
        /// CorpId - Comma separate Corpids 
        /// </summary>
        /// <returns></returns>
        public JsonResult RemoveDatabase(string CorpId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "updatedbs", HttpContext.Session.GetString("serverdatabase")))
            {
                string result = cfc1.RemoveCorpid(CorpId);
                string filename = "RemoveDbLog_" + df1.GetDateTimeISTNow().ToString("ddMMyyyy_hhmmss") + ".txt";
                string path = MyServer.MapPath(@"App_Data\" + filename);
                WriteLogFile(path, result);
                return Json(filename);
            }
            return Json("");
        }

        /// <summary>
        /// Remove WineDbs according to rjexcise api response
        /// </summary>
        /// <returns></returns>
        public JsonResult ClearWineDatabase()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "updatedbs", HttpContext.Session.GetString("serverdatabase")))
            {
                string filename = "ClearWineDatabase_" + df1.GetDateTimeISTNow().ToString("ddMMyyyy_hhmmss") + ".txt";
                string path = MyServer.MapPath("App_Data/" + filename);
                string excelFileName = "RemoveCustomersData" + df1.GetDateTimeISTNow().ToString("ddMM_HHmmss") + ".xlsx";
                string result = df1.GetDateTimeISTNow().ToLongDateString() + Environment.NewLine;
                var customersDt = libSaralAuth.getAllActiveWineCustomers();
                string CorpIds = "";
                if (customersDt.Rows.Count > 0)
                {
                    for (int i = 0, loopTo = customersDt.Rows.Count - 1; i <= loopTo; i++)
                    {
                        if (string.IsNullOrEmpty(CorpIds))
                        {
                            CorpIds = "'" + df1.GetCellValue(customersDt.Rows[i], "custcode") + "'";
                        }
                        else
                        {
                            CorpIds =CorpIds + ",'" + df1.GetCellValue(customersDt.Rows[i], "custcode") + "'";
                        }
                    }
                }

                if (customersDt.Rows.Count > 0)
                {
                    var dbCredentialsDt = libSaralAuth.getDbCredentials(CorpIds);
                    var combinedDt = new DataTable();
                    combinedDt = df1.AddColumnsInDataTable(ref combinedDt, "CustCodeSW,CustNameSW,ContactPersonSW,MobNoSW,EmailSW,AccName,Mobile,Email,ShopCode,Corpid,ShopName,LicenseeName,ShopAddress,PrintingPhone,RegisteredPhone,PrintShopNo", "System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string,System.string");
                    for (int i = 0, loopTo1 = customersDt.Rows.Count - 1; i <= loopTo1; i++)
                    {
                        string CorpId = df1.GetCellValue(customersDt.Rows[i], "custcode").ToString() ?? "";
                        if (CorpId.Trim().ToLower() != "test7981")
                        {
                            var nRow = dbCredentialsDt.Select("custcode='" + CorpId + "'").FirstOrDefault();
                            if (nRow is not null)
                            {
                                var cc2 = new CustomerControl.Variables("webgodaddy", mcorpid: df1.GetCellValue(nRow, "dbname", "string").ToString());
                                var df2 = new DataFunctions.DataFunctions(ref cc2);
                                df2.SetDbCredentials(ref cc2);
                                var salesOrderLib = new SalesOrderLibrary.SalesOrderFunction(ref cc2);
                                var libSaralAuthNew = new SaralAuthLib.LoginFunctions(ref cc2);
                                var shopRow = salesOrderLib.GetShopControlRow(cc2.UserServerDatabase, "corpid,shopcode,shopname,licenseecode,licenseename,shopaddress,excisedistrict,circleoffice,locality,printingphone,registeredphone,printshopno");
                                if (!(shopRow is null))
                                {
                                    string apiurl ="https://api.rjexcise.net/api/pos/GetLicDetail?user_id=Technopinch&pwd=EXCISE@1002&shop_code="+ df1.GetCellValue(shopRow, "shopcode", "string").ToString();
                                    HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create(apiurl);
                                    myRequest.Method = "GET";
                                    try
                                    {
                                        HttpWebResponse myResponse = (HttpWebResponse)myRequest.GetResponse();
                                        var reader = new StreamReader(myResponse.GetResponseStream());
                                        string responseFromServer = reader.ReadToEnd();
                                        reader.Close();
                                        responseFromServer = responseFromServer.Replace("[", "").Replace("]", "");
                                        var jsonResult = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseFromServer);
                                        string? authKey = jsonResult?["Authentication_Key"].ToString();
                                        if (string.IsNullOrEmpty(authKey))
                                        {
                                            // 'Get Employees Data from accmaster
                                            var accmasterDt = libSaralAuthNew.GetActiveEmployeesFromAccMaster(cc2.UserServerDatabase, "accname,email,mobile");
                                            // 'Insert data into combinedDt
                                            for (int j = 0, loopTo2 = accmasterDt.Rows.Count - 1; j <= loopTo2; j++)
                                            {
                                                if ((df1.GetCellValue(accmasterDt.Rows[j], "accname", "string").ToString()?.Trim()??"").ToLower() != "saral mainuser")
                                                {
                                                    var newRow = combinedDt.NewRow();
                                                    // 'Accmaster Data
                                                    newRow["AccName"] = df1.GetCellValue(accmasterDt.Rows[j], "accname", "string");
                                                    newRow["Mobile"] = df1.GetCellValue(accmasterDt.Rows[j], "mobile", "string");
                                                    newRow["Email"] = df1.GetCellValue(accmasterDt.Rows[j], "email", "string");

                                                    // 'Add Saral Customer Table data and User ShoControl Data into combinedDt
                                                    newRow = FillDatainCombinedDtRow(ref newRow, customersDt.Rows[i], shopRow);
                                                    combinedDt.Rows.Add(newRow);
                                                }
                                            }
                                            // '  result += "ShopDetails: " & cfc1.GetJsonFromDataRow(shopRow) & Environment.NewLine & " Server_Response: " & responseFromServer & Environment.NewLine & Environment.NewLine & Environment.NewLine
                                            // 'cfc1.RemoveCorpid(CorpId)
                                        }
                                    }
                                    // reader.Close()
                                    catch (WebException ex)
                                    {
                                        // 'Get Employees Data from accmaster
                                        var accmasterDt = libSaralAuthNew.GetActiveEmployeesFromAccMaster(cc2.UserServerDatabase, "accname,email,mobile");
                                        // 'Insert data into combinedDt
                                        for (int j = 0, loopTo = accmasterDt.Rows.Count - 1; j <= loopTo; j++)
                                        {
                                            if ((df1.GetCellValue(accmasterDt.Rows[j], "accname", "string").ToString()?.Trim()??"").ToLower() != "saral mainuser")
                                            {
                                                var newRow = combinedDt.NewRow();
                                                // 'Accmaster Data
                                                newRow["AccName"] = df1.GetCellValue(accmasterDt.Rows[j], "accname", "string");
                                                newRow["Mobile"] = df1.GetCellValue(accmasterDt.Rows[j], "mobile", "string");
                                                newRow["Email"] = df1.GetCellValue(accmasterDt.Rows[j], "email", "string");

                                                // 'Add Saral Customer Table data and User ShoControl Data into combinedDt
                                                newRow = FillDatainCombinedDtRow(ref newRow, customersDt.Rows[i], shopRow);
                                                combinedDt.Rows.Add(newRow);
                                            }
                                        }
                                        // ' result += "ShopDetails: " & cfc1.GetJsonFromDataRow(shopRow) & Environment.NewLine & " Server_Response: " & ex.Response.ToString & Environment.NewLine & Environment.NewLine & Environment.NewLine
                                    }
                                }
                            }
                        }
                    }
                    cfc1.ExportDataToExcel(combinedDt, MyServer.MapPath("App_Data/") + excelFileName);
                }
                // WriteLogFile(path, result)
                // Return Json(filename, JsonRequestBehavior.AllowGet)
                return Json(excelFileName);
            }
            return Json("");
        }



        /// <summary>
        /// Helper method for ClearWineDatabase to fill Data into combinedDt Row from SaralCustomer Row and ShopControl Row
        /// </summary>
        /// <param name="combinedDtRow"></param>
        /// <param name="saralCustomerRow"></param>
        /// <param name="shopControlRow"></param>
        /// <returns></returns>
        private DataRow FillDatainCombinedDtRow(ref DataRow combinedDtRow, DataRow saralCustomerRow, DataRow shopControlRow)
        {
            // 'Saral Customer Table Data
            combinedDtRow["CustCodeSW"] = df1.GetCellValue(saralCustomerRow, "CustCode", "string");
            combinedDtRow["CustNameSW"] = df1.GetCellValue(saralCustomerRow, "CustName", "string");
            combinedDtRow["ContactPersonSW"] = df1.GetCellValue(saralCustomerRow, "contactperson", "string");
            combinedDtRow["MobNoSW"] = df1.GetCellValue(saralCustomerRow, "MobNo", "string");
            combinedDtRow["EmailSW"] = df1.GetCellValue(saralCustomerRow, "Email", "string");

            // 'User ShopControl Data
            combinedDtRow["ShopCode"] = df1.GetCellValue(shopControlRow, "shopcode", "string");
            combinedDtRow["Corpid"] = df1.GetCellValue(shopControlRow, "corpid", "string");
            combinedDtRow["ShopName"] = df1.GetCellValue(shopControlRow, "shopname", "string");
            combinedDtRow["LicenseeName"] = df1.GetCellValue(shopControlRow, "licenseename", "string");
            combinedDtRow["ShopAddress"] = df1.GetCellValue(shopControlRow, "shopaddress", "string");
            combinedDtRow["PrintingPhone"] = df1.GetCellValue(shopControlRow, "printingphone", "string");
            combinedDtRow["RegisteredPhone"] = df1.GetCellValue(shopControlRow, "registeredphone", "string");
            combinedDtRow["PrintShopNo"] = df1.GetCellValue(shopControlRow, "printshopno", "string");

            return combinedDtRow;
        }









    }
}
