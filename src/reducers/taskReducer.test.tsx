
import { TasksType } from "../components/todolists/Todolists"
import { addTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer, toggleIsCheckedAC } from "./taskReducer"

let initialState: TasksType

beforeEach(() => {
    initialState = {
        ['0']: [
            {
                "id": "63211302-16c2-4a30-a2b1-50c249239825",
                "title": "NewTask",
                "description": '',
                "todoListId": "f7043da4-1fdb-4e7d-9987-a3e2916a1fb5",
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": "2023-12-17T13:07:10.39"
            },
        ]
    }
})

test('adding task', () => {
    const task = {
        "id": "63211302-16c2-4a30-a2b1-50c249239825",
        "title": "NewTask",
        "description": '',
        "todoListId": "f7043da4-1fdb-4e7d-9987-a3e2916a1fb5",
        "order": 0,
        "status": 0,
        "priority": 1,
        "startDate": '',
        "deadline": '',
        "addedDate": "2023-12-17T13:07:10.39"
    }
    const action = addTaskAC('0', task)
    const newState = tasksReducer(initialState, action)

    expect(newState['0'].length).toBe(2)
})

test('removing task', () => {
    const tId = "63211302-16c2-4a30-a2b1-50c249239825"
    const action = removeTaskAC('0', tId)
    const newState = tasksReducer(initialState, action)

    expect(newState['0'].length).toBe(0)
})

test('changing idDone task', () => {
    const tId = "63211302-16c2-4a30-a2b1-50c249239825"
    const action = toggleIsCheckedAC('0', tId, 1)
    const newState = tasksReducer(initialState, action)

    expect(newState['0'][0].status).toBe(1)
})

test('changing task title', () => {
    const tId = "63211302-16c2-4a30-a2b1-50c249239825"
    const action = changeTaskTitleAC('0', tId, 'new title')
    const newState = tasksReducer(initialState, action)

    expect(newState['0'][0].title).toBe('new title')
})












