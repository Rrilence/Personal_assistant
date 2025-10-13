import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getInitialState } from "./initialState";
import type { RootState } from "../../store";
import type { ExpensePayload } from "../../helpers/types";


const CategorySlice = createSlice({
    name: 'category',
    initialState: getInitialState(),
    reducers: {
        addCost: (state, action: PayloadAction<ExpensePayload>) => {
            switch (action.payload.category) {
                case 'Услуги ЖКХ':
                    state.rentCost += action.payload.cost;
                    break;
                case 'Еда':
                    state.eatCost += action.payload.cost;
                    break;
                case 'Транспорт':
                    state.transportCost += action.payload.cost;
                    break;
                case 'Одежда':
                    state.clothCost += action.payload.cost;
                    break;
                case 'Развлечения':
                    state.entertainmentCost += action.payload.cost;
                    break;
            }
        },
        removeCost: (state, action: PayloadAction<ExpensePayload>) => {
            switch (action.payload.category) {
                case 'Услуги ЖКХ':
                    state.rentCost -= action.payload.cost;
                    break;
                case 'Еда':
                    state.eatCost -= action.payload.cost;
                    break;
                case 'Транспорт':
                    state.transportCost -= action.payload.cost;
                    break;
                case 'Одежда':
                    state.clothCost -= action.payload.cost;
                    break;
                case 'Развлечения':
                    state.entertainmentCost -= action.payload.cost;
                    break;
            }
        }
    }
})

export const {addCost, removeCost} = CategorySlice.actions;
export const categoryReducer = CategorySlice.reducer;

export const rentCost = (state: RootState) => state.category.rentCost;
export const eatCost = (state: RootState) => state.category.eatCost;
export const transportCost = (state: RootState) => state.category.transportCost;
export const clothCost = (state: RootState) => state.category.clothCost;
export const entertainmentCost = (state: RootState) => state.category.entertainmentCost;