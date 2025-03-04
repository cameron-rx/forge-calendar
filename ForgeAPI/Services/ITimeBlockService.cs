public interface ITimeBlockService
{
    Task<TimeBlockResponseDTO> Create(TimeBlockRequestDTO timeblock, int userId);
}