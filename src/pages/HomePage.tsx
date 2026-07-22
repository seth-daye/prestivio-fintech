import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Prestivio',
    description: 'Broker di credito indipendente',
    url: 'https://prestivio.it',
  };
  return (
    <>
      <SEO titleKey="home:meta.title" descriptionKey="home:meta.description" canonicalPath="/" jsonLd={jsonLd} />
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
