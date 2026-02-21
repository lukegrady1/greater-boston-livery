import { Star } from 'lucide-react'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white border border-silver p-8 flex flex-col gap-4">
      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-gold text-gold" />
        ))}
      </div>

      {/* Review text */}
      <blockquote className="font-body text-navy/80 text-sm leading-relaxed italic flex-1">
        "{review.text}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between pt-4 border-t border-silver">
        <div>
          <p className="font-body font-medium text-navy text-sm">{review.author}</p>
          {review.service && (
            <p className="label-sm mt-0.5 text-gold/70">{review.service}</p>
          )}
        </div>
        <div className="text-right">
          <p className="font-body text-xs text-navy/40">{review.date}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <p className="text-xs font-body text-gold font-medium">Verified</p>
          </div>
        </div>
      </div>
    </div>
  )
}
