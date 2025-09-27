import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, CheckCircleIcon, FileIcon, UploadIcon, ShieldIcon, CoinsIcon, AlertCircleIcon } from 'lucide-react';
// Define the steps for the registration process
const steps = [{
  id: 'asset-details',
  name: 'Asset Details',
  description: 'Provide information about your asset'
}, {
  id: 'document-upload',
  name: 'Document Upload',
  description: 'Upload supporting documentation'
}, {
  id: 'compliance',
  name: 'Compliance',
  description: 'Complete identity verification'
}, {
  id: 'tokenization',
  name: 'Tokenization',
  description: 'Review and mint your RWA token'
}];
// Asset types available for tokenization
const assetTypes = [{
  id: 'real-estate',
  name: 'Real Estate',
  description: 'Commercial or residential property',
  icon: '🏢'
}, {
  id: 'invoice',
  name: 'Invoice',
  description: 'Accounts receivable or factoring',
  icon: '📄'
}, {
  id: 'carbon-credits',
  name: 'Carbon Credits',
  description: 'Verified carbon offset credits',
  icon: '🌿'
}, {
  id: 'commodities',
  name: 'Commodities',
  description: 'Physical goods like gold or oil',
  icon: '🪙'
}];
// Token standards available
const tokenStandards = [{
  id: 'erc721',
  name: 'ERC-721 (NFT)',
  description: 'Non-fungible token for unique assets'
}, {
  id: 'erc20',
  name: 'ERC-20',
  description: 'Fungible token for fractionalized ownership'
}];
export function RwaRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);
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
    txHash: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleAssetTypeSelect = (assetTypeId: string) => {
    setFormData({
      ...formData,
      assetType: assetTypeId
    });
  };
  const handleTokenStandardSelect = (tokenStandardId: string) => {
    setFormData({
      ...formData,
      tokenStandard: tokenStandardId
    });
  };
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    setFormData({
      ...formData,
      documents: [...formData.documents, ...files]
    });
  };
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...formData.documents];
    updatedFiles.splice(index, 1);
    setFormData({
      ...formData,
      documents: updatedFiles
    });
  };
  const handleUploadToIpfs = () => {
    setIsUploading(true);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        // Mock IPFS hash
        setFormData({
          ...formData,
          ipfsHash: 'QmZ9Uks7gVCpRSHzbstBPJdBU7VV6QaGRZBDHJAhM9Ltwm'
        });
      }
    }, 500);
  };
  const handleVerifyIdentity = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setFormData({
        ...formData,
        isIdentityVerified: true
      });
    }, 2000);
  };
  const handleVerifyCompliance = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setFormData({
        ...formData,
        isComplianceVerified: true
      });
    }, 2000);
  };
  const handleMintToken = () => {
    setIsMinting(true);
    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false);
      setFormData({
        ...formData,
        txHash: '0x3a4e8b6d7c9f0e1d2b3a4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b'
      });
    }, 3000);
  };
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  // Check if the current step is complete and we can proceed
  const isStepComplete = () => {
    switch (currentStep) {
      case 0:
        // Asset Details
        return formData.assetType && formData.assetName && formData.assetValue && formData.legalOwner && formData.tokenStandard;
      case 1:
        // Document Upload
        return formData.documents.length > 0 && formData.ipfsHash;
      case 2:
        // Compliance
        return formData.isIdentityVerified && formData.isComplianceVerified;
      case 3:
        // Tokenization
        return true;
      default:
        return false;
    }
  };
  return <div className="bg-[#000000] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Register & Verify Your Real-World Asset
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Follow our step-by-step process to tokenize your asset and access
            DeFi liquidity
          </p>
        </div>
        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-12">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => <li key={step.id} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} ${stepIdx !== 0 ? 'pl-8 sm:pl-20' : ''}`}>
                {stepIdx !== steps.length - 1 && <div className="absolute top-4 left-4 -ml-px mt-0.5 h-0.5 w-full sm:w-full bg-gray-700" aria-hidden="true" />}
                <div className={`relative flex items-center ${stepIdx < currentStep ? 'group' : ''}`}>
                  <span className="h-9 flex items-center">
                    <span className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full ${stepIdx < currentStep ? 'bg-white text-black' : stepIdx === currentStep ? 'bg-white text-black' : 'bg-blue-700 text-gray-400'}`}>
                      {stepIdx < currentStep ? <CheckCircleIcon className="w-5 h-5" aria-hidden="true" /> : <span>{stepIdx + 1}</span>}
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className={`text-sm font-medium ${stepIdx < currentStep ? 'text-white' : stepIdx === currentStep ? 'text-white' : 'text-gray-400'}`}>
                      {step.name}
                    </span>
                    <span className="text-sm text-gray-400">
                      {step.description}
                    </span>
                  </span>
                </div>
              </li>)}
          </ol>
        </nav>
        <div className="bg-[#202124] shadow overflow-hidden sm:rounded-lg">
          {/* Step 1: Asset Details */}
          {currentStep === 0 && <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-white mb-6">
                Asset Details
              </h2>
              <div className="space-y-8">
                {/* Asset Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Asset Type
                  </label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {assetTypes.map(type => <div key={type.id} onClick={() => handleAssetTypeSelect(type.id)} className={`relative rounded-lg border p-4 cursor-pointer flex ${formData.assetType === type.id ? 'border-white bg-[#000000]' : 'border-gray-700 hover:border-gray-500'}`}>
                        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-white text-black">
                          <span className="text-2xl">{type.icon}</span>
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-white">
                            {type.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-400">
                            {type.description}
                          </p>
                        </div>
                        {formData.assetType === type.id && <div className="absolute top-4 right-4">
                            <CheckCircleIcon className="h-5 w-5 text-white" />
                          </div>}
                      </div>)}
                  </div>
                </div>
                {/* Asset Details Form */}
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="assetName" className="block text-sm font-medium text-white">
                      Asset Name
                    </label>
                    <div className="mt-1">
                      <input type="text" name="assetName" id="assetName" value={formData.assetName} onChange={handleInputChange} className="bg-gray-700 text-white shadow-sm focus:ring-white focus:border-white block w-full sm:text-sm border-gray-600 rounded-md" placeholder="e.g., Downtown Office Building" />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="assetValue" className="block text-sm font-medium text-white">
                      Estimated Value (USD)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input type="text" name="assetValue" id="assetValue" value={formData.assetValue} onChange={handleInputChange} className="bg-gray-700 text-white focus:ring-white focus:border-white block w-full pl-7 pr-12 sm:text-sm border-gray-600 rounded-md" placeholder="0.00" />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">USD</span>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="assetDescription" className="block text-sm font-medium text-white">
                      Asset Description
                    </label>
                    <div className="mt-1">
                      <textarea id="assetDescription" name="assetDescription" rows={3} value={formData.assetDescription} onChange={handleInputChange} className="bg-gray-700 text-white shadow-sm focus:ring-white focus:border-white block w-full sm:text-sm border-gray-600 rounded-md" placeholder="Provide a detailed description of your asset" />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="assetLocation" className="block text-sm font-medium text-white">
                      Asset Location/Address
                    </label>
                    <div className="mt-1">
                      <input type="text" name="assetLocation" id="assetLocation" value={formData.assetLocation} onChange={handleInputChange} className="bg-gray-700 text-white shadow-sm focus:ring-white focus:border-white block w-full sm:text-sm border-gray-600 rounded-md" placeholder="e.g., 123 Main St, New York, NY 10001" />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="legalOwner" className="block text-sm font-medium text-white">
                      Legal Owner
                    </label>
                    <div className="mt-1">
                      <input type="text" name="legalOwner" id="legalOwner" value={formData.legalOwner} onChange={handleInputChange} className="bg-gray-700 text-white shadow-sm focus:ring-white focus:border-white block w-full sm:text-sm border-gray-600 rounded-md" placeholder="e.g., ABC Properties LLC" />
                    </div>
                  </div>
                </div>
                {/* Token Standard Selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Token Standard
                  </label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {tokenStandards.map(standard => <div key={standard.id} onClick={() => handleTokenStandardSelect(standard.id)} className={`relative rounded-lg border p-4 cursor-pointer ${formData.tokenStandard === standard.id ? 'border-white bg-[#000000]' : 'border-gray-700 hover:border-gray-500'}`}>
                        <div className="flex items-center">
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-white">
                              {standard.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                              {standard.description}
                            </p>
                          </div>
                          {formData.tokenStandard === standard.id && <div className="ml-3">
                              <CheckCircleIcon className="h-5 w-5 text-white" />
                            </div>}
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>}
          {/* Step 2: Document Upload */}
          {currentStep === 1 && <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-white mb-6">
                Document Upload
              </h2>
              <div className="space-y-8">
                <div className="bg-[#000000] rounded-md p-4 border border-gray-700">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-white">
                        Document Requirements
                      </h3>
                      <div className="mt-2 text-sm text-gray-400">
                        <p>
                          Please upload the following documents to verify your
                          asset:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Proof of ownership (deed, title, etc.)</li>
                          <li>Recent professional appraisal (if available)</li>
                          <li>Insurance documentation</li>
                          <li>Any additional supporting documents</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-700 rounded-md p-6 flex flex-col items-center justify-center">
                  <FileIcon className="h-12 w-12 text-gray-400" />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-400">
                      Drag and drop files here, or
                    </p>
                    <label htmlFor="file-upload" className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white cursor-pointer">
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Browse Files
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileUpload} />
                    </label>
                    <p className="mt-1 text-xs text-gray-400">
                      PDF, JPG, PNG up to 10MB each
                    </p>
                  </div>
                </div>
                {/* Uploaded Files List */}
                {formData.documents.length > 0 && <div>
                    <h3 className="text-sm font-medium text-white mb-3">
                      Uploaded Documents
                    </h3>
                    <ul className="border rounded-md divide-y divide-gray-700">
                      {formData.documents.map((file, index) => <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <FileIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 flex-1 w-0 truncate text-gray-400">
                              {file.name}
                            </span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button type="button" onClick={() => handleRemoveFile(index)} className="font-medium text-red-500 hover:text-red-400">
                              Remove
                            </button>
                          </div>
                        </li>)}
                    </ul>
                  </div>}
                {/* Upload to IPFS Button */}
                {formData.documents.length > 0 && !formData.ipfsHash && <div className="flex justify-center">
                    <button type="button" onClick={handleUploadToIpfs} disabled={isUploading} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                      {isUploading ? <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading to Decentralized Storage... {uploadProgress}
                          %
                        </> : <>
                          <UploadIcon className="h-5 w-5 mr-2" />
                          Securely Upload to Decentralized Storage
                        </>}
                    </button>
                  </div>}
                {/* IPFS Hash Display */}
                {formData.ipfsHash && <div className="bg-green-950 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-300">
                          Documents Uploaded Successfully
                        </h3>
                        <div className="mt-2 text-sm text-green-400">
                          <p>
                            Your documents have been securely stored on
                            IPFS/Filecoin.
                          </p>
                          <p className="mt-2 font-mono text-xs break-all">
                            IPFS Hash: {formData.ipfsHash}
                          </p>
                        </div>
                        <div className="mt-4">
                          <div className="-mx-2 -my-1.5 flex">
                            <a href={`https://ipfs.io/ipfs/${formData.ipfsHash}`} target="_blank" rel="noopener noreferrer" className="bg-green-100 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                              View on IPFS
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>}
          {/* Step 3: Compliance & Identity Verification */}
          {currentStep === 2 && <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-white mb-6">
                Identity & Compliance Verification
              </h2>
              <div className="space-y-8">
                <div className="bg-[#000000] rounded-md p-4 border border-gray-700">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ShieldIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-white">
                        Why Verification Is Required
                      </h3>
                      <div className="mt-2 text-sm text-gray-400">
                        <p>
                          To comply with regulations and ensure the security of
                          our platform, we require all users to complete
                          identity verification (KYC) and compliance checks
                          before tokenizing real-world assets.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Identity Verification */}
                  <div className={`border rounded-lg p-6 bg-[#202124] ${formData.isIdentityVerified ? 'border-green-500' : 'border-gray-700'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">
                        Identity Verification (KYC)
                      </h3>
                      {formData.isIdentityVerified && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-950 text-green-300">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Verified
                        </span>}
                    </div>
                    <p className="text-sm text-gray-400 mb-6">
                      Verify your identity using our secure KYC provider. This
                      typically takes 2-5 minutes to complete.
                    </p>
                    {formData.isIdentityVerified ? <div className="text-sm text-green-400">
                        <p>
                          Your identity has been successfully verified. Thank
                          you for completing this important step.
                        </p>
                      </div> : <button type="button" onClick={handleVerifyIdentity} disabled={isVerifying} className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                        {isVerifying ? <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                          </> : 'Start Identity Verification'}
                      </button>}
                  </div>
                  {/* Compliance Verification */}
                  <div className={`border rounded-lg p-6 bg-[#202124] ${formData.isComplianceVerified ? 'border-green-500' : 'border-gray-700'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">
                        Compliance Check (AML)
                      </h3>
                      {formData.isComplianceVerified && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-950 text-green-300">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Verified
                        </span>}
                    </div>
                    <p className="text-sm text-gray-400 mb-6">
                      Complete a compliance check to ensure your asset meets all
                      regulatory requirements for tokenization.
                    </p>
                    {formData.isComplianceVerified ? <div className="text-sm text-green-400">
                        <p>
                          Your compliance check has been successfully completed.
                          Your asset meets all regulatory requirements for
                          tokenization.
                        </p>
                      </div> : <button type="button" onClick={handleVerifyCompliance} disabled={isVerifying || !formData.isIdentityVerified} className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${!formData.isIdentityVerified ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'}`}>
                        {isVerifying ? <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                          </> : 'Start Compliance Check'}
                      </button>}
                  </div>
                </div>
                {formData.isIdentityVerified && formData.isComplianceVerified && <div className="bg-green-950 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-300">
                          All Verifications Complete
                        </h3>
                        <div className="mt-2 text-sm text-green-400">
                          <p>
                            Congratulations! You've completed all required
                            verifications. You can now proceed to tokenize
                            your asset.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>}
          {/* Step 4: Tokenization & Minting */}
          {currentStep === 3 && <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-white mb-6">
                Tokenization & Minting
              </h2>
              <div className="space-y-8">
                {/* Asset Summary */}
                <div className="bg-[#202124] rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Asset Summary
                  </h3>
                  <dl className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <dt className="text-sm font-medium text-gray-400">
                        Asset Type
                      </dt>
                      <dd className="mt-1 text-sm text-white">
                        {assetTypes.find(type => type.id === formData.assetType)?.name || ''}
                      </dd>
                    </div>
                    <div className="sm:col-span-3">
                      <dt className="text-sm font-medium text-gray-400">
                        Asset Name
                      </dt>
                      <dd className="mt-1 text-sm text-white">
                        {formData.assetName}
                      </dd>
                    </div>
                    <div className="sm:col-span-3">
                      <dt className="text-sm font-medium text-gray-400">
                        Estimated Value
                      </dt>
                      <dd className="mt-1 text-sm text-white">
                        ${formData.assetValue}
                      </dd>
                    </div>
                    <div className="sm:col-span-3">
                      <dt className="text-sm font-medium text-gray-400">
                        Legal Owner
                      </dt>
                      <dd className="mt-1 text-sm text-white">
                        {formData.legalOwner}
                      </dd>
                    </div>
                    <div className="sm:col-span-3">
                      <dt className="text-sm font-medium text-gray-400">
                        Token Standard
                      </dt>
                      <dd className="mt-1 text-sm text-white">
                        {tokenStandards.find(std => std.id === formData.tokenStandard)?.name || ''}
                      </dd>
                    </div>
                    <div className="sm:col-span-3">
                      <dt className="text-sm font-medium text-gray-400">
                        Location
                      </dt>
                      <dd className="mt-1 text-sm text-white">
                        {formData.assetLocation}
                      </dd>
                    </div>
                  </dl>
                </div>
                {/* Verification Status */}
                <div className="bg-[#202124] rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Verification Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400">
                        Documents Uploaded
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-950 text-green-300">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Complete
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400">
                        IPFS Storage
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-950 text-green-300">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Complete
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400">
                        Identity Verification
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-950 text-green-300">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Complete
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400">
                        Compliance Check
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-950 text-green-300">
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Complete
                      </span>
                    </div>
                  </div>
                </div>
                {/* Mint Token */}
                <div className="bg-[#000000] rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">
                      Mint Your RWA Token
                    </h3>
                    <CoinsIcon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-400 mb-6">
                    You're ready to mint your RWA token! This will create an
                    on-chain representation of your asset, linking it to the
                    documentation and verification you've provided.
                  </p>
                  {!formData.txHash ? <button type="button" onClick={handleMintToken} disabled={isMinting} className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                      {isMinting ? <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Minting RWA Token...
                        </> : <>
                          <CoinsIcon className="h-5 w-5 mr-2" />
                          Mint RWA Token
                        </>}
                    </button> : <div className="bg-green-950 rounded-md p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-300">
                            Token Successfully Minted!
                          </h3>
                          <div className="mt-2 text-sm text-green-400">
                            <p>
                              Your RWA token has been successfully minted on the
                              blockchain.
                            </p>
                            <p className="mt-2 font-mono text-xs break-all">
                              Transaction Hash: {formData.txHash}
                            </p>
                          </div>
                          <div className="mt-4">
                            <div className="-mx-2 -my-1.5 flex space-x-3">
                              <a href={`https://etherscan.io/tx/${formData.txHash}`} target="_blank" rel="noopener noreferrer" className="bg-green-100 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                View on Etherscan
                              </a>
                              <Link to="/borrow" className="bg-blue-100 px-2 py-1.5 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Proceed to Borrow
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                </div>
              </div>
            </div>}
          {/* Navigation */}
          <div className="px-4 py-5 sm:px-6 bg-[#202124] flex justify-between">
            <button type="button" onClick={handlePrevStep} disabled={currentStep === 0} className={`inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md ${currentStep === 0 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'}`}>
              Back
            </button>
            {currentStep < steps.length - 1 ? <button type="button" onClick={handleNextStep} disabled={!isStepComplete()} className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${!isStepComplete() ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white'}`}>
                Next
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </button> : formData.txHash ? <Link to="/dashboard" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-white text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                Go to Dashboard
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link> : null}
          </div>
        </div>
      </div>
    </div>;
}
