
public class UserResponse
{
    public string Username { get; set; } = String.Empty;
    public string PasswordHash { get; set; } = String.Empty;
    public string RefreshToken { get; set; } = String.Empty;
    public DateTime RefreshTokenExpiration { get; set; }
}