public interface ITimeBlockRespository
{
    Task<IEnumerable<TimeBlock>> GetAllTimeBlocks(string UserId);
    Task<TimeBlock?> Get(string userId, int timeblockId);
    Task AddTimeBlock(TimeBlock item);
    Task RemoveTimeBlock(string userId, int Id);
    Task<TimeBlock> UpdateTimeBlock(string userId, int oldItemId, TimeBlock newItem);
    Task<bool> Exists(string userId, int timeblockId);
}