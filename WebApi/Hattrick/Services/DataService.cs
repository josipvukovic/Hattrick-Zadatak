using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Net;
using Hattrick.Models;
using System;

namespace Hattrick.Data.Services
{
    public class Competition
    {
        public string competition { get; set; }
        public List<string> competitors { get; set; }
    }

    public class Root
    {
        public List<Competition> competitions { get; set; }
    }

    public interface IDataService
    {
        public Match[] GetData();
    }

    public class DataService : IDataService
    {

        public DataService() 
        {
        }

        public Match[] GetData()
        {
            List<Match> matches = new List<Match>();

            string link = Environment.CurrentDirectory + @"\\BettingData\\BettingData.json";

            WebRequest request = WebRequest.Create(link);
            WebResponse response = request.GetResponse();

            using (Stream dataStream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(dataStream);
                string responseFromServer = reader.ReadToEnd();

                Root root = JsonConvert.DeserializeObject<Root>(responseFromServer);

                Random r = new Random();

                foreach (Competition c in root.competitions)

                {
                    for (int i = 0; i < c.competitors.Count; i += 2)
                    {
                        Match match = new Match
                        {
                            HomeTeam = c.competitors[i],
                            AwayTeam = c.competitors[i + 1],
                            Competition = c.competition,
                            HomeWin = 0,
                            Draw = 0,
                            AwayWin = 0,
                            HomeOrDraw = 0,
                            HomeOrAway = 0,
                            AwayOrDraw = 0,
                            MatchDateTime = DateTime.Now.ToString(),
                            SpecialOffer = false,
                            MatchOutcome = "0"
                        };

                        match.HomeTeam = c.competitors[i];
                        match.AwayTeam = c.competitors[i + 1];
                        match.MatchOutcome = r.Next(0, 3).ToString();
                        match.HomeWin = (decimal)r.Next(111, 450) / 100;
                        match.Draw = (decimal)r.Next(111, 450) / 100;
                        match.AwayWin = (decimal)r.Next(111, 450) / 100;
                        match.HomeOrDraw = (decimal)r.Next(111, 450) / 100;
                        match.AwayOrDraw = (decimal)r.Next(111, 450) / 100;
                        match.HomeOrAway = (decimal)r.Next(111, 450) / 100;
                        match.SpecialOffer = r.Next(2) == 1;

                        matches.Add(match);
                    }
                }
            }
            return matches.ToArray();
        }
    }

}
