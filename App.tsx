import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './app/store';
import { updateAssetData, selectAssets } from './features/assets/assetsSlice';
import CryptoTable from './components/CryptoTable';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1 className="text-4xl font-bold text-center my-8">Crypto Price Tracker</h1>
        <CryptoTable />
      </div>
    </Provider>
  );
}

export default App;
