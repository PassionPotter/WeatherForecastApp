import React, {Component} from 'react';
import CurrentWeather from "./CurrentWeather";
import WeeklyForecast from "./WeeklyForecast";

class App extends Component {

    constructor(props) {
        super(props);
        this.appid = "Your Open Weather Map API Key";
        this.icon_address = "http://openweathermap.org/img/wn/"
        this.city_name = 'Gilgit'
        this.lat = '35.9221'
        this.lon = '74.308701'
        this.state = {
            current_weather: {},
            daily_weather: [],
            forecast_weather: {},
            sorted_forecast_data: {},
            forecast_dates: [],
            current_forecast_data:{
                labels : [],
                datasets: [{}]
            },
            showed_temperature : -1000
        }
    }

    process_forecast_data = (list) => {
        let fc_data_by_date = {};
        let fc_dates = [];
        list.map(item => {
            let date_arr = item.dt_txt.split(" ");
            let date = date_arr[0];
            // Prepare data for line graph
            if (date in fc_data_by_date){
                let temp_obj = fc_data_by_date[date];
                let labels = temp_obj.labels;
                labels.push(item.dt_txt);
                let data = temp_obj.datasets[0].data;
                data.push(item.main.temp);
            }else{
                let obj = {
                            labels : [item.dt_txt],
                            datasets: [{
                                label: "Forecast",
                                colors: "rgba(245, 194, 66, 0.75)",
                                backgroundColor: "rgba(245, 194, 66, 0.75)",
                                data: [item.main.temp]
                            }]
                    }
                fc_data_by_date[date] = obj;
                fc_dates.push(date)
            }
        })

        return {fc_data_by_date: fc_data_by_date, fc_dates: fc_dates};
    }

    async componentDidMount() {
        let lat = this.lat;
        let lon = this.lon;
        const weather = await (await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${this.appid}&units=metric`)).json()
        const weather_forecast = await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.appid}`)).json()

        let processed_data = this.process_forecast_data(weather_forecast.list)

        this.setState({current_weather: weather.current,
                            daily_weather: weather.daily.slice(0,6),
                            forecast_weather: weather_forecast,
                            sorted_forecast_data:processed_data.fc_data_by_date,
                            forecast_dates: processed_data.fc_dates,
                            showed_temperature: weather.current.temp});
    }

    convert_temperature = (conversion_request) => {
        const {current_weather} = this.state;
        const celsius = current_weather.temp;
        return  conversion_request === 'f' ? celsius * 9 / 5 + 32 : celsius;
    }

    show_in_celsius = () => {
        let celsius = this.convert_temperature('c');
        this.setState({showed_temperature: celsius});
    }

    show_in_fahrenheit = () => {
        let fahrenheit = this.convert_temperature('f');
        this.setState({showed_temperature: fahrenheit});
    }

    convert_unix_to_date = (unix_timestamp, abbreviation=true) => {
        let date = new Date(unix_timestamp * 1000);
        let full_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return abbreviation === false ? full_days[date.getDay()] : days[date.getDay()];
    }

    render() {
        const {current_weather,
            daily_weather,
            showed_temperature,
            forecast_dates,
            sorted_forecast_data} = this.state;

        if(current_weather.temp) {
            return (
                <div className="container">
                    <CurrentWeather city_name={this.city_name}
                                    convert_unix_to_date={this.convert_unix_to_date}
                                    current_weather={current_weather}
                                    showed_temperature={showed_temperature}
                                    show_in_celsius={this.show_in_celsius}
                                    show_in_fahrenheit={this.show_in_fahrenheit}
                                    icon_address={this.icon_address}
                    />

                    <WeeklyForecast daily_weather={daily_weather}
                                    icon_address={this.icon_address}
                                    convert_unix_to_date={this.convert_unix_to_date}
                                    forecast_dates={forecast_dates}
                                    sorted_forecast_data={sorted_forecast_data}
                    />

                </div>

            );
        }else{
            return(
                <div>
                </div>
            );
        }

    }
}

export default App;
