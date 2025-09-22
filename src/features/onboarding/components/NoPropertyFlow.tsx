import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { QrCode, Hash, ChevronRight, Info } from "lucide-react"
import BaseBottomSheet from "@/components/BaseBottomSheet"

interface NoPropertyFlowSheetProps {
  isOpen?: boolean
  onClose?: () => void
  title?: string
  onSubmitId?: (id: string) => void
  onScanQr?: () => void
  loading?: boolean
  error?: string | null
}

const NoPropertyFlowSheet: React.FC<NoPropertyFlowSheetProps> = ({
  isOpen = true,
  onClose = () => {},
  onSubmitId,
  onScanQr,
  loading = false,
  error = null,
}) => {
  const [mode, setMode] = useState<"id" | "qr">("id")
  const [pgId, setPgId] = useState("")


  const handleSubmitId = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmitId?.(pgId)
  }

  return (
    <BaseBottomSheet isOpen={isOpen} onClose={onClose} closable={false} bodyClassName="p-8">
      <div className="w-full max-w-[720px] mx-auto">
      <div className="mb-6 mt-3">
        <h2 className="text-xl font-semibold text-[#101828]">Join your property</h2>
        <p className="text-sm text-[#717182] mt-1">
          Enter your Easy PG ID or scan the QR provided by your property manager
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Enter ID Card */}
        <div
          className={`rounded-2xl border ${
            mode === "id" ? "border-[#155dfc]" : "border-zinc-200"
          } bg-white p-5 transition-colors`}
        >
          <button
            type="button"
            onClick={() => setMode("id")}
            className="w-full flex items-center gap-3 text-left"
          >
            <div className={`p-2 rounded-lg ${mode === "id" ? "bg-[#155dfc]/10" : "bg-zinc-100"}`}>
              <Hash className={`size-5 ${mode === "id" ? "text-[#155dfc]" : "text-zinc-700"}`} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-[#101828]">Enter Easy PG ID</p>
              <p className="text-xs text-[#717182]">Ask your property manager for this ID</p>
            </div>
            <ChevronRight className="size-4 text-zinc-400" />
          </button>

          {mode === "id" && (
            <form onSubmit={handleSubmitId} className="mt-4 space-y-3">
              <div>
                <label htmlFor="pgId" className="block text-xs font-medium text-[#4b5563] mb-1">
                  Easy PG ID
                </label>
                <input
                  id="pgId"
                  type="text"
                  placeholder="e.g. PG1234"
                  value={pgId}
                  onChange={(e) => setPgId(e.target.value.trim())}
                  className={`w-full h-10 px-3 rounded-md border outline-none transition-all text-sm ${
                    "border-zinc-300 focus:ring-2 focus:ring-[#155dfc]/30"
                  }`}
                  inputMode="text"
                  autoComplete="off"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-2">
                  <Info className="size-4 text-red-500 mt-0.5" />
                  <p className="text-xs text-red-700">{error}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Verifying..." : "Continue"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setPgId("")
                  }}
                >
                  Clear
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Scan QR Card */}
        <div
          className={`rounded-2xl border ${
            mode === "qr" ? "border-[#155dfc]" : "border-zinc-200"
          } bg-white p-5 transition-colors`}
        >
          <button
            type="button"
            onClick={() => setMode("qr")}
            className="w-full flex items-center gap-3 text-left"
          >
            <div className={`p-2 rounded-lg ${mode === "qr" ? "bg-[#155dfc]/10" : "bg-zinc-100"}`}>
              <QrCode className={`size-5 ${mode === "qr" ? "text-[#155dfc]" : "text-zinc-700"}`} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-[#101828]">Scan QR Code</p>
              <p className="text-xs text-[#717182]">Use your camera to scan the property QR</p>
            </div>
            <ChevronRight className="size-4 text-zinc-400" />
          </button>

          {mode === "qr" && (
            <div className="mt-4 space-y-3">
              {/* Placeholder for future scanner integration */}
              <div className="aspect-square rounded-lg border border-dashed border-zinc-300 grid place-items-center bg-zinc-50">
                <div className="flex flex-col items-center gap-2 text-zinc-500">
                  <QrCode className="size-8" />
                  <p className="text-xs">Camera preview will appear here</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => onScanQr?.()}>Start Scan</Button>
                <Button variant="outline" onClick={() => setMode("id")}>Enter ID instead</Button>
              </div>

              <p className="text-[11px] text-[#717182]">
                Tip: If scanning doesn’t work, ask your manager to share the Easy PG ID
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </BaseBottomSheet>
  )
}

export default NoPropertyFlowSheet