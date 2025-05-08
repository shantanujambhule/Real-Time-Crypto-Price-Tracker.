import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssetData, selectAssets } from '../features/assets/assetsSlice';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const CryptoTable: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAssets);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedAssets = assets.map(asset => {
        const newPrice = asset.price + Math.random() * 10 - 5;
        return {
          ...asset,
          price: newPrice,
          percentChange1h: asset.percentChange1h + Math.random() * 2 - 1,
          percentChange24h: asset.percentChange24h + Math.random() * 2 - 1,
          percentChange7d: asset.percentChange7d + Math.random() * 2 - 1,
          volume24h: asset.volume24h + Math.random() * 1000 - 500,
          trend: [...(asset.trend || [newPrice]), newPrice].slice(-7),
        };
      });

      updatedAssets.forEach(updatedAsset => {
        dispatch(updateAssetData(updatedAsset));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [assets, dispatch]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedAssets = [...assets]
    .filter(asset =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortKey as keyof typeof a];
      const valB = b[sortKey as keyof typeof b];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }

      return 0;
    });

  const getChangeStyle = (value: number) => ({
    color: value > 0 ? '#16c784' : '#ea3943',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  });

  const formatChange = (value: number) => (
    <span style={getChangeStyle(value)}>
      {value > 0 ? '▲' : '▼'} {Math.abs(value).toFixed(2)}%
    </span>
  );

  const renderSortIcon = (column: string) => {
    if (sortKey !== column) return null;
    return sortOrder === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search by name or symbol"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-3 border w-40 max-w-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
      />
      <div className="overflow-x-auto rounded-xl bg-white shadow-lg">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('rank')}>
                #
              </th>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('name')}>
                Name {renderSortIcon('name')}
              </th>
              <th className="px-4 py-3 text-right cursor-pointer" onClick={() => handleSort('price')}>
                Price {renderSortIcon('price')}
              </th>
              <th className="px-4 py-3 text-right cursor-pointer" onClick={() => handleSort('percentChange1h')}>
                1h % {renderSortIcon('percentChange1h')}
              </th>
              <th className="px-4 py-3 text-right cursor-pointer" onClick={() => handleSort('percentChange24h')}>
                24h % {renderSortIcon('percentChange24h')}
              </th>
              <th className="px-4 py-3 text-right cursor-pointer" onClick={() => handleSort('percentChange7d')}>
                7d % {renderSortIcon('percentChange7d')}
              </th>
              <th className="px-4 py-3 text-right cursor-pointer" onClick={() => handleSort('marketCap')}>
                Market Cap {renderSortIcon('marketCap')}
              </th>
              <th className="px-4 py-3 text-right cursor-pointer" onClick={() => handleSort('volume24h')}>
                Volume(24h) {renderSortIcon('volume24h')}
              </th>
              <th className="px-4 py-3 text-right">Circulating Supply</th>
              <th className="px-4 py-3 text-right">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedAssets.map((asset, index) => (
              <tr key={asset.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 bg-blue">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-5">
                  <img
                    src={asset.logoUrl}
                    alt={`${asset.name} logo`}
                    width="24"
                    height="24"
                    className=" "
                  />
                  <div>
                    <div className="font-semibold text-lg ">{asset.name}</div>
                    <div className="text-gray-600 text-xs">{asset.symbol}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono">${asset.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-right font-mono">{formatChange(asset.percentChange1h)}</td>
                <td className="px-4 py-3 text-right font-mono">{formatChange(asset.percentChange24h)}</td>
                <td className="px-4 py-3 text-right font-mono">{formatChange(asset.percentChange7d)}</td>
                <td className="px-4 py-3 text-right font-mono">${asset.marketCap.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-mono">
                  ${asset.volume24h.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="font-mono">{asset.circulatingSupply.toLocaleString()} {asset.symbol}</div>
                  <div className="w-full bg-gray-200 h-2 rounded overflow-hidden mt-2">
                    <div
                      className="bg-blue-500 h-full"
                      style={{
                        width: `${(asset.circulatingSupply / asset.maxSupply) * 100}%`,
                      }}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Sparklines data={asset.trend || [1, 1, 1, 1, 1, 1, 1]} width={100} height={30}>
                    <SparklinesLine color="#16c784" />
                  </Sparklines>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
