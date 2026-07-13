using CryptoMarket.TransactionData;
namespace CryptoMarket.Endpoints;

public static class TransactionEndpoints
{
    public static void MapTransactionEndpoints(this WebApplication app)
    {
        app.Map("/{Id}/recenttransactions", GetRecentTransactions)
            .RequireAuthorization();
    }

    public static IResult GetRecentTransactions(int Id)
    {
        var transactionList = new List<RecentTrasnactionDataResponse>();

        var response = new RecentTrasnactionDataResponse(
            id: 1,
            date: DateOnly.FromDateTime(DateTime.Now),
            time: TimeOnly.FromDateTime(DateTime.Now),
            type: "buy",
            amount: 1000
            );
        
        transactionList.Add(response);
        
        var response2 = new RecentTrasnactionDataResponse(
            id: 1,
            date: DateOnly.FromDateTime(DateTime.Now),
            time: TimeOnly.FromDateTime(DateTime.Now),
            type: "buy",
            amount: 1000
        );
        
        transactionList.Add(response2);
        
        return Results.Ok(transactionList);
    }
}
