export type Info = {
    id: string,
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

export interface InfoWeather {
    data: {
        name: string,
        description: string,
        icon: string,
        temp: number,
        hamidity: number,
        windSpeed: number,
    },
    error: null | string
}

export interface WordsState {
  word: string;
  wordEn: string;
  isRu: boolean;
  wordTranslate: string,
  dictionary: Dictionary[],
}

export interface Dictionary {
    id?: string,
    original: string,
    translate: string,
}

export interface ErrorBoundaryState {
    hasError: boolean,
    error: Error | null,
    errorInfo: React.ErrorInfo | null  
}

export interface ErrorBoundaryProps {
    children: React.ReactNode
}