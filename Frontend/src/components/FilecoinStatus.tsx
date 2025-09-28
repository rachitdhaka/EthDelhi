import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon, ExternalLinkIcon } from 'lucide-react';

interface FilecoinStatusProps {
  dealId?: string;
  networkHeight?: number;
  status?: string;
  explorerUrl?: string;
}

export function FilecoinStatus({ dealId, networkHeight, status, explorerUrl }: FilecoinStatusProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
          
          {explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
            >
              <ExternalLinkIcon className="h-3 w-3 mr-1" />
              View on Calibration Explorer
            </a>
          )}
          
          <div className="text-xs text-blue-600">
            <p>🌡️ Warm Storage: Active</p>
            <p>📊 Network: Calibration Testnet</p>
            <p>🔗 Chain ID: 314159</p>
          </div>
        </div>
      )}
    </div>
  );
}
