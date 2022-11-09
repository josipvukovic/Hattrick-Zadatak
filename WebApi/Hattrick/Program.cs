using Hattrick.Data;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//InjectDbContext
builder.Services.AddDbContext<HattrickDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("HattrickDbConnectionString")));

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
    //Configure the Database to allow OPENROWSET. WITH THIS WORKAROUND WE PRESUME 'ad hoc distributed queries' IS NOT ENABLED ON FIRST START.
    context.Database.ExecuteSqlRaw(GlobalData.DbConfigurationQuery);
    //OPENROWSET query is not allowed inside migrations if database is not configured properly so we run it manually after configuration is done
    context.Database.ExecuteSqlRaw(GlobalData.InsertDataQuery);
    //Insert Special offer matches
    context.Database.ExecuteSqlRaw(GlobalData.InsertSpecialOffer);
}

app.UseCors("default");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
