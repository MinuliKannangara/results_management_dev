import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Label  } from 'recharts';


class CustomizedLabel extends PureComponent {
   
  render() {
    const { x, y, stroke, value } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    );
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const { x, y, stroke, payload } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  }
}

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/line-chart-with-customized-label-hs5b7';

 
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />}>
            <Label value="Year" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis tickFormatter={(value) => `${value}%`}>
            <Label value="Percentage Marks" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Range_0_19" stroke="#e76f51" label={<CustomizedLabel />} />
          <Line type="monotone" dataKey="Range_20_39" stroke="#99582a" />
          <Line type="monotone" dataKey="Range_40_59" stroke="#457b9d" />
          <Line type="monotone" dataKey="Range_60_79" stroke="#f77f00" />
          <Line type="monotone" dataKey="Range_80_100" stroke="#3a86ff" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
