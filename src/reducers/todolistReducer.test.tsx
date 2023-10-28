import { TodolistType } from "../App"
import { todolistReducer } from "./todolistReducer"

let initialState : TodolistType[]

beforeEach(()=> {
    initialState = [
        {id: '0', title: 'What to learn', filter: 'all'},
        {id: '1', title: 'What to buy', filter: 'all'},
    ]
})

test('adding new todo', () => {
    const newState = todolistReducer(initialState, {
        type: 'CREATE_TODOLIST',
        payload: {
            newTodolist: {id: '2', title: 'earn ', filter: 'all'},
        }
    })

    expect(newState.length).toBe(3)
})

test('removing todo', () => {
    const newState = todolistReducer(initialState, {
        type: 'REMOVE_TODOLIST',
        payload: {
            todolstID: '1'
        }
    })

    expect(newState.length).toBe(1)
})

test('changing todo title', () => {
    const newState = todolistReducer(initialState, {
        type: 'CHANGE_TODOLIST_NAME',
        payload: {
            todolistId: '1',
            newTitle: 'new title'
        }
    })

    expect(newState[1].title).toBe('new title')
})