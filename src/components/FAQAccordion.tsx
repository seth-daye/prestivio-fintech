import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Item = { id: string; questionKey: string; answerKey: string };

export default function FAQAccordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="overflow-hidden rounded-xl border border-navy-100 bg-white shadow-soft">
            <button onClick={() => setOpenId(isOpen ? null : item.id)} className="flex w-full items-center justify-between px-6 py-5 text-left">
              <span className="font-serif text-base font-semibold text-navy-900">{item.questionKey}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-gold-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden"><p className="px-6 pb-5 text-sm leading-relaxed text-navy-400">{item.answerKey}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
