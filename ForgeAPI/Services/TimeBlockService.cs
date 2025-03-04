public class TimeBlockService : ITimeBlockService 
{
    private readonly ITimeBlockRespository timeBlockRespository;

    public TimeBlockService(ITimeBlockRespository timeBlockRespository)
    {
        this.timeBlockRespository = timeBlockRespository;
    }

    public async Task<TimeBlockResponseDTO> Create(TimeBlockRequestDTO item, int userId)
    {
        var timeblock = new TimeBlock{ Name = item.Name, Location = item.Location, StartTime = item.StartTime, EndTime = item.EndTime, UserId = userId};
        await timeBlockRespository.AddTimeBlock(timeblock);
        return new TimeBlockResponseDTO{ Id = timeblock.Id, Name=timeblock.Name, Location=timeblock.Location, StartTime=timeblock.StartTime, EndTime=timeblock.EndTime};
    }

    public async Task<List<TimeBlockResponseDTO>> GetAll(int userId)
    {
        var timeblocks = await timeBlockRespository.GetAllTimeBlocks(userId);
        List<TimeBlockResponseDTO> DTOs =  timeblocks.Select(t => new TimeBlockResponseDTO { Id = t.Id, Name = t.Name, Location = t.Location, StartTime = t.StartTime, EndTime = t.EndTime }).ToList();
        return DTOs;
    }
}