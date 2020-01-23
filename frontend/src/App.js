import React, {Component} from 'react'
import './App.css';
import axios from 'axios';
import dateFormat from 'dateformat';
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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import PropTypes from 'prop-types';
// https://github.com/Hacker0x01/react-datepicker


export class App extends Component {

    state = {
        data: [],
        startDate: new Date(),
        endDate: new Date()

    }

    componentDidMount() {
        this.fetchAllData();
    }

    onChangeStartDate = date => { 
        console.log("Start Date caming from datepicker: ", date)
        this.setState({startDate: date}, () => this.fetchRangeData());
        // console.log("Start Date after", this.state.startDate)
    };
    onChangeEndDate = date => { // console.log("End Date before", this.state.endDate);
        console.log("End Date caming from datepicker: ", date)
        this.setState({endDate: date}, () => this.fetchRangeData());
        // console.log("End Date after", this.state.endDate);
    };
    
    fetchAllData = () => {
        axios.get('http://backend/api/v1/data').then(res => this.setState({data: res.data}))
    };


    fetchRangeData = () => { // console.log(dateFormat(this.state.startDate, "yyyy-MM-dd'T'HH:mm:ss"))
        console.log(this.state.data);
        console.log("Start date: ", this.state.startDate);
        console.log("End date: ", this.state.endDate);
        axios.post(`http://backend/api/v1/data/select`, null, {
            params: {
                start: dateFormat(this.state.startDate, "yyyy-mm-dd'T'HH:MM:ss"),
                end: dateFormat(this.state.endDate, "yyyy-mm-dd'T'HH:MM:ss")
            }
        }).then(res => this.setState({data: res.data}))

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

                <DatePicker 
                    selected={this.state.startDate}
                    showTimeSelect
                    onChange={
                        event => this.onChangeStartDate(event)
                    }
                    
                    
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="yyyy MMMM d, HH:mm"
                    
                    />


                <DatePicker 
                    selected={this.state.endDate}
                    showTimeSelect
                    onChange={
                        event => this.onChangeEndDate(event)
                    }
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="yyyy MMMM d, HH:mm"
                    />
            </div>
        )
    }
}

export default App
