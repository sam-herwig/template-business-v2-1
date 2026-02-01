import { PRICING } from '../lib/data'

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding">
      <div className="container-default">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">Pricing</span>
          <h2 className="section-title">Simple, transparent pricing</h2>
          <p className="section-description mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {PRICING.map((plan, i) => (
            <div key={i} className={`pricing-card ${plan.popular ? 'featured' : ''}`}>
              {plan.popular && <div className="pricing-badge">Most Popular</div>}
              <h3 className="pricing-name">{plan.name}</h3>
              <div className="pricing-amount">
                <span className="pricing-price">{plan.price}</span>
                <span className="pricing-period">{plan.period}</span>
              </div>
              <p className="pricing-description">{plan.description}</p>
              <ul className="pricing-features">
                {plan.features.map((feature, j) => (
                  <li key={j} className="pricing-feature">
                    <span className="pricing-feature-check">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={plan.popular ? 'pricing-cta-featured' : 'pricing-cta-primary'}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
