using CRMApp.CustomHelpers;
using CRMApp.Filters;
using CRMApp.Middlewares;
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);


//var builder = WebApplication.CreateBuilder(new WebApplicationOptions
//{
//    ApplicationName = typeof(Program).Assembly.FullName,
//    ContentRootPath = Directory.GetCurrentDirectory(),
//    EnvironmentName = Environments.Staging,
//});

//Console.WriteLine($"Application Name: {builder.Environment.ApplicationName}");
//Console.WriteLine($"Environment Name: {builder.Environment.EnvironmentName}");
//Console.WriteLine($"ContentRoot Path: {builder.Environment.ContentRootPath}");
//Console.WriteLine($"WebRootPath: {builder.Environment.WebRootPath}");

// Add services to the container. 
builder.Services.AddControllersWithViews(options => { options.Filters.Add<ErrorHandlerActionFilter>(); options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true; }).AddJsonOptions(options => { options.JsonSerializerOptions.PropertyNamingPolicy = null;});

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options => { options.IdleTimeout = TimeSpan.FromMinutes(30); });
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseDeveloperExceptionPage();   
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    //app.UseExceptionHandler("/Home/Error");
    app.UseExceptionHandler(x => 
    {
        x.Run(async context =>
        {
            context.Response.StatusCode = 500;
            
            var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
            string errorMsg = exceptionHandlerPathFeature?.Error.Message.ToString()?? "";
            
            context.Response.Redirect("/Home/Error?error="+ errorMsg);
            await context.Response.WriteAsync("");
        });
    });

    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseSession();

app.UseRouting();

app.UseAuthorization();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=Login}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.UseMiddleware<SessionStartMiddleware>(app.Environment.ContentRootPath);

ListSearch.SetHttpContextAccessor(app.Services.GetRequiredService<IHttpContextAccessor>());
GridSearchControl.SetHttpContextAccessor(app.Services.GetRequiredService<IHttpContextAccessor>());

AppDomain.CurrentDomain.SetData("ContentRootPath", app.Environment.ContentRootPath);
AppDomain.CurrentDomain.SetData("WebRootPath", app.Environment.WebRootPath);

app.Run();
