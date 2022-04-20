import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export const getWeatherIcon = ({ conditions, mainCondition}) => {
    const { icon } = conditions.find(({ condition }) => mainCondition === condition)
    return <FontAwesomeIcon icon={icon} />
}
