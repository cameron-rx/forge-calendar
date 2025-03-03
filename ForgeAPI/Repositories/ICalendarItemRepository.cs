public interface ICalendarItemRespository
{
    Task<IEnumerable<CalendarItem>> GetAllCalendarItems(int UserId);
    Task AddCalendarItem(CalendarItemRequestDTO item);
    Task RemoveCalendarItem(int Id);
    Task UpdateCalendarItem(CalendarItemRequestDTO item, int Id);
}