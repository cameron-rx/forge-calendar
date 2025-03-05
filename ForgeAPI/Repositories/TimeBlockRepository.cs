using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

public class TimeBlockRepository : ITimeBlockRespository
{
    private readonly ForgeDB Context;

    public TimeBlockRepository(ForgeDB context)
    {
        Context = context;
    }

    public async Task<IEnumerable<TimeBlock>> GetAllTimeBlocks(int UserId)
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
    public async Task UpdateTimeBlock(TimeBlock newItem, int oldItemId)
    {
        var oldItem = await Get(oldItemId);
        oldItem.Name = newItem.Name;
        oldItem.Location = newItem.Location;
        oldItem.StartTime = newItem.StartTime;
        oldItem.EndTime = newItem.EndTime;

        await Context.SaveChangesAsync();
    }
}

