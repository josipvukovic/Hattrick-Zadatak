using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hattrick.Migrations
{
    public partial class addticket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ticket",
                columns: table => new
                {
                    TicketId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OddsTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BetAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    WinningAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ticket", x => x.TicketId);
                });

            migrationBuilder.CreateTable(
                name: "MatchDetails",
                columns: table => new
                {
                    TicketId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchId = table.Column<int>(type: "int", nullable: false),
                    Competition = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HomeTeam = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AwayTeam = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Odd = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SpecialOffer = table.Column<int>(type: "int", nullable: false),
                    TicketId1 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchDetails", x => x.TicketId);
                    table.ForeignKey(
                        name: "FK_MatchDetails_Ticket_TicketId1",
                        column: x => x.TicketId1,
                        principalTable: "Ticket",
                        principalColumn: "TicketId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MatchDetails_TicketId1",
                table: "MatchDetails",
                column: "TicketId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MatchDetails");

            migrationBuilder.DropTable(
                name: "Ticket");
        }
    }
}
