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


export {notify, notifyName, notifyWeatherCity}