import './App.css';
import React, { useEffect, useState } from "react";
import Weather from "./Components/Weather";
import { Oval } from "react-loader-spinner";

function App() {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function(position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(result => {
                    setData(result)
                    console.log(result);
                });
        }
         fetchData();
    }, [lat,long])

  return (
    <div className="App">
        {(typeof data.main != 'undefined') ?
            (<Weather weatherData={data}/>) :
            (<div className="loader">
                <Oval color="#1597bb" height={80} width={80}/>
            </div>
        )}
    </div>
  );
}
export default App;
