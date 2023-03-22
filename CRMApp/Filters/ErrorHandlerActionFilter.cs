using CRMApp.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using System.Data;

namespace CRMApp.Filters
{
    public class ErrorHandlerActionFilter : IActionFilter
    {

        public void OnActionExecuted(ActionExecutedContext context)
        {
            var controllName = context.RouteData.Values["Controller"]?.ToString() ?? "";
            RegisterDllClass.ValidateClass? rdc = null;
            switch (controllName.ToLower())
            {
                case "home":
                    {
                        var currentController = context.Controller as HomeController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl,ref rdc);
                        
                    }
                    break;

                case "crm":
                    {
                        var currentController = context.Controller as CRMController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "configuration":
                    {
                        var currentController = context.Controller as ConfigurationController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "custom":
                    {
                        var currentController = context.Controller as CustomController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "customerdetails":
                    {
                        var currentController = context.Controller as CustomerDetailsController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "devutility":
                    {
                        var currentController = context.Controller as DevUtilityController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "iems":
                    {
                        var currentController = context.Controller as IEMSController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "invoices":
                    {
                        var currentController = context.Controller as InvoicesController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "messagetemplate":
                    {
                        var currentController = context.Controller as MessageTemplateController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "notifications":
                    {
                        var currentController = context.Controller as NotificationsController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "publicurl":
                    {
                        var currentController = context.Controller as PublicUrlController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "sales":
                    {
                        var currentController = context.Controller as SalesController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "tasks":
                    {
                        var currentController = context.Controller as TasksController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "trip":
                    {
                        var currentController = context.Controller as TripController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                        }
                        HandleErrorOnExecuted(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                default:
                    break;
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var controllName = context.RouteData.Values["Controller"]?.ToString() ?? "";
            var actionName = context.RouteData.Values["Action"]?.ToString() ?? "";
            var parametersName = context.ActionArguments.Keys.Count > 0 ? context.ActionArguments.Keys.ToArray() : null;
            var parametersValue = context.ActionArguments.Values.Count > 0 ? context.ActionArguments.Values.ToArray(): null;
            RegisterDllClass.ValidateClass? rdc = null;
            //SetInfotableSessionOnExecuting(ref context);
            switch (controllName.ToLower())
            {
                case "home":
                    {
                        var currentController = context.Controller as HomeController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }
                       
                        HandleErrorOnExecuting(ref context, ref sessionControl,ref rdc);
                    }
                    break;

                case "crm":
                    {
                        var currentController = context.Controller as CRMController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "configuration":
                    {
                        var currentController = context.Controller as ConfigurationController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "custom":
                    {
                        var currentController = context.Controller as CustomController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "customerdetails":
                    {
                        var currentController = context.Controller as CustomerDetailsController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "devutility":
                    {
                        var currentController = context.Controller as DevUtilityController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "iems":
                    {
                        var currentController = context.Controller as IEMSController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "invoices":
                    {
                        var currentController = context.Controller as InvoicesController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "messagetemplate":
                    {
                        var currentController = context.Controller as MessageTemplateController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "notifications":
                    {
                        var currentController = context.Controller as NotificationsController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "publicurl":
                    {
                        var currentController = context.Controller as PublicUrlController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "sales":
                    {
                        var currentController = context.Controller as SalesController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "tasks":
                    {
                        var currentController = context.Controller as TasksController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                case "trip":
                    {
                        var currentController = context.Controller as TripController;
                        var sessionControl = currentController?.SessionControl;
                        if (sessionControl is not null)
                        {
                            rdc = currentController?.rdc;
                            rdc?.StartMethod(actionName, parametersName, ref parametersValue);
                        }

                        HandleErrorOnExecuting(ref context, ref sessionControl, ref rdc);
                    }
                    break;

                default:
                    break;
            }
        }



        private void HandleErrorOnExecuted(ref ActionExecutedContext context, ref CustomerControl.Variables? sessionControl, ref RegisterDllClass.ValidateClass? rdc)
        {
            if (sessionControl is not null && !(string.IsNullOrEmpty(sessionControl.ErrorString)))
            {
                context.HttpContext.Session.Clear();
                String errorstring = sessionControl.ErrorString;
                sessionControl.StackTraceList .Clear();
                sessionControl.ParamValues .Clear ();
                var ActionType = (context.ActionDescriptor as ControllerActionDescriptor)?.MethodInfo.ReturnType.Name;

                context.Result = (ActionType == "JsonResult") ? new JsonResult(new { statusCode = 500, error = errorstring }) : new RedirectToRouteResult(new RouteValueDictionary(new { action = "Error", controller = "Home",error= errorstring }));

                var ex = new Exception();
                ErrObject err= Information.Err();
                rdc?.QuitError(ex,err);
            }

            if (sessionControl is not null)
            {
                var actionName = context.RouteData.Values["Action"]?.ToString() ?? "";
                rdc?.EndMethod(ref actionName);
            }
            

        }


        private void HandleErrorOnExecuting(ref ActionExecutingContext context, ref CustomerControl.Variables? sessionControl,ref RegisterDllClass.ValidateClass? rdc )
        {
            if (sessionControl is not null && !(string.IsNullOrEmpty(sessionControl.ErrorString)))
            {
                context.HttpContext.Session.Clear();
                String errorstring = sessionControl.ErrorString;
                sessionControl.StackTraceList.Clear();
                sessionControl.ParamValues.Clear();
                var ActionType = (context.ActionDescriptor as ControllerActionDescriptor)?.MethodInfo.ReturnType.Name;

                context.Result = (ActionType == "JsonResult") ? new JsonResult(new { statusCode = 500, error = errorstring}) : new RedirectToRouteResult(new RouteValueDictionary(new { action = "Error", controller = "Home",error= errorstring }));

                var ex = new Exception();
                ErrObject err = Information.Err();
                rdc?.QuitError(ex, err);
            }
        }


        //private void SetInfotableSessionOnExecuting(ref ActionExecutingContext context)
        //{
        //    if ((context.HttpContext.Session.GetString("infotable") is null || context.HttpContext.Session.GetString("infotableuser") is null) && context.HttpContext.Session.GetInt32("userloginkey_saralweb") is not null)
        //    {
        //        DataTable DtInfoTable = new DataTable();
        //        DataTable DtInfoTableuser = new DataTable();
        //        int userloginkey_Saralweb = Convert.ToInt32(context.HttpContext.Session.GetInt32("userloginkey_saralweb"));

        //        var cc1 = new CustomerControl.Variables(context.HttpContext.Session.GetString("saraltype"), ControlTxtFile: context.HttpContext.Session.GetString("textcontrolfile"), encrypted: true);
        //        var df1 = new DataFunctions.DataFunctions(ref cc1);

        //        var dt = df1.SqlExecuteDataTable(cc1.MainServerDatabase, "select userid  from userlogin where userlogin_key=" + userloginkey_Saralweb);
        //        cc1 = new CustomerControl.Variables(context.HttpContext.Session.GetString("saraltype"), mcorpid: df1.GetCellValue(dt.Rows[0], "userid").ToString(), ControlTxtFile: context.HttpContext.Session.GetString("textcontrolfile"), encrypted: true);
        //        df1.SessionControl = cc1;
        //        var argSessionControl = cc1;
        //        df1.SetDbCredentials(ref argSessionControl);
        //        cc1 = argSessionControl;


        //        if (context.HttpContext.Session.GetString("infotable") is null)
        //        {
        //            DtInfoTable = df1.SqlExecuteDataTable(cc1.UserServerDatabase, "select * from infotable where rowstatus=0 and (updateflag<>'D' or updateflag is null)");
        //            context.HttpContext.Session.SetString("infotable", JsonConvert.SerializeObject(DtInfoTable));
        //        }

        //        if (context.HttpContext.Session.GetString("infotableuser") is null)
        //        {
        //            DtInfoTableuser = df1.SqlExecuteDataTable(cc1.UserServerDatabase, "select * from infotableuser where rowstatus=0 and (updateflag<>'D' or updateflag is null)");
        //            context.HttpContext.Session.SetString("infotableuser", JsonConvert.SerializeObject(DtInfoTableuser));
        //        }

        //    } 
        //}

        

    }
}
