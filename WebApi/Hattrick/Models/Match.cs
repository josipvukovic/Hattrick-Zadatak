using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hattrick.Models
{
    public class Match
    {
        [Key]
        public int MatchId { get; set; }
        public string Competition { get; set; }
        public string HomeTeam { get; set; }
        public string AwayTeam { get; set; }
        public decimal? HomeWin { get; set; }
        public decimal? Draw { get; set; }
        public decimal? AwayWin { get; set; }
        public decimal? HomeOrDraw { get; set; }
        public decimal? AwayOrDraw { get; set; }
        public decimal? HomeOrAway { get; set; }
        public string MatchDateTime { get; set; }
        public bool SpecialOffer { get; set; }
        public string MatchOutcome { get; set; }
    }
}
