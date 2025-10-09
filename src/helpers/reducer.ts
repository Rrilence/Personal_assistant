import type { InitialState} from "./types"

export interface InfoReducer {
    type: string,
    payload: {
        cost: number
    },
}

export const reducer = (state: InitialState, {type, payload}: InfoReducer) => {

    switch (type) {
        case "Услуги ЖКХ":
        return {
            ...state,
            rentCost: state.rentCost + payload.cost,
        }
        case "Еда":
        return {
            ...state,
            eatCost: state.eatCost + payload.cost,
        }
        case "Транспорт":
        return {...state,
            transportCost: state.transportCost + payload.cost,
        }
        case "Одежда":
        return {
            ...state,
            clothCost: state.clothCost + payload.cost,
        }
        case "Развлечения":
        return {
            ...state,
            entertainmentCost: state.entertainmentCost + payload.cost,
        }
        default: 
        return state;
    }
}
