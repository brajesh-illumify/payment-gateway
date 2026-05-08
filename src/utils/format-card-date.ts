export const formatCardDate = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/g, "$1/");
}