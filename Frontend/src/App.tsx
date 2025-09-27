import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BorrowPage } from './pages/Borrow';
import { LendPage } from './pages/LendPage';
import { DashboardPage } from './pages/DashboardPage';
import { RwaRegistrationPage } from './pages/RwaRegistrationPage';
import Landing from './pages/Landing';
export function App() {
  return <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/borrow" element={<BorrowPage />} />
            <Route path="/lend" element={<LendPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/register-asset" element={<RwaRegistrationPage />} />
            <Route path="/landing" element={<Landing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>;
}
