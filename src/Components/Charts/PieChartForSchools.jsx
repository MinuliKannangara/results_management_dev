import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer,Legend  } from 'recharts';

const COLORS = ['#613659', '#1F6E8C', '#E57F84', '#2F5061', '#0C2D48','#FAD02C'];


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieChartForSchool extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  render() {
    const { data } = this.props;

  

    return (
      <ResponsiveContainer width="100%" height="100%">
           <PieChart width={800} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
            animationBegin={200} // Delay animation start by 200 milliseconds
            animationDuration={1000} // Animation duration in milliseconds
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Legend
            align="right"
            verticalAlign="top"
            layout="vertical"
            wrapperStyle={{ top: 5, right: 3 }}
            fontSize={140}
           
          />
        </PieChart>

       
      </ResponsiveContainer>
    );
  }
}
