using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using CryptoMarket.Authorization;
using CryptoMarket.Login;
using Microsoft.IdentityModel.Tokens;

namespace CryptoMarket.LoginEndpoints;

public static class LoginEndpoints
{
    public static void MapLoginEndpoints(this WebApplication app)
    {
        app.MapPost("/login", (LoginRequest request) =>
        {
            // Hardcoded dummy check (Replace with database check later)
            if (request.Username == "admin" && request.Password == "password")
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity([
                        new Claim(ClaimTypes.Name, request.Username),
                        new Claim(ClaimTypes.Role, "admin")
                    ]),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(CryptoMarketAuthorization.keyBytes),
                        SecurityAlgorithms.HmacSha256Signature)
                };
        
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return Results.Ok(new
                {
                    Token = tokenHandler.WriteToken(token)
                });
            }

            return Results.Unauthorized();
        });
    }
}