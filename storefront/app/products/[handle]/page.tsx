import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600
import { medusaServerClient } from '@/lib/medusa-client'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
  Zap,
  Star,
  Lock,
  Award,
  Wind,
} from 'lucide-react'
import ProductActions from '@/components/product/product-actions'
import ProductAccordion from '@/components/product/product-accordion'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import BundleOffer from '@/components/product/bundle-offer'
import StockUrgency from '@/components/product/stock-urgency'
import { getProductPlaceholder } from '@/lib/utils/placeholder-images'
import { type VariantExtension } from '@/components/product/product-price'

async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        allow_backorder: v.allow_backorder ?? false,
        inventory_quantity: v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

async function getTwinPackProduct() {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) return null

    const response = await medusaServerClient.store.product.list({
      handle: 'coldsky-twin-pack-2-fans-better-together',
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `Shop ${product.title}`,
      ...(product.thumbnail ? { images: [{ url: product.thumbnail }] } : {}),
    },
  }
}

const trustBadges = [
  { icon: Lock, label: 'Secure Checkout', sub: '256-bit SSL' },
  { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions asked' },
  { icon: Shield, label: '2-Year Warranty', sub: 'Full cover' },
  { icon: Award, label: '50,000+ Sold', sub: 'Trusted worldwide' },
]

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const [product, twinPack] = await Promise.all([
    getProduct(handle),
    getTwinPackProduct(),
  ])

  if (!product) {
    notFound()
  }

  const variantExtensions = await getVariantExtensions(product.id)

  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail }] : []),
    ...(product.images || []).filter((img: { url: string }) => img.url !== product.thumbnail),
  ]

  const displayImages = allImages.length > 0
    ? allImages
    : [{ url: getProductPlaceholder(product.id) }]

  const isProFan = handle === 'coldsky-handheld-mini-fan-pro-edition'

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b bg-muted/30">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── IMAGES ─────────────────── */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-xl">
              <Image
                src={displayImages[0].url}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Badge overlay */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className="inline-flex items-center gap-1.5 bg-accent text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  <Zap className="h-3 w-3" />
                  {isProFan ? 'Best Seller' : 'Bundle Deal'}
                </span>
              </div>
            </div>

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.slice(1, 5).map((image: { url: string }, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-[3/4] overflow-hidden bg-muted rounded-lg border border-border/60"
                  >
                    <Image
                      src={image.url}
                      alt={`${product.title} ${idx + 2}`}
                      fill
                      sizes="12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Rating bar below images */}
            <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.9</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">2,400+ satisfied customers</span>
            </div>
          </div>

          {/* ── PRODUCT INFO ─────────────── */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-5">
            {/* Title */}
            <div>
              {product.subtitle && (
                <p className="text-xs uppercase tracking-[0.15em] font-semibold coldsky-cyan mb-2">
                  {product.subtitle}
                </p>
              )}
              <h1 className="text-h2 font-heading font-bold leading-tight">{product.title}</h1>
            </div>

            <ProductViewTracker
              productId={product.id}
              productTitle={product.title}
              variantId={product.variants?.[0]?.id || null}
              currency={product.variants?.[0]?.calculated_price?.currency_code || 'usd'}
              value={product.variants?.[0]?.calculated_price?.calculated_amount ?? null}
            />

            {/* Urgency Banner */}
            <StockUrgency />

            {/* Variant Selector + Price + Add to Cart */}
            <ProductActions product={product} variantExtensions={variantExtensions} />

            {/* Bundle Offer (only show on single fan page) */}
            {isProFan && twinPack && (
              <BundleOffer bundleProduct={twinPack} />
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {trustBadges.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2.5 bg-muted/50 rounded-lg px-3 py-2.5">
                  <Icon className="h-4 w-4 flex-shrink-0 text-accent" strokeWidth={2} />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{label}</p>
                    <p className="text-[10px] text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Secure checkout line */}
            <div className="flex items-center justify-center gap-2 py-2 border border-dashed border-border rounded-lg">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Secure checkout — Visa, Mastercard, PayPal, Apple Pay</p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-3 py-2">
              {[
                { icon: Wind, label: '5 Speed + Turbo' },
                { icon: Zap, label: 'USB-C Charging' },
                { icon: Truck, label: 'Fast UK Delivery' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center border border-border/60 rounded-lg py-3 px-2">
                  <Icon className="h-5 w-5 mx-auto mb-1 text-accent" strokeWidth={1.5} />
                  <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Accordion Sections */}
            <ProductAccordion
              description={product.description}
              details={product.metadata as Record<string, string> | undefined}
            />
          </div>
        </div>
      </div>
    </>
  )
}
