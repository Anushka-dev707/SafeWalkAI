// export default function Features() {
//   const data = [
//    {
//     title: "AI Safety Scoring",
//     desc: "Machine learning model analyzes multiple safety factors.",
//     icon: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
//   },
//   {
//     title: "Street Lighting Data",
//     desc: "Real-time lighting conditions.",
//     icon: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
//   },
//   {
//     title: "Crowd Analysis",
//     desc: "Analyzes crowd density.",
//     icon: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
//   },
//   {
//     title: "Nearby Safe Points",
//     desc: "Finds nearby safe places.",
//     icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png"
//   },
//   {
//     title: "Emergency Alerts",
//     desc: "SOS alerts system.",
//     icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
//   },
//   {
//     title: "Time-Aware Routes",
//     desc: "Time-based safety.",
//     icon: "https://cdn-icons-png.flaticon.com/512/2088/2088617.png"
//   }
//   ];

//   return (
//     <div className="features-section">
//       <h2>Safety, <span>reimagined</span></h2>
//       <p>
//         Advanced algorithms combine multiple data sources to keep you on the safest path.
//       </p>

//       <div className="features-grid">
//         {data.map((item, index) => (
//           <div className="feature-card" key={index}>
//            <div className="icon">
//   <img src={item.icon} alt="icon" />
// </div>
//             <h3>{item.title}</h3>
//             <p>{item.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function Features() {
  const data = [
    {
      title: "AI Safety Scoring",
      desc: "Advanced ML algorithms analyze crime data, lighting, and crowd patterns to rate route safety.",
      icon: "https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
    },
    {
      title: "Street Lighting Analysis",
      desc: "Utilizes OpenStreetMap data to identify well-lit paths for safer nighttime walks.",
      icon: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
    },
    {
      title: "Crowd Density Detection",
      desc: "Time-based analysis shows busy vs. quiet areas, recommending populated routes when safe.",
      icon: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
    },
    {
      title: "Nearby Safe Zones",
      desc: "Identifies nearby police stations, hospitals, and public spaces along your journey.",
      icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png"
    },
    {
      title: "Real-time Alerts",
      desc: "Receive instant notifications about areas with elevated safety concerns.",
      icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
    },
    {
      title: "Smart Route Planning",
      desc: "Adapts recommendations based on time of day, weather, and local events.",
      icon: "https://cdn-icons-png.flaticon.com/512/2088/2088617.png"
    }
  ];

  return (
    <div id="features" className="features-section">
      <h2>Safety <span>Reimagined</span></h2>
      <p>
        Intelligent algorithms combine real-time data to guide you through the safest possible routes
      </p>

      <div className="features-grid">
        {data.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">
              <img src={item.icon} alt={item.title} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}