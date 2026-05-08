export const Loader = ({
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`animate-spin inline-block ${props.className} border-3 border-current border-t-transparent rounded-[999px] text-primary`} role="status" >
            <span className="sr-only">Loading...</span>
        </div>
    )
}
