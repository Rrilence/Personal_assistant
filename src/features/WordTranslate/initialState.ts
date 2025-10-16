import { generate } from "random-words";

interface Dictionary {
    [key: string]: string
}

const initialStorage = (): Dictionary => {
            const defaultWords = localStorage.getItem('words');
                if (defaultWords) { 
                    try {
                    const parseWords = JSON.parse(defaultWords)
                        if(parseWords && typeof parseWords === 'object' && Object.keys(parseWords).length > 0) {
                            return parseWords as Dictionary
                        } else {
                            return {}
                        }
                } catch (error) {
                    console.error("Ошибка при парсинге данных из localStorage:", error);
                    return {};
                }
            } else {
                console.log("LocalStorage expenses is null or undefined");
                return {} 
            }
        }
   const initStor = initialStorage();

   const initialState = () => {
        let newWord = generate()
        while (typeof newWord === 'string' && initStor[newWord]) {
            newWord = generate();
        } if(typeof newWord === 'string' && newWord.length > 0) {
            newWord = newWord[0].toUpperCase() + newWord.slice(1)
            return newWord
    } else return ''
   }

   const initial = initialState()

   export {initial, initStor, initialState, initialStorage}