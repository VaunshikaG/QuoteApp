import { isRejectedWithValue } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuoteApi } from "../service/service";
import { QuoteResponseData } from "../service/quoteModel";

const initialState: QuoteState = {
    quotes_list: [],
    status: "idle",
    error: null
}

interface QuoteState {
    quotes_list: QuoteResponseData[] | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

export const fetchQuote = createAsyncThunk(
    'api/getQuote',

    async (_, { rejectWithValue }) => {
        try {
            const data = await getQuoteApi();
            const parse_data: QuoteResponseData = JSON.parse(data);

            if (!parse_data) {
                return rejectWithValue('failed to parse data of api');
            }
            return parse_data;

        } catch (error: any) {
            return rejectWithValue(error.message || 'failed to parse');
        }
    }
)

const quoteSlice = createSlice({
    name: "quote",
    initialState: initialState,
    reducers: {
        deleteQuote: (state, action) => {
            state.status = 'succeeded';
            state.quotes_list = (state.quotes_list || []).filter(q => q.id !== action.payload);
        },
        clearAll: (state) => {
            state.status = 'succeeded';
            state.quotes_list = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchQuote.pending, (state) => {
                state.status = "loading";
                state.error = null;
                console.log('pending')
            })
            .addCase(fetchQuote.fulfilled, (state, action) => {
                state.status = "succeeded";
                // state.quotes_list = [action.payload];
                state.quotes_list?.push(action.payload);
                state.error = null;
                console.log('fulfilled')
                // console.log(state.quotes_list);

            })
            .addCase(fetchQuote.rejected, (state, action) => {
                state.error = (action.payload as string) || (action.error.message as string);
                state.status = "failed";
                console.log('rejected')
            });
    },
})

export const { deleteQuote, clearAll } = quoteSlice.actions;
export default quoteSlice.reducer;