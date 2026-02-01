'use client'

import { useState, useEffect } from 'react'
import { SkipLink } from '@/components/SkipLink'
import { PageHero, CTABanner } from '@/components/shared'
import { DailySpecials, StickyMenuNav, MenuSection } from '@/components/menu'
import { Nav, Footer } from '../_components'
import type { MenuItem, DailySpecial, DietaryType } from '@/types'

// ═══════════════════════════════════════════════════════════════
// MENU PAGE DATA
// ═══════════════════════════════════════════════════════════════

const DAILY_SPECIALS: DailySpecial[] = [
  {
    name: 'Pan-Seared Duck Breast',
    description: 'Local farm duck, cherry gastrique, roasted root vegetables, wild rice pilaf',
    price: 38,
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&h=400&fit=crop&q=85',
    chefNote: "A tribute to the autumn harvest — I source these ducks from Miller's Farm just 20 miles away.",
  },
]

const MENU_CATEGORIES = [
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'wine', name: 'Wine List' },
]

const MENU_ITEMS: MenuItem[] = [
  // Starters
  { id: 1, category: 'starters', name: 'Burrata & Heirloom Tomatoes', description: 'Fresh burrata, seasonal tomatoes, basil oil, aged balsamic, microgreens', price: 16, dietary: ['v', 'gf'], image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&h=400&fit=crop&q=85' },
  { id: 2, category: 'starters', name: 'Crispy Calamari', description: 'Lightly fried Rhode Island calamari, lemon aioli, fresh herbs, cherry peppers', price: 14, dietary: [], image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop&q=85' },
  { id: 3, category: 'starters', name: 'Soup of the Day', description: 'Chef\'s daily creation with artisan sourdough bread', price: 9, dietary: ['v'] },
  { id: 4, category: 'starters', name: 'Roasted Beet Salad', description: 'Local goat cheese, candied walnuts, arugula, honey vinaigrette', price: 13, dietary: ['v', 'gf'], image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&q=85' },
  { id: 5, category: 'starters', name: 'Tuna Tartare', description: 'Sushi-grade ahi, avocado, sesame, crispy wonton chips', price: 18, dietary: ['gf'] },
  { id: 6, category: 'starters', name: 'French Onion Soup', description: 'Caramelized onions, rich beef broth, gruyère crouton', price: 11, dietary: [] },
  
  // Mains
  { id: 7, category: 'mains', name: 'Pan-Seared Salmon', description: 'Wild-caught Atlantic salmon, lemon butter, seasonal vegetables, herb rice', price: 32, dietary: ['gf'], image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop&q=85', featured: true },
  { id: 8, category: 'mains', name: 'Grilled Ribeye', description: '12oz prime cut, garlic mashed potatoes, asparagus, red wine reduction', price: 45, dietary: ['gf'], image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&q=85', featured: true },
  { id: 9, category: 'mains', name: 'Wild Mushroom Risotto', description: 'Arborio rice, truffle oil, parmesan, forest mushrooms, fresh herbs', price: 26, dietary: ['v', 'gf'], image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop&q=85' },
  { id: 10, category: 'mains', name: 'Herb-Crusted Chicken', description: 'Free-range chicken breast, roasted vegetables, pan jus', price: 28, dietary: ['gf'] },
  { id: 11, category: 'mains', name: 'Lobster Linguine', description: 'Maine lobster tail, cherry tomatoes, white wine, fresh basil', price: 42, dietary: [] },
  { id: 12, category: 'mains', name: 'Braised Short Ribs', description: 'Slow-cooked beef, creamy polenta, braising jus, gremolata', price: 36, dietary: ['gf'] },
  { id: 13, category: 'mains', name: 'Eggplant Parmesan', description: 'Layered eggplant, San Marzano tomatoes, fresh mozzarella, basil', price: 24, dietary: ['v'] },
  
  // Desserts
  { id: 14, category: 'desserts', name: 'Chocolate Lava Cake', description: 'Warm chocolate center, vanilla bean ice cream, raspberry coulis', price: 12, dietary: ['v'], image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop&q=85' },
  { id: 15, category: 'desserts', name: 'Crème Brûlée', description: 'Classic vanilla custard, caramelized sugar, fresh berries', price: 10, dietary: ['v', 'gf'] },
  { id: 16, category: 'desserts', name: 'Seasonal Fruit Tart', description: 'Fresh fruits, pastry cream, almond crust, apricot glaze', price: 11, dietary: ['v'] },
  { id: 17, category: 'desserts', name: 'Tiramisu', description: 'Espresso-soaked ladyfingers, mascarpone, cocoa', price: 11, dietary: ['v'] },
  { id: 18, category: 'desserts', name: 'New York Cheesecake', description: 'Classic style, graham crust, seasonal compote', price: 10, dietary: ['v'] },
  
  // Drinks
  { id: 19, category: 'drinks', name: 'Classic Old Fashioned', description: 'Bourbon, bitters, orange peel, luxardo cherry', price: 14, dietary: [] },
  { id: 20, category: 'drinks', name: 'Golden Hour Martini', description: 'Vodka, elderflower, fresh lemon, honey', price: 15, dietary: ['v', 'gf'] },
  { id: 21, category: 'drinks', name: 'Spiced Pear Mule', description: 'Vodka, ginger beer, pear nectar, cinnamon', price: 13, dietary: ['v', 'gf'] },
  { id: 22, category: 'drinks', name: 'Local Craft Beer', description: 'Rotating selection of regional favorites', price: 8, dietary: ['v'] },
  { id: 23, category: 'drinks', name: 'Fresh Lemonade', description: 'House-made with mint and seasonal berries', price: 5, dietary: ['v', 'gf'] },
  
  // Wine
  { id: 24, category: 'wine', name: 'House Red - Cabernet Sauvignon', description: 'Napa Valley, bold and structured', price: 14, dietary: ['v', 'gf'] },
  { id: 25, category: 'wine', name: 'House White - Chardonnay', description: 'Sonoma Coast, crisp with hints of oak', price: 12, dietary: ['v', 'gf'] },
  { id: 26, category: 'wine', name: 'Pinot Noir', description: 'Willamette Valley, OR - elegant and earthy', price: 16, dietary: ['v', 'gf'] },
  { id: 27, category: 'wine', name: 'Sauvignon Blanc', description: 'Marlborough, NZ - bright and citrusy', price: 14, dietary: ['v', 'gf'] },
  { id: 28, category: 'wine', name: 'Prosecco', description: 'Veneto, Italy - light and refreshing', price: 10, dietary: ['v', 'gf'] },
]

const DIETARY_LABELS: Record<DietaryType, string> = {
  v: 'Vegetarian',
  vg: 'Vegan',
  gf: 'Gluten-Free',
}

// ═══════════════════════════════════════════════════════════════
// MENU PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('starters')

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = MENU_CATEGORIES.map(cat => ({
        id: cat.id,
        element: document.getElementById(`menu-${cat.id}`),
      }))

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveCategory(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main-content">
        <PageHero
          title="Our Menu"
          subtitle="Fresh, locally-sourced ingredients prepared with care and creativity"
          backgroundImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop&q=85"
          height="short"
          breadcrumbs={[{ label: 'Menu', href: '/menu' }]}
        />

        <section className="section-padding bg-[rgb(var(--background))]">
          <div className="max-w-4xl mx-auto px-6">
            {/* Daily Specials */}
            <DailySpecials specials={DAILY_SPECIALS} />

            {/* Sticky Category Nav */}
            <StickyMenuNav
              categories={MENU_CATEGORIES}
              activeCategory={activeCategory}
              onCategoryClick={setActiveCategory}
            />

            {/* Menu Sections */}
            <div className="mt-8">
              <MenuSection
                id="starters"
                title="Starters"
                description="Begin your culinary journey with our selection of appetizers"
                items={MENU_ITEMS.filter(item => item.category === 'starters')}
                layout="cards"
              />

              <MenuSection
                id="mains"
                title="Main Courses"
                description="Hearty entrées featuring the finest ingredients"
                items={MENU_ITEMS.filter(item => item.category === 'mains')}
                layout="cards"
              />

              <MenuSection
                id="desserts"
                title="Desserts"
                description="Sweet endings crafted with love"
                items={MENU_ITEMS.filter(item => item.category === 'desserts')}
                layout="cards"
              />

              <MenuSection
                id="drinks"
                title="Drinks & Cocktails"
                description="Handcrafted cocktails and refreshing beverages"
                items={MENU_ITEMS.filter(item => item.category === 'drinks')}
                layout="list"
              />

              <MenuSection
                id="wine"
                title="Wine List"
                description="Carefully curated wines from around the world"
                items={MENU_ITEMS.filter(item => item.category === 'wine')}
                layout="list"
              />
            </div>

            {/* Dietary Legend */}
            <div className="mt-16 pt-8 border-t border-[rgb(var(--border))]">
              <h3 className="text-sm font-medium text-[rgb(var(--foreground))] uppercase tracking-wider mb-4">
                Dietary Key
              </h3>
              <div className="flex flex-wrap gap-6 text-sm text-[rgb(var(--muted-foreground))]">
                <span className="flex items-center gap-2">
                  <span className="dietary-icon dietary-v">V</span> {DIETARY_LABELS.v}
                </span>
                <span className="flex items-center gap-2">
                  <span className="dietary-icon dietary-vg">VG</span> {DIETARY_LABELS.vg}
                </span>
                <span className="flex items-center gap-2">
                  <span className="dietary-icon dietary-gf">GF</span> {DIETARY_LABELS.gf}
                </span>
              </div>
              <p className="mt-4 text-sm text-[rgb(var(--muted-foreground))]">
                Please inform your server of any allergies or dietary restrictions. We're happy to accommodate special requests.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTABanner
          title="Ready to Dine?"
          description="Book your table and experience farm-to-table excellence"
          primaryAction={{ label: 'Make a Reservation', href: '/reservations' }}
          secondaryAction={{ label: 'View Hours', href: '/contact' }}
        />

        <Footer />
      </main>
    </>
  )
}
