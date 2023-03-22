using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System.Data;
using System.Text;

namespace CRMApp.CustomHelpers
{
    public static class ListSearch
    {

        private static IHttpContextAccessor httpContextAccessor;
        public static void SetHttpContextAccessor(IHttpContextAccessor accessor)
        {
            httpContextAccessor = accessor;
        }

        private static object _SessionControl = null;
        public static CustomerControl.Variables SessionControl
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
        private static object? _rdc = null;
        private static RegisterDllClass.ValidateClass rdc
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
        private static object? _GF1 = null;
        private static GlobalFunction1.GlobalFunction1 GF1
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
        private static object? _df1 = null;
        private static DataFunctions.DataFunctions df1
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

        private static object? _dtc = null;
        private static DataTypeConversionLib.DataTypeConversionFunctions typecoverslib
        {
            get
            {
                if (_dtc is null)
                {
                    var argSessionInstance = SessionControl;
                    _dtc = new DataTypeConversionLib.DataTypeConversionFunctions(ref argSessionInstance);
                    SessionControl = argSessionInstance;
                    _dtc = (DataTypeConversionLib.DataTypeConversionFunctions)_dtc;
                }

                return (DataTypeConversionLib.DataTypeConversionFunctions)_dtc;
            }
        }


        public static int Selected { get; set; } = new int();

        public static void SetSessionControl(int userloginkey_Saralweb)
        {
            SessionControl = new CustomerControl.Variables(httpContextAccessor.HttpContext?.Session.GetString("saraltype"), ControlTxtFile: httpContextAccessor.HttpContext?.Session.GetString("textcontrolfile"), encrypted: true);
            var dt = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase, "select userid  from userlogin where userlogin_key=" + userloginkey_Saralweb);
            if (dt.Rows.Count>0)
            {
                SessionControl = new CustomerControl.Variables(httpContextAccessor.HttpContext?.Session.GetString("saraltype"), mcorpid: df1.GetCellValue(dt.Rows[0], "userid").ToString(), ControlTxtFile: httpContextAccessor.HttpContext?.Session.GetString("textcontrolfile"), encrypted: true);
                df1.SessionControl = SessionControl;
                var argSessionControl = SessionControl;
                df1.SetDbCredentials(ref argSessionControl);
                SessionControl = argSessionControl;

                var argSessionControl2 = SessionControl;
                SetSessionControlOnDLL(ref argSessionControl2);
                SessionControl = argSessionControl2;
            }
            

        }

        public static void SetSessionControlUsingCoprid(string corpid)
        {
            SessionControl = new CustomerControl.Variables(httpContextAccessor.HttpContext?.Session.GetString("saraltype"), mcorpid: corpid, ControlTxtFile: httpContextAccessor.HttpContext?.Session.GetString("textcontrolfile"), encrypted: true);
            var argSessionControl = SessionControl;
            df1.SetDbCredentials(ref argSessionControl);
            SessionControl = argSessionControl;

            var argSessionControl2 = SessionControl;
            SetSessionControlOnDLL(ref argSessionControl2);
            SessionControl = argSessionControl2;

        }

        public static void SetSessionControlOnDLL(ref CustomerControl.Variables sessionControl)
        {
            rdc.SessionControl = sessionControl;
            GF1.SessionControl = sessionControl;
            df1.SessionControl = sessionControl;
            typecoverslib.SessionControl = sessionControl;
        }

        // List search customer helper according to minfotype of infotable
        public static IHtmlContent List_Search(this IHtmlHelper htmlHelper,string name, string mInfoType, string ddltitle, int InitialValue = 0, string OtherTxt = "", object htmlAttributes = null, bool OtherOptionBoolean = true, bool multiselect = false, bool isSumoSelect = false)
        {
            if (Convert.ToInt32(httpContextAccessor.HttpContext?.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return new HtmlString("");
            }

            SetSessionControl(Convert.ToInt32(httpContextAccessor.HttpContext?.Session.GetInt32("userloginkey_saralweb")));
            DataTable dt = new DataTable();

            var argSessionInstance = SessionControl;
            var ClsInfoTable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
            SessionControl = argSessionInstance;

            string mtextfield = String.Empty;
            string mprimarykey= String.Empty;
            DataTable DtInfoTable = new DataTable();

            string Lcondition = " rowstatus=0 and (updateflag<>'D' or updateflag is null)";
            string sqlstr = "select nameofinfo from infotableuser where infotype=" + mInfoType;

            DataTable DtInfotableUser = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
            if (DtInfotableUser.Rows.Count > 0)
            {
                if (httpContextAccessor.HttpContext?.Session.GetString("infotableuser") is null || httpContextAccessor.HttpContext?.Session.GetString("infotableuser") =="[]")
                {
                    DtInfoTable = df1.GetDataFromSql(httpContextAccessor.HttpContext?.Session.GetString("serverdatabase"), "InfoTableUser", "*", "", Lcondition, "", "InfoType,NameOfInfo", ClsInfoTable.PrimaryKey);
                    httpContextAccessor.HttpContext?.Session.SetString("infotableuser", JsonConvert.SerializeObject(DtInfoTable));
                }
                else
                {
                    DtInfoTable = typecoverslib.ConvertJSONToDataTableNew(httpContextAccessor.HttpContext?.Session.GetString("infotableuser"));
                }
            }

            else
            {
                if (httpContextAccessor.HttpContext?.Session.GetString("infotable") is null || httpContextAccessor.HttpContext?.Session.GetString("infotable") == "[]")
                {
                    DtInfoTable = df1.GetDataFromSql(httpContextAccessor.HttpContext?.Session.GetString("serverdatabase"), "InfoTable", "*", "", Lcondition, "", "InfoType,NameOfInfo", ClsInfoTable.PrimaryKey);
                    httpContextAccessor.HttpContext?.Session.SetString("infotable", JsonConvert.SerializeObject(DtInfoTable));
                }
                else
                {
                    DtInfoTable = typecoverslib.ConvertJSONToDataTableNew(httpContextAccessor.HttpContext?.Session.GetString("infotable"));
                }
            }


            string condition = "InfoType=" + mInfoType;
            dt = df1.SearchDataTable(ref DtInfoTable, "InfoType", mInfoType);

            mtextfield = ClsInfoTable.TextField;
            mprimarykey = "P_Infotable";

            var lstCategory = new List<SelectListItem>();

            if (!multiselect)
                lstCategory.Add(new SelectListItem() { Text = ddltitle, Value = "0" });
            

            for (int i = 0; i <= dt.Rows.Count - 1; i++)
                lstCategory.Add(new SelectListItem() { Text = dt.Rows[i][mtextfield].ToString()?.Trim(), Value =dt.Rows[i][mprimarykey].ToString()?.Trim() });

            if (OtherOptionBoolean)
                lstCategory.Add(new SelectListItem() { Text = "Others", Value = "-1" });

            // Creating a select element using TagBuilder class which will create a dropdown.
            var dropdown = new TagBuilder("select") { TagRenderMode = TagRenderMode.Normal};
            var OtherText = new TagBuilder("input") { TagRenderMode = TagRenderMode.SelfClosing};

            if (!OtherOptionBoolean)
            {
                OtherText.Attributes.Add("name", "Other" + name);
                OtherText.Attributes.Add("id", "Other" + name);
                OtherText.Attributes.Add("Type", "Text");
                if (InitialValue != -1)
                {
                    OtherText.Attributes.Add("style", "display:none");
                }
                else
                {
                    OtherText.Attributes.Add("value", OtherTxt);
                    OtherText.Attributes.Add("style", "display:block");
                }
            }

            // Setting the name and id attribute with name parameter passed to this method.
            dropdown.Attributes.Add("name", name);
            dropdown.Attributes.Add("id", name);

            if (multiselect)
            {
                if (isSumoSelect)
                {
                    dropdown.Attributes.Add("class", "selectBox");
                }
                else
                {
                    dropdown.Attributes.Add("class", "selectpicker");
                    dropdown.Attributes.Add("data-live-search", "true");
                    dropdown.Attributes.Add("data-actions-box", "true");
                }
                dropdown.Attributes.Add("multiple", "multiple");
                dropdown.Attributes.Add("title", ddltitle);
            }

           
            // Iterated over the IEnumerable list and append option tag in dropdown.
            foreach (var item in lstCategory)
            {
                var option = new TagBuilder("option");
                // Each option represents a value in dropdown. For each element in the list, option element is created and appended to the stringBuilder object.
                if (InitialValue.ToString() == item.Value)
                {
                    option.InnerHtml.Append(item.Text);
                    option.MergeAttribute("value", item.Value);
                    option.MergeAttribute("Selected", "Selected");
                }
                else
                {
                    option.InnerHtml.Append(item.Text);
                    option.MergeAttribute("value", item.Value);
                }

                dropdown.InnerHtml.AppendHtml(option);
            }

            // Assigning the attributes passed as a htmlAttributes object.
            dropdown.MergeAttributes(new RouteValueDictionary(htmlAttributes));

            if (!OtherOptionBoolean)
                OtherText.MergeAttributes(new RouteValueDictionary(htmlAttributes));

            string aa = string.Empty;
            using (var writer = new StringWriter())
            {
                dropdown.WriteTo(writer, System.Text.Encodings.Web.HtmlEncoder.Default);

                if (!OtherOptionBoolean)
                    OtherText.WriteTo(writer, System.Text.Encodings.Web.HtmlEncoder.Default);
                
                aa = writer.ToString();
            }

            // Returning the entire select or dropdown control in HTMLString format.
            return new HtmlString(aa);
        }


        // List search custom helper to all other tables except infotable
        public static IHtmlContent List_Search(this IHtmlHelper helper, string name, string ddltitle, string tablename, string TextField, string primaryfield, string WHERE = "", int InitialValue = 0, string OtherTxt = "", object htmlAttributes = null, bool OthersOptionBoolean = true)
        {
            if (Convert.ToInt32(httpContextAccessor.HttpContext?.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return new HtmlString("");
            }

            SetSessionControl(Convert.ToInt32(httpContextAccessor.HttpContext?.Session.GetInt32("userloginkey_saralweb")));
            DataTable dt = new DataTable();
            string query;
            string mtextfield;
            string mprimarykey;
            string whereclaus = "";
            if (string.IsNullOrEmpty(WHERE))
            {
                whereclaus = " where Rowstatus=0";
            }
            else
            {
                whereclaus = " where Rowstatus=0 and " + WHERE;
            }
            query = string.Format("SELECT * FROM [" + tablename + "] " + whereclaus);
            dt = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, query);
            mtextfield = TextField;
            mprimarykey = primaryfield;

            var lstCategory = new List<SelectListItem>();
            lstCategory.Add(new SelectListItem() { Text = ddltitle, Value = "0"});
            for (int i = 0; i <= dt.Rows.Count - 1; i++)
                lstCategory.Add(new SelectListItem() { Text = dt.Rows[i][mtextfield].ToString()?.Trim(), Value = dt.Rows[i][mprimarykey].ToString()?.Trim() });
            if (!OthersOptionBoolean)
                lstCategory.Add(new SelectListItem() { Text = "Others", Value = "-1"});
            Selected = Selected;

            // Creating a select element using TagBuilder class which will create a dropdown.
            var dropdown = new TagBuilder("select") { TagRenderMode = TagRenderMode.Normal };
            var OtherText = new TagBuilder("input") { TagRenderMode = TagRenderMode.SelfClosing };
            if (!OthersOptionBoolean)
            {
                OtherText.Attributes.Add("name", "Other" + name);
                OtherText.Attributes.Add("id", "Other" + name);
                OtherText.Attributes.Add("Type", "Text");
                if (InitialValue != -1)
                {
                    OtherText.Attributes.Add("style", "display:none");
                }
                else
                {
                    OtherText.Attributes.Add("value", OtherTxt);
                    OtherText.Attributes.Add("style", "display:block");
                }
            }
            // Setting the name and id attribute with name parameter passed to this method.
            dropdown.Attributes.Add("name", name);
            dropdown.Attributes.Add("id", name);

           
            // Iterated over the IEnumerable list.

            foreach (var item in lstCategory)
            {
                var option = new TagBuilder("option");
                // Each option represents a value in dropdown. For each element in the list, option element is created and appended to the stringBuilder object.
                if (InitialValue.ToString() == item.Value)
                {
                    option.InnerHtml.Append(item.Text);
                    option.MergeAttribute("value", item.Value);
                    option.MergeAttribute("Selected", "Selected");
                }
                else
                {
                    option.InnerHtml.Append(item.Text);
                    option.MergeAttribute("value", item.Value);
                }
                dropdown.InnerHtml.AppendHtml(option);
            }

            // Assigning the attributes passed as a htmlAttributes object.
            dropdown.MergeAttributes(new RouteValueDictionary(htmlAttributes));

            if (!OthersOptionBoolean)
                OtherText.MergeAttributes(new RouteValueDictionary(htmlAttributes));

            string aa = string.Empty;
            using (var writer = new StringWriter())
            {
                dropdown.WriteTo(writer, System.Text.Encodings.Web.HtmlEncoder.Default);

                if (!OthersOptionBoolean)
                    OtherText.WriteTo(writer, System.Text.Encodings.Web.HtmlEncoder.Default);

                aa = writer.ToString();
            }

            // Returning the entire select or dropdown control in HTMLString format.
            return new HtmlString(aa);
        }

        public static IHtmlContent List_Search_Multi(this IHtmlHelper htmlHelper, string name, string mInfoType, string ddltitle, int InitialValue = 0, string OtherTxt = "", object htmlAttributes = null, bool OtherOptionBoolean = true)
        {
            if (Convert.ToInt32(httpContextAccessor.HttpContext?.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return new HtmlString("");
            }

            SetSessionControl(Convert.ToInt32(httpContextAccessor.HttpContext?.Session.GetInt32("userloginkey_saralweb")));
            DataTable dt = new DataTable();

            var argSessionInstance = SessionControl;
            var ClsInfoTable = new InfoTable.InfoTable.InfoTable(ref argSessionInstance);
            SessionControl = argSessionInstance;

            string mtextfield = String.Empty;
            string mprimarykey = String.Empty;
            DataTable DtInfoTable = new DataTable();

            string Lcondition = " rowstatus=0 and (updateflag<>'D' or updateflag is null)";
            string sqlstr = "select nameofinfo from infotableuser where infotype=" + mInfoType;

            DataTable DtInfotableUser = df1.SqlExecuteDataTable(SessionControl.UserServerDatabase, sqlstr);
            if (DtInfotableUser.Rows.Count > 0)
            {
                if (httpContextAccessor.HttpContext?.Session.GetString("infotableuser") is null || httpContextAccessor.HttpContext?.Session.GetString("infotableuser") == "[]")
                {
                    DtInfoTable = df1.GetDataFromSql(httpContextAccessor.HttpContext?.Session.GetString("serverdatabase"), "InfoTableUser", "*", "", Lcondition, "", "InfoType,NameOfInfo", ClsInfoTable.PrimaryKey);
                    httpContextAccessor.HttpContext?.Session.SetString("infotableuser", JsonConvert.SerializeObject(DtInfoTable));
                }
                else
                {
                    DtInfoTable = typecoverslib.ConvertJSONToDataTableNew(httpContextAccessor.HttpContext?.Session.GetString("infotableuser"));
                }
            }

            else
            {
                if (httpContextAccessor.HttpContext?.Session.GetString("infotable") is null || httpContextAccessor.HttpContext?.Session.GetString("infotable") == "[]")
                {
                    DtInfoTable = df1.GetDataFromSql(httpContextAccessor.HttpContext?.Session.GetString("serverdatabase"), "InfoTable", "*", "", Lcondition, "", "InfoType,NameOfInfo", ClsInfoTable.PrimaryKey);
                    httpContextAccessor.HttpContext?.Session.SetString("infotable", JsonConvert.SerializeObject(DtInfoTable));
                }
                else
                {
                    DtInfoTable = typecoverslib.ConvertJSONToDataTableNew(httpContextAccessor.HttpContext?.Session.GetString("infotable"));
                }
            }


            string condition = "InfoType=" + mInfoType;
            dt = df1.SearchDataTable(ref DtInfoTable, "InfoType", mInfoType);

            mtextfield = ClsInfoTable.TextField;
            mprimarykey = "P_Infotable";

            var lstCategory = new List<SelectListItem>();

           
            //lstCategory.Add(new SelectListItem() { Text = ddltitle, Value = "0" });


            for (int i = 0; i <= dt.Rows.Count - 1; i++)
                lstCategory.Add(new SelectListItem() { Text = dt.Rows[i][mtextfield].ToString()?.Trim(), Value = dt.Rows[i][mprimarykey].ToString()?.Trim() });

            if (OtherOptionBoolean)
                lstCategory.Add(new SelectListItem() { Text = "Others", Value = "-1" });

            // Creating a select element using TagBuilder class which will create a dropdown.
            var select = new TagBuilder("div");
            var selectdiv = new TagBuilder("div");
            var maindiv = new TagBuilder("div");
            var maincheckbox = new TagBuilder("span");
            var maininput = new TagBuilder("input");
            var searchinput = new TagBuilder("input");
            var selecttag = new TagBuilder("span");
            var arrowdiv = new TagBuilder("span");
            var icon = new TagBuilder("i");
            var listitem =new TagBuilder("div");
            var buttonlist = new TagBuilder("div");
            var applybtn = new TagBuilder("button");
            var cancelbtn = new TagBuilder("button");

            var dropdown = new TagBuilder("ul") { TagRenderMode = TagRenderMode.Normal };
            var htext = new TagBuilder("input");
            var OtherText = new TagBuilder("input") { TagRenderMode = TagRenderMode.SelfClosing };

            if (!OtherOptionBoolean)
            {
                OtherText.Attributes.Add("name", "Other" + name);
                OtherText.Attributes.Add("id", "Other" + name);
                OtherText.Attributes.Add("Type", "Text");
                if (InitialValue != -1)
                {
                    OtherText.Attributes.Add("style", "display:none");
                }
                else
                {
                    OtherText.Attributes.Add("value", OtherTxt);
                    OtherText.Attributes.Add("style", "display:block");
                }
            }

            // Setting the name and id attribute with name parameter passed to this method.
            select.Attributes.Add("class", "select-btn toggle-select select-"+name);
            select.MergeAttribute("onclick", "toggleDropdown('" + name + "')");
            selectdiv.Attributes.Add("style", "width:90%");
            select.InnerHtml.AppendHtml(selectdiv);
            selecttag.MergeAttribute("class", "btn-text");
            selecttag.MergeAttribute("data-title", ddltitle);
            selecttag.InnerHtml.Append(ddltitle);
            selectdiv.InnerHtml.AppendHtml(selecttag);
            maindiv.MergeAttribute("class", "main-item");
            maincheckbox.MergeAttribute("class", "checkbox");
            maininput.MergeAttribute("type", "checkbox");
            maininput.MergeAttribute("class", "select-checkbox");
            maininput.MergeAttribute("onchange", "toggleMultiCheckbox(this,'" + name + "')");
            maincheckbox.InnerHtml.AppendHtml(maininput);
            maindiv.InnerHtml.AppendHtml(maincheckbox);
            searchinput.MergeAttribute("type", "text");
            searchinput.MergeAttribute("placeholder", "Search....");
            searchinput.MergeAttribute("id", "myInput");
            searchinput.MergeAttribute("onkeyup", "filterFunction('"+name+"')");
            maindiv.InnerHtml.AppendHtml(searchinput);
            selectdiv.InnerHtml.AppendHtml(maindiv);
            arrowdiv.MergeAttribute("class", "arrow-dwn");
            arrowdiv.MergeAttribute("onclick", "Dropdown('" + name + "')");
            //arrowdiv.MergeAttribute("onclick", "toggleDropdown('"+name+"')");
            icon.MergeAttribute("class", "fa fa-chevron-down");
            arrowdiv.InnerHtml.AppendHtml(icon);
            select.InnerHtml.AppendHtml(arrowdiv);
            listitem.MergeAttribute("class", "list-items");
            dropdown.Attributes.Add("name", "wrapper-"+ name);
            dropdown.Attributes.Add("id", "wrapper-" + name);
            dropdown.MergeAttribute("class", "lims");
            listitem.InnerHtml.AppendHtml(dropdown);
            buttonlist.InnerHtml.AppendHtml(cancelbtn);
            buttonlist.InnerHtml.AppendHtml(applybtn);
            buttonlist.MergeAttribute("class", "button-list");
            applybtn.InnerHtml.Append("Apply");
            applybtn.MergeAttribute("class", "applybtn");
            applybtn.MergeAttribute("type", "button");
            applybtn.MergeAttribute("onclick", "apply('"+ name + "')");
            cancelbtn.InnerHtml.Append("Cancel");
            cancelbtn.MergeAttribute("type", "button");
            cancelbtn.MergeAttribute("class", "cancelbtn");
            cancelbtn.MergeAttribute("onclick", "cancel('"+name+"','"+ ddltitle + "')");
            listitem.InnerHtml.AppendHtml(buttonlist);
           

            dropdown.InnerHtml.AppendHtml(htext);
            htext.Attributes.Add("name", name);
            htext.Attributes.Add("id", name);
            htext.Attributes.Add("Type", "text");
            htext.Attributes.Add("style", "display:none");
            var checkbox = new TagBuilder("span");
            var input = new TagBuilder("input");

            // Iterated over the IEnumerable list and append option tag in dropdown.
            foreach (var item in lstCategory)
            {
                var option = new TagBuilder("li");
                var text = new TagBuilder("span");

                // Each option represents a value in dropdown. For each element in the list, option element is created and appended to the stringBuilder object.
                if (InitialValue.ToString() == item.Value)
                {
                    option.InnerHtml.AppendHtml(checkbox);
                    option.InnerHtml.AppendHtml(text);
                    text.InnerHtml.Append(item.Text);
                    text.MergeAttribute("data-value", item.Value);
                    option.MergeAttribute("id", item.Value);
                    option.MergeAttribute("class", "item");
                    checkbox.MergeAttribute("class", "checkbox");
                    checkbox.MergeAttribute("checked", "checked");
                    text.MergeAttribute("class", "item-text");

                }
                else
                {
                    option.InnerHtml.AppendHtml(checkbox);
                    option.InnerHtml.AppendHtml(text);
                    text.InnerHtml.Append(item.Text);
                    text.MergeAttribute("data-value", item.Value);
                    option.MergeAttribute("id", item.Value);
                    option.MergeAttribute("class", "item");
                    checkbox.MergeAttribute("class", "checkbox");
                    text.MergeAttribute("class", "item-text");

                }
                dropdown.InnerHtml.AppendHtml(option);
            }
            checkbox.InnerHtml.AppendHtml(input);
            input.MergeAttribute("type", "checkbox");
            input.MergeAttribute("class", "check");
          

            // Assigning the attributes passed as a htmlAttributes object.
            //dropdown.MergeAttributes(new RouteValueDictionary(htmlAttributes));

            //if (!OtherOptionBoolean)
            //    OtherText.MergeAttributes(new RouteValueDictionary(htmlAttributes));

            string aa = string.Empty;
            using (var writer = new StringWriter())
            {
                select.WriteTo(writer, System.Text.Encodings.Web.HtmlEncoder.Default);
                listitem.WriteTo(writer, System.Text.Encodings.Web.HtmlEncoder.Default);

                if (!OtherOptionBoolean)
                    OtherText.WriteTo(writer, System.Text.Encodings.Web.HtmlEncoder.Default);

                aa = writer.ToString();
            }

            // Returning the entire select or dropdown control in HTMLString format.
            return new HtmlString(aa);
        }

    }
}
