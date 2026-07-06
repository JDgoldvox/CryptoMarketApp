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
        app.MapPost("/login", (LoginRequest request) =>
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
      
            return Results.Ok(new {Token = GenerateNewJwt(request)} );
        });

        app.MapPost("/register", (RegisterRequest request) =>
        {
            RegisterUser(request);
            return Results.Ok();
        });
    }

    private static string GenerateNewJwt(LoginRequest request)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity([
                new Claim(ClaimTypes.Name, request.Username),
                new Claim(ClaimTypes.Role, "admin"),
            ]),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(CryptoMarketAuthorization.keyBytes),
                SecurityAlgorithms.HmacSha256Signature),
            // Audience = "CryptoMarket", //to
            // Issuer = "CryptoMarket" //from
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private static void RegisterUser(RegisterRequest request)
    {
        User user = new();
        user.Username = request.Username;
        
        var passwordHasher = new PasswordHasher<User>();
        user.PasswordHash = passwordHasher.HashPassword(user, request.Password);
    }
    
    private static bool IsPasswordCorrect(User userFromDb, LoginRequest request) //need to get user from DB
    {
        var passwordHasher = new PasswordHasher<User>();
        var result = passwordHasher.VerifyHashedPassword(userFromDb, userFromDb.PasswordHash, request.Password);
        return result == PasswordVerificationResult.Success;
    }
}