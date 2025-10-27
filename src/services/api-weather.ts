import axios from "axios";
import type { InfoWeather } from "../helpers/types";
import { notifyGeolocation, notifyWeatherCity } from "../helpers/toasts";

const apiKey = import.meta.env.VITE_API_KEY_WEATHER;

export const defaultState: InfoWeather = {
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

export async function submitGeolocation(_prevState: InfoWeather, coordinates: {lat: number, lng: number}): Promise<InfoWeather> {
    const {lat, lng} = coordinates;
        try {
            const res =  await axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}&lang=ru`)
            const weatherData = {
                    name: res.data.name,
                    description: res.data.weather[0].description,
                    icon: res.data.weather[0].icon,
                    temp: Math.round(res.data.main.temp),
                    hamidity: res.data.main.humidity,
                    windSpeed: res.data.wind.speed,
                }
                return {data: weatherData, error: null}
        } catch (error) {
        console.error("Ошибка при получении данных геолокации", error);
        notifyGeolocation()
        }
    return { ...defaultState,
        error: 'Геолокация не определена'
    }
}

export async function submitCity (prevState: InfoWeather, formData: FormData): Promise<InfoWeather> {
    const nameCity = formData.get('city')
    if (!nameCity) {
        return { ...defaultState, error: 'Название города не может быть пустым' };
        }
    try {  
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
    return {
        data: prevState.data, 
        error: 'Город не найден'
    }
}