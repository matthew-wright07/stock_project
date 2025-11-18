import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function Chart({data,dataKeys,labelValues}){

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
        return (
        <div className="bg-white p-2 rounded text-primary text-sm">
        <p>{payload[0].value}</p>
        </div>
        );
        }
    return null;
    };
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart  data={data}>
                <XAxis
                dataKey={dataKeys[0]}
                stroke="#ffffff" // axis line color
                tick={{ fill: '#ffffff' }} // tick label color
                label={{
                    value: labelValues[0],
                    offset: -5,
                    position: 'insideBottom',
                    fill: '#ffffff', // axis label color
                }}
                />
                <YAxis
                stroke="#ffffff"
                tick={{ fill: '#ffffff' }}
                label={{
                    value: labelValues[1],
                    angle: -90,
                    offset: 5,
                    position: 'insideLeft',
                    fill: '#ffffff',
                }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar type="monotone" dataKey={dataKeys[1]} fill="#16C8C7" />
            </BarChart >
        </ResponsiveContainer>
    )
}