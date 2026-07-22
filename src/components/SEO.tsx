import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type SEOProps = {
  titleKey: string;
  descriptionKey: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
};

const BASE_URL = 'https://prestivio.it';

export default function SEO({ titleKey, descriptionKey, canonicalPath, ogType = 'website', jsonLd }: SEOProps) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t(titleKey);
    const description = t(descriptionKey);
    const canonical = `${BASE_URL}${canonicalPath}`;

    document.title = title;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:site_name', 'Prestivio', 'property');
    setMeta('og:locale', i18n.language, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;

    if (jsonLd) {
      let script = document.head.querySelector('script[data-jsonld="page"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-jsonld', 'page');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }
  }, [titleKey, descriptionKey, canonicalPath, ogType, jsonLd, t, i18n.language]);

  return null;
}
