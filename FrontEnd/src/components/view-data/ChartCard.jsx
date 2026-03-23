import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const chartMargin = { top: 10, right: 16, left: -6, bottom: 6 };
const axisTickStyle = { fontSize: 10, fill: '#9aa4b2' };
const gridStyle = { stroke: '#1f2937', strokeOpacity: 0.5 };
const tooltipStyle = {
  borderRadius: '0.5rem',
  borderColor: 'rgba(148,163,184,0.2)',
  background: 'rgba(9,12,19,0.95)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
  fontSize: '0.75rem',
};
const tooltipLabelStyle = { color: '#e2e8f0', fontSize: '0.75rem' };
const tooltipItemStyle = { color: '#cbd5f5', fontSize: '0.75rem' };

const SERIES = {
  temperature: { stroke: '#0f766e', fill: '#99f6e4' },
  humidity: { stroke: '#2563eb', fill: '#bfdbfe' },
  light: { stroke: '#f59e0b', fill: '#fde68a' },
  co2: { stroke: '#dc2626', fill: '#fecaca' },
};

const UNITS = {
  temperature: '\u00B0C',
  humidity: '%',
  light: 'lux',
  co2: 'ppm',
};

export default function ChartCard({ title, dataKey, data }) {
  const colors = SERIES[dataKey] ?? { stroke: '#94a3b8', fill: '#64748b' };
  const gradientId = `grad-${dataKey}`;
  const unit = UNITS[dataKey] ?? '';
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1220] p-4 shadow-[0_20px_40px_rgba(10,15,25,0.45)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
          {unit ? (
            <span className="text-xs text-slate-400">({unit})</span>
          ) : null}
        </div>
        <span className="text-xs text-slate-400">Last 24h</span>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={chartMargin}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.fill} stopOpacity={0.55} />
                <stop offset="95%" stopColor={colors.fill} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke={gridStyle.stroke}
              strokeOpacity={gridStyle.strokeOpacity}
            />
            <XAxis
              dataKey="time"
              tick={axisTickStyle}
              tickLine={false}
              axisLine={{ stroke: '#1f2a37' }}
            />
            <YAxis
              tick={axisTickStyle}
              tickLine={false}
              axisLine={{ stroke: '#1f2a37' }}
              width={44}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={tooltipItemStyle}
              cursor={{ stroke: '#334155', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={colors.stroke}
              fill={`url(#${gradientId})`}
              strokeWidth={1.75}
              dot={false}
              activeDot={{ r: 3.5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
