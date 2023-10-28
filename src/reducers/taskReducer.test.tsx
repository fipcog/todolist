import { TasksType } from "../App"
import { tasksReducer } from "./taskReducer"

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
    const newState = tasksReducer(initialState, {
        type: 'ADD_TASK',
        payload: {
            todolistID: '0',
            taskName: 'new task'
        }
    })

    expect(newState['0'].length).toBe(6)
    expect(newState['0'][0].title).toBe('new task')
}) 

test('adding task list', ()=>{
    const newState = tasksReducer(initialState, {
        type: 'ADD_NEW_EMPTY_TASKS_LIST',
        payload: {
            NewTodolistID: '2'
        }
    })

    expect(newState['2']).toBeDefined()
    expect(newState['2'].length).toBe(0)
}) 

test('removing task', ()=>{
    const newState = tasksReducer(initialState, {
        type: 'REMOVE_TASK',
        payload: {
            todolistID: '0',
            taskId: 'task_0'
        }
    })

    expect(newState['0'].length).toBe(4)
}) 

test('changing idDone task', ()=>{
    const newState = tasksReducer(initialState, {
        type: 'TOGGLE_TASK_ISCHECKED',
        payload: {
            todolistID: '0',
            taskID: 'task_0'
        }
    })

    expect(newState['0'][0].isDone).toBe(false)
}) 

test('changing task title', ()=>{
    const newState = tasksReducer(initialState, {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todolistID: '0',
            taskID: 'task_0',
            taskTitle: 'new title'
        }
    })

    expect(newState['0'][0].title).toBe('new title')
}) 











