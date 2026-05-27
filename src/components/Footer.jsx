import Logo from "./Logo"
import { IconX } from "./Icons"

export default function Footer() {
  return (
    <footer className="bg-surface-dim w-full py-6 md:py-10 lg:py-12 border-t border-surface-variant mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto gap-3 md:gap-6 lg:gap-8">
        <div className="flex items-center gap-2 md:gap-3">
          <Logo size={22} className="w-5 h-5 md:w-6 md:h-6" />
          <span className="font-display-md text-[1rem] md:text-headline-lg">
            <span className="text-primary">Foxyse</span><span className="text-pink-neon">Labs</span><span className="text-on-surface">.</span>
          </span>
        </div>
        <div className="flex gap-4 md:gap-5 lg:gap-6 items-center">
          <a className="text-text-subtle hover:text-pink-neon transition-colors" href="#" aria-label="X (Twitter)">
            <IconX className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          </a>
        </div>
        <div className="font-body-sm text-[0.75rem] md:text-[0.8rem] lg:text-body-sm text-text-subtle">
          FoxyseLabs. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
