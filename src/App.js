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
            hourly_weather: [],
            showed_temperature : -1000
        }
    }


    async componentDidMount() {
        let lat = this.lat;
        let lon = this.lon;
        const weather = await (await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${this.appid}&units=metric`)).json()
        console.log("======= Loging Current Weather =========");
        console.log(weather);
        this.setState({current_weather: weather.current,
                            daily_weather: weather.daily,
                            hourly_weather: weather.hourly,
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
