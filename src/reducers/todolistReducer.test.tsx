
import { FilterType } from "../App"
import { TodolistCompletedType, changeTodolistFilterAC, changeTodolistTitleAC, createNewTodolistAC, removeTodolistAC, todolistReducer } from "./todolistReducer"

let initialState : TodolistCompletedType[]

beforeEach(()=> {
    initialState = [
        {id: '0', title: 'What to learn', filter: 'all', order: 1, addedDate: '', status: 'idle'},
        {id: '1', title: 'What to buy', filter: 'all', order: 1, addedDate: '', status: 'idle'},
    ]
})

test('adding new todo', () => {
    const newTodo: TodolistCompletedType = {id: '0', title: 'NewTodo', order: 1, addedDate: '', status: 'idle', filter: 'all'}
    const action = createNewTodolistAC(newTodo)
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