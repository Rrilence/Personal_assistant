import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState }  from "../../store";
import {initial, initialState, initStor} from "./initialState";
import type { WordsState } from "../../helpers/types";

const initState: WordsState = {
    word: initial,
    isRu: false,
    wordEn: initial,
    wordTranslate: '',
    dictionary: initStor,
}

const WordTranslateSlice = createSlice({
    name: 'wordTranslate',
    initialState: initState,
    reducers: {
        setWord: (state, action: PayloadAction<string>) => {
            state.word = action.payload
        },
        setIsRu: (state, action: PayloadAction<boolean>) => {
            state.isRu = action.payload
        },
        setWordTranslate: (state, action: PayloadAction<string>) => {
            state.wordTranslate = action.payload
        },
        setDictionary: (state, action: PayloadAction<{original: string, translate: string}>) => {
            state.dictionary = [...state.dictionary, action.payload] 
        },
        resetWord: (state) => {
            state.word = initialState();
            state.wordEn = state.word;
        },
}
})

export const {setWord, setIsRu, setWordTranslate, setDictionary, resetWord} = WordTranslateSlice.actions;
export const wordReducer = WordTranslateSlice.reducer;

export const selectWord = (state: RootState) => state.word.word;
export const selectWordEn = (state: RootState) => state.word.wordEn;
export const selectIsRu = (state: RootState) => state.word.isRu;
export const selectWordTranslate = (state: RootState) => state.word.wordTranslate;
export const selectDistionary = (state: RootState) => state.word.dictionary