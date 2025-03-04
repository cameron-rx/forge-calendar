public record TimeBlockRequestDTO
{
    public string Name {get; set;} = "";
    public string Location {get; set;} = "";
    public DateTime StartTime {get; set;}
    public DateTime EndTime {get; set;}
}