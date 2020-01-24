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
import moment from 'moment'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import PropTypes from 'prop-types';
// https://github.com/Hacker0x01/react-datepicker


export class App extends Component {

    state = {
        data: [],
        startDate: new Date(),
        endDate: new Date(),
        special: []


    }

    componentDidMount() {
        this.fetchAllData();
    }

    onChangeStartDate = date => {
        console.log("Start Date caming from datepicker: ", date)
        this.setState({
            startDate: date
        }, () => this.fetchRangeData());
        // console.log("Start Date after", this.state.startDate)
    };
    onChangeEndDate = date => { // console.log("End Date before", this.state.endDate);
        console.log("End Date caming from datepicker: ", date)
        this.setState({
            endDate: date
        }, () => this.fetchRangeData());
        // console.log("End Date after", this.state.endDate);
    };

    fetchAllData = () => {
        axios.get('http://127.0.0.1:5000/api/v1/data').then(res => this.setState({data: res.data}))
        axios.get('http://127.0.0.1:5000/api/v1/data/days').then(res => this.setState({special: res.data}))
    };


    fetchRangeData = () => { // console.log(dateFormat(this.state.startDate, "yyyy-MM-dd'T'HH:mm:ss"))
        console.log(this.state.data);
        console.log("Start date: ", this.state.startDate);
        console.log("End date: ", this.state.endDate);
        axios.post(`http://127.0.0.1:5000/api/v1/data/select`, null, {
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

                <DatePicker selected={
                        this.state.startDate
                    }
                    showTimeSelect
                    onChange={
                        event => this.onChangeStartDate(event)
                    }


                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="yyyy MMMM d, HH:mm"/>


                <DatePicker selected={
                        this.state.endDate
                    }
                    showTimeSelect
                    onChange={
                        event => this.onChangeEndDate(event)
                    }
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="yyyy MMMM d, HH:mm"/>


                <ResponsiveContainer minWidth={400}
                    minHeight={300}>
                    <LineChart 
                    margin={
                        {
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }
                }
                    >
                        <CartesianGrid strokeDasharray="1 1"/>
                        <XAxis dataKey="created"
                            // type="time"
                            allowDuplicatedCategory={false} 
                            connectNulls={false} 
                            tickFormatter = {(unixTime) => {
                                console.log(unixTime)
                                return moment(unixTime).format('LTS')
                            }}/>
                        <YAxis dataKey="temperature" type="number"
                            domain={
                                [-40, 40]
                            }/>
                        <Tooltip/>
                        <Legend/> {
                        this.state.special
                            // sort by length
                            .sort((a, b) => a.length > b.length ? 1 : -1)
                            .map(s => (
                            <Line dataKey="temperature"
                                data={
                                    s.data
                                        .map(d => ({ ...d, created: +Date.parse(`2020 ${d.created}`)}))
                                        // sort by time
                                        .sort((a, b) => a.created > b.created ? 1 : -1)
                                }
                                name={
                                    s.name
                                }
                                stroke={
                                    {
                                        '0': 'red',
                                        '1': 'blue',
                                        '2': 'green',
                                        '3': 'yellow',
                                        '4': 'orange',
                                        '5': 'black',
                                        '6': 'cyan'
                                    }[s.name.substring('4')] || 'red'
                                }
                                key={
                                    s.name
                                }/>
                        ))
                    } </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default App
