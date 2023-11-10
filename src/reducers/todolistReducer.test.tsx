import { TodolistType } from "../App"
import { changeTodolistFilterAC, changeTodolistTitleAC, createNewTodolistAC, removeTodolistAC, todolistReducer } from "./todolistReducer"

let initialState : TodolistType[]

beforeEach(()=> {
    initialState = [
        {id: '0', title: 'What to learn', filter: 'all'},
        {id: '1', title: 'What to buy', filter: 'all'},
    ]
})

test('adding new todo', () => {
    const action = createNewTodolistAC('earn')
    const newState = todolistReducer(initialState, action)

    expect(newState.length).toBe(3)
})

test('removing todo', () => {
    const action = removeTodolistAC('1')
    const newState = todolistReducer(initialState, action)

    expect(newState.length).toBe(1)
})

test('changing todo title', () => {
    const action = changeTodolistTitleAC('1', 'new title')
    const newState = todolistReducer(initialState, action)

    expect(newState[1].title).toBe('new title')
})

test('changing todo filter', () => {
    const action = changeTodolistFilterAC('1', 'active')
    const newState = todolistReducer(initialState, action)

    expect(newState[1].filter).toBe('active')
})