using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

public class TimeBlockRepository : ITimeBlockRespository
{
    private readonly IdentityDB Context;

    public TimeBlockRepository(IdentityDB context)
    {
        Context = context;
    }

    public async Task<IEnumerable<TimeBlock>> GetAllTimeBlocks(string UserId)
    {
        return await Context.Timeblocks.Where(t => t.UserId == UserId).ToListAsync();
    }

    public async Task<TimeBlock?> Get(string userId, int timeblockId)
    {
        return await Context.Timeblocks.Where(t => t.Id == timeblockId && t.UserId == userId).FirstAsync();
    }

    public async Task AddTimeBlock(TimeBlock item)
    {
        await Context.Timeblocks.AddAsync(item);
        await Context.SaveChangesAsync();
    }
    public async Task RemoveTimeBlock(string userId, int timeblockId)
    {
        var item = await Get(userId, timeblockId);
        if (item != null)
        {
            Context.Timeblocks.Remove(item);
            await Context.SaveChangesAsync();
        }
    }
    public async Task<TimeBlock> UpdateTimeBlock(string userId, int oldItemId, TimeBlock newItem)
    {
        var timeblock = await Get(userId, oldItemId);
        timeblock.Name = newItem.Name == "" ? timeblock.Name : newItem.Name;
        timeblock.Location = newItem.Location == "" ? timeblock.Location : newItem.Location;
        timeblock.StartTime = newItem.StartTime == default(DateTime) ? timeblock.StartTime : newItem.StartTime;
        timeblock.EndTime = newItem.EndTime == default(DateTime) ? timeblock.EndTime : newItem.EndTime;

        await Context.SaveChangesAsync();

        return timeblock;

    }

    public async Task<bool> Exists(string userId, int timeblockId)
    {
        return await Context.Timeblocks.AnyAsync(t => t.Id == timeblockId && t.UserId == userId);
    }

    public async Task<bool> CheckConflictingBlocks(TimeBlock item)
    {
        return await Context.Timeblocks.AnyAsync(t => t.StartTime < item.EndTime && item.StartTime < t.EndTime && t.Id != item.Id);
    }
}
