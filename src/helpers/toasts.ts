import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const notify = () => {
        toast('Статья расходов добавлена', {
            position: "top-right",
            autoClose: 1000,
            closeOnClick: true,
            theme: "light",
        })
    }

const notifyName = () => {
        toast.warn('Введите название на русском языке', {
            toastId: '007',
            position: "top-right",
            autoClose: 1000,
            closeOnClick: true,
            theme: "light",
            })
        } 

const notifyWeatherCity = () => {
        toast.warn('Неизвестный город', {
            toastId: '007',
            position: "top-right",
            autoClose: 1000,
            closeOnClick: true,
            theme: "light",
            })
        } 

const notifyWord = () => {
        toast.warn('Введите перевод на русском языке', {
            toastId: '007',
            position: "top-right",
            autoClose: 1000,
            closeOnClick: true,
            theme: "light",
            })
        } 

const notifyWordTranslateRight = () => {
        toast.success('Браво! Отличные знания! Слово добавлено в словарь', {
            toastId: '007',
            position: "top-right",
            autoClose: 1000,
            closeOnClick: true,
            theme: "light",
            })
        } 

const notifyWordTranslateMistake = () => {
        toast.success('Увы, ответ неправильный', {
            toastId: '007',
            position: "top-right",
            autoClose: 1000,
            closeOnClick: true,
            theme: "light",
            })
        } 

export {notify, notifyName, notifyWeatherCity, notifyWord, notifyWordTranslateMistake, notifyWordTranslateRight }