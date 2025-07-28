import { configureStore } from "@reduxjs/toolkit";
import quoteSlice from "./quoteSlice";

export const store = configureStore({
    reducer: {
        quotes: quoteSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;