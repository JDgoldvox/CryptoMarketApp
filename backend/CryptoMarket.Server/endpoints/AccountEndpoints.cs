namespace CryptoMarket.Endpoints;

public static class AccountEndpoints
{
    //private const string groupName = "/";

    private static int tempBalance = 1000;
    
    public static void MapAccountEndpoints(this WebApplication app)
    {
        //RouteGroupBuilder accountRoute = app.MapGroup(groupName);

        app.MapGet("/{userId}/balance", GetUserAccountBalance);

    }

    private static IResult GetUserAccountBalance(int userId)
    {
        return Results.Ok(new
        {
            Balance = tempBalance,
            Id = userId,
        });
    }
}