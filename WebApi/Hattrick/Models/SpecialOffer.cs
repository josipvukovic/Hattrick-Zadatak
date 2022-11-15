using System.ComponentModel.DataAnnotations;

namespace Hattrick.Models
{
    public class SpecialOffer
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
    }
}
