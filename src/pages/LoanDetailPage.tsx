import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, FileText, ArrowRight, Calculator } from 'lucide-react';
import { getLoanBySlug, getRelatedLoans } from '@/data/loans';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import FAQAccordion from '@/components/FAQAccordion';
import WhyUs from '@/components/WhyUs';
import { useReveal } from '@/hooks/useReveal';

export default function LoanDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const loan = slug ? getLoanBySlug(slug) : undefined;
  const { t } = useTranslation('loans');
  const { t: tCommon } = useTranslation('common');
  const { ref, visible } = useReveal<HTMLDivElement>();

  if (!loan) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-900 pt-20">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-white">404</h1>
          <Link to="/" className="mt-4 inline-block text-gold-400">{tCommon('notFound.backHome')}</Link>
        </div>
      </div>
    );
  }

  const benefitKeys = ['b1', 'b2', 'b3', 'b4'];
  const eligibilityKeys = ['e1', 'e2', 'e3', 'e4'];
  const documentKeys = ['d1', 'd2', 'd3', 'd4'];
  const faqKeys = ['f1', 'f2', 'f3'];
  const processKeys = ['p1', 'p2', 'p3', 'p4'];
  const related = getRelatedLoans(loan.id, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: t(`loans.${loan.id}.name`),
    description: t(`loans.${loan.id}.description`),
    url: `https://prestivio.it/${loan.slug}`,
  };

  return (
    <div className="bg-white pt-16 lg:pt-20">
      <SEO titleKey={`loans:loans.${loan.id}.metaTitle`} descriptionKey={`loans:loans.${loan.id}.metaDescription`} canonicalPath={`/${loan.slug}`} jsonLd={jsonLd} />
      <Breadcrumbs items={[
        { label: t('breadcrumb.home'), to: '/' },
        { label: t('breadcrumb.loans'), to: '/prestiti' },
        { label: t(`loans.${loan.id}.name`) },
      ]} />

      <section className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
        <div className="absolute inset-0 navy-radial" />
        <div className="container-px relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow text-gold-400">{t('heroDetail.eyebrow')}</span>
              <h1 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t(`loans.${loan.id}.name`)}</h1>
              <p className="mt-3 text-lg text-gold-400">{t(`loans.${loan.id}.tagline`)}</p>
              <p className="mt-6 leading-relaxed text-white/70">{t(`loans.${loan.id}.description`)}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/richiedi-prestito" state={{ loanId: loan.id }} className="btn-gold">{t('heroDetail.cta')}<ArrowRight className="h-4 w-4" /></Link>
                <Link to="/calcola-rata" className="btn-ghost-light"><Calculator className="h-4 w-4" />{t('heroDetail.simulatorLink')}</Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm">
                <div><p className="text-white/40">TAN</p><p className="font-serif text-lg font-bold text-gold-400">{loan.rate}</p></div>
                <div><p className="text-white/40">{t('list.amountLabel')}</p><p className="font-medium text-white">{loan.amountRange}</p></div>
                <div><p className="text-white/40">{t('list.termLabel')}</p><p className="font-medium text-white">{loan.termRange}</p></div>
              </div>
            </div>
            <div className="relative"><img src={loan.image} alt={t(`loans.${loan.id}.name`)} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-navy" /></div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div ref={ref} className={`container-px ${visible ? 'reveal is-visible' : 'reveal'}`}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t('sections.benefits.eyebrow')}</span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy-900">{t('sections.benefits.title')}</h2>
            <p className="mt-4 text-navy-400">{t('sections.benefits.subtitle')}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {benefitKeys.map((key) => (
              <div key={key} className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/10"><Check className="h-5 w-5 text-gold-500" /></div>
                <div><h3 className="font-serif text-base font-bold text-navy-900">{t(`loans.${loan.id}.benefits.${key}.title`)}</h3><p className="mt-1 text-sm text-navy-400">{t(`loans.${loan.id}.benefits.${key}.description`)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow">{t('sections.eligibility.eyebrow')}</span>
              <h2 className="mt-4 font-serif text-2xl font-bold text-navy-900">{t('sections.eligibility.title')}</h2>
              <p className="mt-2 text-sm text-navy-400">{t('sections.eligibility.subtitle')}</p>
              <div className="mt-6 space-y-4">
                {eligibilityKeys.map((key) => (<div key={key} className="flex gap-3"><Check className="h-5 w-5 shrink-0 text-gold-500" /><div><p className="font-medium text-navy-900">{t(`loans.${loan.id}.eligibility.${key}.title`)}</p><p className="text-sm text-navy-400">{t(`loans.${loan.id}.eligibility.${key}.description`)}</p></div></div>))}
              </div>
            </div>
            <div>
              <span className="eyebrow">{t('sections.documents.eyebrow')}</span>
              <h2 className="mt-4 font-serif text-2xl font-bold text-navy-900">{t('sections.documents.title')}</h2>
              <p className="mt-2 text-sm text-navy-400">{t('sections.documents.subtitle')}</p>
              <div className="mt-6 space-y-4">
                {documentKeys.map((key) => (<div key={key} className="flex gap-3"><FileText className="h-5 w-5 shrink-0 text-gold-500" /><div><p className="font-medium text-navy-900">{t(`loans.${loan.id}.documents.${key}.title`)}</p><p className="text-sm text-navy-400">{t(`loans.${loan.id}.documents.${key}.description`)}</p></div></div>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t('sections.process.eyebrow')}</span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy-900">{t('sections.process.title')}</h2>
            <p className="mt-4 text-navy-400">{t('sections.process.subtitle')}</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processKeys.map((key, i) => (
              <div key={key} className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 font-serif text-xl font-bold text-gold-400">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-5 font-serif text-lg font-bold text-navy-900">{t(`processSteps.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-400">{t(`processSteps.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-px max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">{t('sections.faq.eyebrow')}</span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy-900">{t('sections.faq.title')}</h2>
            <p className="mt-4 text-navy-400">{t('sections.faq.subtitle')}</p>
          </div>
          <div className="mt-10">
            <FAQAccordion items={faqKeys.map((key) => ({ id: key, questionKey: t(`loans.${loan.id}.faqs.${key}.question`), answerKey: t(`loans.${loan.id}.faqs.${key}.answer`) }))} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t('sections.related.eyebrow')}</span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy-900">{t('sections.related.title')}</h2>
            <p className="mt-4 text-navy-400">{t('sections.related.subtitle')}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <Link key={rel.slug} to={`/${rel.slug}`} className="card-hover group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
                <div className="relative h-40 overflow-hidden">
                  <img src={rel.image} alt={t(`loans.${rel.id}.name`)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-sm font-medium text-white/90">{t('list.fromRate')} <span className="font-bold text-gold-400">{rel.rate}</span></span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-navy-900">{t(`loans.${rel.id}.name`)}</h3>
                  <p className="mt-1 text-sm text-navy-400">{t(`loans.${rel.id}.tagline`)}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-gold-600">{t('list.viewDetails')}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />

      <section className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
        <div className="absolute inset-0 navy-radial" />
        <div className="container-px relative text-center">
          <span className="eyebrow text-gold-400">{t('sections.faiDomanda.eyebrow')}</span>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-bold text-white text-balance sm:text-4xl">{t('sections.faiDomanda.title')}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">{t('sections.faiDomanda.subtitle')}</p>
          <Link to="/richiedi-prestito" state={{ loanId: loan.id }} className="btn-gold mt-8">{t('sections.faiDomanda.button')}<ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
