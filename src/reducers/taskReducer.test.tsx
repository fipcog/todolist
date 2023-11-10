import { TasksType } from "../App"
import { addTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer, toggleIsCheckedAC } from "./taskReducer"

let initialState: TasksType

beforeEach(()=>{
    initialState = {
        ['0']:[
            {id: 'task_0', title: "HTML&CSS", isDone: true},
            {id: 'task_1', title: "JS", isDone: true},
            {id: 'task_2', title: "ReactJS", isDone: false},
            {id: 'task_3', title: "Rest API", isDone: false},
            {id: 'task_4', title: "GraphQL", isDone: false},
        ],
        ['1']:[
            {id: 'task_0', title: "HTML&CSS2", isDone: true},
            {id: 'task_1', title: "JS2", isDone: true},
            {id: 'task_2', title: "ReactJS2", isDone: false},
            {id: 'task_3', title: "Rest API2", isDone: false},
            {id: 'task_4', title: "GraphQL2", isDone: false},
        ]
    }
})

test('adding task', ()=>{
    const action = addTaskAC('0', 'new task')
    const newState = tasksReducer(initialState, action)

    expect(newState['0'].length).toBe(6)
    expect(newState['0'][0].title).toBe('new task')
}) 

test('removing task', ()=>{
    const action = removeTaskAC('0', 'task_0')
    const newState = tasksReducer(initialState, action)

    expect(newState['0'].length).toBe(4)
}) 

test('changing idDone task', ()=>{
    const action = toggleIsCheckedAC('0', 'task_0')
    const newState = tasksReducer(initialState, action)

    expect(newState['0'][0].isDone).toBe(false)
}) 

test('changing task title', ()=>{
    const action = changeTaskTitleAC('0', 'task_0', 'new title')
    const newState = tasksReducer(initialState, action)

    expect(newState['0'][0].title).toBe('new title')
}) 












