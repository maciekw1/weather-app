export default class WeatherApi {
    apiUrl = process.env.REACT_APP_API_URL
    apiKey = process.env.REACT_APP_API_KEY

    getApiURL({ endpoint }) {
        return this.apiUrl + endpoint
    }

    async getCurrentWeather(lat, long) {
        const url = this.getApiURL({
            endpoint: `/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${this.apiKey}`
        })

        const weatherData = await fetch(url)

        return await weatherData.json()
    }

    async getWeatherForecast(lat, long) {
        const url = this.getApiURL({
            endpoint: `/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,&units=metric&APPID=${this.apiKey}`
        })

        const forecastData = await fetch(url)

        return await forecastData.json()
    }
}