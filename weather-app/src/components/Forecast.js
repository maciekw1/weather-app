import React from "react";
import { List } from "@material-ui/core";
import moment from 'moment';
import styled from 'styled-components';
import { getWeatherIcon } from '../utils/getWeatherIcon';
import { getTemperatureDisplay } from '../utils/getTemperatureDisplay';

const WeatherIconWrapper = styled.div`
  color: #ffffbf;
  font-size: 25px;
  margin-top: 4px;
  padding-top: 10px;
`;

const DayWrapper = styled.p`
    width: 100px;
`;

const TemperatureWrapper = styled.p`
    width: 70px;
`;

export default function Forecast({ forecast, conditions }) {
    const results = forecast.daily.map((item, index) => {
        const weatherIcon = getWeatherIcon({
            conditions,
            mainCondition: item.weather[0].main
        });

        if (index === 0 ) return null

        return (
            <div key={index}>
                <div className="forecast">
                    <div className="flex">
                        <DayWrapper>
                            {moment(item.dt * 1000).format("dddd")}
                        </DayWrapper>

                        <WeatherIconWrapper>
                            {weatherIcon}
                        </WeatherIconWrapper>

                        <TemperatureWrapper>
                            {getTemperatureDisplay(item.temp.max)}
                        </TemperatureWrapper>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <List aria-label="forecast data">
                <div className="container">
                    {results}
                </div>
            </List>
        </div>
    );
}
