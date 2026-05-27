const s = { stroke: "currentColor", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }

export function IconLayout({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="4" rx="1" />
      <rect x="14" y="10" width="7" height="11" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

export function IconNetwork({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s} className={className}>
      <rect x="2" y="2" width="8" height="8" rx="1" />
      <rect x="14" y="2" width="8" height="8" rx="1" />
      <rect x="8" y="14" width="8" height="8" rx="1" />
      <line x1="6" y1="10" x2="10" y2="14" />
      <line x1="18" y1="10" x2="14" y2="14" />
    </svg>
  )
}

export function IconDevices({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s} className={className}>
      <rect x="2" y="5" width="12" height="14" rx="2" />
      <rect x="15" y="7" width="7" height="12" rx="1" />
      <line x1="8" y1="19" x2="8" y2="21" />
      <line x1="6" y1="21" x2="10" y2="21" />
    </svg>
  )
}



export function IconX({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s} className={className}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  )
}

export function IconScanEye({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s} className={className}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="1" />
      <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
    </svg>
  )
}

export function IconChartColumn({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s} className={className}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  )
}

export function IconRocket({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s} className={className}>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
      <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
    </svg>
  )
}

export function IconCheck({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s} className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function IconCross({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s} className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function IconArrowRight({ className = "" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...s} className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
