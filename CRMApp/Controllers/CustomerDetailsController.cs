using CRMApp.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections;
using System.Data;

namespace CRMApp.Controllers
{
    public class CustomerDetailsController : Controller
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
            libcustomerfeature.SessionControl = sessionControl;
            DCLib.SessionControl = sessionControl;
            libSaralAuth.SessionControl = sessionControl;
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

        // GET: CustomerDetails
        /// <summary>
        /// Action to show index view in browser.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index(int? P_Customers)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CustomerDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                TempData["P_Customers"] = P_Customers;
                if (SessionControl.corpid.Trim().ToUpper()=="NEHA8591")
                {
                    return View("IndexNeha");
                }
                else
                {
                    return View();
                }
                
            }
            return RedirectToAction("LogOut", "Home");
        }


        public ActionResult SharableCustomerDetails(string CustCode)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CustomerDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                TempData["CustCode"] = CustCode;
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Action to show CustomerAllDetails view
        /// </summary>
        /// <returns></returns>
        public ActionResult CallDetails()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CustomerDashboard", HttpContext.Session.GetString("serverdatabase")))
                return View();
            
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Action to show PaymentDetails view.
        /// </summary>
        /// <returns></returns>
        public ActionResult PaymentDetails()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CustomerDashboard", HttpContext.Session.GetString("serverdatabase")))
                return View();
            
            return RedirectToAction("LogOut", "Home");
        }


        /// <summary>
        /// Action to show OrderDetails view.
        /// </summary>
        /// <returns></returns>
        public ActionResult OrderDetails()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CustomerDashboard", HttpContext.Session.GetString("serverdatabase")))
                return View();
            
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// ajax function to get the data of a customer according to Column and its value provided.
        /// </summary>
        /// <param name="Colname">Column Name from Customers table "CustCode" or "P_Customers"</param>
        /// <param name="value">value of the Column by which customer is to be searched.</param>
        /// <returns>"Error" if there is no record or datatableData model object containing List of data in json format.</returns>
        public JsonResult SearchCustomerDetails(string Colname, string value)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CustomerDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                var dt = new DataTable();
                DataRow loginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("accmasterrow") ?? "");
                if (Convert.ToInt32(loginRow["acctype"]) ==3040)
                {
                    //dt = libcustomerfeature.SearchCustomerDetails(Colname, value, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase, Convert.ToInt32(loginRow["P_acccode"]));
                    dt = libcustomerfeature.SearchCustomerDetails(Colname, value, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase, Convert.ToInt32(loginRow["P_acccode"]));
                }
                else
                {
                    //dt = libcustomerfeature.SearchCustomerDetails(Colname, value, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                    dt = libcustomerfeature.SearchCustomerDetails(Colname, value, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                }

                if (dt.Rows.Count > 0)
                {

                    var datatableData = new DataTypeConversionLib.DTResult<CustomerMaster>();
                    datatableData = (DataTypeConversionLib.DTResult<CustomerMaster>)DCLib.ConvertDTtoModal<CustomerMaster>(dt, 0, dt.Rows.Count, dt.Rows.Count);
                    return Json(datatableData);
                }
                else
                {
                    return Json("Error");
                }
            }
            return Json("logout");
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

            string lcondition = "CustName Like '" + firmname.ToLower() + "%' ";
            DataRow loginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("accmasterrow") ?? "");
            if (Convert.ToInt32(loginRow["acctype"] ) == 3040)
                lcondition +=" and ServicingAgentCode=" + Convert.ToInt32(loginRow["P_acccode"]);

            //var dt = libcustomerfeature.getcustomersDataTableCombinedAddress(lcondition, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
            var dt = libcustomerfeature.getcustomersDataTableCombinedAddress(lcondition, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
            if (dt.Rows.Count > 0)
            {
                DataTypeConversionLib.DTResult<CustomerMaster> datatabledata;
                datatabledata = (DataTypeConversionLib.DTResult<CustomerMaster>)DCLib.ConvertDTtoModal<CustomerMaster>(dt);
                return Json(datatabledata); 
            }
            else
            {
                return Json("error");
            }
        }


        /// <summary>
        /// ajax function to get the latest  records from payment table related to the selected Customer.
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer</param>
        /// <returns>datatableData model object containing List of data in json format.</returns>
        public JsonResult GetPaymentData(int? P_Customers)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("Error");
            }
            if (P_Customers is not null) 
            {
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

                TempData["PCustomer"] = P_Customers;
                //DataTable dt = libcustomerfeature.GetPaymentData(Convert.ToInt32(P_Customers), DtInfoTable, SessionControl.MainServerDatabase,"5");
                DataTable dt = libcustomerfeature.GetPaymentData(Convert.ToInt32(P_Customers), DtInfoTable, SessionControl.MainServerDatabase);
                if (dt is not null && dt.Rows.Count>0 )
                {
                    var datatableData = new DataTypeConversionLib.DTResult<PaymentMaster>();
                    datatableData = (DataTypeConversionLib.DTResult<PaymentMaster>)DCLib.ConvertDTtoModal<PaymentMaster>(dt, 0, dt.Rows.Count, dt.Rows.Count);
                    return Json(datatableData);
                }
            }
            return Json("Error");
        }

        /// <summary>
        /// ajax function to get the latest  records from payment table related to the selected Customer.
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer</param>
        /// <returns>datatableData model object containing List of data in json format.</returns>
        public JsonResult GetAllPaymentData(int? P_Customers)
        {
            TempData["PCustomer"] = P_Customers;
            var dt = new DataTable();
            if (dt is not null)
            {
                var datatableData = new DataTypeConversionLib.DTResult<PaymentMaster>();
                datatableData = (DataTypeConversionLib.DTResult<PaymentMaster>)DCLib.ConvertDTtoModal<PaymentMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(datatableData);
            }
            return Json("Error");
        }

        /// <summary>
        /// ajax function to get latest three records  from RegistrationTrans according to selected Customer in desc order.
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer</param>
        /// <returns>datatableData model object containing List of data in json format.</returns>
        public JsonResult GetRegistrationData(int? P_Customers, int? start, int pSize = 20, string search = "", string order = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("Error");
            }

            if (P_Customers is not null)
            {
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                var dt = new DataTable();
                //var argSessionInstance = SessionControl;
                //var ClsCustomers = new Customers.Customers.Customers(ref argSessionInstance);
                //SessionControl = argSessionInstance;
                string lcondition = "p_customers=" + P_Customers + " and Rowstatus=0";
                if (!string.IsNullOrEmpty(search))
                    //lcondition = cfc1.GetSearchStringFromFrontEnd(search, lcondition);
                    lcondition = cfc1.GetSearchString(search);
                
                //if (!string.IsNullOrEmpty(order))
                //{
                //    var order1 = order.Split('~');
                //    string OrderDir = order1[2].ToLower();
                //    string OrderColumn = order1[0];
                //    string OrderValue = order1[1].ToLower();
                //    // lorder = OrderColumn & " " & OrderDir
                //    // lorder = OrderColumn
                //    // startpnt.Remove("col2")
                //    // startpnt.Add(OrderValue, "col2")
                //}

                if (start ==1)
                    start = 0;
                //string argServerDataBase = ClsCustomers.ServerDatabase;
                string argServerDataBase = SessionControl.MainServerDatabase;
                string argLtable = "RegistrationTran";
                string argLfieldList = "*";
                string argLJoinStmt = "";
                string argLfilter = "";
                string argLorder = "RegsendDate DESC";
                int argStartRowPostion = Convert.ToInt32(start);
                int argTotalRows = -1;
                dt = df1.GetDataFromSqlFixedRows(ref argServerDataBase, ref argLtable, ref argLfieldList, ref argLJoinStmt, ref lcondition, ref argLfilter, ref argLorder, ref argStartRowPostion, pSize, ref argTotalRows);
                //ClsCustomers.ServerDatabase = argServerDataBase;
                //start = argStartRowPostion;
                //int a = df1.RowsCount(ClsCustomers.ServerDatabase, "RegistrationTran", lcondition, "");
                int a = df1.RowsCount(SessionControl.MainServerDatabase, "RegistrationTran", lcondition, "");
                dt = df1.AddColumnsInDataTable(ref dt, "textRegsendDate,textOpenedupto", "System.String,System.String");
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0, loopTo = dt.Rows.Count - 1; i <= loopTo; i++)
                    {
                        DateTime RegsendDate = Convert.ToDateTime(dt.Rows[i]["RegsendDate"]);
                        dt.Rows[i]["textRegsendDate"] = RegsendDate.ToString("dd-MM-yyyy");
                        DateTime Openedupto = Convert.ToDateTime(dt.Rows[i]["Openedupto"]);
                        dt.Rows[i]["textOpenedupto"] = Openedupto.ToString("dd-MM-yyyy");
                    }
                }
                if (dt.Rows.Count > 0)
                {
                    var datatableData = new DataTypeConversionLib.DTResult<RegistrationTranViewModel>();
                    datatableData = (DataTypeConversionLib.DTResult<RegistrationTranViewModel>)DCLib.ConvertDTtoModal<RegistrationTranViewModel>(dt, Convert.ToInt32(start), dt.Rows.Count, dt.Rows.Count);
                    return Json(datatableData);
                }
            }
            return Json("Error");
        }

        /// <summary>
        /// Action to show RegistrationDetails view
        /// </summary>
        /// <returns></returns>
        public ActionResult RegistrationDetails()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");
            
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CustomerDashboard", HttpContext.Session.GetString("serverdatabase")))
                return View();
            
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// ajax function to get all the registrationTran data of a customer according to P_Customers
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer</param>
        /// <returns>datatableData model object containing List of data in json format.</returns>
        public JsonResult GetAllRegistrationData(int? P_Customers)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("Error");
            }

            if (P_Customers is not null)
            {
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                //var dt = libcustomerfeature.GetRegistrationData(Convert.ToInt32(P_Customers), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), SessionControl.UserServerDatabase);
                var dt = libcustomerfeature.GetRegistrationData(Convert.ToInt32(P_Customers), DtInfoTable, SessionControl.UserServerDatabase);
                if (dt.Rows.Count > 0)
                {
                    var datatableData = new DataTypeConversionLib.DTResult<RegistrationTranViewModel>();
                    datatableData = (DataTypeConversionLib.DTResult<RegistrationTranViewModel>)DCLib.ConvertDTtoModal<RegistrationTranViewModel>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                    return Json(datatableData);
                }
            }
            return Json("Error");
        }

        // 'Modified by Aslam
        /// <summary>
        /// ajax function to get all the remarks related to a call according to P_issuesfilegst.
        /// </summary>
        /// <param name="P_allcallsreg">P_allcallsreg of a call.</param>
        /// <returns>datatableData model object containing List of data in json format.</returns>
        public JsonResult GetCallRemarkData(int? P_allcallsreg)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode("C", Convert.ToInt32(P_allcallsreg), SessionControl.UserServerDatabase, "p_crmtasks");
            var dt = libCRMTasks.GetRemarkDataOfATask(Convert.ToInt32(df1.GetCellValue(taskRow, "p_crmtasks", "integer")), SessionControl.UserServerDatabase);
            string CrmcommunicationRowStr = JsonConvert.SerializeObject(df1.AlterDataTable(ref dt, "", "CRMCommunication_key,P_CRMCommunication,Rowstatus,LinkType,LinkCode,CreationDate,Websessions_key,logintype,logincode,communicationtype,LinkURL"));
            return Json(CrmcommunicationRowStr);
        }

        // 'Added by aslam
        /// <summary>
        /// Get Call recording data
        /// </summary>
        /// <param name="P_allcallsreg"></param>
        /// <returns></returns>
        public JsonResult GetCallRecordingData(int P_allcallsreg)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string sqlstr = "select callfreq.p_callfreq, callfreq.p_allcallsreg, calltime,callduration,calltype,mobileno,UserLogin_key,filename,linkurl from callfreq left join callrecordings on callfreq.p_callfreq=callrecordings.p_callfreq where callfreq.linktype='C' and callfreq.p_allcallsreg =" + P_allcallsreg + " order by calltime desc";
            var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
            df1.AddColumnsInDataTable(ref dt, "TextLogincode, Textcalltime,TextCallDuration,Textcalltype,empMobile", "System.String,System.String,System.String,System.String,System.String");
            dt = df1.AddingNameForCodesPrimaryColsInfotable(dt, "calltype", "Textcalltype", DtInfoTable, DtInfoTableuser, "NameOfInfo");
            for (int i = 0, loopTo = dt.Rows.Count - 1; i <= loopTo; i++)
            {
                var LoginRow = libSaralAuth.getAccMasterRowForp_acccode(Convert.ToInt32(df1.GetCellValue(dt.Rows[i], "UserLogin_key")), SessionControl.UserServerDatabase, "AccName,mobile");
              // DataRow LoginRow = libSaralAuth.getAccMasterRowForUserLogin(Convert.ToInt32(df1.GetCellValue(dt.Rows[i], "UserLogin_key")), SessionControl.UserServerDatabase, "AccName");
                if (LoginRow is null)
                {
                    dt.Rows[i]["TextLogincode"] = "";
                    dt.Rows[i]["empMobile"] = "";
                }
                else
                {
                    dt.Rows[i]["TextLogincode"] = df1.GetCellValue(LoginRow,"AccName","string");
                    dt.Rows[i]["empMobile"] = df1.GetCellValue(LoginRow,"mobile","string");
                }
                DateTime aa = Convert.ToDateTime(dt.Rows[i]["calltime"]);
                dt.Rows[i]["Textcalltime"] = aa.ToString("dd-MM-yyyy hh:mm:ss");
                dt.Rows[i]["TextCallDuration"] = cfc1.GetTimeStringfromSeconds(Convert.ToInt64(dt.Rows[i]["callduration"]));
            }
            string calldata = JsonConvert.SerializeObject(dt);
            return Json(calldata);
        }

        /// <summary>
        /// ajax function to get the total number of call registered by a particular customer.
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer.</param>
        /// <returns>Total number of call of a customer.</returns>
        public JsonResult GetNoOfCalls(int? P_Customers)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            int TotalCalls = libcustomerfeature.GetCallCount(Convert.ToInt32(P_Customers), SessionControl.UserServerDatabase);
            return Json(TotalCalls);
        }

        /// <summary>
        /// ajax function to get BilledUpto of a particular customer
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer</param>
        /// <returns></returns>
        public JsonResult GetBilledUpto(int? P_Customers)
        {
            var BilledUpto = new DateTime();
            string TextBilledUpto = "";
            TextBilledUpto = BilledUpto.ToString("dd-MM-yyyy");
            return Json(TextBilledUpto);
        }

        /// <summary>
        /// ajax function to get Total number of Onsite visit to of a particular customer
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer</param>
        /// <returns>Total number of onsite visits of all calls of cuatomers.</returns>
        public JsonResult GetOpenedUpto(int? P_Customers)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var argSessionInstance = SessionControl;
            var ClsCustomers = new Customers.Customers.Customers(ref argSessionInstance);
            SessionControl = argSessionInstance;
            var OpenedUpto = new DateTime();
            string TextOpenedUpto = "";
            string Query = string.Format("select Top(1) Openedupto from RegistrationTran where P_Customers=" + P_Customers + " and Rowstatus=0 Order By RegistrationTran_Key desc");
            var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, Query);
            if (dt.Rows.Count > 0)
            {
                OpenedUpto = Convert.ToDateTime(dt.Rows[0]["Openedupto"]);
                TextOpenedUpto = OpenedUpto.ToString("dd-MM-yyyy");
            }
            return Json(TextOpenedUpto);
        }

        /// <summary>
        /// ajax function to get Total number of Onsite visit to of a particular customer
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer</param>
        /// <returns>Total number of onsite visits of all calls of cuatomers.</returns>
        public JsonResult GetNoOfOnsiteVisits(int? P_Customers)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            int TotalOnsiteVisits = libcustomerfeature.GetOnsiteVisitCount(Convert.ToInt32(P_Customers), SessionControl.UserServerDatabase);
            return Json(TotalOnsiteVisits);
        }

        /// <summary>
        /// ajax function to get latest calls registered by a selected Customer.
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer.</param>
        /// <returns>datatableData model object containing List of data in json format.</returns>
        public JsonResult GetCallData(int? P_Customers)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            //var dt = libcustomerfeature.GetCallData(Convert.ToInt32(P_Customers), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
            var dt = libcustomerfeature.GetCallData(Convert.ToInt32(P_Customers), DtInfoTable,DtInfoTableuser, SessionControl.UserServerDatabase);
            // 'Added by aslam 
            dt = df1.AddColumnsInDataTable(ref dt, "TxtRegisterDate", "system.string");
            for (int i = 0, loopTo = dt.Rows.Count - 1; i <= loopTo; i++)
            {
                DateTime RegisterDate = Convert.ToDateTime(df1.GetCellValue(dt.Rows[i], "RegisterDate"));
                dt.Rows[i]["TxtRegisterDate"] = RegisterDate.ToString("dd-MM-yyyy hh:mm tt");
            }
            TempData["PCustomer"] = P_Customers;
            var datatableData = new DataTypeConversionLib.DTResult<RegCallsViewModel>();
            datatableData = (DataTypeConversionLib.DTResult<RegCallsViewModel>)DCLib.ConvertDTtoModal<RegCallsViewModel>(dt, 1, dt.Rows.Count, dt.Rows.Count);
            return Json(datatableData);
        }

        /// <summary>
        /// ajax function to get all the calls register by a particular Customer in desc order.
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer</param>
        /// <returns>datatableData model object containing List of data in json format.</returns>
        public JsonResult ShowAllCalls(int? P_Customers)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            //var dt = libcustomerfeature.GetCallData(Convert.ToInt32(P_Customers), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
            var dt = libcustomerfeature.GetCallData(Convert.ToInt32(P_Customers), DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);

            TempData["PCustomer"] = P_Customers;
            var datatableData = new DataTypeConversionLib.DTResult<RegCallsViewModel>();
            datatableData = (DataTypeConversionLib.DTResult<RegCallsViewModel>)DCLib.ConvertDTtoModal<RegCallsViewModel>(dt, 1, dt.Rows.Count, dt.Rows.Count);
            return Json(datatableData);
        }

        /// <summary>
        /// ajax function to get the latest records of ChargingHeader of a particular Customer.
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer</param>
        /// <returns>datatableData model object containing List of data in json format.</returns>
        public JsonResult GetOrderData(int? P_Customers)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("Error");
            }

            if (P_Customers is not null)
            {
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                //var dt = libcustomerfeature.GetOrderData(Convert.ToInt32(P_Customers), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), SessionControl.UserServerDatabase, "5");
                //var dt = libcustomerfeature.GetOrderData(Convert.ToInt32(P_Customers), DtInfoTable, SessionControl.UserServerDatabase, "5");
                var dt = libcustomerfeature.GetOrderData(Convert.ToInt32(P_Customers), DtInfoTable, SessionControl.MainServerDatabase, "5");
                if (dt.Rows.Count > 0)
                {
                    var datatableData = new DataTypeConversionLib.DTResult<ChargingHeaderMaster>();
                    datatableData = (DataTypeConversionLib.DTResult<ChargingHeaderMaster>)DCLib.ConvertDTtoModal<ChargingHeaderMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                    return Json(datatableData);
                }
            }
            return Json("Error");
        }


        /// <summary>
        /// ajax function to show all the rows from ChargingHeader table of a particular Customer in DESC order.
        /// </summary>
        /// <param name="P_Customers">P_Customers of Customer selected</param>
        /// <returns>datatableData model object containing List of data in json format.</returns>
        public JsonResult ShowOrderData(int? P_Customers)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("Error");
            }
            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            //var dt = libcustomerfeature.GetOrderData(Convert.ToInt32(P_Customers), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), SessionControl.UserServerDatabase);
            var dt = libcustomerfeature.GetOrderData(Convert.ToInt32(P_Customers), DtInfoTable, SessionControl.UserServerDatabase);
            if (dt.Rows.Count > 0)
            {
                var datatableData = new DataTypeConversionLib.DTResult<ChargingHeaderMaster>();
                datatableData = (DataTypeConversionLib.DTResult<ChargingHeaderMaster>)DCLib.ConvertDTtoModal<ChargingHeaderMaster>(dt, 1, dt.Rows.Count, dt.Rows.Count);
                return Json(datatableData);
            }
            return Json("Error");
        }

        /// <summary>
        /// ajax Function to display CustName of customers from Customers table according to P_Customers.
        /// </summary>
        /// <param name="P_Customers">P_Customers of selected Customer</param>
        /// <returns>CustName of the Customer in Json format</returns>
        public JsonResult ShowFirmname(int? P_Customers)
        {
            return Json("");
            // Dim Firmname As String = ObjCustomerDashboardMaster.GetCustName(P_Customers, Session("ServerDatabase"))
            // Return Json(Firmname, JsonRequestBehavior.AllowGet)
        }

        public async Task<ActionResult> RegisterCalls(IFormCollection fc)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));

            DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
            if (sessionRow is null)
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            
            var argSessionInstance = SessionControl;
            var clsallCallsReg = new AllCallsReg.AllCallsReg.AllCallsReg(ref argSessionInstance);
            SessionControl = argSessionInstance;
            if (ModelState.IsValid)
            {
                var dthash = new Hashtable();
                dthash = DCLib.ConvertIFCToHashTable(fc, clsallCallsReg);

                string Fullname = libcustomerfeature.FindContactPersonFromPCustomers(Convert.ToInt32(fc["pcustomers"]), SessionControl.UserServerDatabase);

                // Added by aslam for workflow status
                int status = 0;
                //DataTable dtInfotableUser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
                if (DtInfoTableuser.Rows.Count > 0)
                {
                    var drCallReg = DtInfoTableuser.Select("infotype=66").FirstOrDefault();
                    if (!(drCallReg == null))
                    {
                        status =Convert.ToInt32(df1.GetCellValue(drCallReg, "nameofinfo").ToString()?.Trim());
                    }
                }


                // dthash = GF1.AddItemToHashTable(dthash, "p_dealers", fc("P_dealers"), True)
                // dthash = GF1.AddItemToHashTable(dthash, "status", 2732, True)
                dthash = GF1.AddItemToHashTable(ref dthash, "status", status, true);
                dthash = GF1.AddItemToHashTable(ref dthash, "RegisterDate", df1.GetDateTimeISTNow(), true);
                dthash = GF1.AddItemToHashTable(ref dthash, "registeredby", "E", true);
                dthash = GF1.AddItemToHashTable(ref dthash, "P_Customers", fc["pcustomers"], true);
                dthash = GF1.AddItemToHashTable(ref dthash, "Firmname", fc["CustName"], true);
                dthash = GF1.AddItemToHashTable(ref dthash, "Contactperson", Fullname, true);
                dthash = GF1.AddItemToHashTable(ref dthash, "Source", "Employee Registered", true);
                dthash = GF1.AddItemToHashTable(ref dthash, "lastcalltime", df1.GetDateTimeISTNow(), true);
                dthash = GF1.AddItemToHashTable(ref dthash, "registeredby", "E", true);

                int argid = -1;
                int p_issuesfileGst = libCalls.InsertUpdateAllCallsReg(ref argid, ref dthash, sessionRow, SessionControl.UserServerDatabase);
                // 'CRM Tasks
                var dtHashCRM = new Hashtable();
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "CRMTasks_Key", -1);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "P_CRMTasks", -1);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "TaskTitle", fc["CustName"]);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "Tasktype", "S");
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "TaskDescription", fc["Issuedescription"]);

                int TaskInitialStatus = Convert.ToInt32(libSaralAuth.GetNameofInfoFromInfotableuserUsingInfoType(76, SessionControl.UserServerDatabase));
                //dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "Taskstatus", 3008);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "Taskstatus", TaskInitialStatus);

                //dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "Taskstatus", status, true);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "linktype", "C");
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "linkcode", p_issuesfileGst);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "startdate", df1.GetDateTimeISTNow());
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "under", 0);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "assignedto", sessionRow["Linkcode"]);
                dtHashCRM = GF1.AddItemToHashTable(ref dtHashCRM, "assignedtotype", sessionRow["Linktype"]);
                int argid1 = -1;
                int p_crmTasks = libCRMTasks.InsertUpdateCRMTasks(ref argid1, ref dtHashCRM, SessionControl.UserServerDatabase, sessionRow, cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? ""));

                string timestamp = df1.GetDateTimeISTNow().ToString("dd-MM-yyyy HH:mm tt");

                int noOfPendingCall = libCalls.GetPendingCallsCount(SessionControl.UserServerDatabase); // 14
                //string message = "Dear Sir/Mam. Your Call has been registered successfully at " + timestamp + ". Call Id: " + p_issuesfileGst + ". You are in queue at number " + noOfPendingCall + ". We will get back to you soon.Thank you -Team Saral";
                //string msg = "Dear Sir/Mam. Your Call has been registered successfully at " + timestamp + ". <br/> CallId: " + p_issuesfileGst + ". You are in queue at number " + noOfPendingCall + "<br/> We will get back to you soon.<br/>Thank you Team Saral.";

                // Dim dtmsg1 As DataTable = cfc1.CreateMsgQueueDt("M", message, "", fc("Mobileno"), "", "N")
                // cfc1.InsertIntoMsgQueue(dtmsg1, sessionRow, Session("ServerDatabase"))
                string email = fc["EmailId"];
                // msg = msg & Chr(201) & "Call Registered at SARAL"
                // Dim dtmsg As DataTable = cfc1.CreateMsgQueueDt("E", msg, "", email, "", "N")
                // cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, Session("ServerDatabase"))

                string templateText = libSaralAuth.GetMsgTemplateTextByTemplateType(3180, SessionControl.UserServerDatabase);
                Hashtable varHash = new Hashtable();
                varHash = GF1.AddItemToHashTable(ref varHash, "callid", p_issuesfileGst);
                varHash = GF1.AddItemToHashTable(ref varHash, "timestamp", timestamp);
                varHash = GF1.AddItemToHashTable(ref varHash, "noOfPendingCall", noOfPendingCall);
                string message = cfc1.evaluateVariable(templateText, varHash);

                //cfc1.SendMsg(fc["Mobileno"], message);
                CancellationTokenSource cts = new CancellationTokenSource();
                cts.CancelAfter(30000);  //Cancel Task after 30 seconds
                try
                {
                    await cfc1.SendMsg_oldAsync(fc["Mobileno"], message, cts.Token);
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
                // If NotIssueint > 0 Then
                // Dim NotIssue As String = cfc1.GetNameOfInfoFromInfotable(NotIssueint, Session("infotable"))
                // If NotIssue = "" And IssueD = "" Then
                // message = "Call Registered: Firm Name-" & Firm
                // ElseIf NotIssue = "" Then
                // message = "Call Registered: Firm Name-" & Firm & " Issue Description-" & IssueD
                // ElseIf IssueD = "" Then
                // message = "Call Registered: Firm Name-" & Firm & " Issue Type-" & NotIssue
                // Else
                // message = "Call Registered: Firm Name-" & Firm & " Issue Type-" & NotIssue & " Issue Description-" & IssueD
                // End If
                // '   EmpIdsList = libEmployee.GetEmpIds("C")

                // Dim AvailTokenEmpList As New List(Of Integer)
                // EmpIdsList = libEmployee.getEmpIdsFromEmpType("C")
                // Dim TokenList As New List(Of String)
                // For j = 0 To EmpIdsList.Count - 1
                // Dim token As String = libEmployee.getTokenFromEmpId(EmpIdsList(j))
                // If token <> "" Then
                // AvailTokenEmpList.Add(EmpIdsList(j))
                // TokenList.Add(token)
                // End If
                // Next
                // Dim result As Boolean = libMobileNotification.SendDynamicGroupNotification(TokenList, AvailTokenEmpList, Groupkeyname, Title, message, sessionRow("LinkType"), sessionRow("Linkcode"))
                // End If

            }
            return RedirectToAction("index", new { P_Customers = fc["pcustomers"] });
        }

        /// <summary>
        /// Action to show index view in browser.
        /// </summary>
        /// <returns></returns>
        public ActionResult CallDashboard(int? CallId)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");
            
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                TempData["CallId"] = CallId;
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Action to show index view in browser.
        /// </summary>
        /// <returns></returns>
        public ActionResult LeadCallDashboard(int? CallId)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                TempData["CallId"] = CallId;
                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// ajax function to get the data of a call according to P_issuesfilegst.
        /// </summary>
        /// <param name="CallId">P_issuesfilegst</param>       
        /// <returns></returns>
        public JsonResult SearchCallDetails(int? CallId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                string jsondata = "False";
                string issuesfilegstRowStr = "";
                string callfreqRowStr = "";
                string CrmcommunicationRowStr = "";
                string CrmcollabratorRowStr = "";
                string regcallinfostr = "";
                string assignedcallinfostr = "";
                var resdt = new DataTable();
                var Isseurow = libCalls.getCallRowfromP_allcallsreg(Convert.ToInt32(CallId), SessionControl.UserServerDatabase, "Firmname,Issuetype,Issuedescription,P_Customers,Mobileno");
                resdt = Isseurow.Table;
                if (resdt is not null)
                {
                    resdt = df1.AddColumnsInDataTable(ref resdt, "Issuetypetext,Assignedtotext", "system.string,system.string");
                    var taskrow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode("C", Convert.ToInt32(CallId), SessionControl.UserServerDatabase, "Assignedto");
                    var accmasterrow = libSaralAuth.getAccMasterRowForp_acccode(Convert.ToInt32(df1.GetCellValue(taskrow, "Assignedto", "Integer")), SessionControl.UserServerDatabase, "AccName");
                    resdt.Rows[0]["Issuetypetext"] = cfc1.GetNameOfInfoFromInfotableFromP_infotable(Convert.ToInt32(df1.GetCellValue(Isseurow, "Issuetype", "Integer")), SessionControl.UserServerDatabase);
                    resdt.Rows[0]["Assignedtotext"] = df1.GetCellValue(accmasterrow, "AccName", "String");
                    issuesfilegstRowStr = JsonConvert.SerializeObject(df1.AlterDataTable(ref resdt, "", "Issuetype"));
                }
                var callsrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(CallId), "C", SessionControl.UserServerDatabase, "calltime,Mobileno,callduration,calltype");
                if (callsrow is not null)
                {
                    resdt = callsrow.Table;
                    resdt = df1.AddColumnsInDataTable(ref resdt, "frmtCallTime", "system.string");
                    DateTime calltime = Convert.ToDateTime(df1.GetCellValue(resdt.Rows[0], "calltime"));
                    resdt.Rows[0]["frmtCallTime"] = calltime.ToString("dd-MM-yyyy hh:mm tt");
                    callfreqRowStr = JsonConvert.SerializeObject(resdt);
                }

                resdt = libCRMTasks.GetTaskCollaboratorsByTaskId(Convert.ToInt32(CallId), SessionControl.UserServerDatabase);
                CrmcollabratorRowStr = JsonConvert.SerializeObject(df1.AlterDataTable(ref resdt, "", "CRMCollaborator_key,P_CRMCollaborator,RowStatus,LinkType,LinkCode,P_Employee,Websessions_key,timestamp,logintype"));
                jsondata = issuesfilegstRowStr + "|" + callfreqRowStr + "|" + CrmcollabratorRowStr;

                return Json(jsondata);
            }
            return Json("logout");
        }


        /// <summary>
        /// ajax function to get all the remarks of a call.
        /// </summary>
        /// <param name="CallId">P_issuesfilegst</param>       
        /// <returns></returns>
        public JsonResult GetRemarkDataofACall(int? CallId, string calltype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");
            
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                string CrmcommunicationRowStr = "False";
                var taskRow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode(calltype.ToString().Trim(), Convert.ToInt32(CallId), SessionControl.UserServerDatabase, "p_crmtasks");
                var resdt = libCRMTasks.GetRemarkDataOfATask(Convert.ToInt32(df1.GetCellValue(taskRow, "p_crmtasks", "integer")), SessionControl.UserServerDatabase);
                CrmcommunicationRowStr = JsonConvert.SerializeObject(df1.AlterDataTable(ref resdt, "", "CRMCommunication_key,P_CRMCommunication,Rowstatus,LinkType,LinkCode,CreationDate,Websessions_key,logintype,logincode,communicationtype,LinkURL"));
                return Json(CrmcommunicationRowStr);
            }
            return Json("logout");
        }

        /// <summary>
        /// ajax function to get the all the previous call data of a call.
        /// </summary>
        /// <param name="CallId">P_issuesfilegst</param>       
        /// <returns></returns>
        public JsonResult GetAssignedHistoryOfCall(int? CallId, string calltype)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                string assignedcallinfostr = "False";
                var resdt = new DataTable();
                resdt = libCalls.getAssignedtoDataFromP_allcallsregLinktype(Convert.ToInt32(CallId), calltype.ToString().Trim(), SessionControl.UserServerDatabase, "Assignedto,mtimestamp");
                resdt = df1.AddColumnsInDataTable(ref resdt, "frmtStartDate", "system.string");
                for (int i = 0, loopTo = resdt.Rows.Count - 1; i <= loopTo; i++)
                {
                    DateTime StartDate = Convert.ToDateTime(df1.GetCellValue(resdt.Rows[i], "mtimestamp"));
                    resdt.Rows[i]["frmtStartDate"] = StartDate.ToString("dd-MM-yyyy hh:mm tt");
                }
                assignedcallinfostr = JsonConvert.SerializeObject(resdt);
                return Json(assignedcallinfostr);
            }
            return Json("logout");
        }

        /// <summary>
        /// ajax function to get the all the previous engageStatus data of a call.
        /// </summary>
        /// <param name="CallId">P_issuesfilegst</param>       
        /// <returns></returns>
        public JsonResult GetCallEngagedStatusHistoryOfCall(int? CallId)
        {

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                string callengagestatusinfostr = "False";
                var resdt = new DataTable();
                resdt = libCalls.getAllcallengagedStatusforp_issuesfilegst(Convert.ToInt32(CallId),SessionControl.UserServerDatabase, "logincode,starttime,engagestatus");
                //resdt = df1.AddingNameForCodesPrimaryColsInfotable(resdt, "engagestatus", "txtengageStatus", DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), "NameOfInfo");
                resdt = df1.AddingNameForCodesPrimaryColsInfotable(resdt, "engagestatus", "txtengageStatus",DtInfoTable, DtInfoTableuser, "NameOfInfo");
                resdt = df1.AddColumnsInDataTable(ref resdt, "frmtStartime,LoginName", "system.string,System.String");
                if (resdt is not null)
                {
                    for (int i = 0, loopTo = resdt.Rows.Count - 1; i <= loopTo; i++)
                    {
                        DateTime StartDate = Convert.ToDateTime(df1.GetCellValue(resdt.Rows[i], "Starttime"));
                        resdt.Rows[i]["frmtStartime"] = StartDate.ToString("dd-MM-yyyy hh:mm tt");
                        var LoginName = libSaralAuth.getAccMasterRowForp_acccode(Convert.ToInt32(df1.GetCellValue(resdt.Rows[i], "logincode")),SessionControl.UserServerDatabase, "AccName");
                        resdt.Rows[i]["LoginName"] = LoginName["AccName"];
                    }
                    callengagestatusinfostr = JsonConvert.SerializeObject(resdt);
                    return Json(callengagestatusinfostr);
                }
                return Json(callengagestatusinfostr);
            }
            return Json("logout");
        }


        /// <summary>
        /// ajax function to get the data of a customer according to Column and its value provided.
        /// </summary>
        /// <param name="CallId">P_AllCallsReg</param>       
        /// <returns></returns>
        public JsonResult GetPreviousCallDetails(int? CallId, string calltype)
        {

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                string regcallinfostr = "False";
                var resdt = new DataTable();
                var Isseurow = libCalls.getCallRowfromP_allcallsreg(Convert.ToInt32(CallId), SessionControl.UserServerDatabase, "Firmname,Issuetype,Issuedescription,P_Customers");
                //resdt = libCalls.GetCallData(Convert.ToInt32(df1.GetCellValue(Isseurow, "P_Customers", "Integer")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                resdt = libCalls.GetCallData(Convert.ToInt32(df1.GetCellValue(Isseurow, "P_Customers", "Integer")), DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                resdt = df1.AddColumnsInDataTable(ref resdt, "frmtRegisterDate", "system.string");
                for (int i = 0, loopTo = resdt.Rows.Count - 1; i <= loopTo; i++)
                {
                    DateTime RegisterDate = Convert.ToDateTime(df1.GetCellValue(resdt.Rows[i], "RegisterDate"));
                    resdt.Rows[i]["frmtRegisterDate"] = RegisterDate.ToString("dd-MM-yyyy hh:mm tt");
                }
                regcallinfostr = JsonConvert.SerializeObject(df1.AlterDataTable(ref resdt, "", "AllCallsReg_key,RowStatus,Emailid,Businesstype,Issuetype,UploadfileName,Status,modifiedby,RemarkSaral,PriorityOrder,RegisterDate,P_Customers,Websessions_key,OnsiteCount,registeredby,p_dealers,source,FrmtCreationDate,Firmname,Contactperson,Mobileno,Location,TextBusinessType"));
                return Json(regcallinfostr);
            }
            return Json("logout");
        }

        // Added by aslam
        public JsonResult GetBussinessType()
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "select P_InfoTable,NameOfInfo from infotable where infotype=7 order by NameOfInfo");
            var datatableData = new DataTypeConversionLib.DTResult<InfotableMaster>();
            datatableData = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt);
            return Json(datatableData);
        }

        public JsonResult GetIssueType()
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "select P_InfoTable,NameOfInfo from infotable where infotype=38");
            var datatableData = new DataTypeConversionLib.DTResult<InfotableMaster>();
            datatableData = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt);
            return Json(datatableData);
        }

        public JsonResult GetIssueStatus()
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "select P_InfoTable,NameOfInfo from infotable where infotype=39 order by NameOfInfo");
            var datatableData = new DataTypeConversionLib.DTResult<InfotableMaster>();
            datatableData = (DataTypeConversionLib.DTResult<InfotableMaster>)DCLib.ConvertDTtoModal<InfotableMaster>(dt);
            return Json(datatableData);
        }

        /// <summary>
        /// ajax function to get the data of a call according to P_issuesfilegst.
        /// </summary>
        /// <param name="CallId">P_issuesfilegst</param>       
        /// <returns></returns>
        public JsonResult SearchLeadCallDetails(int? CallId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                string jsondata = "False";
                string crmleadRowStr = "";
                string callfreqRowStr = "";
                string CrmcommunicationRowStr = "";
                string CrmcollabratorRowStr = "";
                string regcallinfostr = "";
                string assignedcallinfostr = "";
                var taskId = default(int);
                var resdt = new DataTable();
                var Leadrow = libCalls.getCallRowfromP_crmlead(Convert.ToInt32(CallId),SessionControl.UserServerDatabase, "Topic,Contactperson,Businesstype,AccountCode,Mobileno,email");
                resdt = Leadrow.Table;
                if (resdt is not null)
                {
                    resdt = df1.AddColumnsInDataTable(ref resdt, "BusinesstypeText,Assignedtotext,AccountName", "system.string,system.string,system.string");
                    var taskrow = libCRMTasks.GetTasksRowFromLinkTypeLinkCode("L", Convert.ToInt32(CallId),SessionControl.UserServerDatabase, "Assignedto");
                    taskId = Convert.ToInt32(df1.GetCellValue(taskrow, "P_crmtasks", "Integer"));
                    var accmasterrow = libSaralAuth.getAccMasterRowForp_acccode(Convert.ToInt32(df1.GetCellValue(taskrow, "Assignedto", "Integer")),SessionControl.UserServerDatabase, "AccName");
                    resdt.Rows[0]["BusinesstypeText"] = cfc1.GetNameOfInfoFromInfotableFromP_infotable(Convert.ToInt32(df1.GetCellValue(Leadrow, "Businesstype", "Integer")),SessionControl.UserServerDatabase);
                    resdt.Rows[0]["Assignedtotext"] = df1.GetCellValue(accmasterrow, "AccName", "String");
                    var accountRow = libCalls.getCRMAccountRowFromP_CRMAccounts(Convert.ToInt32(df1.GetCellValue(resdt.Rows[0], "AccountCode", "Integer")),SessionControl.UserServerDatabase, "AccountName");
                    if (accountRow is not null)
                        resdt.Rows[0]["AccountName"] = accountRow["AccountName"];
                    else
                        resdt.Rows[0]["AccountName"] = "N/A";
                    crmleadRowStr = JsonConvert.SerializeObject(df1.AlterDataTable(ref resdt, "", "Businesstype,AccountCode"));

                }
                var callsrow = libCalls.getLastcallFreqrowFromP_allcallsreg(Convert.ToInt32(CallId), "L",SessionControl.UserServerDatabase, "calltime,Mobileno,callduration,calltype");
                if (callsrow is not null)
                {
                    resdt = callsrow.Table;
                    resdt = df1.AddColumnsInDataTable(ref resdt, "frmtCallTime", "system.string");
                    DateTime calltime = Convert.ToDateTime(df1.GetCellValue(resdt.Rows[0], "calltime"));
                    resdt.Rows[0]["frmtCallTime"] = calltime.ToString("dd-MM-yyyy hh:mm tt");
                    callfreqRowStr = JsonConvert.SerializeObject(resdt);
                }

                resdt = libCRMTasks.GetTaskCollaboratorsByTaskId(taskId,SessionControl.UserServerDatabase);
                CrmcollabratorRowStr = JsonConvert.SerializeObject(df1.AlterDataTable(ref resdt, "", "CRMCollaborator_key,P_CRMCollaborator,RowStatus,LinkType,LinkCode,P_Employee,Websessions_key,timestamp,logintype"));
                jsondata = crmleadRowStr + "|" + callfreqRowStr + "|" + CrmcollabratorRowStr;

                return Json(jsondata);
            }
            return Json("logout");
        }

        /// <summary>
        /// ajax function to get the data of a customer according to Column and its value provided.
        /// </summary>
        /// <param name="CallId">P_crmlead</param>       
        /// <returns></returns>
        public JsonResult GetPreviousLeadCallDetails(int? CallId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {

                string regcallinfostr = "False";
                var resdt = new DataTable();
                var leadrow = libCalls.getCallRowfromP_crmlead(Convert.ToInt32(CallId),SessionControl.UserServerDatabase, "Topic,Contactperson,Businesstype,AccountCode,Mobileno,email");
                //resdt = libCalls.getleadcalldata(Convert.ToInt32(df1.GetCellValue(leadrow, "AccountCode", "Integer")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase);
                resdt = libCalls.getleadcalldata(Convert.ToInt32(df1.GetCellValue(leadrow, "AccountCode", "Integer")), DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase);
                resdt = df1.AddColumnsInDataTable(ref resdt, "frmtRegisterDate", "system.string");
                for (int i = 0, loopTo = resdt.Rows.Count - 1; i <= loopTo; i++)
                {
                    DateTime RegisterDate = Convert.ToDateTime(df1.GetCellValue(resdt.Rows[i], "RegisterDate"));
                    resdt.Rows[i]["frmtRegisterDate"] = RegisterDate.ToString("dd-MM-yyyy hh:mm tt");
                }
                regcallinfostr = JsonConvert.SerializeObject(resdt);
                return Json(regcallinfostr);
            }
            return Json("logout");
        }


        /// <summary>
        /// EditRegCallsJson get function on Call Dashboard 
        /// </summary>
        /// <param name="P_issue"></param>  
        /// <returns></returns>
        public JsonResult EditRegCallsJson(int P_issue)
        {

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                var RegCalls = new RegCalls();
                var dtIssue = libCalls.getCallRowfromP_allcallsreg(P_issue, SessionControl.UserServerDatabase);
                RegCalls = DCLib.GetModelFromDataRow<RegCalls>(dtIssue);

                // If RegCalls.FileName = "" Then
                // RegCalls.FileName = "None"
                // End If
                if ((object)RegCalls.Creationdate is DBNull == false)
                {
                    RegCalls.FrmtCreationdate = RegCalls.Creationdate.ToString("dd/MM/yyyy hh:mm:ss tt");
                }
                else
                {
                    RegCalls.FrmtCreationdate = "";
                }
                // If IsDBNull(RegCalls.registerdate) = False Then
                // RegCalls.FrmtRegisterdate = RegCalls.registerdate.ToString("dd/MM/yyyy hh:mm:ss tt")
                // Else
                // RegCalls.FrmtRegisterdate = ""
                // End If

                return Json(RegCalls);
            }
            return Json("logout");
        }


        /// <summary>
        /// SubmitEditRegCalls Post function on Call Dashboard when submit Call Edit form
        /// </summary>
        /// <param name="mRegCalls"></param>  
        /// <returns></returns>
        public JsonResult SubmitEditRegCalls(RegCalls mRegCalls, IFormCollection fc)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("logout");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("logout");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "CallDashboard", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                mRegCalls.modifiedby = Convert.ToInt32(sessionRow["linkcode"]);
                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                bool StatusClosed = false;
                string? settingsstring = df1.GetCellValue(libSaralAuth.getUserSettingsRowFromUserLogin_key(Convert.ToInt32(LoginRow["Userlogin_key"]), SessionControl.UserServerDatabase), "settingsstring", "string").ToString();
                string AllowCloseCallWithoutLinkingCustomer = "";
                if (!string.IsNullOrEmpty(settingsstring))
                    AllowCloseCallWithoutLinkingCustomer = libSaralAuth.GetPropertyValfromSettingsString(settingsstring, "AllowCloseCallWithoutLinkingCustomer");

                int status = 0;
                //DataTable dtinfotableuser = DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser"));
                if (DtInfoTableuser.Rows.Count > 0)
                {
                    var drWorkFlowStatus = DtInfoTableuser.Select("infotype=67").FirstOrDefault();
                    if (!(drWorkFlowStatus is null))
                        status = Convert.ToInt32(df1.GetCellValue(drWorkFlowStatus, "nameofinfo", "integer"));

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
                                    return Json("customerError");
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
                                    return Json("customerError");
                                }
                                else
                                {
                                    StatusClosed = true;
                                }

                                break;
                            }
                    }
                }

                // If mRegCalls.Status <> 0 And mRegCalls.Status >= 2735 And mRegCalls.Status < 2737 Then
                // If mRegCalls.P_Customers = -1 Or mRegCalls.P_Customers = 0 Then
                // 'TempData("Message") = "Call Is Not linked To customer, please link customer , then close the call."
                // Return Json("customerError")
                // Else
                // StatusClosed = True
                // End If
                // End If
                DataRow? dtr = null;

                var dtIssue = libCalls.getCallRowfromP_allcallsreg(mRegCalls.P_AllCallsReg, SessionControl.UserServerDatabase, "creationdate,registerdate");
                mRegCalls.Creationdate = Convert.ToDateTime(df1.GetCellValue(dtIssue, "creationdate"));
                mRegCalls.registerdate = Convert.ToDateTime(df1.GetCellValue(dtIssue, "registerdate"));

                if (StatusClosed == true)
                {
                    var ts = mRegCalls.Creationdate - mRegCalls.registerdate;
                    int duration = (int)Math.Round(ts.TotalSeconds);
                    mRegCalls.duration = duration;
                    mRegCalls.modifiedby = Convert.ToInt32(df1.GetCellValue(sessionRow, "linkcode", "integer"));
                }

                dtr = DCLib.GetDataRowFromModel<RegCalls>(mRegCalls);
                var dthash = new Hashtable();
                dthash = GF1.CreateHashTable(dtr);
                dthash = GF1.AddItemToHashTable(ref dthash, "IssueType", fc["IssueType"], true);
                dthash = GF1.AddItemToHashTable(ref dthash, "Businesstype", fc["Buss"], true);

                int argid = mRegCalls.P_AllCallsReg;
                libCalls.InsertUpdateAllCallsReg(ref argid, ref dthash, sessionRow, SessionControl.UserServerDatabase);
                mRegCalls.P_AllCallsReg = argid;

                if (StatusClosed == true)
                {
                    DataRow dttasks = (DataRow)libCRMTasks.GetActiveTaskRowForAParticularCall(mRegCalls.P_AllCallsReg, SessionControl.UserServerDatabase, "crmtasks_key");
                    if (!(dttasks is null))
                        libCRMTasks.TaskClose(Convert.ToInt32(dttasks["crmtasks_key"]), sessionRow, SessionControl.UserServerDatabase);
                    

                    string email = mRegCalls.Emailid;

                    //string msg = "Dear " + mRegCalls.Contactperson + ", " + mRegCalls.Firmname + "  Your call registered at Saral";
                    //string Message = "Dear " + mRegCalls.Contactperson + ", " + mRegCalls.Firmname + "<br/><br/>Your call registered at Saral";
                    //if (!string.IsNullOrEmpty(mRegCalls.Issuedescription))
                    //{
                    //    Message += " regarding the issue \" " + mRegCalls.Issuedescription + " \"";
                    //    msg += " regarding the issue  \" " + mRegCalls.Issuedescription + " \"";
                    //}
                    //Message += " has been marked completed and is closed from our end.<br/>In case you are not satisfied with the resolution, kindly mail at nehagupta@saralerp.com, hcgupta@saralerp.com<br/><br/><br/>Regards<br/>Saral Team<br/>Customer Care";
                    //msg += @" has been marked completed and is closed from our end. In case you are not satisfied with the resolution, kindly mail at nehagupta@saralerp.com, hcgupta@saralerp.com
                    //'Thanks
                    //'Saral Team";

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
                       // Message = Message + Convert.ToChar(201) + "Notification: Call closed at Saral";
                        //var dtmsg = cfc1.CreateMsgQueueDt("E", Message, "", email, "", "N");
                        var dtmsg = cfc1.CreateMsgQueueDt("E", msg, "", email, "", "N");
                        cfc1.InsertIntoMsgQueue(dtmsg, sessionRow, SessionControl.UserServerDatabase);
                    }
                }
                return Json("");
            }
            return Json("logout");
        }

        /// <summary>
        /// ajax function to get chargingitems data of customers from P_ChargingHeader 
        /// </summary>
        /// <param name="HeaderNo">P_ChrgingHeader of the selected Row</param>
        /// <returns>datatableData model object containing List of data in json format.</returns>
        public JsonResult ChargingItemsbyChargingHeader(int? HeaderNo)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("Error");
            }
            if (HeaderNo is not null)
            {
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                DataTable dt = libcustomerfeature.GetChargingItemsbyChargingHeader(Convert.ToInt32(HeaderNo), DtInfoTable,SessionControl.MainServerDatabase);
                if (dt is not null && dt.Rows.Count > 0)
                {
                    var datatableData = new DataTypeConversionLib.DTResult<ChargingItemMaster>();
                    datatableData = (DataTypeConversionLib.DTResult<ChargingItemMaster>)DCLib.ConvertDTtoModal<ChargingItemMaster>(dt, 0, dt.Rows.Count, dt.Rows.Count);
                    return Json(datatableData);
                }
            }
            return Json("Error");
        }










    }
}
