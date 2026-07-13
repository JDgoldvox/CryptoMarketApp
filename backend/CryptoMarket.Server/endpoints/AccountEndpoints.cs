using CryptoMarket.Account;
using Microsoft.AspNetCore.Authorization;

namespace CryptoMarket.Endpoints;

public static class AccountEndpoints
{
    //private const string groupName = "/";

    private static decimal tempBalance = 1000;
    private static string tempUsername = "temp username";
    private static decimal tempFiat = 563;
    private static float tempPnl= 1000;
    
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

        app.MapGet("/{userId}/accountdetails", GetUserAccountDetails)
            .WithTags("Account")
            .WithName("Get user account details")
            .WithSummary("Get the current details of a user")
            .Produces<AccountDetailsResponse>();

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

    /// <summary> Get a user account details from an id </summary>
    /// <param name="userId"> The unique identifier of a user </param>
    /// <returns> The current user details </returns>
    /// <returns> <see cref="AccountDetailsResponse"/> </returns>
    private static IResult GetUserAccountDetails(int userId)
    {
        var response = new AccountDetailsResponse(
            Username: tempUsername,
            Fiat: tempFiat,
            lastSignedIn: DateTime.UtcNow,
            Balance: tempBalance,
            Pnl: tempPnl
        );
        
        return Results.Ok(response);
    }
}