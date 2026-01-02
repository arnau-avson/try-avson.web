import { useEffect } from "react";
import MainMenu from "./components/MainMenu";
import Carousel3D from "./components/Carousel3D";
import GlobeBackground from "./components/GlobeBackground";

const App: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const textDiv = document.getElementById("text");
      if (textDiv) {
        const scale = 1 + window.scrollY / 600;
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

      <div className="bg-black h-[100vh] z-50 relative">
        <Carousel3D />
      </div>
    </>
  );
};

export default App;
