import * as Location from "expo-location";
import { useEffect, useState } from "react";
import axios from "axios";

const useGeofencing = (tripId: number) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    const trackLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 100,
        },
        async (loc) => {
          setLocation(loc);
          const { latitude, longitude } = loc.coords;

          try {
            await axios.post("http://127.0.0.1:8000/check_geofence", {
              trip_id: tripId,
              driver_lat: latitude,
              driver_long: longitude,
            });
          } catch (err) {
            console.error("Geofencing error:", err);
          }
        }
      );
    };

    trackLocation();
  }, [tripId]);

  return location;
};

export default useGeofencing;
