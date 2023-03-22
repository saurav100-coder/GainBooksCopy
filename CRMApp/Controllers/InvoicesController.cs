using CRMApp.Models;
using DocumentFormat.OpenXml.Presentation;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections;
using System.Data;
using System.Security.Policy;
using System.Text;

namespace CRMApp.Controllers
{
    public class InvoicesController : Controller
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
        private object? _libcustfeat = null;
        private CustomerFeatureLib.CustomerFeatureFunctions libcustfeat
        {
            get
            {
                if (_libcustfeat is null)
                {
                    var argSessionInstance = SessionControl;
                    _libcustfeat = new CustomerFeatureLib.CustomerFeatureFunctions(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _libcustfeat = (CustomerFeatureLib.CustomerFeatureFunctions)_libcustfeat;
                }
                return (CustomerFeatureLib.CustomerFeatureFunctions)_libcustfeat;
            }
        }

        DataTable DtInfoTable = new DataTable();
        DataTable DtInfoTableuser = new DataTable();

        public void SetSessionControl(int userloginkey_Saralweb)
        {
            SessionControl = new CustomerControl.Variables(HttpContext.Session.GetString("saraltype"), ControlTxtFile: HttpContext.Session.GetString("textcontrolfile"), encrypted: true);
            DataTable dt = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase, "select userid  from userlogin where userlogin_key=" + userloginkey_Saralweb);
            if (dt.Rows.Count > 0)
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
            saleOrderLib.SessionControl = sessionControl;
            libcustfeat.SessionControl = sessionControl;
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

        public ActionResult Bills()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Orders", HttpContext.Session.GetString("serverdatabase")))
                return View();

            return RedirectToAction("LogOut", "Home");
        }

        /// <summary>
        /// Get SaleOrder data from Billheader Table
        /// </summary>
        /// <param name="start"></param>
        /// <param name="pSize"></param>
        /// <param name="search"></param>
        /// <param name="order"></param>
        /// <returns></returns>
        public JsonResult AjaxGetSaleOrdersDataForGrid(int? start, int pSize = 500, string search = "", string order = "")
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Orders", HttpContext.Session.GetString("serverdatabase")))
            {
                var currentDate = df1.GetDateTimeISTNow();
                string condition = " and m1.billdate >='" + currentDate.ToString("yyyy-MM-dd") + "'";

                if (!string.IsNullOrEmpty(search?.Trim()))
                    condition = cfc1.GetSearchString(search);

                if (string.IsNullOrEmpty(order?.Trim()))
                    order = "m1.billdate desc";

                var dtEmp = libSaralAuth.GetActiveEmployeesFromAccMaster(SessionControl.UserServerDatabase, "p_acccode,accname");
                //var dtCustomers = libcustfeat.getcustomersDatatable(" activeflag='Y' and (updateflag <>'D' or updateflag is null)", DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotable")), DCLib.ConvertJSONToDataTableNew(HttpContext.Session.GetString("infotableuser")), SessionControl.UserServerDatabase, "p_customers,custcode,custname");
                var dtCustomers = libcustfeat.getcustomersDatatable(" activeflag='Y' and (updateflag <>'D' or updateflag is null)", DtInfoTable, DtInfoTableuser, SessionControl.UserServerDatabase, "p_customers,custcode,custname");
                int a = saleOrderLib.getRowsCountSaleOrdersDataForGrid(condition, SessionControl.UserServerDatabase);
                //var dt = saleOrderLib.getSaleOrdersDataForGrid(libSaralAuth.GetInfoTable(SessionControl.UserServerDatabase), libSaralAuth.GetInfoTableUser(SessionControl.UserServerDatabase), dtEmp, dtCustomers, SessionControl.UserServerDatabase, condition, order, start, pSize);
                var dt = saleOrderLib.getSaleOrdersDataForGrid(DtInfoTable, DtInfoTableuser, dtEmp, dtCustomers, SessionControl.UserServerDatabase, condition, order, start, pSize);
                var objdatatableToList = new DataTypeConversionLib.DTResult<BillHeaderModel>();
                objdatatableToList = (DataTypeConversionLib.DTResult<BillHeaderModel>)DCLib.ConvertDTtoModal<BillHeaderModel>(dt, Convert.ToInt32(start), a, dt.Rows.Count);
                return Json("{\"data\":" + JsonConvert.SerializeObject(objdatatableToList) + "}");
            }
            return Json("");
        }

        public JsonResult AjaxGetBillItemsDataForPBillheader(int p_billheader)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "Orders", HttpContext.Session.GetString("serverdatabase")))
            {
                var dt = saleOrderLib.getBillItemsDataForPBillheader(p_billheader, SessionControl.UserServerDatabase);
                var objdatatableToList = new DataTypeConversionLib.DTResult<BillItemsModel>();
                objdatatableToList = (DataTypeConversionLib.DTResult<BillItemsModel>)DCLib.ConvertDTtoModal<BillItemsModel>(dt, 0, dt.Rows.Count, dt.Rows.Count);
                return Json("{\"data\":" + JsonConvert.SerializeObject(objdatatableToList) + "}");
            }
            return Json("");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="p_billheaders">Comma separated p_billheader string</param>
        /// <returns></returns>
        public JsonResult ExportToIEMS(string p_billheaders)
        {

            return Json("");
        }

        /// <summary>
        /// insert bill summary into saleiems table
        /// </summary>
        /// <param name="p_billheaders"></param>
        /// <returns></returns>
        public JsonResult GenerateBillSummary(string p_billheaders, string search = "")
        {
            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("Norows");
            }
            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (string.IsNullOrEmpty(p_billheaders?.Trim()) && !string.IsNullOrEmpty(search?.Trim()))
            {
                string condition = cfc1.GetSearchString(search);
                var dt1 = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "select p_billheader from billheader as m1 where m1.rowstatus=0 " + condition);
                if (dt1.Rows.Count > 0)
                {
                    for (int l = 0, loopTo = dt1.Rows.Count - 1; l <= loopTo; l++)
                        p_billheaders += "," + df1.GetCellValue(dt1.Rows[l], "p_billheader");

                    if (!string.IsNullOrEmpty(p_billheaders?.Trim()))
                    {
                        if (p_billheaders.First() == ',')
                            p_billheaders = p_billheaders.Substring(1, p_billheaders.Length - 1);
                    }
                }
            }
            if (!string.IsNullOrEmpty(p_billheaders?.Trim()))
            {
                var dtBillheader = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "Select max(billdate) as billdate from billheader where rowstatus=0 and p_billheader in (" + p_billheaders + ")");
                string? strBillDate = df1.GetCellValue(dtBillheader.Rows[0], "billdate", "string").ToString();
                var maxBillDate = DateTime.Parse(strBillDate);
                string shopcode = "";
                string licensee_Code = "";
                var dtShopcontrol = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "select * from shopcontrol where rowstatus=0");
                if (dtShopcontrol.Rows.Count > 0)
                {
                    shopcode = df1.GetCellValue(dtShopcontrol.Rows[0], "shopcode", "string").ToString()?.Trim() ?? "";
                    licensee_Code = df1.GetCellValue(dtShopcontrol.Rows[0], "licenseecode", "string").ToString()?.Trim() ?? "";
                }

                string sqlstr = "select * from billitems where rowstatus=0 and p_billheader in (" + p_billheaders + ")";
                var dtBillitems = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
                if (dtBillitems.Rows.Count > 0)
                {
                    var dtDistProdCode = dtBillitems.DefaultView.ToTable(true, "prodcode");
                    var dt = new DataTable();
                    dt = df1.AddColumnsInDataTable(ref dt, "prodcode,qty,totalamt", "System.String,System.Double,System.Double");
                    for (int i = 0, loopTo1 = dtDistProdCode.Rows.Count - 1; i <= loopTo1; i++)
                    {
                        var dr = dtBillitems.Select("prodcode='" + dtDistProdCode.Rows[i]["prodcode"] + "'");
                        double qty = 0d;
                        double totalamt = 0d;
                        for (int j = 0, loopTo2 = dr.Length - 1; j <= loopTo2; j++)
                        {
                            qty = qty + Convert.ToDouble(dr[j]["itemqty"]);
                            totalamt = totalamt + Convert.ToDouble(dr[j]["itemamount"]);
                        }
                        var newRow = dt.NewRow();
                        newRow["prodcode"] = dtDistProdCode.Rows[i]["prodcode"];
                        newRow["qty"] = qty;
                        newRow["totalamt"] = totalamt;
                        dt.Rows.Add(newRow);
                    }
                    var dtsrl_pro = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "select * from srl_pro where rowstatus=0 ");
                    var dtiemsgroups = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, "select * from iemsgroups where rowstatus=0 ");
                    for (int k = 0, loopTo3 = dt.Rows.Count - 1; k <= loopTo3; k++)
                    {
                        string groupcode = "";
                        string brandcode = "";
                        string packingcode = "";
                        var drsrl_pro = dtsrl_pro?.Select("prodcode='" + dt.Rows[k]["prodcode"] + "'").FirstOrDefault();
                        if (!(dtsrl_pro is null))
                        {
                            var drgroupcode = dtiemsgroups.Select("grouptype='U' and iemscode=" + Convert.ToInt32(df1.GetCellValue(drsrl_pro, "ugroup", "integer"))).FirstOrDefault();
                            if (!(drgroupcode is null))
                            {
                                groupcode = df1.GetCellValue(drgroupcode, "p_iemsgroups").ToString() ?? "";
                            }
                            var drbrandcode = dtiemsgroups.Select("grouptype='B' and iemscode=" + Convert.ToInt32(df1.GetCellValue(drsrl_pro, "bgroup", "integer"))).FirstOrDefault();
                            if (!(drbrandcode is null))
                            {
                                brandcode = df1.GetCellValue(drbrandcode, "p_iemsgroups").ToString() ?? "";
                            }
                            var drpackingcode = dtiemsgroups.Select("grouptype='P' and iemscode=" + Convert.ToInt32(df1.GetCellValue(drsrl_pro, "unitgroup", "integer"))).FirstOrDefault();
                            if (!(drpackingcode is null))
                            {
                                packingcode = df1.GetCellValue(drpackingcode, "p_iemsgroups").ToString() ?? "";
                            }
                        }
                        var dthash = new Hashtable();
                        dthash = gf1.AddItemToHashTable(ref dthash, "prodcode", dt.Rows[k]["prodcode"], true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "shopcode", shopcode, true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "licensee_code", "@licensee_", true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "authentication_code", "@authentication_code", true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "groupcode", groupcode, true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "brandcode", brandcode, true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "packingcode", packingcode, true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "sale_qty", dt.Rows[k]["qty"], true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "amount", dt.Rows[k]["totalamt"], true);
                        dthash = gf1.AddItemToHashTable(ref dthash, "saledate", maxBillDate, true);

                        int argp_saleiems = -1;
                        saleOrderLib.InsertUpdateSaleIems(ref argp_saleiems, ref dthash, SessionControl.UserServerDatabase);
                    }
                    return Json("success");
                }
                else
                {
                    return Json("err");
                }
            }
            else
            {
                return Json("Norows");
            }


        }


        public ActionResult UpdateOpeningStock()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "UpdateOpeningStock", HttpContext.Session.GetString("serverdatabase")))
                return View();

            return RedirectToAction("LogOut", "Home");
        }

        public JsonResult AjaxUpdateStock()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "UpdateOpeningStock", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string filename1 = "";
                if (Request.Form.Files.Count > 0)
                {
                    var File = Request.Form.Files[0];
                    if (!string.IsNullOrEmpty(File.FileName.Trim()))
                    {
                        DataRow userRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                        string userID = userRow["UserID"].ToString() ?? "";
                        string RegfolderPath = MyServer.MapPath(HttpContext.Session.GetString("corpid") + "/documents/").Replace(@"sites\gainbooks.com", "gainbooksdata");
                        if (!Directory.Exists(RegfolderPath))
                            Directory.CreateDirectory(RegfolderPath);

                        if (File is not null)
                        {
                            string Filename = File.FileName;
                            filename1 = Path.GetFileNameWithoutExtension(File.FileName);
                            string filepathName = RegfolderPath + Filename;
                            filename1 = cfc1.CheckAndCreateFileName(Filename, RegfolderPath);
                            //File.SaveAs(RegfolderPath + filename1); //Aslam_File_Check_done
                            using (FileStream fs = new FileStream(RegfolderPath + filename1, FileMode.Create))
                            {
                                File.CopyTo(fs);
                            }

                            var dt = df1.GetDataFromExcel(RegfolderPath + filename1);

                            // 'Get CommaSeparated string of prodcode 
                            string prodcodeStr = "";
                            for (int j = 0, loopTo = dt.Rows.Count - 1; j <= loopTo; j++)
                            {
                                if (!(dt.Rows[j]["prodcode"] is DBNull) && !(string.IsNullOrEmpty(df1.GetCellValue(dt.Rows[j], "prodcode", "string").ToString())))
                                {
                                    prodcodeStr += ",'" + df1.GetCellValue(dt.Rows[j], "prodcode", "string") + "'";
                                }
                            }
                            if (!string.IsNullOrEmpty(prodcodeStr?.Trim()) && prodcodeStr.First() == ',')
                                prodcodeStr = prodcodeStr.Substring(1, prodcodeStr.Length - 1);

                            int a = 0;
                            var listSrlPro = new List<Hashtable>();
                            var listSrlBch = new List<Hashtable>();

                            for (int k = 0, loopTo1 = dt.Rows.Count - 1; k <= loopTo1; k++)
                            {
                                string? prodcode = df1.GetCellValue(dt.Rows[k], "prodcode", "string").ToString();
                                if (!(dt.Rows[k]["prodcode"] is DBNull) && !string.IsNullOrEmpty(prodcode?.Trim()))
                                {
                                    var srlProHash = new Hashtable();
                                    var srlBchHash = new Hashtable();
                                    // 'For SrlBch
                                    var tmp = dt.Rows;
                                    var argmRow = tmp[k];
                                    srlBchHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlBchHash, "quantity", ref argmRow, "openingstock", "decimal");
                                    var tmp1 = dt.Rows;
                                    var argmRow1 = tmp1[k];
                                    srlBchHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlBchHash, "mrp", ref argmRow1, "mrp", "decimal");
                                    var tmp2 = dt.Rows;
                                    var argmRow2 = tmp2[k];
                                    srlBchHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlBchHash, "ptr", ref argmRow2, "sellingprice", "decimal");
                                    var tmp3 = dt.Rows;
                                    var argmRow3 = tmp3[k];
                                    srlBchHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlBchHash, "msp", ref argmRow3, "msp", "decimal");
                                    if (srlBchHash.Count > 0)
                                    {
                                        srlBchHash = gf1.AddItemToHashTable(ref srlBchHash, "prodcode", prodcode);
                                        listSrlBch.Add(srlBchHash);
                                    }

                                    // 'For SrlPro
                                    var tmp4 = dt.Rows;
                                    var argmRow4 = tmp4[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "prodname", ref argmRow4, "prodname", "string");
                                    var tmp5 = dt.Rows;
                                    var argmRow5 = tmp5[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "displcode", ref argmRow5, "displcode", "string");
                                    var tmp6 = dt.Rows;
                                    var argmRow6 = tmp6[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "packing", ref argmRow6, "packing", "string");
                                    var tmp7 = dt.Rows;
                                    var argmRow7 = tmp7[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "unitsintoppkg", ref argmRow7, "unitsintoppkg", "decimal");
                                    var tmp8 = dt.Rows;
                                    var argmRow8 = tmp8[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "unitsinmedpkg", ref argmRow8, "unitsinmedpkg", "decimal");
                                    var tmp9 = dt.Rows;
                                    var argmRow9 = tmp9[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "unitsinmrppack", ref argmRow9, "unitsinmrppack", "decimal");
                                    var tmp10 = dt.Rows;
                                    var argmRow10 = tmp10[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "unitsinbulk", ref argmRow10, "unitsinbulk", "decimal");
                                    var tmp11 = dt.Rows;
                                    var argmRow11 = tmp11[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "ugroup", ref argmRow11, "ugroup", "integer");
                                    var tmp12 = dt.Rows;
                                    var argmRow12 = tmp12[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "agroup", ref argmRow12, "agroup", "integer");
                                    var tmp13 = dt.Rows;
                                    var argmRow13 = tmp13[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "bgroup", ref argmRow13, "bgroup", "integer");
                                    var tmp14 = dt.Rows;
                                    var argmRow14 = tmp14[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "unitgroup", ref argmRow14, "unitgroup", "integer");
                                    var tmp15 = dt.Rows;
                                    var argmRow15 = tmp15[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "iemscode", ref argmRow15, "iemscode", "integer");
                                    var tmp16 = dt.Rows;
                                    var argmRow16 = tmp16[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "itemtype", ref argmRow16, "itemtype", "string");
                                    var tmp17 = dt.Rows;
                                    var argmRow17 = tmp17[k];
                                    srlProHash = cfc1.AddValueToHashTableIfNotEmptyOrNull(ref srlProHash, "userprodcode", ref argmRow17, "userprodcode", "string");
                                    if (srlProHash.Count > 0)
                                    {
                                        srlProHash = gf1.AddItemToHashTable(ref srlProHash, "prodcode", prodcode);
                                        listSrlPro.Add(srlProHash);
                                    }
                                }
                            }
                            a = saleOrderLib.InsertUpdateInSRLProSrlBchUsingTrans(prodcodeStr, listSrlPro, listSrlBch, sessionRow, SessionControl.UserServerDatabase);

                            System.IO.File.Delete(RegfolderPath + filename1);
                            if (a > 0)
                            {
                                return Json("success");
                            }
                            else
                            {
                                return Json("");
                            }

                        }
                    }
                }
                return Json("");
            }
            return Json("");
        }


        public ActionResult ManageProducts()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "manageproducts", HttpContext.Session.GetString("serverdatabase")))
            {
                bool allowAddProduct = libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addproduct", SessionControl.UserServerDatabase);
                ViewBag.allowAddProduct = allowAddProduct;

                bool allowEditProduct = libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "editproduct", SessionControl.UserServerDatabase);
                ViewBag.allowEditProduct = allowEditProduct;

                DataRow LoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                string? searchcondition = "infotype='searchstring' and viewid='browseproduct' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(df1.GetCellValue(LoginRow, "Userlogin_key", "integer")) + "";
                var searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                if (searchdr is null)
                {
                    searchcondition = "infotype='searchstring' and viewid='browseproduct' and  rowstatus=0 and Userlogin_key=0";
                    searchdr = libSaralAuth.GetViewSettingsRowforLcondition(searchcondition, SessionControl.UserServerDatabase);
                }

                string Infostring = df1.GetCellValue(searchdr, "infostring", "string").ToString() ?? "";
                var infoStringArr = Infostring.Split('@');
                ViewBag.filterString = infoStringArr[0];

                string? sortcondition = "infotype='sortstring' and viewid='browseproduct' and  rowstatus=0 and Userlogin_key=" + Convert.ToInt32(df1.GetCellValue(LoginRow, "Userlogin_key", "integer")) + "";
                var sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                if (sortdr is null)
                {
                    sortcondition = "infotype='sortstring' and viewid='browseproduct' and  rowstatus=0 and Userlogin_key=0";
                    sortdr = libSaralAuth.GetViewSettingsRowforLcondition(sortcondition, SessionControl.UserServerDatabase);
                }
                ViewBag.sortString = df1.GetCellValue(sortdr, "infostring", "string");


                var drusersettings = libSaralAuth.getUserSettingsRowFromUserLogin_key(Convert.ToInt32(df1.GetCellValue(LoginRow, "userlogin_key", "integer")), SessionControl.UserServerDatabase, "settingsstring");
                string? settingString = (string?)df1.GetCellValue(drusersettings, "settingsstring", "string");

                string showscheme = gf1.GetKeywordValueFromCompositeField(settingString, "showscheme", "~", "=");
                ViewBag.showscheme = showscheme;

                return View();
            }


            return RedirectToAction("LogOut", "Home");
        }


        public JsonResult ProductInfoGet(int? start, int pSize = 50, string search = "", string order = "", string? itemtype = "B",string? withbch="Y")
        {
            string jsondata = string.Empty;
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return Json("");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return Json("");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")))
            {
                string condition = string.Empty;
                if (!string.IsNullOrEmpty(search))
                    condition = cfc1.GetSearchString(search);

                condition = " and baserate <> 0 " + condition;
                int a = saleOrderLib.GetSrlProCount(SessionControl.UserServerDatabase, condition, itemtype);
                DataTable dt = saleOrderLib.getSrlproDetails(start, SessionControl.UserServerDatabase, pSize, condition, order, itemtype);
                DateTime lstdt = GetlastupdtDatetime("gb_pro", SessionControl);
                //jsondata = "{\"recordsTotal\":" + a + ",\"lastupdatedtime\":" + @"""" + lstdt.ToString("yyyy-MM-dd'T'HH:mm:ss") + @"""" + ",\"draw\":" + start + ",\"data\":[";
                jsondata = "{\"recordsTotal\":" + a + ",\"lastupdatedtime\":" + @"""" + lstdt.ToString("yyyy-MM-dd'T'HH:mm:ss") + @"""" + ",\"draw\":" + start + ",\"data\":";

                if (!string.Equals(withbch,"y",StringComparison.OrdinalIgnoreCase))
                {
                    jsondata += JsonConvert.SerializeObject(dt) + "}";
                }
                else
                {
                    jsondata += "[";
                    if (dt.Rows.Count > 0)
                    {
                        string prodcodes = "";
                        for (int j = 0; j <= dt.Rows.Count - 1; j++)
                        {
                            prodcodes += ",'" + Convert.ToString(df1.GetCellValue(dt.Rows[j], "prodcode", "string")) + "'";
                        }
                        if (Convert.ToString(prodcodes.Trim().First()) == ",")
                            prodcodes = prodcodes.Substring(1, prodcodes.Length - 1);


                        DataTable dtBch = saleOrderLib.GetSrlBchdatabyProdcode(prodcodes, SessionControl.UserServerDatabase, "");

                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            DataRow srlProRow = dt.Rows[i];
                            DataRow[] srlBchRows = dtBch.Select("prodcode='" + df1.GetCellValue(srlProRow, "prodcode", "string").ToString() + "'");
                            if (srlBchRows.Count() > 0)
                            {
                                DataTable dtSrlBch = srlBchRows.CopyToDataTable();
                                DataTable dtSrlPro = dt.Clone();
                                dtSrlPro.ImportRow(srlProRow);
                                string tempSrlProJson = JsonConvert.SerializeObject(dtSrlPro);
                                tempSrlProJson = tempSrlProJson.Substring(1, tempSrlProJson.Length - 3);
                                tempSrlProJson += ",\"srlBch\":" + JsonConvert.SerializeObject(dtSrlBch) + "},";
                                jsondata += tempSrlProJson;
                            }
                        }
                    }

                    jsondata = jsondata.TrimEnd(',');
                    jsondata += "]}";
                }
                
            }
            return Json(jsondata);

        }



        public DateTime GetlastupdtDatetime(String mastername, CustomerControl.Variables Sessioncont)
        {
            String sql = "select top 1 mtimestamp from reqtable where status = 'F' and rowstatus =0 and corpid = '" + Sessioncont.corpid + "' and request_name='" + mastername + "' order by reqtable_key desc";
            DataTable dt = df1.SqlExecuteDataTable(Sessioncont.MainServerDatabase, sql);
            if (dt == null) return new DateTime(1900, 1, 1, 0, 0, 0);
            if (dt.Rows.Count == 0) return new DateTime(1900, 1, 1, 0, 0, 0);
            return Convert.ToDateTime(dt.Rows[0]["mtimestamp"]);

        }


        [HttpGet]
        public ActionResult ProductForm(string exitmode, string prodcode = "")
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
                return RedirectToAction("LogOut", "Home");

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addproduct", HttpContext.Session.GetString("serverdatabase")))
            {
                var productObt = new ProductMaster();
                if (string.Equals(exitmode, "edit", StringComparison.OrdinalIgnoreCase))
                {
                    string colstr = "m1.prodcode,m1.displcode,m1.packing,m1.locked,m1.minorderqty,m1.maxorderqty,m1.userprodcode,m2.mrp,m2.ptr,m1.baserate,m1.prodname,m1.compositefields";
                    DataTable dt = saleOrderLib.GetProductDetailByProdcode(SessionControl.UserServerDatabase, prodcode, colstr);
                    productObt = DCLib.GetModelFromDataRow<ProductMaster>(dt.Rows[0]);
                }

                string condition = "infotype='compositestring' and viewid='productForm' and  rowstatus=0 ";
                var dr = libSaralAuth.GetViewSettingsRowforLcondition(condition, SessionControl.UserServerDatabase);
                if (dr is not null)
                    productObt.infoString = df1.GetCellValue(dr, "infostring", "string").ToString() ?? "";
                else
                    productObt.infoString = "";

                ViewBag.CalledFrom = exitmode?.ToLower();
                return View(productObt);
            }
            return RedirectToAction("LogOut", "Home");
        }

        [HttpPost]
        public ActionResult ProductForm(IFormCollection fc)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "addproduct", HttpContext.Session.GetString("serverdatabase")))
            {
                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");

                var argSessionInstance = SessionControl;
                //var Clssrl_pro = new srl_pro.srl_pro.srl_pro(ref argSessionInstance);
                //var Clssrl_bch = new srl_bch.srl_bch.srl_bch(ref argSessionInstance);
                var Clssrl_pro = new srl_propharma.srl_propharma.srl_propharma(ref argSessionInstance);
                var Clssrl_bch = new srl_bchpharma.srl_bchpharma.srl_bchpharma(ref argSessionInstance);
                SessionControl = argSessionInstance;

                var srl_proHash = DCLib.ConvertIFCToHashTable(fc, Clssrl_pro);
                var srl_bchHash = DCLib.ConvertIFCToHashTable(fc, Clssrl_bch);

                string prodcode = string.Empty;
                if (string.IsNullOrWhiteSpace(fc["prodcode"]))
                {
                    prodcode = saleOrderLib.generateProdcodeForItemType("S", SessionControl.UserServerDatabase);
                    srl_proHash = gf1.AddItemToHashTable(ref srl_proHash, "prodcode", prodcode, true);
                    srl_bchHash = gf1.AddItemToHashTable(ref srl_bchHash, "prodcode", prodcode, true);
                    srl_proHash = gf1.AddItemToHashTable(ref srl_proHash, "itemtype", "S", true);
                    srl_proHash = gf1.AddItemToHashTable(ref srl_proHash, "firmid", SessionControl.corpid, true);
                    srl_bchHash = gf1.AddItemToHashTable(ref srl_bchHash, "itemtype", "S", true);
                    srl_bchHash = gf1.AddItemToHashTable(ref srl_bchHash, "firmid", SessionControl.corpid, true);
                }
                else
                {
                    prodcode = fc["prodcode"];
                }

                string? InfoString = "";
                string condition = "infotype='compositestring' and viewid='productForm' and  rowstatus=0 ";
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

                    srl_proHash = gf1.AddItemToHashTable(ref srl_proHash, "compositefields", compositeFinalValue, true);
                }


                int a = saleOrderLib.InsertUpdateInSRLProSRLBchPharma(ref prodcode, ref srl_proHash, ref srl_bchHash, sessionRow, SessionControl.UserServerDatabase);
                return RedirectToAction("ManageProducts");
            }

            return RedirectToAction("LogOut", "Home");
        }



        [HttpPost]
        public ActionResult OrderForm([FromBody] OrderMaster order)
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");

            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)

            {
                return RedirectToAction("LogOut", "Home");
            }

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "createorder", HttpContext.Session.GetString("serverdatabase"))) 
            {

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


                DataRow sessionRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("websessionrow") ?? "");
                string billDate = df1.GetDateTimeISTNow().ToString("yyyy-MM-dd HH:mm:ss.fff");
                //Selected Customer's Custcode
                string? custcode = order.Custcode;


       
                string? mobile = order.Mobile;
                string? deliverymode = order.Deliverymode;
                string? remarks = order.Remarks;

                //logged in user's p_acccode
                int p_acccode = Convert.ToInt32(df1.GetCellValue(sessionRow, "linkcode", "integer")); //order.P_acccode;

                DataRow dtcust = libcustfeat.getCustomerRowFromCustcode(custcode, SessionControl.UserServerDatabase, "p_acccode,custname,saralcustcode");
                //Selected Customer p_acccode
                int partyp_acccode = Convert.ToInt32(df1.GetCellValue(dtcust, "p_acccode", "integer"));
                //Selected Customer Name
                string? name = df1.GetCellValue(dtcust, "custname", "string").ToString();

                string saralcustcode = df1.GetCellValue(dtcust, "saralcustcode", "string").ToString();

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
                changebillheader = gf1.AddItemToHashTable(ref changebillheader, "p_acccode", p_acccode);
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
                for (int j = 0; j <= order.OrderItems.Count - 1; j++)
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
                    DataRow dtshop = saleOrderLib.GetShopControlRow(SessionControl.UserServerDatabase, "settings");
                    if (dtshop is not null)
                    {
                        string settval = gf1.GetKeywordValueFromCompositeField(df1.GetCellValue(dtshop, "settings", "string").ToString(), "callmarg", "~", "=");
                        if (string.Equals(settval, "Y", StringComparison.OrdinalIgnoreCase))
                        {
                            string margId = gf1.GetKeywordValueFromCompositeField(df1.GetCellValue(dtshop, "settings", "string").ToString(), "margid", "~", "=");
                            string margCode = gf1.GetKeywordValueFromCompositeField(df1.GetCellValue(dtshop, "settings", "string").ToString(), "margcode", "~", "=");
                            string saralsmcode = gf1.GetKeywordValueFromCompositeField(df1.GetCellValue(dtshop, "settings", "string").ToString(), "saralsmcode", "~", "=");
                           
                            //call marg InsertOrderDetail API
                            var respHash = saleOrderLib.InsertOrderDetailInMarg(billitemHash, billno.ToString(), saralcustcode, mobile, remarks, margId, margCode, saralsmcode, SessionControl.UserServerDatabase).Result;
                            if (string.Equals(gf1.GetValueFromHashTable(respHash, "status", "string").ToString(), "Failure", StringComparison.OrdinalIgnoreCase))
                            {
                                return Json(gf1.GetValueFromHashTable(respHash, "message", "string").ToString());
                            }
                        }
                    }
                    return Json("success");  // will redirect to OrderGrid here after page creation
                }
                
            }
            return Json("logout");  
        }

        [HttpGet]
        public ActionResult OrderForm()
        {
            Response.Cookies.Append("Tempurl", HttpContext.Request.Path);

            if (string.IsNullOrEmpty(HttpContext.Session.GetString("authkey")))
                return RedirectToAction("LogOut", "Home");


            if (Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")) == 0)
                return RedirectToAction("LogOut", "Home");

            SetSessionControl(Convert.ToInt32(HttpContext.Session.GetInt32("userloginkey_saralweb")));
            if (libSaralAuth.IsAuthenticated(HttpContext.Session.GetString("authkey"), HttpContext.Session.GetString("serverdatabase")) && libSaralAuth.IsAuthorized(HttpContext.Session.GetString("authkey"), "createorder", HttpContext.Session.GetString("serverdatabase")))
            {
                //ViewBag.currentDate = df1.GetDateTimeISTNow().ToString("yyyy-MM-dd");

                //Get usersetting for user
                DataRow userLoginRow = cfc1.CSVToDataRow(HttpContext.Session.GetString("userloginrow") ?? "");
                var drusersettings = libSaralAuth.getUserSettingsRowFromUserLogin_key(Convert.ToInt32(df1.GetCellValue(userLoginRow, "userlogin_key", "integer")), SessionControl.UserServerDatabase, "settingsstring");
                string? settingString = (string?)df1.GetCellValue(drusersettings, "settingsstring", "string");
                
                string showqty = gf1.GetKeywordValueFromCompositeField(settingString, "showqty","~","=");
                ViewBag.showqty = showqty;

                string pricmode = gf1.GetKeywordValueFromCompositeField(settingString, "pricmode", "~", "=");
                ViewBag.pricmode = pricmode;

                string shdecust = gf1.GetKeywordValueFromCompositeField(settingString, "shdecust", "~", "=");
                ViewBag.shdecust = shdecust;

                string defacust = gf1.GetKeywordValueFromCompositeField(settingString, "defacust", "~", "=");
                ViewBag.defacust = defacust;

                string showscheme = gf1.GetKeywordValueFromCompositeField(settingString, "showscheme", "~", "=");
                ViewBag.showscheme = showscheme;

                return View();
            }
            return RedirectToAction("LogOut", "Home");


        }




    }
} 
 