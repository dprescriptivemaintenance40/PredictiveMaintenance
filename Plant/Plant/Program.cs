using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using Plant.DAL;
using System.Configuration;
using System.Text;

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
var jwtSecret = builder.Configuration.GetValue<string>("JWT:Secret");
var keyBytes = Encoding.ASCII.GetBytes(jwtSecret);
var tokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
    ValidateIssuer = true,
    ValidIssuer = "http://localhost:61955",
    ValidateAudience = true,
    ValidAudience = "http://localhost:4200",
    ValidateLifetime = true,
    ClockSkew = TimeSpan.Zero
};
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
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
app.UseRouting();
app.UseCors("MyAllowSpecificOrigins");
app.UseAuthentication();

app.UseStaticFiles();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
