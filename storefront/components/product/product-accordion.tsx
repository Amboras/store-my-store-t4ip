'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ProductAccordionProps {
  description?: string | null
  details?: Record<string, string>
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function ProductAccordion({ description, details }: ProductAccordionProps) {
  return (
    <div className="border-t">
      {description && (
        <AccordionItem title="Description" defaultOpen>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </AccordionItem>
      )}

      <AccordionItem title="Technical Specifications">
        <div className="space-y-2">
          {[
            { label: 'Battery', value: '4000mAh Lithium-Ion' },
            { label: 'Speeds', value: '5 levels + Turbo Blast' },
            { label: 'Run Time', value: 'Up to 12 hours (Speed 1)' },
            { label: 'Charging', value: 'USB-C, ~3 hours full charge' },
            { label: 'Motor', value: 'Brushless (quiet)' },
            { label: 'Display', value: 'LED — battery % & speed' },
            { label: 'Weight', value: '~250g' },
            { label: 'Head', value: '360° adjustable angle' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-xs">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium text-foreground">{value}</span>
            </div>
          ))}
          {details &&
            Object.entries(details).map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium text-foreground">{v}</span>
              </div>
            ))}
        </div>
      </AccordionItem>

      <AccordionItem title="Shipping & Returns">
        <ul className="space-y-2 text-xs">
          <li>Free standard shipping on orders over £40</li>
          <li>Express 1–2 day delivery available at checkout</li>
          <li>Free returns within 30 days of delivery</li>
          <li>Item must be in original packaging and unused</li>
          <li>UK orders dispatched same day (Mon–Fri, orders before 2pm)</li>
        </ul>
      </AccordionItem>

      <AccordionItem title="Warranty & Support">
        <ul className="space-y-2 text-xs">
          <li>2-year full manufacturer warranty included</li>
          <li>Covers all manufacturing defects and component failures</li>
          <li>Contact us at support@coldsky.com for warranty claims</li>
          <li>We aim to respond within 24 hours on business days</li>
        </ul>
      </AccordionItem>
    </div>
  )
}
