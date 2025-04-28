using Microsoft.EntityFrameworkCore;

public interface ITimeBlockService
{
    Task<TimeBlockResponseDTO> Create(TimeBlockRequestDTO timeblock, string userId);
    Task<List<TimeBlockResponseDTO>> GetAll(string userID);
    Task Delete(string userId, int timeblockId);
    Task<TimeBlockResponseDTO> Update(string userId, int timeblockId, TimeBlockRequestDTO timeblock);
}