import { STATS } from '../lib/data'

export default function Stats() {
  return (
    <section className="py-16 border-y border-gray-100 bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="container-default">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                <span>{stat.number}</span>
                <span className="text-primary-600">{stat.suffix}</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
