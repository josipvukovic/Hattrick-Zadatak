using Hattrick.Data;
using Hattrick.Data.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//InjectDbContext
builder.Services.AddDbContext<HattrickDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("HattrickDbConnectionString")));

builder.Services.AddHostedService<HostedService>();
builder.Services.AddSingleton<IDataService, DataService>();


// Set access to API rules
builder.Services.AddCors((setup) =>
{
    setup.AddPolicy("default", (options) =>
    {
        options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<HattrickDbContext>();
    context.Database.Migrate();

    //Clean the match table before data reinsert
    context.Database.ExecuteSqlRaw(GlobalData.DbConfigurationQuery);
}

app.UseCors("default");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
