using Microsoft.EntityFrameworkCore;
namespace CryptoMarket.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options) {
    public DbSet<User> Users { get; set; } //creates data table
}