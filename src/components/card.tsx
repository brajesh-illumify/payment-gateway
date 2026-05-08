import React from "react";

export const Card = ({
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} className={`bg-white rounded-lg shadow-md p-4 w-full border border-gray-200 ${props.className}`} role="card" data-testid="card" style={props.style}>
            {props.children}
        </div>
    );
};