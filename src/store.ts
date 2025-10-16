import { configureStore } from "@reduxjs/toolkit";

import { categoryReducer } from "./features/Category/category-slice";
import { wordReducer } from "./features/WordTranslate/wordTranslate-slice";


export const store = configureStore({
    reducer: {
        category: categoryReducer,
        word: wordReducer
    },
    devTools: true
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
