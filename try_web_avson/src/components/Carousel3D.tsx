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
            color: 'bg-blue-500/30 backdrop-blur-md',
            title: 'GRC Estratégico',
            subtitle: 'Gobierno, Riesgo y Cumplimiento Inteligente',
            icon: <Shield className="text-red-500 w-8 h-8" />,
            list: [
                'Certificaciones estratégicas ISO 27001, ENS, NIS2, DORA',
                'Resiliencia operativa ISO 22301 con enfoque predictivo',
                'Auditorías inteligentes y gestión proactiva de riesgos'
            ]
        },
        {
            id: 2,
            color: 'bg-purple-500/30 backdrop-blur-md',
            title: 'Ciberseguridad Ejecutiva',
            subtitle: 'CISO as a Service + Threat Intelligence',
            icon: <Lock className="text-blue-500 w-8 h-8" />,
            list: [
                'CISO as a Service con experiencia C-Suite real',
                'Threat Intelligence potenciado por IA propia',
                'Respuesta adaptativa a amenazas emergentes'
            ]
        },
        {
            id: 3,
            color: 'bg-pink-500/30 backdrop-blur-md',
            title: 'Inteligencia Artificial Aplicada',
            subtitle: 'IA Real, No Hype',
            icon: <Brain className="text-purple-500 w-8 h-8" />,
            list: [
                'Agentes autónomos para procesos críticos',
                'Plataformas adaptativas con aprendizaje continuo',
                'Ciberinteligencia predictiva y preventiva'
            ]
        }
    ];

    // Manejar scroll con lógica mejorada para permitir continuar después de la última tarjeta
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

            // Si estamos en la última tarjeta y scrolleamos hacia abajo, permitir scroll de página
            if (atLast && scrollingDown && allowPageScroll) {
                return; // Dejar que el scroll pase naturalmente
            }

            // Si estamos en la última tarjeta y scrolleamos hacia abajo por primera vez
            if (atLast && scrollingDown && !allowPageScroll) {
                e.preventDefault();
                setAllowPageScroll(true);
                return;
            }

            // Si scrolleamos hacia arriba desde "permitir scroll", volver al carrusel
            if (atLast && scrollingUp && allowPageScroll) {
                e.preventDefault();
                setAllowPageScroll(false);
                return;
            }

            // Lógica normal del carrusel
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

    // Resetear allowPageScroll cuando cambiamos de tarjeta
    useEffect(() => {
        if (currentIndex !== items.length - 1) {
            setAllowPageScroll(false);
        }
    }, [currentIndex, items.length]);

    // Manejar teclado
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
        <div className="w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden relative">
            {/* Título */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-30">
                <h1 className="text-5xl font-bold text-white mb-2">
                    Soluciones estratégicas
                </h1>
                <h1 className="text-5xl font-bold text-white">
                    para la era digital
                </h1>
            </div>

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
                            className="bg-white/30 w-[600px] rounded-2xl border-2 border-white shadow-2xl flex flex-col items-start justify-start text-white p-6 absolute"
                            style={{
                                opacity,
                                transform: `${transform} scale(${scale})`,
                                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                left: '50%',
                                zIndex,
                                pointerEvents: isActive ? 'auto' : 'none',
                            }}
                        >
                            <div className="flex items-center mb-4">
                                <span className="text-4xl mr-4">{item.icon}</span>
                                <div>
                                    <h2 className="text-2xl font-bold">{item.title}</h2>
                                    <h3 className="text-lg text-white/70">{item.subtitle}</h3>
                                </div>
                            </div>
                            <ul className="list-disc pl-8 space-y-2">
                                {item.list.map((listItem, idx) => (
                                    <li key={idx} className="text-white/80">{listItem}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* Indicador visual de que hay más contenido abajo */}
            {currentIndex === items.length - 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="flex flex-col items-center animate-bounce">
                        <p className="text-white/60 text-sm mb-2">Continúa hacia abajo</p>
                        <svg
                            className="w-6 h-6 text-white/60"
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
        </div>
    );
};

export default Carousel3D;