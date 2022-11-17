import { MatchDetails } from "./match-details.model";

export interface Ticket {
    
    ticketId: number;
    matches: MatchDetails[];
    oddsTotal: number;
    betAmount: number;
    winningAmount: number;

}