import { useEffect, useMemo, useState } from 'react';
import BackButton from '../BackButton.jsx';
import { getSamples } from '../../api/samples.api.js';
import RangeSelect from './RangeSelect.jsx';
import ChartsGrid from './ChartsGrid.jsx';
import WeatherCard from './WeatherCard.jsx';
import { fetchCurrentWeather } from '../../api/weather.api.js';

const TIME_RANGES = [
  { id: 'last-hour', label: 'Last hour' },
  { id: 'last-24h', label: 'Last 24 hours' },
  { id: 'last-30-days', label: 'Last 30 days' },
];
const DEFAULT_RANGE = TIME_RANGES[0].id;

export default function ViewData({ onBack, onGoToLocation, roomId, deviceId }) {
  const [range, setRange] = useState(DEFAULT_RANGE);
  const [samples, setSamples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState('');

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

  async function loadWeather() {
    setIsLoadingWeather(true);
    setWeatherError('');
    try {
      const data = await fetchCurrentWeather();
      setWeather({
        city: data.city,
        country: data.country,
        temperatureC: data.temperatureC,
        humidityPercent: data.humidityPercent,
        weatherCode: data.weatherCode,
        time: data.time,
      });
    } catch (err) {
      console.error('Failed to load weather:', err);
      if (err?.response?.status === 404) {
        const message = err?.response?.data?.message;
        if (message && message.toLowerCase().includes('not set')) {
          setWeather(null);
          setWeatherError('');
        } else {
          setWeather(null);
          setWeatherError(message || 'No matching location found.');
        }
      } else {
        setWeatherError('Failed to load current weather.');
      }
    } finally {
      setIsLoadingWeather(false);
    }
  }

  useEffect(() => {
    let isMounted = true;
    async function guardedLoad() {
      if (!isMounted) return;
      await loadWeather();
    }
    guardedLoad();
    return () => {
      isMounted = false;
    };
  }, []);

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
        <h1 className="text-2xl font-semibold text-slate-100">Measurements</h1>
        <BackButton onClick={onBack} />
      </div>
      <div className="grid grid-cols-1 gap-4 max-w-xl">
        <RangeSelect
          value={range}
          onChange={(e) => setRange(e.target.value)}
          options={TIME_RANGES}
        />
      </div>
      <WeatherCard
        weather={weather}
        isLoading={isLoadingWeather}
        error={weatherError}
        onRefresh={loadWeather}
        onGoToLocation={onGoToLocation}
      />
      {selectionMissing ? (
        <p className="text-slate-300">
          Select a room and device in the Dashboard first.
        </p>
      ) : null}
      {error ? <p className="text-red-300">{error}</p> : null}
      {isLoading ? (
        <p className="text-slate-300">Loading samples...</p>
      ) : chartData.length === 0 ? (
        <p className="text-slate-300">No samples for this range.</p>
      ) : (
        <ChartsGrid data={chartData} />
      )}
    </section>
  );
}
