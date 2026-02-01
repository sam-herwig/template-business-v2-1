export default function CTA() {
  return (
    <section className="section-padding-sm">
      <div className="container-default">
        <div className="cta-section text-center text-white">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
              Join 10,000+ teams already using our platform. Start your free trial today — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98]">
                Start Free Trial →
              </button>
              <button className="text-white/90 hover:text-white px-8 py-4 font-semibold text-lg transition-colors">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
