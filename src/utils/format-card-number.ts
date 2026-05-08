export const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
};