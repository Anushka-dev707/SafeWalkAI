// import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";

// export default function MapView({ route }) {
//   return (
//     <MapContainer center={[28.61, 77.20]} zoom={12} className="map">
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       {route.length > 0 && (
//         <Polyline positions={route.map(p => [p.lat, p.lon])} />
//       )}

//       {route.length > 0 && (
//         <>
//           <Marker position={[route[0].lat, route[0].lon]} />
//           <Marker position={[route[route.length - 1].lat, route[route.length - 1].lon]} />
//         </>
//       )}
//     </MapContainer>
//   );
// }
// import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";

// export default function MapView({ route }) {
//   return (
//     <div id="map-section">
//       <MapContainer center={[28.61, 77.20]} zoom={12} className="map">
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//         {route.length > 0 && (
//           <Polyline positions={route.map(p => [p.lat, p.lon])} />
//         )}

//         {route.length > 0 && (
//           <>
//             <Marker position={[route[0].lat, route[0].lon]} />
//             <Marker position={[route[route.length - 1].lat, route[route.length - 1].lon]} />
//           </>
//         )}
//       </MapContainer>
//     </div>
//   );
// }

// import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
// import { useEffect } from "react";
// import L from "leaflet";
// import "leaflet-polylinedecorator";


// // ✅ AUTO ZOOM TO ROUTE
// function FitBounds({ route }) {
//   const map = useMap();

//   useEffect(() => {
//     if (route.length > 0) {
//       const bounds = route.map(p => [p.lat, p.lon]);
//       map.fitBounds(bounds);
//     }
//   }, [route]);

//   return null;
// }


// // ✅ MAIN COMPONENT
// export default function MapView({ route }) {
//   return (
//     <div id="map-section">
//       <MapContainer
//         center={[28.61, 77.20]}
//         zoom={12}
//         className="map"
//         whenCreated={(map) => {
//           window.map = map; // store globally for decorator
//         }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//         {/* ROUTE LINE */}
//         {route.length > 0 && (
//           <Polyline
//             positions={route.map(p => [p.lat, p.lon])}
//             color="blue"
//           />
//         )}

//         {/* START + END MARKERS */}
//         {route.length > 0 && (
//           <>
//             <Marker position={[route[0].lat, route[0].lon]}>
//               <Popup>🚀 Start</Popup>
//             </Marker>

//             <Marker position={[route[route.length - 1].lat, route[route.length - 1].lon]}>
//               <Popup>🏁 Destination</Popup>
//             </Marker>
//           </>
//         )}

//         {/* AUTO ZOOM */}
//         <FitBounds route={route} />

//         {/* ARROWS */}
//         <ArrowDecorator route={route} />
//       </MapContainer>
//     </div>
//   );
// }


// // ✅ ARROW COMPONENT
// function ArrowDecorator({ route }) {
//   const map = useMap();

//   useEffect(() => {
//     if (route.length > 0) {
//       const latlngs = route.map(p => [p.lat, p.lon]);

//       const polyline = L.polyline(latlngs).addTo(map);

//       L.polylineDecorator(polyline, {
//   patterns: [
//     {
//       offset: '10%',
//       repeat: '120px',   // 🔥 more spacing (less arrows)
//       symbol: L.Symbol.arrowHead({
//         pixelSize: 6,    // 🔥 smaller arrows
//         pathOptions: {
//           color: "#1f7a63",
//           weight: 2
//         }
//       })
//     }
//   ]
// }).addTo(map);
//     }
//   }, [route, map]);

//   return null;
// }

import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-polylinedecorator";


// ✅ AUTO ZOOM TO ROUTE
function FitBounds({ route }) {
  const map = useMap();

  useEffect(() => {
    if (route.length > 0) {
      const bounds = route.map(p => [p.lat, p.lon]);
      map.fitBounds(bounds);
    }
  }, [route, map]);

  return null;
}


// ✅ ARROW COMPONENT (FIXED)
function ArrowDecorator({ route }) {
  const map = useMap();

  const polylineRef = useRef(null);
  const decoratorRef = useRef(null);

  useEffect(() => {
    if (!route || route.length === 0) return;

    const latlngs = route.map(p => [p.lat, p.lon]);

    // ❌ REMOVE OLD POLYLINE
    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
    }

    // ❌ REMOVE OLD ARROWS
    if (decoratorRef.current) {
      map.removeLayer(decoratorRef.current);
    }

    // ✅ CREATE NEW POLYLINE (ONLY FOR ARROWS)
    polylineRef.current = L.polyline(latlngs);

    // ✅ CREATE NEW ARROWS
    decoratorRef.current = L.polylineDecorator(polylineRef.current, {
      patterns: [
        {
          offset: '10%',
          repeat: '120px',
          symbol: L.Symbol.arrowHead({
            pixelSize: 6,
            pathOptions: {
              color: "#1f7a63",
              weight: 2
            }
          })
        }
      ]
    }).addTo(map);

  }, [route, map]);

  return null;
}


// ✅ MAIN COMPONENT
export default function MapView({ route }) {
  return (
    <div id="map-section">
      <MapContainer
        center={[28.61, 77.20]}
        zoom={12}
        className="map"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* ROUTE LINE */}
        {route.length > 0 && (
          <Polyline
            key={route.length}   // ✅ force re-render
            positions={route.map(p => [p.lat, p.lon])}
            color="blue"
          />
        )}

        {/* START + END MARKERS */}
        {route.length > 0 && (
          <>
            <Marker position={[route[0].lat, route[0].lon]}>
              <Popup>🚀 Start</Popup>
            </Marker>

            <Marker position={[route[route.length - 1].lat, route[route.length - 1].lon]}>
              <Popup>🏁 Destination</Popup>
            </Marker>
          </>
        )}

        {/* AUTO ZOOM */}
        <FitBounds route={route} />

        {/* ARROWS */}
        <ArrowDecorator route={route} />
      </MapContainer>
    </div>
  );
}