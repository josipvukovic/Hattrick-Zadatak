using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hattrick.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Match",
                columns: table => new
                {
                    MatchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Competition = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HomeTeam = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AwayTeam = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HomeWin = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Draw = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AwayWin = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    HomeOrDraw = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AwayOrDraw = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    HomeOrAway = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MatchDateTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpecialOffer = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Match", x => x.MatchId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Match");
        }
    }
}
