import { Button } from "@/components/ui/button"
import { Coffee } from 'lucide-react'

interface SupportMeButtonProps {
  className?: string
}

export function SupportMeButton({ className }: SupportMeButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`flex items-center space-x-2 rounded-full hover:bg-yellow-50 hover:text-yellow-900 ${className}`}
      asChild
    >
      <a
        href="https://buymeacoffee.com/mudasirfayaz"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Coffee className="h-4 w-4 text-yellow-500" />
        <span>Buy me a coffee</span>
      </a>
    </Button>
  )
}

