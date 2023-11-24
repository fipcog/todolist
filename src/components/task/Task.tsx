import { memo } from 'react';
import { TaskType } from '../todolistkard/TodoListKard';
import { useDispatch } from 'react-redux';
import { changeTaskTitleAC, removeTaskAC, toggleIsCheckedAC } from '../../reducers/taskReducer';
import { Checkbox } from '../checkbox/Checkbox';
import { EditableSpan } from '../editablespan/EditableSpan';
import './taskStyles.scss'


type PropsType = {
    todolistID: string
    task: TaskType
}

export const Task: React.FC<PropsType> = memo(({todolistID, task}) => {
    const dispatch = useDispatch()

    const toggleIsCheckedHandler = (): void => {
        dispatch(toggleIsCheckedAC(todolistID , task.id))
    }

    const removeTaskHandler = (): void => {
        dispatch(removeTaskAC(todolistID, task.id))
    }

    const changeTaskTitleHandler = (taskTitle: string): void => {
        dispatch(changeTaskTitleAC(todolistID, task.id, taskTitle))
    }
    
    return( 
        <li>
            <Checkbox id={task.id} checked={task.isDone} callback={() => toggleIsCheckedHandler()} />
            <EditableSpan spanProps={{className: task.isDone ? "task_done" : ""}}
                oldTitle={task.title} 
                callback={changeTaskTitleHandler} 
                maxLength={15}
            />
            <button onClick={() => removeTaskHandler()}>x</button>
        </li>
    )
})