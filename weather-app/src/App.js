import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import {
    faBolt,
    faCloud,
    faCloudRain,
    faCloudShowersHeavy,
    faSmog,
    faSnowflake,
    faSun
} from "@fortawesome/free-solid-svg-icons";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import { getUserLocation } from './utils/getUserLocation';
import WeatherApi from './weatherApi';

const weatherApi = new WeatherApi();

export default function App() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState([]);
    const [forecast, setForecast] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            const { longitude, latitude } = await getUserLocation()

            setLat(latitude);
            setLong(longitude);

            if (lat ===  null || long === null) {
                console.log(`No geolocation response. latitude: ${lat}, longitude ${long}`);
                return
            }

            const weatherData = await weatherApi.getCurrentWeather(lat, long)
            setData(weatherData)

            const forecastData = await weatherApi.getWeatherForecast(lat, long)
            setForecast(forecastData)
        }

        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
            return
        }

        fetchData()
    }, [lat,long])

    const conditions = [
        {condition: 'Thunderstorm', icon: faBolt},
        {condition: 'Drizzle', icon: faCloudRain},
        {condition: 'Rain', icon: faCloudShowersHeavy},
        {condition: 'Snow', icon: faSnowflake},
        {condition: 'Atmosphere', icon: faSmog},
        {condition: 'Clear', icon: faSun},
        {condition: 'Clouds', icon: faCloud},
        {condition: 'Mist', icon: faCloud},
        {condition: 'Smoke', icon: faSmog}
    ];

  return (
    <div className="App">
        {(forecast.length !== 0) ?
            (<>
                <Weather weatherData={data} conditions={conditions}/>
                <Forecast forecast={forecast} conditions={conditions}/>
            </>) :
            (<div className="loader">
                <Oval color="#1597bb" height={80} width={80}/>
            </div>
        )}
    </div>
  );
}
