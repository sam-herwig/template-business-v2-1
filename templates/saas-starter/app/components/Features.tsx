import { FEATURES } from '../lib/data'

export default function Features() {
  return (
    <section id="features" className="section-padding bg-[rgb(var(--muted))]">
      <div className="container-default">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">Features</span>
          <h2 className="section-title">Everything you need to ship fast</h2>
          <p className="section-description mx-auto">
            Powerful features that help your team move from idea to production in record time.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <div key={i} className="feature-card">
              <div className="feature-card-icon">{feature.icon}</div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
