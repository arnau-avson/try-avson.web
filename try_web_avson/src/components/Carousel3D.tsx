import { useState, useRef, useEffect } from 'react';
import { Shield, Lock, Brain } from 'lucide-react';

const Carousel3D = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const scrollTimeout = useRef(null);
    const [allowPageScroll, setAllowPageScroll] = useState(false);

    const items = [
        {
            id: 1,
            color: 'bg-gradient-to-br from-slate-800/90 to-slate-900/95',
            title: 'GRC Estratégico',
            subtitle: 'Gobierno, Riesgo y Cumplimiento Inteligente',
            icon: <Shield className="text-blue-500 w-12 h-12" />,
            list: [
                'Certificaciones estratégicas ISO 27001, ENS, NIS2, DORA',
                'Resiliencia operativa ISO 22301 con enfoque predictivo',
                'Auditorías inteligentes y gestión proactiva de riesgos'
            ]
        },
        {
            id: 2,
            color: 'bg-gradient-to-br from-slate-800/90 to-slate-900/95',
            title: 'Ciberseguridad Ejecutiva',
            subtitle: 'CISO as a Service + Threat Intelligence',
            icon: <Lock className="text-emerald-500 w-12 h-12" />,
            list: [
                'CISO as a Service con experiencia C-Suite real',
                'Threat Intelligence potenciado por IA propia',
                'Respuesta adaptativa a amenazas emergentes'
            ]
        },
        {
            id: 3,
            color: 'bg-gradient-to-br from-slate-800/90 to-slate-900/95',
            title: 'Inteligencia Artificial Aplicada',
            subtitle: 'IA Real, No Hype',
            icon: <Brain className="text-indigo-500 w-12 h-12" />,
            list: [
                'Agentes autónomos para procesos críticos',
                'Plataformas adaptativas con aprendizaje continuo',
                'Ciberinteligencia predictiva y preventiva'
            ]
        }
    ];

    useEffect(() => {
        const handleWheel = (e) => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

            if (!isInView) return;

            const atFirst = currentIndex === 0;
            const atLast = currentIndex === items.length - 1;
            const scrollingUp = e.deltaY < 0;
            const scrollingDown = e.deltaY > 0;

            if (atLast && scrollingDown && allowPageScroll) {
                return;
            }

            if (atLast && scrollingDown && !allowPageScroll) {
                e.preventDefault();
                setAllowPageScroll(true);
                return;
            }

            if (atLast && scrollingUp && allowPageScroll) {
                e.preventDefault();
                setAllowPageScroll(false);
                return;
            }

            if ((scrollingDown && !atLast) || (scrollingUp && !atFirst)) {
                e.preventDefault();

                if (scrollTimeout.current) {
                    clearTimeout(scrollTimeout.current);
                }

                scrollTimeout.current = setTimeout(() => {
                    if (scrollingDown && currentIndex < items.length - 1) {
                        setCurrentIndex(prev => prev + 1);
                    } else if (scrollingUp && currentIndex > 0) {
                        setCurrentIndex(prev => prev - 1);
                        setAllowPageScroll(false);
                    }
                }, 50);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [currentIndex, items.length, allowPageScroll]);

    useEffect(() => {
        if (currentIndex !== items.length - 1) {
            setAllowPageScroll(false);
        }
    }, [currentIndex, items.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' && currentIndex < items.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                setCurrentIndex(prev => prev - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, items.length]);

    return (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div
                ref={containerRef}
                className="relative w-full h-full flex items-center justify-center"
            >
                {items.map((item, index) => {
                    const isActive = index === currentIndex;
                    const isPrev = index < currentIndex;
                    const isNext = index > currentIndex;

                    let transform = 'translateX(-50%) translateY(0)';
                    let opacity = 0;
                    let scale = 0.8;
                    let zIndex = 0;

                    if (isActive) {
                        transform = 'translateX(-50%) translateY(0)';
                        opacity = 1;
                        scale = 1;
                        zIndex = 10;
                    } else if (isPrev) {
                        transform = 'translateX(-50%) translateY(-120%)';
                        opacity = 0;
                        scale = 0;
                        zIndex = 5;
                    } else if (isNext) {
                        transform = 'translateX(-50%) translateY(120%)';
                        opacity = 0.3;
                        scale = 0.85;
                        zIndex = 5;
                    }

                    return (
                        <div
                            key={item.id}
                            className={`${item.color} backdrop-blur-xl w-[750px] rounded-xl border border-slate-700/50 shadow-2xl flex flex-col items-start justify-start text-white p-5 absolute`}
                            style={{
                                opacity,
                                transform: `${transform} scale(${scale})`,
                                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                left: '50%',
                                zIndex,
                                pointerEvents: isActive ? 'auto' : 'none',
                                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(255, 255, 255, 0.02)',
                            }}
                        >
                            <div className="flex items-center mb-10">
                                <div className="bg-slate-700/30 p-5 rounded-lg mr-6 backdrop-blur-sm border border-slate-600/30">
                                    {item.icon}
                                </div>
                                <div>
                                    <h2 className="text-4xl font-semibold mb-2 tracking-tight text-slate-100">{item.title}</h2>
                                    <h3 className="text-xl text-slate-300 font-normal">{item.subtitle}</h3>
                                </div>
                            </div>
                            <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-8 w-full border border-slate-700/40">
                                <ul className="space-y-5">
                                    {item.list.map((listItem, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-slate-500 mr-4 mt-1 text-xl">•</span>
                                            <span className="text-slate-200 text-lg leading-relaxed">{listItem}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            {currentIndex === items.length - 1 && (
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="flex flex-col items-center animate-bounce">
                        <p className="text-slate-400 text-base mb-3 font-medium">Continúa hacia abajo</p>
                        <svg
                            className="w-7 h-7 text-slate-400"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            )}

            <div className="absolute bottom-10 right-10 z-30 flex gap-3">
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex
                            ? 'bg-slate-300 w-8'
                            : 'bg-slate-600 hover:bg-slate-500'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel3D;