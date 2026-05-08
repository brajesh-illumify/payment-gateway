export const Button = ({
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className="flex w-full justify-center items-center cursor-pointer rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            {children}
        </button>
    )
}