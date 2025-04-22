public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/auth");

        group.MapGet("/me", async (HttpContext context) =>
        {
            var value = false;
            var authCheck = new AuthCheckDTO { isLoggedIn = false };
            // Check whether user is authenticted 
            // if yes return {isLoggedIn: true}
            // else return {isLoggedIn: false}

            if (context.User.Identity.IsAuthenticated == true) {
                authCheck.isLoggedIn = true;
            }

            return Results.Ok(authCheck);
        });
    }


}