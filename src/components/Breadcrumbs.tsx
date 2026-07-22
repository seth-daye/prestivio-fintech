import { Link } from 'react-router-dom';

type Crumb = { label: string; to?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="container-px pt-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-navy-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-navy-200">/</span>}
            {item.to ? (
              <Link to={item.to} className="transition-colors hover:text-gold-600">{item.label}</Link>
            ) : (
              <span className="font-medium text-navy-700">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
