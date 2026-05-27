import { useState } from "react"
import { useAccount } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"

const PLANS = [
  {
    name: "Free", price: "$0", period: "forever",
    features: [
      { text: "Scanner (raw prices only)", included: true },
      { text: "Profit analysis", included: false },
      { text: "Alerts (3 lifetime)", included: true },
      { text: "Auto-Execute", included: false },
      { text: "Historical data (7 days)", included: true },
    ],
    cta: "Get Started", highlighted: false,
  },
  {
    name: "Pro", price: "$19", period: "per month",
    features: [
      { text: "Scanner with full analysis", included: true },
      { text: "Profit analysis", included: true },
      { text: "Unlimited alerts", included: true },
      { text: "Auto-Execute ON/OFF", included: true },
      { text: "Historical data (30 days)", included: true },
    ],
    cta: "Subscribe Pro", highlighted: true,
  },
  {
    name: "Elite", price: "$49", period: "per month",
    features: [
      { text: "Scanner with full analysis", included: true },
      { text: "Profit analysis", included: true },
      { text: "Unlimited alerts", included: true },
      { text: "Auto-Execute (Highest Priority)", included: true },
      { text: "Multi-Wallet support", included: true },
      { text: "API Access", included: true },
      { text: "Historical data (90 days)", included: true },
      { text: "Priority Support", included: true },
    ],
    cta: "Subscribe Elite", highlighted: false,
  },
]

function CheckIcon({ className = "w-3.5 h-3.5 shrink-0 text-success" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function CrossIcon({ className = "w-3.5 h-3.5 shrink-0 text-text-subtle" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export default function PricingSection() {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [showModal, setShowModal] = useState(false)

  function handleClick(planName) {
    if (!isConnected) {
      setShowModal(true)
      return
    }
  }

  return (
    <section id="pricing" className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-12 md:mb-20 lg:mb-32 scroll-mt-32">
      <div className="text-center mb-10 md:mb-12">
        <span className="font-label-mono text-label-mono text-pink-neon tracking-widest uppercase">Pricing</span>
        <h2 className="text-display-md text-on-surface font-semibold mt-2">
          Choose Your Plan
        </h2>
        <p className="text-on-surface-variant text-body-md mt-2 max-w-lg mx-auto">
          Start with Free scanning. Upgrade to unlock analysis and automated execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`stitch-node-glass rounded-none p-5 md:p-6 flex flex-col ${plan.highlighted ? "border-pink-neon/30 relative" : ""}`}>
            {plan.highlighted && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-pink-neon text-[#590028] px-3 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold">
                Most Popular
              </span>
            )}
            <h3 className="text-on-surface text-headline-lg font-semibold">{plan.name}</h3>
            <div className="mt-2 mb-4">
              <span className="text-on-surface text-display-md font-bold font-mono">{plan.price}</span>
              <span className="text-on-surface-variant text-body-sm ml-1">/{plan.period}</span>
            </div>
            <div className="border-t border-white/5 pt-4 flex-1">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5">
                  {f.included ? <CheckIcon /> : <CrossIcon />}
                  <span className={`text-body-sm ${f.included ? "text-on-surface" : "text-text-subtle"}`}>{f.text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleClick(plan.name)}
              className={`mt-6 w-full py-2.5 md:py-3 rounded-DEFAULT font-label-mono uppercase tracking-wider text-[11px] transition-all duration-300 ${plan.highlighted ? "btn-primary-filled" : "btn-cyber-pink"}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-surface border border-white/10 p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-pink-neon/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF007F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="text-on-surface text-headline-lg font-semibold mb-2">Connect Wallet</h3>
              <p className="text-on-surface-variant text-body-sm mb-6">
                Connect your wallet to subscribe and unlock arbitrage opportunities.
              </p>
              <button
                onClick={() => { openConnectModal?.(); setShowModal(false) }}
                className="btn-primary-filled w-full py-3 rounded-DEFAULT font-label-mono uppercase tracking-wider text-[11px]"
              >
                Connect Wallet
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="mt-3 w-full py-2 text-text-subtle hover:text-on-surface-variant font-label-mono text-[11px] uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
