using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class IdentityDB : IdentityDbContext<IdentityUser>
{
    public IdentityDB(DbContextOptions<IdentityDB> options) : 
        base(options)
    { }
    public DbSet<TimeBlock> Timeblocks { get; set; } = null!;
}