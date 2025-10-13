import type { Info, InitialState, ExpensesContextType } from "../../helpers/types";

const defaultinitialState: ExpensesContextType = {
    rentCost: 0,
    eatCost: 0,
    transportCost: 0,
    clothCost: 0,
    entertainmentCost: 0,
}


export function getInitialState(): InitialState {
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
