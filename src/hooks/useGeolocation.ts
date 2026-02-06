import { useState, useEffect, useCallback } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  });

  const getLocation = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocalização não suportada pelo navegador.",
      }));
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        loading: false,
        error: null,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      let errorMessage: string;

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage =
            "Permissão de localização negada. Busque uma cidade manualmente.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Localização indisponível. Tente novamente.";
          break;
        case error.TIMEOUT:
          errorMessage =
            "Tempo esgotado ao obter localização. Tente novamente.";
          break;
        default:
          errorMessage = "Erro desconhecido ao obter localização.";
      }

      setState({
        latitude: null,
        longitude: null,
        loading: false,
        error: errorMessage,
      });
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000, // Cache for 5 minutes
    });
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return { ...state, getLocation };
}
