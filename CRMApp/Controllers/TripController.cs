using CRMApp.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;

namespace CRMApp.Controllers
{
    public class TripController : Controller
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

        public JsonResult AjaxTriplogFromTripid(string tripid)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (string.IsNullOrEmpty(tripid.Trim()))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string sqlstr = "Select convert(float,RTRIM(Latitude)) as lat,convert(float,RTRIM(Longitude)) as lng from triplog where rowstatus=0 and  tripid='" + tripid.Trim() + "' order by locdatetime ";
            DataTable dtlog = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
            return Json(JsonConvert.SerializeObject(dtlog));
        }


        /// <summary>
        /// Show trip details with google map 
        /// </summary>
        /// <param name="tripid"></param>
        /// <returns></returns>
        public ActionResult TripDetails(string tripid)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managetrip", HttpContext.Session.GetString("serverdatabase")))
            {
                string sqlstr = "Select * from tripinfo where rowstatus=0 and tripstatus='F' and tripid='" + tripid + "'";
                var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
                var tripInfo = new TripInfoModel();
                if (dt.Rows.Count > 0)
                {
                    df1.AddColumnsInDataTable(ref dt, "FrmtStartTime, FrmtEndTime,FrmtDuration", "System.String, System.String,System.String");
                    for (int i = 0; i <= dt.Rows.Count - 1; i++)
                    {
                        if (dt.Rows[i]["StartTime"] is DBNull == false)
                        {
                            DateTime temp = Convert.ToDateTime(dt.Rows[i]["StartTime"]);
                            dt.Rows[i]["FrmtStartTime"] = temp.ToString("dd/MM/yyyy HH:mm:ss tt");
                        }
                        else
                        {
                            dt.Rows[i]["FrmtStartTime"] = "";
                        }
                        if (dt.Rows[i]["EndTime"] is DBNull == false)
                        {
                            DateTime temp = Convert.ToDateTime(dt.Rows[i]["EndTime"]);
                            dt.Rows[i]["FrmtEndTime"] = temp.ToString("dd/MM/yyyy H:mm:ss tt");
                        }
                        else
                        {
                            dt.Rows[i]["FrmtEndTime"] = "";
                        }
                        if (dt.Rows[i]["duration"] is DBNull == false)
                        {
                            dt.Rows[i]["FrmtDuration"] = cfc1.GetTimeStringfromSeconds((long)(dt.Rows[i]["duration"]));
                        }
                        else
                        {
                            dt.Rows[i]["FrmtDuration"] = "00:00:00";
                        }
                    }
                    tripInfo = DCLib.GetModelFromDataRow<TripInfoModel>(dt.Rows[0]);
                }
                return View(tripInfo);
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Grid to show tripinfo Data
        /// </summary>
        /// <returns></returns>
        public ActionResult ManageTripInfo()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managetrip", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                ViewBag.Message = "Date~2~date|Trip Name~3~string|Duration~4~Integer|Distance~5~Integer";
                string searchcondition = "infotype='searchstring' and viewid='Managetrip' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='Managetrip' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string Infostring = df1.GetCellValue(searchdr, "infostring", "string").ToString() ?? "";
                var infoStringArr = Infostring.Split('@');
                ViewBag.filterString = infoStringArr[0];

                string sortcondition = "infotype='sortstring' and viewid='Managetrip' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(LoginRow["Userlogin_key"]) + "";
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr is null)
                {
                    sortcondition = "infotype='sortstring' and viewid='Managetrip' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");

                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }


        /// <summary>
        /// Return json data of TripInfo
        /// </summary>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public JsonResult ajaxManageTripInfo(int? start, int pSize = 20, string search = "", string order = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "managetrip", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                int Loginkey = 0;
                
                if (sessionRow is not null)
                    Loginkey = Convert.ToInt32(sessionRow["linkcode"]);
                
                string condition = string.Empty;
                if (!string.IsNullOrEmpty(search))
                    condition = cfc1.GetSearchString(search); 

                int a = GetTripInfoCount(Loginkey, SessionControl.UserServerDatabase, condition);
                //var dtTripInfo = getCompletedTripinfo(Loginkey, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), start, SessionControl.UserServerDatabase, pSize, condition, order);
                var dtTripInfo = getCompletedTripinfo(Loginkey, DtInfoTable,DtInfoTableuser, start, SessionControl.UserServerDatabase, pSize, condition, order);
                var dataTableData = new DataTypeConversionLib.DTResult<TripInfoModel>();
                dataTableData = (DataTypeConversionLib.DTResult<TripInfoModel>)DCLib.ConvertDTtoModal<TripInfoModel>(dtTripInfo, Convert.ToInt32(start), a, dtTripInfo.Rows.Count);
                return Json(dataTableData);
            }
            return Json("");
        }


        /// <summary>
        /// Retrun number of rows for TripInfo
        /// </summary>
        /// <param name="loginkey"></param>
        /// <param name="serverdatabase"></param>
        /// <param name="search"></param>
        /// <returns></returns>
        public int GetTripInfoCount(int loginkey, string serverdatabase, string search = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return 0;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string lcondition = " m1.Rowstatus=0 and m1.TripStatus='F' and  accmaster.rowstatus=0 ";
            var dtAcc = df1.SqlExecuteDataTable(serverdatabase, "Select P_acccode from accmaster where rowstatus=0 and under = " + loginkey);
            // Manager
            if (dtAcc.Rows.Count > 0)
            {
                string p_acccodes = "";
                for (int i = 0, loopTo = dtAcc.Rows.Count - 1; i <= loopTo; i++)
                    p_acccodes += "," + df1.GetCellValue(dtAcc.Rows[i], "P_acccode", "integer");

                if (!string.IsNullOrEmpty(p_acccodes))
                {
                    if (p_acccodes.First() == ',')
                        p_acccodes = p_acccodes.Substring(1, p_acccodes.Length - 1);
                
                    p_acccodes += "," + loginkey;
                    lcondition = lcondition + " and m1.UserLogin_Key in (" + p_acccodes + ")";
                }
            }
            else
            {
                // Not a manager
                lcondition = lcondition + " and m1.UserLogin_Key =" + loginkey;
            }

            lcondition = lcondition + " " + search;

            string query = "Select Count(m1.p_tripinfo) as RCount from Tripinfo as m1  left join accmaster on m1.userlogin_key=accmaster.p_acccode where " + lcondition;
            var dt = df1.SqlExecuteDataTable(serverdatabase, query);
            return Convert.ToInt32(dt.Rows[0]["RCount"]);
        }

        /// <summary>
        /// Get Completed-Trip data of An Employee from  TripInfo table
        /// </summary>
        /// <param name="loginkey"></param>
        /// <param name="dtinfotable"></param>
        /// <param name="dtinfotableuser"></param>
        /// <param name="start"></param>
        /// <param name="serverdatabase"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public DataTable getCompletedTripinfo(int loginkey, DataTable dtinfotable, DataTable dtinfotableuser, int? start, string serverdatabase, int pSize = 20, string search = "", string order = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return null;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var dt = new DataTable();
            string lorder =string.IsNullOrEmpty(order?.Trim())? " m1.mtimestamp desc ": order;
            string lcondition = " m1.Rowstatus=0 and m1.TripStatus='F' and  accmaster.rowstatus=0  ";
            string ljoin = " left join accmaster on m1.userlogin_key=accmaster.p_acccode ";

            var dtAcc = df1.SqlExecuteDataTable(serverdatabase, "Select P_acccode from accmaster where rowstatus=0 and under = " + loginkey);
            // Manager
            if (dtAcc.Rows.Count > 0)
            {
                string p_acccodes = "";
                for (int i = 0, loopTo = dtAcc.Rows.Count - 1; i <= loopTo; i++)
                    p_acccodes += "," + df1.GetCellValue(dtAcc.Rows[i], "P_acccode", "integer");
                if (!string.IsNullOrEmpty(p_acccodes))
                {
                    if (p_acccodes.First() == ',')
                        p_acccodes = p_acccodes.Substring(1, p_acccodes.Length - 1);

                    p_acccodes += "," + loginkey;
                    lcondition = lcondition + " and m1.UserLogin_Key in (" + p_acccodes + ")";
                }
            }
            else
            {
                // Not a manager
                lcondition = lcondition + " and m1.UserLogin_Key =" + loginkey;
            }

            lcondition = lcondition + " " + search;
            lorder =string.IsNullOrEmpty(order)? lorder: order;
            string argLtable = "Tripinfo";
            string argLfieldList = "m1.*,accmaster.accname ";
            string argLfilter = "";
            int argStartRowPostion = Convert.ToInt32(start);
            int argTotalRows = -1;
            dt = df1.GetDataFromSqlFixedRows(ref serverdatabase, ref argLtable, ref argLfieldList, ref ljoin, ref lcondition, ref argLfilter, ref lorder, ref argStartRowPostion, pSize, ref argTotalRows);
            start = argStartRowPostion;
            df1.AddColumnsInDataTable(ref dt, "FrmtStartTime, FrmtEndTime,FrmtDuration", "System.String,System.String, System.String");

            for (int i = 0, loopTo1 = dt.Rows.Count - 1; i <= loopTo1; i++)
            {
                if (dt.Rows[i]["StartTime"] is DBNull == false)
                {
                    DateTime temp = Convert.ToDateTime(dt.Rows[i]["StartTime"]);
                    dt.Rows[i]["FrmtStartTime"] = temp.ToString("dd/MM/yyyy HH:mm:ss tt");
                }
                else
                {
                    dt.Rows[i]["FrmtStartTime"] = "";
                }
                if (dt.Rows[i]["EndTime"] is DBNull == false)
                {
                    DateTime temp = Convert.ToDateTime(dt.Rows[i]["EndTime"]);
                    dt.Rows[i]["FrmtEndTime"] = temp.ToString("dd/MM/yyyy H:mm:ss tt");
                }
                else
                {
                    dt.Rows[i]["FrmtEndTime"] = "";
                }
                if (dt.Rows[i]["duration"] is DBNull == false)
                {
                    dt.Rows[i]["FrmtDuration"] = cfc1.GetTimeStringfromSeconds(Convert.ToInt64((dt.Rows[i]["duration"])));
                }
                else
                {
                    dt.Rows[i]["FrmtDuration"] = "00:00:00";
                }
            }


            return dt;
        }



























    }
}
