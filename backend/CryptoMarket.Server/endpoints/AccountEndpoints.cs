using CryptoMarket.Account;
using Microsoft.AspNetCore.Authorization;

namespace CryptoMarket.Endpoints;

public static class AccountEndpoints
{
    //private const string groupName = "/";

    private static int tempBalance = 1000;
    
    public static void MapAccountEndpoints(this WebApplication app)
    {
        //RouteGroupBuilder accountRoute = app.MapGroup(groupName);

        app.MapGet("/{userId}/balance", GetUserAccountBalance)
            .WithTags("Account")
            .WithName("Get user account balance")
            .WithSummary("Get the current balance of a user")
            .Produces<AccountBalanceResponse>()
            .RequireAuthorization("Admins Only");
        ;
    }
    
    /// <summary> Get a user account balance from an id </summary>
    /// <param name="userId"> The unique identifier of a user </param>
    /// <returns> The current user balance </returns>
    /// <returns> <see cref="AccountBalanceResponse"/> </returns>
    private static IResult GetUserAccountBalance(int userId)
    {
        var response = new AccountBalanceResponse(
            Balance: tempBalance
            );
        
        return Results.Ok(response);
    }
}