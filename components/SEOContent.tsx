interface FAQItem {
  question: string
  answer: string
}

interface SEOContentProps {
  title: string
  intro?: string
  faqs: FAQItem[]
  additionalContent?: React.ReactNode
}

export default function SEOContent({ title, intro, faqs, additionalContent }: SEOContentProps) {
  return (
    <section className="bg-white rounded-xl shadow-lg p-8 mt-12">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {title}
        </h2>

        {/* Intro Text */}
        {intro && (
          <div className="prose prose-slate max-w-none mb-8">
            <p className="text-lg text-slate-700 leading-relaxed">
              {intro}
            </p>
          </div>
        )}

        {/* Additional Content */}
        {additionalContent && (
          <div className="prose prose-slate max-w-none mb-8">
            {additionalContent}
          </div>
        )}

        {/* FAQ Accordion */}
        {faqs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h3>
            
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-slate-50 rounded-lg border-2 border-slate-200 hover:border-blue-300 transition-colors"
              >
                <summary className="cursor-pointer list-none p-5 font-semibold text-gray-900 flex items-center justify-between">
                  <span className="text-lg">{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-slate-600 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-2">
                  <div className="text-slate-700 leading-relaxed prose prose-slate max-w-none">
                    {faq.answer.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-3 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}

        {/* Schema.org FAQ Markup for SEO */}
        {faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                  },
                })),
              }),
            }}
          />
        )}
      </div>
    </section>
  )
}

