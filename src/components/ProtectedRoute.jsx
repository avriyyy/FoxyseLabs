import { Navigate } from "react-router-dom"
import { useAccount } from "wagmi"

export default function ProtectedRoute({ children }) {
  const { isConnected, status } = useAccount()

  if (status === "connecting" || status === "reconnecting") {
    return (
      <main className="flex-grow pt-24 md:pt-32 pb-24">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-pink-neon border-t-transparent rounded-full animate-spin" />
            <span className="text-on-surface-variant text-body-sm font-mono">Connecting wallet...</span>
          </div>
        </div>
      </main>
    )
  }

  if (!isConnected) {
    return <Navigate to="/" replace />
  }

  return children
}
