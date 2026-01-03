import { FC } from "react";
import { Mail, MapPin } from "lucide-react";

const Footer: FC = () => {
    const marqueeText = "GRC • Ciberseguridad • Inteligencia Artificial • Resiliencia Operativa • Transformación Digital • ";

    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* MARQUEE */}
            <div className="relative w-full overflow-hidden border-b border-gray-300 py-4 bg-black">
                <div className="flex animate-marquee whitespace-nowrap">
                    <span className="text-2xl font-bold text-white/80 mx-8">{marqueeText}</span>
                    <span className="text-2xl font-bold text-white/80 mx-8">{marqueeText}</span>
                    <span className="text-2xl font-bold text-white/80 mx-8">{marqueeText}</span>
                    <span className="text-2xl font-bold text-white/80 mx-8">{marqueeText}</span>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* BRAND */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-semibold tracking-tight">avson</h2>
                        <p className="text-base text-white/70 max-w-xs">
                            Transformamos la complejidad tecnológica en ventaja competitiva
                            sostenible para organizaciones ambiciosas.
                        </p>
                    </div>

                    {/* SERVICIOS */}
                    <div>
                        <h3 className="text-base font-semibold mb-4">Servicios</h3>
                        <ul className="space-y-3 text-base text-white/70">
                            <li>Gobierno, Riesgo y Cumplimiento</li>
                            <li>Ciberseguridad</li>
                            <li>Inteligencia Artificial</li>
                            <li>Resiliencia</li>
                        </ul>
                    </div>

                    {/* EMPRESA */}
                    <div>
                        <h3 className="text-base font-semibold mb-4">Empresa</h3>
                        <ul className="space-y-3 text-base text-white/70">
                            <li>Sobre Nosotros</li>
                            <li>Nuestro Equipo</li>
                            <li>FAQ</li>
                            <li>Assessment</li>
                            <li>Blog</li>
                            <li>Contacto</li>
                        </ul>
                    </div>

                    {/* CONTACTO */}
                    <div>
                        <h3 className="text-base font-semibold mb-4">Contacto</h3>
                        <ul className="space-y-4 text-base text-white/70">
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5" />
                                hello@avson.eu
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-5 h-5" />
                                Madrid &amp; Barcelona
                            </li>
                        </ul>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="my-10 border-t border-white/10" />

                {/* FOOTER BOTTOM */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/50 gap-4">
                    <span>© 2026 Avson. Todos los derechos reservados.</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition">
                            Política de Privacidad
                        </a>
                        <a href="#" className="hover:text-white transition">
                            Términos y Condiciones
                        </a>
                        <a href="#" className="hover:text-white transition">
                            Política de Cookies
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }

                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </footer>
    );
};

export default Footer;