import { createContext, useReducer,type Dispatch, type ReactNode } from "react";
import { reducer } from "./reducer";
import type { Info, InitialState } from "../helpers/types";
import type { InfoReducer } from "./reducer";

export interface ContextProviderProps {
       children: ReactNode;
   }

export interface ExpensesContextType {
    rentCost: number;
    eatCost: number;
    transportCost: number;
    clothCost: number;
    entertainmentCost: number;
    dispatch: Dispatch<InfoReducer>;
}

const defaultinitialState: ExpensesContextType = {
    rentCost: 0,
    eatCost: 0,
    transportCost: 0,
    clothCost: 0,
    entertainmentCost: 0,
    dispatch: () => {}
}

export const ExpensesContext = createContext<ExpensesContextType>(defaultinitialState);

function getInitialState(): InitialState {
    const defaultExpenses = localStorage.getItem('expenses');

    if(defaultExpenses) {
        try {
            const parseData: Info[] = JSON.parse(defaultExpenses)
            if(Array.isArray(parseData) && parseData.length > 0) {
                const aggregatedState = parseData.reduce((acc: InitialState, item: Info) => {
                    const cost = Number(item.cost)
                    switch (item.category) {
                        case 'Услуги ЖКХ':
                            acc.rentCost += cost;
                            break;
                        case 'Еда':
                            acc.eatCost += cost;
                            break;
                        case 'Транспорт':
                            acc.transportCost += cost;
                            break;
                        case 'Одежда':
                            acc.clothCost += cost;
                            break;
                        case 'Развлечения':
                            acc.entertainmentCost += cost;
                            break;
                        default: 
                        console.warn("Неизвестная категория");
                    }
                    return acc;
                }, {...defaultinitialState})
                return aggregatedState;
            } else {
                console.log("LocalStorage expenses пустой массив");
                return defaultinitialState;  
            }
        } catch (error) {
            console.error("Ошибка при парсинге данных из localStorage:", error);
            return defaultinitialState;
        }
    } else {
        console.log("LocalStorage expenses is null or undefined")
        return defaultinitialState;
    }
}

export const ContextProvider = ({children}: ContextProviderProps) => {
    const [value, dispatch] = useReducer(reducer, getInitialState())
    
    return <ExpensesContext.Provider value={{...value, dispatch}}>
        {children}
    </ExpensesContext.Provider>
}