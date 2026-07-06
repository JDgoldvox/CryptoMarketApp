using System.Security.Claims;
using CryptoMarket.Authorization;
using CryptoMarket.Endpoints;
using CryptoMarket.LoginEndpoints;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi(options => options.AddScalarTransformers());
builder.AddCryptoMarketAuthorization();
builder.Services.AddScoped<AuthenticationService>();

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