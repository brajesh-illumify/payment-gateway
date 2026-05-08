export const withNumericKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const navKeys = ["Backspace", "Delete", "Tab", "Enter", "Escape",
        "Home", "End", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (navKeys.includes(e.key)) return;

    const value = e.currentTarget.value;
    const cursorStart = e.currentTarget.selectionStart ?? value.length;
    const cursorEnd = e.currentTarget.selectionEnd ?? cursorStart;
    const hasSelection = cursorEnd > cursorStart;

    if (e.key === "." && !value.includes(".")) return;

    if (/^\d$/.test(e.key)) {
        const dotIndex = value.indexOf(".");
        if (dotIndex !== -1 && cursorStart > dotIndex && !hasSelection) {
            const decimals = value.length - dotIndex - 1;
            if (decimals >= 4) e.preventDefault();
        }
        return;
    }

    e.preventDefault();
}