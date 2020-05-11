import React, {Component} from 'react';
import {Line} from "react-chartjs-2";
import "./HourlyGraph.css";

function HourlyGraph(props){
    return(
        <div className="hourly_graph" style={{position: "relative", width:600, height: 300}}>
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
                data={props.current_data}
            />
        </div>
    );

}

export default HourlyGraph;