using System.Security.Claims;
using CryptoMarket.Authorization;
using CryptoMarket.Data;
using CryptoMarket.Endpoints;
using CryptoMarket.LoginEndpoints;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using EFCore.NamingConventions;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi(options => options.AddScalarTransformers());
builder.AddCryptoMarketAuthorization();
builder.Services.AddScoped<AuthenticationService>();

builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseNpgsql(builder.Configuration["DBConnectionString"] ?? 
        throw new InvalidOperationException("ConnectionString is missing from appsettings.json")
    ).UseSnakeCaseNamingConvention();
});

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.MapAccountEndpoints();
app.MapLoginEndpoints();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference("/docs");
}

// // PROTECTED ENDPOINT
// app.MapGet("/secret", (ClaimsPrincipal user) => 
//     {
//         return Results.Ok($"Hello {user.Identity?.Name}, you successfully accessed the secure API!");
//     })
//     .RequireAuthorization();    

app.Run();