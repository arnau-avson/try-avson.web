import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import MainMenu from "./components/MainMenu";
import Carousel3D from "./components/Carousel3D";
import GlobeBackground from "./components/GlobeBackground";
import Footer from "./components/Footer";
import FullScreenLoader from "./components/FullScreenLoader";
import GRCView from "./components/GRCView";

const App: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const textDiv = document.getElementById("text");
      if (textDiv) {
        const scale = 1 + window.scrollY / 400;
        textDiv.style.transform = `scale(${scale})`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Fondo global - z-index 0 */}
              <GlobeBackground mousePosition={mousePosition} />

              {/* Menú - z-index alto */}
              <MainMenu />

              {/* HERO */}
              <div className="h-[68vh] flex md:mt-25 justify-center relative z-10">
                <div
                  id="text"
                  className="text-center fixed font-mono text-slate-100 tracking-wider z-0 pointer-events-none"
                >
                  <h1 className="text-4xl md:text-7xl font-bold uppercase">
                    GRC Governance
                  </h1>
                  <h1 className="text-4xl md:text-7xl font-bold uppercase">
                    Artificial Intelligence
                  </h1>
                  <h1 className="text-4xl md:text-7xl font-bold uppercase">
                    Cybersecurity
                  </h1>
                </div>
              </div>

              <div className="sticky top-0 h-screen z-30">
                <div className="relative h-full overflow-hidden bg-slate-950">
                  {/* Gradiente base profundo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />

                  {/* Banda de luz diagonal (muy sutil) */}
                  <div className="absolute -inset-[40%] bg-gradient-to-tr from-transparent via-cyan-500/10 to-transparent rotate-12" />

                  {/* Halo radial superior izquierdo */}
                  <div className="absolute top-[-20%] left-[-20%] w-[120%] h-[120%] bg-radial-gradient from-cyan-500/12 via-transparent to-transparent" />

                  {/* Profundidad inferior */}
                  <div className="absolute bottom-[-30%] right-[-30%] w-[120%] h-[120%] bg-radial-gradient from-amber-500/10 via-transparent to-transparent" />

                  {/* Viñeta para enfoque central */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950/90" />

                  {/* Ruido ultra sutil */}
                  <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />

                  <Carousel3D />
                </div>
              </div>

              {/* SCROLL BUFFER */}
              <div className="h-[200vh]" />

              {/* FOOTER - Con fondo y z-index alto */}
              <div className="relative z-50 bg-black">
                <Footer />
              </div>
            </>
          }
        />
        <Route path="/grc" element={<GRCView />} />
      </Routes>
    </Router>
  );
};

export default App;