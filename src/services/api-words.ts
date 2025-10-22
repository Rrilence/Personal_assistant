import axios from 'axios';
import type { Dictionary } from '../helpers/types';
import { notifyAddWord } from '../helpers/toasts';

const apiKey = import.meta.env.VITE_API_KEY_DICTIONARY;
const apiUrl = import.meta.env.VITE_API_URL;

const getTranslation = async (word: string) => {
        try { const res = await axios
            .get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKey}&lang=en-ru&text=${word}`)
            const translate = res.data.def[0].tr[0].text;
            return translate   
        } catch (e) {
            if (e instanceof Error) {
                console.error("Ошибка при получении данных");
            } else {
                console.error('Неизвестная ошибка');
            }
        }
    }

const getDictionary = async (): Promise<Dictionary[]> => {
    try {
        const response = await axios.get<Dictionary[]>(`${apiUrl}/words`)
        return response.data
    } catch (error) {
        console.error('Ошибка при загрузке данных с сервера:', error);
        throw error;
    }
}

const addWord = async (newWord: Dictionary) => {
    try {
        const response = await axios.post(`${apiUrl}/words`, newWord)
        if(response.status === 201) {
                notifyAddWord();
                return response.data
            }
            else {
            throw new Error(`Ошибка при добавлении нового слова: ${response.status}`);
        }
    } catch (error) {
        console.error('ошибка загрузки данных на сервер', error);
        throw error;
    }
    }



export {getTranslation, getDictionary, addWord}