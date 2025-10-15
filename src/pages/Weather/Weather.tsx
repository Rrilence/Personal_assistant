import { useActionState, useState} from "react"
import { ToastContainer } from "react-toastify";
import { notifyName, notifyWeatherCity } from "../../helpers/toasts";
import styles from './styles.module.css'
import type { InfoWeather } from "../../helpers/types";

import axios from "axios";

const initialState: InfoWeather = {
    data: {
        name: '',
        description: '',
        icon: '02d',
        temp: 0,
        hamidity: 0,
        windSpeed: 0,
    },
    error: null,
}

 const Weather = () => {

    const apiKey = import.meta.env.VITE_API_KEY_WEATHER;
    
    const [city, setCity] = useState('');
    const [state, submitAction, isPending] = useActionState(submitCity, initialState)

    async function submitCity (prevState: InfoWeather, formData: FormData): Promise<InfoWeather> {
        const nameCity = formData.get('city')

        try {
            // Реализация получения данных с сервера, используя FETCH
            // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&appid=${apiKey}&lang=ru`)
            // .then(res => res.json())
            // const weatherData = {
            //     name: res.name,
            //     description: res.weather[0].description,
            //     icon: res.weather[0].icon,
            //     temp: Math.round(res.main.temp),
            //     hamidity: res.main.humidity,
            //     windSpeed: res.wind.speed,
            // }   
            const res = await axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&appid=${apiKey}&lang=ru`)
             const weatherData = {
                    name: res.data.name,
                    description: res.data.weather[0].description,
                    icon: res.data.weather[0].icon,
                    temp: Math.round(res.data.main.temp),
                    hamidity: res.data.main.humidity,
                    windSpeed: res.data.wind.speed,
                }

            return {data: weatherData, error: null}
            
        } catch (e) {
            if (e instanceof Error) {
                console.error("Ошибка при получении данных");
                notifyWeatherCity();
            } else {
                console.error('Неизвестная ошибка');
            }
        }
        return prevState; 
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let name = event.target.value;
        const validation: RegExp = /^[А-Яа-яё\s]/ui;
            if (validation.test(name.trim())) {
           name = name[0].toUpperCase() + name.slice(1)
                setCity(name)
            }
            else {
                setCity('')
                notifyName()
            }
    }
        

    return (
        <div className="container">
            <ToastContainer/>
            <h1>Погода</h1>
            <form 
            className={styles.form}
            autoComplete="off"
            action={submitAction}>
                <label htmlFor="city">Введите название города:</label>
                <input
                className="input"
                type="text"
                name="city"
                id="city"
                value={city} 
                onChange={handleChange}
                />
                <button 
                    type="submit" 
                    className="button"
                    disabled={isPending || city === ''}>
                    {isPending ? 'Загрузка...' : 'Показать'}
                </button>
                {state.data && (
                    <div className={styles.wrapper}>
                        <img 
                        className={styles.img}
                        src={`https://openweathermap.org/img/wn/${state.data.icon}@2x.png`} alt=""/>
                        <p>{state.data.name}</p>
                        <p>Температура воздуха: {state.data.temp} °C</p>
                        <p>Влажность: {state.data.hamidity} %</p>
                        <p>Скорость ветра: {state.data.windSpeed} м/с</p>
                        <p>Описание: {state.data.description}</p>
                    </div>
                )
                }
                
                {state.error && <p style={{color: 'red'}}>{state.error}</p>}
            </form>
        </div>
    )
 }

 export default Weather