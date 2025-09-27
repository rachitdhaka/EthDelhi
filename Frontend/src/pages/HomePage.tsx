import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, BarChart2, Zap, ShieldCheck } from "lucide-react";

// --- Reusable Doodle Background Component (No Changes) ---
const DoodleBackground = () => {
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        setMouse({
            x: (e.clientX - bounds.left) / bounds.width,
            y: (e.clientY - bounds.top) / bounds.height,
        });
    };
    
    const doodleSvgs = [
        (props: React.SVGProps<SVGSVGElement>) => <svg width={60} height={42} viewBox="0 0 120 80" fill="none" {...props}><rect x="10" y="20" width="100" height="40" rx="15" stroke="#d4d4d8" strokeWidth="3" fill="none" /><circle cx="35" cy="40" r="11" stroke="#d4d4d8" strokeWidth="2.5" fill="none" /><circle cx="85" cy="40" r="11" stroke="#d4d4d8" strokeWidth="2.5" fill="none" /><rect x="28" y="33" width="6" height="18" rx="2" fill="#e4e4e7" /><rect x="33" y="38" width="18" height="6" rx="2" fill="#e4e4e7" /><circle cx="85" cy="40" r="4.5" fill="#e4e4e7" /><circle cx="100" cy="30" r="5" stroke="#d4d4d8" strokeWidth="2" fill="none" /></svg>,
        (props: React.SVGProps<SVGSVGElement>) => <svg width={45} height={55} viewBox="0 0 90 110" fill="none" {...props}><rect x="10" y="10" width="70" height="90" rx="8" stroke="#d4d4d8" strokeWidth="3" fill="none" /><path d="M20 30 h50" stroke="#d4d4d8" strokeWidth="2" /><text x="45" y="55" textAnchor="middle" fontSize="22" fontFamily="monospace" fill="#d4d4d8">NFT</text><circle cx="45" cy="80" r="15" stroke="#d4d4d8" strokeWidth="2" fill="none" /><path d="M45 70 v20" stroke="#d4d4d8" strokeWidth="2" /></svg>,
        (props: React.SVGProps<SVGSVGElement>) => <svg width={32} height={44} viewBox="0 0 60 80" fill="none" {...props}><polygon points="30,10 55,40 30,70 5,40" stroke="#d4d4d8" strokeWidth="3" fill="none" /><polygon points="30,10 30,70 55,40" stroke="#d4d4d8" strokeWidth="2" fill="none" /></svg>,
    ];

    const doodleElements = useMemo(() => {
        const doodleStyle = (baseX: number, baseY: number, dx: number, dy: number, scale: number, opacity: number, rotate: number): React.CSSProperties => ({
            transform: `translate3d(${baseX + dx * (mouse.x - 0.5)}px,${baseY + dy * (mouse.y - 0.5)}px,0) scale(${scale}) rotate(${rotate}deg)`,
            position: 'fixed', pointerEvents: 'none', zIndex: 0, opacity: opacity * 0.5, transition: 'transform 0.2s linear'
        });

        const elements = [];
        const vw = window.innerWidth || 1200;
        const vh = window.innerHeight || 800;
        const cols = Math.max(8, Math.floor(vw / 120));
        const rows = Math.max(5, Math.floor(vh / 100));
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const Doodle = doodleSvgs[(i * 13 + j * 7) % doodleSvgs.length];
                const scale = 1.1 + ((i * 3 + j * 5) % 10) * 0.09;
                const opacity = 0.22 + ((i * 5 + j * 3) % 10) * 0.018;
                const rotate = ((i * 17 + j * 11) % 36) * 10 - 180;
                const baseX = (vw / (cols - 1)) * i + ((j % 2) * 10 - 5);
                const baseY = (vh / (rows - 1)) * j + ((i % 2) * 10 - 5);
                const dx = 40 + ((i * 7 + j * 13) % 30);
                const dy = 40 + ((i * 11 + j * 17) % 30);
                elements.push(<Doodle key={`doodle-${i}-${j}`} style={doodleStyle(baseX, baseY, dx, dy, scale, opacity, rotate)} aria-hidden="true" />);
            }
        }
        return elements;
    }, [mouse.x, mouse.y]);

    return (
        <div className="absolute inset-0 z-0" onMouseMove={handleMouseMove}>
            {doodleElements}
        </div>
    );
};

// --- Main HomePage Component ---
export function HomePage() {
    const features = [
        { name: 'AI-Powered Valuation', icon: BarChart2, description: 'Leverage advanced AI for accurate, real-time asset valuation.' },
        { name: 'Cross-Chain Liquidity', icon: Zap, description: 'Access liquidity from multiple blockchain ecosystems seamlessly.' },
        { name: 'Compliant RWA Access', icon: ShieldCheck, description: 'Engage with fully compliant, legally-vetted real-world assets.' }
    ];

    return (
        <div className="bg-white min-h-screen font-sans">
            <DoodleBackground />

            <div className="relative z-10">
                {/* THE HEADER SECTION HAS BEEN REMOVED FROM THIS FILE */}

                <main>
                    <section className="py-24 sm:py-32">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <h1 className="text-4xl sm:text-6xl font-extrabold text-black tracking-tight">
                                The Future of Finance
                            </h1>
                            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
                                Bridging Real-World Assets to DeFi
                            </p>
                            <div className="mt-8 flex justify-center items-center gap-4">
                                <Link to="/register-rwa" className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700">Register Your Asset</Link>
                                <Link to="/borrow" className="bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-black">Start Borrowing</Link>
                                <Link to="/lend" className="bg-white text-gray-800 px-6 py-3 rounded-md font-semibold border border-gray-300 hover:bg-gray-50">Start Lending</Link>
                            </div>
                        </div>
                    </section>

                    <section className="py-24 bg-white/80 backdrop-blur-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-extrabold text-black">Core Protocol Features</h2>
                                <p className="mt-4 max-w-2xl mx-auto text-md text-gray-600">
                                    Integra combines AI, blockchain, and traditional finance to create a secure and efficient lending platform.
                                </p>
                            </div>
                            <div className="mt-16 grid gap-8 md:grid-cols-3">
                                {features.map((feature) => (
                                    <div key={feature.name} className="p-8 border border-gray-200 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-50 text-blue-600">
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="mt-6 text-lg font-bold text-black">{feature.name}</h3>
                                        <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}