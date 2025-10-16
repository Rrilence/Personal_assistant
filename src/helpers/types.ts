export type Info = {
    id?: string,
    name?: string,
    category: string,
    cost: string,
    data: string,
 }

export interface InitialState {
    rentCost: number;
    eatCost: number;
    transportCost: number;
    clothCost: number;
    entertainmentCost: number;
}

export interface ExpensesContextType {
    rentCost: number;
    eatCost: number;
    transportCost: number;
    clothCost: number;
    entertainmentCost: number;
}

export interface ExpensePayload {
    category: string,
    cost: number;
}

export interface WordsState {
  word: string;
  wordEn: string;
  isRu: boolean;
  wordTranslate: string,
  dictionary: {
    [key: string]: string
  }
}

export interface InfoWeather {
    data: {
        id?: number,
        name: string,
        description: string,
        icon: string,
        temp: number,
        hamidity: number,
        windSpeed: number,
    },
    error: null | string
}

export interface Dictionary {
    [key: string]: string;
}