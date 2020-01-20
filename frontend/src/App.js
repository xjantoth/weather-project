import React, {Component} from 'react'
import './App.css';
import axios from 'axios';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
    ComposedChart,
    ReferenceLine,
    ResponsiveContainer,
    AreaChart,
    Area,
    Bar
} from "recharts";
// import PropTypes from 'prop-types';


export class App extends Component {

    state = {
        data: []

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios.get('http://backend/api/v1/data').then(res => this.setState({data: res.data}))

    };


    render() { // console.log(this.state.temp)
        return (
            <div className="App">
                <header>
                    <h1>Weather Project Charts</h1>
                </header>

                <ResponsiveContainer minWidth={400}
                    minHeight={300}>
                    <LineChart data={
                            this.state.data
                        }
                        margin={
                            {
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }
                    }>

                        <XAxis dataKey="created"/>
                        <YAxis type="number"
                            domain={
                                [-40, 40]
                            }/>
                        <CartesianGrid strokeDasharray="1 1"/>
                        <Tooltip/>
                        <Legend/>
                        <Line dataKey="temperature" stroke="#8884d8" type="monotone"/>
                        <Line dataKey="humidity" stroke="#82ca9d" type="monotone"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default App
