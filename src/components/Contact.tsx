import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Contact() {
  const { t } = useTranslation('contact');
  const items = [
    { icon: Phone, label: t('page.info.phone'), value: t('page.info.phoneValue') },
    { icon: Mail, label: t('page.info.email'), value: t('page.info.emailValue') },
    { icon: MapPin, label: t('page.info.address'), value: t('page.info.addressValue') },
    { icon: Clock, label: t('page.info.hours'), value: t('page.info.hoursValue') },
  ];
  return (
    <section className="section-pad bg-cream">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{t('page.eyebrow')}</span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">{t('page.title')}</h2>
            <p className="mt-4 text-navy-400">{t('page.subtitle')}</p>
            <div className="mt-8 space-y-4">
              {items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900"><Icon className="h-5 w-5 text-gold-400" /></div>
                    <div><p className="text-xs text-navy-400">{item.label}</p><p className="font-medium text-navy-900">{item.value}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
