import { useEffect } from "react";
import L from "leaflet";

const Map = () => {
  useEffect(() => {
    // Initialize map centered on London
    const map = L.map("map").setView([51.47957, -3.17707], 13);
    

    // Add OpenStreetMap tile layer
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ],
    {
        color: "blue",
        fillColor: "#3388ff",
        fillOpacity: 0.4,
    }
    ).addTo(map);

    // Add a popup to the polygon
    polygon.bindPopup("I am a polygon area.");

    // Cleanup when component unmounts
    return () => map.remove();
  }, []);

  return (
    <div
      id="map"
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
    />
  );
};

export default Map;
