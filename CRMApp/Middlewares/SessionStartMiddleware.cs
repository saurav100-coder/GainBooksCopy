using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Data;
using System.Threading.Tasks;

namespace CRMApp.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class SessionStartMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _contentRootPath;

        public SessionStartMiddleware(RequestDelegate next, string contentRootPath)
        {
            _next = next;
            _contentRootPath = contentRootPath;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            string saraltype = "WebGodaddy";
            //string saraltype = "local";

            string textControlfile = "";
            if (saraltype=="local")
            {
                textControlfile = Path.Combine(_contentRootPath, "App_Data/aslamlocalencr.config"); //abcencr
            }

            httpContext.Session.SetString("saraltype", saraltype);
            httpContext.Session.SetString("textcontrolfile", textControlfile);

            await _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class SessionStartMiddlewareExtensions
    {
        public static IApplicationBuilder UseSessionStartMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SessionStartMiddleware>();
        }
    }

    
}
