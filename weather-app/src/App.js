import './App.css';
import React, { useEffect, useState } from "react";
import Weather from "./Components/Weather";
import Forecast from "./Components/Forecast";
import { Oval } from "react-loader-spinner";

function App() {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);
    const [forecast, setForecast] = useState([]);


    useEffect( () => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function(position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setData(data)
                    console.log(data);
                });

            getForecast(lat, long)
                .then(data => {
                    setForecast(data);
                })

        }
         fetchData();
    }, [lat,long])

    function mapDataToWeatherInterface(data) {
        console.log(data);
        const mapped = {
            date: data.dt * 1000, // convert from seconds to milliseconds
            description: data.weather[0].main,
            temperature: Math.round(data.main.temp),
        };

        // Add extra properties for the five day forecast: dt_txt, icon, min, max
        if (data.dt_txt) {
            mapped.dt_txt = data.dt_txt;
        }
        return mapped;
    }

    function handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Please Enable your Location in your browser!");
        }
    }


    function getForecast(lat, long) {
        return fetch(
            `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        )
            .then(res => handleResponse(res))
            .then(forecastData => {
                if (Object.entries(forecastData).length) {
                    return forecastData.list
                        .filter(forecast => forecast.dt_txt.match(/15:00:00/))
                        .map(mapDataToWeatherInterface);
                }
            });
    }


  return (
    <div className="App">
        {(typeof data.main != 'undefined') ?
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
