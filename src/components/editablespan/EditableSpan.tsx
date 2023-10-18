import React, { ChangeEvent, useState } from "react"
import "./EditableSpan.scss"

type EditableSpanPropsTypes = {
    oldTitle: string
    maxNumOFChar?: number
    spanClassName?: string
    inputClassName?: string
    callback: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsTypes> = (props) => {
    const {oldTitle, maxNumOFChar, spanClassName, inputClassName, callback} = props

    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(oldTitle)

    const changeEditHandler = () => {
        if(isEdit && title.trim() !== '') {
            callback(title.trim())
        }
        setIsEdit(!isEdit)
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return(
        isEdit ?
            <input type="text"
                    className={inputClassName ? "edit_input " + inputClassName : "edit_input"}
                    value={title} 
                    onBlur={changeEditHandler} 
                    onChange={onInputChange}
                    autoFocus 
                    maxLength={maxNumOFChar ? maxNumOFChar : 1000}
            />
            :
            <span className={spanClassName ? spanClassName : undefined} onDoubleClick={changeEditHandler}>{oldTitle}</span>
    )
}