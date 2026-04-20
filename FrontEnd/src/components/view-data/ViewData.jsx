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
  // Time range for the measurements chart.
  const [range, setRange] = useState(DEFAULT_RANGE);
  // Raw samples returned from the API.
  const [samples, setSamples] = useState([]);
  // Separate loading flags for sensor data and weather data.
  const [loading, setLoading] = useState({
    samples: false,
    weather: false,
  });
  // General sample error shown above the charts.
  const [error, setError] = useState('');
  // Current weather card data and its error state.
  const [weather, setWeather] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  useEffect(() => {
    // Reload sensor samples whenever the selected room, device, or time range changes.
    async function loadSamples() {
      if (!roomId || !deviceId) {
        setSamples([]);
        return;
      }
      setLoading((prev) => ({ ...prev, samples: true }));
      setError('');
      try {
        const data = await getSamples({ roomId, deviceId, range });
        setSamples(data);
      } catch (err) {
        console.error('Failed to load samples:', err);
        setError('Failed to load samples');
      } finally {
        setLoading((prev) => ({ ...prev, samples: false }));
      }
    }
    loadSamples();
  }, [roomId, deviceId, range]);

  async function loadWeather() {
    // Weather is independent from the selected device, so it can be fetched on its own.
    setLoading((prev) => ({ ...prev, weather: true }));
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
      setLoading((prev) => ({ ...prev, weather: false }));
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
    // Convert API samples into the flat structure expected by the chart cards.
    return samples.map((sample) => ({
      time: new Date(sample.timestampUtc).toLocaleString(),
      temperature: sample.temperature,
      humidity: sample.humidity,
      light: sample.light,
      co2: sample.co2,
    }));
  }, [samples]);

  // If either room or device is missing, there is nothing to plot yet.
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
        isLoading={loading.weather}
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
      {loading.samples ? (
        <p className="text-slate-300">Loading samples...</p>
      ) : chartData.length === 0 ? (
        <p className="text-slate-300">No samples for this range.</p>
      ) : (
        <ChartsGrid data={chartData} />
      )}
    </section>
  );
}
