import { cn } from '@/lib/utils'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full h-14 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 text-base',
        'placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-[#299D91]/40 focus:border-[#299D91]',
        'transition-all duration-200',
        className
      )}
      {...props}
    />
  )
}
