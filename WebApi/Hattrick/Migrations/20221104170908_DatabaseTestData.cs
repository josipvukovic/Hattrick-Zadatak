using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hattrick.Migrations
{
    public partial class DatabaseTestData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //Create procedure which configures the database to allow data insert via OPENROWSET
            migrationBuilder.Sql(
            @"
               CREATE PROCEDURE dbo.db_config
               AS
                EXEC sp_configure 'show advanced option', 1;
                RECONFIGURE WITH OVERRIDE;
                EXEC sp_configure 'ad hoc distributed queries', 1;
                RECONFIGURE WITH OVERRIDE;
               GO");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
