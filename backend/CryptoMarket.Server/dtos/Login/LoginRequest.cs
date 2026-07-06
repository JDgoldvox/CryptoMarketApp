namespace CryptoMarket.Login;

public record LoginRequest(
    string Username, 
    string Password,
    string RefreshToken
);