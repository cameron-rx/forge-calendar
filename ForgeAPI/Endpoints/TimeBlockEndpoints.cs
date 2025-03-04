public static class TimeBlockEndpoints
{
    public static void MapTimeBlockEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/timeblock");

        group.MapPost("/", async (TimeBlockRequestDTO timeblock, ITimeBlockService timeBlockService) =>
        {
            var item = await timeBlockService.Create(timeblock,1);
            return Results.Created($"/timeblock/{item.Id}", item);
        });
    }
}
