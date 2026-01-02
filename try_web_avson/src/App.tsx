import { useEffect } from "react";
import MainMenu from "./components/MainMenu";
import Carousel3D from "./components/Carousel3D";
import GlobeBackground from "./components/GlobeBackground";

const App: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const textDiv = document.getElementById("text");
      if (textDiv) {
        const scale = 1 + window.scrollY / 400;
        textDiv.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <GlobeBackground />
      <MainMenu />
      <div className="h-[68vh] flex md:mt-25 justify-center relative z-10">
        <div
          id="text"
          className="text-center fixed font-inter text-slate-100 tracking-wide z-0"
        >
          <h1 className="text-4xl md:text-7xl font-semibold leading-tight">
            GRC Governance
          </h1>

          <h1 className="text-4xl md:text-7xl font-semibold leading-tight">
            Artificial Intelligence
          </h1>

          <h1 className="text-4xl md:text-7xl font-semibold leading-tight">
            Cybersecurity
          </h1>
        </div>
      </div>

      <div className="bg-black h-[100vh] z-50 relative bg-[radial-gradient(circle_at_30%_30%,rgba(249,115,22,0.25),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.25),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.25),transparent_40%)]">
        <Carousel3D />
      </div>
    </>
  );
};

export default App;
