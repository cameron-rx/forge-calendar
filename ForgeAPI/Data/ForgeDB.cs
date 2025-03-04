using Microsoft.EntityFrameworkCore;

public class ForgeDB : DbContext
{
    public ForgeDB(DbContextOptions options) : base(options){}
    public DbSet<TimeBlock> Timeblocks { get; set; } = null!;
}