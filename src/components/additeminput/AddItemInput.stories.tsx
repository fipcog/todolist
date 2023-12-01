import type { Meta, StoryObj } from '@storybook/react';
import { AddItemInput, AddItemInputPropsTypes } from './AddItemInput';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import  { action } from '@storybook/addon-actions';


const meta: Meta<typeof AddItemInput> = {
    title: 'Todolist/AddItemInput',
    component: AddItemInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callback: {
            action: 'clicked'
        }
    }
};

export default meta;
type Story = StoryObj<typeof AddItemInput>;

const ServiceAddItemInputOverfilled = ({className, callback}: AddItemInputPropsTypes) => {
    const [inputValue, setInputValue] = useState<string>("qwertyuiopasdfg")
    const [errorMassage, setErrorMassage] = useState<string | null>("Maximum number of characters")

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
            />
            <button onClick={addNewItem}>+</button>
            {errorMassage && <span className="error_massage">{errorMassage}</span>}
        </div>
    )
}

const ServiceAddItemInputAmptySubmit = ({className, callback}: AddItemInputPropsTypes) => {
    const [inputValue, setInputValue] = useState<string>("")
    const [errorMassage, setErrorMassage] = useState<string | null>("Title is required")

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
            />
            <button onClick={addNewItem}>+</button>
            {errorMassage && <span className="error_massage">{errorMassage}</span>}
        </div>
    )
}

export const AddItemInputStory: Story = {};
export const AddItemInputOverfilledStory: Story = {
    render: () => <ServiceAddItemInputOverfilled callback={()=> action('clicked')}/>
};
export const AddItemInputAmptySubmitStory: Story = {
    render: () => <ServiceAddItemInputAmptySubmit callback={()=> action('clicked')}/>
};

