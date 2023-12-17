import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { changeTaskTitleTC, removeTaskTC, toggleTaskCompletedTC } from '../../reducers/taskReducer';
import { Checkbox } from '../checkbox/Checkbox';
import { EditableSpan } from '../editablespan/EditableSpan';
import './taskStyles.scss'
import { TaskStatuses, TaskType } from '../../API/todolistAPI';
import { useAppDispatch } from '../../store/store';


type PropsType = {
    todolistID: string
    task: TaskType
}

export const Task: React.FC<PropsType> = memo(({todolistID, task}) => {
    const dispatch = useAppDispatch()

    const toggleIsCheckedHandler = (): void => {
        const status = task.status === TaskStatuses.Completed ? TaskStatuses.InProgress : TaskStatuses.Completed
        dispatch(toggleTaskCompletedTC(todolistID , task.id, status))
    }

    const removeTaskHandler = (): void => {
        dispatch(removeTaskTC(todolistID, task.id))
    }

    const changeTaskTitleHandler = (taskTitle: string): void => {
        dispatch(changeTaskTitleTC(todolistID, task.id, taskTitle))
    }
    
    return( 
        <li className='task'>
            <Checkbox id={task.id} checked={task.status === TaskStatuses.Completed} callback={() => toggleIsCheckedHandler()} />
            <EditableSpan spanProps={{className: task.status === TaskStatuses.Completed ? "task_done" : ""}}
                oldTitle={task.title} 
                callback={changeTaskTitleHandler} 
                maxLength={15}
            />
            <button className='tasks_btn' onClick={() => removeTaskHandler()}>x</button>
        </li>
    )
})