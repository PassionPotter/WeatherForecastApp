import React, {Component} from 'react';
import "./WeeklyForecast.css";

class WeeklyForecast extends Component {

    render() {
        const items = this.props.daily_weather;
        const listItems = items.map(item =>
        {
            return (
                <div key={item.dt} className="col-md-1">
                    <div className="row">
                        <div className="fc-day col-md-12"> {this.props.convert_unix_to_date(item.dt)} </div>
                        <div className="col-md-12"> <img  src={ this.props.icon_address + item.weather[0].icon + ".png"} alt={item.weather[0].description} /> </div>
                        <div className="fc-temp-font col-md-12"> <span className="fc-display" style={{paddingRight: '5px'}}> {parseFloat(item.temp.max).toFixed(0)} </span> <span className="fc-display" > {parseFloat(item.temp.min).toFixed(0)} </span> </div>
                    </div>
                </div>

            );
        });
        return (
            <div className="row">
                {listItems}
            </div>
        );
    }
}

export default WeeklyForecast;