import React, { ChangeEvent, useState } from "react"

type EditableSpanPropsTypes = {
    oldTitle: string
    maxNumOFChar?: number
    className?: string
    callback: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsTypes> = (props) => {
    const {oldTitle, maxNumOFChar, className, callback} = props

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
                    className={className}
                    value={title} 
                    onBlur={changeEditHandler} 
                    onChange={onInputChange}
                    autoFocus 
                    maxLength={maxNumOFChar ? maxNumOFChar : 1000}
            />
            :
            <span className={className} onDoubleClick={changeEditHandler}>{oldTitle}</span>
    )
}