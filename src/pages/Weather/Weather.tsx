import { useActionState, useEffect, useState} from "react"
import { ToastContainer } from "react-toastify";
import styles from './styles.module.css'

import { defaultState, submitCity, submitGeolocation} from "../../services/api-weather"
import { regExpression} from "../../helpers/validation";

import { notifyName } from "../../helpers/toasts";
import { formatDateWeather } from "../../helpers/formatting";
import { useLocation } from "../../hooks/use-location";

import wind from '../../assets/wind.png'
import temp from '../../assets/temp.png'
import hamidity from '../../assets/hamidity.png'
import desc from '../../assets/description.jpg'


 const Weather = () => {
    
    const {lat, lng, locationError, available, enable} = useLocation();
    
    const [city, setCity] = useState('');

    const [geoState, submitGeoAction] = useActionState(submitGeolocation, defaultState)
    const [cityState, submitAction, isPending] = useActionState(submitCity, defaultState)
 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let name = event.target.value;
            if (regExpression.test(name.trim())) {
                name = name[0].toUpperCase() + name.slice(1)
                setCity(name)
            }
            else {
                setCity('')
                notifyName()
            }
        }  

    useEffect(() => {
        if(lat && lng) {
            submitGeoAction({lat, lng})      
        } else if(locationError) {
            console.error('Ошибка определения местоположения', locationError?.message);
        }
    }, [lat, lng, locationError])

    const currentState = cityState.data.name ? cityState : geoState

    return (
            <div className="container">
                <ToastContainer/>
                {!available && (
                    <div>Ваш браузер не поддерживает геолокацию</div>
                )}
                {!enable && (
                    <div>Геолокация отключена</div>
                )}
                <h1>Погода</h1>
                <form 
                className={styles.form}
                autoComplete="off"
                action={submitAction}>
                    <label 
                    className={styles.label}
                    htmlFor="city">Введите название города:</label>
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
                </form>
                    {currentState.data && (
                        <div className={styles.wrapper}>
                            <img 
                            className={styles.img}
                            src={`https://openweathermap.org/img/wn/${currentState.data.icon}@2x.png`} alt=""/>
                            <div className={styles.city}>{currentState.data.name} 
                                <div>{formatDateWeather(new Date())}</div>
                                </div>
                            <div className={styles.weather}>
                                <img src={temp} alt="temp" width={'26px'} /> 
                                <p>
                                Температура воздуха: {currentState.data.temp} °C
                                </p>
                            </div>
                            <div className={styles.weather}>
                                <img src={hamidity} alt="hamidity" width={'26px'} />
                                <p>Влажность: {currentState.data.hamidity} %</p> 
                            </div>
                            <div className={styles.weather}>
                                <img src={wind} alt="wind" width={'26px'} />
                                <p>Скорость ветра: {currentState.data.windSpeed} м/с</p>
                            </div>
                            <div className={styles.weather}>
                                <img src={desc} alt="description" width={'26px'} />
                                <p> Описание: {currentState.data.description}</p>
                            </div>
                        </div>
                    )}
                    {currentState.error && <p style={{color: 'red'}}>{currentState.error}</p>}
            </div>
    )
 }

 export default Weather