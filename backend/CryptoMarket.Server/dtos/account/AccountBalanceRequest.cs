using System.ComponentModel.DataAnnotations;
namespace CryptoMarket.Account;

/// <param name="Id">unique user identifier</param>
public record AccountBalanceRequest
(
    [Required] int Id
);