import { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const radian = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * radian);
  const y = cy + radius * Math.sin(-midAngle * radian);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class UserPercentage extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  constructor(props) {
    super(props);
  }

  render() {
    const { userCount, memberCount } = this.props;

    const data = [
      { name: 'Group A', value: userCount },
      { name: 'Group B', value: memberCount },
    ];

    return (
      <ResponsiveContainer width="100%" height={400}>
        <h1 className='text-center text-3xl font-bold'>All users info</h1>
        <p className='text-lg font-medium opacity-80 text-[#0088FE]'>Total User = {userCount}</p>
        <p className='text-lg font-medium opacity-80 text-[#00C49F]'>Total Member = {memberCount}</p>
        <div className='flex gap-2 mt-2 font-medium'>
            <div className='p-1 bg-[#0088FE]'></div>
            <div>User</div>
            <div className='p-1 bg-[#00C49F]'></div>
            <div>Member</div>
        </div>
        <PieChart className='-mt-10'>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
UserPercentage.propTypes = {
    userCount: PropTypes.number.isRequired,
    memberCount: PropTypes.number.isRequired,
  };