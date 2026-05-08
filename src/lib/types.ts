export type Option = {
    label: string
    value: string | number
}

export type ToastType = {
    title: string
    description: string
    type: "success" | "error" | "info" | "warning"
}