// Example.jsx
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    const { data } = this.props;
    const customYAxisTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Custom Y-axis ticks from 10% to 100%
    return (
      <ResponsiveContainer width="100%" height="100%" margin={{ top: 30, right: 50, left: 30, bottom: 20 }}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 50,
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis ticks={customYAxisTicks} domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Percentage" stroke="#8338ec" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
