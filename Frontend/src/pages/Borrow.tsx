import React, { useState } from 'react';
import { CheckCircleIcon, AlertCircleIcon, ArrowRightIcon, UploadIcon } from 'lucide-react';
const rwaOptions = [{
  id: 'real-estate',
  name: 'Tokenized Real Estate',
  description: 'Commercial property in New York, tokenized and verified on-chain',
  image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
  value: 2500000,
  maxLTV: 0.7
}, {
  id: 'invoice',
  name: 'Invoice Factoring',
  description: 'Tokenized invoice from Fortune 500 company due in 60 days',
  image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB-8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
  value: 150000,
  maxLTV: 0.85
}, {
  id: 'carbon-credits',
  name: 'Carbon Credits',
  description: 'Verified carbon offset credits from renewable energy project',
  image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
  value: 75000,
  maxLTV: 0.6
}];
export function BorrowPage() {
	const [selectedAsset, setSelectedAsset] = useState(rwaOptions[0]);
	const [borrowAmount, setBorrowAmount] = useState('');
	const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const handleAssetSelect = (asset : any) => {
		setSelectedAsset(asset);
		setBorrowAmount('');
		setIsDocumentUploaded(false);
		setIsVerified(false);
	};
	const handleDocumentUpload = () => {
		setIsDocumentUploaded(true);
		// Simulate verification process
		setTimeout(() => {
			setIsVerified(true);
		}, 1500);
	};
	const calculateLTV = () => {
		if (!borrowAmount || isNaN(parseFloat(borrowAmount))) return 0;
		return parseFloat(borrowAmount) / selectedAsset.value * 100;
	};
	const ltv = calculateLTV();
	const isLTVSafe = ltv <= selectedAsset.maxLTV * 100;
	const maxBorrowAmount = selectedAsset.value * selectedAsset.maxLTV;
	return (
		<div className="min-h-screen w-full bg-[#000000] text-[#ffffff] py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Borrow Against Your Real-World Assets
        </h1>
        <p className="mt-4 text-xl text-gray-400">
          Use your tokenized RWAs as collateral to access DeFi liquidity
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Asset Selection */}
        <div className="bg-[#202124] shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-white">
              Select Collateral Asset
            </h2>
            <div className="mt-4 space-y-4">
              {rwaOptions.map(asset => <div key={asset.id} onClick={() => handleAssetSelect(asset)} className={`relative rounded-lg border p-4 cursor-pointer flex items-start transition-colors duration-200 ${selectedAsset.id === asset.id ? 'border-white bg-[#000000]' : 'border-gray-700 hover:border-gray-600'}`}>
                  <div className="flex-shrink-0">
                    <img src={asset.image} alt={asset.name} className="h-16 w-16 rounded object-cover" />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-white">
                      {asset.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {asset.description}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">
                      Value: ${asset.value.toLocaleString()}
                    </p>
                  </div>
                  {selectedAsset.id === asset.id && <div className="absolute top-4 right-4">
                      <CheckCircleIcon className="h-5 w-5 text-white" />
                    </div>}
                </div>)}
            </div>
          </div>
        </div>
        {/* AI Agent Valuation */}
        <div className="bg-[#202124] shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-white">
              AI Agent Valuation
            </h2>
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                  Asset Value
                </span>
                <span className="text-sm font-bold text-white">
                  ${selectedAsset.value.toLocaleString()}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                  Max LTV Ratio
                </span>
                <span className="text-sm font-bold text-white">
                  {selectedAsset.maxLTV * 100}%
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">
                  Max Borrow Amount
                </span>
                <span className="text-sm font-bold text-white">
                  ${maxBorrowAmount.toLocaleString()}
                </span>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-400">
                    Current LTV
                  </span>
                  <span className={`text-sm font-bold ${isLTVSafe ? 'text-green-500' : 'text-red-500'}`}>
                    {ltv.toFixed(2)}%
                  </span>
                </div>
                <div className="mt-2 relative h-4 rounded-full overflow-hidden bg-gray-700">
                  <div className={`absolute h-full ${isLTVSafe ? 'bg-green-500' : 'bg-red-500'}`} style={{
                  width: `${Math.min(ltv / selectedAsset.maxLTV, 100)}%`
                }}></div>
                  <div className="absolute h-full border-r-2 border-gray-600" style={{
                  left: `${selectedAsset.maxLTV * 100}%`
                }}></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>0%</span>
                  <span>Safe Zone</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#000000] rounded-md border border-gray-700">
                <h3 className="text-sm font-medium text-white">
                  AI Appraisal Report
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Our AI has analyzed this {selectedAsset.name.toLowerCase()}{' '}
                  using data from Pyth Network oracle and determined it is a{' '}
                  {isLTVSafe ? 'low' : 'moderate'} risk asset with
                  {isLTVSafe ? ' strong' : ' potential'} liquidity
                  characteristics.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Data & Compliance + Borrow Form */}
        <div className="bg-[#202124] shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-white">
              Data & Compliance
            </h2>
            <div className="mt-4">
              <button type="button" onClick={handleDocumentUpload} className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload Verification Documents
              </button>
              <div className="mt-4 flex items-center">
                {isDocumentUploaded ? <>
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <span className="ml-2 text-sm text-green-500">
                      Documents uploaded to Filecoin
                    </span>
                  </> : <>
                    <AlertCircleIcon className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">
                      No documents uploaded
                    </span>
                  </>}
              </div>
              <div className={`mt-4 flex items-center ${isVerified ? '' : 'opacity-50'}`}>
                {isVerified ? <div className="flex items-center px-3 py-1 rounded-full bg-green-900 text-green-300">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">
                      Verified & Compliant
                    </span>
                  </div> : <div className="flex items-center px-3 py-1 rounded-full bg-gray-700 text-gray-400">
                    <span className="text-xs font-medium">
                      Pending Verification
                    </span>
                  </div>}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-medium text-white">
                Borrow Amount
              </h2>
              <div className="mt-2">
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">$</span>
                  </div>
                  <input type="text" value={borrowAmount} onChange={e => setBorrowAmount(e.target.value)} className="bg-gray-700 text-white focus:ring-white focus:border-white block w-full pl-7 pr-12 sm:text-sm border-gray-600 rounded-md" placeholder="0.00" aria-describedby="price-currency" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm" id="price-currency">
                      USDC
                    </span>
                  </div>
                </div>
                {borrowAmount && parseFloat(borrowAmount) > maxBorrowAmount && <p className="mt-2 text-sm text-red-500">
                    Amount exceeds maximum borrowing capacity
                  </p>}
              </div>
              <div className="mt-6">
                <button type="button" disabled={!isVerified || !borrowAmount || parseFloat(borrowAmount) > maxBorrowAmount} className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white
                    ${!isVerified || !borrowAmount || parseFloat(borrowAmount) > maxBorrowAmount ? 'bg-gray-700 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'}`}>
                  Borrow
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
			</div>
			</div>
		</div>
	);
}
