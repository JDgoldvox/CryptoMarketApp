using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using CryptoMarket.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using LoginRequest = CryptoMarket.Login.LoginRequest;
using RegisterRequest = CryptoMarket.Login.RegisterRequest;

namespace CryptoMarket.LoginEndpoints;


public static class LoginEndpoints
{
    public static void MapLoginEndpoints(this WebApplication app)
    {
        app.MapPost("/login", async (LoginRequest request, AuthenticationService authService) =>
        {
            // Hardcoded dummy check (Replace with database check later)
            if (request.Username != "admin")
            {
                return Results.Unauthorized();
            }

            if (request.Password != "password")
            {
                return Results.Unauthorized();
            }
            
            return Results.Ok(new
            {
                Token = await authService.GenerateNewJwt(request),
                RefreshToken = await authService.GenerateAndSaveRefreshTokenAsync(request)
            });
        });

        app.MapPost("/register", (RegisterRequest request, AuthenticationService authService) =>
        {
            authService.RegisterUser(request);
            return Results.Ok();
        });
    }
}