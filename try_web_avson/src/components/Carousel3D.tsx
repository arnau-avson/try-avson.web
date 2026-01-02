import { useState, useRef, useEffect } from 'react';

const Carousel3D = () => {
    const [offset, setOffset] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const scrollTop = useRef(0);

    const items = [
        { id: 1, color: 'bg-blue-500', title: 'Item 1' },
        { id: 2, color: 'bg-purple-500', title: 'Item 2' },
        { id: 3, color: 'bg-pink-500', title: 'Item 3' },
    ];

    const itemHeight = 300;
    const gap = 20;
    const totalHeight = (itemHeight + gap) * items.length;
    const maxOffset = totalHeight - window.innerHeight;

    // Detectar si el componente está completamente visible
    useEffect(() => {
        const checkIfInView = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // El componente está completamente visible cuando su top está en 0 o cerca
            const fullyVisible = rect.top <= 0 && rect.bottom >= windowHeight;
            setIsInView(fullyVisible);
        };

        window.addEventListener('scroll', checkIfInView);
        window.addEventListener('resize', checkIfInView);
        checkIfInView();

        return () => {
            window.removeEventListener('scroll', checkIfInView);
            window.removeEventListener('resize', checkIfInView);
        };
    }, []);

    useEffect(() => {
        const handleWheel = (e) => {
            // Solo manejar el scroll si el componente está completamente visible
            if (!isInView) return;

            const atTop = offset <= 0;
            const atBottom = offset >= maxOffset;

            // Solo prevenir el comportamiento por defecto si estamos dentro del rango del carrusel
            if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
                e.preventDefault();
                setOffset(prev => {
                    const newOffset = prev + e.deltaY * 0.5;
                    return Math.max(0, Math.min(newOffset, maxOffset));
                });
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [maxOffset, offset, isInView]);

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startY.current = e.pageY;
        scrollTop.current = offset;
        containerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const y = e.pageY;
        const walk = (startY.current - y) * 2;
        const newOffset = scrollTop.current + walk;
        setOffset(Math.max(0, Math.min(newOffset, maxOffset)));
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        containerRef.current.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
        containerRef.current.style.cursor = 'grab';
    };

    return (
        <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
            <div
                ref={containerRef}
                className="relative w-full h-full cursor-grab"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <div className="absolute inset-0">
                    {items.map((item, index) => {
                        const y = index * (itemHeight + gap) - offset;

                        return (
                            <div
                                key={item.id}
                                className={`${item.color} rounded-2xl shadow-2xl flex items-center justify-center text-white text-3xl font-bold select-none transition-transform duration-200 hover:scale-105`}
                                style={{
                                    position: 'absolute',
                                    top: `${y}px`,
                                    left: '50%',
                                    transform: 'translateX(-50%) translateZ(0)',
                                    width: '500px',
                                    height: `${itemHeight}px`
                                }}
                            >
                                {item.title}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Carousel3D;