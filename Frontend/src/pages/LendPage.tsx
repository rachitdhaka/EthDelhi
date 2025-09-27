import React, { useState } from 'react';
import { TrendingUpIcon, ArrowRightIcon } from 'lucide-react';
const pools = [{
  id: 'usdc',
  name: 'USDC',
  logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
  apy: 8.2,
  totalLiquidity: 12500000,
  utilization: 76
}, {
  id: 'usdt',
  name: 'USDT',
  logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
  apy: 7.8,
  totalLiquidity: 15800000,
  utilization: 82
}, {
  id: 'dai',
  name: 'DAI',
  logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
  apy: 7.5,
  totalLiquidity: 9200000,
  utilization: 68
}];
export function LendPage() {
  const [selectedPool, setSelectedPool] = useState(pools[0]);
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('30');
  const calculateYield = () => {
    if (!amount || isNaN(parseFloat(amount))) return 0;
    const principal = parseFloat(amount);
    const days = parseInt(term);
    const yearlyYield = principal * (selectedPool.apy / 100);
    return (yearlyYield * days / 365).toFixed(2);
  };
  const estimatedYield = calculateYield();
  return <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-[#000000] text-[#ffffff]">
    <div className="text-center mb-12">
      <h1 className="text-3xl font-extrabold text-[#ffffff] sm:text-4xl">
        Lend Stablecoins and Earn Yield
      </h1>
      <p className="mt-4 text-xl text-[#202124]">
        Provide liquidity to the Integra protocol and earn stable returns
      </p>
    </div>
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Lending Pool Dashboard */}
      <div className="bg-[#202124] shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-[#ffffff]">
            Available Lending Pools
          </h2>
          <p className="mt-1 text-sm text-[#ffffff]">
            Choose a stablecoin pool to provide liquidity
          </p>
        </div>
        <div className="border-t border-[#ffffff]">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {pools.map(pool => <div key={pool.id} onClick={() => setSelectedPool(pool)} className={`relative rounded-lg border p-4 cursor-pointer ${selectedPool.id === pool.id ? 'border-[#ffffff] bg-[#202124]' : 'border-[#202124] hover:border-[#ffffff]'}`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img src={pool.logo} alt={pool.name} className="h-10 w-10 rounded-full" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-[#ffffff]">
                      {pool.name}
                    </h3>
                    <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <p className="text-sm text-[#ffffff]">APY</p>
                        <p className="text-lg font-semibold text-[#ffffff]">
                          {pool.apy}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[#ffffff]">
                          Total Liquidity
                        </p>
                        <p className="text-lg font-semibold text-[#ffffff]">
                          ${pool.totalLiquidity.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-right">
                      <p className="text-sm text-[#ffffff]">Utilization</p>
                      <p className="text-lg font-semibold text-[#ffffff]">
                        {pool.utilization}%
                      </p>
                    </div>
                    <div className="mt-2 relative h-2 rounded-full overflow-hidden bg-[#ffffff]">
                      <div className="absolute h-full bg-[#ffffff]" style={{
                        width: `${pool.utilization}%`
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
      {/* Deposit Form */}
      <div className="bg-[#202124] shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-[#ffffff]">
            Lend {selectedPool.name}
          </h2>
          <p className="mt-1 text-sm text-[#ffffff]">
            Deposit stablecoins to earn {selectedPool.apy}% APY
          </p>
        </div>
        <div className="border-t border-[#ffffff]">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-[#ffffff]">
                  Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-[#202124] sm:text-sm">$</span>
                  </div>
                  <input type="text" name="amount" id="amount" value={amount} onChange={e => setAmount(e.target.value)} className="focus:ring-[#ffffff] focus:border-[#ffffff] block w-full pl-7 pr-12 sm:text-sm border-[#202124] rounded-md text-[#000000]" placeholder="0.00" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-[#202124] sm:text-sm" id="price-currency">
                      {selectedPool.name}
                    </span>
                  </div>
                </div>
              </div>
              {/* Term Selection */}
              <div>
                <label htmlFor="term" className="block text-sm font-medium text-[#ffffff]">
                  Lending Term
                </label>
                <select id="term" name="term" value={term} onChange={e => setTerm(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-[#202124] focus:outline-none focus:ring-[#ffffff] focus:border-[#ffffff] sm:text-sm rounded-md text-[#000000]">
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">365 days</option>
                </select>
              </div>
              {/* Yield Display */}
              <div className="bg-[#000000] p-4 rounded-md">
                <div className="flex items-center">
                  <TrendingUpIcon className="h-5 w-5 text-[#ffffff]" />
                  <h3 className="ml-2 text-sm font-medium text-[#ffffff]">
                    Estimated Yield
                  </h3>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#ffffff]">APY</p>
                    <p className="text-lg font-semibold text-[#ffffff]">
                      {selectedPool.apy}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#ffffff]">
                      Est. Earnings ({term} days)
                    </p>
                    <p className="text-lg font-semibold text-[#ffffff]">
                      ${estimatedYield}
                    </p>
                  </div>
                </div>
              </div>
              {/* Action Button */}
              <button type="button" disabled={!amount || parseFloat(amount) <= 0} className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-[#000000]
                ${!amount || parseFloat(amount) <= 0 ? 'bg-[#202124] cursor-not-allowed' : 'bg-[#ffffff] hover:bg-[#202124] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffffff]'}`}>
                Lend {selectedPool.name}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
