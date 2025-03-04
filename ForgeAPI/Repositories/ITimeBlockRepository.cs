public interface ITimeBlockRespository
{
    Task<IEnumerable<TimeBlock>> GetAllTimeBlocks(int UserId);
    Task AddTimeBlock(TimeBlock item);
    Task RemoveTimeBlock(int Id);
    Task UpdateTimeBlock(TimeBlock newItem, int oldItemId);
}