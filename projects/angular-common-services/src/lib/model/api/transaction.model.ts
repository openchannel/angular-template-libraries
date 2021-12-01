export type TransactionType = 'payment' | 'refund';

export interface Transaction {
    transactionId: string;
    ownershipId: string;
    appId: string;
    developerId: string;
    userId: string;
    date: number;
    type: TransactionType;
    amount: number;
    customData?: any;
    feeAmount?: number;
    marketplaceAmount?: number;
    developerAmount?: number;
    receiptUrl?: string;
    invoiceUrl?: string;
}
