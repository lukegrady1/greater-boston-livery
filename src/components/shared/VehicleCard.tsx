import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Wifi, Users, Check, Wine } from 'lucide-react'
import type { Vehicle } from '@/types'

interface VehicleCardProps {
  vehicle: Vehicle
  onClick?: () => void
}

export function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden bg-navy cursor-pointer aspect-[4/3]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
    >
      {/* Vehicle Image */}
      <motion.img
        src={vehicle.image}
        alt={`${vehicle.name} luxury vehicle`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.06 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/40 to-transparent" />

      {/* Bottom info - always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="label-sm mb-2">{vehicle.category}</p>
        <h3 className="font-display text-xl text-cream font-medium">{vehicle.name}</h3>

        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-silver/80 text-xs font-body">
            <Users size={13} />
            <span>{vehicle.capacity} passengers</span>
          </div>
          {vehicle.hasWifi && (
            <div className="flex items-center gap-1.5 text-gold text-xs font-body">
              <Wifi size={13} />
              <span>WiFi</span>
            </div>
          )}
          {vehicle.alcoholFriendly && (
            <div className="flex items-center gap-1.5 text-gold text-xs font-body">
              <Wine size={13} />
              <span>Alcohol OK</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover overlay — Quick Specs */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-navy/95 flex flex-col justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="label-sm mb-3">Quick Specs</p>
            <h3 className="font-display text-xl text-cream mb-6">{vehicle.name}</h3>

            <div className="mb-6">
              <div className="border border-navy-light p-3 inline-block">
                <p className="text-silver/60 text-xs font-body mb-1">Capacity</p>
                <p className="text-cream font-body font-medium">{vehicle.capacity} passengers</p>
              </div>
            </div>

            <ul className="space-y-2">
              {vehicle.features.slice(0, 5).map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-silver/80 text-sm font-body">
                  <Check size={12} className="text-gold flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-navy-light">
              <p className="text-gold text-xs font-body tracking-widest uppercase">View Fleet →</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gold accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gold"
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}
