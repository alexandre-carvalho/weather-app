import { useState, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Cloud, Star } from 'lucide-react';
import {
  SearchBar,
  CurrentWeather,
  WeatherDetails,
  ForecastList,
  WeatherBackground,
  ThemeToggle,
  WeatherSkeleton,
  ForecastSkeleton,
  ErrorMessage,
  HourlyForecast,
  FavoritesList,
} from './components';
import { useGeolocation, useWeatherByCoordinates, useForecast, ThemeProvider, useFavorites } from './hooks';
import type { CitySearchResult } from './types/weather';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState<CitySearchResult | null>(null);
  const [useGeoLocation, setUseGeoLocation] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const { isFavorite, toggleFavorite, favorites, removeFavorite } = useFavorites();

  // Get user's geolocation
  const { latitude, longitude, loading: geoLoading, error: geoError, getLocation } = useGeolocation();

  // Determine coordinates to use
  const coords = selectedCity 
    ? { lat: selectedCity.lat, lon: selectedCity.lon }
    : { lat: latitude, lon: longitude };

  // Fetch weather data
  const { 
    data: weatherByCoords, 
    isLoading: weatherCoordsLoading, 
    error: weatherCoordsError 
  } = useWeatherByCoordinates({
    latitude: coords.lat,
    longitude: coords.lon,
    enabled: useGeoLocation && !selectedCity && coords.lat !== null,
  });

  const { 
    data: weatherByCity, 
    isLoading: weatherCityLoading, 
  } = useWeatherByCoordinates({
    latitude: selectedCity?.lat ?? null,
    longitude: selectedCity?.lon ?? null,
    enabled: selectedCity !== null,
  });

  // Fetch forecast data
  const { 
    data: forecast, 
    isLoading: forecastLoading 
  } = useForecast({
    latitude: selectedCity?.lat ?? coords.lat,
    longitude: selectedCity?.lon ?? coords.lon,
    enabled: (selectedCity !== null) || (coords.lat !== null),
  });

  const dailyForecast = forecast?.daily;
  const hourlyForecast = forecast?.hourly;

  // Current weather data
  const weather = selectedCity ? weatherByCity : weatherByCoords;
  const isLoading = geoLoading || weatherCoordsLoading || weatherCityLoading;
  const error = weatherCoordsError;

  // Helper to get current city object for favorites
  const getCurrentCity = useCallback((): CitySearchResult | null => {
    if (!weather || coords.lat === null || coords.lon === null) return null;
    return {
      name: weather.city,
      country: weather.country,
      lat: coords.lat,
      lon: coords.lon,
      state: '',
    };
  }, [weather, coords]);

  const currentCity = getCurrentCity();

  // Handle city selection from search
  const handleCitySelect = useCallback((city: CitySearchResult) => {
    setSelectedCity(city);
    setUseGeoLocation(false);
    setShowFavorites(false);
  }, []);

  // Handle returning to current location
  const handleUseCurrentLocation = useCallback(() => {
    setSelectedCity(null);
    setUseGeoLocation(true);
  }, []);

  const handleToggleFavorite = () => {
    if (currentCity) {
      toggleFavorite(currentCity);
    }
  };

  return (
    <WeatherBackground>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Cloud className="w-8 h-8 text-slate-700 dark:text-white" />
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white text-shadow">
              Weather App
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFavorites(true)}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-white"
              title="Favoritos"
            >
              <Star className="w-6 h-6" />
            </button>
            <ThemeToggle />
          </div>
        </header>

        <FavoritesList 
          isOpen={showFavorites}
          onClose={() => setShowFavorites(false)}
          favorites={favorites}
          onSelect={handleCitySelect}
          onRemove={removeFavorite}
        />

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onCitySelect={handleCitySelect}
            onUseCurrentLocation={handleUseCurrentLocation}
          />
        </div>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Loading State */}
          {isLoading && !weather && (
            <WeatherSkeleton />
          )}

          {/* Error State */}
          {!isLoading && geoError && !selectedCity && (
            <ErrorMessage 
              type="geolocation"
              message={geoError}
              onRetry={getLocation}
            />
          )}

          {!isLoading && error && (
            <ErrorMessage 
              type="api"
              message={error.message}
              onRetry={() => window.location.reload()}
            />
          )}

          {/* Weather Data */}
          {weather && (
            <>
              <CurrentWeather 
                weather={weather} 
                isFavorite={currentCity ? isFavorite(currentCity) : false}
                onToggleFavorite={handleToggleFavorite}
              />
              {hourlyForecast && hourlyForecast.length > 0 && (
                <HourlyForecast forecasts={hourlyForecast} />
              )}
              <WeatherDetails weather={weather} />
            </>
          )}

          {/* Forecast */}
          {forecastLoading && !dailyForecast && (
            <ForecastSkeleton />
          )}
          
          {dailyForecast && dailyForecast.length > 0 && (
            <ForecastList forecasts={dailyForecast} />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>Dados fornecidos por OpenWeatherMap</p>
        </footer>
      </div>
    </WeatherBackground>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WeatherApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
