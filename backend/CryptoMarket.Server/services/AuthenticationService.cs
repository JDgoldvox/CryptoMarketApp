using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using CryptoMarket.Authorization;
using CryptoMarket.Data;
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

    public async Task<bool> RegisterUser(RegisterRequest request, AppDbContext db)
    {
        //check for duplicate usernames
        if (db.Users.Any((u => u.Username == request.Username)))
        {
            Console.WriteLine("Username already exists");
            return false;
        }
        
        var passwordHasher = new PasswordHasher<string>();

        User user = new User()
        {
            Username = request.Username,
            PasswordHash = passwordHasher.HashPassword(request.Username, request.Password),
        };
        
        try
        {
            db.Add(user);
            await db.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }
    
    public async Task<String?> GenerateAndSaveRefreshTokenAsync(LoginRequest request)
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
    
    private static bool IsPasswordCorrect(LoginRequest request) //need to get userResponse from DB
    {
        // var passwordHasher = new PasswordHasher<UserResponse>();
        // var result = passwordHasher.VerifyHashedPassword(userResponseFromDb, userResponseFromDb.PasswordHash, request.Password);
        // return result == PasswordVerificationResult.Success;
        
        return true;
    }
}