namespace Hattrick.Data
{
    public static class GlobalData
    {
        //Execute stored dbo.db_config procedure so we are sure database is configured and OPENROWSET is allowed to insert data
        public static string DbConfigurationQuery = "EXEC dbo.db_config;";

        //Clean the table and reinsert the data everytime the app is started so we have the latest tips which are stored inside \BettingData\Data.xlsx
        public static string InsertDataQuery = "TRUNCATE TABLE HattrickDb.dbo.Match " +
                                               "SET IDENTITY_INSERT HattrickDb.dbo.Match " +
                                               "ON INSERT INTO HattrickDb.dbo.Match(MatchId, Competition, HomeTeam ,AwayTeam, HomeWin, Draw, AwayWin, HomeOrDraw, AwayOrDraw, HomeOrAway, MatchDateTime, SpecialOffer) " +
                                               "SELECT * FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0;Database=" + Environment.CurrentDirectory + "\\BettingData\\Data.xlsx;HDR=YES', 'SELECT * FROM [DATA$]')";
    }
}
