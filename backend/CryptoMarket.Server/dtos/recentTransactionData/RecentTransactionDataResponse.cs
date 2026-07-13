namespace CryptoMarket.TransactionData;

public record RecentTrasnactionDataResponse(
    int id,
    DateOnly date,
    TimeOnly time,
    string type,
    decimal amount
);