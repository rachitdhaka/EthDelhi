import React, { useState } from 'react';
import { AlertCircleIcon, ArrowUpIcon, ArrowDownIcon, ClockIcon, PlusIcon, RefreshCwIcon } from 'lucide-react';
// Mock data
const loanPositions = [{
  id: 'loan-1',
  asset: {
    name: 'Tokenized Real Estate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    currentValue: 2650000
  },
  borrowed: 1750000,
  startDate: '2023-05-15',
  interestRate: 5.2,
  ltv: 66,
  health: 'good'
}, {
  id: 'loan-2',
  asset: {
    name: 'Carbon Credits',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    currentValue: 82000
  },
  borrowed: 45000,
  startDate: '2023-07-22',
  interestRate: 4.8,
  ltv: 55,
  health: 'good'
}, {
  id: 'loan-3',
  asset: {
    name: 'Invoice Factoring',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
    currentValue: 135000
  },
  borrowed: 115000,
  startDate: '2023-08-10',
  interestRate: 6.5,
  ltv: 85,
  health: 'warning'
}];
const lendingPositions = [{
  id: 'lend-1',
  asset: 'USDC',
  logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
  deposited: 250000,
  interestEarned: 5240,
  apy: 8.2,
  startDate: '2023-04-18'
}, {
  id: 'lend-2',
  asset: 'USDT',
  logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
  deposited: 175000,
  interestEarned: 3412,
  apy: 7.8,
  startDate: '2023-06-05'
}];
const recentActivity = [{
  id: 'txn-1',
  type: 'borrow',
  amount: 115000,
  asset: 'USDC',
  date: '2023-08-10',
  status: 'completed'
}, {
  id: 'txn-2',
  type: 'deposit',
  amount: 175000,
  asset: 'USDT',
  date: '2023-06-05',
  status: 'completed'
}, {
  id: 'txn-3',
  type: 'repay',
  amount: 25000,
  asset: 'USDC',
  date: '2023-07-15',
  status: 'completed'
}, {
  id: 'txn-4',
  type: 'withdraw',
  amount: 12000,
  asset: 'USDC',
  date: '2023-07-02',
  status: 'completed'
}];
export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('loans');
  const totalBorrowed = loanPositions.reduce((sum, position) => sum + position.borrowed, 0);
  const totalCollateral = loanPositions.reduce((sum, position) => sum + position.asset.currentValue, 0);
  const totalDeposited = lendingPositions.reduce((sum, position) => sum + position.deposited, 0);
  const totalInterestEarned = lendingPositions.reduce((sum, position) => sum + position.interestEarned, 0);
  return <div className="min-h-screen bg-[#000000] text-[#ffffff] max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            My Portfolio
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Monitor your loans, deposits, and protocol activity
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button type="button" className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
            <RefreshCwIcon className="h-4 w-4 mr-1" />
            Refresh Data
          </button>
        </div>
      </div>
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Total Borrowed */}
        <div className="bg-[#202124] overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-400 truncate">
              Total Borrowed
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-white">
              ${totalBorrowed.toLocaleString()}
            </dd>
            <dd className="mt-2 flex items-center text-sm text-gray-400">
              <ArrowUpIcon className="flex-shrink-0 h-4 w-4 text-red-500" aria-hidden="true" />
              <span className="ml-1">12% from last month</span>
            </dd>
          </div>
        </div>
        {/* Total Collateral */}
        <div className="bg-[#202124] overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-400 truncate">
              Total Collateral
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-white">
              ${totalCollateral.toLocaleString()}
            </dd>
            <dd className="mt-2 flex items-center text-sm text-gray-400">
              <ArrowUpIcon className="flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
              <span className="ml-1">5% from last month</span>
            </dd>
          </div>
        </div>
        {/* Total Deposited */}
        <div className="bg-[#202124] overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-400 truncate">
              Total Deposited
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-white">
              ${totalDeposited.toLocaleString()}
            </dd>
            <dd className="mt-2 flex items-center text-sm text-gray-400">
              <ArrowUpIcon className="flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
              <span className="ml-1">8% from last month</span>
            </dd>
          </div>
        </div>
        {/* Total Interest Earned */}
        <div className="bg-[#202124] overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-400 truncate">
              Total Interest Earned
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-white">
              ${totalInterestEarned.toLocaleString()}
            </dd>
            <dd className="mt-2 flex items-center text-sm text-gray-400">
              <ArrowUpIcon className="flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
              <span className="ml-1">18% from last month</span>
            </dd>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('loans')} className={`${activeTab === 'loans' ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`} aria-current={activeTab === 'loans' ? 'page' : undefined}>
            Loan Positions
          </button>
          <button onClick={() => setActiveTab('lending')} className={`${activeTab === 'lending' ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`} aria-current={activeTab === 'lending' ? 'page' : undefined}>
            Lending Positions
          </button>
          <button onClick={() => setActiveTab('activity')} className={`${activeTab === 'activity' ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`} aria-current={activeTab === 'activity' ? 'page' : undefined}>
            Activity Feed
          </button>
        </nav>
      </div>
      {/* Tab Content */}
      {activeTab === 'loans' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {loanPositions.map(loan => <div key={loan.id} className="bg-[#202124] overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img src={loan.asset.image} alt={loan.asset.name} className="h-16 w-16 rounded object-cover" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">
                      {loan.asset.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Started on {new Date(loan.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Collateral Value</p>
                    <p className="text-base font-semibold text-white">
                      ${loan.asset.currentValue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Borrowed Amount</p>
                    <p className="text-base font-semibold text-white">
                      ${loan.borrowed.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interest Rate</p>
                    <p className="text-base font-semibold text-white">
                      {loan.interestRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current LTV</p>
                    <p className={`text-base font-semibold ${loan.ltv > 75 ? 'text-red-500' : 'text-green-500'}`}>
                      {loan.ltv}%
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="relative h-3 rounded-full overflow-hidden bg-gray-700">
                    <div className={`absolute h-full ${loan.ltv > 75 ? 'bg-red-500' : 'bg-green-500'}`} style={{
                width: `${loan.ltv}%`
              }}></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>Safe Zone</span>
                    <span>100%</span>
                  </div>
                </div>
                {loan.ltv > 75 && <div className="mt-4 p-3 bg-red-950 rounded-md flex items-start">
                    <AlertCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="ml-2 text-sm text-red-300">
                      Your loan is approaching the liquidation threshold.
                      Consider adding more collateral.
                    </p>
                  </div>}
                <div className="mt-6 flex space-x-3">
                  <button type="button" className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-white bg-[#202124] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                    Repay Loan
                  </button>
                  <button type="button" className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Collateral
                  </button>
                </div>
              </div>
            </div>)}
        </div>}
      {activeTab === 'lending' && <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {lendingPositions.map(position => <div key={position.id} className="bg-[#202124] overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img src={position.logo} alt={position.asset} className="h-12 w-12 rounded-full" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">
                      {position.asset} Pool
                    </h3>
                    <p className="text-sm text-gray-500">
                      Deposited on{' '}
                      {new Date(position.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Deposited Amount</p>
                    <p className="text-base font-semibold text-white">
                      ${position.deposited.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interest Earned</p>
                    <p className="text-base font-semibold text-green-500">
                      +${position.interestEarned.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current APY</p>
                    <p className="text-base font-semibold text-white">
                      {position.apy}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-base font-semibold text-white">
                      $
                      {(position.deposited + position.interestEarned).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button type="button" className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-white bg-[#202124] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                    Withdraw
                  </button>
                  <button type="button" className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Deposit More
                  </button>
                </div>
              </div>
            </div>)}
        </div>}
      {activeTab === 'activity' && <div className="bg-[#202124] shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-white">
              Recent Transactions
            </h3>
          </div>
          <div className="border-t border-gray-700">
            <ul className="divide-y divide-gray-700">
              {recentActivity.map(activity => <li key={activity.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`rounded-full p-2 ${activity.type === 'borrow' || activity.type === 'withdraw' ? 'bg-red-950' : 'bg-green-950'}`}>
                        {activity.type === 'borrow' || activity.type === 'withdraw' ? <ArrowDownIcon className={`h-5 w-5 ${activity.type === 'borrow' || activity.type === 'withdraw' ? 'text-red-500' : 'text-green-500'}`} /> : <ArrowUpIcon className="h-5 w-5 text-green-500" />}
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-white">
                          {activity.type === 'borrow' && 'Borrowed'}
                          {activity.type === 'deposit' && 'Deposited'}
                          {activity.type === 'repay' && 'Repaid'}
                          {activity.type === 'withdraw' && 'Withdrew'}{' '}
                          {activity.asset}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${activity.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-950 text-green-300">
                            {activity.status}
                          </span>
                        </div>
                      </div>
                      <ClockIcon className="ml-2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </li>)}
            </ul>
          </div>
        </div>}
    </div>;
}
