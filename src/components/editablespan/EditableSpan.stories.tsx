import type { Meta, StoryObj } from '@storybook/react';
import  { action } from '@storybook/addon-actions';
import { EditableSpan, EditableSpanPropsTypes } from './EditableSpan';
import { ChangeEvent, useState, KeyboardEvent } from 'react';

const meta: Meta<typeof EditableSpan> = {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callback: {
            action: 'clicked'
        }
    },
    args: {
        maxLength: 15,
        oldTitle: 'Clickable span title'
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {};
export const EditableSpanLinedThroughStory: Story = {
    args: {
        spanProps: {
            className: "task_done"
        }
    }
};

const ServiceEditableSpanEdit = (props:EditableSpanPropsTypes) => {
    const {oldTitle, className, maxLength, spanProps, callback, ...restProps} = props

    const [isEdit, setIsEdit] = useState<boolean>(true)
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
}

export const EditableSpanEditStory: Story = {
    render: () => <ServiceEditableSpanEdit oldTitle='Clickable span title' callback={()=> action('clicked')} />
};

