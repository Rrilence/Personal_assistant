import { configureStore } from "@reduxjs/toolkit";

import { categoryReducer } from "./features/Category/category-slice";


export const store = configureStore({
    reducer: {
        category: categoryReducer
    },
    devTools: true
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
