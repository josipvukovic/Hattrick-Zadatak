using System.ComponentModel.DataAnnotations;

namespace Hattrick.Models
{
    public class Transactions
    {
        [Key]
        public int TransactionId { get; set; }
        public DateTime DateTime{ get; set; }
        public string Transaction { get; set; }
        public decimal? ToAccount { get; set; }
        public decimal? FromAccount { get; set; }
        public decimal AvailableAmount { get; set; }
    }
}
