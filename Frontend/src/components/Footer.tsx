import React from 'react';
import { Link } from 'react-router-dom';
export function Footer() {
  return <footer className="bg-[#000000]">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link to="/" className="text-base text-gray-400 hover:text-white">
              Home
          </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/borrow" className="text-base text-gray-400 hover:text-white">
              Borrow
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/lend" className="text-base text-gray-400 hover:text-white">
              Lend
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/dashboard" className="text-base text-gray-400 hover:text-white">
              Dashboard
            </Link>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-400 hover:text-white">
              Documentation
            </a>
          </div>
          <div className="px-5 py-2">
            <a href="#" className="text-base text-gray-400 hover:text-white">
              Privacy Policy
            </a>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2023 Integra Protocol. All rights reserved.
        </p>
      </div>
    </footer>;
}
