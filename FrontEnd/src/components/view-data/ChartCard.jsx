import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const chartMargin = { top: 8, right: 12, left: 0, bottom: 8 };
const axisTickStyle = { fontSize: 10 };

export default function ChartCard({ title, dataKey, data }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-stone-700">{title}</h2>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
            <XAxis dataKey="time" tick={axisTickStyle} />
            <YAxis tick={axisTickStyle} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#1c1917"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
