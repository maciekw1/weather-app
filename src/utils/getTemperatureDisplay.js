export const getTemperatureDisplay = (temperature, unit = 'metric') => {
  if (unit === 'metric') {
    return `${Math.round(temperature)}°C`;
  } else {
    return `${Math.round(temperature * 9 / 5 + 32)}°F`;
  }
};
