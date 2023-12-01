import React, { ButtonHTMLAttributes, DetailedHTMLProps, memo } from "react";
import './buttonStyles.scss'

type DefaultButtonTypes = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type Props = DefaultButtonTypes & {
    callback: () => void
}

export const Button: React.FC<Props> = memo(({className, callback, children, ...restProps}) => {
    return (
        <button className={"button " + className} onClick={callback} {...restProps}>{children}</button>
    )
})