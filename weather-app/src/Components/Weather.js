import React from 'react';
import './styles.css';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
import {
    faCloud,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
    faSmog,
    faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WeatherIcon = styled.div`
      color: whitesmoke;
    `;


const CardExampleCard = ({weatherData}) => {

    const refresh = () => {
        window.location.reload();
    }

    let weatherIcon = null;

    if (weatherData.weather[0].main === 'Thunderstorm') {
        weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (weatherData.weather[0].main === 'Drizzle') {
        weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (weatherData.weather[0].main === 'Rain') {
        weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (weatherData.weather[0].main === 'Snow') {
        weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (weatherData.weather[0].main === 'Clear') {
        weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (weatherData.weather[0].main === 'Clouds') {
        weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
        weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }



    return (
        <div>
            <div className="main">
                <div className="top">
                    <p className="header">{weatherData.name}</p>
                    <button className="button" onClick={refresh}><FontAwesomeIcon className="refresher" icon={faArrowsRotate} /></button>
                </div>
                <div className="flex">
                    <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
                    <div className="flex">
                        <WeatherIcon style={{fontSize:30,marginTop:15}}>{weatherIcon}</WeatherIcon>
                        <p className="description">{weatherData.weather[0].description}</p>
                    </div>
                </div>

                <div className="flex">
                    <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>
                    <p className="temp">Humidity: {weatherData.main.humidity} %</p>
                </div>

                <div className="flex">
                    <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                    <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                </div>

            </div>
        </div>
    )
}

export default CardExampleCard;