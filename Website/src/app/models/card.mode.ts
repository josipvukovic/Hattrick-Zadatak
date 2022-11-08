export interface Match{
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeWin: number;
    draw: number;
    awayWin: number;
    homeorDraw: number;
    awayOrDraw: number;
    homeOrAway: number;
    matchDateTime: Date;
}