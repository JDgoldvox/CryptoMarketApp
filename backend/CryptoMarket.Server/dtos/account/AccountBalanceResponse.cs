using System.ComponentModel.DataAnnotations;

namespace CryptoMarket.Account;

public record AccountBalanceResponse
(
    [Required] decimal Balance
);