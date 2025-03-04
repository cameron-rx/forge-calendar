public interface ITimeBlockService
{
    Task<TimeBlockResponseDTO> Create(TimeBlockRequestDTO timeblock, int userId);
    Task<List<TimeBlockResponseDTO>> GetAll(int userID);
}