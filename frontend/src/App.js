import React, { Component } from 'react'
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
    ResponsiveContainer,
} from "recharts";
import moment from 'moment'
import { sortBy } from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import PropTypes from 'prop-types';
// https://github.com/Hacker0x01/react-datepicker

const styles = {
    chart: {
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
    },
    yAxis: {
        opacity: 0.7,
        fontSize: '1.4rem',
        fontWeight: '400',
    }
}

export class App extends Component {

    state = {
        data: [],
        startDate: new Date(),
        endDate: new Date(),
        special: []
    }

    componentDidMount() {
        this.fetchAllData();
        this.fetchDaysData();
    }

    onChangeStartDate = startDate => {
        console.log("Start Date caming from datepicker: ", startDate);
        this.setState({ startDate }, this.fetchRangeData);
    };

    onChangeEndDate = endDate => {
        console.log("End Date caming from datepicker: ", endDate);
        this.setState({ endDate }, this.fetchRangeData);
    };

    fetchAllData = () => {
        axios.get('http://backend/api/v1/data')
            .then(({ data }) => data)
            .then(data => sortBy(data, ['created']))
            .then(data => this.setState({ data }));
    };

    preProcess = data => {
        // parse dates and sort them by time
        // 'forEach' allows modification inplace 
        data.forEach(item => {
            item.data = item.data.map(d => ({ ...d, created: +Date.parse(`2020 ${d.created}`) }));
            item.data = sortBy(item.data, ['created']);
        })

        // sort final arrays by length
        return sortBy(data, item => item.data.length);

    };

    fetchDaysData = () => {
        axios.get('http://backend/api/v1/data/days')
            // un-pack data property
            .then(({ data }) => data)
            // pre-process it (sort by length, then by time)
            .then(data => this.preProcess(data))
            // rename them to 'special' and store in state
            .then(special => this.setState({ special }))
    };

    fetchRangeData = () => {
        console.log(this.state.data);
        console.log("Start date: ", this.state.startDate);
        console.log("End date: ", this.state.endDate);
        axios.post(`http://backend/api/v1/data/select`, null, {
            params: {
                start: moment(this.state.startDate).format("yyyy-mm-dd'T'HH:MM:ss"),
                end: moment(this.state.endDate).format("yyyy-mm-dd'T'HH:MM:ss")
            }
        }).then(({ data }) => this.setState({ data }))

    };

    getColor = () => '#' + (Math.random().toString(16) + "000000").substring(2, 8);

    render() { // console.log(this.state.temp)
        return (
            <div className="App">
                <header>
                    <h1>Weather Project Charts</h1>
                </header>

                <ResponsiveContainer minWidth={400}
                    minHeight={350}>
                    <LineChart
                        data={sortBy(this.state.data, ['created'])}
                        margin={styles.chart}
                    >
                        <XAxis dataKey="created" />
                        <YAxis type="number"
                            unit="°C"
                            domain={[-40, 40]}
                            style={styles.yAxis} />
                        <CartesianGrid strokeDasharray="1 1" />
                        <Tooltip />
                        <Legend />
                        <Line dataKey="temperature" stroke="#8884d8" type="monotone" />
                        <Line dataKey="humidity" stroke="#82ca9d" type="monotone" />
                    </LineChart>
                </ResponsiveContainer>

                <DatePicker
                    showTimeSelect
                    selected={this.state.startDate}
                    onChange={this.onChangeStartDate}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="yyyy MMMM d, HH:mm" />

                <DatePicker
                    showTimeSelect
                    selected={this.state.endDate}
                    onChange={this.onChangeEndDate}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="yyyy MMMM d, HH:mm" />

                <ResponsiveContainer
                    minWidth={400}
                    minHeight={350}>
                    <LineChart margin={styles.chart}>
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis
                            dataKey="created"
                            allowDuplicatedCategory={false}
                            connectNulls={false}
                            tickFormatter={(unixTime) => moment(unixTime).format('LTS')} />
                        <YAxis
                            dataKey="temperature"
                            type="number"
                            style={styles.yAxis}
                            unit="°C"
                            domain={[-40, 40]} />
                        <Tooltip />
                        <Legend />
                        {this.state.special.map(({ name, data }) => (
                            <Line
                                dataKey="temperature"
                                key={name}
                                data={data}
                                name={name}
                                stroke={this.getColor(name)} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default App
