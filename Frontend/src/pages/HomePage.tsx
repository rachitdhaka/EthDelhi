import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BarChartIcon, LockIcon, BarChart2Icon } from 'lucide-react';
export function HomePage() {
  return <div className="w-full">
      {/* Hero Section */}
      <div className="bg-[#000000] text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl">
            The Future of Finance
          </h1>
          <p className="mt-6 text-xl text-center max-w-3xl text-gray-400">
            Bridging Real-World Assets to DeFi
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/register-asset" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              Register Your Asset
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/borrow" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              Start Borrowing
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/lend" className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white bg-[#000000] hover:bg-[#202124] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              Start Lending
            </Link>
          </div>
        </div>
      </div>
      {/* Core Value Proposition */}
      <div className="py-16 bg-[#202124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Core Protocol Features
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
              Integra combines AI, blockchain, and traditional finance to create
              a secure and efficient lending platform.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="bg-[#000000] overflow-hidden shadow-lg rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-black mx-auto">
                  <BarChartIcon className="h-6 w-6" />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-lg font-medium text-white">
                    AI-Powered Valuation
                  </h3>
                  <p className="mt-2 text-base text-gray-400">
                    Advanced AI algorithms accurately value real-world assets
                    for secure lending and borrowing.
                  </p>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-[#000000] overflow-hidden shadow-lg rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-black mx-auto">
                  <BarChart2Icon className="h-6 w-6" />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-lg font-medium text-white">
                    Cross-Chain Liquidity
                  </h3>
                  <p className="mt-2 text-base text-gray-400">
                    Access liquidity across multiple blockchain networks for
                    maximum capital efficiency.
                  </p>
                </div>
              </div>
              </div>
            {/* Card 3 */}
            <div className="bg-[#000000] overflow-hidden shadow-lg rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-black mx-auto">
                  <LockIcon className="h-6 w-6" />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="text-lg font-medium text-white">
                    Compliant RWA Access
                  </h3>
                  <p className="mt-2 text-base text-gray-400">
                    Regulatory-compliant framework for tokenizing and utilizing
                    real-world assets as collateral.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Protocol Metrics */}
      <div className="py-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Live Protocol Metrics
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
              Real-time on-chain data showing the growth and stability of the
              Integra protocol.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Metric 1 */}
            <div className="bg-[#202124] overflow-hidden shadow-lg rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-lg font-medium text-gray-400 truncate text-center">
                  Total Value Locked (TVL)
                </dt>
                <dd className="mt-4 text-4xl font-extrabold text-white text-center">
                  $24,583,694
                </dd>
                <div className="mt-4">
                  <div className="relative h-3 rounded-full overflow-hidden bg-gray-700">
                    <div className="absolute h-full bg-white" style={{
                    width: '70%'
                  }}></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-400 text-center">
                    70% increase over the last 30 days
                  </p>
                </div>
              </div>
            </div>
            {/* Metric 2 */}
            <div className="bg-[#202124] overflow-hidden shadow-lg rounded-lg border border-gray-700">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-lg font-medium text-gray-400 truncate text-center">
                  Total Value of RWAs as Collateral
                </dt>
                <dd className="mt-4 text-4xl font-extrabold text-white text-center">
                  $42,156,789
                </dd>
                <div className="mt-4">
                  <div className="relative h-3 rounded-full overflow-hidden bg-gray-700">
                    <div className="absolute h-full bg-white" style={{
                    width: '85%'
                  }}></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-400 text-center">
                    85% increase over the last 30 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
