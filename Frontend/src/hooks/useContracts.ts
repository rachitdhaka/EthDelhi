import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { 
  CONTRACT_ADDRESSES, 
  IDENTITY_REGISTRY_ABI, 
  RWA_DOCUMENT_VAULT_ABI, 
  AI_COLLATERAL_AGENT_ABI, 
  RWA_TOKEN_ABI, 
  RWA_LENDING_PROTOCOL_ABI,
  MOCK_ASI_ORACLE_ABI 
} from '../config/contracts';

export function useIdentityRegistry() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Check if user is verified
  const { data: isVerified, refetch: refetchVerification } = useReadContract({
    address: CONTRACT_ADDRESSES.IDENTITY_REGISTRY,
    abi: IDENTITY_REGISTRY_ABI,
    functionName: 'isVerified',
    args: address ? [address] : undefined,
  });

  const verifyUser = async () => {
    if (!address) throw new Error('No wallet connected');
    
    writeContract({
      address: CONTRACT_ADDRESSES.IDENTITY_REGISTRY,
      abi: IDENTITY_REGISTRY_ABI,
      functionName: 'verifyUser',
      args: [address],
    });
  };

  return {
    isVerified: isVerified || false,
    verifyUser,
    isPending,
    isConfirming,
    isConfirmed,
    refetchVerification,
  };
}

export function useDocumentVault() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Get user's document CID
  const { data: documentCID, refetch: refetchDocumentCID } = useReadContract({
    address: CONTRACT_ADDRESSES.RWA_DOCUMENT_VAULT,
    abi: RWA_DOCUMENT_VAULT_ABI,
    functionName: 'userDocumentCID',
    args: address ? [address] : undefined,
  });

  // Get user's document hash
  const { data: documentHash, refetch: refetchDocumentHash } = useReadContract({
    address: CONTRACT_ADDRESSES.RWA_DOCUMENT_VAULT,
    abi: RWA_DOCUMENT_VAULT_ABI,
    functionName: 'userDocumentHash',
    args: address ? [address] : undefined,
  });

  const storeDocument = async (cid: string, docHash: string) => {
    if (!address) throw new Error('No wallet connected');
    
    writeContract({
      address: CONTRACT_ADDRESSES.RWA_DOCUMENT_VAULT,
      abi: RWA_DOCUMENT_VAULT_ABI,
      functionName: 'storeDocument',
      args: [cid, docHash as `0x${string}`],
    });
  };

  return {
    documentCID: documentCID || '',
    documentHash: documentHash || '0x0',
    storeDocument,
    isPending,
    isConfirming,
    isConfirmed,
    refetchDocumentCID,
    refetchDocumentHash,
  };
}

export function useAICollateralAgent() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Get user's collateral info
  const { data: collateral, refetch: refetchCollateral } = useReadContract({
    address: CONTRACT_ADDRESSES.AI_COLLATERAL_AGENT,
    abi: AI_COLLATERAL_AGENT_ABI,
    functionName: 'userCollateral',
    args: address ? [address] : undefined,
  });

  // Get LTV for user
  const { data: ltv, refetch: refetchLTV } = useReadContract({
    address: CONTRACT_ADDRESSES.AI_COLLATERAL_AGENT,
    abi: AI_COLLATERAL_AGENT_ABI,
    functionName: 'calculateLTV',
    args: address ? [address] : undefined,
  });

  // Get live price for an asset
  const getLivePrice = async (asset: string, isPyth: boolean) => {
    // This would need to be called via a read contract hook
    // For now, we'll return a mock implementation
    return 0;
  };

  const registerCollateral = async (user: string, asset: string, appraisalValue: string, zkProof: string) => {
    if (!address) throw new Error('No wallet connected');
    
    writeContract({
      address: CONTRACT_ADDRESSES.AI_COLLATERAL_AGENT,
      abi: AI_COLLATERAL_AGENT_ABI,
      functionName: 'registerCollateral',
      args: [user as `0x${string}`, asset, parseEther(appraisalValue), zkProof as `0x${string}`],
    });
  };

  return {
    collateral: collateral ? {
      asset: collateral[0],
      appraisalValue: formatEther(collateral[1]),
      active: collateral[2],
      isPythAsset: collateral[3],
    } : null,
    ltv: ltv ? Number(formatEther(ltv)) : 0,
    registerCollateral,
    getLivePrice,
    isPending,
    isConfirming,
    isConfirmed,
    refetchCollateral,
    refetchLTV,
  };
}

export function useRWAToken() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Get user's RWA token balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.RWA_TOKEN,
    abi: RWA_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Get total supply
  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: CONTRACT_ADDRESSES.RWA_TOKEN,
    abi: RWA_TOKEN_ABI,
    functionName: 'totalSupply',
  });

  const mint = async (to: string, amount: string) => {
    if (!address) throw new Error('No wallet connected');
    
    writeContract({
      address: CONTRACT_ADDRESSES.RWA_TOKEN,
      abi: RWA_TOKEN_ABI,
      functionName: 'mint',
      args: [to as `0x${string}`, parseEther(amount)],
    });
  };

  const transfer = async (to: string, amount: string) => {
    if (!address) throw new Error('No wallet connected');
    
    writeContract({
      address: CONTRACT_ADDRESSES.RWA_TOKEN,
      abi: RWA_TOKEN_ABI,
      functionName: 'transfer',
      args: [to as `0x${string}`, parseEther(amount)],
    });
  };

  return {
    balance: balance ? formatEther(balance) : '0',
    totalSupply: totalSupply ? formatEther(totalSupply) : '0',
    mint,
    transfer,
    isPending,
    isConfirming,
    isConfirmed,
    refetchBalance,
    refetchTotalSupply,
  };
}

export function useRWALendingProtocol() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Get user's borrowed amount
  const { data: borrowedAmount, refetch: refetchBorrowedAmount } = useReadContract({
    address: CONTRACT_ADDRESSES.RWA_LENDING_PROTOCOL,
    abi: RWA_LENDING_PROTOCOL_ABI,
    functionName: 'borrowedAmounts',
    args: address ? [address] : undefined,
  });

  const borrow = async (amount: string) => {
    if (!address) throw new Error('No wallet connected');
    
    writeContract({
      address: CONTRACT_ADDRESSES.RWA_LENDING_PROTOCOL,
      abi: RWA_LENDING_PROTOCOL_ABI,
      functionName: 'borrow',
      args: [parseEther(amount)],
    });
  };

  return {
    borrowedAmount: borrowedAmount ? formatEther(borrowedAmount) : '0',
    borrow,
    isPending,
    isConfirming,
    isConfirmed,
    refetchBorrowedAmount,
  };
}

export function useMockASIOracle() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const setPrice = async (assetSymbol: string, price: string) => {
    writeContract({
      address: CONTRACT_ADDRESSES.MOCK_ASI_ORACLE,
      abi: MOCK_ASI_ORACLE_ABI,
      functionName: 'setPrice',
      args: [assetSymbol, parseEther(price)],
    });
  };

  return {
    setPrice,
    isPending,
    isConfirming,
    isConfirmed,
  };
}


