declare global {
  interface Window {
    ethereum?: any;
  }
}

export const BNB_CHAIN_ID = '0x38';
export const BNB_TESTNET_CHAIN_ID = '0x61';
export const DEGEN_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';

export async function connectWallet(): Promise<string | null> {
  if (!window.ethereum) {
    alert('Please install MetaMask to use this dApp');
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    await switchToBNBChain();

    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return null;
  }
}

export async function switchToBNBChain(): Promise<boolean> {
  if (!window.ethereum) return false;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BNB_CHAIN_ID }],
    });
    return true;
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: BNB_CHAIN_ID,
              chainName: 'BNB Smart Chain',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error('Error adding BNB chain:', addError);
        return false;
      }
    }
    console.error('Error switching to BNB chain:', switchError);
    return false;
  }
}

export async function getBalance(address: string): Promise<string> {
  if (!window.ethereum) return '0';

  try {
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    return (parseInt(balance, 16) / 1e18).toFixed(4);
  } catch (error) {
    console.error('Error getting balance:', error);
    return '0';
  }
}

export function calculateShares(
  amount: number,
  yesPool: number,
  noPool: number,
  position: 'yes' | 'no'
): number {
  const k = yesPool * noPool;

  if (k === 0) {
    return amount;
  }

  if (position === 'yes') {
    const newYesPool = yesPool + amount;
    const newNoPool = k / newYesPool;
    return noPool - newNoPool;
  } else {
    const newNoPool = noPool + amount;
    const newYesPool = k / newNoPool;
    return yesPool - newYesPool;
  }
}

export function calculateProbability(yesPool: number, noPool: number): number {
  if (yesPool === 0 && noPool === 0) return 50;
  const total = yesPool + noPool;
  return (yesPool / total) * 100;
}

export function shortenAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
