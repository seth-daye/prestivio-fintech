import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import { loanProducts } from '@/data/loans';

export default function Navbar() {
  const { t } = useTranslation('common');
  const { t: tLoans } = useTranslation('loans');
  const scrolled = useScrolled(30);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loansDropdown, setLoansDropdown] = useState(false);
  const location = useLocation();
  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/come-funziona', label: t('nav.howItWorks') },
    { to: '/chi-siamo', label: t('nav.about') },
    { to: '/faq', label: t('nav.faq') },
    { to: '/contatti', label: t('nav.contact') },
  ];
  const isHome = location.pathname === '/';
  const solid = scrolled || !isHome || mobileOpen;
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? 'bg-navy-900/95 backdrop-blur-md shadow-soft' : 'bg-transparent'}`}>
      <nav className="container-px flex h-16 items-center justify-between lg:h-20">
        <Link to="/" onClick={() => setMobileOpen(false)}><Logo light /></Link>
        <div className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setLoansDropdown(true)}
            onMouseLeave={() => setLoansDropdown(false)}
          >
            <button className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white">
              {t('nav.loans')}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {loansDropdown && (
              <div className="absolute top-full left-0 w-72 overflow-hidden rounded-xl border border-navy-100 bg-white shadow-navy">
                <Link to="/prestiti" className="block border-b border-navy-100 px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-navy-50">{t('nav.loans')}</Link>
                {loanProducts.map((loan) => (
                  <Link key={loan.slug} to={`/${loan.slug}`} className="block px-4 py-2.5 text-sm text-navy-600 transition-colors hover:bg-navy-50 hover:text-navy-900">
                    {tLoans(`loans.${loan.id}.name`)}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${isActive ? 'text-gold-400' : 'text-white/80 hover:text-white'}`}>{link.label}</NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/richiedi-prestito" className="hidden rounded-lg px-3.5 py-2 text-sm font-medium text-white/80 transition-colors hover:text-gold-400 sm:block">{t('nav.apply')}</Link>
          <LanguageSelector light />
          <Link to="/contatti" className="btn-gold hidden sm:inline-flex">{t('nav.cta')}</Link>
          <button className="text-white p-2 lg:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy-900 lg:hidden">
          <div className="container-px flex flex-col gap-1 py-4">
            <Link to="/prestiti" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/5">{t('nav.loans')}</Link>
            {loanProducts.map((loan) => (
              <Link key={loan.slug} to={`/${loan.slug}`} onClick={() => setMobileOpen(false)} className="rounded-lg px-8 py-2.5 text-sm text-white/60 hover:bg-white/5">{tLoans(`loans.${loan.id}.name`)}</Link>
            ))}
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `rounded-lg px-4 py-3 text-sm font-medium ${isActive ? 'text-gold-400 bg-white/5' : 'text-white/80 hover:bg-white/5'}`}>{link.label}</NavLink>
            ))}
            <NavLink to="/richiedi-prestito" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/5">{t('nav.apply')}</NavLink>
            <NavLink to="/calcola-rata" onClick={() => setMobileOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/5">{t('nav.simulator')}</NavLink>
            <Link to="/contatti" onClick={() => setMobileOpen(false)} className="btn-gold mt-2 w-full">{t('nav.cta')}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
