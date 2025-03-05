using Microsoft.EntityFrameworkCore;

public interface ITimeBlockService
{
    Task<TimeBlockResponseDTO> Create(TimeBlockRequestDTO timeblock, int userId);
    Task<List<TimeBlockResponseDTO>> GetAll(int userID);
    Task Delete(int userId, int timeblockId);
}