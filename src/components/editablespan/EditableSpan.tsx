import React, { ChangeEvent, 
        DetailedHTMLProps, 
        HTMLAttributes, 
        InputHTMLAttributes, 
        memo, 
        useState , 
        KeyboardEvent 
    } from "react"
import "./EditableSpan.scss"

type DefaultInputTypes = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanTypes = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
type EditableSpanPropsTypes = Omit<DefaultInputTypes, 'type'> & {
                                    oldTitle: string
                                    callback: (title: string) => void

                                    spanProps?: DefaultSpanTypes
                                }


export const EditableSpan: React.FC<EditableSpanPropsTypes> = memo((props) => {
    const {oldTitle, className, maxLength, spanProps, callback, ...restProps} = props

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

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            changeEditHandler()
        }
    }

    return(
        isEdit ?
            <input type="text"
                    className={className ? "edit_input " + className : "edit_input"}
                    value={title} 
                    onBlur={changeEditHandler} 
                    onChange={onInputChange}
                    onKeyDown={onKeyDownHandler}
                    autoFocus 
                    maxLength={maxLength ? maxLength : 1000}

                    {...restProps}
            />
            :
            <span className={spanProps?.className} onDoubleClick={changeEditHandler} {...spanProps}>{oldTitle}</span>
    )
})