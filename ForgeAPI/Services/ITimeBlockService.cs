using Microsoft.EntityFrameworkCore;

public interface ITimeBlockService
{
    Task<TimeBlockResponseDTO> Create(TimeBlockRequestDTO timeblock, string userId);
    Task<List<TimeBlockResponseDTO>> GetAll(int userID);
    Task Delete(int userId, int timeblockId);
    Task<TimeBlockResponseDTO> Update(int timeblockId, TimeBlockRequestDTO timeblock);
}