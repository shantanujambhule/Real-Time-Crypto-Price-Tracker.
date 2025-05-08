# 🪙 Crypto Asset Tracker

A TypeScript-based cryptocurrency asset tracker built with Redux Toolkit. It provides real-time state management for various crypto assets like Bitcoin, Ethereum, and more.
📸 Preview



https://github.com/user-attachments/assets/842892c0-b702-4274-a698-355cad8b43fe



## 🚀 Features

- Track price and market changes of popular cryptocurrencies
- Redux Toolkit integration for scalable state management
- Typed with TypeScript for safety and clarity
- Easily extendable for real-time data updates via APIs
- Local asset image support (e.g., Bitcoin logo)

## 🏗️ Tech Stack

- ⚛️ React (assumed)
- 🧰 Redux Toolkit
- 🗂 TypeScript
- 🌐 Optional integration with external APIs (e.g., CoinGecko)

## 📁 Project Structure (Simplified)

src/
├── assets/
│ └── bitcoin-btc-logo.png
├── store/
│ └── assetsSlice.ts
├── App.tsx
├── main.tsx
└── ...



## 🧠 How It Works

- The `assetsSlice` file defines a Redux slice managing an array of `Asset` objects.
- Each asset includes market data (price, volume, etc.) and an optional logo (either local image or external URL).
- Reducers include:
  - `updateAssetData`: Updates a single asset's data
  - `setAssets`: Replaces the entire list of assets

## 📦 Installation

```bash
git clone https://github.com/your-username/crypto-asset-tracker.git
cd crypto-asset-tracker
npm install
npm run dev
