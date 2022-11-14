using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hattrick.Models
{
    public class Ticket
    {
        [Key]
        public int TicketId{ get; set; }
        public ICollection<MatchDetails> Matches { get; set; }
        public decimal OddsTotal { get; set; }
        public decimal BetAmount { get; set; }
        public decimal WinningAmount { get; set; }

    }
}
