using CryptoMarket.Data;
using Microsoft.EntityFrameworkCore;
using LoginRequest = CryptoMarket.Login.LoginRequest;
using RegisterRequest = CryptoMarket.Login.RegisterRequest;

namespace CryptoMarket.LoginEndpoints;


public static class LoginEndpoints
{
    public static void MapLoginEndpoints(this WebApplication app)
    {
        app.MapPost("/login", async (LoginRequest request, AuthenticationService authService, AppDbContext db, HttpContext context) =>
        {
            // // Hardcoded dummy check (Replace with database check later)
            // if (request.Username != "admin")
            // {
            //     return Results.Unauthorized();
            // }
            //
            // if (request.Password != "password")
            // {
            //     return Results.Unauthorized();
            // }
            
            var accessToken = await authService.GenerateNewJwt(request);
            if (accessToken == null) return Results.InternalServerError("access token not generated");

            var RefreshToken = await authService.GenerateAndSaveRefreshTokenAsync(request);
            if (RefreshToken == null) return Results.InternalServerError("refresh token not generated");
            
            context.Response.Cookies.Append("CryptoMarketAccessToken", accessToken, new CookieOptions
            {
                HttpOnly = true,                  
                Secure = true,                    
                SameSite = SameSiteMode.Strict,   
                Expires = DateTimeOffset.UtcNow.AddHours(1) 
            });
            
            context.Response.Cookies.Append("CryptoMarketRefreshToken", RefreshToken, new CookieOptions
            {
                HttpOnly = true,                  
                Secure = true,                    
                SameSite = SameSiteMode.Strict,   
                Expires = DateTimeOffset.UtcNow.AddDays(7) 
            });

            try
            {
                User? user = await db.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

                if (user == null) return Results.InternalServerError("user not found");
                
                user.RefreshToken = RefreshToken;
                user.RefreshTokenExpiration = DateTimeOffset.UtcNow.AddDays(7);
                await db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Results.InternalServerError("refresh token not saved");
            }
            
            return Results.Ok(new
            {
                accessToken = accessToken,
                refreshToken = RefreshToken,
            });
        });

        app.MapPost("/register", async (RegisterRequest request, AppDbContext db, AuthenticationService authService) =>
        {
            if (await authService.RegisterUser(request, db))
            {
                return Results.Ok();
            }
            return Results.InternalServerError("User not able to be registered");
        });

        app.MapPost("/refresh", async (HttpContext context, AppDbContext db, AuthenticationService authService) =>
        {
            if (!context.Request.Cookies.TryGetValue("CryptoMarketRefreshToken", out var refreshTokenStr))
            {
                return Results.Unauthorized();
            }
            
            var user = await db.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshTokenStr);
            if(user == null) return Results.Unauthorized();

            if (user.RefreshToken != refreshTokenStr || user.RefreshTokenExpiration < DateTime.UtcNow)
            {
                return Results.Unauthorized();
            }
            
            var dummyLoginRequest = new LoginRequest(user.Username, "", refreshTokenStr);
            var newAccessToken = await authService.GenerateNewJwt(dummyLoginRequest);
            
            context.Response.Cookies.Append("CryptoMarketAccessToken", newAccessToken, new CookieOptions
            {
                HttpOnly = true,                  
                Secure = true,                    
                SameSite = SameSiteMode.Strict,   
                Expires = DateTimeOffset.UtcNow.AddHours(1) 
            });
            
            return Results.Ok();
        });

        app.MapGet("/me", (HttpContext context) =>
        {
            return Results.Ok();
        }).RequireAuthorization();

        app.MapPost("/test", async (AppDbContext db) =>
        {
            db.Add(new User()
            {
                PasswordHash = "password",
                Username = "admin",
                RefreshToken = "refrehs token lol",
                RefreshTokenExpiration = DateTime.UtcNow.AddDays(31)
            });
            await db.SaveChangesAsync();
            return Results.Ok();
        });
    }
}