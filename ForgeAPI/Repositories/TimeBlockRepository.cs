using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

public class TimeBlockRepository : ITimeBlockRespository
{
    private readonly ForgeDB Context;

    public TimeBlockRepository(ForgeDB context)
    {
        Context = context;
    }

    public async Task<IEnumerable<TimeBlock>> GetAllTimeBlocks(string UserId)
    {
        return await Context.Timeblocks.Where(t => t.UserId == UserId).ToListAsync();
    }

    public async Task<TimeBlock?> Get(int timeblockId)
    {
        return await Context.Timeblocks.FindAsync(timeblockId);
    }

    public async Task AddTimeBlock(TimeBlock item)
    {
        Console.WriteLine(item.UserId);
        await Context.Timeblocks.AddAsync(item);
        await Context.SaveChangesAsync();
    }
    public async Task RemoveTimeBlock(int timeblockId){
        var item = await Get(timeblockId);
        Context.Timeblocks.Remove(item);
        await Context.SaveChangesAsync();
    }
    public async Task<TimeBlock> UpdateTimeBlock(int oldItemId, TimeBlock newItem)
    {
        var timeblock = await Get(oldItemId);
        timeblock.Name = newItem.Name == "" ? timeblock.Name : newItem.Name;
        timeblock.Location = newItem.Location == "" ? timeblock.Location : newItem.Location;
        timeblock.StartTime = newItem.StartTime == default(DateTime) ? timeblock.StartTime : newItem.StartTime ;
        timeblock.EndTime = newItem.EndTime == default(DateTime) ? timeblock.EndTime : newItem.EndTime;

        await Context.SaveChangesAsync();

        return timeblock;

    }

    public async Task<bool> Exists(int timeblockId)
    {
       return  await Context.Timeblocks.AnyAsync(t => t.Id == timeblockId);
    }
}

