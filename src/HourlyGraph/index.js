import React, {Component} from 'react';
import {Line} from "react-chartjs-2";

class HourlyGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels : [],
                datasets: [
                    {
                    }
                ]
            }
        }
    }

    getChartData = canvas => {
        const data = this.state.data
        if(data.datasets){
            let colors = ["rgba(245, 194, 66, 0.75)"];
            data.labels = ["1", "2", "3", "4", "5"];
            data.datasets.forEach((set, i) => {
                set.label = "Videos Mades";
                set.data = [4,  5, 20, 10, 15, 3, 8];
                set.backgroundColor = colors[i];
                set.borderColor = "white";
                set.borderWidth = 2;
            })
        }
        return data;
    }

    render() {
        return(
            <div style={{position: "relative", width:600, height: 500}}>
                <h3>Chart Samples</h3>
                <Line
                    options={{
                        responsive: true,
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display:false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display:false
                                }
                            }]
                        }
                    }}
                    data={this.getChartData}
                />
            </div>
        );
    }


}

export default HourlyGraph;