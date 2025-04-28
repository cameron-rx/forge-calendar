using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/auth");

        group.MapGet("/me", (HttpContext context) =>
        {

            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var authCheck = new AuthCheckDTO { isLoggedIn = false };

            if (context.User.Identity?.IsAuthenticated == true) {
                authCheck.isLoggedIn = true;
            }

            return Results.Json(authCheck);
        });

        group.MapPost("/logout", async (HttpContext context) => {
            await context.SignOutAsync(IdentityConstants.ApplicationScheme);
            return Results.Ok();
        }).RequireAuthorization();
    }


}