import React, { DetailedHTMLProps, InputHTMLAttributes, memo } from "react"
import './Checkbox.scss'

type DefautInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type Props = Omit<DefautInputProps, 'type'> & {
    callback: () => void
}

export const Checkbox: React.FC<Props> = memo((props) => {
    const {id, checked, callback, ...restProps} = props
    return(
        <>
            <input className="checkbox" id={id} type="checkbox" checked={checked} onChange={callback} {...restProps}/>
            <label className="checkboxLabel" htmlFor={id}></label>
        </>
    ) 
})