using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hattrick.Migrations
{
    public partial class addtransactions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    TransactionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Transaction = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ToAccount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FromAccount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AvailableAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.TransactionId);
                });

            migrationBuilder.Sql(
            @"
                   INSERT INTO 
                    HattrickDb.dbo.Transactions 
                   VALUES
                    (GETDATE(), 'INITIAL-DEPOSIT', 100, 0, 100) 
               ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");
        }
    }
}
