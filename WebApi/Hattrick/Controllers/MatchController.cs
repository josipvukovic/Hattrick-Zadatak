using Hattrick.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hattrick.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchController : ControllerBase
    {
        private readonly HattrickDbContext hattrickDbContext;

        public MatchController(HattrickDbContext hattrickDbContext)
        {
            this.hattrickDbContext = hattrickDbContext;
        }


        // GET all matches
        [HttpGet]
        public async Task<IActionResult> GetAllMatches()
        {
            var matches = await hattrickDbContext.Match.ToListAsync();
            return Ok(matches);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetMatch([FromRoute] int id)
        {
            var match = await hattrickDbContext.Match.FirstOrDefaultAsync(x => x.MatchId == id);
            if(match != null)
            {
                return Ok(match);
            }
            return NotFound("Match not found");
        }

    }
}
