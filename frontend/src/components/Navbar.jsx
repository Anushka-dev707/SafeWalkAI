// export default function Navbar() {
//   return (
//     <div className="navbar">
//       <div className="logo">🛡️ SafeWalk AI</div>
//      <div className="links">
//   <span onClick={() => scrollToSection("map-section")}>
//     Safety Map
//   </span>
//   <span onClick={() => scrollToSection("features")}>
//     About
//   </span>
// </div>
//     </div>
//   );
// }

export default function Navbar() {

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className="navbar">
      <div className="logo">🛡️ SafeWalk AI</div>

      <div className="links">
        <span onClick={() => scrollToSection("map-section")}>
          Safety Map
        </span>

        <span onClick={() => scrollToSection("features")}>
          About
        </span>
      </div>
    </div>
  );
}