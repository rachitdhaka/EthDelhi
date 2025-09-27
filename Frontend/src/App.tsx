import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BorrowPage } from './pages/Borrow';
import { LendPage } from './pages/LendPage';
import { DashboardPage } from './pages/DashboardPage';
import {Rwa} from './pages/Rwa';
import { Landing } from './pages/Landing';

export function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/borrow" element={<BorrowPage />} />
            <Route path="/lend" element={<LendPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/Landing" element={<Landing />} />
            <Route path='/register-asset' element={<Rwa/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
