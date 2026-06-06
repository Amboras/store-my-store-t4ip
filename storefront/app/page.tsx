'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Wind,
  Battery,
  Zap,
  Gauge,
  Timer,
  Star,
  ChevronRight,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80'

const features = [
  {
    icon: Battery,
    title: '4000mAh Battery',
    desc: 'All-day power that keeps going as long as you do — up to 12 hours on a single charge.',
  },
  {
    icon: Gauge,
    title: '5-Speed Turbo',
    desc: 'From gentle breeze to turbo blast — choose the exact airflow you need, when you need it.',
  },
  {
    icon: Wind,
    title: 'Whisper-Quiet Motor',
    desc: 'Advanced brushless motor delivers powerful cooling without disruptive noise.',
  },
  {
    icon: Zap,
    title: 'LED Smart Display',
    desc: 'Clear battery indicator and speed readout so you\'re always in control.',
  },
  {
    icon: Timer,
    title: 'USB-C Fast Charge',
    desc: 'Back to full power in under 3 hours. Charges via any USB-C cable you already own.',
  },
  {
    icon: Truck,
    title: 'Compact & Lightweight',
    desc: 'Slips into any bag or pocket. At just 250g, you won\'t even notice it\'s there.',
  },
]

const useCases = [
  { label: 'Beach Days', bg: 'from-cyan-500/20 to-blue-500/10' },
  { label: 'Travel & Flights', bg: 'from-sky-500/20 to-indigo-500/10' },
  { label: 'Outdoor Events', bg: 'from-teal-500/20 to-cyan-500/10' },
  { label: 'Office & Desk', bg: 'from-blue-500/20 to-sky-500/10' },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setNewsletterSubmitted(true)
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="coldSky hero — beach scene"
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-950/70 to-transparent" />
        </div>

        <div className="relative container-custom grid lg:grid-cols-2 gap-8 items-center py-24 lg:py-36">
          <div className="space-y-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-1.5">
              <Star className="h-3.5 w-3.5 text-accent fill-accent" />
              <span className="text-sm font-semibold text-accent tracking-wide">Best Seller — 4.9 Stars</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
              Stay Cool,<br />
              <span className="coldsky-cyan">Anywhere.</span>
            </h1>

            <p className="text-lg text-white/70 max-w-md leading-relaxed">
              The coldSky Handheld Fan packs 5-speed turbo power and a 4000mAh battery into a palm-sized design — built for beach, travel, and every adventure in between.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-accent/90 transition-all animate-pulse-glow"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-white/10 transition-all"
                prefetch={true}
              >
                Our Story
              </Link>
            </div>

            {/* Trust micro-signals */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <Shield className="h-4 w-4 text-accent" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <RotateCcw className="h-4 w-4 text-accent" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <Truck className="h-4 w-4 text-accent" />
                <span>Free UK Shipping</span>
              </div>
            </div>
          </div>

          {/* Hero right — product badge card */}
          <div className="hidden lg:flex justify-end items-center">
            <div className="relative w-[380px] h-[460px] bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 gap-5">
                <div className="w-24 h-24 rounded-full coldsky-gradient flex items-center justify-center shadow-2xl shadow-accent/40">
                  <Wind className="h-12 w-12 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-1">coldSky Turbo</p>
                  <p className="text-white text-2xl font-bold">Mini Fan Pro</p>
                </div>
                {/* Spec pills */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  {[
                    { label: 'Battery', value: '4000mAh' },
                    { label: 'Speeds', value: '5 + Turbo' },
                    { label: 'Run Time', value: '12 Hours' },
                    { label: 'Charge', value: 'USB-C' },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-white/10 rounded-xl px-3 py-3 text-center">
                      <p className="text-white/50 text-[10px] uppercase tracking-wider">{spec.label}</p>
                      <p className="text-white text-sm font-bold mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-white/60 text-xs ml-1">4.9 / 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────── */}
      <section className="py-4 border-y bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Truck, label: 'Free UK Shipping', sub: 'On orders over £40' },
              { icon: RotateCcw, label: '30-Day Returns', sub: 'Hassle-free policy' },
              { icon: Shield, label: '2-Year Warranty', sub: 'Full manufacturer cover' },
              { icon: Zap, label: 'Fast Delivery', sub: '1–3 business days' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="h-4.5 w-4.5 text-accent" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────────────── */}
      <section className="py-section bg-muted/30">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold coldsky-cyan mb-3">Why coldSky</p>
            <h2 className="text-h2 font-heading font-bold text-balance">
              Engineering meets portability
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every detail of the coldSky fan is designed to keep you comfortable — without weighing you down.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-border/60 hover:border-accent/40 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-lg coldsky-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-sm font-bold mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ───────────────────────────────────── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ── USE CASES ─────────────────────────────────────── */}
      <section className="py-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold coldsky-cyan mb-3">Perfect For</p>
            <h2 className="text-h2 font-heading font-bold">Wherever life takes you</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {useCases.map(({ label, bg }) => (
              <div
                key={label}
                className={`rounded-2xl bg-gradient-to-br ${bg} border border-border/40 p-6 flex flex-col items-center justify-center gap-3 hover:scale-[1.02] transition-transform cursor-default`}
              >
                <Wind className="h-8 w-8 text-accent" />
                <p className="font-semibold text-sm text-foreground text-center">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE EDITORIAL ────────────────────────────── */}
      <section className="py-section bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-[4/5] bg-muted rounded-2xl overflow-hidden relative shadow-xl">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Adventure lifestyle — coldSky in action"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold coldsky-cyan">Our Mission</p>
              <h2 className="text-h2 font-heading font-bold">
                Built for people who never slow down
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                coldSky was born on a beach in summer 2022 when our founder couldn't find a fan that was powerful enough to make a difference, but small enough to carry everywhere.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Two years and 50,000 happy customers later, we're still obsessed with one thing: making you comfortable wherever you are.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-accent hover:gap-3 transition-all"
                prefetch={true}
              >
                Read Our Story
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <section className="py-section coldsky-gradient">
        <div className="container-custom max-w-xl text-center">
          <Wind className="h-10 w-10 text-white/40 mx-auto mb-4" />
          <h2 className="text-h2 font-heading font-bold text-white">Stay in the breeze</h2>
          <p className="mt-3 text-white/70 text-sm">
            Get exclusive deals, product launches, and cooling tips delivered to your inbox.
          </p>

          {newsletterSubmitted ? (
            <div className="mt-8 bg-white/10 border border-white/20 rounded-xl p-6">
              <p className="text-white font-semibold">You&apos;re in! Stay cool.</p>
              <p className="text-white/60 text-sm mt-1">We&apos;ll be in touch with something great soon.</p>
            </div>
          ) : (
            <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-white/60 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-foreground px-6 py-3 text-sm font-bold uppercase tracking-wide rounded-sm hover:bg-white/90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
