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
  ComposedChart,
  Area,
  Bar
} from "recharts";
// import PropTypes from 'prop-types';


export class App extends Component {
  
  state = {
    data: [],
    
  }
  
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get('http://backend/api/v1/data').then(
    res => this.setState(
      {data: res.data}
    )
      
    )
  
  };
  


  render() {
    // console.log(this.state.temp)
    return (
      <div className="App">
        <header>
          <h1>Weather Project Charts</h1>
        </header>
        <h2 style={{ textAlign: "left" }}>Line Chart</h2>
        <LineChart
          width={930}
          height={750}
          data={this.state.data}
          // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created" />
          <YAxis orientation="left" domain={[0, 40]}  />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
        </LineChart>
      </div>
    )
  }
}

export default App

