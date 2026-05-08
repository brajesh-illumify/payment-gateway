"use client"
import { SuccessIcon } from "./icons/success-icon"
import { ErrorIcon } from "./icons/error-icon"

import { useToastStore } from "../store/snackbar-slice"

const iconsMap: Record<"success" | "error", React.ReactNode> = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
}

export const Toast = ({
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const toast = useToastStore((state) => state.toast)

    if (!toast.isOpen) return null

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-xs w-full p-4 bg-layer border border-layer-line rounded-xl shadow-lg" role="alert" aria-labelledby="hs-toast-normal-example-label" {...props}>
            <div className="flex gap-x-3">
                {iconsMap[toast.type]}
                <div className="grow flex items-center">
                    <p id="hs-toast-normal-example-label" className="text-sm text-layer-foreground">
                       {toast.message}   
                    </p>
                    <div className="ms-auto">
                        <button type="button" onClick={() => toast.close()} className="shrink-0 flex justify-center items-center size-5 text-secondary-foreground opacity-50 hover:opacity-100 focus:outline-hidden" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}