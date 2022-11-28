using Microsoft.EntityFrameworkCore;

namespace Hattrick.Data.Services
{
    public class HostedService : IHostedService
    {
        private readonly IDataService _dataService;
        private readonly IServiceScopeFactory _scopeFactory;


        public HostedService (IDataService dataService, IServiceScopeFactory scopeFactory)
        {
            _dataService = dataService;
            _scopeFactory = scopeFactory;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            //Startup logic
            using (var scope = _scopeFactory.CreateScope())
            {
               //We don't want to have a singleton DbContext so we use scope to use it inside HostedService 
               var hattrickDbContext = scope.ServiceProvider.GetRequiredService<HattrickDbContext>();
               var matches = _dataService.GetData();

               if (matches != null)
               {
                   foreach (var match in matches)
                   {
                       await hattrickDbContext.Match.AddAsync(match);
                   }
                   await hattrickDbContext.SaveChangesAsync();
                }
            }
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            //App stopped logic
        }
    }
}
