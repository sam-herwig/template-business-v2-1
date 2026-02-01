'use client'

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string | null
  onSelect: (category: string | null) => void
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      <button
        onClick={() => onSelect(null)}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
          activeCategory === null
            ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
            : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:bg-secondary-100 hover:text-secondary-700'
        }`}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
            activeCategory === category
              ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
              : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:bg-secondary-100 hover:text-secondary-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
