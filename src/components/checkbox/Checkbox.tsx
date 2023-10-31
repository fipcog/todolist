import React from "react"
import './Checkbox.scss'


type PropsTypes = {
    id: string
    checked?:boolean
    callback: () => void
}

export const Checkbox: React.FC<PropsTypes> = (props) => {
    return(
        <>
            <input className="checkbox" id={props.id} type="checkbox" checked={props.checked ? props.checked : false} />
            <label className="checkboxLabel" htmlFor={props.id} onClick={props.callback}></label>
        </>
    ) 
}