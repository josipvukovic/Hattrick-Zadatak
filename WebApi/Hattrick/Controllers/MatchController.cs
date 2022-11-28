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
        [Route("GetMatches")]
        public async Task<IActionResult> GetMatches([FromQuery] string competition, [FromQuery] bool specialOffer)
        {
            if(specialOffer == true)
            {   
                //Get only special offer matches
                var matches = await hattrickDbContext.Match.Where(m => m.SpecialOffer == true).ToListAsync();

                //Special offer tips have better odds
                foreach (var match in matches)
                {
                    match.HomeWin += (decimal)0.1;
                    match.AwayWin += (decimal)0.1;
                    match.Draw += (decimal)0.1;
                    match.HomeOrDraw += (decimal)0.1;
                    match.AwayOrDraw += (decimal)0.1;
                    match.HomeOrAway += (decimal)0.1;
                }
                return Ok(matches);
            }
            else
            {
                //Get only one competition
                var matches = await hattrickDbContext.Match.Where(m => m.Competition.Contains(competition)).ToListAsync();
                return Ok(matches);
            }
        }

        //POST matches
        [HttpPost]
        [Route("AddMatches")]
        public async Task<IActionResult> AddMatches(Match[] matches)
        {
            if (matches != null)
            {
                foreach (var match in matches)
                {
                    await hattrickDbContext.Match.AddAsync(match);
                }
            }
            await hattrickDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMatches), matches);
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

            return CreatedAtAction(nameof(GetMatches), match);
        }
    }
}
