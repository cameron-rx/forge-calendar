using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

public class CalendarItemRepository : ICalendarItemRespository
{
    private readonly CalendarItemDb Context;

    public CalendarItemRepository(CalendarItemDb context)
    {
        Context = context;
    }

    public async Task<IEnumerable<CalendarItem>> GetAllCalendarItems(int UserId)
    {
        return await Context.CalendarItems.Where(i => i.UserId == UserId).ToListAsync();
    }

    public async Task AddCalendarItem(CalendarItemRequestDTO item, int UserId)
    {
        await Context.CalendarItems.AddAsync(new CalendarItem{Name = item.Name, Location = item.Location, StartTime=item.StartTime, EndTime=item.EndTime, UserId=UserId});
        await Context.SaveChangesAsync();
    }
    public async Task RemoveCalendarItem(int Id){
        var item = await Context.CalendarItems.FindAsync(Id);
        if (item != null)
        {
            Context.CalendarItems.Remove(item);
            await Context.SaveChangesAsync();
        }
        else
        {
            throw new EntityNotFoundException("Could not find entity associated with given id.");
        }
    }
    public async Task UpdateCalendarItem(CalendarItemRequestDTO item, int Id)
    {
        var oldItem = await Context.CalendarItems.FindAsync(Id);
        if (oldItem != null)
        {
            oldItem.Name = item.Name;
            oldItem.Location = item.Location;
            oldItem.StartTime = item.StartTime;
            oldItem.EndTime = item.EndTime;

            await Context.SaveChangesAsync();
        } 
        else 
        {
            throw new EntityNotFoundException("Could not find enitity associated with given id.");
        }
    }
}

