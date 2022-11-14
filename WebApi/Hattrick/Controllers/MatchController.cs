using Hattrick.Data;
using Hattrick.Models;
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

        // GET match by Id
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

        // GET special offer matches
        [HttpGet]
        [Route("GetSpecialOffer")]
        public async Task<IActionResult> GetSpecialOfferMatches()
        {
            var matches = await hattrickDbContext.SpecialOffer.ToListAsync();
            return Ok(matches);
        }

        // GET Croatian league 
        [HttpGet]
        [Route("GetFootballCroatia")]
        public async Task<IActionResult> GetFootballCroatia()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("Hrvatska 1")).ToListAsync();
            return Ok(matches);
        }

        // GET English league
        [HttpGet]
        [Route("GetFootballEngland")]
        public async Task<IActionResult> GetFootballEngland()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("Engleska 1")).ToListAsync();
            return Ok(matches);
        }
       
        // GET Spanish league 
        [HttpGet]
        [Route("GetFootballSpain")]
        public async Task<IActionResult> GetFootballSpain()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("Španjolska 1")).ToListAsync();
            return Ok(matches);
        }
        
        // GET Italian league
        [HttpGet]
        [Route("GetFootballItaly")]
        public async Task<IActionResult> GetFootballItaly()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("Italija 1")).ToListAsync();
            return Ok(matches);
        }

       // GET ticket 
       [HttpGet]
       [Route("GetTickets")]
       [ActionName("GetTickets")]
        public async Task<IActionResult> GetTickets()
        {
            var tickets = await hattrickDbContext.Ticket.ToListAsync();
            var matches = await hattrickDbContext.MatchDetails.ToListAsync();

            return Ok(tickets);
        }

        // Create new ticket
        [HttpPost]
        [Route("AddTicket")]
        public async Task<IActionResult> AddTicket([FromBody] Ticket ticket)
        {
            //ticket.TicketId = Guid.NewGuid();

            await hattrickDbContext.Ticket.AddAsync(ticket);
            await hattrickDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTickets), ticket.TicketId, ticket);
        }
    }
}
