import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import LoanListPage from '@/pages/LoanListPage';
import LoanDetailPage from '@/pages/LoanDetailPage';
import SimulatorPage from '@/pages/SimulatorPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import AboutPage from '@/pages/AboutPage';
import FaqPage from '@/pages/FaqPage';
import ContactPage from '@/pages/ContactPage';
import LoanApplicationPage from '@/pages/LoanApplicationPage';
import PrivacyPage from '@/pages/PrivacyPage';
import CookiePage from '@/pages/CookiePage';
import TermsPage from '@/pages/TermsPage';
import GdprPage from '@/pages/GdprPage';
import DisclaimerPage from '@/pages/DisclaimerPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { loanProducts } from '@/data/loans';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prestiti" element={<LoanListPage />} />
            <Route path="/calcola-rata" element={<SimulatorPage />} />
            <Route path="/richiedi-prestito" element={<LoanApplicationPage />} />
            <Route path="/come-funziona" element={<HowItWorksPage />} />
            <Route path="/chi-siamo" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contatti" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookie" element={<CookiePage />} />
            <Route path="/termini" element={<TermsPage />} />
            <Route path="/gdpr" element={<GdprPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            {loanProducts.map((loan) => (
              <Route key={loan.slug} path={`/${loan.slug}`} element={<LoanDetailPage />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
