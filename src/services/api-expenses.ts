import axios from "axios";
import type { Info } from "../helpers/types";
import { notify } from "../helpers/toasts";

const apiUrl = import.meta.env.VITE_API_URL;

const getState = async (): Promise<Info[]> => {
    try {
        const response = await axios.get<Info[]>(`${apiUrl}/expenses`)
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке данных с сервера:', error);
        throw error;
    }
}

const addExpense = async (newExpense: Info): Promise<Info> => {
    try {
        const response = await axios.post<Info>(`${apiUrl}/expenses`, newExpense)
            if(response.status === 201) {
                notify();
                return response.data
            }
            else {
            throw new Error(`Ошибка при создании расхода: ${response.status}`);
        }
    } catch (error) {
        console.error('ошибка загрузки данных на сервер', error);
        throw error;
    }
}

const updateExpenseApi = async ({id, name, category, cost, data}: Info) => {
    try {
        await axios.put<Info>(`${apiUrl}/expenses/${id}`, {
            id: id,
            name: name,
            category: category,
            cost: cost,
            data: data
        })
    } catch (error) {
        console.error('ошибка загрузки данных на сервер', error);
    }
}

const deleteExpenseApi = async (id: string) => {
    try {
        await axios.delete<Info>(`${apiUrl}/expenses/${id}`)
    } catch (error) {
        console.error('ошибка загрузки данных на сервер', error);
    }
}



export {getState, addExpense, updateExpenseApi, deleteExpenseApi}