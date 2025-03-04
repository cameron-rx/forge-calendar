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
        return await Context.Timeblocks.Where(i => i.UserId == UserId).ToListAsync();
    }

    public async Task AddTimeBlock(TimeBlock item)
    {
        await Context.Timeblocks.AddAsync(item);
        await Context.SaveChangesAsync();
    }
    public async Task RemoveTimeBlock(int Id){
        var item = await Context.Timeblocks.FindAsync(Id);
        if (item != null)
        {
            Context.Timeblocks.Remove(item);
            await Context.SaveChangesAsync();
        }
        else
        {
            throw new EntityNotFoundException("Could not find entity associated with given id.");
        }
    }
    public async Task UpdateTimeBlock(TimeBlock newItem, int oldItemId)
    {
        var oldItem = await Context.Timeblocks.FindAsync(oldItemId);
        if (oldItem != null)
        {
            oldItem.Name = newItem.Name;
            oldItem.Location = newItem.Location;
            oldItem.StartTime = newItem.StartTime;
            oldItem.EndTime = newItem.EndTime;

            await Context.SaveChangesAsync();
        } 
        else 
        {
            throw new EntityNotFoundException("Could not find enitity associated with given id.");
        }
    }
}

