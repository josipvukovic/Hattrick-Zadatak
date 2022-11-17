export interface MatchOutcome {

    matchId: number;
    competition: string;
    homeTeam: string;
    awayTeam: string;
    homeWin: number;
    draw: number;
    awayWin: number;
    homeOrDraw: number;
    awayOrDraw: number;
    homeOrAway: number;
    matchDateTime: string;
    specialOffer: boolean;
    matchOutcome: string;
    
}