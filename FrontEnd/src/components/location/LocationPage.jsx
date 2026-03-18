import { useEffect, useState } from 'react';
import Button from '../Button.jsx';
import LocationInput from './LocationInput.jsx';
import { fetchLocation, saveLocation } from '../../api/location.api.js';

const DEFAULT_LOCATION = {
  city: '',
  country: '',
};

export default function LocationPage() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadLocation() {
      setIsLoading(true);
      setError('');
      try {
        const data = await fetchLocation();
        if (isMounted) {
          setLocation({
            city: data.city ?? '',
            country: data.country ?? '',
          });
        }
      } catch (err) {
        if (err?.response?.status !== 404) {
          console.error('Failed to load location:', err);
          if (isMounted) setError('Failed to load location.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadLocation();
    return () => {
      isMounted = false;
    };
  }, []);

  function handleChange(field, value) {
    setSaved(false);
    setLocation((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setError('');
    try {
      const data = await saveLocation(location);
      setLocation({
        city: data.city ?? location.city,
        country: data.country ?? location.country,
      });
      setSaved(true);
    } catch (err) {
      console.error('Failed to save location:', err);
      setError('Failed to save location.');
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">Location</h1>
        <p className="mt-4 text-sm text-slate-400">
          Choose your city and country. We will use this later to fetch current
          temperature and humidity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-2xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <LocationInput
            label="City"
            placeholder="Winnipeg"
            value={location.city}
            onChange={(e) => handleChange('city', e.target.value)}
            maxLength={48}
          />
          <LocationInput
            label="Country"
            placeholder="Canada"
            value={location.country}
            onChange={(e) => handleChange('country', e.target.value)}
            maxLength={48}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" onClick={handleSave}>
            Save Location
          </Button>
          {saved ? (
            <span className="text-sm text-emerald-300">
              Location saved in database.
            </span>
          ) : null}
          {isLoading ? (
            <span className="text-sm text-slate-400">Loading...</span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
