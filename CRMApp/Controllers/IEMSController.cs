using CRMApp.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections;
using System.Data;

namespace CRMApp.Controllers
{
    public class IEMSController : Controller
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

        // GET: IEMS
        public ActionResult DailySale()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "DailySale", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow SaralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");

                string corpid =df1.GetCellValue(SaralLoginRow, "userid", "string").ToString()?? "";
                var dtShop = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase, "select shopcode from wineshopmaster where corpid='" + corpid + "'");
                ViewBag.shopCodes = JsonConvert.SerializeObject(dtShop);

                var dtGroup = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "Select * from groupiems order by grouptype");
                ViewBag.groupCodes = JsonConvert.SerializeObject(dtGroup);

                return View();
            }
            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Return packingiems data according to groupcode and brandcode
        /// </summary>
        /// <param name="groupcode"></param>
        /// <param name="brandcode"></param>
        /// <returns></returns>
        public JsonResult AjaxGetPackingData(string groupcode, string brandcode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            if (!string.IsNullOrEmpty(groupcode?.Trim()) & !string.IsNullOrEmpty(brandcode?.Trim()))
            {
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                string sqlstr = @"select m1.packingcode , m1.packingdesc from packingiems as m1 inner join mrpiems on m1.packingcode = mrpiems.packingcode
                                        where mrpiems.groupcode='" + groupcode?.Trim() + "' and mrpiems.brandcode ='" + brandcode + "' order by m1.packingdesc ";
                var dtPacking = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
                if (dtPacking.Rows.Count > 0)
                {
                    return Json(JsonConvert.SerializeObject(dtPacking));
                }
                else
                {
                    return Json("");
                }
            }
            return Json("");
        }


        /// <summary>
        /// Return brandiems data according to Groupcode
        /// </summary>
        /// <param name="groupcode"></param>
        /// <returns></returns>
        public JsonResult AjaxGetBrandData(string groupcode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            if (!string.IsNullOrEmpty(groupcode?.Trim()))
            {
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                string sqlstr = @"select distinct m1.brandcode , m1.brandname from brandiems as m1 inner join mrpiems on m1.brandcode = mrpiems.brandcode
                                        where groupcode='" + groupcode?.Trim() + "' order by m1.brandname ";
                var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
                if (dt.Rows.Count > 0)
                {
                    return Json(JsonConvert.SerializeObject(dt));
                }
                else
                {
                    return Json("");
                }
            }
            return Json("");
        }

        /// <summary>
        /// Return mrp from mrpiems table 
        /// </summary>
        /// <param name="groupcode"></param>
        /// <param name="packingcode"></param>
        /// <param name="brandcode"></param>
        /// <returns></returns>
        public JsonResult AjaxGetMRP(string groupcode, string packingcode, string brandcode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            if (!string.IsNullOrEmpty(groupcode?.Trim()) & !string.IsNullOrEmpty(packingcode?.Trim()) & !string.IsNullOrEmpty(brandcode?.Trim()))
            {
                SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
                string sqlstr = "select mrp from mrpiems where groupcode='" + groupcode?.Trim() + "' and packingcode='" + packingcode?.Trim() + "'  and brandcode='" + brandcode?.Trim() + "'";
                var dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
                if (dt.Rows.Count > 0)
                {
                    return Json(df1.GetCellValue(dt.Rows[0], "mrp", "string"));
                }
                else
                {
                    return Json("");
                }
            }
             return Json("");
        }

        /// <summary>
        /// return shopName from wineshopmaster table for shopcode
        /// </summary>
        /// <returns></returns>
        public JsonResult AjaxGetShopNameFromShopCode(string shopcode)
        {
            string shopName = string.Empty;
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json(shopName);
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            var dtShopName = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase, "select shopname from wineshopmaster where shopcode='" + shopcode?.Trim() + "'");
            if (dtShopName.Rows.Count > 0)
            {
                shopName = df1.GetCellValue(dtShopName.Rows[0], "shopname", "string").ToString()??"";
            }
            return Json(shopName);
        }



        /// <summary>
        /// Return saleiems table data with pagination
        /// </summary>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public JsonResult AjaxGetDailySaleDataForGrid(int? start, int pSize = 50, string search = "", string order = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "DailySale", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow SaralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
                if (SaralLoginRow is  null)
                    return Json("");
                
                
                string corpid = df1.GetCellValue(SaralLoginRow, "userid", "string").ToString()?? "";
                var dtShop = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase, "select shopname,shopcode from wineshopmaster where corpid='" + corpid + "'");
                string shopCodes = string.Empty;
                if (dtShop.Rows.Count > 0)
                {
                    for (int i = 0, loopTo = dtShop.Rows.Count - 1; i <= loopTo; i++)
                        shopCodes += ", '" + df1.GetCellValue(dtShop.Rows[i], "shopcode", "string").ToString()?.Trim() + "'";
                    if (!string.IsNullOrEmpty(shopCodes))
                    {
                        if (shopCodes.First() == ',')
                            shopCodes = shopCodes.Substring(1, shopCodes.Length - 1);
                    }
                }
                else
                {
                    return Json("");
                }

                var currentDate = df1.GetDateTimeISTNow();
                string condition = " and m1.saledate ='" + currentDate.ToString("yyyy-MM-dd") + "' and shopcode in (" + shopCodes + ")";
                if (!string.IsNullOrEmpty(search.Trim()))
                {
                    condition = cfc1.GetSearchString(search);
                }
                if (string.IsNullOrEmpty(order?.Trim()))
                    order = "m1.saledate desc";

                
                int a = getRowsCountSaleIEMS(condition, SessionControl.UserServerDatabase);
                decimal totalAmt = getTotalAmountForSaleIEMSDataGrid(condition, SessionControl.UserServerDatabase);
                //var dtSaleiems = getSaleIEMSDataGrid(dtShop, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase, condition, order, start, pSize);
                var dtSaleiems = getSaleIEMSDataGrid(dtShop,DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase, condition, order, start, pSize);
                var objdatatableToList = new DataTypeConversionLib.DTResult<SaleIEMSModel>();
                objdatatableToList = (DataTypeConversionLib.DTResult<SaleIEMSModel>)DCLib.ConvertDTtoModal<SaleIEMSModel>(dtSaleiems, Convert.ToInt32(start), a, dtSaleiems.Rows.Count);
                return Json("{\"data\":" + JsonConvert.SerializeObject(objdatatableToList) + ",\"totalAmt\":" + totalAmt + "}");
            }
            return Json("");
        }

        /// <summary>
        /// Final Total amount of Sale according to given search condition
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="serverdatabase"></param>
        /// <returns></returns>
        public decimal getTotalAmountForSaleIEMSDataGrid(string condition, string serverdatabase)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return 0m;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string sqlstr = "Select sum(m1.sale_qty * m1.amount) as TotalAmout from saleiems as m1 where rowstatus=0 " + condition;
            var dt = df1.SqlExecuteDataTable(serverdatabase, sqlstr);
            if (dt.Rows.Count > 0)
            {
                return Convert.ToDecimal(df1.GetCellValue(dt.Rows[0], "TotalAmout", "decimal"));
            }
            else
            {
                return 0m;
            }

        }


        /// <summary>
        /// Retrun dt of saleiems
        /// </summary>
        /// <param name="dtWineshopMaster"></param>
        /// <param name="dtInfotable"></param>
        /// <param name="dtInfotableUser"></param>
        /// <param name="serverdatabase"></param>
        /// <param name="condition"></param>
        /// <param name="order"></param>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <returns></returns>
        public DataTable getSaleIEMSDataGrid(DataTable dtWineshopMaster, DataTable dtInfotable, DataTable dtInfotableUser, string serverdatabase, string condition, string order, int? start, int pSize)
        {
            var dt = new DataTable();
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return  dt;
            }
            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            
            string lcondition = string.IsNullOrEmpty(condition)? " m1.rowstatus=0 " : "m1.rowstatus=0 " + condition;
            string lorder = string.IsNullOrEmpty(order)? "m1.saledate desc" : order;
            string ljoin = " left join  groupiems on m1.groupcode = groupiems.groupcode left join brandiems on m1.brandcode= brandiems.brandcode left join packingiems on m1.packingcode = packingiems.packingcode";
            string lselect = "m1.saledate,groupiems.grouptype,brandiems.brandname,packingiems.packingdesc,m1.sale_qty,m1.amount as mrp,(m1.sale_qty*m1.amount) as total,m1.invoiceid,m1.invoicetype,m1.shopcode,m1.saleiems_key,m1.p_saleiems ";

            string argLtable = "SaleIEMS";
            string argLfilter = "";
            int argStartRowPostion = Convert.ToInt32(start);
            int argTotalRows = -1;
            dt = df1.GetDataFromSqlFixedRows(ref serverdatabase, ref argLtable, ref lselect, ref ljoin, ref lcondition, ref argLfilter, ref lorder, ref argStartRowPostion, pSize, ref argTotalRows);
            start = argStartRowPostion;
            df1.AddColumnsInDataTable(ref dt, "FrmtSaleDate,shopName", "System.String,System.String");
            for (int i = 0, loopTo = dt.Rows.Count - 1; i <= loopTo; i++)
            {
                if (dt.Rows[i]["saledate"] is DBNull == false)
                {
                    DateTime saledate = Convert.ToDateTime(dt.Rows[i]["saledate"]);
                    dt.Rows[i]["FrmtSaleDate"] = saledate.ToString("dd-MM-yyyy");
                }
                else
                {
                    dt.Rows[i]["FrmtSaleDate"] = "";
                }

                var dr = dtWineshopMaster.Select("shopcode="+ dt.Rows[i]["shopcode"]).FirstOrDefault();
                if (!(dr is null))
                {
                    dt.Rows[i]["shopName"] = df1.GetCellValue(dr, "shopname", "string");
                }
                else
                {
                    dt.Rows[i]["shopName"] = "";
                }

            }
            return dt;
        }


        /// <summary>
        /// Get Rows Count for SaleIems table
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="serverdatabase"></param>
        /// <returns></returns>
        public int getRowsCountSaleIEMS(string condition, string serverdatabase)
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return 0;
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            string sqlstr = "select count(p_saleiems) as Rcount from saleiems as m1 where m1.rowstatus= 0 " + condition;
            var dt = df1.SqlExecuteDataTable(serverdatabase, sqlstr);
            return dt.Rows.Count > 0? Convert.ToInt32(df1.GetCellValue(dt.Rows[0], "Rcount", "integer")) : 0;
        }

        /// <summary>
        /// Insert data into saleiems table
        /// </summary>
        /// <param name="objSaleIems"></param>
        /// <returns></returns>
        public JsonResult AjaxPostDailySale(SaleIEMSModel objSaleIems)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "DailySale", HttpContext.Session.GetString("serverdatabase")))
            {
                if (ModelState.IsValid)
                {
                    var dthash = new Hashtable();
                    var dt = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase, "Select licenseecode from wineshopmaster where shopcode='" + objSaleIems.shopcode?.Trim() + "'");
                    if (dt.Rows.Count > 0)
                        dthash = gf1.AddItemToHashTable(ref dthash, "licensee_code", df1.GetCellValue(dt.Rows[0], "licenseecode", "string").ToString()?.Trim(), true);
                    
                    dthash = gf1.AddItemToHashTable(ref dthash, "shopcode", objSaleIems.shopcode?.Trim(), true);
                    dthash = gf1.AddItemToHashTable(ref dthash, "groupcode", objSaleIems.groupcode?.Trim(), true);
                    dthash = gf1.AddItemToHashTable(ref dthash, "brandcode", objSaleIems.brandcode?.Trim(), true);
                    dthash = gf1.AddItemToHashTable(ref dthash, "packingcode", objSaleIems.packingcode?.Trim(), true);
                    dthash = gf1.AddItemToHashTable(ref dthash, "sale_qty", objSaleIems.sale_qty, true);
                    dthash = gf1.AddItemToHashTable(ref dthash, "amount", objSaleIems.total, true);
                    dthash = gf1.AddItemToHashTable(ref dthash, "saledate", objSaleIems.saledate, true);
                    dthash = gf1.AddItemToHashTable(ref dthash, "invoiceid", objSaleIems.invoiceid, true);
                    dthash = gf1.AddItemToHashTable(ref dthash, "invoicetype", objSaleIems.invoicetype, true);

                    int argp_saleiems = -1;
                    int p_SaleIEMS = libSaralAuth.InsertUpdateSaleIems(ref argp_saleiems, ref dthash, SessionControl.UserServerDatabase);
                    if (p_SaleIEMS > 0)
                    {
                        return Json("success");
                    }
                    else
                    {
                        return Json("");
                    }
                }
                return Json("err-Model");
            }
            return Json("");
        }

        /// <summary>
        /// Delete data from saleiems table for given p_saleiems
        /// </summary>
        /// <param name="p_saleiems"></param>
        /// <returns></returns>
        public JsonResult AjaxDeleteSaleData(string p_saleiems)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "DailySale", HttpContext.Session.GetString("serverdatabase")))
            {
                if (!string.IsNullOrEmpty(p_saleiems?.Trim()))
                {
                    string sqlstr = "delete from saleiems where p_saleiems in (" + p_saleiems + ")";
                    int a = df1.SqlExecuteNonQuery(SessionControl.UserServerDatabase, sqlstr);
                    if (a > 0)
                        return Json("success");

                }
            }
            return Json("");
        }


        public JsonResult ExportToExcel(string search = "", string order = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "DailySale", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow SaralLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("saralloginrow") ?? "");
                DataRow UserLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");

                if (SaralLoginRow is  null)
                    return Json("");
                
               
                string userid = df1.GetCellValue(UserLoginRow, "userid", "string").ToString()??"";
                string corpid =df1.GetCellValue(SaralLoginRow, "userid", "string").ToString()??"";

                var dtShop = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase, "select shopname,shopcode from wineshopmaster where corpid='" + corpid + "'");
                string shopCodes = string.Empty;
                if (dtShop.Rows.Count > 0)
                {
                    for (int i = 0, loopTo = dtShop.Rows.Count - 1; i <= loopTo; i++)
                        shopCodes += ", '" + df1.GetCellValue(dtShop.Rows[i], "shopcode", "string").ToString()?.Trim() + "'";
                    if (!string.IsNullOrEmpty(shopCodes))
                    {
                        if (shopCodes.First() == ',')
                            shopCodes = shopCodes.Substring(1, shopCodes.Length - 1);
                    }
                }
                else
                {
                    return Json("");
                }

                var currentDate = df1.GetDateTimeISTNow();
                string condition = " and m1.saledate ='" + currentDate.ToString("yyyy-MM-dd") + "' and shopcode in (" + shopCodes + ")";
                if (!string.IsNullOrEmpty(search?.Trim()))
                    condition = cfc1.GetSearchString(search);
                
                if (string.IsNullOrEmpty(order?.Trim()))
                    order = "m1.saledate desc";

                int a = getRowsCountSaleIEMS(condition, SessionControl.UserServerDatabase);
                decimal totalAmt = getTotalAmountForSaleIEMSDataGrid(condition, SessionControl.UserServerDatabase);
                //var dtSaleiems = getSaleIEMSDataGrid(dtShop, DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase, condition, order, 0, a);
                var dtSaleiems = getSaleIEMSDataGrid(dtShop, DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase, condition, order, 0, a);
                if (dtSaleiems.Rows.Count > 0)
                {
                    // dtSaleiems.Columns.Remove("saleiems_key")
                    dtSaleiems.Columns.Remove("p_saleiems");
                    dtSaleiems.Columns.Remove("FrmtSaleDate");
                    string filePath = MyServer.MapPath("App_Data/");
                    string fileName = "DailySale(IEMS)Data_" + corpid?.Trim() + "_" + userid?.Trim() + ".xlsx";
                    df1.CreateExcelFromDataTable(ref dtSaleiems, filePath + fileName, "saleiems_key");
                    return Json(fileName);
                }
                return Json("");
            }
            return Json("");
        }

        public ActionResult downloadDailySaleExcel(string filename)
        {
            //Response.Clear();
            //Response.Headers.Add("Content-Disposition", "attachment;filename=" + filename);
            //Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            ////Response.WriteFile(Server.MapPath("~/App_Data/") + filename);
            ////Response.End();
            //return default;

            string filePath = MyServer.MapPath(@"App_Data\" + filename);
            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                stream.CopyTo(memory);
            }
            memory.Position = 0;
            return File(memory, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename);

        }






    }
}
