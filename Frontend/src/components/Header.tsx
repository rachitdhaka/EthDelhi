import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NAV_ITEMS = [
  { label: 'Borrow', path: '/borrow' },
  { label: 'Lend', path: '/lend' },
  { label: 'Register RWA', path: '/register-asset' },
];

export function Header() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    if (!isConnected) {
      hasRedirectedRef.current = false;
      return;
    }

    if (!hasRedirectedRef.current && location.pathname !== '/register-asset') {
      hasRedirectedRef.current = true;
      const timer = setTimeout(() => {
        navigate('/register-asset');
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isConnected, location.pathname, navigate]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const renderNavLink = (item: (typeof NAV_ITEMS)[number]) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`text-sm font-medium transition-colors ${
          isActive ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="bg-[#202124] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-semibold text-white">
              OsamaBoom
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {NAV_ITEMS.map(renderNavLink)}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ConnectButton />
            </div>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-[#202124]">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-black hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <ConnectButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
