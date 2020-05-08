import React, {Component} from 'react';
import "./CurrentWeather.css"

class CurrentWeather extends Component {

    convert_ms_to_kmh = value => (
        parseFloat(value) * 3.6
    )

    capitalize_first_letter = value => (
        value[0].toUpperCase() + value.slice(1)
    )


    render() {
        const current_weather = this.props.current_weather;
        console.log("====== In Current Weather Component ========")
        console.log(current_weather);
        return (
            <div className="row">
                <div className="col-md-4">
                    <h2>{this.props.city_name}</h2>
                    <h5>{this.props.convert_unix_to_date(current_weather.dt, false)}</h5>
                    <h5>{ this.capitalize_first_letter(current_weather.weather[0].description) }</h5>
                    <img src={ this.props.icon_address + current_weather.weather[0].icon + "@2x.png"} alt={current_weather.weather[0].description} />
                    <div className="row">
                        <div className="col-md-3">
                            <h1 className="cw-temp">{ parseFloat(this.props.showed_temperature).toFixed(0) }</h1>
                        </div>
                        <div className="col-md-9">
                                    <span>
                                        <a href="#" onClick={this.props.show_in_celsius} > &#176;C </a>
                                        |
                                        <a href="#" onClick={this.props.show_in_fahrenheit} > &#176;F </a>
                                    </span>
                        </div>
                    </div>


                </div>
                <div className="col-md-8">
                    <h2>&nbsp;</h2>
                    <h5>Humidity: {current_weather.humidity} %  </h5>
                    <h5>Wind: { this.convert_ms_to_kmh(current_weather.wind_speed).toFixed(0) } km/h </h5>
                </div>
            </div>
        );
    }
}

export default CurrentWeather;