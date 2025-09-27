import React, { useState, useMemo, useEffect } from 'react';
import { CheckCircleIcon, AlertCircleIcon, ArrowRightIcon, UploadIcon } from 'lucide-react';

// --- Constants ---
const rwaOptions = [
    {
        id: 'real-estate',
        name: 'Tokenized Real Estate',
        description: 'Commercial property in New York, tokenized and verified on-chain',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        value: 2500000,
        maxLTV: 0.7
    },
    {
        id: 'invoice',
        name: 'Invoice Factoring',
        description: 'Tokenized invoice from Fortune 500 company due in 60 days',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        value: 150000,
        maxLTV: 0.85
    },
    {
        id: 'carbon-credits',
        name: 'Carbon Credits',
        description: 'Verified carbon offset credits from renewable energy project',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        value: 75000,
        maxLTV: 0.6
    }
];

export function BorrowPage() {
    // --- State Management ---
    const [selectedAsset, setSelectedAsset] = useState(rwaOptions[0]);
    const [borrowAmount, setBorrowAmount] = useState('');
    const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 }); // State for parallax effect
	const [rwaOptionArray, setRwaOptionArray] = useState<any[]>(rwaOptions);

	useEffect(() => {
		const fetchUploadedRwa = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/rwa/get", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem('authToken')}`
					},
				});

				const res = await response.json();


					// Filter and include rwaOptions that match backend assetTypes
					const matchingRwaOptions = rwaOptions.filter(option =>
						res.documents.some((doc: any) => doc.assetType === option.id)
					);

					// Transform backend data to match rwaOptions structure for matching assets
					const transformedRwaOptions = res.documents
						.filter((doc: any) => rwaOptions.some(option => option.id === doc.assetType))
						.map((doc: any) => {
							// Find the matching rwaOption to use its properties
							const matchingOption = rwaOptions.find(option => option.id === doc.assetType);
							return {
								id: doc.assetId || doc.id,
								name: matchingOption?.name || doc.assetType || 'Unknown Asset',
								description: matchingOption?.description || doc.metadata?.description || `Tokenized ${doc.assetType} asset`,
								image: matchingOption?.image || doc.metadata?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
								value: doc.valuation || matchingOption?.value || 100000,
								maxLTV: doc.metadata?.maxLTV || matchingOption?.maxLTV || 0.7
							};
						});

					// Set the state with filtered matching options and transformed backend data
					setRwaOptionArray([...matchingRwaOptions, ...transformedRwaOptions]);

			} catch (error) {
				console.error('Failed to fetch RWA data:', error);
				// Fallback to default options on error
				setRwaOptionArray(rwaOptions);
			}
		};

		fetchUploadedRwa();
	}, []);

    // --- Event Handlers ---
    const handleAssetSelect = (asset: typeof rwaOptions[0]) => {
        setSelectedAsset(asset);
        setBorrowAmount('');
        setIsDocumentUploaded(false);
        setIsVerified(false);
    };

    const handleDocumentUpload = () => {
        setIsDocumentUploaded(true);
        setTimeout(() => setIsVerified(true), 1500);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - bounds.left) / bounds.width;
        const y = (e.clientY - bounds.top) / bounds.height;
        setMouse({ x, y });
    };

    // --- Calculations ---
    const ltv = borrowAmount ? (parseFloat(borrowAmount) / selectedAsset.value) * 100 : 0;
    const maxBorrowAmount = selectedAsset.value * selectedAsset.maxLTV;
    const isLTVSafe = ltv <= selectedAsset.maxLTV * 100;

    // --- Doodle Background (Memoized for Performance) ---
    const doodleElements = useMemo(() => {
        const doodleSvgs = [
            (props: React.SVGProps<SVGSVGElement>) => <svg key="1" width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}><circle cx="16" cy="16" r="14" stroke="#222" strokeWidth="2"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#222" fontFamily="monospace">Ξ</text></svg>,
            (props: React.SVGProps<SVGSVGElement>) => <svg key="2" width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}><rect x="4" y="4" width="24" height="24" rx="6" stroke="#222" strokeWidth="2"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#222" fontFamily="monospace">NFT</text></svg>,
            (props: React.SVGProps<SVGSVGElement>) => <svg key="3" width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}><polygon points="16,4 28,28 4,28" stroke="#222" strokeWidth="2" fill="none"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#222" fontFamily="monospace">₿</text></svg>,
        ];
        const doodleStyle = (baseX: number, baseY: number, dx: number, dy: number, scale: number, opacity: number, rotate: number): React.CSSProperties => ({
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

    // --- Component Return ---
    return (
        <div className="min-h-screen w-full bg-white text-black py-12 relative overflow-hidden font-sans" onMouseMove={handleMouseMove}>
            {doodleElements}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-black tracking-tight">Borrow Against Your Assets</h1>
                    <p className="mt-4 text-lg text-gray-600">Use your tokenized RWAs as collateral to access DeFi liquidity.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Column 1: Asset Selection */}
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-200 p-6 space-y-4">
                        <h2 className="text-lg font-bold text-gray-900">1. Select Collateral</h2>
                        {rwaOptionArray.map(asset => (
                            <div key={asset.id} onClick={() => handleAssetSelect(asset)} className={`relative rounded-lg border-2 p-4 cursor-pointer flex items-start transition-all duration-200 ${selectedAsset.id === asset.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-gray-400'}`}>
                                <img src={asset.image} alt={asset.name} className="h-16 w-16 rounded-md object-cover" />
                                <div className="ml-4">
                                    <h3 className="text-sm font-bold text-gray-900">{asset.name}</h3>
                                    <p className="mt-1 text-sm text-gray-600">{asset.description}</p>
                                </div>
                                {selectedAsset.id === asset.id && <div className="absolute top-2 right-2"><CheckCircleIcon className="h-5 w-5 text-blue-600" /></div>}
                            </div>
                        ))}
                    </div>

                    {/* Column 2: AI Agent Valuation */}
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-200 p-6 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900">2. AI Valuation</h2>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Max Borrow Amount</span>
                            <span className="text-sm font-bold text-black">${maxBorrowAmount.toLocaleString()}</span>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Current LTV</span>
                                <span className={`text-sm font-bold ${isLTVSafe ? 'text-green-600' : 'text-red-500'}`}>{ltv.toFixed(2)}%</span>
                            </div>
                            <div className="mt-2 relative h-3 rounded-full overflow-hidden bg-gray-200">
                                <div className={`absolute h-full ${isLTVSafe ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${Math.min(ltv / (selectedAsset.maxLTV * 100), 1) * 100}%` }}></div>
                                <div className="absolute h-full border-r-2 border-dashed border-gray-500" style={{ left: `${selectedAsset.maxLTV * 100}%` }}></div>
                            </div>
                            <div className="mt-1 flex justify-between text-xs text-gray-500">
                                <span>Safe</span>
                                <span className="font-bold">Max LTV</span>
                            </div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
                            <h3 className="text-sm font-bold text-blue-800">AI Appraisal Report</h3>
                            <p className="mt-2 text-sm text-blue-700">Our AI has analyzed this asset and determined it is a {isLTVSafe ? 'low' : 'moderate'} risk with {isLTVSafe ? 'strong' : 'potential'} liquidity.</p>
                        </div>
                    </div>

                    {/* Column 3: Data & Compliance + Borrow Form */}
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-200 p-6 space-y-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">3. Verify & Borrow</h2>
                            <div className="mt-4">
                                <button type="button" onClick={handleDocumentUpload} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    <UploadIcon className="mr-2 h-4 w-4" />
                                    Upload Verification Docs
                                </button>
                                <div className="mt-4 flex items-center">
                                    {isDocumentUploaded ?
                                        <><CheckCircleIcon className="h-5 w-5 text-green-600" /><span className="ml-2 text-sm text-green-700">Documents uploaded</span></> :
                                        <><AlertCircleIcon className="h-5 w-5 text-gray-400" /><span className="ml-2 text-sm text-gray-500">No documents uploaded</span></>
                                    }
                                </div>
                                <div className={`mt-2 flex items-center`}>
                                    {isVerified ?
                                        <div className="flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800"><CheckCircleIcon className="h-4 w-4 mr-1" /><span className="text-xs font-medium">Verified & Compliant</span></div> :
                                        <div className="flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600"><span className="text-xs font-medium">Pending Verification</span></div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="borrow-amount" className="block text-sm font-medium text-gray-700">Borrow Amount</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">$</span></div>
                                <input type="number" id="borrow-amount" value={borrowAmount} onChange={e => setBorrowAmount(e.target.value)} className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="0.00" />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">USDC</span></div>
                            </div>
                            {borrowAmount && parseFloat(borrowAmount) > maxBorrowAmount && <p className="mt-2 text-sm text-red-600">Amount exceeds maximum borrowing capacity.</p>}
                        </div>

                        <div className="pt-2">
                            <button type="button" disabled={!isVerified || !borrowAmount || parseFloat(borrowAmount) > maxBorrowAmount || parseFloat(borrowAmount) <= 0} className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                Borrow
                                <ArrowRightIcon className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
