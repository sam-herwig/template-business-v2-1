'use client'

import { Car, CircleParking, Train, MapPin } from 'lucide-react'
import type { ParkingOption } from '@/types'

interface ParkingInfoProps {
  options: ParkingOption[]
}

const iconMap = {
  street: <Car className="w-5 h-5" />,
  valet: <Car className="w-5 h-5" />,
  garage: <CircleParking className="w-5 h-5" />,
  transit: <Train className="w-5 h-5" />,
}

export function ParkingInfo({ options }: ParkingInfoProps) {
  return (
    <div className="bg-[rgb(var(--muted))] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-5 h-5 text-primary-600" />
        <h3 className="font-display text-xl text-dark-900 dark:text-white">
          Parking & Directions
        </h3>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex gap-3 p-4 bg-[rgb(var(--background))] rounded-xl"
          >
            <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0 text-primary-600 dark:text-primary-400">
              {iconMap[option.type]}
            </div>
            <div>
              <h4 className="font-medium text-dark-900 dark:text-white text-sm mb-0.5">
                {option.label}
              </h4>
              <p className="text-xs text-[rgb(var(--muted-foreground))]">
                {option.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
