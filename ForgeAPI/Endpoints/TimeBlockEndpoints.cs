public static class TimeBlockEndpoints
{
    public static void MapTimeBlockEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/timeblock");

        group.MapPost("/", async (TimeBlockRequestDTO requestTimeblock, ITimeBlockService timeBlockService) =>
        {
            var timeblock = await timeBlockService.Create(requestTimeblock, 1);
            return Results.Created($"/timeblock/{timeblock.Id}", timeblock);
        });

        group.MapGet("/", async (ITimeBlockService  timeBlockService) =>
        {
            var timeblocks = await timeBlockService.GetAll(1);
            return Results.Json(timeblocks);
        });

        group.MapDelete("/{id}", async (int id, ITimeBlockService timeBlockService) =>
        {
            await timeBlockService.Delete(1, id);
            return Results.NoContent();
        });
    }
}
