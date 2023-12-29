import React, { DetailedHTMLProps, InputHTMLAttributes, memo } from "react"
import './Checkbox.scss'

type DefautInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type Props = Omit<DefautInputProps, 'type'> & {
    id: string
}

export const Checkbox: React.FC<Props> = memo((props) => {
    const {id, ...restProps} = props
    return(
        <>
            <input className="checkbox" id={id} type="checkbox" {...restProps}/>
            <label className="checkboxLabel" htmlFor={id}></label>
        </>
    ) 
})