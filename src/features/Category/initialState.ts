import type { Info, InitialState, ExpensesContextType } from "../../helpers/types";
import { getState } from "../../services/api-expenses";

const defaultinitialState: ExpensesContextType = {
    rentCost: 0,
    eatCost: 0,
    transportCost: 0,
    clothCost: 0,
    entertainmentCost: 0,
}

export async function getInitialState(): Promise<InitialState> {
 
    const defaultExpenses = async () => {
        try { const data = await getState();
            if(Array.isArray(data) && data.length > 0) {
            const aggregatedState = data.reduce((acc: InitialState, item: Info) => {
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
            console.log("Expenses - пустой массив");
            return defaultinitialState;  
        }  
        } catch (error) {
            console.error('Ошибка при загрузке данных', error);
            return defaultinitialState; 
        }
    }
    return await defaultExpenses();
}
