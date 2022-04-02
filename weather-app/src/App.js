import React, { useEffect, useState } from "react";
import Weather from "./Components/Weather";
import Forecast from "./Components/Forecast";
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

function App() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState([]);
    const [forecast, setForecast] = useState([]);

    useEffect( () => {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                });
            } else {
                console.log("Geolocation error");
            }

            if (lat !==  null && long !== null) {

                fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
                    .then(res => res.json())
                    .then(weather => {
                        setData(weather)
                    });

                getForecast(lat, long)
                    .then(forecast => {
                        setForecast(forecast)
                    })
            } else {
                console.log(`No geolocation response. latitude: ${lat}, longitude ${long}`);
            }

    }, [lat,long])

    function getForecast(lat, long) {
        return fetch(
            `${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        ).then(res => res.json());
    }

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

export default App;
