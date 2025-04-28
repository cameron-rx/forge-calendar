public interface ITimeBlockRespository
{
    Task<IEnumerable<TimeBlock>> GetAllTimeBlocks(string UserId);
    Task<TimeBlock?> Get(int timeblockId);
    Task AddTimeBlock(TimeBlock item);
    Task RemoveTimeBlock(int Id);
    Task<TimeBlock> UpdateTimeBlock(int oldItemId, TimeBlock newItem);
    Task<bool> Exists(int timeblockId);
}