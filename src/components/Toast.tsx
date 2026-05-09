import { createContext, useContext, useState, useCallback } from 'react'

type ToastItem = { id: string; message: string }

const ToastCtx = createContext<{ push: (msg: string) => void } | undefined>(undefined)

export function ToastProvider({ children }: { children: any }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const push = useCallback((message: string) => {
    const id = String(Date.now())
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500)
  }, [])

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div aria-live="polite" className="toast-area">
        {toasts.map((t) => (
          <div key={t.id} className="toast">{t.message}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx.push
}
