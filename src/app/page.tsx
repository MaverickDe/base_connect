'use client';

import { useState, useMemo } from 'react';
import { ethers } from 'ethers';
import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';

export default function CoinbaseWalletConnect() {
  const [address, setAddress] = useState<string>('');
  const [bnbBalance, setBnbBalance] = useState<string>('0');
  const [terraceBalance, setTerraceBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Update this with your real Terrace token contract address
  // const TERRACE_TOKEN_ADDRESS = '0xYourTerraceTokenAddress';
  const TERRACE_TOKEN_ADDRESS = '0xF5F53af4595BaB806E2522Ca7A8bbcB70a9b3DA8';

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/MaverickDe/base_connect.git
git push -u origin main
  // 1. Initialize SDK
  const sdk = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return createCoinbaseWalletSDK({
      appName: 'Terrace App',
      appLogoUrl: 'https://example.com/logo.png',
      preference: { options: 'all' }, 
    });
  }, []);

  // 2. Get the Provider
  const cbProvider = useMemo(() => {
    if (!sdk) return null;
    return sdk.getProvider();
  }, [sdk]);

  // Helper to fetch balances
  const updateBalances = async (userAddress: string, provider: ethers.BrowserProvider) => {
    try {
      // Fetch Native BNB Balance
      const bnbBal = await provider.getBalance(userAddress);
      console.log("bnbBal",bnbBal)
      setBnbBalance(ethers.formatEther(bnbBal));

      // Fetch Terrace Token Balance
      const tokenContract = new ethers.Contract(
        TERRACE_TOKEN_ADDRESS,
        [
          'function balanceOf(address owner) view returns (uint256)',
          'function decimals() view returns (uint8)'
        ],
        provider
      );

      const [rawBalance, decimals] = await Promise.all([
        tokenContract.balanceOf(userAddress),
        tokenContract.decimals()
      ]);
let tbal = ethers.formatUnits(rawBalance, decimals)
console.log("tbal",tbal)
      setTerraceBalance(tbal);
    } catch (err) {
      console.error("Balance fetch error:", err);
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError('');

      if (!cbProvider) throw new Error("SDK not initialized");

      // Request accounts (triggers QR code for Coinbase App)
      const accounts = await cbProvider.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      const userAddress = accounts[0];

      // Switch to BSC (Chain ID 56 / 0x38)
      try {
        await cbProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await cbProvider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x38',
              chainName: 'BNB Smart Chain',
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
              blockExplorerUrls: ['https://bscscan.com/']
            }],
          });
        }
      }

      setAddress(userAddress);

      // Create Ethers provider and fetch balances
      const provider = new ethers.BrowserProvider(cbProvider);
      await updateBalances(userAddress, provider);

    } catch (err: any) {
      setError(err.message || 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    if (cbProvider && 'disconnect' in cbProvider) {
      await (cbProvider as any).disconnect();
    }
    setAddress('');
    setBnbBalance('0');
    setTerraceBalance('0');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800">Coinbase App Wallet</h2>
      
      {!address ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="w-full bg-[#0052FF] text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          {loading ? 'Check Mobile App...' : 'Connect Coinbase App'}
        </button>
      ) : (
        <div className="space-y-4">
          {/* Connection Status */}
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-[10px] uppercase text-blue-500 font-black tracking-widest mb-1">Connected Address</p>
            <p className="text-sm font-mono text-blue-900 truncate">{address}</p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase">BNB Balance</p>
              <p className="text-lg font-bold text-gray-800">{Number(bnbBalance).toFixed(4)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Terrace</p>
              <p className="text-lg font-bold text-[#0052FF]">{Number(terraceBalance).toFixed(2)}</p>
            </div>
          </div>

          <button
            onClick={disconnectWallet}
            className="w-full py-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Disconnect Wallet
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl text-center border border-red-100">
          {error}
        </div>
      )}
    </div>
  );
}
// 'use client';

// import { useState, useMemo } from 'react';
// import { ethers } from 'ethers';
// import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';

// export default function CoinbaseWalletConnect() {
//   const [address, setAddress] = useState<string>('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string>('');

//   // 1. Initialize the SDK
//   const sdk = useMemo(() => {
//     if (typeof window === 'undefined') return null;
//     return createCoinbaseWalletSDK({
//       appName: 'Terrace App',
//       appLogoUrl: 'https://example.com/logo.png',
//       preference: {options:'all'}, // 'all' allows both extension and mobile app (QR)
//     });
//   }, []);

//   // 2. GET THE PROVIDER (Fixed the .makeWeb3Provider error)
//   const cbProvider = useMemo(() => {
//     if (!sdk) return null;
//     return sdk.getProvider();
//   }, [sdk]);

//   const connectWallet = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       if (!cbProvider) throw new Error("SDK not initialized");

//       // Triggers the Coinbase login (QR code for mobile app)
//       const accounts = await cbProvider.request({ 
//         method: 'eth_requestAccounts' 
//       }) as string[];

//       // Switch to BSC (Chain ID 56 / 0x38)
//       try {
//         await cbProvider.request({
//           method: 'wallet_switchEthereumChain',
//           params: [{ chainId: '0x38' }],
//         });
//       } catch (switchError: any) {
//         if (switchError.code === 4902) {
//           await cbProvider.request({
//             method: 'wallet_addEthereumChain',
//             params: [{
//               chainId: '0x38',
//               chainName: 'BNB Smart Chain',
//               rpcUrls: ['https://bsc-dataseed.binance.org/'],
//               nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
//               blockExplorerUrls: ['https://bscscan.com/']
//             }],
//           });
//         }
//       }

//       setAddress(accounts[0]);
//     } catch (err: any) {
//       setError(err.message || 'Connection failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const disconnectWallet = async () => {
//     if (cbProvider) {
//       // In v4, 'disconnect' is part of the provider's standard interface
//       // but is usually wrapped in a try/catch as it might not be implemented 
//       // by all injected versions.
//       try {
//         if ('disconnect' in cbProvider) {
//            await (cbProvider as any).disconnect();
//         }
//       } catch (err) {
//         console.warn("Manual disconnect not supported, clearing state.");
//       }
//     }
//     setAddress('');
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-2xl border shadow-sm">
//       <h2 className="text-xl font-bold mb-4">Coinbase App Connect</h2>
      
//       {!address ? (
//         <button
//           onClick={connectWallet}
//           disabled={loading}
//           className="w-full bg-[#0052FF] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
//         >
//           {loading ? 'Check Mobile App...' : 'Connect Coinbase'}
//         </button>
//       ) : (
//         <div className="space-y-4">
//           <div className="p-3 bg-gray-50 rounded-lg border">
//             <p className="text-[10px] uppercase text-gray-400 font-bold">Address</p>
//             <p className="text-sm font-mono truncate">{address}</p>
//           </div>
//           <button
//             onClick={disconnectWallet}
//             className="w-full text-sm text-gray-500 hover:text-red-500"
//           >
//             Disconnect
//           </button>
//         </div>
//       )}

//       {error && <p className="mt-4 text-xs text-red-500 text-center">{error}</p>}
//     </div>
//   );
// }