import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { MOCK_OPPORTUNITIES, SIMULATION_RESULT } from "../utils/mockData"

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "simulator", label: "Simulator" },
]

function OverviewTab({ onSelectPair }) {
  return (
    <div>
      <div className="stitch-node-glass rounded-none overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.8fr] gap-2 px-4 md:px-6 py-2.5 md:py-3 border-b border-white/5 bg-black/20">
          <span className="text-text-subtle text-[11px] font-mono uppercase tracking-wider">Pair</span>
          <span className="text-text-subtle text-[11px] font-mono uppercase tracking-wider">DEX A</span>
          <span className="text-text-subtle text-[11px] font-mono uppercase tracking-wider">DEX B</span>
          <span className="text-text-subtle text-[11px] font-mono uppercase tracking-wider">Diff</span>
          <span className="text-text-subtle text-[11px] font-mono uppercase tracking-wider">Profit</span>
          <span className="text-text-subtle text-[11px] font-mono uppercase tracking-wider">Status</span>
        </div>
        {MOCK_OPPORTUNITIES.map((opp) => {
          const diffColor = opp.diff >= 1.0 ? "text-success" : opp.diff >= 0.5 ? "text-pink-neon" : "text-on-surface-variant"
          return (
            <button
              key={opp.id}
              onClick={() => onSelectPair(opp)}
              className="w-full grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.8fr] gap-2 px-4 md:px-6 py-3 md:py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors text-left items-center last:border-b-0"
            >
              <span className="font-medium text-on-surface text-body-sm md:text-body-md">{opp.pair}</span>
              <span className="text-on-surface-variant text-body-sm">{opp.dexA.name}</span>
              <span className="text-on-surface-variant text-body-sm">{opp.dexB.name}</span>
              <span className={`font-mono text-body-sm md:text-body-md ${diffColor}`}>
                {opp.diff >= 0 ? "+" : ""}{opp.diff.toFixed(2)}%
              </span>
              <span className={`font-mono text-body-sm md:text-body-md ${diffColor}`}>
                ${opp.profit.toFixed(2)}
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-sm w-fit ${opp.status === "pro" ? "text-pink-neon bg-pink-neon/10" : "text-tertiary bg-tertiary/10"}`}>
                {opp.status === "pro" ? "PRO" : "Live"}
              </span>
            </button>
          )
        })}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-text-subtle text-body-sm font-mono">Last updated: 12s ago</span>
        <span className="flex items-center gap-1.5 text-[11px] text-tertiary font-mono">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          Scanning 4 DEX
        </span>
      </div>
    </div>
  )
}

function SimulatorTab() {
  const [amount, setAmount] = useState(2000)
  const [pair, setPair] = useState("SOL/USDC")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="stitch-node-glass rounded-none p-4 md:p-6">
        <h2 className="text-on-surface text-body-md font-semibold mb-4">Input Parameters</h2>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-on-surface-variant text-body-sm">Trading Pair</span>
            <select
              value={pair}
              onChange={(e) => setPair(e.target.value)}
              className="bg-surface border border-white/10 text-on-surface px-3 py-2 text-body-sm rounded-none focus:border-pink-neon outline-none"
            >
              <option>ETH/USDC</option>
              <option>SOL/USDC</option>
              <option>AVAX/USDT</option>
              <option>MATIC/USDC</option>
              <option>LINK/ETH</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-on-surface-variant text-body-sm">Capital Amount (USD)</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="bg-surface border border-white/10 text-on-surface px-3 py-2 text-body-sm font-mono rounded-none focus:border-pink-neon outline-none"
            />
          </label>
          <button className="btn-primary-filled px-6 py-2.5 md:py-3 rounded-DEFAULT font-label-mono uppercase tracking-wider text-[11px] w-fit">
            Simulate
          </button>
        </div>
      </div>

      <div className="stitch-node-glass rounded-none p-4 md:p-6">
        <h2 className="text-on-surface text-body-md font-semibold mb-4">Estimated Results</h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-on-surface-variant text-body-sm">Gross Profit</span>
            <span className="text-on-surface font-mono text-body-sm">${SIMULATION_RESULT.grossProfit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-on-surface-variant text-body-sm">Gas Fee</span>
            <span className="text-error font-mono text-body-sm">-${SIMULATION_RESULT.gasFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-on-surface-variant text-body-sm">DEX Fee (0.3%)</span>
            <span className="text-error font-mono text-body-sm">-${SIMULATION_RESULT.dexFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-on-surface-variant text-body-sm">Slippage Cost</span>
            <span className="text-error font-mono text-body-sm">-${SIMULATION_RESULT.slippageCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-on-surface text-body-md font-semibold">Net Profit</span>
            <span className="text-success text-body-md font-mono font-semibold">+${SIMULATION_RESULT.netProfit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-body-sm">ROI</span>
            <span className="text-success font-mono text-body-sm">+{SIMULATION_RESULT.roi.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "overview"
  function setTab(tab) {
    setSearchParams({ tab })
  }

  return (
    <main className="flex-grow pt-16 md:pt-20 pb-24">
      <div className="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">


        <div className="flex gap-1 mb-6 border-b border-white/5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider transition-colors ${
                activeTab === tab.id
                  ? "text-pink-neon border-b-2 border-pink-neon"
                  : "text-text-subtle hover:text-on-surface-variant"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && <OverviewTab onSelectPair={() => {}} />}
        {activeTab === "simulator" && <SimulatorTab />}
      </div>
    </main>
  )
}
