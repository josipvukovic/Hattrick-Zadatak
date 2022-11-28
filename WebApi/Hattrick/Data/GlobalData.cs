using System.Collections.Generic;

namespace Hattrick.Data
{
    public static class GlobalData
    {
        //Clean the match table before data reinsert
        public static string DbConfigurationQuery = "TRUNCATE TABLE HattrickDb.dbo.Match ";
    }
}
