import React from "react";
import {
    List
} from "@material-ui/core";
import moment from 'moment';
import './styles.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WeatherIcon = styled.div`
  color: #ffffbf;
`;

export default function Forecast(props) {

        const {forecast} = props;

        const results = forecast.daily.map((item, index) => {

            let weatherIcon = null;

            function setIcon(conditions) {
                conditions.map(el => {
                    if (item.weather[0].main === el.condition) {
                        weatherIcon = <FontAwesomeIcon icon={el.icon} />;
                    }
                });
            }

            setIcon(props.conditions);

            if (index !== 0)//prevents repetition of current day data if it's earlier than 15:00
                return (
                    <div key={index} className="container">
                        <div className="forecast">
                            <div className="flex-forecast">
                                <p style={{width: 100}}>{moment(item.dt * 1000).format("dddd")}</p>

                                <WeatherIcon
                                    style={{fontSize: 25, marginTop: 4, paddingTop: 10}}>{weatherIcon}</WeatherIcon>

                                <p style={{width: 70}}>
                                    {Math.round(item.temp.max)} &deg;C
                                </p>
                            </div>
                        </div>
                    </div>
                )
        })

        return (
            <div>
                <List aria-label="forecast data">{results}</List>
            </div>
        );
}