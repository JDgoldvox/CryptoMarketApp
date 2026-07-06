using Microsoft.EntityFrameworkCore;
namespace CryptoMarket.Data;

public class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options) {
    public DbSet<User> Users { get; set; } //creates data table
}