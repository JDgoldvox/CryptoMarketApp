using CryptoMarket.Authorization;
using CryptoMarket.Data;
using CryptoMarket.Endpoints;
using CryptoMarket.LoginEndpoints;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi(options => options.AddScalarTransformers());
builder.AddCryptoMarketAuthorization();
builder.Services.AddScoped<AuthenticationService>();

builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseNpgsql(builder.Configuration["DBConnectionString"] ?? 
        throw new InvalidOperationException("ConnectionString is missing from appsettings.json")
    ).UseSnakeCaseNamingConvention();
});

string corsPolicy = "developmentCorsPolicy";

builder.Services.AddCors(options =>
    options.AddPolicy(name: corsPolicy, policy =>
    {
        policy.WithOrigins(builder.Configuration["FrontendUrl"])
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    }));

var app = builder.Build();
app.UseCors(corsPolicy);
app.UseAuthentication();
app.UseAuthorization();
app.MapAccountEndpoints();
app.MapLoginEndpoints();
app.MapTransactionEndpoints();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference("/docs");
}

app.Run();