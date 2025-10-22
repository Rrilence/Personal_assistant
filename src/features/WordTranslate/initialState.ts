import { generate } from "random-words";
import type { Dictionary } from "../../helpers/types";
import { getDictionary } from "../../services/api-words";


const getState = async (): Promise<Dictionary[]> => {
    const defaultWords = async () => {
        try {
            const data = await getDictionary();
            if(Array.isArray(data) && data.length > 0) {
                return data
            } return []
        } catch (error) {
            console.error('Ошибка при загрузке данных', error);
            return []
        }
    }
    return await defaultWords();
}
   const initStor = await getState();

   const initialState = () => {
        let newWord = generate()
        while (typeof newWord === 'string' && initStor.find(item => item.original === newWord)) {
            newWord = generate();
        } if(typeof newWord === 'string' && newWord.length > 0) {
            newWord = newWord[0].toUpperCase() + newWord.slice(1)
            return newWord
    } else return ''
   }

   const initial = initialState()

   export {initial, initStor, initialState, getState}