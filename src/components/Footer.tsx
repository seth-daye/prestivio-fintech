import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, LinkIcon } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const { t } = useTranslation('common');
  const { t: tLoans } = useTranslation('loans');
  const year = new Date().getFullYear();
  const loanLinks = [
    { to: '/prestito-personale', labelKey: 'loans:loans.personal.name' },
    { to: '/prestito-cambializzato', labelKey: 'loans:loans.cambializzato.name' },
    { to: '/consolidamento-debiti', labelKey: 'loans:loans.debt-consolidation.name' },
    { to: '/cessione-del-quinto', labelKey: 'loans:loans.salary-assignment.name' },
    { to: '/mutuo', labelKey: 'loans:loans.mortgage.name' },
    { to: '/prestito-auto', labelKey: 'loans:loans.auto.name' },
    { to: '/prestito-aziendale', labelKey: 'loans:loans.business.name' },
    { to: '/prestito-ristrutturazione', labelKey: 'loans:loans.vat-number.name' },
  ];
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-white/60">{t('footer.description')}</p>
            <div className="mt-6 flex gap-3">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"><LinkIcon className="h-4 w-4" /></a>
              <a href="mailto:info@prestivio.it" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"><Mail className="h-4 w-4" /></a>
              <a href="tel:+39020000000" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"><Phone className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">{t('footer.loansTitle')}</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/prestiti" className="text-sm font-medium text-white/80 transition-colors hover:text-white">{t('nav.loans')}</Link></li>
              {loanLinks.map((link) => (<li key={link.to}><Link to={link.to} className="text-sm text-white/60 transition-colors hover:text-white">{tLoans(link.labelKey)}</Link></li>))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">{t('footer.companyTitle')}</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/come-funziona" className="text-sm text-white/60 transition-colors hover:text-white">{t('nav.howItWorks')}</Link></li>
              <li><Link to="/chi-siamo" className="text-sm text-white/60 transition-colors hover:text-white">{t('nav.about')}</Link></li>
              <li><Link to="/faq" className="text-sm text-white/60 transition-colors hover:text-white">{t('nav.faq')}</Link></li>
              <li><Link to="/calcola-rata" className="text-sm text-white/60 transition-colors hover:text-white">{t('nav.simulator')}</Link></li>
              <li><Link to="/richiedi-prestito" className="text-sm text-white/60 transition-colors hover:text-white">{t('nav.apply')}</Link></li>
              <li><Link to="/contatti" className="text-sm text-white/60 transition-colors hover:text-white">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">{t('footer.legalTitle')}</h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/privacy" className="text-sm text-white/60 transition-colors hover:text-white">{t('footer.privacy')}</Link></li>
              <li><Link to="/cookie" className="text-sm text-white/60 transition-colors hover:text-white">{t('footer.cookie')}</Link></li>
              <li><Link to="/termini" className="text-sm text-white/60 transition-colors hover:text-white">{t('footer.terms')}</Link></li>
              <li><Link to="/gdpr" className="text-sm text-white/60 transition-colors hover:text-white">{t('footer.gdpr')}</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-white/60 transition-colors hover:text-white">{t('footer.disclaimer')}</Link></li>
            </ul>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-400" /> Via Manzoni 12, Milano</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold-400" /> +39 02 00 00 00 00</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold-400" /> info@prestivio.it</p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs text-white/40">{t('footer.copyright', { year })}</p>
          <p className="mt-2 text-xs text-white/40">{t('footer.brokerDisclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
