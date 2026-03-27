// import { useState } from "react";

// export default function RoutePlanner({ setRoute }) {
//   const [startLat, setStartLat] = useState("");
//   const [startLon, setStartLon] = useState("");
//   const [endLat, setEndLat] = useState("");
//   const [endLon, setEndLon] = useState("");

//   const handleRoute = () => {
//     const dummy = [
//       { lat: parseFloat(startLat), lon: parseFloat(startLon) },
//       { lat: 28.55, lon: 77.17 },
//       { lat: 28.57, lon: 77.18 },
//       { lat: parseFloat(endLat), lon: parseFloat(endLon) }
//     ];
//     setRoute(dummy);
//   };

//   return (
//     <div className="planner">
//       <h2>Plan Your Route</h2>

//       <input placeholder="Start Latitude" onChange={(e) => setStartLat(e.target.value)} />
//       <input placeholder="Start Longitude" onChange={(e) => setStartLon(e.target.value)} />
//       <input placeholder="End Latitude" onChange={(e) => setEndLat(e.target.value)} />
//       <input placeholder="End Longitude" onChange={(e) => setEndLon(e.target.value)} />

//       <button onClick={handleRoute}>Find Safest Route</button>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios"; // ✅ ADD THIS

export default function RoutePlanner({ setRoute }) {
  const [startLat, setStartLat] = useState("");
  const [startLon, setStartLon] = useState("");
  const [endLat, setEndLat] = useState("");
  const [endLon, setEndLon] = useState("");

  const handleRoute = async () => {
    try {
      const res = await axios.get("http://localhost:8000/route", {
        params: {
          start_lat: parseFloat(startLat),
          start_lon: parseFloat(startLon),
          end_lat: parseFloat(endLat),
          end_lon: parseFloat(endLon),
        },
      });

      // ✅ Use safest route from backend
      setRoute(res.data.safest_route);

    } catch (err) {
      console.error(err);
      alert("Backend not working!");

      // 🔁 fallback (optional but good)
      const dummy = [
        { lat: parseFloat(startLat), lon: parseFloat(startLon) },
        { lat: 28.55, lon: 77.17 },
        { lat: 28.57, lon: 77.18 },
        { lat: parseFloat(endLat), lon: parseFloat(endLon) }
      ];
      setRoute(dummy);
    }
  };

  return (
    <div className="planner">
      <h2>Plan Your Route</h2>

      <input
        placeholder="Start Latitude"
        onChange={(e) => setStartLat(e.target.value)}
      />
      <input
        placeholder="Start Longitude"
        onChange={(e) => setStartLon(e.target.value)}
      />
      <input
        placeholder="End Latitude"
        onChange={(e) => setEndLat(e.target.value)}
      />
      <input
        placeholder="End Longitude"
        onChange={(e) => setEndLon(e.target.value)}
      />

      <button onClick={handleRoute}>
        Find Safest Route
      </button>
    </div>
  );
}