using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<IdentityDB>();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ForgeDB>(options => options.UseInMemoryDatabase("items"));
builder.Services.AddDbContext<IdentityDB>(options => options.UseInMemoryDatabase("identity"));
builder.Services.AddScoped<ITimeBlockRespository, TimeBlockRepository>();
builder.Services.AddScoped<ITimeBlockService, TimeBlockService>();

if(builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(
            policy =>
            {
                policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });
    });
}


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseCors();

app.MapIdentityApi<IdentityUser>();
app.MapTimeBlockEndpoints();
app.MapAuthEndpoints();

app.Run();