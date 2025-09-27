import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRightIcon,
  FileIcon,
  UploadIcon,
  ShieldIcon,
  CoinsIcon,
  AlertCircleIcon,
} from 'lucide-react';

// --- Constants (Asset types, token standards, etc.) ---
const assetTypes = [
  { id: 'real-estate', name: 'Real Estate', description: 'Commercial or residential property', icon: '🏢' },
  { id: 'invoice', name: 'Invoice', description: 'Accounts receivable or factoring', icon: '📄' },
  { id: 'carbon-credits', name: 'Carbon Credits', description: 'Verified carbon offset credits', icon: '🌿' },
  { id: 'commodities', name: 'Commodities', description: 'Physical goods like gold or oil', icon: '🪙' },
];

const tokenStandards = [
  { id: 'erc721', name: 'ERC-721 (NFT)', description: 'Non-fungible token for unique assets' },
  { id: 'erc20', name: 'ERC-20', description: 'Fungible token for fractionalized ownership' },
];

// --- Helper Components (Moved outside main component for performance) ---

// Accessible checkmark icon for completed steps
function CircleCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// Simple spinner for loading states
function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export function Rwa() {
  // --- Component State ---
  const [currentStep, setCurrentStep] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 }); // normalized 0-1
  const [formData, setFormData] = useState({
    assetType: '',
    assetName: '',
    assetDescription: '',
    assetValue: '',
    assetLocation: '',
    legalOwner: '',
    tokenStandard: '',
    documents: [] as File[],
    ipfsHash: '',
    isIdentityVerified: false,
    isComplianceVerified: false,
    txHash: '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAssetTypeSelect = (assetTypeId: string) => setFormData({ ...formData, assetType: assetTypeId });
  const handleTokenStandardSelect = (tokenStandardId: string) => setFormData({ ...formData, tokenStandard: tokenStandardId });
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    setFormData({ ...formData, documents: [...formData.documents, ...files] });
  };
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...formData.documents];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, documents: updatedFiles });
  };
  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);
  
  // Mock async handlers
  const handleUploadToIpfs = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setFormData({ ...formData, ipfsHash: 'QmZ9Uks7gVCpRSHzbstBPJdBU7VV6QaGRZBDHJAhM9Ltwm' });
      }
    }, 300);
  };
  const handleVerifyIdentity = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setFormData({ ...formData, isIdentityVerified: true });
    }, 2000);
  };
  const handleMintToken = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setFormData({ ...formData, txHash: '0x3a4e8b6d7c9f0e1d2b3a4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b' });
    }, 3000);
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 0: return !!(formData.assetType && formData.assetName && formData.assetValue && formData.legalOwner && formData.tokenStandard);
      case 1: return formData.documents.length > 0 && !!formData.ipfsHash;
      case 2: return formData.isIdentityVerified;
      case 3: return true;
      default: return false;
    }
  };

  // Track mouse movement for parallax doodles
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = (e.clientY - bounds.top) / bounds.height;
    setMouse({ x, y });
  }

  // --- Doodle Background (Memoized for Performance) ---
  const doodleElements = useMemo(() => {
    const doodleSvgs = [
      (props: React.SVGProps<SVGSVGElement>) => <svg width={60} height={42} viewBox="0 0 120 80" fill="none" {...props}><rect x="10" y="20" width="100" height="40" rx="15" stroke="#18181b" strokeWidth="4.5" fill="none" /><circle cx="35" cy="40" r="11" stroke="#18181b" strokeWidth="3.5" fill="none" /><circle cx="85" cy="40" r="11" stroke="#18181b" strokeWidth="3.5" fill="none" /><rect x="28" y="33" width="6" height="18" rx="2" fill="#18181b" /><rect x="33" y="38" width="18" height="6" rx="2" fill="#18181b" /><circle cx="85" cy="40" r="4.5" fill="#18181b" /><circle cx="100" cy="30" r="5" stroke="#18181b" strokeWidth="3" fill="none" /></svg>,
      (props: React.SVGProps<SVGSVGElement>) => <svg width={45} height={55} viewBox="0 0 90 110" fill="none" {...props}><rect x="10" y="10" width="70" height="90" rx="8" stroke="#18181b" strokeWidth="4" fill="none" /><path d="M20 30 h50" stroke="#18181b" strokeWidth="3" /><text x="45" y="55" textAnchor="middle" fontSize="22" fontFamily="monospace" fill="#18181b">NFT</text><circle cx="45" cy="80" r="15" stroke="#18181b" strokeWidth="3" fill="none" /><path d="M45 70 v20" stroke="#18181b" strokeWidth="3" /></svg>,
      (props: React.SVGProps<SVGSVGElement>) => <svg width={32} height={44} viewBox="0 0 60 80" fill="none" {...props}><polygon points="30,10 55,40 30,70 5,40" stroke="#18181b" strokeWidth="4" fill="none" /><polygon points="30,10 30,70 55,40" stroke="#18181b" strokeWidth="2.5" fill="none" /></svg>,
      (props: React.SVGProps<SVGSVGElement>) => <svg width={32} height={40} viewBox="0 0 60 80" fill="none" {...props}><rect x="15" y="35" width="30" height="30" rx="8" stroke="#18181b" strokeWidth="4" fill="none" /><ellipse cx="30" cy="35" rx="16" ry="14" stroke="#18181b" strokeWidth="3" fill="none" /><circle cx="30" cy="55" r="5" fill="#18181b" /></svg>,
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
  }, [mouse.x, mouse.y]); // Dependency array ensures this only recalculates when mouse moves

  // --- Steps ---
  const steps = [
    { id: 'asset-details', name: 'Asset Details' },
    { id: 'document-upload', name: 'Documents' },
    { id: 'compliance', name: 'Compliance' },
    { id: 'tokenization', name: 'Tokenize' }
  ];

  return (
    <div className="bg-white min-h-screen font-sans relative overflow-hidden" onMouseMove={handleMouseMove}>
      {doodleElements}

      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-black tracking-tight">Register Your Asset</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Follow the steps to tokenize your asset and access DeFi liquidity.</p>
        </div>

        {/* --- Progress Steps --- */}
        <nav aria-label="Progress" className="mb-12">
          <ol className="flex items-center justify-center gap-8">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="flex flex-col items-center group cursor-pointer" onClick={() => setCurrentStep(stepIdx)}>
                <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4 transition-all duration-300 ${
                    stepIdx < currentStep ? 'border-green-600 bg-green-100' :
                    stepIdx === currentStep ? 'border-blue-700 bg-blue-100 scale-110' :
                    'border-gray-300 bg-white group-hover:border-gray-400'
                  } shadow-md mb-2`}>
                  {stepIdx < currentStep ?
                    <CircleCheck className="w-10 h-10 text-green-700" /> :
                    <span className={`text-2xl font-extrabold ${stepIdx === currentStep ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'}`}>
                      {stepIdx + 1}
                    </span>
                  }
                </div>
                <span className={`text-base font-bold transition-colors duration-300 ${
                    stepIdx < currentStep ? 'text-green-700' :
                    stepIdx === currentStep ? 'text-blue-700' :
                    'text-gray-500 group-hover:text-gray-700'
                  }`}>{step.name}</span>
              </li>
            ))}
          </ol>
        </nav>

        {/* --- Main Content Area --- */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-8">
          {/* --- Step 1: Asset Details --- */}
          {currentStep === 0 && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Asset Type</label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {assetTypes.map(type => (
                    <div key={type.id} onClick={() => handleAssetTypeSelect(type.id)} className={`relative rounded-lg border-2 p-4 cursor-pointer flex items-center transition-all ${formData.assetType === type.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-gray-400'}`}>
                      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 text-black"><span className="text-xl">{type.icon}</span></div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-bold text-gray-900">{type.name}</h3>
                        <p className="mt-1 text-sm text-gray-600">{type.description}</p>
                      </div>
                      {formData.assetType === type.id && <div className="absolute top-2 right-2"><CircleCheck className="h-5 w-5 text-blue-600" /></div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="assetName" className="block text-sm font-bold text-gray-800">Asset Name</label>
                  <input type="text" name="assetName" id="assetName" value={formData.assetName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., Downtown Office Building"/>
                </div>
                <div>
                  <label htmlFor="assetValue" className="block text-sm font-bold text-gray-800">Estimated Value (USD)</label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 sm:text-sm">$</span></div>
                    <input type="number" name="assetValue" id="assetValue" value={formData.assetValue} onChange={handleInputChange} className="block w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="500,000"/>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="legalOwner" className="block text-sm font-bold text-gray-800">Legal Owner</label>
                  <input type="text" name="legalOwner" id="legalOwner" value={formData.legalOwner} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., ABC Properties LLC"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">Token Standard</label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {tokenStandards.map(standard => (
                    <div key={standard.id} onClick={() => handleTokenStandardSelect(standard.id)} className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${formData.tokenStandard === standard.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-300 hover:border-gray-400'}`}>
                      <h3 className="text-sm font-bold text-gray-900">{standard.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{standard.description}</p>
                      {formData.tokenStandard === standard.id && <div className="absolute top-2 right-2"><CircleCheck className="h-5 w-5 text-blue-600" /></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* --- Step 2: Document Upload --- */}
          {currentStep === 1 && (
             <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <FileIcon className="h-12 w-12 text-gray-400" />
                    <label htmlFor="file-upload" className="mt-4 relative cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800">
                        <span>Browse Files</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileUpload} />
                    </label>
                    <p className="mt-2 text-xs text-gray-500">PDF, JPG, PNG up to 10MB each</p>
                </div>

                {formData.documents.length > 0 && (
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-2">Uploaded Documents</h3>
                        <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                            {formData.documents.map((file, index) => (
                                <li key={index} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                        <FileIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                                        <span className="ml-2 w-0 flex-1 truncate">{file.name}</span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0"><button type="button" onClick={() => handleRemoveFile(index)} className="font-medium text-red-600 hover:text-red-500">Remove</button></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {formData.documents.length > 0 && !formData.ipfsHash && (
                    <div className="flex justify-center pt-4">
                        <button type="button" onClick={handleUploadToIpfs} disabled={isUploading} className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400">
                            {isUploading ? <><Spinner /> Uploading... {uploadProgress}%</> : <><UploadIcon className="h-5 w-5 mr-2" /> Securely Upload</>}
                        </button>
                    </div>
                )}
                
                {formData.ipfsHash && (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0"><CircleCheck className="h-5 w-5 text-green-500" /></div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">Documents Uploaded Successfully</h3>
                                <div className="mt-2 text-sm text-green-700"><p className="font-mono text-xs break-all">IPFS Hash: {formData.ipfsHash}</p></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
          )}
          {/* --- Step 3: Compliance --- */}
          {currentStep === 2 && (
             <div className="space-y-6">
                <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0"><ShieldIcon className="h-5 w-5 text-blue-500" /></div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className="text-sm text-blue-700">To comply with regulations, please complete identity verification (KYC).</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg border-2 p-6 text-center ${formData.isIdentityVerified ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                    <h3 className="text-lg font-bold text-gray-900">Identity Verification (KYC)</h3>
                    <p className="mt-2 text-sm text-gray-600">Verify your identity using our secure provider. This typically takes 2-5 minutes.</p>
                    {formData.isIdentityVerified ? 
                        <div className="mt-4 text-sm font-semibold text-green-700 inline-flex items-center">
                            <CircleCheck className="h-5 w-5 mr-2" /> Verified
                        </div> :
                        <button type="button" onClick={handleVerifyIdentity} disabled={isVerifying} className="mt-6 inline-flex items-center rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400">
                            {isVerifying ? <><Spinner /> Verifying...</> : 'Start Verification'}
                        </button>
                    }
                </div>
            </div>
          )}
          {/* --- Step 4: Tokenization --- */}
          {currentStep === 3 && (
             <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">Review and Mint Your Token</h3>
                  <p className="mt-2 text-sm text-gray-600">You're ready to mint! This creates an on-chain representation of your asset.</p>
                </div>
                
                {/* --- Asset Summary --- */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                    <div className="sm:col-span-1"><dt className="text-sm font-medium text-gray-500">Asset Name</dt><dd className="mt-1 text-sm font-semibold text-gray-900">{formData.assetName}</dd></div>
                    <div className="sm:col-span-1"><dt className="text-sm font-medium text-gray-500">Asset Value</dt><dd className="mt-1 text-sm font-semibold text-gray-900">${formData.assetValue}</dd></div>
                    <div className="sm:col-span-1"><dt className="text-sm font-medium text-gray-500">Legal Owner</dt><dd className="mt-1 text-sm font-semibold text-gray-900">{formData.legalOwner}</dd></div>
                    <div className="sm:col-span-1"><dt className="text-sm font-medium text-gray-500">Token Standard</dt><dd className="mt-1 text-sm font-semibold text-gray-900">{tokenStandards.find(s => s.id === formData.tokenStandard)?.name}</dd></div>
                  </dl>
                </div>

                {!formData.txHash ?
                  <div className="flex justify-center pt-4">
                    <button type="button" onClick={handleMintToken} disabled={isMinting} className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400">
                        {isMinting ? <><Spinner /> Minting Token...</> : <><CoinsIcon className="h-5 w-5 mr-2" /> Mint RWA Token</>}
                    </button>
                  </div>
                :
                  <div className="rounded-md bg-green-50 p-4">
                      <div className="flex">
                          <div className="flex-shrink-0"><CircleCheck className="h-5 w-5 text-green-500" /></div>
                          <div className="ml-3">
                              <h3 className="text-sm font-medium text-green-800">Token Successfully Minted!</h3>
                              <div className="mt-2 text-sm text-green-700"><p className="font-mono text-xs break-all">Tx Hash: {formData.txHash}</p></div>
                              <div className="mt-4"><Link to="/borrow" className="text-sm font-bold text-blue-600 hover:text-blue-500">Proceed to Borrow &rarr;</Link></div>
                          </div>
                      </div>
                  </div>
                }
            </div>
          )}
        </div>
        
        {/* --- Navigation --- */}
        <div className="mt-8 flex justify-between">
            <button type="button" onClick={handlePrevStep} disabled={currentStep === 0} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                Back
            </button>
             {currentStep < steps.length - 1 ? (
                <button type="button" onClick={handleNextStep} disabled={!isStepComplete()} className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400">
                    Next <ChevronRightIcon className="ml-2 h-5 w-5" />
                </button>
             ) : (
                <Link to="/dashboard" className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800">
                    Go to Dashboard <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Link>
             )}
        </div>
      </div>
    </div>
  );
}