import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, WalletIcon } from 'lucide-react';
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <nav className="bg-[#202124] shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-white">Integra</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-400 hover:border-white hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/register-asset" className="border-transparent text-gray-400 hover:border-white hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Register Asset
              </Link>
              <Link to="/borrow" className="border-transparent text-gray-400 hover:border-white hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Borrow
              </Link>
              <Link to="/lend" className="border-transparent text-gray-400 hover:border-white hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Lend
              </Link>
              <Link to="/dashboard" className="border-transparent text-gray-400 hover:border-white hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              <WalletIcon className="h-4 w-4 mr-2" />
              Connect Wallet
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && <div className="sm:hidden bg-[#202124] border-t border-gray-700">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="bg-[#000000] border-white text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/register-asset" className="border-transparent text-gray-400 hover:bg-[#000000] hover:border-gray-700 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Register Asset
            </Link>
            <Link to="/borrow" className="border-transparent text-gray-400 hover:bg-[#000000] hover:border-gray-700 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Borrow
            </Link>
            <Link to="/lend" className="border-transparent text-gray-400 hover:bg-[#000000] hover:border-gray-700 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Lend
            </Link>
            <Link to="/dashboard" className="border-transparent text-gray-400 hover:bg-[#000000] hover:border-gray-700 hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="mt-3 space-y-1">
              <button type="button" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                <WalletIcon className="h-4 w-4 mr-2" />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>}
    </nav>;
}
