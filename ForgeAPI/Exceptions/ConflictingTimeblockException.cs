
public class ConflictingTimeblockException : Exception
{
    public ConflictingTimeblockException()
        : base("Timeblock already exists in this timespan")
    {
    }
}
