import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import "./AddItemInputStyles.scss"
import { RequestStatusType } from "../../reducers/appReducer"

export type AddItemInputPropsTypes = {
    callback: (title: string) => void
    className?: string
    status?: RequestStatusType
}

export const AddItemInput: React.FC<AddItemInputPropsTypes> = memo(({className, callback, status}) => {

    const [inputValue, setInputValue] = useState<string>("")
    const [errorMassage, setErrorMassage] = useState<string | null>(null)

    const addNewItem = (): void => {
        if(inputValue.trim() === "") {
            setErrorMassage("Title is required")
            return
        }
        callback(inputValue.trim())
        setInputValue("")
        if(errorMassage) setErrorMassage(null)
    }

    const onInputBtnPressHandler = (e:KeyboardEvent<HTMLInputElement>):void => {
        if (e.code === "Enter") {
            addNewItem()
        }
    }

    const onInputChangeHandler = (e:ChangeEvent<HTMLInputElement>): void => {
        e.currentTarget.value.trim().length > 15 ? setInputValue(inputValue) : setInputValue(e.currentTarget.value)
        if(errorMassage) setErrorMassage(null)
        if(e.currentTarget.value.trim().length > 15) setErrorMassage("Maximum number of characters")
    }

    return (
        <div className={className ? ("input_wrapper " + className) : "input_wrapper"}>
            <input value={inputValue} 
                    className={errorMassage ? "error" : undefined} 
                    onChange={onInputChangeHandler} 
                    onKeyDown={onInputBtnPressHandler}
                    disabled={status !== 'loading' ? false : true}
            />
            <button onClick={addNewItem} disabled={status !== 'loading' ? false : true}>+</button>
            {errorMassage && <span className="error_massage">{errorMassage}</span>}
        </div>
    )
})