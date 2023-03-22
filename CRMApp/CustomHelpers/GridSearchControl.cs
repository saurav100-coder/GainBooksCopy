using Microsoft.Ajax.Utilities;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System.Data;
using System.Text;

namespace CRMApp.CustomHelpers
{
    public static class GridSearchControl
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


        public static void SetSessionControl(int userloginkey_Saralweb)
        {
            SessionControl = new CustomerControl.Variables(httpContextAccessor.HttpContext?.Session.GetString("saraltype"), ControlTxtFile: httpContextAccessor.HttpContext?.Session.GetString("textcontrolfile"), encrypted: true);
            var dt = df1.SqlExecuteDataTable(SessionControl.MainServerDatabase, "select userid  from userlogin where userlogin_key=" + userloginkey_Saralweb);
            if (dt.Rows.Count > 0)
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="htmlHelper"></param>
        /// <param name="name">Input Control Name </param>
        /// <param name="searchColumn">This is a sql column on which searching perform</param>
        /// <param name="outputColumn">This is a sql Column which value set on Input control after Row Selection in grid</param>
        /// <param name="HeaderDt">Main datatable which contains all major information like .... headerName, sqlColumnName etc.</param>
        /// <param name="tableName">Sql Table name for Query</param>
        /// <param name="ljoin">Sql Join query</param>
        /// <param name="lcondition">where condition</param>
        /// <param name="lorder">order by </param>
        /// <param name="inputBoxHtmlAttributes">Custom html attributes for Input control</param>
        /// <param name="divContainerHtmlAttributes">Custom html attributes for Parent div of Table</param>
        /// <param name="tableHtmlAttributes">Custom html attributes for Table</param>
        /// <returns></returns>
        public static IHtmlContent Grid_Search_Control(this IHtmlHelper htmlHelper, string name, string searchColumn,string outputColumn, DataTable HeaderDt,string tableName,string ljoin ="",string lcondition="",string lorder="" ,object inputBoxHtmlAttributes = null, object divContainerHtmlAttributes = null, object tableHtmlAttributes = null,bool multiselect=true)
        {
            if (Convert.ToInt32(httpContextAccessor.HttpContext?.Session.GetInt32("userloginkey_saralweb")) == 0)
            {
                return new HtmlString("");
            }

            SetSessionControl(Convert.ToInt32(httpContextAccessor.HttpContext?.Session.GetInt32("userloginkey_saralweb")));

            //Input Tag
            var input = new TagBuilder("input") { TagRenderMode = TagRenderMode.SelfClosing }; 
            input.Attributes.TryAdd("name", name);
            input.Attributes.TryAdd("id", name);
            input.Attributes.TryAdd("type", "text");
            input.MergeAttributes(new RouteValueDictionary(inputBoxHtmlAttributes));
            input.Attributes.Add("onkeyup", "ShowDataGSC(this,'" + searchColumn + "','"+ outputColumn + "','" + tableName + "','" + ljoin + "','" + lcondition + "','" + lorder + "'," + JsonConvert.SerializeObject(HeaderDt) + ",'" + multiselect + "')");

            //Div Tag
            var divContainer = new TagBuilder("div");
            divContainer.Attributes.TryAdd("name", name + "-container");
            divContainer.Attributes.TryAdd("id", name + "-container");

            if (string.IsNullOrWhiteSpace(divContainerHtmlAttributes.ToString()))
            {
                divContainer.Attributes.TryAdd("style", "display:none;overflow: auto; background-color: white; font-family: verdana, arial, sans-serif; font-size: 11px; margin-bottom: 10px;");
            }
            else
            {
                divContainer.MergeAttributes(new RouteValueDictionary(divContainerHtmlAttributes));
            }

            //Table Tags
            TagBuilder table = new TagBuilder("table");
            TagBuilder thead = new TagBuilder("thead");
            TagBuilder tbody = new TagBuilder("tbody");
            TagBuilder tfoot = new TagBuilder("tfoot");

            TagBuilder? tr = new TagBuilder("tr");
            TagBuilder? th = null;
            TagBuilder? td = null;
            
            
            table.Attributes.TryAdd("id", name + "-table");
            if (string.IsNullOrWhiteSpace(tableHtmlAttributes.ToString()))
            {
                table.Attributes.TryAdd("class", "table table-bordered table-customer");
            }
            else
            {
                table.MergeAttributes(new RouteValueDictionary(tableHtmlAttributes));
            }

            //Add TableHead Css
            thead.Attributes.Add("style", "position:sticky; top:0; z-index:1000; overflow:hidden; color: black;");
            tr.Attributes.Add("style", "overflow: hidden;");

            tfoot.Attributes.Add("style", "position:sticky; bottom:0; z-index:1000; overflow:hidden; background:white; text-align:right;");

            //Add TableHeaders
            th = new TagBuilder("th");
            th.Attributes.Add("style", "width:10%");
            if (multiselect)
            {
                var span = new TagBuilder("span");
                span.Attributes.Add("class", "GSCCheckbox glyphicon glyphicon-unchecked");
                span.Attributes.Add("onClick", "SelectionToggleOnGridSearchAllRows(this)");
                th.InnerHtml.AppendHtml(span);
            }
            th.InnerHtml.Append(" S.No");
            tr.InnerHtml.AppendHtml(th);

            for (int i = 0; i < HeaderDt.Rows.Count; i++)
            {
                th = new TagBuilder("th");
                th.InnerHtml.Append(HeaderDt.Rows[i]["TableHeader"].ToString()??"");
                string styleAttr = string.Empty;
                if (!Convert.ToBoolean(HeaderDt.Rows[i]["Visible"]))
                {
                    styleAttr +="display:none;";
                }

                if (!string.IsNullOrWhiteSpace((HeaderDt.Rows[i]["width"]).ToString()))
                {
                    styleAttr += "width:" + HeaderDt.Rows[i]["width"] + ";";
                }
                th.Attributes.TryAdd("style", styleAttr);
                tr.InnerHtml.AppendHtml(th);
            }

            if (multiselect)
            {
                //Add Close button
                //th = new TagBuilder("th");
                //th.InnerHtml.Append("X");
                //th.Attributes.TryAdd("style", "cursor: pointer;");
                //th.Attributes.TryAdd("onClick", "closeGSC(this)");
                //tr.InnerHtml.AppendHtml(th);

                //Add Apply button
                var trFooter = new TagBuilder("tr");
                var apply_btn = new TagBuilder("button");
                var cancel_btn = new TagBuilder("button");
                td = new TagBuilder("td");
                td.MergeAttribute("colspan", "5");
                td.Attributes.TryAdd("style", "border: none;");
                cancel_btn.Attributes.Add("type", "button");
                cancel_btn.InnerHtml.Append("Cancel");
                cancel_btn.Attributes.TryAdd("style", "cursor: pointer;  background: white; color: #105faf; height:30px;  border: 1px solid #105faf; padding: 5px 35px;margin: 0 10px; border-radius: 15px;");
                cancel_btn.Attributes.TryAdd("onClick", "closeGSC(this)");
                apply_btn.Attributes.Add("type", "button");
                apply_btn.InnerHtml.Append("Apply");
                apply_btn.Attributes.TryAdd("style", "cursor: pointer;  background: #105faf; height:30px; color: white; border: none; font-size:12px; padding: 5px 35px;margin: 0 10px; border-radius: 15px;");
                apply_btn.Attributes.TryAdd("onClick", "ApplyOnGSC('" + name + "')");
                td.InnerHtml.AppendHtml(cancel_btn);
                td.InnerHtml.AppendHtml(apply_btn);
                trFooter.InnerHtml.AppendHtml(td);
                tfoot.InnerHtml.AppendHtml(trFooter);

            }

            //Add Loader
            var trLoader = new TagBuilder("tr");
            trLoader.Attributes.TryAdd("id", name+"-loading");
            //Change BG Color
            trLoader.Attributes.Add("style", "background:white;");
            td = new TagBuilder("td");
            td.Attributes.TryAdd("colspan", "9");
            var divLoader = new TagBuilder("div");
            divLoader.Attributes.TryAdd("id", name+"-loadingmessage");
            divLoader.Attributes.TryAdd("class", "loader overlay col-md-offset-6");
            td.InnerHtml.AppendHtml(divLoader);
            var pLoader = new TagBuilder("p");
            pLoader.Attributes.TryAdd("id", name + "-Msg");
            td.InnerHtml.AppendHtml(pLoader);
            trLoader.InnerHtml.AppendHtml(td);
            

            thead.InnerHtml.AppendHtml(tr);
            thead.InnerHtml.AppendHtml(trLoader);
            table.InnerHtml.AppendHtml(thead);
            table.InnerHtml.AppendHtml(tbody);
            table.InnerHtml.AppendHtml(tfoot);
            divContainer.InnerHtml.AppendHtml(table);

            string aa = string.Empty;
            using (var writer = new StringWriter())
            {
                input.WriteTo(writer, System.Text.Encodings.Web.HtmlEncoder.Default);
                divContainer.WriteTo(writer, System.Text.Encodings.Web.HtmlEncoder.Default);
                aa = writer.ToString();
            }

            // Returning the entire select or dropdown control in HTMLString format.
            return new HtmlString(aa);
        }




    }
}
