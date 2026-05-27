import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import PricingSection from "../components/PricingSection"
import { IconArrowRight, IconScanEye, IconChartColumn, IconRocket } from "../components/Icons"

function Item({ name }) {
  return (
    <span className="inline-flex items-center mr-8 md:mr-12 shrink-0">
      <span>{name}</span>
      <span className="text-pink-neon/30 ml-8 md:ml-12">◆</span>
    </span>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) navigate("/dashboard", { replace: true })
  }, [isConnected, navigate])

  return (
    <main className="flex-grow pt-24 md:pt-32 pb-24">
      <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-12 md:mb-20 lg:mb-32">
        <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-10 text-center max-w-4xl mx-auto">
          <h1 className="text-[1.65rem] md:text-display-lg text-on-surface font-bold md:font-bold leading-tight">
            Arbitrage scanner for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-pink-neon">DEX markets.</span>
          </h1>
          <p className="text-body-sm md:text-body-md text-on-surface-variant max-w-2xl">
            Scan multiple DEX networks in real-time, detect price differences, and execute profitable arbitrage trades — all from one dashboard.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 items-center justify-center">
            <ConnectButton.Custom>
              {({ account, openConnectModal, mounted }) => {
                const handleClick = () => {
                  if (!mounted) return
                  if (account) {
                    navigate("/dashboard")
                  } else {
                    openConnectModal()
                  }
                }
                return (
                  <button onClick={handleClick} className="btn-primary-filled px-6 md:px-8 py-3 md:py-4 rounded-DEFAULT font-label-mono uppercase tracking-wider text-[0.7rem] md:text-label-mono">
                    Start Scanning
                  </button>
                )
              }}
            </ConnectButton.Custom>
            <a href="#pricing" className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-mono uppercase tracking-wider px-3 md:px-4 py-3 md:py-4 flex items-center gap-1.5 md:gap-2 text-[0.7rem] md:text-label-mono">
              View Pricing <IconArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="w-full overflow-hidden py-6 md:py-8 mb-12 md:mb-20 lg:mb-32 border-t border-b border-white/5 bg-black/10">
        <div className="marquee-track font-mono text-body-sm md:text-body-md text-on-surface-variant whitespace-nowrap">
          <Item name="Uniswap" />
          <Item name="PancakeSwap" />
          <Item name="Raydium" />
          <Item name="Orca" />
          <Item name="Trader Joe" />
          <Item name="QuickSwap" />
          <Item name="Curve" />
          <Item name="Balancer" />
          <Item name="Uniswap" />
          <Item name="PancakeSwap" />
          <Item name="Raydium" />
          <Item name="Orca" />
          <Item name="Trader Joe" />
          <Item name="QuickSwap" />
          <Item name="Curve" />
          <Item name="Balancer" />
        </div>
        <style>{`@keyframes mar{0%{transform:translateX(0)}to{transform:translateX(-50%)}}.marquee-track{animation:mar 40s linear infinite;display:inline-flex;align-items:center;white-space:nowrap;will-change:transform}`}</style>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto mb-12 md:mb-20 lg:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="stitch-node-glass rounded-none p-5 md:p-6">
            <IconScanEye className="w-10 h-10 text-pink-neon mb-2" />
            <h3 className="text-on-surface text-body-md font-semibold mb-2">Scan</h3>
            <p className="text-on-surface-variant text-body-sm">Real-time price aggregation from Uniswap, PancakeSwap, Raydium, and Trader Joe.</p>
          </div>
          <div className="stitch-node-glass rounded-none p-5 md:p-6">
            <IconChartColumn className="w-10 h-10 text-pink-neon mb-2" />
            <h3 className="text-on-surface text-body-md font-semibold mb-2">Analyze</h3>
            <p className="text-on-surface-variant text-body-sm">Deep profit analysis accounting for gas fees, slippage, and DEX transaction costs.</p>
          </div>
          <div className="stitch-node-glass rounded-none p-5 md:p-6">
            <IconRocket className="w-10 h-10 text-pink-neon mb-2" />
            <h3 className="text-on-surface text-body-md font-semibold mb-2">Execute</h3>
            <p className="text-on-surface-variant text-body-sm">Automated execution with customizable thresholds. Set it and let the system work.</p>
          </div>
        </div>
      </section>

      <PricingSection />
    </main>
  )
}
