public class TimeBlockService : ITimeBlockService 
{
    private readonly ITimeBlockRespository timeBlockRespository;

    public TimeBlockService(ITimeBlockRespository timeBlockRespository)
    {
        this.timeBlockRespository = timeBlockRespository;
    }

    public async Task<TimeBlockResponseDTO> Create(TimeBlockRequestDTO item, int userId)
    {
        var timeblock = new TimeBlock{ UserId = userId, Name = item.Name, Location = item.Location, StartTime = item.StartTime, EndTime = item.EndTime};
        await timeBlockRespository.AddTimeBlock(timeblock);
        return new TimeBlockResponseDTO{ Id = timeblock.Id, Name=timeblock.Name, Location=timeblock.Location, StartTime=timeblock.StartTime, EndTime=timeblock.EndTime};
    }
}