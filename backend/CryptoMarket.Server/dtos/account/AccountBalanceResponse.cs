using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CryptoMarket.Account;

public record AccountBalanceResponse
(
    [Required] decimal Balance
);