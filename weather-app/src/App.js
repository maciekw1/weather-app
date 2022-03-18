import './App.css';
import React, { useEffect, useState } from "react";
import Weather from "./Components/Weather";
import Forecast from "./Components/Forecast";
import { Oval } from "react-loader-spinner";

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
                console.log(lat, long);
                fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
                    .then(res => res.json())
                    .then(weather => {
                        setData(weather)
                    });

                getForecast(lat, long)
                    .then(forecast => {
                        setForecast(forecast)

                        console.log(forecast.daily[0]);
                        console.log(forecast.daily[0].weather[0].main);
                        const a = forecast.daily.map(item => item.weather[0].main);
                        console.log([...a]);
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

  return (
    <div className="App">

        {(forecast.length !== 0) ?
            (<>
                <Weather weatherData={data}/>
                <Forecast forecast={forecast}/>
            </>) :
            (<div className="loader">
                <Oval color="#1597bb" height={80} width={80}/>
            </div>
        )}
    </div>
  );
}
export default App;
