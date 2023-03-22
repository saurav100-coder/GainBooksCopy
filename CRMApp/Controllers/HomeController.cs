using CRMApp.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections;
using System.Data;
using System.Diagnostics;
using System.Net;
using System.Text;

namespace CRMApp.Controllers
{
    public class HomeController : Controller
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
        private GlobalFunction1.GlobalFunction1 GF1
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
        private object? _LibSaralAuthLib = null;
        private SaralAuthLib.LoginFunctions LibSaralAuthLib
        {
            get
            {
                if (_LibSaralAuthLib is null)
                {
                    var argSessionInstance = SessionControl;
                    _LibSaralAuthLib = new SaralAuthLib.LoginFunctions(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _LibSaralAuthLib = (SaralAuthLib.LoginFunctions)_LibSaralAuthLib;
                }
                return (SaralAuthLib.LoginFunctions)_LibSaralAuthLib;
            }
        }
        private object? _CFC1 = null;
        private CommonFunctionsCloud.CommonFunctionsCloud CFC1
        {
            get
            {
                if (_CFC1 is null)
                {
                    var argSessionInstance = SessionControl;
                    _CFC1 = new CommonFunctionsCloud.CommonFunctionsCloud(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _CFC1 = (CommonFunctionsCloud.CommonFunctionsCloud)_CFC1;
                }
                return (CommonFunctionsCloud.CommonFunctionsCloud)_CFC1;
            }
        }

        private GoggleApiFunction.Class1 gflib = new GoggleApiFunction.Class1();


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
            GF1.SessionControl = sessionControl;
            df1.SessionControl = sessionControl;
            LibSaralAuthLib.SessionControl = sessionControl;
            CFC1.SessionControl = sessionControl;
        }


        public IActionResult Login()
        {
            //  WriteToFile(Usertype, logfile);
         //   SetSessionControlUsingCoprid("neha8591");

            if (!(SessionControl == null))
            {
                SessionControl.StackTraceList.Clear();
                SessionControl.ParamValues.Clear();
            }
              
            HttpContext.Session.Clear();

         //   SetSessionControlUsingCoprid("neha8591");

            var userLoginObj = new UserLoginTable();
            return View(userLoginObj);
        }

        private void WriteToFile(string text, string FilePath)
        {
            using (var writer = new StreamWriter(FilePath, true))
            {
                writer.WriteLine(string.Format(text, DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt")));
                writer.Close();
            }
        }

        /// <summary>
        /// check login credentials.If Login is successful then send user to respective dashboard
        /// </summary>
        /// <param name="fc"></param>
        /// <param name="userLoginObj"></param>
        /// <returns></returns>
        [HttpPost()]
        public ActionResult Login(IFormCollection fc, UserLoginTable userLoginObj)
        {
            string Usertype = fc["UserType"];
            HttpContext.Session.SetString("devicetype", fc["deviceType"]);
            int mainbusscode = 0;
            string returnurl = "";
            DataRow dtuserlogin;
            string logfile = MyServer.MapPath("App_data/logFile.txt");
            WriteToFile(Usertype,logfile);
            if (!(Usertype.ToUpper() == "B"))
            {
                SetSessionControlUsingCoprid(userLoginObj.userid);
                dtuserlogin = LibSaralAuthLib.UserExist(userLoginObj.userid, "0_srv_0.3_mdf_3");
            }
            else
            {
                SetSessionControlUsingCoprid(userLoginObj.Corpid);
                dtuserlogin = LibSaralAuthLib.UserExist(userLoginObj.Corpid, "0_srv_0.3_mdf_3");
            }

            DataRow custrow = LibSaralAuthLib.getCustomerRowForUserLogin(dtuserlogin, "0_srv_0.3_mdf_3", "mainbusscode");
            mainbusscode = Convert.ToInt32(df1.GetCellValue(custrow, "mainbusscode", "integer"));
            
            if (dtuserlogin is null)
            {
                ModelState.AddModelError("", "Login details are wrong.");
                ViewBag.Message = "Login details are wrong.Please enter correct values";
                return View(userLoginObj);
            }

            string? usertype1 = df1.GetCellValue(dtuserlogin, "prevlogintype", "string").ToString();
            if (Usertype != usertype1)
            {
                ModelState.AddModelError("", "Account type is wrong.");
                ViewBag.Message = "Account type is wrong.Please select correct value";
                return View(userLoginObj);
            }

            bool firstTimelogin = false;
            switch (usertype1)
            {
                case "I":
                    {
                        if (userLoginObj.Password.ToString().Trim() == dtuserlogin["pwd"].ToString()?.Trim())
                        {
                            DataRow dtdbcustconfig = LibSaralAuthLib.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), "0_srv_0.3_mdf_3");
                            if (dtdbcustconfig is not null)
                            {
                                SessionControl.DataFolderServerPhysicalPath = SessionControl.DataFolderServerPhysicalPath + df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + "\\";
                                string RegfolderPath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\").Replace(@"sites\gainbooks.com", "gainbooksdata");
                                string recordingpath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\recording\").Replace(@"sites\gainbooks.com", "gainbooksdata");
                                string invoicepath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\invoices\").Replace(@"sites\gainbooks.com", "gainbooksdata");
                                string documentpath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\documents\").Replace(@"sites\gainbooks.com", "gainbooksdata");
                                string employeepath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\employees\").Replace(@"sites\gainbooks.com", "gainbooksdata");
                                string mastrerspath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\masters\").Replace(@"sites\gainbooks.com", "gainbooksdata");


                                if (!Directory.Exists(RegfolderPath))
                                    Directory.CreateDirectory(RegfolderPath);

                                if (!Directory.Exists(recordingpath))
                                    Directory.CreateDirectory(recordingpath);

                                if (!Directory.Exists(invoicepath))
                                    Directory.CreateDirectory(invoicepath);

                                if (!Directory.Exists(documentpath))
                                    Directory.CreateDirectory(documentpath);

                                if (!Directory.Exists(employeepath))
                                    Directory.CreateDirectory(employeepath);

                                if (!Directory.Exists(mastrerspath))
                                    Directory.CreateDirectory(mastrerspath);

                                if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                                {
                                    var argHashTableControl = SessionControl.MDFFiles;
                                    SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                                    SessionControl.MDFFiles = argHashTableControl;
                                    SessionControl.userid1_mdf_1 = "TEST7981";
                                    SessionControl.pwd1_mdf_1 = "TEST7981";
                                    LibSaralAuthLib.SessionControl = SessionControl;
                                    df1.SessionControl = SessionControl;
                                }
                                else
                                {
                                    var argHashTableControl1 = SessionControl.MDFFiles;
                                    SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                                    SessionControl.MDFFiles = argHashTableControl1;
                                    SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                                    SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                                    LibSaralAuthLib.SessionControl = SessionControl;
                                    df1.SessionControl = SessionControl;
                                }
                            }

                            HttpContext.Session.SetString("serverdatabase", "0_srv_0.1_mdf_1");
                            DataRow dtuserlogin1 = LibSaralAuthLib.UserExist(userLoginObj.userid, SessionControl.UserServerDatabase);
                            if (dtuserlogin1 is null)
                            {
                                ModelState.AddModelError("", "Login details are wrong.");
                                ViewBag.Message = "Login details are wrong.Please enter correct details";
                                return View(userLoginObj);
                            }

                            if (userLoginObj.Password.ToString().Trim()  == dtuserlogin1["pwd"].ToString()?.Trim() )
                            {
                                DataRow drWebsession = df1.SeekRecord(SessionControl.UserServerDatabase, "websessions", "linkcode", Convert.ToInt32(dtuserlogin1["linkcode"]),false, "websessions_key");
                                if (drWebsession == null)
                                    firstTimelogin = true;

                                HttpContext.Session.SetInt32("userloginkey_saralweb", Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));
                                DataRow? mAccMaster = null;
                                HttpContext.Session.SetString("userloginrow", CFC1.DataRowToCSV(dtuserlogin1));
                                HttpContext.Session.SetString("saralloginrow", CFC1.DataRowToCSV(dtuserlogin));
                               
                                mAccMaster = df1.getRowFromP_value(SessionControl.UserServerDatabase, "accmaster", "*", "P_acccode", Convert.ToInt32(dtuserlogin1["linkcode"]));
                                HttpContext.Session.SetString("accmasterrow", CFC1.DataRowToCSV(mAccMaster));
                                HttpContext.Session.SetString("loginname", mAccMaster["accname"].ToString()?.Trim() ?? "");
                                HttpContext.Session.SetString("corpid", df1.GetCellValue(dtuserlogin, "userid", "string").ToString()?.Trim() ?? "");
                                HttpContext.Session.SetString("userid", df1.GetCellValue(dtuserlogin1, "userid", "string").ToString()?.Trim() ?? "");


                                string ip = ""; //getIPAddress();
                                var mwebsessions1 = LibSaralAuthLib.CreateWebSessionRow(dtuserlogin1, ip, "", SessionControl.UserServerDatabase);
                                HttpContext.Session.SetString("websessionrow", CFC1.DataRowToCSV(mwebsessions1));
                                HttpContext.Session.SetInt32("key", Convert.ToInt32(mwebsessions1["websessions_key"]));

                                string authkey = LibSaralAuthLib.GenerateAuthKey(dtuserlogin1, userLoginObj.userid, HttpContext.Session.GetInt32("key").ToString(), "W", SessionControl.UserServerDatabase);                                
                                HttpContext.Session.SetString("authkey", authkey);
                                string menuJson = LibSaralAuthLib.getWebMenuJsonFromUserLoginKey(Convert.ToInt32(dtuserlogin1["userlogin_key"]), SessionControl.UserServerDatabase);
                                HttpContext.Session.SetString("menujson", menuJson);

                                string homeMenuJson = LibSaralAuthLib.GetHomeMenuJsonFromUserLoginKey(Convert.ToInt32(dtuserlogin1["userlogin_key"]), SessionControl.UserServerDatabase);
                                HttpContext.Session.SetString("homemenujson", homeMenuJson);
                            }
                            else
                            {
                                ModelState.AddModelError("", "Login details are wrong.");
                                ViewBag.Message = "Login details are wrong.Please enter correct details";
                                return View(userLoginObj);
                            }
                        }

                        if (Request.Cookies["userlogin_key"] is null)
                        {
                            //var SessionKey = new HttpCookie("UserLogin_key");
                            //SessionKey.Value = Conversions.ToString(dtuserlogin["userlogin_key"]);
                            //SessionKey.HttpOnly = true;
                            //SessionKey.Domain = "www.gainbooks.com";
                            //SessionKey.Expires = DateTime.Today.AddMonths(1);
                            //SessionKey.Path = "/";
                            //Response.Cookies.Add(SessionKey);
                            CookieOptions option =new CookieOptions();
                            option.HttpOnly = true;
                            option.Domain = "www.gainbooks.com";
                            option.Expires = DateTime.Today.AddMonths(1);
                            option.Path = "/";
                            Response.Cookies.Append("userlogin_key", dtuserlogin["userlogin_key"].ToString()??"",option);
                        }
                        break;
                    }


                case "B":
                    {
                        DataRow dtdbcustconfig = LibSaralAuthLib.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), "0_srv_0.3_mdf_3");
                        WriteToFile(df1.GetCellValue(dtdbcustconfig, "userid","string").ToString()?? "null", logfile);
                        if (dtdbcustconfig is not null)
                        {
                            SessionControl.DataFolderServerPhysicalPath = SessionControl.DataFolderServerPhysicalPath + df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + "\\";
                            string RegfolderPath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\").Replace(@"sites\gainbooks.com", "gainbooksdata");
                            string recordingpath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\recording\").Replace(@"sites\gainbooks.com", "gainbooksdata");
                            string invoicepath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\invoices\").Replace(@"sites\gainbooks.com", "gainbooksdata");
                            string documentpath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\documents\").Replace(@"sites\gainbooks.com", "gainbooksdata");
                            string employeepath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\employees\").Replace(@"sites\gainbooks.com", "gainbooksdata");
                            string mastrerspath = MyServer.MapPath(df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim() + @"\masters\").Replace(@"sites\gainbooks.com", "gainbooksdata");

                            if (!Directory.Exists(RegfolderPath))
                                Directory.CreateDirectory(RegfolderPath);

                            if (!Directory.Exists(recordingpath))
                                Directory.CreateDirectory(recordingpath);

                            if (!Directory.Exists(invoicepath))
                                Directory.CreateDirectory(invoicepath);

                            if (!Directory.Exists(documentpath))
                                Directory.CreateDirectory(documentpath);

                            if (!Directory.Exists(employeepath))
                                Directory.CreateDirectory(employeepath);

                            if (!Directory.Exists(mastrerspath))
                                Directory.CreateDirectory(mastrerspath);

                            if (HttpContext.Request.Host.ToString().ToLower().Contains("xdemo"))
                            {
                                var argHashTableControl = SessionControl.MDFFiles;
                                SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                                SessionControl.MDFFiles = argHashTableControl;
                                SessionControl.userid1_mdf_1 = "TEST7981";
                                SessionControl.pwd1_mdf_1 = "TEST7981";
                                LibSaralAuthLib.SessionControl = SessionControl;
                                df1.SessionControl = SessionControl;
                            }
                            else
                            {
                                var argHashTableControl1 = SessionControl.MDFFiles;
                                SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                                SessionControl.MDFFiles = argHashTableControl1;
                                SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                                SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                                LibSaralAuthLib.SessionControl = SessionControl;
                                df1.SessionControl = SessionControl;
                            }
                        }

                        HttpContext.Session.SetString("serverdatabase", "0_srv_0.1_mdf_1");
                        DataRow dtuserlogin1 = LibSaralAuthLib.UserExist(userLoginObj.userid, SessionControl.UserServerDatabase);
                        if (dtuserlogin1 is null)
                        {
                            ModelState.AddModelError("", "Login details are wrong.");
                            ViewBag.Message = "Login details are wrong.Please enter correct details";
                            return View(userLoginObj);
                        }

                        if (userLoginObj.Password.ToString().Trim() == dtuserlogin1["pwd"].ToString()?.Trim())
                        {
                            WriteToFile("Password matched", logfile);
                            DataRow drWebsession = df1.SeekRecord(SessionControl.UserServerDatabase, "websessions", "linkcode", Convert.ToInt32(dtuserlogin1["linkcode"]), false, "websessions_key");
                            if (drWebsession == null)
                                firstTimelogin = true;

                            HttpContext.Session.SetInt32("userloginkey_saralweb", Convert.ToInt32(df1.GetCellValue(dtuserlogin, "userlogin_key", "integer")));

                            DataRow? mAccMaster = null;
                            HttpContext.Session.SetString("userloginrow", CFC1.DataRowToCSV(dtuserlogin1));

                            HttpContext.Session.SetString("saralloginrow", CFC1.DataRowToCSV(dtuserlogin));

                            mAccMaster = df1.getRowFromP_value(SessionControl.UserServerDatabase, "accmaster", "*", "P_acccode", Convert.ToInt32(dtuserlogin1["linkcode"]));
                            HttpContext.Session.SetString("accmasterrow", CFC1.DataRowToCSV(mAccMaster));

                            HttpContext.Session.SetString("loginname", mAccMaster["accname"].ToString()?.Trim() ?? "");
                            HttpContext.Session.SetString("corpid", df1.GetCellValue(dtuserlogin, "userid", "string").ToString()?.Trim() ?? "");
                            HttpContext.Session.SetString("userid", df1.GetCellValue(dtuserlogin1, "userid", "string").ToString()?.Trim() ?? "");

                            HttpContext.Session.SetString("variablevalues", CFC1.DataRowToCSV(PopulateVariableTableWithVarValues()));
                            //Session["variablevalues"] = PopulateVariableTableWithVarValues();
                            string ip = "";//getIPAddress();
                            var mwebsessions1 = LibSaralAuthLib.CreateWebSessionRow(dtuserlogin1, ip, "", SessionControl.UserServerDatabase);
                            HttpContext.Session.SetString("websessionrow", CFC1.DataRowToCSV(mwebsessions1));

                            HttpContext.Session.SetInt32("key", Convert.ToInt32(mwebsessions1["websessions_key"]));
                            string authkey = LibSaralAuthLib.GenerateAuthKey(dtuserlogin1, userLoginObj.userid, HttpContext.Session.GetInt32("key").ToString(), "W", SessionControl.UserServerDatabase);
                            HttpContext.Session.SetString("authkey", authkey);
                            string menuJson = LibSaralAuthLib.getWebMenuJsonFromUserLoginKey(Convert.ToInt32(dtuserlogin1["userlogin_key"]), SessionControl.UserServerDatabase);
                            HttpContext.Session.SetString("menujson", menuJson);

                            string homeMenuJson = LibSaralAuthLib.GetHomeMenuJsonFromUserLoginKey(Convert.ToInt32(dtuserlogin1["userlogin_key"]), SessionControl.UserServerDatabase);
                            HttpContext.Session.SetString("homemenujson", homeMenuJson);
                        }
                        else
                        {
                            ModelState.AddModelError("", "Login details are wrong.");
                            ViewBag.Message = "Login details are wrong.Please enter correct details";
                            return View(userLoginObj);
                        }

                        break;
                    }
            }

            DataTable DtInfoTable = new DataTable();
            DataTable DtInfoTableuser = new DataTable();

           


            HttpContext.Session.SetInt32("mainbusscode", mainbusscode);
            //if (mainbusscode == 859 | mainbusscode == 840 | mainbusscode == 834 | mainbusscode == 835 | mainbusscode == 836 | mainbusscode == 837 | mainbusscode == 2984)
            //{
            //    if (firstTimelogin)
            //    {
            //        return RedirectToAction("ShopDetail", "Configuration");
            //    }
            //    else
            //    {
            //        returnurl = Request.Cookies["Tempurl"]?? "" ;

            //        if (!string.IsNullOrEmpty(returnurl))
            //        {
            //            if (userLoginObj.Corpid.ToLower() == "test7981")
            //            {
            //                return RedirectToAction("ChangePassword", "Home");
            //            }
            //            Response.Redirect(returnurl);
            //        }
            //        else
            //        { if (userLoginObj .Corpid.ToLower ()  == "test7981")
            //            {
            //                return RedirectToAction("ChangePassword", "Home");
            //            }
            //            return RedirectToAction("Bills", "Invoices");
            //        }
            //    }
            //}
            //else
            //{
            //    returnurl = Request.Cookies["Tempurl"] ?? "";

            //    if (!string.IsNullOrEmpty(returnurl))
            //    {
            //        Response.Redirect(returnurl);
            //    }
            //    else
            //    {
            //        return RedirectToAction("ManageRegCalls", "CRM");
            //    }                
            //}


            if ((mainbusscode == 859 | mainbusscode == 840 | mainbusscode == 834 | mainbusscode == 835 | mainbusscode == 836 | mainbusscode == 837 | mainbusscode == 2984) && firstTimelogin)
            {
                return RedirectToAction("ShopDetail", "Configuration");
            }
            else
            {
                returnurl = Request.Cookies["Tempurl"] ?? "";

                if (!string.IsNullOrEmpty(returnurl))
                {
                    Response.Redirect(returnurl);
                }
                else
                {
                    return RedirectToAction("Home", "CRM");
                }
            }


            return View(userLoginObj);
        }


        public ActionResult SignUp()
        {
            return View();
           // return RedirectToAction("ContactUs", "Home");
        }

        [HttpPost()]
        public ActionResult SignUp(IFormCollection fc)
        {
            string name = fc["name"].ToString().Trim(); 
            string email = fc["emailid"].ToString().Trim();
            string businessUnitname = fc["bussinessUnitName"].ToString().Trim();
            string MobNo = fc["mobno"].ToString().Trim();
            string CustomerType = fc["UserType"].ToString().Trim();
            string Pwd = fc["pwd"].ToString().Trim();
            string Pwd1 = fc["ConfirmPwd"].ToString().Trim();

            //string wineBusiness = string.IsNullOrEmpty(fc["wineBusiness"]) ? "N" : "Y";
            int businestype =Convert.ToInt32(fc["ddlBusType"].ToString().Trim());
            string oldLinkCode = fc["txtOldCustCode"].ToString().Trim();
            string isDbExist = fc["isdbexist"].ToString().Trim();

            if (string.IsNullOrEmpty(oldLinkCode))
            {
                if (CustomerType == "B" && businessUnitname.Replace(" ", "").Length < 4)
                {
                    TempData["Message"] = "Please enter minimum 4 characters in Bussiness Unit Name!";
                    return View();
                }

                if (name.Replace(" ", "").Length < 4)
                {
                    TempData["Message"] = CustomerType == "I" ? "Please enter minimum 4 characters in name!" : "Please enter minimum 4 characters in Contact Person!";
                    return View();
                }
            }
            

            if (Pwd != Pwd1)
            {
                TempData["Message"] = "Passwords do not match!";
                return View();
            }
            if (Pwd.Length != 8)
            {
                TempData["Message"] = "Passwords must be 8 character long!";
                return View();
            }

            var cc1 = new CustomerControl.Variables("WebGodaddy");

            SessionControl = cc1;

            LibSaralAuthLib .SessionControl = cc1 ;

            if (string.IsNullOrEmpty(oldLinkCode))
            {
                DataRow userLoginRow = LibSaralAuthLib.UserExistByEmailId(email, "0_srv_0.3_mdf_3");
                if (userLoginRow is not null)
                {
                    TempData["Message"] = "This Email Id is already Registered!";
                    return View();
                }
            }
            
            //int businestype = 840;
            // 'Set WineTemplate
            //if (wineBusiness == "Y" & string.IsNullOrEmpty(oldLinkCode))
            if (businestype == 859 & string.IsNullOrEmpty(oldLinkCode))
            {
                //businestype = 859;
                var argHashTableControl = SessionControl.MDFFiles;
                SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl, "2_mdf_2", "WineTemplate");
                SessionControl.MDFFiles = argHashTableControl;
                SessionControl.userid2_mdf_2 = "WineTemplate";
                SessionControl.pwd2_mdf_2 = "etalpmeteniw";
                LibSaralAuthLib.SessionControl = SessionControl;
            }

            else
            {
                var argHashTableControl = SessionControl.MDFFiles;
                SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl, "2_mdf_2", "PharmaTemplate");
                SessionControl.MDFFiles = argHashTableControl;
                SessionControl.userid2_mdf_2 = "PharmaTemplate";
                SessionControl.pwd2_mdf_2 = "PharmaTemplate";
                LibSaralAuthLib.SessionControl = SessionControl;
            }

            string logfile = MyServer.MapPath("App_data/logFile.txt");

            if (!string.IsNullOrEmpty(oldLinkCode) && !string.IsNullOrEmpty(isDbExist) && isDbExist.Trim().ToLower()=="y") 
            {
                CFC1.RemoveCorpid(oldLinkCode);
            }

            string mcode = LibSaralAuthLib.SignUp(name, CustomerType, email, MobNo, Pwd, businessUnitname, businestype, logfile,oldLinkCode);

            string RegfolderPath = MyServer.MapPath(mcode.ToUpper() + @"\").Replace(@"sites\gainbooks.com", "gainbooksdata");

            string recordingpath = MyServer.MapPath(mcode.ToUpper() + @"\recording\").Replace(@"sites\gainbooks.com", "gainbooksdata");

            string invoicepath = MyServer.MapPath(mcode.ToUpper() + @"\invoices\").Replace(@"sites\gainbooks.com", "gainbooksdata");

            string documentpath = MyServer.MapPath(mcode.ToUpper() + @"\documents\").Replace(@"sites\gainbooks.com", "gainbooksdata");

            string employeepath = MyServer.MapPath(mcode.ToUpper() + @"\employees\").Replace(@"sites\gainbooks.com", "gainbooksdata");

            string mastrerspath = MyServer.MapPath(mcode.ToUpper() + @"\masters\").Replace(@"sites\gainbooks.com", "gainbooksdata");
            //string logfile = MyServer.MapPath("App_data/logFile.txt");

            WriteToFile(RegfolderPath + "  " + recordingpath, logfile);


            if (!Directory.Exists(RegfolderPath))
                Directory.CreateDirectory(RegfolderPath);

            if (!Directory.Exists(recordingpath))
                Directory.CreateDirectory(recordingpath);

            if (!Directory.Exists(invoicepath))
                Directory.CreateDirectory(invoicepath);

            if (!Directory.Exists(documentpath))
                Directory.CreateDirectory(documentpath);

            if (!Directory.Exists(employeepath))
                Directory.CreateDirectory(employeepath);

            if (!Directory.Exists(mastrerspath))
                Directory.CreateDirectory(mastrerspath);

            string message = CustomerType == "I" ? "Individual user account has been created with Userid: " + mcode.ToUpper() + ". Please login" : "Business user account has been created with Corporate Id: " + mcode.ToUpper() + "; Userid: " + mcode.ToUpper() + ". Please login";
            
            TempData["Message"] = message;
            //if (wineBusiness == "Y")
            if (businestype == 859)
            {
                businestype = 840;
                var argHashTableControl1 = SessionControl.MDFFiles;
                SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl1, "2_mdf_2", "crmtemplate");
                SessionControl.MDFFiles = argHashTableControl1;
                SessionControl.userid2_mdf_2 = "crmtemplate";
                SessionControl.pwd2_mdf_2 = "crmtemplate";
                LibSaralAuthLib.SessionControl = SessionControl;
            }
            return RedirectToAction("Login");
        }






        /// <summary>
        /// perform logout , clears sessions and redirect to home page
        /// </summary>
        /// <returns></returns>
        public  ActionResult LogOut()
        {
            //// If Request.Cookies("SessionKey") IsNot Nothing Then
            //// Dim aCookie As New HttpCookie("SessionKey")
            //// aCookie.Expires = DateTime.Now.AddDays(-1D)
            //// Response.SetCookie(aCookie)
            //// Response.Cookies.Remove("SessionKey")
            //// End If

            if (Request.Cookies["userlogin_key"] is not null)     // Uncommented by Shweta
            {
                //var aCookie = new HttpCookie("UserLogin_key");
                //aCookie.Expires = df1.GetDateTimeISTNow().AddDays(-1);
                //aCookie.Value = null;
                //aCookie.HttpOnly = true;
                //// aCookie.Domain = "crm.saralerp.com"    'Appropriate Domain name for website.
                //// aCookie.Domain = ""    'For testing in localhost 
                //// aCookie.Domain = "crm.technopinch.in"
                //aCookie.Expires = DateTime.Now;
                //aCookie.Path = "/";
                //Response.SetCookie(aCookie);
                //// Response.Cookies.Add(aCookie)
                //Request.Cookies.Remove("UserLogin_Key");

                CookieOptions option = new CookieOptions();
                option.Expires = DateTime.Now;
                option.HttpOnly = true;
                option.Path = "/";
                Response.Cookies.Append("userlogin_key", "", option);
            }
            HttpContext.Session.Clear();
            //HttpContext.Session.Abandon();
            //HttpContext.Session.RemoveAll();
            foreach (var item in HttpContext.Session.Keys)
            {
                HttpContext.Session.Remove(item);
            } 
            //FormsAuthentication.SignOut();

            return RedirectToAction("Login");
        }

        public ActionResult GoogleSignIn()
        {
            // Dim tokenId As String = Request.Form.Item("idtoken")
            // 'Dim CustomerType As String =
            // Dim info As String = veriFyTokenFromGoogleSignUp(tokenId)
            // ' Dim table As DataTable = JsonConvert.DeserializeObject(Of DataTable)(info)
            // info = info.Replace("{", "")
            // info = info.Replace("}", "")
            // Dim allValues As String() = info.Split(",")
            // Dim dcLib As New DataTypeConversionLib.DataTypeConversionFunctions
            // Dim dt As DataTable = dcLib.ConvertJSONToDataTableNew(info)
            // Dim s As String = ""
            // Dim emailProp() As String = allValues(4).Split(":")
            // Dim email As String = emailProp(1).ToString.Trim
            // Dim Usertype As String = Request.Form.Item("Custtype")
            // email = email.Replace("""", "")
            // Dim dtuserlogin As DataRow ' DataTable
            // 'dtuserlogin = LibSaralAuthLib.UserExistByEmailId(email.Trim, "0_srv_0.3_mdf_3")
            // Dim userLoginObj As New UserLoginTable
            // If dtuserlogin Is Nothing Then
            // ModelState.AddModelError("", "Login details are wrong.")
            // ViewBag.Message = "Login details are wrong.Please Try again later"
            // Return View(userloginobj)
            // End If
            // Dim usertype1 As String = df1.GetCellValue(dtuserlogin, "prevlogintype", "string")
            // If Usertype <> usertype1 Then
            // ModelState.AddModelError("", "Account type is wrong.")
            // ViewBag.Message = "Account type is wrong.Please Try again later"
            // Return View(userLoginObj)
            // End If
            // Select Case usertype1
            // Case "I"
            // '  Dim selcustconfig As String = "select * from dbcustconfig where userlogin_key =" & dtuserlogin.Item("userlogin_key")
            // Dim strsql As String = "select * from customers where mainbusscode=859 and rowstatus=0"
            // Dim dtcust As DataTable = df1.SqlExecuteDataTable(GlobalControl.Variables.MainServerDatabase, strsql)
            // For j = 0 To dtcust.Rows.Count - 1
            // Dim custcode As String = df1.GetCellValue(dtcust.Rows(j), "custcode", "string")
            // Dim dtuserlogin As DataRow = LibSaralAuthLib.UserExist(custcode, "0_srv_0.3_mdf_3")
            // Dim dtdbcustconfig As DataRow = LibSaralAuthLib.GetDatabaseDetailsFromUserlogin_key(dtuserlogin.Item("userlogin_key"), "0_srv_0.3_mdf_3")
            // If Not dtdbcustconfig Is Nothing Then
            // If HttpContext.Request.Url.Host.ToString.ToLower.Contains("demo") Then
            // GlobalControl.Variables.MDFFiles = GF1.AddItemToHashTable(GlobalControl.Variables.MDFFiles, "1_mdf_1", "TEST7981")
            // GlobalControl.Variables.userid1_mdf_1 = "TEST7981"
            // GlobalControl.Variables.pwd1_mdf_1 = "TEST7981"
            // Else
            // GlobalControl.Variables.MDFFiles = GF1.AddItemToHashTable(GlobalControl.Variables.MDFFiles, "1_mdf_1", Trim(df1.GetCellValue(dtdbcustconfig, "dbname", "string")))
            // GlobalControl.Variables.userid1_mdf_1 = Trim(df1.GetCellValue(dtdbcustconfig, "userid", "string"))
            // GlobalControl.Variables.pwd1_mdf_1 = Trim(df1.GetCellValue(dtdbcustconfig, "pwd", "string"))
            // End If
            // Dim strupd As String = "update shopcontrol set uploadtype=1  "
            // Dim jkl As String = "delete from jsonmaster"
            // Dim yu As Integer = df1.SqlExecuteNonQuery(GlobalControl.Variables.UserServerDatabase, jkl)
            // Dim kl As Integer = df1.SqlExecuteNonQuery(GlobalControl.Variables.UserServerDatabase, strupd)
            // Dim strin As String = "
            // INSERT [dbo].[JsonMaster] ([JsonMaster_key], [P_JsonMaster], [rowstatus], [TableName], [FieldName], [JSonKeyName], [JSonKeyType]) VALUES (1, 1, 0, N'saleiems            ', N'licensee_code       ', N'Licensee_Code       ', N'S                   ')
            // INSERT [dbo].[JsonMaster] ([JsonMaster_key], [P_JsonMaster], [rowstatus], [TableName], [FieldName], [JSonKeyName], [JSonKeyType]) VALUES (2, 2, 0, N'saleiems            ', N'groupcode           ', N'GroupCode           ', N'S                   ')
            // INSERT [dbo].[JsonMaster] ([JsonMaster_key], [P_JsonMaster], [rowstatus], [TableName], [FieldName], [JSonKeyName], [JSonKeyType]) VALUES (3, 3, 0, N'saleiems            ', N'brandcode           ', N'BrandCode           ', N'S                   ')
            // INSERT [dbo].[JsonMaster] ([JsonMaster_key], [P_JsonMaster], [rowstatus], [TableName], [FieldName], [JSonKeyName], [JSonKeyType]) VALUES (4, 4, 0, N'saleiems            ', N'packingcode         ', N'PackingCode         ', N'S                   ')
            // INSERT [dbo].[JsonMaster] ([JsonMaster_key], [P_JsonMaster], [rowstatus], [TableName], [FieldName], [JSonKeyName], [JSonKeyType]) VALUES (5, 5, 0, N'saleiems            ', N'sale_qty            ', N'Sale_Qty_In_Btl     ', N'S                   ')
            // INSERT [dbo].[JsonMaster] ([JsonMaster_key], [P_JsonMaster], [rowstatus], [TableName], [FieldName], [JSonKeyName], [JSonKeyType]) VALUES (6, 6, 0, N'saleiems            ', N'amount              ', N'Amount              ', N'S                   ')
            // INSERT [dbo].[JsonMaster] ([JsonMaster_key], [P_JsonMaster], [rowstatus], [TableName], [FieldName], [JSonKeyName], [JSonKeyType]) VALUES (7, 7, 0, N'saleiems            ', N'saledate            ', N'SaleDate            ', N'D:dd-MMM-yyyy       ')
            // INSERT [dbo].[JsonMaster] ([JsonMaster_key], [P_JsonMaster], [rowstatus], [TableName], [FieldName], [JSonKeyName], [JSonKeyType]) VALUES (9, 9, 0, N'saleiems            ', N'invoicetype         ', N'InvoiceType         ', N'S                   ')
            // INSERT [dbo].[JsonMaster] ([JsonMaster_key], [P_JsonMaster], [rowstatus], [TableName], [FieldName], [JSonKeyName], [JSonKeyType]) VALUES (10, 10, 0, N'saleiems            ', N'auth_key            ', N'Authentication_Key  ', N'S                   ')
            // INSERT [dbo].[JsonMaster] ([JsonMaster_key], [P_JsonMaster], [rowstatus], [TableName], [FieldName], [JSonKeyName], [JSonKeyType]) VALUES (11, 11, 0, N'saleiems            ', N'shopcode            ', N'ShopCode            ', N'S                   ')
            // "
            // Dim klm As Integer = df1.SqlExecuteNonQuery(GlobalControl.Variables.UserServerDatabase, strin)
            // End If
            // Next
            var userLoginObj = new UserLoginTable();
            return View(userLoginObj);
        }

        public string veriFyTokenFromGoogleSignUp(string tokenId)
        {
            string info = "";
            //if (!string.IsNullOrEmpty(tokenId))
            //{
            //    string strUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + tokenId.ToString().Trim();
            //    // Create a request object  
            //    var request = WebRequest.Create(strUrl);
            //    // Get the response back  
            //    HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            //    var s = response.GetResponseStream();
            //    var readStream = new StreamReader(s);
            //    string dataString = readStream.ReadToEnd();
            //    info = dataString;
            //    // ViewBag.Message = dataString
            //    response.Close();
            //    s.Close();
            //    readStream.Close();
            //}

            return info;
        }

        //public Hashtable PopulateVariableTableWithVarValues()
        //{
        //    Hashtable finalhashtable = new Hashtable();
        //    DataTable dt = new DataTable();
        //    dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "select * from variabletable where rowstatus = 0");
        //    for (int u = 0; u <= dt.Rows.Count - 1; u++)
        //    {
        //        switch (df1.GetCellValue(ref dt, "variablename", u, "string").ToString()?.Trim().ToLower() ?? "")
        //        {
        //            case "loggedinempoffmobileno":
        //                {
        //                    DataRow userrow = CFC1.CSVToDataRow(HttpContext.Session.GetString("userloginrow"));
        //                    GF1.AddItemToHashTable(ref finalhashtable, "loggedinempoffmobileno", df1.GetCellValue(userrow, "mobile", "string").ToString()?.Trim());
        //                    break;
        //                }
        //            case "loggedinempname":
        //                {
        //                    DataRow userrow = CFC1.CSVToDataRow(HttpContext.Session.GetString("userloginrow"));
        //                    GF1.AddItemToHashTable(ref finalhashtable, "loggedinempname", df1.GetCellValue(userrow, "name", "string").ToString()?.Trim());
        //                    break;
        //                }
        //            case "loggedinp_acccode":
        //                {
        //                    DataRow userrow = CFC1.CSVToDataRow(HttpContext.Session.GetString("userloginrow"));
        //                    GF1.AddItemToHashTable(ref finalhashtable, "loggedinp_acccode", df1.GetCellValue(userrow, "linkcode", "string").ToString()?.Trim());
        //                    break;
        //                }
        //            case "status":
        //                {
        //                    var dtStatus = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "Select * from infotableuser where rowstatus=0 And infotype=65 And (updateflag<>'D' or updateflag is null)");
        //                    if (dtStatus.Rows.Count > 0)
        //                    {
        //                        GF1.AddItemToHashTable(ref finalhashtable, "status", df1.GetCellValue(dtStatus.Rows[0], "nameofinfo", "string").ToString()?.Trim());
        //                    }
        //                    break;
        //                }
        //                // Case "p_acccode"
        //                // GF1.AddItemToHashTable(finalhashtable, "p_acccode", 6)
        //        }

        //    }

        //    return finalhashtable;
        //}

        public DataRow PopulateVariableTableWithVarValues()
        {
            DataTable finalDt = new DataTable();
            finalDt = df1.AddColumnsInDataTable(ref finalDt, "loggedinempoffmobileno,loggedinempname,loggedinp_acccode,status", "system.string,system.string,system.string,system.string");
            DataRow dtRow = finalDt.NewRow();
            DataTable dt = new DataTable();
            dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "select * from variabletable where rowstatus = 0");
            for (int u = 0; u <= dt.Rows.Count - 1; u++)
            {
                switch (df1.GetCellValue(ref dt, "variablename", u, "string").ToString()?.Trim().ToLower() ?? "")
                {
                    case "loggedinempoffmobileno":
                        {
                            DataRow userrow = CFC1.CSVToDataRow(HttpContext.Session.GetString("userloginrow"));
                            dtRow["loggedinempoffmobileno"] = df1.GetCellValue(userrow, "mobile", "string").ToString()?.Trim();
                            break;
                        }
                    case "loggedinempname":
                        {
                            DataRow userrow = CFC1.CSVToDataRow(HttpContext.Session.GetString("userloginrow"));
                            dtRow["loggedinempname"] = df1.GetCellValue(userrow, "name", "string").ToString()?.Trim();
                            break;
                        }
                    case "loggedinp_acccode":
                        {
                            DataRow userrow = CFC1.CSVToDataRow(HttpContext.Session.GetString("userloginrow"));
                            dtRow["loggedinp_acccode"] = df1.GetCellValue(userrow, "linkcode", "string").ToString()?.Trim();
                            break;
                        }
                    case "status":
                        {
                            var dtStatus = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "Select * from infotableuser where rowstatus=0 And infotype=65 And (updateflag<>'D' or updateflag is null)");
                            if (dtStatus.Rows.Count > 0)
                            {
                                dtRow["status"] = df1.GetCellValue(dtStatus.Rows[0], "nameofinfo", "string").ToString()?.Trim();
                            }
                            break;
                        }
                        // Case "p_acccode"
                        // GF1.AddItemToHashTable(finalhashtable, "p_acccode", 6)
                }

            }

            finalDt.Rows.Add(dtRow);
            return finalDt.Rows[0];
        }

        public ActionResult downloadGainbooksApp(String Appname)
        {
            //Response.Clear();
            //Response.Headers.Add("Content-Disposition", "attachment; filename=Gainbooks.apk");
            //Response.ContentType = "application/vnd.android.package-archive";
            ////Response.WriteFile("~/App_Data/Gainbooks.apk");
            ////Response.End(); // if file does not exist     
            //return RedirectToAction("Login");
            string filePath = "";
            if (Appname == "gbpos")
            {
                 filePath = MyServer.MapPath(@"App_Data\gbpos.apk");
            } else if (Appname == "saralgb")
            {
                 filePath = MyServer.MapPath(@"App_Data\saralgb.apk");

            }
            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            String appnm = Appname + ".apk";
            return File(memory, "application/vnd.android.package-archive", appnm);
        }

        public ActionResult downloadImportCustomerFormatFile()
        {
            //Response.Clear();
            //Response.Headers.Add("Content-Disposition", "attachment;filename=Customer_Import_Format.xls");
            //Response.ContentType = "application/vnd.ms-excel";
            ////Response.WriteFile("~/App_Data/Customer_Import_Format.xls");
            ////Response.End();
            //return RedirectToAction("managecustomers", "Configuration");
            string filePath = MyServer.MapPath(@"App_Data\Customer_Import_Format.xls");
            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, "application/vnd.ms-excel", "Customer_Import_Format.xls");
        }


        public ActionResult ShowImage()
        {
            // Dim PhotoKey As Integer
            //DataRow? ImageRow = null;
            byte[]? image = null;
            // Dim ClsImageFile As New ImageFile.ImageFile
            // Dim sessionRow As DataRow = Session("WebSessionRow")
            // Dim LoginType As String = sessionRow("linktype")
            // Dim Loginkey As Integer = sessionRow("linkcode")
            // Dim empKey As Integer = Session("SubEmployeeRow")("Employees_Key")
            // If LoginType = "E" Or LoginType = "A" Then
            // Dim EmployeeRow As DataRow = df1.SeekRecord(ClsEmployees, empKey)
            // If IsDBNull(EmployeeRow("Photo_key")) = False Then
            // PhotoKey = EmployeeRow("Photo_key")
            // ImageRow = df1.SeekRecord(ClsImageFile, PhotoKey)
            // If ImageRow IsNot Nothing Then
            // image = ImageRow("Contents")
            // Else
            image = System.IO.File.ReadAllBytes(MyServer.MapPath(@"images\avatar5.png"));
            // End If
            // Else
            // If EmployeeRow("Sex") = "F" Then
            // image = System.IO.File.ReadAllBytes(Server.MapPath("~/images/avatar2.png"))
            // Else
            // image = System.IO.File.ReadAllBytes(Server.MapPath("~/images/avatar5.png"))
            // End If

            // End If

            // End If
            return File(image, "image/*");
        }


        public string getIPAddress()
        {

            string ip = ""; //HttpContext.Request.UserHostAddress;
            //if (string.IsNullOrEmpty(ip))
            //{
            //    ip = HttpContext.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            //    if (string.IsNullOrEmpty(ip))
            //    {
            //        ip = Request.ServerVariables["REMOTE_ADDR"];
            //    }
            //}
            return ip;
        }


        [HttpGet()]
        public ActionResult ChangePassword()
        {
            var obj = new UserLoginTable();
            return View(obj);
        }

        [HttpPost()]
        public ActionResult ChangePassword(IFormCollection fc)


        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));



           // SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            DataRow? UserLoginRow = CFC1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
            DataRow? SaralLoginRow = CFC1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");

            if (UserLoginRow is not null)
            {
                if (fc["CurrPassword"].ToString().Trim() == UserLoginRow["pwd"].ToString()?.Trim())
                {
                    //SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                    if (UserLoginRow["userid"].ToString()?.Trim() == SaralLoginRow["userid"].ToString()?.Trim())
                    {
                        // Change in both db
                        // 1) for user db
                        bool PassChangedUserdb = LibSaralAuthLib.ChangePass(fc["NewPassword1"].ToString().Trim(), Convert.ToInt32(UserLoginRow["userlogin_key"]),SessionControl.UserServerDatabase);
                        bool PassChangedMaindb = LibSaralAuthLib.ChangePass(fc["NewPassword1"].ToString().Trim(), Convert.ToInt32(SaralLoginRow["userlogin_key"]), SessionControl.MainServerDatabase);
                        if (PassChangedMaindb == true & PassChangedUserdb == true)
                        {
                            TempData["Message"] = "Your Password is successfully Changed. Please Login Again";
                            return RedirectToAction("Login");
                        }
                        else if (PassChangedMaindb == false | PassChangedUserdb == false)
                        {
                            TempData["Message"] = "An error occured while storing your Information .Please try again later.";
                            return RedirectToAction("ChangePassword");
                        }
                    }
                    else
                    {
                        // Change in userdb
                        bool PassChanged = LibSaralAuthLib.ChangePass(fc["NewPassword1"].ToString().Trim(), Convert.ToInt32(UserLoginRow["userlogin_key"]), SessionControl.UserServerDatabase);
                        if (PassChanged == true)
                        {
                            TempData["Message"] = "Your Password is successfully Changed. Please Login Again";
                            return RedirectToAction("Login");
                        }
                        else if (PassChanged == false)
                        {
                            TempData["Message"] = "An error occured while storing your Information .Please try again later.";
                            return RedirectToAction("ChangePassword");
                        }
                    }
                }
                else
                {
                    TempData["Message"] = "Please Provide correct Current Password";
                    return RedirectToAction("ChangePassword");
                }
            }
            TempData["Message"] = "You are not Logged In.Please Login";
            return RedirectToAction("Login");
        }


        /// <summary>
        /// Change password and send email to employee
        /// </summary>
        /// <param name="fc"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult AjaxForgotPassword(IFormCollection fc)
        {
            string Usertype = fc["UType"].ToString().Trim();
            DataRow dtuserlogin;
            if (!(Usertype.ToUpper()== "B"))
            {
                SetSessionControlUsingCoprid(fc["Uid"].ToString().Trim());
                dtuserlogin = LibSaralAuthLib.UserExist(fc["Uid"].ToString().Trim(), "0_srv_0.3_mdf_3");
            }
            else
            {
                SetSessionControlUsingCoprid(fc["Cid"].ToString().Trim());
                dtuserlogin = LibSaralAuthLib.UserExist(fc["Cid"].ToString().Trim(), "0_srv_0.3_mdf_3");
            }

            if (dtuserlogin is null)
                return Json("Details are wrong.Please enter correct details");

            string? usertype1 = df1.GetCellValue(dtuserlogin, "prevlogintype", "string").ToString()?.Trim();

            if (Usertype != usertype1 )
                return Json("Account type is wrong.Please select correct value");

            switch (usertype1 ?? "")
            {
                case "I":
                    {
                        DataRow dtdbcustconfig = LibSaralAuthLib.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), "0_srv_0.3_mdf_3");
                        if (dtdbcustconfig is not null)
                        {
                            if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                            {
                                var argHashTableControl = SessionControl.MDFFiles;
                                SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl, "1_mdf_1", "TEST7981");
                                SessionControl.MDFFiles = argHashTableControl;
                                SessionControl.userid1_mdf_1 = "TEST7981";
                                SessionControl.pwd1_mdf_1 = "TEST7981";
                                LibSaralAuthLib.SessionControl = SessionControl;
                            }
                            else
                            {
                                var argHashTableControl1 = SessionControl.MDFFiles;
                                SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl1, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                                SessionControl.MDFFiles = argHashTableControl1;
                                SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                                SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            }
                        }
                        DataRow dtuserlogin1;
                        dtuserlogin1 = LibSaralAuthLib.UserExist(fc["Uid"].ToString().Trim(), SessionControl.UserServerDatabase);
                        if (dtuserlogin1 is null)
                        {
                            return Json("Details are wrong.Please enter correct details");
                        }

                        string password = LibSaralAuthLib.GenerateRandomPass(8);
                        string? email = dtuserlogin1["email"].ToString()?.Trim();
                        bool PassChangedUserdb = LibSaralAuthLib.ChangePass(password.ToString().Trim(), Convert.ToInt32(dtuserlogin1["userlogin_key"]), SessionControl.UserServerDatabase);
                        bool PassChangedMaindb = LibSaralAuthLib.ChangePass(password.ToString().Trim(), Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase);

                        string message = "You have requested to Change password in Gainbooks. Your temporary password is :" + password + "<br/>Please login using it. We suggest to change your password after Login.<br/>Regards<br/>Gainbooks Head Office";
                        gflib.SendEmail(email?.ToString().Trim().ToLower() ?? "", "Password change request for your Gainbooks account", message, @"C:\cntr_dir\googleapiconfig.txt");
                        return Json("success");
                    }
                case "B":
                    {
                        DataRow dtdbcustconfig = LibSaralAuthLib.GetDatabaseDetailsFromUserlogin_key(Convert.ToInt32(dtuserlogin["userlogin_key"]), "0_srv_0.3_mdf_3"); 
                        if (dtdbcustconfig is not null) 
                        {
                            if (HttpContext.Request.Host.ToString().ToLower().Contains("demo"))
                            {
                                var argHashTableControl2 = SessionControl.MDFFiles;
                                SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl2, "1_mdf_1", "TEST7981");
                                SessionControl.MDFFiles = argHashTableControl2;
                                SessionControl.userid1_mdf_1 = "TEST7981";
                                SessionControl.pwd1_mdf_1 = "TEST7981";
                                LibSaralAuthLib.SessionControl = SessionControl;
                            }
                            else
                            {
                                var argHashTableControl3 = SessionControl.MDFFiles;
                                SessionControl.MDFFiles = GF1.AddItemToHashTable(ref argHashTableControl3, "1_mdf_1", df1.GetCellValue(dtdbcustconfig, "dbname", "string").ToString()?.Trim());
                                SessionControl.MDFFiles = argHashTableControl3;
                                SessionControl.userid1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "userid", "string").ToString()?.Trim();
                                SessionControl.pwd1_mdf_1 = df1.GetCellValue(dtdbcustconfig, "pwd", "string").ToString()?.Trim();
                            }
                        }
                        DataRow dtuserlogin1;
                        dtuserlogin1 = LibSaralAuthLib.UserExist(fc["Uid"].ToString().Trim(), SessionControl.UserServerDatabase);
                        if (dtuserlogin1 is null)
                            return Json("Details are wrong.Please enter correct details");

                        string password = LibSaralAuthLib.GenerateRandomPass(8);
                        string? email = dtuserlogin1["email"].ToString()?.Trim();
                        if (dtuserlogin["userid"].ToString()?.Trim()  == dtuserlogin1["userid"].ToString()?.Trim())
                        {
                            bool PassChangedUserdb = LibSaralAuthLib.ChangePass(password.ToString().Trim(), Convert.ToInt32(dtuserlogin1["userlogin_key"]), SessionControl.UserServerDatabase);
                            bool PassChangedMaindb = LibSaralAuthLib.ChangePass(password.ToString().Trim(), Convert.ToInt32(dtuserlogin["userlogin_key"]), SessionControl.MainServerDatabase);
                        }
                        else
                        {
                            bool PassChangedUserdb = LibSaralAuthLib.ChangePass(password.ToString().Trim(), Convert.ToInt32(dtuserlogin1["userlogin_key"]), SessionControl.UserServerDatabase);
                        }

                        string message = "You have requested to Change password in Gainbooks. Your temporary password is :" + password + "<br/>Please login using it. We suggest to change your password after Login.<br/>Regards<br/>Gainbooks Head Office";
                        gflib.SendEmail(email?.ToString().Trim().ToLower()??"", "Password change request for your Gainbooks account", message, @"C:\cntr_dir\googleapiconfig.txt");
                        return Json("success");
                    }
            }
            return Json("");
        }


        public IActionResult ContactUs()
        {
            return View();

        }

        [HttpPost()]
        public ActionResult ContactUs(IFormCollection fc)
        {
            //var cc1 = new CustomerControl.Variables("WebGodaddy");
            //SessionControl = cc1;
            SetSessionControlUsingCoprid("Neha8591");
            string argLtable = "enquiry";
            DataRow? argNewRowTemplate = null;
            Hashtable? argLastKeyValues = null;
            int Enquiry_Key = df1.LastKeyPlus(SessionControl.UserServerDatabase, ref argLtable, "Enquiry_Key", NewRowTemplate: ref argNewRowTemplate, LastKeyValues: ref argLastKeyValues);
            string argLtable1 = "enquiry";
            DataRow? argNewRowTemplate1 = null;
            Hashtable? argLastKeyValues1 = null;
            int P_Enquiry = df1.LastKeyPlus(SessionControl.UserServerDatabase, ref argLtable1, "P_Enquiry", NewRowTemplate: ref argNewRowTemplate1, LastKeyValues: ref argLastKeyValues1);
            string sqlstr = "insert into enquiry(Enquiry_Key,P_Enquiry,rowstatus,EnqMessage,EnqDate,Name,email,MobNo,subject) ";
            sqlstr += " values(" + Enquiry_Key + "," + P_Enquiry + ",0,'" + fc["enquiryMessage"].ToString().Trim() + "','" + df1.GetDateTimeISTNow().ToString("yyyy-MM-dd HH:mm:ss") + "','" + fc["Name"].ToString().Trim() + "','" + fc["email"].ToString().Trim() + "','" + fc["phone"].ToString().Trim() + "','" + fc["Subject"].ToString().Trim() + "')";
            int a = df1.SqlExecuteNonQuery(SessionControl.UserServerDatabase, sqlstr);
            ViewBag.msg = a > 0? "Your enquiry has been submitted successfully.We will contact you very soon.": "Something went wrong. Please try again later.";
            return View();
        }

 
        public IActionResult ApplyForJob()
        {
            return View();
        }

        [HttpPost()]
        public ActionResult ApplyForJob(IFormCollection fc)
        {
            var name = fc["name"].ToString().Trim();
            var mobno = fc["mobno"].ToString().Trim();
            var skill = fc["position"].ToString().Trim();
            var location = fc["location"].ToString().Trim();
            var info = fc["info"].ToString().Trim();

            SetSessionControlUsingCoprid("Neha8591");
            string filename1 = "";
            string RegfolderPath = MyServer.MapPath("Neha8591/documents/").Replace(@"sites\gainbooks.com", "gainbooksdata");
            

            if (Request.Form.Files.Count > 0)
            {
                var File = Request.Form.Files[0];

                string fileExtwnsion = Path.GetExtension(File.FileName);
                if (fileExtwnsion.ToLower() != ".jpg" && fileExtwnsion.ToLower() != ".png" && fileExtwnsion.ToLower() != ".pdf")
                {
                    ViewBag.Text = "Only jpg , png and pdf file allowed";
                    return View();
                }

                if (!string.IsNullOrEmpty(File.FileName))
                {
                    if (!Directory.Exists(RegfolderPath))
                        Directory.CreateDirectory(RegfolderPath);

                    if (File is not null)
                    {
                        string Filename = File.FileName;
                        filename1 = Path.GetFileNameWithoutExtension(File.FileName);
                        string filepathName = RegfolderPath + Filename;
                        filename1 = CFC1.CheckAndCreateFileName(Filename, RegfolderPath);
                        using (FileStream fs = new FileStream(RegfolderPath + filename1, FileMode.Create))
                        {
                            File.CopyTo(fs);
                        }
                    }
            
                }
            }


            SetSessionControlUsingCoprid("Neha8591");
            string argLtable = "applicant";
            DataRow? argNewRowTemplate = null;
            Hashtable? argLastKeyValues = null;
            int Applicant_Key = df1.LastKeyPlus(SessionControl.UserServerDatabase, ref argLtable, "Applicant_Key", NewRowTemplate: ref argNewRowTemplate, LastKeyValues: ref argLastKeyValues);
            string argLtable1 = "applicant";
            DataRow? argNewRowTemplate1 = null;
            Hashtable? argLastKeyValues1 = null;
            int P_Applicant = df1.LastKeyPlus(SessionControl.UserServerDatabase, ref argLtable1, "P_Applicant", NewRowTemplate: ref argNewRowTemplate1, LastKeyValues: ref argLastKeyValues1);
            string sqlstr = "insert into applicant(Applicant_Key,P_Applicant,rowstatus,ApplyDate,Name,MobNo,Location,Position,Info,Resume,Filename) ";
            sqlstr += " values(" + Applicant_Key + "," + P_Applicant + ",0,'" + df1.GetDateTimeISTNow().ToString("yyyy-MM-dd HH:mm:ss") + "','" + fc["name"].ToString().Trim() + "','" + fc["mobno"].ToString().Trim() + "','" + fc["location"].ToString().Trim() + "','" + fc["position"].ToString().Trim() + "','" + fc["info"].ToString().Trim() + "','/GainBooksData/Neha8591/documents/" + filename1 + "','" + filename1 + "')";
            int a = df1.SqlExecuteNonQuery(SessionControl.UserServerDatabase, sqlstr);
            ViewBag.msg = a > 0 ? "Your Application has been submitted successfully.We will contact you very soon." : "Something went wrong. Please try again later.";
            return View();
        }
 
        public IActionResult Index()
        {
            return View();

        }


        public IActionResult AboutUs()
        {
            return View();

        }

        public ActionResult FinancialModule()
        {
            return View();
        }

        public ActionResult OperationalModule()
        {
            return View();
        }

        public ActionResult PartnerwithUs()
        {
            return View();
        }

        public IActionResult DownloadApp()
        {            
            string saralApkPath = MyServer.MapPath(@"App_Data\saralgb.apk");
            string gbApkPath = MyServer.MapPath(@"App_Data\gbpos.apk");
            ViewBag.saralApkDate = GetLastUpdatedDateTimeString(saralApkPath);
            ViewBag.gbApkDate = GetLastUpdatedDateTimeString(gbApkPath);
            return View();
        }

        private string GetLastUpdatedDateTimeString(string filePath)
        {
            if (!System.IO.File.Exists(filePath))
                return "";

            FileInfo fileInfo = new FileInfo(filePath);
            DateTime lastUpdatedDateTime = fileInfo.LastWriteTimeUtc;
            var utcDate = lastUpdatedDateTime.ToUniversalTime();
            var tzi = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            var localDateTime = TimeZoneInfo.ConvertTimeFromUtc(utcDate, tzi);
            return "Last Modified On: " + localDateTime.ToString("dd/MM/yyyy hh:mm:ss tt");
            
        }

        public IActionResult Pricing()
        {
            return View();

        }
        public IActionResult PrivacyPolicy()
        {
            return View();

        }
        public IActionResult Product()
        {
            return View();

        }
        public IActionResult TandC()
        {
            return View();

        }
        public IActionResult ReturnRefund()
        {
            return View();

        }



        public static string DataRowToCSV(DataRow mRow,string mSeparator ="!")
        {
            StringBuilder sb = new StringBuilder();

            IEnumerable<string> columnNames= mRow.Table.Columns.Cast<DataColumn>().Select(column => column.ColumnName);
            sb.AppendLine(string.Join(mSeparator, columnNames));

            IEnumerable<string?> fields= mRow.ItemArray.Select(field => field?.ToString()??"");
            sb.AppendLine(string.Join(mSeparator, fields));

            return sb.ToString();
        }


        public static DataRow CSVToDataRow(string csvStr, string mSeparator = "!")
        {
            DataTable dtData = new DataTable();
            DataRow dr = dtData.NewRow();

            string[] Lines;
            Lines = csvStr.Split("\r\n".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);
            
            if (Lines.Length > 0)
            {
                foreach (string columnName in Lines[0].Split(mSeparator))
                    dtData.Columns.Add(columnName);
            }

            for (int i = 1; i <= Lines.Length-1; i++)
            {
                string[] rowValues = Lines[i].Split(mSeparator);
                dr = dtData.NewRow();
                dr.ItemArray = rowValues;
                dtData.Rows.Add(dr);
            }

            return dtData.Rows[0];

        }


        public IActionResult Error(string error="") 
        {

            HttpContext.Session.Clear();
            ViewBag.Error = error.ToString();
            return View();
        }


        [HttpPost]
        public JsonResult GetCustomerData(string custcode)
        {
            var cc1 = new CustomerControl.Variables("WebGodaddy");
            SessionControl = cc1;
            string sqlstr = "select m1.custName,m1.mobNo,m1.email,m1.mainbusscode,m2.contactPerson from customers as m1 inner join accmaster as m2 on m1.p_acccode = m2.p_acccode where m1.rowstatus = 0 and m2.rowstatus = 0 and m1.custcode = '" + custcode + "'";
            DataTable dt= df1.SqlExecuteDataTable(SessionControl.MainServerDatabase,sqlstr);
            if (dt.Rows.Count>0)
            {
                dt = df1.AddColumnsInDataTable(ref dt, "isdbexist", "system.string");
                string sql1 = "select dbcustconfig_key from dbcustconfig where custcode='" + custcode + "'";
                DataTable dt1 = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase,sql1);
                if (dt1 is not null && dt1.Rows.Count>0 )
                {
                    dt.Rows[0]["isDbExist"] = "Y";
                }

                return Json(new[] { "1", JsonConvert.SerializeObject(dt)});
            }
            else
            {
                return Json(new[] { "0", "No record found" });
            }
            
        }


        [HttpGet]
        public JsonResult GetBusinessTypes()
        {
            var cc1 = new CustomerControl.Variables("WebGodaddy");
            SessionControl = cc1;
            string sqlstr = "select RTrim(LTrim(nameofinfo)) as nameofinfo, p_infotable from infotable where infotype=7 and rowstatus=0 order by nameofinfo";
            DataTable dt = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase, sqlstr);
            if (dt.Rows.Count > 0)
            {
                return Json(new[] { "1", JsonConvert.SerializeObject(dt) });
            }
            else
            {
                return Json(new[] { "0", "No record found" });
            }
        }
    }
}