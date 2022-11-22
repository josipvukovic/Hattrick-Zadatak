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

        //GET all matches
        [HttpGet]
        public async Task<IActionResult> GetAllMatches()
        {
            var matches = await hattrickDbContext.Match.ToListAsync();
            return Ok(matches);
        }

        //GET match by Id
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

        //GET special offer matches
        [HttpGet]
        [Route("GetSpecialOffer")]
        public async Task<IActionResult> GetSpecialOfferMatches()
        {
            var matches = await hattrickDbContext.SpecialOffer.ToListAsync();
            return Ok(matches);
        }

        //GET Croatian league 
        [HttpGet]
        [Route("GetFootballCroatia")]
        public async Task<IActionResult> GetFootballCroatia()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("Hrvatska 1")).ToListAsync();
            return Ok(matches);
        }

        //GET English league
        [HttpGet]
        [Route("GetFootballEngland")]
        public async Task<IActionResult> GetFootballEngland()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("Engleska 1")).ToListAsync();
            return Ok(matches);
        }
       
        //GET Spanish league 
        [HttpGet]
        [Route("GetFootballSpain")]
        public async Task<IActionResult> GetFootballSpain()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("Španjolska 1")).ToListAsync();
            return Ok(matches);
        }
        
        //GET Italian league
        [HttpGet]
        [Route("GetFootballItaly")]
        public async Task<IActionResult> GetFootballItaly()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("Italija 1")).ToListAsync();
            return Ok(matches);
        }

        //GET NBA
        [HttpGet]
        [Route("GetBasketballNBA")]
        public async Task<IActionResult> GetBasketballNBA()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("NBA")).ToListAsync();
            return Ok(matches);
        }

        //GET Euroleague
        [HttpGet]
        [Route("GetBasketballEuroleague")]
        public async Task<IActionResult> GetBasketballEuroleague()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("Euroleague")).ToListAsync();
            return Ok(matches);
        }

        //GET Wimbledon
        [HttpGet]
        [Route("GetTennisWimbledon")]
        public async Task<IActionResult> GetTennisWimbledon()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("Wimbledon")).ToListAsync();
            return Ok(matches);
        }

        //GET ATP Umag
        [HttpGet]
        [Route("GetTennisATPUmag")]
        public async Task<IActionResult> GetTennisATPUmag()
        {
            var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains("ATP Umag")).ToListAsync();
            return Ok(matches);
        }

        //GET submited tickets 
        [HttpGet]
        [Route("GetTickets")]
        [ActionName("GetTickets")]
        public async Task<IActionResult> GetTickets()
        {
            var tickets = await hattrickDbContext.Ticket.Include(m => m.Matches).ToListAsync();

            return Ok(tickets);
        }

        //POST ticket
        [HttpPost]
        [Route("AddTicket")]
        public async Task<IActionResult> AddTicket([FromBody] Ticket ticket)
        {

            await hattrickDbContext.Ticket.AddAsync(ticket);
            await hattrickDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTickets), ticket.TicketId, ticket);
        }

        //GET all transactions
        [HttpGet]
        [Route("GetTransactions")]
        [ActionName("GetTransactions")]
        public async Task<IActionResult> GetTransactions()
        {
            var transactions = await hattrickDbContext.Transactions.ToListAsync();

            return Ok(transactions);
        }

        //POST transaction
        [HttpPost]
        [Route("AddTransaction")]
        public async Task<IActionResult> AddTransaction([FromBody] Transactions transaction)
        {

            await hattrickDbContext.Transactions.AddAsync(transaction);
            await hattrickDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTickets), transaction.TransactionId, transaction);
        }

        //Update Match outcome by matchId
        [HttpPut]
        [Route("UpdateMatchOutcome")]
        public async Task<IActionResult> UpdateMatchOutcome([FromBody] Match match)
        {
            //update MatchOutcome field in Match table
            var item = await hattrickDbContext.Match.FirstOrDefaultAsync(m => m.MatchId == match.MatchId);
            if(item != null)
            {
                item.MatchOutcome = match.MatchOutcome;
                await hattrickDbContext.SaveChangesAsync();
            }
            //update all MatchOutcome fields for MatchId in MatchDetails table
            var matches = await hattrickDbContext.MatchDetails.Where(m => m.MatchId == match.MatchId).ToListAsync();
            if(matches != null)
            {
                foreach(var element in matches)
                {
                    element.MatchOutcome = match.MatchOutcome;
                    await hattrickDbContext.SaveChangesAsync();
                }
            }

            return CreatedAtAction(nameof(GetAllMatches), match);
        }
    }
}
