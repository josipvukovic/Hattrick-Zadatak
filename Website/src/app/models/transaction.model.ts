export interface Transaction {
    transactionId: number;
    dateTime: Date;
    transaction: string;
    toAccount: number;
    fromAccount: number;
    availableAmount: number;
}