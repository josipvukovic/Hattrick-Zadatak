import { MatchDetails } from "./match-details.model";

export interface Ticket{
    matches: MatchDetails[];
    oddsTotal: number;
    betAmount: number;
    winningAmount: number;

}