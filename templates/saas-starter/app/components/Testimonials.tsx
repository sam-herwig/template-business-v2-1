import Image from 'next/image'
import { TESTIMONIALS } from '../lib/data'

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-[rgb(var(--muted))]">
      <div className="container-default">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="section-title">Loved by teams worldwide</h2>
          <p className="section-description mx-auto">
            Don't just take our word for it. Here's what our customers have to say.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">{'★★★★★'}</div>
              <p className="testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="testimonial-author">
                <Image 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="testimonial-avatar"
                />
                <div>
                  <div className="testimonial-name">{testimonial.author}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
