import React, {Component} from 'react';
import CurrentWeather from "./CurrentWeather";
import WeeklyForecast from "./WeeklyForecast";
import HourlyGraph from "./HourlyGraph";

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
            current_forecast_data:{
                labels : [],
                datasets: [{}]
            },
            showed_temperature : -1000
        }
    }

    process_forecast_data = (list) => {
        let fc_data_by_day = {};
        // {
        //     labels : [],
        //         datasets: [{}]
        // }
        list.map(item => {
            let date_arr = item.dt_txt.split(" ");
            let date = date_arr[0];
            // Prepare data for line graph
            if (date in fc_data_by_day){
                let temp_obj = fc_data_by_day[date];
                // temp_obj.push(item.main.temp);
                let labels = temp_obj.labels;
                labels.push(item.dt_txt);
                let data = temp_obj.datasets[0].data;
                data.push(item.main.temp);
            }else{
                let obj = {
                            labels : [item.dt_txt],
                            datasets: [{
                                label: "Forecast Data",
                                colors: "rgba(245, 194, 66, 0.75)",
                                data: [item.main.temp]
                            }]
                    }
                // fc_data_by_day[date] = [item.main.temp];
                fc_data_by_day[date] = obj;
            }
        })

        // console.log("======= Printing Data by Day Lis =======");
        // console.log(fc_data_by_day)
    }

    async componentDidMount() {
        let lat = this.lat;
        let lon = this.lon;
        const weather = await (await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${this.appid}&units=metric`)).json()
        const weather_forecast = await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${this.appid}`)).json()

        console.log("======= Loging Current Weather =========");
        console.log(weather);
        console.log("======= Loging Forecast =========");
        console.log(weather_forecast);

        this.process_forecast_data(weather_forecast.list)

        this.setState({current_weather: weather.current,
                            daily_weather: weather.daily.slice(0,6),
                            forecast_weather: weather_forecast,
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

    get_day_name = (date, abbreviation=true) => {
        let full_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return abbreviation === false ? full_days[date.getDay()] : days[date.getDay()];
    }

    convert_unix_to_date = (unix_timestamp, abbreviation=true) => {
        let date = new Date(unix_timestamp * 1000);
        let full_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return abbreviation === false ? full_days[date.getDay()] : days[date.getDay()];
    }

    day_handle_click = () => {
        console.log("====== Day Clicked ======");
    }

    render() {
        const {current_weather, daily_weather, showed_temperature} = this.state;
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
                                onDayClick={this.day_handle_click}
                    />

                    <HourlyGraph />

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
