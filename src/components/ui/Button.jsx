import { cn } from '@/lib/utils'

export function Button({ className, variant = 'default', size = 'default', children, ...props }) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

  const variants = {
    default: 'bg-[#299D91] text-white hover:bg-[#1f7a70] focus-visible:ring-[#299D91] active:scale-[0.98]',
    outline: 'border border-[#299D91] text-[#299D91] bg-transparent hover:bg-[#e6f5f4]',
    ghost:   'text-[#299D91] hover:bg-[#e6f5f4]',
    danger:  'bg-red-500 text-white hover:bg-red-600',
  }

  const sizes = {
    default: 'h-12 px-5 text-base',
    sm:      'h-9 px-4 text-sm',
    lg:      'h-14 px-6 text-lg',
    icon:    'h-10 w-10',
  }

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
