import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const notify = () => {
    toast('Статья расходов добавлена', {
        toastId: '001',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
}

const notifyName = () => {
    toast.warn('Введите название на русском языке', {
        toastId: '002',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyWeatherCity = () => {
    toast.error('Неизвестный город', {
        toastId: '003',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyWord = () => {
    toast.warn('Введите перевод на русском языке', {
        toastId: '004',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
}

const notifyAddWord = () => {
    toast('Слово добавлено в словарь', {
        toastId: '004',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyWordTranslateRight = () => {
    toast.success('Браво! Отличные знания! Слово добавлено в словарь', {
        toastId: '005',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyWordTranslateMistake = () => {
    toast.error('Увы, ответ неправильный', {
        toastId: '006',
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        theme: "light",
    })
} 

const notifyErrorExpenses = () => {
    toast.error('Извините, произошла ошибка при загрузке данных', {
        toastId: '006',
        position: "top-right",
        autoClose: 1000,
        closeOnClick: true,
        theme: "light",
    })
}

export {notify, notifyName, notifyWeatherCity, notifyWord, notifyWordTranslateMistake, notifyWordTranslateRight, notifyErrorExpenses, notifyAddWord }