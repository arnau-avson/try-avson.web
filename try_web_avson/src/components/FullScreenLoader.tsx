import React, { useEffect, useState } from "react";

const cities = ["madrid", "barcelona"];

const FullScreenLoader: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [cityIndex, setCityIndex] = useState(0);
    const [animate, setAnimate] = useState(false);

    /* PROGRESO */
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsVisible(false), 300);
                    return 100;
                }
                return prev + 2;
            });
        }, 80);

        return () => clearInterval(interval);
    }, []);

    /* CAMBIO DE CIUDAD */
    useEffect(() => {
        const cityInterval = setInterval(() => {
            setAnimate(true);

            setTimeout(() => {
                setCityIndex((prev) => (prev + 1) % cities.length);
                setAnimate(false);
            }, 200); // duración de la animación
        }, 2500);

        return () => clearInterval(cityInterval);
    }, []);

    if (!isVisible) return null;

    const currentCity = cities[cityIndex];
    const nextCity = cities[(cityIndex + 1) % cities.length];

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            {/* TEXTO CENTRAL */}
            <div className="flex items-center text-white text-4xl tracking-wide overflow-hidden h-[48px]">
                {/* Parte fija */}
                <span className="mr-3">avson |</span>

                {/* Contenedor animado */}
                <div className="relative h-full w-[180px] overflow-hidden">
                    {/* Ciudad actual */}
                    <span
                        className={`absolute left-0 top-0 transition-all duration-400 ease-in-out
              ${animate ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}
            `}
                    >
                        {currentCity}
                    </span>

                    {/* Ciudad siguiente */}
                    <span
                        className={`absolute left-0 top-full transition-all duration-400 ease-in-out
              ${animate ? "translate-y-0 opacity-100" : "translate-y-0 opacity-0"}
            `}
                    >
                        {nextCity}
                    </span>
                </div>
            </div>

            {/* BARRA DE PROGRESO */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] h-2 bg-slate-700 overflow-visible">
                <div
                    className="relative h-full bg-blue-600 transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                >
                    {/* CÍRCULO EN LA PUNTA */}
                    <div className="absolute top-1/2 right-0 w-8 h-8 bg-blue-600 rounded-full transform translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>
        </div>
    );
};

export default FullScreenLoader;
