'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Coffee, 
  Egg, 
  Cake, 
  Wine,
  Leaf,
  Flame,
  Star,
  ShoppingBag,
  ChevronRight
} from 'lucide-react'
import { Nav, Footer } from '../_components'
import { PageHero, CTABanner } from '@/components/shared'

// ═══════════════════════════════════════════════════════════════
// MENU DATA
// ═══════════════════════════════════════════════════════════════

const MENU_CATEGORIES = [
  { id: 'breakfast', name: 'Breakfast', icon: <Egg className="w-5 h-5" /> },
  { id: 'brunch', name: 'Brunch Favorites', icon: <Star className="w-5 h-5" /> },
  { id: 'sweets', name: 'Sweets & Pastries', icon: <Cake className="w-5 h-5" /> },
  { id: 'drinks', name: 'Drinks', icon: <Coffee className="w-5 h-5" /> },
]

type DietaryType = 'v' | 'vg' | 'gf'

interface MenuItem {
  id: number
  category: string
  name: string
  description: string
  price: number
  dietary: DietaryType[]
  image?: string
  badge?: 'new' | 'favorite' | 'spicy' | 'veg'
}

const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  { id: 1, category: 'breakfast', name: 'The Denver Scramble', description: 'Farm eggs, green chili, pepper jack, avocado, crispy potatoes', price: 16, dietary: ['gf'], badge: 'favorite', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop' },
  { id: 2, category: 'breakfast', name: 'Classic Eggs Benedict', description: 'Poached eggs, Canadian bacon, hollandaise, English muffin', price: 17, dietary: [] },
  { id: 3, category: 'breakfast', name: 'Veggie Omelette', description: 'Spinach, mushrooms, tomatoes, goat cheese, fresh herbs', price: 15, dietary: ['v', 'gf'], badge: 'veg' },
  { id: 4, category: 'breakfast', name: 'Sunrise Bowl', description: 'Quinoa, poached eggs, avocado, black beans, salsa verde', price: 16, dietary: ['v', 'gf'] },
  { id: 5, category: 'breakfast', name: 'Biscuits & Gravy', description: 'House-made biscuits, sausage gravy, two eggs any style', price: 14, dietary: [] },
  { id: 6, category: 'breakfast', name: 'Smoked Salmon Plate', description: 'House-cured salmon, cream cheese, capers, red onion, bagel', price: 19, dietary: [] },
  
  // Brunch Favorites
  { id: 7, category: 'brunch', name: 'Buttermilk Stack', description: 'Three fluffy pancakes, whipped butter, pure maple syrup', price: 14, dietary: ['v'], image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop' },
  { id: 8, category: 'brunch', name: 'Avocado Toast', description: 'Sourdough, smashed avo, everything seasoning, poached eggs', price: 15, dietary: ['v'], badge: 'favorite', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop' },
  { id: 9, category: 'brunch', name: 'Huevos Rancheros', description: 'Crispy tortillas, black beans, ranchero sauce, queso fresco', price: 17, dietary: ['v', 'gf'], badge: 'spicy', image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=400&h=300&fit=crop' },
  { id: 10, category: 'brunch', name: 'Chicken & Waffles', description: 'Crispy fried chicken, Belgian waffle, maple-sriracha drizzle', price: 19, dietary: [] },
  { id: 11, category: 'brunch', name: 'French Toast', description: 'Brioche, vanilla custard, fresh berries, powdered sugar', price: 15, dietary: ['v'] },
  { id: 12, category: 'brunch', name: 'Shakshuka', description: 'Poached eggs in spiced tomato sauce, feta, crusty bread', price: 16, dietary: ['v'], badge: 'new' },
  { id: 13, category: 'brunch', name: 'Breakfast Burrito', description: 'Scrambled eggs, chorizo, cheese, pico de gallo, sour cream', price: 15, dietary: [] },
  { id: 14, category: 'brunch', name: 'Acai Bowl', description: 'Acai blend, granola, fresh fruit, coconut, honey drizzle', price: 14, dietary: ['vg', 'gf'] },
  
  // Sweets & Pastries
  { id: 15, category: 'sweets', name: 'Cinnamon Roll', description: 'House-made, cream cheese frosting, toasted pecans', price: 7, dietary: ['v'], image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400&h=300&fit=crop' },
  { id: 16, category: 'sweets', name: 'Banana Bread', description: 'Warm slice with butter and honey', price: 5, dietary: ['v'] },
  { id: 17, category: 'sweets', name: 'Blueberry Muffin', description: 'Jumbo size, streusel topping', price: 5, dietary: ['v'] },
  { id: 18, category: 'sweets', name: 'Croissant', description: 'Butter croissant, plain or chocolate', price: 5, dietary: ['v'] },
  { id: 19, category: 'sweets', name: 'Seasonal Fruit Bowl', description: 'Fresh cut seasonal fruits', price: 8, dietary: ['vg', 'gf'] },
  
  // Drinks
  { id: 20, category: 'drinks', name: 'House Drip Coffee', description: 'Locally roasted, unlimited refills', price: 4, dietary: ['vg', 'gf'] },
  { id: 21, category: 'drinks', name: 'Latte', description: 'Double shot, your choice of milk', price: 6, dietary: [] },
  { id: 22, category: 'drinks', name: 'Cold Brew', description: '18-hour steeped, smooth and bold', price: 5, dietary: ['vg', 'gf'] },
  { id: 23, category: 'drinks', name: 'Fresh Orange Juice', description: 'Squeezed to order', price: 6, dietary: ['vg', 'gf'] },
  { id: 24, category: 'drinks', name: 'Mimosa', description: 'Champagne and fresh orange juice', price: 9, dietary: ['vg', 'gf'] },
  { id: 25, category: 'drinks', name: 'Bloody Mary', description: 'House recipe with all the fixings', price: 12, dietary: ['vg', 'gf'], badge: 'favorite' },
  { id: 26, category: 'drinks', name: 'Matcha Latte', description: 'Ceremonial grade matcha, oat milk', price: 7, dietary: ['vg'], badge: 'new' },
]

const DIETARY_LABELS: Record<DietaryType, { label: string; icon: React.ReactNode }> = {
  v: { label: 'Vegetarian', icon: <Leaf className="w-3 h-3" /> },
  vg: { label: 'Vegan', icon: <Leaf className="w-3 h-3" /> },
  gf: { label: 'Gluten-Free', icon: <span className="text-[10px] font-bold">GF</span> },
}

// ═══════════════════════════════════════════════════════════════
// MENU PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('breakfast')
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory)
  
  // Get featured items (ones with images)
  const featuredItems = filteredItems.filter(item => item.image)
  const regularItems = filteredItems.filter(item => !item.image)

  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case 'new': return 'badge badge-new'
      case 'veg': return 'badge badge-veg'
      case 'spicy': return 'badge badge-spicy'
      case 'favorite': return 'badge badge-favorite'
      default: return ''
    }
  }

  const getBadgeLabel = (badge?: string) => {
    switch (badge) {
      case 'new': return 'New ✨'
      case 'veg': return 'Veggie 🌿'
      case 'spicy': return 'Spicy 🔥'
      case 'favorite': return 'Fan Favorite'
      default: return null
    }
  }

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHero
          title="Our Menu"
          subtitle="Farm-fresh ingredients, made with love every morning"
          backgroundImage="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1920&h=1080&fit=crop"
          height="short"
          breadcrumbs={[{ label: 'Menu', href: '/menu' }]}
        />

        <section className="section-padding bg-cream dark:bg-dark-bg">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Menu categories">
              {MENU_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${
                    activeCategory === cat.id
                      ? 'bg-coral text-white shadow-md'
                      : 'bg-white dark:bg-dark-card text-charcoal-light dark:text-cream/80 hover:bg-coral/10 dark:hover:bg-coral/20'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div
              id={`panel-${activeCategory}`}
              role="tabpanel"
              aria-label={`${MENU_CATEGORIES.find(c => c.id === activeCategory)?.name} menu items`}
              key={activeCategory}
            >
              {/* Featured Items with Images */}
              {featuredItems.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {featuredItems.map((item, index) => (
                    <motion.article
                      key={item.id}
                      className="menu-card card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={item.image!}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        {item.badge && (
                          <span className={getBadgeClass(item.badge)}>
                            {getBadgeLabel(item.badge)}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="font-display text-lg text-charcoal dark:text-cream">
                            {item.name}
                          </h3>
                          <span className="text-coral font-semibold whitespace-nowrap">
                            ${item.price}
                          </span>
                        </div>
                        <p className="text-sm text-charcoal-light dark:text-cream/70 mb-3">
                          {item.description}
                        </p>
                        {item.dietary.length > 0 && (
                          <div className="flex gap-2">
                            {item.dietary.map(d => (
                              <span
                                key={d}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-sage/10 text-sage text-xs font-medium"
                                title={DIETARY_LABELS[d].label}
                              >
                                {DIETARY_LABELS[d].icon}
                                {d.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Regular Items (List Style) */}
              <div className="space-y-4">
                {regularItems.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (featuredItems.length + index) * 0.05 }}
                    className="p-5 bg-white dark:bg-dark-card rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-display text-lg text-charcoal dark:text-cream">
                            {item.name}
                          </h3>
                          {item.badge && (
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              item.badge === 'new' ? 'bg-coral/10 text-coral' :
                              item.badge === 'favorite' ? 'bg-sunny/20 text-charcoal' :
                              item.badge === 'spicy' ? 'bg-red-100 text-red-600' :
                              'bg-sage/10 text-sage'
                            }`}>
                              {getBadgeLabel(item.badge)}
                            </span>
                          )}
                          {item.dietary.length > 0 && (
                            <div className="flex gap-1">
                              {item.dietary.map(d => (
                                <span
                                  key={d}
                                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-sage/10 text-sage text-xs font-medium"
                                  title={DIETARY_LABELS[d].label}
                                >
                                  {d.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-charcoal-light dark:text-cream/70">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-coral font-semibold whitespace-nowrap text-lg">
                        ${item.price}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Dietary Legend */}
            <div className="mt-12 pt-8 border-t border-charcoal/10 dark:border-white/10">
              <h3 className="text-sm font-medium text-charcoal dark:text-cream uppercase tracking-wider mb-4">
                Dietary Key
              </h3>
              <div className="flex flex-wrap gap-6 text-sm text-charcoal-light dark:text-cream/70">
                <span className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-sage/10 text-sage text-xs font-medium">
                    <Leaf className="w-3 h-3" /> V
                  </span>
                  Vegetarian
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-sage/10 text-sage text-xs font-medium">
                    <Leaf className="w-3 h-3" /> VG
                  </span>
                  Vegan
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-sage/10 text-sage text-xs font-medium">
                    GF
                  </span>
                  Gluten-Free
                </span>
              </div>
              <p className="mt-4 text-sm text-charcoal-light dark:text-cream/60">
                Please inform your server of any allergies or dietary restrictions. We're happy to accommodate special requests.
              </p>
            </div>

            {/* Order Online CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 text-center p-8 md:p-12 bg-sage-light dark:bg-sage/10 rounded-3xl"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage/20 mb-4">
                <ShoppingBag className="w-7 h-7 text-sage" />
              </div>
              <h3 className="font-display text-2xl text-charcoal dark:text-cream mb-2">
                Order Online
              </h3>
              <p className="text-charcoal-light dark:text-cream/70 mb-6">
                Skip the wait — order pickup or delivery
              </p>
              <button className="btn-primary">
                Order Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        <CTABanner
          title="Can't Decide?"
          description="Join us for brunch and let our team help you pick the perfect dish"
          primaryAction={{ label: 'Make a Reservation', href: '/contact#reserve' }}
          secondaryAction={{ label: 'View Location', href: '/contact' }}
          emoji="🍽️"
        />
      </main>
      <Footer />
    </>
  )
}
