import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CITIES: string[] = ["Barcelona", "Madrid"];

const MainMenu: React.FC = () => {
    const navigate = useNavigate();
    const [cityIndex, setCityIndex] = useState<number>(0);
    const [fade, setFade] = useState<boolean>(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCityIndex((prev) => (prev + 1) % CITIES.length);
                setFade(false);
            }, 500); // Duration of fade-out animation
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="w-[85%] mx-auto mt-4 rounded-2xl bg-white/10 backdrop-blur-xl backdrop-saturate-150 border border-white/20 shadow-lg shadow-black/30" >
            <nav className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center px-8 py-3 text-sm tracking-wide text-white" >

                {/* COLUMNA 1 – BRAND */}
                <div className="flex flex-col justify-center items-start">
                    <span className="text-3xl font-semibold tracking-tight">
                        Avson
                    </span>
                    <span 
                        className={`text-xl text-white/70 transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
                    >
                        {CITIES[cityIndex]}
                    </span>
                </div>

                {/* COLUMNA 2 – MENU CENTRADO */}
                <div className="flex justify-center">
                    <div className="flex gap-16 text-white/80">
                        <ol className="space-y-1">
                            <li 
                                className="hover:text-white text-lg transition-colors cursor-pointer"
                                onClick={() => navigate("/grc")}
                            >
                                GRC
                            </li>
                            <li className="hover:text-white text-lg transition-colors cursor-pointer">Ciberseguridad</li>
                            <li className="hover:text-white text-lg transition-colors cursor-pointer">Estrategia IA</li>
                        </ol>

                        <ol className="space-y-1">
                            <li className="hover:text-white text-lg transition-colors cursor-pointer">Resiliencia</li>
                            <li className="hover:text-white text-lg transition-colors cursor-pointer">Evaluación</li>
                            <li className="hover:text-white text-lg transition-colors cursor-pointer">Contacto</li>
                        </ol>
                    </div>
                </div>

                {/* COLUMNA 3 – SELECTOR */}
                <div className="flex justify-end items-center">
                    <select
                        className="
              bg-white/10
              backdrop-blur-md
              border border-white/20
              rounded-lg
              px-3 py-2
              text-sm text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500/40
            "
                    >
                        <option className="text-slate-900" value="es">Español (ES)</option>
                        <option className="text-slate-900" value="en">English (EN)</option>
                        <option className="text-slate-900" value="fr">Français (FR)</option>
                        <option className="text-slate-900" value="pt">Português (PT)</option>
                        <option className="text-slate-900" value="ar">العربية (AR)</option>
                        <option className="text-slate-900" value="he">עברית (HE)</option>
                        <option className="text-slate-900" value="ca">Català (CA)</option>
                        <option className="text-slate-900" value="gl">Galego (GL)</option>
                        <option className="text-slate-900" value="eu">Euskara (EU)</option>
                    </select>
                </div>

            </nav>
        </header>
    );
};

export default MainMenu;
