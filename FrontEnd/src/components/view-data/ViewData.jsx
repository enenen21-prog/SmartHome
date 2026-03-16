import { useEffect, useMemo, useState } from 'react';
import BackButton from '../BackButton.jsx';
import { getSamples } from '../../api/samples.api.js';
import RangeSelect from './RangeSelect.jsx';
import ChartsGrid from './ChartsGrid.jsx';

const TIME_RANGES = [
  { id: 'last-hour', label: 'Last hour' },
  { id: 'last-24h', label: 'Last 24 hours' },
  { id: 'last-30-days', label: 'Last 30 days' },
];
const DEFAULT_RANGE = TIME_RANGES[0].id;

export default function ViewData({ onBack, roomId, deviceId }) {
  const [range, setRange] = useState(DEFAULT_RANGE);
  const [samples, setSamples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSamples() {
      if (!roomId || !deviceId) {
        setSamples([]);
        return;
      }
      setIsLoading(true);
      setError('');
      try {
        const data = await getSamples({ roomId, deviceId, range });
        setSamples(data);
      } catch (err) {
        console.error('Failed to load samples:', err);
        setError('Failed to load samples');
      } finally {
        setIsLoading(false);
      }
    }
    loadSamples();
  }, [roomId, deviceId, range]);

  const chartData = useMemo(() => {
    return samples.map((sample) => ({
      time: new Date(sample.timestampUtc).toLocaleString(),
      temperature: sample.temperature,
      humidity: sample.humidity,
      light: sample.light,
      co2: sample.co2,
    }));
  }, [samples]);

  const selectionMissing = !roomId || !deviceId;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-stone-700">Measurements</h1>
        <BackButton onClick={onBack} />
      </div>
      <div className="grid grid-cols-1 gap-4 max-w-xl">
        <RangeSelect
          value={range}
          onChange={(e) => setRange(e.target.value)}
          options={TIME_RANGES}
        />
      </div>
      {selectionMissing ? (
        <p className="text-stone-600">
          Select a room and device in the Dashboard first.
        </p>
      ) : null}
      {error ? <p className="text-red-600">{error}</p> : null}
      {isLoading ? (
        <p className="text-stone-600">Loading samples...</p>
      ) : chartData.length === 0 ? (
        <p className="text-stone-600">No samples for this range.</p>
      ) : (
        <ChartsGrid data={chartData} />
      )}
    </section>
  );
}
