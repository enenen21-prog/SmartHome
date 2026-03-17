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
const axisTickStyle = { fontSize: 10, fill: '#94a3b8' };

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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
        <span className="text-xs text-slate-400">Last 24h</span>
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
            <CartesianGrid strokeDasharray="3 6" stroke="#1f2937" />
            <XAxis dataKey="time" tick={axisTickStyle} />
            <YAxis tick={axisTickStyle} />
            <Tooltip
              contentStyle={{
                borderRadius: '0.5rem',
                borderColor: 'rgba(148,163,184,0.35)',
                background: 'rgba(15,23,42,0.95)',
              }}
              labelStyle={{ color: '#e2e8f0' }}
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
