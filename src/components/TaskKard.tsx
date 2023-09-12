import React from "react";

type TaskCheckboxType = {
    id: number
    isChecked: boolean
    name: string
}

export type TaskType = {
    title: string
    taskCheckboxes: TaskCheckboxType[]
}

type TaskTypes = TaskType[]

type KardPropsType = {
    data: TaskTypes
}

export const TaskKard: React.FC<KardPropsType> = (props) => {

    const [task_1] = props.data
    const {title, taskCheckboxes} = task_1

    return (
        <div className="App">
            <div>
                <h3>{title}</h3>
                <div>
                    <input />
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={taskCheckboxes[0].isChecked} /> <span>{taskCheckboxes[0].name}</span></li>
                    <li><input type="checkbox" checked={taskCheckboxes[1].isChecked} /> <span>{taskCheckboxes[1].name}</span></li>
                    <li><input type="checkbox" checked={taskCheckboxes[2].isChecked} /> <span>{taskCheckboxes[2].name}</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}