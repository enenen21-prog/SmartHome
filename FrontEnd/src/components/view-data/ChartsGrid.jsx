import ChartCard from './ChartCard.jsx';

const CHARTS = [
  { title: 'Temperature', key: 'temperature' },
  { title: 'Humidity', key: 'humidity' },
  { title: 'Light', key: 'light' },
  { title: 'CO2', key: 'co2' },
];

export default function ChartsGrid({ data }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {CHARTS.map(({ title, key }) => (
        <ChartCard key={key} title={title} dataKey={key} data={data} />
      ))}
    </div>
  );
}
