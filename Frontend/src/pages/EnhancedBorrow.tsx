import React, { useState, useMemo, useEffect } from 'react';
import { CheckCircleIcon, AlertCircleIcon, ArrowRightIcon, UploadIcon, CoinsIcon, ShieldIcon, TrendingUpIcon, ClockIcon } from 'lucide-react';
import { useAICollateralAgent, useRWALendingProtocol, useRWAToken } from '../hooks/useContracts';
import { useAccount } from 'wagmi';
import { AssetSelector } from '../components/AssetSelector';

// --- Constants ---
const rwaOptions = [
    {
        id: 'real-estate',
        name: 'Tokenized Real Estate',
        description: 'Commercial property in New York, tokenized and verified on-chain',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        value: 2500000,
        maxLTV: 0.7,
        riskLevel: 'Low',
        liquidity: 'High'
    },
    {
        id: 'invoice',
        name: 'Invoice Factoring',
        description: 'Tokenized invoice from Fortune 500 company due in 60 days',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        value: 150000,
        maxLTV: 0.85,
        riskLevel: 'Medium',
        liquidity: 'Medium'
    },
    {
        id: 'carbon-credits',
        name: 'Carbon Credits',
        description: 'Verified carbon offset credits from renewable energy project',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        value: 75000,
        maxLTV: 0.6,
        riskLevel: 'High',
        liquidity: 'Low'
    }
];

export function EnhancedBorrowPage() {
    // --- Web3 Hooks ---
    const { address, isConnected } = useAccount();
    const { collateral, ltv: contractLTV } = useAICollateralAgent();
    const { borrow, isPending: isBorrowing } = useRWALendingProtocol();
    const { balance: rwaTokenBalance } = useRWAToken();

    // --- State Management ---
    const [selectedAsset, setSelectedAsset] = useState(rwaOptions[0]);
    const [borrowAmount, setBorrowAmount] = useState('');
    const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
    const [userAssets, setUserAssets] = useState<Array<{
        id: string;
        name: string;
        description: string;
        value: number;
        maxLTV: number;
        image?: string;
        assetType?: string;
        riskLevel?: string;
        liquidity?: string;
    }>>([]);

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
                const transformedRwaOptions = res.documents
                    .filter((doc: { assetType: string }) => rwaOptions.some(option => option.id === doc.assetType))
                    .map((doc: { 
                        assetId?: string; 
                        id: string; 
                        assetType: string; 
                        valuation?: number; 
                        metadata?: { 
                            description?: string; 
                            image?: string; 
                            maxLTV?: number; 
                        }; 
                    }) => {
                        const matchingOption = rwaOptions.find(option => option.id === doc.assetType);
                        return {
                            id: doc.assetId || doc.id,
                            name: matchingOption?.name || doc.assetType || 'Unknown Asset',
                            description: matchingOption?.description || doc.metadata?.description || `Tokenized ${doc.assetType} asset`,
                            image: matchingOption?.image || doc.metadata?.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                            value: doc.valuation || matchingOption?.value || 100000,
                            maxLTV: doc.metadata?.maxLTV || matchingOption?.maxLTV || 0.7,
                            assetType: doc.assetType,
                            riskLevel: matchingOption?.riskLevel || 'Medium',
                            liquidity: matchingOption?.liquidity || 'Medium'
                        };
                    });

                setUserAssets(transformedRwaOptions);
            } catch (error) {
                console.error('Failed to fetch RWA data:', error);
                setUserAssets([]);
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

    const handleBorrow = async () => {
        if (!isConnected || !address) {
            alert('Please connect your wallet first');
            return;
        }

        if (!borrowAmount || parseFloat(borrowAmount) <= 0) {
            alert('Please enter a valid borrow amount');
            return;
        }

        try {
            await borrow(borrowAmount);
        } catch (error) {
            console.error('Error borrowing:', error);
            alert('Failed to borrow funds');
        }
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

    // --- Enhanced Doodle Background ---
    const doodleElements = useMemo(() => {
        const doodleSvgs = [
            (props: React.SVGProps<SVGSVGElement>) => <svg key="1" width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}><circle cx="16" cy="16" r="14" stroke="#3B82F6" strokeWidth="2" fill="rgba(59, 130, 246, 0.1)"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#3B82F6" fontFamily="monospace">Ξ</text></svg>,
            (props: React.SVGProps<SVGSVGElement>) => <svg key="2" width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}><rect x="4" y="4" width="24" height="24" rx="6" stroke="#8B5CF6" strokeWidth="2" fill="rgba(139, 92, 246, 0.1)"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#8B5CF6" fontFamily="monospace">NFT</text></svg>,
            (props: React.SVGProps<SVGSVGElement>) => <svg key="3" width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}><polygon points="16,4 28,28 4,28" stroke="#10B981" strokeWidth="2" fill="rgba(16, 185, 129, 0.1)"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#10B981" fontFamily="monospace">₿</text></svg>,
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
                const opacity = 0.15 + ((i * 5 + j * 3) % 10) * 0.01;
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
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900 py-12 relative overflow-hidden font-sans" onMouseMove={handleMouseMove}>
            {doodleElements}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-8 shadow-lg">
                        <CoinsIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent tracking-tight mb-6">
                        Borrow Against Your Assets
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Unlock liquidity from your tokenized real-world assets with our AI-powered valuation system and ERC-3643 compliant security tokens
                    </p>
                    
                    {/* Enhanced Status Cards */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {!isConnected ? (
                            <div className="flex items-center px-8 py-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl shadow-lg">
                                <div className="w-4 h-4 bg-amber-400 rounded-full mr-4 animate-pulse"></div>
                                <p className="text-amber-800 font-semibold text-lg">Please connect your wallet to start borrowing</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-lg">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
                                    <p className="text-blue-800 font-semibold text-lg">RWA Balance: {rwaTokenBalance} RWA</p>
                                </div>
                                {collateral && (
                                    <div className="flex items-center px-8 py-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg">
                                        <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                                        <p className="text-green-800 font-semibold text-lg">Collateral: {collateral.asset} ({(contractLTV * 100).toFixed(1)}% LTV)</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Column 1: Enhanced Asset Selection */}
                    <div className="group bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-gray-200/50 p-8 space-y-6 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">1</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Select Collateral</h2>
                                <p className="text-gray-600">Choose your tokenized asset</p>
                            </div>
                        </div>
                        <AssetSelector
                            onAssetSelect={handleAssetSelect}
                            selectedAsset={selectedAsset}
                            userAssets={userAssets}
                        />
                    </div>

                    {/* Column 2: Enhanced AI Valuation */}
                    <div className="group bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-gray-200/50 p-8 space-y-6 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">2</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">AI Valuation</h2>
                                <p className="text-gray-600">Advanced risk assessment</p>
                            </div>
                        </div>
                        
                        {/* Enhanced Valuation Display */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 shadow-inner">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-lg font-semibold text-gray-700">Max Borrow Amount</span>
                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    ${isNaN(maxBorrowAmount) ? '0' : maxBorrowAmount.toLocaleString()}
                                </span>
                            </div>
                            
                            {/* Enhanced LTV Display */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-gray-700">Current LTV</span>
                                    <span className={`text-2xl font-bold ${isLTVSafe ? 'text-green-600' : 'text-red-500'}`}>
                                        {ltv.toFixed(1)}%
                                    </span>
                                </div>
                                
                                {/* Enhanced Progress Bar */}
                                <div className="relative">
                                    <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                        <div 
                                            className={`h-full transition-all duration-700 ${isLTVSafe ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`} 
                                            style={{ width: `${Math.min(ltv / (selectedAsset.maxLTV * 100), 1) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div 
                                        className="absolute top-0 h-6 w-1 bg-gray-600 transform -translate-x-0.5 shadow-lg" 
                                        style={{ left: `${selectedAsset.maxLTV * 100}%` }}
                                    ></div>
                                    <div className="mt-3 flex justify-between text-sm text-gray-600">
                                        <span className="font-semibold">Safe Zone</span>
                                        <span className="font-bold text-gray-800">Max LTV: {(selectedAsset.maxLTV * 100).toFixed(0)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Enhanced AI Report */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 shadow-inner">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white text-sm font-bold">AI</span>
                                </div>
                                <h3 className="text-xl font-bold text-purple-900">AI Appraisal Report</h3>
                            </div>
                            <div className="space-y-3">
                                <p className="text-purple-800 leading-relaxed">
                                    Our advanced AI has analyzed this asset and determined it presents a{' '}
                                    <span className="font-bold text-purple-900">{isLTVSafe ? 'low' : 'moderate'}</span> risk profile with{' '}
                                    <span className="font-bold text-purple-900">{isLTVSafe ? 'strong' : 'potential'}</span> liquidity characteristics.
                                </p>
                                <div className="flex items-center space-x-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <TrendingUpIcon className="h-4 w-4 text-purple-600" />
                                        <span className="text-purple-700">Risk: {selectedAsset.riskLevel}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="h-4 w-4 text-purple-600" />
                                        <span className="text-purple-700">Liquidity: {selectedAsset.liquidity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Enhanced Verification & Borrow */}
                    <div className="group bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-gray-200/50 p-8 space-y-6 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">3</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Verify & Borrow</h2>
                                <p className="text-gray-600">Complete verification process</p>
                            </div>
                        </div>
                        
                        {/* Enhanced Document Upload */}
                        <div className="space-y-6">
                            <button 
                                type="button" 
                                onClick={handleDocumentUpload} 
                                className="w-full inline-flex items-center justify-center px-8 py-6 border-2 border-dashed border-gray-300 rounded-3xl text-lg font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 hover:scale-105"
                            >
                                <UploadIcon className="mr-4 h-6 w-6" />
                                Upload Verification Documents
                            </button>
                            
                            {/* Enhanced Status Indicators */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50">
                                    {isDocumentUploaded ? (
                                        <CheckCircleIcon className="h-8 w-8 text-green-500" />
                                    ) : (
                                        <AlertCircleIcon className="h-8 w-8 text-gray-400" />
                                    )}
                                    <span className={`text-lg font-semibold ${isDocumentUploaded ? 'text-green-700' : 'text-gray-500'}`}>
                                        {isDocumentUploaded ? 'Documents uploaded successfully' : 'No documents uploaded'}
                                    </span>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                    {isVerified ? (
                                        <div className="flex items-center px-6 py-4 rounded-2xl bg-green-100 text-green-800 border-2 border-green-200">
                                            <CheckCircleIcon className="h-6 w-6 mr-3" />
                                            <span className="text-lg font-bold">Verified & Compliant</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center px-6 py-4 rounded-2xl bg-gray-100 text-gray-600 border-2 border-gray-200">
                                            <ClockIcon className="h-6 w-6 mr-3" />
                                            <span className="text-lg font-bold">Pending Verification</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Borrow Amount Input */}
                        <div className="space-y-4">
                            <label htmlFor="borrow-amount" className="block text-lg font-bold text-gray-700">
                                Borrow Amount
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <span className="text-gray-500 text-2xl font-bold">$</span>
                                </div>
                                <input 
                                    type="number" 
                                    id="borrow-amount" 
                                    value={borrowAmount} 
                                    onChange={e => setBorrowAmount(e.target.value)} 
                                    className="block w-full pl-12 pr-20 py-6 text-2xl border-2 border-gray-200 rounded-3xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-inner" 
                                    placeholder="0.00" 
                                />
                                <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                                    <span className="text-gray-500 text-2xl font-bold">USDC</span>
                                </div>
                            </div>
                            {borrowAmount && parseFloat(borrowAmount) > maxBorrowAmount && (
                                <p className="text-lg text-red-600 flex items-center p-4 bg-red-50 rounded-2xl border border-red-200">
                                    <AlertCircleIcon className="h-6 w-6 mr-3" />
                                    Amount exceeds maximum borrowing capacity
                                </p>
                            )}
                        </div>

                        {/* Enhanced Borrow Button */}
                        <div className="pt-6">
                            <button 
                                type="button" 
                                onClick={handleBorrow}
                                disabled={!isVerified || !borrowAmount || parseFloat(borrowAmount) > maxBorrowAmount || parseFloat(borrowAmount) <= 0 || !isConnected || isBorrowing} 
                                className="w-full inline-flex justify-center items-center px-10 py-6 border border-transparent text-xl font-bold rounded-3xl shadow-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
                            >
                                {isBorrowing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-4"></div>
                                        Processing Transaction...
                                    </>
                                ) : (
                                    <>
                                        <ShieldIcon className="mr-4 h-6 w-6" />
                                        Borrow Funds Securely
                                        <ArrowRightIcon className="ml-4 h-6 w-6" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
