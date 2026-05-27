# FoxyseLabs — Crypto Arbitrage Platform

## Concept
Platform arbitrase crypto antar DEX. Scanner + analisis + auto-execute.

## Target Pasar
Trader crypto yang paham arbitrase — B2C.

## Fitur — Fase 1 (MVP)

| Modul | Detail |
|---|---|
| **Scanner** | Aggregasi harga live multi-DEX via subgraph + RPC |
| **Analisis** | Hitung profit setelah gas, slippage, fee DEX |
| **Dashboard** | Tabel opportunity: pair, DEX A/B, diff %, profit, status |
| **Simulator** | Input pair + modal → hitung profit real-time |
| **Pricing** | Halaman subscription (Free/Pro/Elite) |

### Fitur — Fase 2

| Modul | Detail |
|---|---|
| **Auto-Execute** | Toggle ON/OFF, threshold profit, limit gas, eksekusi via wallet user |
| **Wallet Connect** | RainbowKit (MetaMask, WalletConnect, Coinbase) |
| **Alert** | Notif real-time saat peluang muncul |
| **Histori** | Log transaksi, success rate, net profit |

## Pricing

| Tier | Harga | Fitur |
|---|---|---|
| **Free** | $0 | Scanner mentah (tanpa analisis), 3 alerts lifetime, histori 7 hari |
| **Pro** | $19/bln | Scanner + analisis depth, unlimited alerts, auto-execute ON/OFF, histori 30 hari |
| **Elite** | $49/bln | Semua Pro + multi-wallet, prioritas eksekusi, API access, histori 90 hari, support prioritas |

## Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | React 19 + Vite + Tailwind CSS |
| **Wallet Connect** | RainbowKit + wagmi + viem |
| **State Management** | React Context / Zustand |
| **Data Layer** | TanStack Query |
| **Blockchain Indexer** | The Graph (Subgraph) + direct RPC |
| **Backend** | Node.js / Express atau Hono |
| **Database** | PostgreSQL + Redis |
| **Auth** | Wallet signature (SIWE) via RainbowKit |
| **Queue** | BullMQ (Redis) |
| **Deploy** | Vercel (frontend) + Railway/DigitalOcean (backend) |

## UI/UX
- Dark theme, pink neon (#FF007F), glassmorphism
- Font: Space Grotesk + JetBrains Mono
- Logo FoxyseLabs tetap
- Navigasi: Dashboard, Scanner, Simulator, Pricing

## Arsitektur

**Fase 1 (MVP):** Scanner + Dashboard + Simulator + Pricing
**Fase 2:** Auto-Execute + Wallet Connect
**Fase 3:** Multi-wallet + API access + optimasi
