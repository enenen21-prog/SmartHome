using Microsoft.EntityFrameworkCore;
using MyApi.Models;

public class SmartHomeDbContext : DbContext
{
    public const string DefaultDbName = "SmartHomeDb.sqlite";
    // DbSets for Rooms and Devices
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Device> Devices { get; set; }
    public DbSet<Sample> Samples { get; set; }

    public SmartHomeDbContext() { }
    public SmartHomeDbContext(DbContextOptions<SmartHomeDbContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var projectRoot = Directory.GetCurrentDirectory();
            var dbFolder = Path.Combine(projectRoot, "db");
            Directory.CreateDirectory(dbFolder);
            var fullDbPath = Path.Combine(dbFolder, DefaultDbName);

            Console.WriteLine($"Using database file: {fullDbPath}");

            optionsBuilder.UseSqlite($"Data Source={fullDbPath}");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
