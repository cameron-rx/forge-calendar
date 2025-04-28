using Microsoft.EntityFrameworkCore;

public class ForgeDB : DbContext
{
    public ForgeDB(DbContextOptions<ForgeDB> options) : base(options){}
    public DbSet<TimeBlock> Timeblocks { get; set; } = null!;
}