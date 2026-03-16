using MyApi.Services;

var builder = WebApplication.CreateBuilder(args);


// Adding the DbContext
builder.Services.AddDbContext<SmartHomeDbContext>();

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
await SampleDbTest.RunAsync();

app.Run();
