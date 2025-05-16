using System.ComponentModel;
using System.Diagnostics;

public class TimeBlockService : ITimeBlockService
{
    private readonly ITimeBlockRespository timeBlockRespository;

    public TimeBlockService(ITimeBlockRespository timeBlockRespository)
    {
        this.timeBlockRespository = timeBlockRespository;
    }

    public async Task<TimeBlockResponseDTO> Create(TimeBlockRequestDTO item, string userId)
    {
        var timeblock = new TimeBlock { Name = item.Name, Location = item.Location, StartTime = item.StartTime, EndTime = item.EndTime, UserId = userId };
        var isConflicting = await timeBlockRespository.CheckConflictingBlocks(timeblock);

        if (isConflicting)
        {
            throw new ConflictingTimeblockException();
        }

        await timeBlockRespository.AddTimeBlock(timeblock);
        return new TimeBlockResponseDTO { Id = timeblock.Id, Name = timeblock.Name, Location = timeblock.Location, StartTime = timeblock.StartTime, EndTime = timeblock.EndTime };
    }

    public async Task<List<TimeBlockResponseDTO>> GetAll(string userId)
    {
        var timeblocks = await timeBlockRespository.GetAllTimeBlocks(userId);
        List<TimeBlockResponseDTO> DTOs = timeblocks.Select(t => new TimeBlockResponseDTO { Id = t.Id, Name = t.Name, Location = t.Location, StartTime = t.StartTime, EndTime = t.EndTime }).ToList();
        return DTOs;
    }

    public async Task Delete(string userId, int timeblockId)
    {
        await timeBlockRespository.RemoveTimeBlock(userId, timeblockId);
    }

    public async Task<TimeBlockResponseDTO> Update(string userId, int timeblockId, TimeBlockRequestDTO timeblockDTO)
    {
        bool exists = await timeBlockRespository.Exists(userId, timeblockId);

        if (exists)
        {
            TimeBlock timeblock = new TimeBlock();
            timeblock.Name = timeblockDTO.Name;
            timeblock.Location = timeblockDTO.Location;
            timeblock.StartTime = timeblockDTO.StartTime;
            timeblock.EndTime = timeblockDTO.EndTime;


            var isConflicting = await timeBlockRespository.CheckConflictingBlocks(timeblock);
            if (isConflicting)
            {
                throw new ConflictingTimeblockException();
            }

            TimeBlock updatedTimeblock = await timeBlockRespository.UpdateTimeBlock(userId, timeblockId, timeblock);

            return new TimeBlockResponseDTO
            {
                Id = updatedTimeblock.Id,
                Name = updatedTimeblock.Name,
                Location = updatedTimeblock.Location,
                StartTime = updatedTimeblock.StartTime,
                EndTime = updatedTimeblock.EndTime
            };
        }
        else
        {
            throw new Exception("Could not find timeblock with given id.");
        }
    }
}
