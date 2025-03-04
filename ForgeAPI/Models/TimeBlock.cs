public class TimeBlock
{
    public int Id {get; set;}
    public string Name {get; set;} = "";
    public string Location {get; set;} = "";
    public DateTime StartTime {get; set;}
    public DateTime EndTime {get; set;}
    public int UserId {get; set;}
}