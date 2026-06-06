'use client'

import { useState } from 'react'
import { Package, Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'

interface BundleOfferProps {
  bundleProduct: {
    id: string
    title: string
    handle: string
    variants?: Array<{
      id: string
      calculated_price?: {
        calculated_amount?: number
        currency_code?: string
      }
    }>
  }
}

function formatPrice(amount: number | undefined, currency: string) {
  if (amount == null) return ''
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100)
}

export default function BundleOffer({ bundleProduct }: BundleOfferProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem, isAddingItem } = useCart()

  const bundleVariant = bundleProduct.variants?.[0]
  const bundlePrice = bundleVariant?.calculated_price?.calculated_amount
  const bundleCurrency = bundleVariant?.calculated_price?.currency_code || 'gbp'

  // Individual price is ~24.99, two would be ~49.98 — bundle saves ~10
  const originalTwoPrice = bundlePrice ? Math.round(bundlePrice * 1.25) : undefined

  const handleAddBundle = () => {
    if (!bundleVariant?.id) return

    addItem(
      { variantId: bundleVariant.id, quantity: 1 },
      {
        onSuccess: () => {
          setJustAdded(true)
          toast.success('Twin Pack added to bag — great value!')
          setTimeout(() => setJustAdded(false), 3000)
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to add bundle')
        },
      }
    )
  }

  return (
    <div className="border-2 border-accent/30 rounded-xl overflow-hidden bg-gradient-to-br from-accent/5 to-blue-500/5">
      {/* Header — always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-accent/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
            <Package className="h-4 w-4 text-accent" />
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-accent uppercase tracking-wide">Bundle &amp; Save</p>
            <p className="text-sm font-semibold text-foreground">
              Get 2 fans — save{' '}
              {originalTwoPrice && bundlePrice
                ? formatPrice(originalTwoPrice - bundlePrice, bundleCurrency)
                : '£10'}
            </p>
          </div>
        </div>
        <div className="text-muted-foreground">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-accent/20 pt-3 animate-slide-down">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm font-semibold">{bundleProduct.title}</p>
              <ul className="mt-1.5 space-y-1">
                {[
                  '2x coldSky Pro Fans (full spec)',
                  '2x USB-C cables included',
                  'Gift-ready packaging',
                  'Mix & match any 2 colours',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-accent flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-right flex-shrink-0">
              {originalTwoPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(originalTwoPrice, bundleCurrency)}
                </p>
              )}
              <p className="text-lg font-bold text-accent">
                {bundlePrice != null ? formatPrice(bundlePrice, bundleCurrency) : ''}
              </p>
            </div>
          </div>

          <button
            onClick={handleAddBundle}
            disabled={isAddingItem || !bundleVariant?.id}
            className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wide rounded-lg transition-all ${
              justAdded
                ? 'bg-green-600 text-white'
                : 'bg-accent text-white hover:bg-accent/90'
            }`}
          >
            {isAddingItem ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : justAdded ? (
              <>
                <Check className="h-4 w-4" />
                Twin Pack Added!
              </>
            ) : (
              <>
                <Package className="h-4 w-4" />
                Add Twin Pack to Bag
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
