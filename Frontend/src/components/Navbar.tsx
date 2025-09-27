import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon, WalletIcon } from 'lucide-react';
export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<nav className="bg-white shadow-md border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link to="/" className="flex-shrink-0 flex items-center">
							<span className="text-xl font-bold text-blue-700">Integra</span>
						</Link>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							<Link to="/" className="border-transparent text-gray-600 hover:border-blue-700 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
								Home
							</Link>
							<Link to="/register-asset" className="border-transparent text-gray-600 hover:border-blue-700 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
								Register Asset
							</Link>
							<Link to="/borrow" className="border-transparent text-gray-600 hover:border-blue-700 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
								Borrow
							</Link>
							<Link to="/lend" className="border-transparent text-gray-600 hover:border-blue-700 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
								Lend
							</Link>
							<Link to="/dashboard" className="border-transparent text-gray-600 hover:border-blue-700 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
								Dashboard
							</Link>
						</div>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						<button type="button" className="inline-flex items-center px-4 py-2 border border-blue-700 text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
							<WalletIcon className="h-4 w-4 mr-2" />
							Connect Wallet
						</button>
					</div>
					<div className="-mr-2 flex items-center sm:hidden">
						<button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-700" aria-expanded="false">
							<span className="sr-only">Open main menu</span>
							{isMenuOpen ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
						</button>
					</div>
				</div>
			</div>
			{isMenuOpen && (
				<div className="sm:hidden bg-white border-t border-gray-200">
					<div className="pt-2 pb-3 space-y-1">
						<Link to="/" className="bg-blue-50 border-blue-700 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
							Home
						</Link>
						<Link to="/register-asset" className="border-transparent text-gray-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
							Register Asset
						</Link>
						<Link to="/borrow" className="border-transparent text-gray-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
							Borrow
						</Link>
						<Link to="/lend" className="border-transparent text-gray-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
							Lend
						</Link>
						<Link to="/dashboard" className="border-transparent text-gray-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setIsMenuOpen(false)}>
							Dashboard
						</Link>
					</div>
					<div className="pt-4 pb-3 border-t border-gray-200">
						<div className="mt-3 space-y-1">
							<button type="button" className="w-full flex items-center justify-center px-4 py-2 border border-blue-700 text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
								<WalletIcon className="h-4 w-4 mr-2" />
								Connect Wallet
							</button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
}
