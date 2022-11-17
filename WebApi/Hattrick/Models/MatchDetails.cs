using System.ComponentModel.DataAnnotations;

namespace Hattrick.Models
{
    public class MatchDetails
    {
        [Key]
        public int TicketId{ get; set; }
        public int MatchId { get; set; }
        public string Competition { get; set; }
        public string HomeTeam { get; set; }
        public string AwayTeam { get; set; }
        public string Bet { get; set; }
        public decimal Odd { get; set; }
        public int SpecialOffer { get; set; }
        public string? MatchOutcome { get; set; }
    }
}
