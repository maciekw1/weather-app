import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getWeatherIcon } from '../utils/getWeatherIcon';
import { getTemperatureDisplay } from '../utils/getTemperatureDisplay';

const WeatherIconWrapper = styled.div`
  color: #ffffbf;
  font-size: 30px;
  margin-top: 15px;
`;

export default function CardExampleCard({ weatherData, conditions }) {
    const refresh = () => {
        window.location.reload();
    }

    const { name: cityName } = weatherData;

    const {
        main: mainCondition,
        description: weatherDescription
    } = weatherData.weather[0];

    const {
        humidity,
        temp: temperature
    } = weatherData.main;

    const weatherIcon = getWeatherIcon({ conditions, mainCondition });

    return (
        <div>
            <div className="container">
                <div className="main">
                    <div className="top">
                        <p className="header">{cityName}</p>
                        <button
                            className="button"
                            onClick={refresh}
                        >
                            <FontAwesomeIcon
                                className="refresher"
                                icon={faArrowsRotate}
                            />
                        </button>
                    </div>
                    <div className="flex">
                        <p className="day">
                            {moment().format('dddd')}, <span>{moment().format('LL')}</span>
                        </p>
                        <div className="flex">
                            <WeatherIconWrapper>
                                {weatherIcon}
                            </WeatherIconWrapper>
                            <p className="description">
                                {weatherDescription}
                            </p>
                        </div>
                    </div>

                    <div className="flex">
                        <p className="temp">
                            Temperature: {getTemperatureDisplay(temperature)}
                        </p>
                        <p className="temp">
                            Humidity: {humidity} %
                        </p>
                    </div>

                    <div className="flex">
                        <p className="sunrise-sunset">
                            Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}
                        </p>
                        <p className="sunrise-sunset">
                            Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
