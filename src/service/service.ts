import { QuoteResponseData } from "./quoteModel";

export const getQuoteApi = async (): Promise<string> => {
    const url = 'https://dummyjson.com/quotes/random'

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        }
    }

    try {
        const response = await fetch(url, options);
        // const data = await response.json();
        const data = await response.text();
        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch quote');
    }
}