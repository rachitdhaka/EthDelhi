import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon, ExternalLinkIcon, DatabaseIcon } from 'lucide-react';

interface FilecoinStatusProps {
  dealId?: string;
  networkHeight?: number;
  status?: string;
  explorerUrl?: string;
  realCid?: string; // Add the real IPFS CID
}

export function FilecoinStatus({ dealId, networkHeight, status, explorerUrl, realCid }: FilecoinStatusProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeDeals, setActiveDeals] = useState<any[]>([]);
  const [loadingDeals, setLoadingDeals] = useState(false);

  // Fetch active storage deals when component mounts or realCid changes
  useEffect(() => {
    if (realCid) {
      fetchActiveDeals(realCid);
    }
  }, [realCid]);

  const fetchActiveDeals = async (cid: string) => {
    setLoadingDeals(true);
    try {
      const response = await fetch(`http://localhost:3000/api/calibration/storage-deals/${cid}`);
      if (response.ok) {
        const data = await response.json();
        setActiveDeals(data.deals || []);
      }
    } catch (error) {
      console.error('Failed to fetch active deals:', error);
    } finally {
      setLoadingDeals(false);
    }
  };

  if (!dealId) {
    return (
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-sm font-medium text-gray-600">Filecoin Integration</p>
        <p className="text-xs text-gray-500 mt-1">No active storage deals</p>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'StorageDealActive':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'StorageDealProposing':
        return <ClockIcon className="h-4 w-4 text-yellow-600" />;
      default:
        return <XCircleIcon className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'StorageDealActive':
        return 'text-green-600';
      case 'StorageDealProposing':
        return 'text-yellow-600';
      default:
        return 'text-red-600';
    }
  };

  return (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <p className="text-sm font-medium text-blue-800">Filecoin Calibration Testnet</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          {isExpanded ? 'Hide' : 'Details'}
        </button>
      </div>
      
      <div className="mt-2">
        <p className={`text-xs font-medium ${getStatusColor()}`}>
          Status: {status || 'Unknown'}
        </p>
        {networkHeight && (
          <p className="text-xs text-blue-600 mt-1">
            Network Height: {networkHeight.toLocaleString()}
          </p>
        )}
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-blue-200 space-y-2">
          <div>
            <p className="text-xs font-medium text-blue-800">Deal ID</p>
            <p className="text-xs text-blue-600 font-mono break-all">{dealId}</p>
          </div>
          
          <div className="space-y-2">
            {explorerUrl && (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
              >
                <ExternalLinkIcon className="h-3 w-3 mr-1" />
                View Deal on Calibration Explorer
              </a>
            )}
            
            {(dealId || realCid) && (
              <div className="text-xs text-blue-600">
                <p className="font-medium">Real IPFS URLs:</p>
                {realCid && (
                  <>
                    <a 
                      href={`https://ipfs.io/ipfs/${realCid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-blue-800"
                    >
                      🌐 IPFS Gateway
                    </a>
                    <a 
                      href={`https://gateway.pinata.cloud/ipfs/${realCid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-blue-800"
                    >
                      📌 Pinata Gateway
                    </a>
                    <a 
                      href={`https://${realCid}.ipfs.w3s.link`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-blue-800"
                    >
                      ☁️ Web3.Storage
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="text-xs text-blue-600">
            <p>🌡️ Warm Storage: Active</p>
            <p>📊 Network: Calibration Testnet</p>
            <p>🔗 Chain ID: 314159</p>
          </div>

          {/* Active Storage Deals */}
          {realCid && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-blue-800 flex items-center">
                  <DatabaseIcon className="h-4 w-4 mr-1" />
                  Active Storage Deals
                </h4>
                <button 
                  onClick={() => fetchActiveDeals(realCid)}
                  disabled={loadingDeals}
                  className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50"
                >
                  {loadingDeals ? 'Loading...' : 'Refresh'}
                </button>
              </div>
              
              {loadingDeals ? (
                <p className="text-xs text-gray-500">Loading deals...</p>
              ) : activeDeals.length > 0 ? (
                <div className="space-y-2">
                  {activeDeals.map((deal, index) => (
                    <div key={index} className="p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-blue-800">Deal #{index + 1}</p>
                          <p className="text-blue-600">Provider: {deal.provider}</p>
                          <p className="text-blue-600">Status: {deal.status}</p>
                          <p className="text-blue-600">Sector: {deal.sectorSize}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-blue-600">Price: {parseInt(deal.price) / 1e18} tFIL</p>
                          <p className="text-blue-600">Duration: {Math.floor(deal.duration / 2880)} days</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500">No active storage deals found</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
