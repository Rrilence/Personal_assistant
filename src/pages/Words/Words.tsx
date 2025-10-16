import { useEffect, useState} from 'react'
import { ToastContainer } from "react-toastify"
import styles from './styles.module.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { resetWord, selectDistionary, selectIsRu, selectWord, selectWordEn, selectWordTranslate } from '../../features/WordTranslate/wordTranslate-slice';
import { setWord, setIsRu, setWordTranslate, setDictionary} from '../../features/WordTranslate/wordTranslate-slice';
import { notifyWord, notifyWordTranslateMistake, notifyWordTranslateRight } from '../../helpers/toasts';
import WordsList from '../../components/WordsList/wordsList';

const apiKey = import.meta.env.VITE_API_KEY_DICTIONARY

 const Words = () => {
    
    const [isOpenInput, setIsOpenInput] = useState(false);
    const [isOpenDictionary, setIsOpenDictionary] = useState(false);

    const dispatch = useDispatch();
    const word = useSelector(selectWord);
    const wordEn = useSelector(selectWordEn);
    const isRu = useSelector(selectIsRu);
    const wordTranslate = useSelector(selectWordTranslate)
    const dictionary = useSelector(selectDistionary)

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

    const showTranslation = async (word: string) => {
        let translate = await getTranslation(word);
            translate = translate[0].toUpperCase() + translate.slice(1)
            dispatch(setWord(translate))
            dispatch(setIsRu(true))   
    }

    const showOriginal = () => {
        dispatch(setWord(wordEn));
        dispatch(setIsRu(false));
    }

    const validateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const translate = event.target.value;
        const validation: RegExp = /^[А-Яа-яё\s]/ui;
        if (validation.test(translate.trim())) {
                dispatch(setWordTranslate(translate))
            }
        else {
            notifyWord();
        }
    }

    const checkTranslation = async (e: React.FormEvent) => {
        e.preventDefault()
        const wordRu = await getTranslation(word);
        if(wordTranslate.trim().toLowerCase() === wordRu) {
            notifyWordTranslateRight()
            addWordDictioanry(word, wordRu)            
        }
        notifyWordTranslateMistake();
        dispatch(setWordTranslate(''))
    }

    const addWordDictioanry = (originalWord: string, translateWord: string) => {
        translateWord = translateWord[0].toUpperCase() + translateWord.slice(1)
        dispatch(setDictionary({[originalWord]: translateWord}));
        setIsOpenInput(false)
        dispatch(resetWord());
        dispatch(setIsRu(false));
    }

    useEffect(() => {
        try {
            localStorage.setItem('words', JSON.stringify(dictionary))  
            } catch (error) {
            console.error('ошибка загрузки данных в LocalStorage', error);
        }      
    }, [dictionary])

    return (
        <div className="container">
            <ToastContainer/>
            <h1>Слова (Words)</h1>
            <div className={styles.outputWindow}>
                <p className={styles.word}>{word}</p>
                {!isRu ? 
                <button 
                className={styles.button}
                onClick={() => showTranslation(word)}>Показать перевод</button>
                :
                <button 
                className={styles.button}
                onClick={showOriginal}>Показать оригинал</button>
                }
                <button 
                className={styles.button}
                disabled={!isRu}
                onClick={() => addWordDictioanry(wordEn, word)}>Добавить в словарь</button>
            </div>
            <div className={styles.buttons}>
                { !isOpenInput && (
                    <button 
                    className={styles.button}
                    onClick={() => setIsOpenInput(true)}
                    >Знаю</button>
                )}
                {isOpenInput && (
                    <form 
                    className={styles.additionalFunction}
                    autoComplete='off'
                    onSubmit={checkTranslation}>
                        <label htmlFor="translation">Введите перевод</label>
                        <input 
                        type="text"
                        id="translation" 
                        value={wordTranslate}
                        onChange={validateInput}
                        />
                        <button 
                        type='submit'
                        className={styles.button}
                        >Проверить</button>
                    </form>
                )}
                { !isOpenDictionary && 
                    <button 
                    className={styles.button}
                    onClick={() => setIsOpenDictionary(true)}
                    >Показать изученные слова</button>
                } 
                { isOpenDictionary && 
                    <div className={styles.showDictionary}>
                        <button 
                        className={styles.button}
                        onClick={() => setIsOpenDictionary(false)}
                        >Скрыть изученные слова</button>
                        <WordsList dictionary={dictionary}/>   
                    </div>
                }
            </div>

            
        </div>
    )
 }

 export default Words