import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import "./AddItemInputStyles.scss"

type AddItemInputPropsTypes = {
    callback: (title: string) => void
    className?: string
}

export const AddItemInput: React.FC<AddItemInputPropsTypes> = ({className ,callback}) => {

    const [inputValue, setInputValue] = useState<string>("")
    const [errorMassage, setErrorMassage] = useState<string | null>(null)

    const addNewItem = (): void => {
        if(inputValue.trim() === "") {
            setErrorMassage("Title is required")
            return
        }
        callback(inputValue.trim())
        setInputValue("")
        setErrorMassage(null)
    }

    const onInputBtnPressHandler = (e:KeyboardEvent<HTMLInputElement>):void => {
        if (e.code === "Enter") {
            addNewItem()
        }
    }

    const onInputChangeHandler = (e:ChangeEvent<HTMLInputElement>): void => {
        e.currentTarget.value.trim().length > 15 ? setInputValue(inputValue) : setInputValue(e.currentTarget.value)
        setErrorMassage(null)
        if(e.currentTarget.value.trim().length > 15) setErrorMassage("Maximum number of characters")
    }

    return (
        <div className={className ? ("input_wrapper " + className) : "input_wrapper"}>
            <input value={inputValue} 
                    className={errorMassage ? "error" : undefined} 
                    onChange={onInputChangeHandler} 
                    onKeyDown={onInputBtnPressHandler}
            />
            <button onClick={addNewItem}>+</button>
            {errorMassage && <span className="error_massage">{errorMassage}</span>}
        </div>
    )
}