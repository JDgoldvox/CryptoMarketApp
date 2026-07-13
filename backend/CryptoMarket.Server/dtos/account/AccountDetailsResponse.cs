using System.ComponentModel.DataAnnotations;
namespace CryptoMarket.Account;

public record AccountDetailsResponse
(
    string Username, 
    decimal Fiat,
    decimal Balance,
    DateTime lastSignedIn,
    float Pnl
);
