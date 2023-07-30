import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class DivWiseBarChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    const { data } = this.props;
    console.log("Data prop:", data);

    const colors = ['#159895', '#1A5F7A', '#002B5B']; // Array of colors for each bar
    return (
      <ResponsiveContainer width="55%" height={270}>
        <BarChart
          width={50}
          height={100}
          data={data}
          margin={{
            top: 10,
            right: 1,
            left: 10,
            bottom: -24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            // Custom content for the legend
            content={(props) => {
              const { payload } = props;
              return (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {/* {payload.map((entry, index) => (
                    // <li key={`item-${index}`} style={{ color: entry.color, marginRight: 10 }}>
                    //   {entry.value}
                    // </li>
                  ))} */}
                </ul>
              );
            }}
          />

          <Bar dataKey="value" barSize={30}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]}  label={{ position: 'top' }} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
