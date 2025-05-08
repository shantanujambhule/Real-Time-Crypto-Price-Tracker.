import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Asset {
    id: string;
    name: string;
    symbol: string;
    price: number;
    percentChange1h: number;
    percentChange24h: number;
    percentChange7d: number;
    marketCap: number;
    volume24h: number;
    circulatingSupply: number;
    maxSupply: number;
    logoUrl?: string; // <-- add this
  }

    const initialState: Asset[] = [
        {
          id: "1",
          name: "Bitcoin",
          symbol: "BTC",
          price: 45000,
          percentChange1h: 1.2,
          percentChange24h: -2.3,
          percentChange7d: 3.5,
          marketCap: 850000000000,
          volume24h: 35000000000,
          circulatingSupply: 19000000,
          maxSupply: 21000000,
          logoUrl: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        },
        {
          id: "2",
          name: "Ethereum",
          symbol: "ETH",
          price: 3000,
          percentChange1h: 0.8,
          percentChange24h: 1.5,
          percentChange7d: -4.2,
          marketCap: 350000000000,
          volume24h: 22000000000,
          circulatingSupply: 115000000,
          maxSupply: 120000000,
          logoUrl: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        },
        {
          id: "tether",
          name: "Tether",
          symbol: "USDT",
          price: 1.0,
          percentChange1h: 0.02,
          percentChange24h: 0.03,
          percentChange7d: 0.01,
          marketCap: 68000000000,
          volume24h: 76000000000,
          circulatingSupply: 68000000000,
          maxSupply: 15425744,
          logoUrl: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png",
        },
        {
          id: "cardano",
          name: "Cardano",
          symbol: "ADA",
          price: 2.3,
          percentChange1h: 0.3,
          percentChange24h: 1.5,
          percentChange7d: -2.1,
          marketCap: 73000000000,
          volume24h: 2500000000,
          circulatingSupply: 32000000000,
          maxSupply: 45000000000,
          logoUrl: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
        },
        {
          id: "solana",
          name: "Solana",
          symbol: "SOL",
          price: 150,
          percentChange1h: -0.5,
          percentChange24h: 5.0,
          percentChange7d: 3.0,
          marketCap: 47000000000,
          volume24h: 1900000000,
          circulatingSupply: 300000000,
          maxSupply: 500000000,
          logoUrl: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
        },
        {
          id: "binancecoin",
          name: "Binance Coin",
          symbol: "BNB",
          price: 400,
          percentChange1h: 0.7,
          percentChange24h: -0.5,
          percentChange7d: 0.2,
          marketCap: 70000000000,
          volume24h: 3500000000,
          circulatingSupply: 175000000,
          maxSupply: 175000000,
          logoUrl: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
        },
        {
          id: "polkadot",
          name: "Polkadot",
          symbol: "DOT",
          price: 45,
          percentChange1h: 1.2,
          percentChange24h: 0.8,
          percentChange7d: -1.9,
          marketCap: 43000000000,
          volume24h: 1500000000,
          circulatingSupply: 950000000,
          maxSupply: 1200000000,
          logoUrl: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
        },
        {
          id: "ripple",
          name: "Ripple",
          symbol: "XRP",
          price: 1.1,
          percentChange1h: 0.1,
          percentChange24h: -0.2,
          percentChange7d: 1.4,
          marketCap: 52000000000,
          volume24h: 4500000000,
          circulatingSupply: 50000000000,
          maxSupply: 100000000000,
          logoUrl: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
        },
        {
          id: "litecoin",
          name: "Litecoin",
          symbol: "LTC",
          price: 150,
          percentChange1h: 0.4,
          percentChange24h: 1.8,
          percentChange7d: 0.5,
          marketCap: 10000000000,
          volume24h: 400000000,
          circulatingSupply: 70000000,
          maxSupply: 84000000,
          logoUrl: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
        },
        {
          id: "dogecoin",
          name: "Dogecoin",
          symbol: "DOGE",
          price: 0.32,
          percentChange1h: 0.02,
          percentChange24h: 0.05,
          percentChange7d: -3.2,
          marketCap: 42000000000,
          volume24h: 2500000000,
          circulatingSupply: 130000000000,
          maxSupply: 75214568354,
          logoUrl: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
        },
      
      
];

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    updateAssetData: (state, action: PayloadAction<Asset>) => {
      const index = state.findIndex(asset => asset.id === action.payload.id);
      if (index >= 0) {
        state[index] = action.payload;
      }
    },
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      return action.payload;
    },
  },
});

export const { updateAssetData, setAssets } = assetsSlice.actions;
export const selectAssets = (state: any) => state.assets;
export default assetsSlice.reducer;
