using drweb_cs_mvc.interfaceForDI;
using drweb_cs_mvc.internal_interface;
using drweb_cs_mvc.Models;
using drweb_cs_mvc.Models.dao;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddSession();

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddSingleton<login_service, loginServiceImpl>();
builder.Services.AddSingleton<loginDao, logindaoImpl>();
builder.Services.AddSingleton<signUpService, signUpserviceImpl>();
builder.Services.AddSingleton<chartService, chartServiceImpl>();
builder.Services.AddSingleton<chartDao, chartDaoimpl>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

    
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
