import React, { useState, useMemo } from 'react';
import { TrendingUpIcon, ArrowRightIcon, CheckCircleIcon } from 'lucide-react';

// --- Constants ---
const pools = [
    {
        id: 'usdc',
        name: 'USDC',
        logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
        apy: 8.2,
        totalLiquidity: 12500000,
        utilization: 76
    },
    {
        id: 'usdt',
        name: 'USDT',
        logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
        apy: 7.8,
        totalLiquidity: 15800000,
        utilization: 82
    },
    {
        id: 'dai',
        name: 'DAI',
        logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
        apy: 7.5,
        totalLiquidity: 9200000,
        utilization: 68
    }
];

export function LendPage() {
    // --- State Management ---
    const [selectedPool, setSelectedPool] = useState(pools[0]);
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('30');
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 }); // For parallax

    // --- Calculations ---
    const calculateYield = () => {
        if (!amount || isNaN(parseFloat(amount))) return '0.00';
        const principal = parseFloat(amount);
        const days = parseInt(term);
        const yearlyYield = principal * (selectedPool.apy / 100);
        return (yearlyYield * days / 365).toFixed(2);
    };
    const estimatedYield = calculateYield();

    // --- Event Handlers ---
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - bounds.left) / bounds.width;
        const y = (e.clientY - bounds.top) / bounds.height;
        setMouse({ x, y });
    };

    // --- Doodle Background (Memoized for Performance) ---
    const doodleElements = useMemo(() => {
        const doodleSvgs = [
            (props: React.SVGProps<SVGSVGElement>) => <svg width="32" height="32" viewBox="0 0 64 64" fill="none" {...props}><path d="M32 56V8M50 26L32 8L14 26" stroke="#18181b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            (props: React.SVGProps<SVGSVGElement>) => <svg width="32" height="32" viewBox="0 0 64 64" fill="none" {...props}><path d="M20 44C20 44 23 40 26 40C29 40 32 44 35 44C38 44 41 40 44 40C47 40 50 44 50 44M42 24C42 27.3137 39.3137 30 36 30C32.6863 30 30 27.3137 30 24C30 20.6863 32.6863 18 36 18C39.3137 18 42 20.6863 42 24ZM20 20H48" stroke="#18181b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            (props: React.SVGProps<SVGSVGElement>) => <svg width="32" height="32" viewBox="0 0 64 64" fill="none" {...props}><circle cx="32" cy="32" r="24" stroke="#18181b" strokeWidth="5"/><path d="M32 20V44M20 32H44" stroke="#18181b" strokeWidth="5" strokeLinecap="round"/></svg>,
            (props: React.SVGProps<SVGSVGElement>) => <svg width="32" height="32" viewBox="0 0 64 64" fill="none" {...props}><rect x="12" y="12" width="40" height="40" rx="8" stroke="#18181b" strokeWidth="5"/><path d="M22 32H42" stroke="#18181b" strokeWidth="5" strokeLinecap="round"/><path d="M32 22V42" stroke="#18181b" strokeWidth="5" strokeLinecap="round"/></svg>
        ];
        
        const doodleStyle = (baseX: number, baseY: number, dx: number, dy: number, scale = 1.3, opacity = 0.28, rotate = 0): React.CSSProperties => ({
            transform: `translate3d(${baseX + dx * (mouse.x - 0.5)}px,${baseY + dy * (mouse.y - 0.5)}px,0) scale(${scale}) rotate(${rotate}deg)`,
            position: 'fixed', pointerEvents: 'none', zIndex: 0, opacity, transition: 'transform 0.1s linear'
        });
        
        const elements = [];
        const vw = window.innerWidth || 1200;
        const vh = window.innerHeight || 800;
        const cols = Math.max(8, Math.floor(vw / 150));
        const rows = Math.max(5, Math.floor(vh / 150));
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const Doodle = doodleSvgs[(i * 13 + j * 7) % doodleSvgs.length];
                const scale = 1.0 + ((i * 3 + j * 5) % 10) * 0.08;
                const opacity = 0.20 + ((i * 5 + j * 3) % 10) * 0.015;
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
        <div className="min-h-screen w-full bg-white text-black py-12 relative overflow-hidden font-sans" onMouseMove={handleMouseMove}>
            {/* Doodle Background */}
            {doodleElements}

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-black tracking-tight">
                        Lend Stablecoins, Earn Yield
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Provide liquidity to the protocol and earn stable returns.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Column 1: Lending Pool Dashboard */}
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-200 p-6 space-y-4">
                        <h2 className="text-lg font-bold text-gray-900">Available Lending Pools</h2>
                        {pools.map(pool => (
                            <div key={pool.id} onClick={() => setSelectedPool(pool)} className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${selectedPool.id === pool.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-gray-400'}`}>
                                <div className="flex items-center">
                                    <img src={pool.logo} alt={pool.name} className="h-10 w-10 rounded-full" />
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-base font-bold text-gray-900">{pool.name}</h3>
                                        <p className="text-sm font-bold text-green-600">{pool.apy}% APY</p>
                                    </div>
                                    <div className="ml-4 text-right">
                                        <p className="text-xs text-gray-500">Utilization</p>
                                        <p className="text-sm font-semibold text-gray-800">{pool.utilization}%</p>
                                        <div className="mt-1 w-20 h-1.5 rounded-full bg-gray-200"><div className="h-full rounded-full bg-blue-600" style={{ width: `${pool.utilization}%` }}></div></div>
                                    </div>
                                </div>
                                {selectedPool.id === pool.id && <div className="absolute top-2 right-2"><CheckCircleIcon className="h-5 w-5 text-blue-600" /></div>}
                            </div>
                        ))}
                    </div>

                    {/* Column 2: Deposit Form */}
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-200 p-6 space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Lend {selectedPool.name}</h2>
                            <p className="mt-1 text-sm text-gray-600">Deposit stablecoins to start earning {selectedPool.apy}% APY.</p>
                        </div>
                        
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">$</span></div>
                                <input type="number" name="amount" id="amount" value={amount} onChange={e => setAmount(e.target.value)} className="block w-full rounded-md border-gray-300 pl-7 pr-16 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="0.00" />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center"><span className="text-gray-500 sm:text-sm font-medium">{selectedPool.name}</span></div>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="term" className="block text-sm font-medium text-gray-700">Lending Term</label>
                            <select id="term" name="term" value={term} onChange={e => setTerm(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option value="30">30 days</option>
                                <option value="90">90 days</option>
                                <option value="180">180 days</option>
                                <option value="365">365 days (1 year)</option>
                            </select>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                            <div className="flex items-center">
                                <TrendingUpIcon className="h-5 w-5 text-blue-700" />
                                <h3 className="ml-2 text-sm font-bold text-blue-800">Estimated Yield</h3>
                            </div>
                            <div className="mt-2 text-center">
                                <p className="text-sm text-blue-600">Est. Earnings ({term} days)</p>
                                <p className="text-2xl font-bold text-blue-900">${estimatedYield}</p>
                            </div>
                        </div>
                        
                        <div className="pt-2">
                            <button type="button" disabled={!amount || parseFloat(amount) <= 0} className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                Lend {selectedPool.name}
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}