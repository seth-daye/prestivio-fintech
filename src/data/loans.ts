export type LoanProduct = {
  slug: string;
  id: string;
  image: string;
  rate: string;
  amountRange: string;
  termRange: string;
};

export const loanProducts: LoanProduct[] = [
  { slug: 'prestito-personale', id: 'personal', image: 'https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', rate: '5,90%', amountRange: '€1.500 – €75.000', termRange: '12 – 120 mesi' },
  { slug: 'prestito-cambializzato', id: 'cambializzato', image: 'https://images.pexels.com/photos/4968631/pexels-photo-4968631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', rate: '8,90%', amountRange: '€2.500 – €60.000', termRange: '12 – 120 mesi' },
  { slug: 'consolidamento-debiti', id: 'debt-consolidation', image: 'https://images.pexels.com/photos/6963017/pexels-photo-6963017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', rate: '4,50%', amountRange: '€5.000 – €100.000', termRange: '24 – 120 mesi' },
  { slug: 'cessione-del-quinto', id: 'salary-assignment', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', rate: '3,95%', amountRange: '€2.000 – €75.000', termRange: '24 – 120 mesi' },
  { slug: 'mutuo', id: 'mortgage', image: 'https://images.pexels.com/photos/31651009/pexels-photo-31651009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', rate: '2,95%', amountRange: '€30.000 – €1.000.000', termRange: '5 – 30 anni' },
  { slug: 'prestito-auto', id: 'auto', image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', rate: '4,75%', amountRange: '€3.000 – €80.000', termRange: '12 – 84 mesi' },
  { slug: 'prestito-aziendale', id: 'business', image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', rate: '5,50%', amountRange: '€5.000 – €250.000', termRange: '12 – 120 mesi' },
  { slug: 'prestito-ristrutturazione', id: 'vat-number', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', rate: '5,50%', amountRange: '€3.000 – €100.000', termRange: '12 – 120 mesi' },
];

export const getLoanBySlug = (slug: string): LoanProduct | undefined =>
  loanProducts.find((loan) => loan.slug === slug);

export const getRelatedLoans = (currentId: string, count = 3): LoanProduct[] =>
  loanProducts.filter((l) => l.id !== currentId).slice(0, count);
