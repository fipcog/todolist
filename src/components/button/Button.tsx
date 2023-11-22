import React, { memo } from "react";

type Button = {
    className: string | undefined
    callback: () => void
    children: string
}

export const Button: React.FC<Button> = memo(({className, callback, children}) => {
    return (
        <button className={className} onClick={callback}>{children}</button>
    )
})