import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRightIcon,
  CheckCircleIcon,
  FileIcon,
  UploadIcon,
  ShieldIcon,
  CoinsIcon,
  AlertCircleIcon,
  Loader2,
} from 'lucide-react';

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

  const handleInputChange = (e: ChangeEvent < HTMLInputElement | HTMLTextAreaElement > ) => {
    const {
      name,
      value
    } = e.target;
    setFormData({ ...formData,
      [name]: value
    });
  };

  const handleAssetTypeSelect = (assetTypeId: string) => {
    setFormData({ ...formData,
      assetType: assetTypeId
    });
  };

  const handleTokenStandardSelect = (tokenStandardId: string) => {
    setFormData({ ...formData,
      tokenStandard: tokenStandardId
    });
  };

  const handleFileUpload = (e: ChangeEvent < HTMLInputElement > ) => {
    const files = Array.from(e.target.files || []) as File[];
    setFormData({ ...formData,
      documents: [...formData.documents, ...files]
    });
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...formData.documents];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData,
      documents: updatedFiles
    });
  };

  const handleUploadToIpfs = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setFormData({ ...formData,
          ipfsHash: 'QmZ9Uks7gVCpRSHzbstBPJdBU7VV6QaGRZBDHJAhM9Ltwm'
        });
      }
    }, 500);
  };

  const handleVerifyIdentity = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setFormData({ ...formData,
        isIdentityVerified: true
      });
    }, 2000);
  };

  const handleVerifyCompliance = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setFormData({ ...formData,
        isComplianceVerified: true
      });
    }, 2000);
  };

  const handleMintToken = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setFormData({ ...formData,
        txHash: '0x3a4e8b6d7c9f0e1d2b3a4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b'
      });
    }, 3000);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 0:
        return formData.assetType && formData.assetName && formData.assetValue && formData.legalOwner && formData.tokenStandard;
      case 1:
        return formData.documents.length > 0 && formData.ipfsHash;
      case 2:
        return formData.isIdentityVerified && formData.isComplianceVerified;
      case 3:
        return true;
      default:
        return false;
    }
  };

  // Helper for primary (blue) button classes
  const primaryButtonClasses = (disabled = false) =>
    `inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-black transition-all duration-300 ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`;

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tokenize Your Asset
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Follow our secure process to bring your real-world assets on-chain.
          </p>
        </div>

        {/* High-Contrast Progress Stepper */}
        <nav aria-label="Progress" className="mb-16">
          <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > stepIdx ? (
                  <div className="group flex flex-col border-l-4 border-gray-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
                    <span className="text-sm font-medium text-gray-400">Step {stepIdx + 1}</span>
                    <span className="text-sm font-medium text-gray-300">{step.name}</span>
                  </div>
                ) : currentStep === stepIdx ? (
                  <div className="flex flex-col border-l-4 border-blue-500 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0" aria-current="step">
                    <span className="text-sm font-medium text-blue-400">Step {stepIdx + 1}</span>
                    <span className="text-sm font-medium text-white">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex flex-col border-l-4 border-gray-800 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
                    <span className="text-sm font-medium text-gray-600">Step {stepIdx + 1}</span>
                    <span className="text-sm font-medium text-gray-600">{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="bg-gray-900/50 ring-1 ring-gray-700 overflow-hidden sm:rounded-2xl">
          {/* Step 1: Asset Details */}
          {currentStep === 0 && (
            <div className="px-4 py-5 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-6">1. Asset Details</h2>
              <div className="space-y-10">
                {/* Asset Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Asset Type</label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {assetTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => handleAssetTypeSelect(type.id)}
                        className={`relative rounded-lg border p-5 cursor-pointer flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-1
                          ${formData.assetType === type.id ? 'border-blue-500 bg-gray-800 ring-2 ring-blue-500' : 'border-gray-700 hover:border-gray-500 bg-gray-800/50'}`}
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-gray-700 mb-4">
                          <span className="text-3xl">{type.icon}</span>
                        </div>
                        <h3 className="text-sm font-medium text-white">{type.name}</h3>
                        <p className="mt-1 text-sm text-gray-400">{type.description}</p>
                        {formData.assetType === type.id && <CheckCircleIcon className="absolute top-4 right-4 h-5 w-5 text-blue-400" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Asset Details Form */}
                <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="assetName" className="block text-sm font-medium text-gray-300">Asset Name</label>
                    <input type="text" name="assetName" id="assetName" value={formData.assetName} onChange={handleInputChange} className="mt-1 bg-gray-800 text-white block w-full sm:text-sm border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Downtown Office Building" />
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="assetValue" className="block text-sm font-medium text-gray-300">Estimated Value (USD)</label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-400 sm:text-sm">$</span></div>
                      <input type="text" name="assetValue" id="assetValue" value={formData.assetValue} onChange={handleInputChange} className="mt-1 bg-gray-800 text-white block w-full sm:text-sm border-gray-600 rounded-md pl-7 pr-12 focus:ring-blue-500 focus:border-blue-500" placeholder="0.00" />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="text-gray-400 sm:text-sm">USD</span></div>
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="assetDescription" className="block text-sm font-medium text-gray-300">Asset Description</label>
                    <textarea id="assetDescription" name="assetDescription" rows={3} value={formData.assetDescription} onChange={handleInputChange} className="mt-1 bg-gray-800 text-white block w-full sm:text-sm border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Provide a detailed description of your asset..." />
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="assetLocation" className="block text-sm font-medium text-gray-300">Asset Location/Address</label>
                    <input type="text" name="assetLocation" id="assetLocation" value={formData.assetLocation} onChange={handleInputChange} className="mt-1 bg-gray-800 text-white block w-full sm:text-sm border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 123 Main St, New York, NY 10001" />
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="legalOwner" className="block text-sm font-medium text-gray-300">Legal Owner</label>
                    <input type="text" name="legalOwner" id="legalOwner" value={formData.legalOwner} onChange={handleInputChange} className="mt-1 bg-gray-800 text-white block w-full sm:text-sm border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., ABC Properties LLC" />
                  </div>
                </div>

                {/* Token Standard Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Token Standard</label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {tokenStandards.map((standard) => (
                      <div
                        key={standard.id}
                        onClick={() => handleTokenStandardSelect(standard.id)}
                        className={`relative rounded-lg border p-5 cursor-pointer transition-all duration-300
                          ${formData.tokenStandard === standard.id ? 'border-blue-500 bg-gray-800 ring-2 ring-blue-500' : 'border-gray-700 hover:border-gray-500 bg-gray-800/50'}`}
                      >
                        <h3 className="font-medium text-white">{standard.name}</h3>
                        <p className="mt-1 text-sm text-gray-400">{standard.description}</p>
                        {formData.tokenStandard === standard.id && <CheckCircleIcon className="absolute top-4 right-4 h-5 w-5 text-blue-400" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Document Upload */}
          {currentStep === 1 && (
            <div className="px-4 py-5 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-6">2. Document Upload</h2>
              <div className="space-y-8">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex">
                    <AlertCircleIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-white">Document Requirements</h3>
                      <p className="mt-1 text-sm text-gray-400">Please upload documents like proof of ownership, appraisal, etc.</p>
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div className="group relative border-2 border-dashed border-gray-600 hover:border-blue-500 rounded-lg p-8 flex flex-col items-center justify-center transition-colors duration-300">
                  <FileIcon className="h-12 w-12 text-gray-500 group-hover:text-blue-400 transition-colors duration-300" />
                  <p className="mt-4 text-sm text-gray-400">Drag & drop files here, or</p>
                  <label htmlFor="file-upload" className="mt-2 relative cursor-pointer font-medium text-blue-400 hover:text-blue-300">
                    <span>Browse Files</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileUpload} />
                  </label>
                  <p className="mt-1 text-xs text-gray-500">PDF, JPG, PNG up to 10MB each</p>
                </div>

                {/* Uploaded Files List */}
                {formData.documents.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Uploaded Documents</h3>
                    <ul className="border border-gray-700 rounded-md divide-y divide-gray-700">
                      {formData.documents.map((file, index) => (
                        <li key={index} className="pl-4 pr-5 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <FileIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                            <span className="ml-3 flex-1 w-0 truncate text-white">{file.name}</span>
                          </div>
                          <button type="button" onClick={() => handleRemoveFile(index)} className="ml-4 font-medium text-red-500 hover:text-red-400 transition-colors">Remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {formData.documents.length > 0 && !formData.ipfsHash && (
                  <div className="flex justify-center pt-4">
                    <button type="button" onClick={handleUploadToIpfs} disabled={isUploading} className={primaryButtonClasses(isUploading)}>
                      {isUploading ? <><Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" /> Uploading ({uploadProgress}%)</>
                                     : <><UploadIcon className="h-5 w-5 mr-2" /> Securely Upload Documents</>}
                    </button>
                  </div>
                )}
                
                {formData.ipfsHash && (
                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                    <div className="flex">
                      <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-green-300">Upload Complete</h3>
                        <p className="mt-1 font-mono text-xs text-gray-400 break-all">{formData.ipfsHash}</p>
                        <a href={`https://ipfs.io/ipfs/${formData.ipfsHash}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-blue-400 hover:text-blue-300">View on IPFS &rarr;</a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Compliance & Identity Verification */}
          {currentStep === 2 && (
             <div className="px-4 py-5 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-6">3. Identity & Compliance</h2>
              <div className="space-y-8">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex">
                    <ShieldIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-400">Identity (KYC) and compliance (AML) checks are required for security and regulatory compliance.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className={`rounded-lg p-6 bg-gray-800/50 border ${formData.isIdentityVerified ? 'border-green-600' : 'border-gray-700'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">Identity (KYC)</h3>
                      {formData.isIdentityVerified && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300"><CheckCircleIcon className="h-4 w-4 mr-1" />Verified</span>}
                    </div>
                    <p className="text-sm text-gray-400 mb-6">Verify your identity using our secure provider.</p>
                    {!formData.isIdentityVerified && 
                      <button type="button" onClick={handleVerifyIdentity} disabled={isVerifying} className={primaryButtonClasses(isVerifying) + ' w-full'}>
                        {isVerifying ? <><Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" /> Verifying...</> : 'Start Verification'}
                      </button>
                    }
                  </div>
                  <div className={`rounded-lg p-6 bg-gray-800/50 border ${formData.isComplianceVerified ? 'border-green-600' : 'border-gray-700'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">Compliance (AML)</h3>
                      {formData.isComplianceVerified && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300"><CheckCircleIcon className="h-4 w-4 mr-1" />Verified</span>}
                    </div>
                    <p className="text-sm text-gray-400 mb-6">Complete a check to meet regulatory requirements.</p>
                    {!formData.isComplianceVerified && 
                      <button type="button" onClick={handleVerifyCompliance} disabled={isVerifying || !formData.isIdentityVerified} className={primaryButtonClasses(isVerifying || !formData.isIdentityVerified) + ' w-full'}>
                        {isVerifying ? <><Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" /> Checking...</> : 'Start Check'}
                      </button>
                    }
                  </div>
                </div>

                {formData.isIdentityVerified && formData.isComplianceVerified && (
                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                     <div className="flex">
                      <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-green-300">All Verifications Complete</h3>
                        <p className="mt-1 text-sm text-green-400">You can now proceed to the final step.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Tokenization & Minting */}
          {currentStep === 3 && (
            <div className="px-4 py-5 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-6">4. Review & Mint</h2>
              <div className="space-y-8">
                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">Final Summary</h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1"><dt className="text-sm font-medium text-gray-400">Asset Type</dt><dd className="mt-1 text-sm text-white">{assetTypes.find(type => type.id === formData.assetType)?.name || 'N/A'}</dd></div>
                    <div className="sm:col-span-1"><dt className="text-sm font-medium text-gray-400">Asset Name</dt><dd className="mt-1 text-sm text-white">{formData.assetName}</dd></div>
                    <div className="sm:col-span-1"><dt className="text-sm font-medium text-gray-400">Estimated Value</dt><dd className="mt-1 text-sm text-white">${formData.assetValue}</dd></div>
                    <div className="sm:col-span-1"><dt className="text-sm font-medium text-gray-400">Token Standard</dt><dd className="mt-1 text-sm text-white">{tokenStandards.find(std => std.id === formData.tokenStandard)?.name || 'N/A'}</dd></div>
                  </dl>
                </div>

                <div className="text-center pt-4">
                  {!formData.txHash ? (
                    <>
                    <p className="text-gray-400 mb-6">You are ready to mint your RWA token on the blockchain.</p>
                    <button type="button" onClick={handleMintToken} disabled={isMinting} className={primaryButtonClasses(isMinting)}>
                      {isMinting ? <><Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" /> Minting Token...</> : <><CoinsIcon className="h-5 w-5 mr-2" /> Mint RWA Token</>}
                    </button>
                    </>
                  ) : (
                    <div className="bg-green-900/20 border border-green-700 rounded-lg p-6 max-w-2xl mx-auto">
                      <div className="text-center">
                        <CheckCircleIcon className="h-8 w-8 text-green-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-green-300">Token Minted!</h3>
                        <p className="mt-2 text-sm text-green-400">Your asset is now represented on-chain.</p>
                        <p className="mt-4 font-mono text-xs text-gray-400 break-all">Tx: {formData.txHash}</p>
                        <div className="mt-6 flex justify-center items-center gap-6">
                          <a href={`https://etherscan.io/tx/${formData.txHash}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-400 hover:text-blue-300">View on Etherscan</a>
                          <Link to="/borrow" className={primaryButtonClasses()}>
                            Proceed to Borrow
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="px-4 py-4 sm:px-8 bg-gray-900/50 border-t border-gray-700 flex justify-between items-center">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className={`inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Back
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={!isStepComplete()}
                className={primaryButtonClasses(!isStepComplete())}
              >
                Next Step <ChevronRightIcon className="ml-2 h-5 w-5" />
              </button>
            ) : formData.txHash && (
              <Link to="/dashboard" className={primaryButtonClasses()}>
                Go to Dashboard <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}