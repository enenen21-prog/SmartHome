using Microsoft.EntityFrameworkCore;
using MyApi.Services;
using System.IO;

var builder = WebApplication.CreateBuilder(args);


// Adding the DbContext
builder.Services.AddDbContext<SmartHomeDbContext>(options =>
{
    var dbFolder = Path.Combine(builder.Environment.ContentRootPath, "db");
    Directory.CreateDirectory(dbFolder);
    var fullDbPath = Path.Combine(dbFolder, SmartHomeDbContext.DefaultDbName);
    options.UseSqlite($"Data Source={fullDbPath}");
});

// Add services
builder.Services.AddControllers();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173") // your React dev server
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<IDeviceService, DeviceService>();
builder.Services.AddScoped<ISampleService, SampleService>();

var app = builder.Build();

// Middleware order is important
app.UseHttpsRedirection();

// Use CORS BEFORE mapping controllers
app.UseCors("AllowReactDev");

app.MapControllers();

/* TEST */
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SmartHomeDbContext>();
    await SampleDbTest.RunAsync(db);
}

app.Run();
