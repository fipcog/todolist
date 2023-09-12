import React from 'react';
import './App.css';
import { TaskKard, TaskType } from './components/TaskKard';

const tasks: Array<TaskType> = [
    {
        title: "Task Title",
        taskCheckboxes: [
            {id: 1, isChecked: true, name:'HTML&CSS'},
            {id: 2, isChecked: false, name:'JS'},
            {id: 3, isChecked: false, name:'React'}
        ]
    },
]

function App() {
    return (
        <TaskKard data={tasks}/>
    );
}

export default App;
