using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION");

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
if (builder.Environment.IsDevelopment())
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

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<IdentityDB>();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<IdentityDB>(options => options.UseSqlServer(connectionString));
builder.Services.AddScoped<ITimeBlockRespository, TimeBlockRepository>();
builder.Services.AddScoped<ITimeBlockService, TimeBlockService>();



var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.UseCors();
}

app.UseHttpsRedirection();

app.UseAuthentication();  
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGroup("/api").MapIdentityApi<IdentityUser>();
app.MapTimeBlockEndpoints();
app.MapAuthEndpoints();
app.MapForgeEndpoints();
app.MapFallbackToFile("index.html");

app.Run();