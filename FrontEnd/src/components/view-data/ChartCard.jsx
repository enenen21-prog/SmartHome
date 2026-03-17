import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const chartMargin = { top: 8, right: 12, left: 0, bottom: 8 };
const axisTickStyle = { fontSize: 10, fill: '#78716c' };

const SERIES = {
  temperature: { stroke: '#0f766e', fill: '#99f6e4' },
  humidity: { stroke: '#2563eb', fill: '#bfdbfe' },
  light: { stroke: '#f59e0b', fill: '#fde68a' },
  co2: { stroke: '#dc2626', fill: '#fecaca' },
};

export default function ChartCard({ title, dataKey, data }) {
  const colors = SERIES[dataKey] ?? { stroke: '#1c1917', fill: '#e7e5e4' };
  const gradientId = `grad-${dataKey}`;
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-stone-700">{title}</h2>
        <span className="text-xs text-stone-400">Last 24h</span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={chartMargin}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.fill} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors.fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 6" stroke="#e7e5e4" />
            <XAxis dataKey="time" tick={axisTickStyle} />
            <YAxis tick={axisTickStyle} />
            <Tooltip
              contentStyle={{
                borderRadius: '0.5rem',
                borderColor: '#e7e5e4',
                background: '#ffffff',
              }}
              labelStyle={{ color: '#44403c' }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors.stroke}
              fill={`url(#${gradientId})`}
              strokeWidth={2.5}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
