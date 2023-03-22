using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace CRMApp.Controllers
{
    public class NotificationsController : Controller
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
        private object? _commonfunctions = null;
        private CommonFunctionsCloud.CommonFunctionsCloud commonfunctions
        {
            get
            {
                if (_commonfunctions is null)
                {
                    var argSessionInstance = SessionControl;
                    _commonfunctions = new CommonFunctionsCloud.CommonFunctionsCloud(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _commonfunctions = (CommonFunctionsCloud.CommonFunctionsCloud)_commonfunctions;
                }
                return (CommonFunctionsCloud.CommonFunctionsCloud)_commonfunctions;
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
        private object? _notiLib = null;
        private NotificationLib.NotificationLib notiLib
        {
            get
            {
                if (_notiLib is null)
                {
                    var argSessionInstance = SessionControl;
                    _notiLib = new NotificationLib.NotificationLib(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _notiLib = (NotificationLib.NotificationLib)_notiLib;
                }
                return (NotificationLib.NotificationLib)_notiLib;
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
            commonfunctions.SessionControl = sessionControl;
            libSaralAuth.SessionControl = sessionControl;
            notiLib.SessionControl = sessionControl;
        }

        // GET: Notifications
        public ActionResult Notifications()
        {
            return View();
        }

        /// <summary>
        /// Return notificationStatus_web=0 (default) notifications count for a user
        /// </summary>
        /// <returns></returns>
        public JsonResult getNewNotificationsCountForBellIcon()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow LoginRow = commonfunctions.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            if (LoginRow is  null)
                return Json("logout");

            int notiCount = notiLib.GetUnseenNotificationsRowsCountForUser(df1.GetCellValue(LoginRow, "linkcode").ToString(), SessionControl.UserServerDatabase);
            return Json(notiCount);
        }

        /// <summary>
        /// Return Top 100 Notifications for bell icon of current user 
        /// </summary>
        /// <returns></returns>
        public JsonResult getNotificationsForBellIcon()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow LoginRow = commonfunctions.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            if (LoginRow is null)
                return Json("logout");

            var dtNotifications = notiLib.GetAllNotificationsForUserDataGrid(0, SessionControl.UserServerDatabase,df1.GetCellValue(LoginRow, "linkcode").ToString(), psize: 100);
            var objUserUnseenNofificationList = new DataTypeConversionLib.DTResult<NotificationMaster>();
            objUserUnseenNofificationList = (DataTypeConversionLib.DTResult<NotificationMaster>)DCLib.ConvertDTtoModal<NotificationMaster>(dtNotifications, 1, dtNotifications.Rows.Count);
            return Json(objUserUnseenNofificationList);
        }

        /// <summary>
        /// Get All Notifications for current user
        /// </summary>
        /// <returns></returns>
        public JsonResult AllNotifications()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow LoginRow = commonfunctions.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            if (LoginRow is null)
                return Json("logout");

            
            int notificationCount = notiLib.GetAllNotificationsRowsCountForUser(df1.GetCellValue(LoginRow, "linkcode").ToString(), SessionControl.UserServerDatabase);
            var dtNotifications = notiLib.GetAllNotificationsForUserDataGrid(0, SessionControl.UserServerDatabase, df1.GetCellValue(LoginRow, "linkcode").ToString(), psize: notificationCount);
            var objUserNofificationList = new DataTypeConversionLib.DTResult<NotificationMaster>();
            objUserNofificationList = (DataTypeConversionLib.DTResult<NotificationMaster>)DCLib.ConvertDTtoModal<NotificationMaster>(dtNotifications, 1, dtNotifications.Rows.Count);
            return Json(objUserNofificationList);
        }

        /// <summary>
        /// This function update Notification status to read 
        /// </summary>
        /// <param name="p_notification"></param>
        /// <returns></returns>
        public JsonResult UpdateNotificationStatusRead(int p_notification)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string success = "False";
            DataRow sessionRow = commonfunctions.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            int a = notiLib.UpdateNotificationStatusReadForUser(p_notification, sessionRow, SessionControl.UserServerDatabase);
            if (a > 0)
                success = "True";
            return Json(success);
        }

        /// <summary>
        /// Update status to seen
        /// </summary>
        /// <returns></returns>
        public JsonResult UpdateNotificationStatusSeenForUser()
        {
            var cDateTime = df1.GetDateTimeISTNow();
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string success = "False";
            DataRow LoginRow = commonfunctions.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            DataRow sessionRow = commonfunctions.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            int a = notiLib.UpdateNotificationStatusSeenForUser(df1.GetCellValue(LoginRow, "linkcode").ToString(), cDateTime, sessionRow, SessionControl.UserServerDatabase);
            if (a > 0)
                success = "True";

            return Json(success);
        }







































    }
}
