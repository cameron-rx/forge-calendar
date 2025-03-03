using Microsoft.EntityFrameworkCore;

public class CalendarItemRepository : ICalendarItemRespository
{
    private readonly CalendarItemDb _context;

    public CalendarItemRepository(CalendarItemDb context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CalendarItem>> GetAllCalendarItems(int UserId)
    {
        return await _context.CalendarItems.Where(i => i.UserId == UserId).ToListAsync();
    }

    public async Task AddCalendarItem(CalendarItemRequestDTO item)
    {

    }
    public async Task RemoveCalendarItem(int Id){

    }
    public async Task UpdateCalendarItem(CalendarItemRequestDTO item, int Id)
    {

    }
}

