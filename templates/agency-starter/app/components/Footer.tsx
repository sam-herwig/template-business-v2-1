// ═══════════════════════════════════════════════════════════════
// FOOTER COMPONENT (Server Component)
// Static footer - no client-side interactivity needed
// ═══════════════════════════════════════════════════════════════

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <a href="/" className="font-display text-2xl font-bold tracking-tight block mb-4">
              STUDIO<span className="text-primary-500">.</span>
            </a>
            <p className="text-dark-400 max-w-sm">
              Award-winning digital studio crafting bold brands and unforgettable digital experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-dark-400">
              <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Social</h4>
            <ul className="space-y-2 text-dark-400">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} Studio Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-dark-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
