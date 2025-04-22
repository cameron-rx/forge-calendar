using System.Security.Claims;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/auth");

        group.MapGet("/me", async (HttpContext context) =>
        {

            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine(userId);

            var authCheck = new AuthCheckDTO { isLoggedIn = false };

            if (context.User.Identity?.IsAuthenticated == true) {
                authCheck.isLoggedIn = true;
            }

            return Results.Json(authCheck);
        });
    }


}