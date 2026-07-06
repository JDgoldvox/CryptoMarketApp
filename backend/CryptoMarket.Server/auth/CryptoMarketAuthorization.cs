
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Options;

namespace CryptoMarket.Authorization;

public static class CryptoMarketAuthorization
{
    public static byte[] keyBytes = [];
    
    public static void AddCryptoMarketAuthorization(this WebApplicationBuilder builder)
    {
        var secretKey = builder.Configuration["JwtSettings:SecretKey"] ??
            throw new InvalidOperationException("JwtSettings:SecretKey is missing from appsettings.json");
        
        keyBytes = Encoding.UTF8.GetBytes(secretKey);

        // CONFIGURE JWT AUTHENTICATION
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false, 
                    ValidateAudience = false, 
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                };
            });
        
        //Add policies
        builder.Services.AddAuthorization(options =>
            options.AddPolicy("Admins Only", policy =>
                policy.RequireClaim(ClaimTypes.Role, "admin")
            ));
    }

}