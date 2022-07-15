using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using Plant.DAL;


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddCors(p => p.AddPolicy("MyAllowSpecificOrigins", builder =>
{
    builder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
}));

builder.Services.AddControllersWithViews();
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
//builder.Services.AddCors(options =>
//                        options.AddPolicy("MyAllowSpecificOrigins",
//                          builder =>
//                          {
//                              builder.WithOrigins()
//                                   .AllowAnyMethod()
//                                    .AllowAnyHeader();
//                          }));

builder.Services.AddDbContext<PlantDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("conStr"));
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseCors("MyAllowSpecificOrigins");
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
