using System.Collections.Generic;

namespace Hattrick.Data
{
    public static class GlobalData
    {
        //Execute stored dbo.db_config procedure so we are sure database is configured and OPENROWSET is allowed to insert data
        public static string DbConfigurationQuery = "EXEC dbo.db_config;";

        //Clean the table and reinsert the data everytime the app is started so we have the latest tips which are stored inside \BettingData\Data.xlsx
        public static string InsertDataQuery = "TRUNCATE TABLE HattrickDb.dbo.Match " +
                                               "SET IDENTITY_INSERT HattrickDb.dbo.Match " +
                                               "ON INSERT INTO HattrickDb.dbo.Match(MatchId, Competition, HomeTeam ,AwayTeam, HomeWin, Draw, AwayWin, HomeOrDraw, AwayOrDraw, HomeOrAway, MatchDateTime, SpecialOffer, MatchOutcome) " +
                                               "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0;Database=" + Environment.CurrentDirectory + "\\BettingData\\Data.xlsx;HDR=YES', 'SELECT * FROM [DATA$]')";
        //Insert Special Offer data
        public static string InsertSpecialOffer = "TRUNCATE TABLE HattrickDb.dbo.SpecialOffer " +
                                                  "SET IDENTITY_INSERT HattrickDb.dbo.SpecialOffer ON " +
                                                  "INSERT INTO HattrickDb.dbo.SpecialOffer " +
                                                        "([MatchId], [Competition], [HomeTeam], [AwayTeam], [HomeWin], [Draw], [AwayWin], [HomeOrDraw], [AwayOrDraw], [HomeOrAway], [MatchDateTime]) " +
                                                  "SELECT " +
                                                        "[MatchId], [Competition], [HomeTeam], [AwayTeam], [HomeWin], [Draw], [AwayWin], [HomeOrDraw], [AwayOrDraw], [HomeOrAway], [MatchDateTime] " + 
                                                  "FROM " + 
                                                        "HattrickDb.dbo.Match " +
                                                  "WHERE " +
                                                        "SpecialOffer = 1" +
                                                  "UPDATE [HattrickDb].[dbo].[SpecialOffer] " +
                                                  "SET HomeWin += 0.1, Draw += 0.1, AwayWin += 0.1, HomeOrDraw += 0.1, AwayOrDraw += 0.1, HomeOrAway += 0.1";
    }
}
