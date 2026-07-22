export type Testimonial = { id: string; quoteKey: string; authorKey: string; roleKey: string; locationKey: string };
export const testimonials: Testimonial[] = [
  { id: 't1', quoteKey: 'home:testimonials.items.t1.quote', authorKey: 'home:testimonials.items.t1.author', roleKey: 'home:testimonials.items.t1.role', locationKey: 'home:testimonials.items.t1.location' },
  { id: 't2', quoteKey: 'home:testimonials.items.t2.quote', authorKey: 'home:testimonials.items.t2.author', roleKey: 'home:testimonials.items.t2.role', locationKey: 'home:testimonials.items.t2.location' },
  { id: 't3', quoteKey: 'home:testimonials.items.t3.quote', authorKey: 'home:testimonials.items.t3.author', roleKey: 'home:testimonials.items.t3.role', locationKey: 'home:testimonials.items.t3.location' },
];

export type ProcessStep = { number: string; titleKey: string; descriptionKey: string };
export const processSteps: ProcessStep[] = [
  { number: '01', titleKey: 'home:process.steps.s1.title', descriptionKey: 'home:process.steps.s1.description' },
  { number: '02', titleKey: 'home:process.steps.s2.title', descriptionKey: 'home:process.steps.s2.description' },
  { number: '03', titleKey: 'home:process.steps.s3.title', descriptionKey: 'home:process.steps.s3.description' },
  { number: '04', titleKey: 'home:process.steps.s4.title', descriptionKey: 'home:process.steps.s4.description' },
];

export type Stat = { valueKey: string; labelKey: string };
export const stats: Stat[] = [
  { valueKey: 'home:stats.s1.value', labelKey: 'home:stats.s1.label' },
  { valueKey: 'home:stats.s2.value', labelKey: 'home:stats.s2.label' },
  { valueKey: 'home:stats.s3.value', labelKey: 'home:stats.s3.label' },
  { valueKey: 'home:stats.s4.value', labelKey: 'home:stats.s4.label' },
];

export type FaqItem = { id: string; categoryKey: string; questionKey: string; answerKey: string };
export const generalFaqs: FaqItem[] = [
  { id: 'g1', categoryKey: 'faq:categories.general', questionKey: 'faq:items.g1.question', answerKey: 'faq:items.g1.answer' },
  { id: 'g2', categoryKey: 'faq:categories.general', questionKey: 'faq:items.g2.question', answerKey: 'faq:items.g2.answer' },
  { id: 'g3', categoryKey: 'faq:categories.general', questionKey: 'faq:items.g3.question', answerKey: 'faq:items.g3.answer' },
  { id: 'd1', categoryKey: 'faq:categories.documentation', questionKey: 'faq:items.d1.question', answerKey: 'faq:items.d1.answer' },
  { id: 'd2', categoryKey: 'faq:categories.documentation', questionKey: 'faq:items.d2.question', answerKey: 'faq:items.d2.answer' },
  { id: 'r1', categoryKey: 'faq:categories.rates', questionKey: 'faq:items.r1.question', answerKey: 'faq:items.r1.answer' },
  { id: 'r2', categoryKey: 'faq:categories.rates', questionKey: 'faq:items.r2.question', answerKey: 'faq:items.r2.answer' },
  { id: 'r3', categoryKey: 'faq:categories.rates', questionKey: 'faq:items.r3.question', answerKey: 'faq:items.r3.answer' },
  { id: 's1', categoryKey: 'faq:categories.surrogate', questionKey: 'faq:items.s1.question', answerKey: 'faq:items.s1.answer' },
  { id: 's2', categoryKey: 'faq:categories.surrogate', questionKey: 'faq:items.s2.question', answerKey: 'faq:items.s2.answer' },
];
