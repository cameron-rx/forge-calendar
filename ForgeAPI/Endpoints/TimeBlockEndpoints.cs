using System.Security.Claims;

public static class TimeBlockEndpoints
{
    public static void MapTimeBlockEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/timeblock").RequireAuthorization();

        group.MapPost("/", async (TimeBlockRequestDTO requestTimeblock, ITimeBlockService timeBlockService, ClaimsPrincipal user) =>
        {
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            var timeblock = await timeBlockService.Create(requestTimeblock, userId);
            return Results.Created($"/timeblock/{timeblock.Id}", timeblock);
        });

        group.MapGet("/", async (ITimeBlockService  timeBlockService, ClaimsPrincipal user) =>
        {
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            var timeblocks = await timeBlockService.GetAll(userId);
            return Results.Json(timeblocks);
        });

        group.MapDelete("/{id}", async (int id, ITimeBlockService timeBlockService) =>
        {
            await timeBlockService.Delete(1, id);
            return Results.NoContent();
        });

        group.MapPatch("/{id}", async (int id, TimeBlockRequestDTO requestTimeblock, ITimeBlockService timeBlockService) =>
        {
            try
            {
               var patchedTimeBlock = await timeBlockService.Update(id,requestTimeblock);
               return Results.Ok(patchedTimeBlock);
            }
            catch (System.Exception exception)
            {
                return Results.NotFound(exception.Message);
            }
        });
    }
}
