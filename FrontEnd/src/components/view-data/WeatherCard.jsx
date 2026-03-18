const WEATHER_CODES = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Rain showers',
  81: 'Heavy showers',
  82: 'Violent showers',
  85: 'Snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail',
};

function formatWeatherTime(value) {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString();
}

export default function WeatherCard({
  weather,
  isLoading,
  error,
  onRefresh,
  onGoToLocation,
}) {
  const title = weather
    ? `${weather.city}, ${weather.country}`
    : 'Current Weather';
  const description =
    weather && weather.weatherCode !== null && weather.weatherCode !== undefined
      ? WEATHER_CODES[weather.weatherCode] ?? `Code ${weather.weatherCode}`
      : '—';
  const timeLabel = weather?.time ? formatWeatherTime(weather.time) : '';

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.25)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {timeLabel ? (
            <span className="text-xs text-slate-400">Updated: {timeLabel}</span>
          ) : null}
          <button
            type="button"
            className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-xs text-slate-100 hover:bg-white/20"
            onClick={() => onRefresh?.()}
            disabled={isLoading}
          >
            Refresh
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="mt-4 text-sm text-slate-300">Loading weather...</p>
      ) : error ? (
        <p className="mt-4 text-sm text-red-300">{error}</p>
      ) : weather ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-400">Temperature</p>
            <p className="text-2xl font-semibold text-slate-100">
              {weather.temperatureC ?? '—'}
              <span className="text-base font-medium text-slate-300">&deg;C</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Humidity</p>
            <p className="text-2xl font-semibold text-slate-100">
              {weather.humidityPercent ?? '—'}
              <span className="text-base font-medium text-slate-300">%</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-300">
            Set your home location to see weather.
          </p>
          <button
            type="button"
            className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-sm text-slate-100 hover:bg-white/20"
            onClick={() => onGoToLocation?.()}
          >
            Set location
          </button>
        </div>
      )}
    </div>
  );
}
