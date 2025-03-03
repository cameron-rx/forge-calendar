using Microsoft.EntityFrameworkCore;

public class CalendarItemDb : DbContext
{
    public CalendarItemDb(DbContextOptions options) : base(options){}
    public DbSet<CalendarItem> CalendarItems { get; set; } = null!;
}