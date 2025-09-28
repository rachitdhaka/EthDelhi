import React, { useState } from 'react';
import { CheckCircleIcon, PlusIcon, UploadIcon } from 'lucide-react';
import { ASSET_TYPES } from '../config/contracts';

interface Asset {
  id: string;
  name: string;
  description: string;
  value: number;
  maxLTV?: number;
  image?: string;
  assetType?: string;
  symbol?: string;
  isPyth?: boolean;
  isPredefined?: boolean;
  isNew?: boolean;
  requiresUpload?: boolean;
}

interface AssetSelectorProps {
  onAssetSelect: (asset: Asset) => void;
  selectedAsset: Asset | null;
  userAssets: Asset[];
}

export function AssetSelector({ onAssetSelect, selectedAsset, userAssets }: AssetSelectorProps) {
  const [showNewAssetForm, setShowNewAssetForm] = useState(false);
  const [newAssetData, setNewAssetData] = useState({
    name: '',
    description: '',
    value: '',
    location: '',
    owner: '',
    assetType: '',
    documents: [] as File[]
  });

  const handleExistingAssetSelect = (asset: Asset) => {
    onAssetSelect(asset);
    setShowNewAssetForm(false);
  };

  const handleNewAssetSubmit = () => {
    const newAsset = {
      id: `new-${Date.now()}`,
      name: newAssetData.name,
      description: newAssetData.description,
      value: parseFloat(newAssetData.value),
      location: newAssetData.location,
      owner: newAssetData.owner,
      assetType: newAssetData.assetType,
      isNew: true,
      requiresUpload: true
    };
    
    onAssetSelect(newAsset);
    setShowNewAssetForm(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewAssetData({ ...newAssetData, documents: [...newAssetData.documents, ...files] });
  };

  return (
    <div className="space-y-6">
      {/* Existing Assets Section */}
      {userAssets.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Existing Assets</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {userAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => handleExistingAssetSelect(asset)}
                className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                  selectedAsset?.id === asset.id 
                    ? 'border-blue-600 bg-blue-50 shadow-md' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                      <span className="text-lg">
                        {asset.assetType === 'real-estate' ? '🏢' : 
                         asset.assetType === 'invoice' ? '📄' : 
                         asset.assetType === 'carbon-credits' ? '🌿' : '🪙'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-bold text-gray-900">{asset.name}</h4>
                    <p className="mt-1 text-sm text-gray-600">{asset.description}</p>
                    <p className="mt-1 text-sm font-semibold text-green-600">${asset.value?.toLocaleString()}</p>
                  </div>
                  {selectedAsset?.id === asset.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {asset.isPyth ? 'Real-time Pyth price feed' : 'ASI price feed'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Predefined Assets Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Predefined Assets</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ASSET_TYPES.map((asset) => (
            <div
              key={asset.id}
              onClick={() => handleExistingAssetSelect({
                id: asset.id,
                name: asset.name,
                description: asset.isPyth ? 'Real-time price feed via Pyth Oracle' : 'Custom asset with ASI price feed',
                value: 100000, // Default value
                assetType: asset.id,
                symbol: asset.symbol,
                isPyth: asset.isPyth,
                isPredefined: true
              })}
              className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                selectedAsset?.id === asset.id 
                  ? 'border-blue-600 bg-blue-50 shadow-md' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                    <span className="text-lg">
                      {asset.id === 'real-estate' ? '🏢' : 
                       asset.id === 'invoice' ? '📄' : 
                       asset.id === 'carbon-credits' ? '🌿' : 
                       asset.id === 'commodities' ? '🪙' : '📈'}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-bold text-gray-900">{asset.name}</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {asset.isPyth ? 'Real-time price feed via Pyth Oracle' : 'Custom asset with ASI price feed'}
                  </p>
                </div>
                {selectedAsset?.id === asset.id && (
                  <div className="absolute top-2 right-2">
                    <CheckCircleIcon className="h-5 w-5 text-blue-600" />
                  </div>
                )}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {asset.isPyth ? 'Pyth Oracle' : 'ASI Alliance'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Asset Button */}
      <div className="border-t pt-6">
        <button
          onClick={() => setShowNewAssetForm(!showNewAssetForm)}
          className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          {showNewAssetForm ? 'Cancel New Asset' : 'Tokenize New Asset'}
        </button>
      </div>

      {/* New Asset Form */}
      {showNewAssetForm && (
        <div className="border rounded-lg p-6 bg-gray-50">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Tokenize New Asset</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                <input
                  type="text"
                  value={newAssetData.name}
                  onChange={(e) => setNewAssetData({ ...newAssetData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Downtown Office Building"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Value (USD)</label>
                <input
                  type="number"
                  value={newAssetData.value}
                  onChange={(e) => setNewAssetData({ ...newAssetData, value: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="500000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Asset Type</label>
                <select
                  value={newAssetData.assetType}
                  onChange={(e) => setNewAssetData({ ...newAssetData, assetType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select asset type</option>
                  {ASSET_TYPES.map((asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Legal Owner</label>
                <input
                  type="text"
                  value={newAssetData.owner}
                  onChange={(e) => setNewAssetData({ ...newAssetData, owner: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., ABC Properties LLC"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newAssetData.description}
                onChange={(e) => setNewAssetData({ ...newAssetData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Describe your asset..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Documents</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleFileUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB each</p>
                </div>
              </div>
              {newAssetData.documents.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Uploaded files:</p>
                  <ul className="mt-1 text-sm text-gray-500">
                    {newAssetData.documents.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewAssetForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleNewAssetSubmit}
                disabled={!newAssetData.name || !newAssetData.value || !newAssetData.assetType}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Create Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}