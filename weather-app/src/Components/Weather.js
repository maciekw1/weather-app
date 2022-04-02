import React from 'react';
import './styles.css';
import moment from 'moment';
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WeatherIcon = styled.div`
      color: #ffffbf;
    `;

const CardExampleCard = ({weatherData, conditions}) => {

    const refresh = () => {
        window.location.reload();
    }

    let weatherIcon = null;

    function setIcon(conditions, weatherData) {
        conditions.map(item => {
            if (weatherData.weather[0].main === item.condition) {
                  weatherIcon = <FontAwesomeIcon icon={item.icon} />;
            }
        });
    }

    setIcon(conditions, weatherData);

    return (
        <div>
            <div className="container">
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
                        <p className="temp">Temprature: {Math.round(weatherData.main.temp)} &deg;C</p>
                        <p className="temp">Humidity: {weatherData.main.humidity} %</p>
                    </div>

                    <div className="flex">
                        <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                        <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardExampleCard;