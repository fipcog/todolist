import React, { memo } from "react"
import './Checkbox.scss'

type PropsTypes = {
    id: string
    checked?:boolean
    callback: () => void
}

export const Checkbox: React.FC<PropsTypes> = memo((props) => {
    return(
        <>
            <input className="checkbox" id={props.id} type="checkbox" checked={props.checked ? props.checked : false} onChange={props.callback}/>
            <label className="checkboxLabel" htmlFor={props.id}></label>
        </>
    ) 
})