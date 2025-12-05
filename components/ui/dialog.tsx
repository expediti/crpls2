import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children?: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-auto relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-full p-1 opacity-70 hover:bg-slate-100 hover:opacity-100 transition-all focus:outline-none"
        >
          <X className="h-5 w-5 text-slate-500" />
        </button>
        {children}
      </div>
    </div>
  )
}

export function DialogContent({ children, className }: { children?: React.ReactNode, className?: string }) {
  return <div className={cn("p-6", className)}>{children}</div>
}