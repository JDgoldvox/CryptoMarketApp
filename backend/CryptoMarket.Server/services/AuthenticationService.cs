using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using CryptoMarket.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using LoginRequest = CryptoMarket.Login.LoginRequest;
using RegisterRequest = CryptoMarket.Login.RegisterRequest;

public class AuthenticationService
{
    public async Task<string?> GenerateNewJwt(LoginRequest request)
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

    public async Task<User?> RegisterUser(RegisterRequest request)
    {
        User user = new();
        user.Username = request.Username;
        var passwordHasher = new PasswordHasher<User>();
        user.PasswordHash = passwordHasher.HashPassword(user, request.Password);
        return user;
    }
    
    public async Task<String> GenerateAndSaveRefreshTokenAsync(LoginRequest request)
    {
        var refreshToken = GenerateRefreshToken();
        
        
        
        
        //todo: save to database
        //FIND the user.
        // user.RefreshToken = refreshToken;
        // user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(31);
        
        return refreshToken;
    }

    private string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
    
    private static bool IsPasswordCorrect(User userFromDb, LoginRequest request) //need to get user from DB
    {
        var passwordHasher = new PasswordHasher<User>();
        var result = passwordHasher.VerifyHashedPassword(userFromDb, userFromDb.PasswordHash, request.Password);
        return result == PasswordVerificationResult.Success;
    }
}