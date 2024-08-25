export interface StockQuotation {
    id?: number;
    stockID?: string;
    tradingBoard?: string;
    nameEn?: string;
    nameAr?: string;
    symbolEn?: string;
    symbolAr?: string;
    last?: number;
    tradingSessionID?: string;
}
