import { FilterType } from "../App";
import { tasksReducer } from "./taskReducer";
import { TodolistCompletedType, createNewTodolistAC } from "./todolistReducer";

test('new array should be added when new todolist is added', () => {
    const startState = {
        "todolistId1": [
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
    };

    const newTodo: TodolistCompletedType = {id: '0', title: 'What to learn', order: 1, addedDate: '', status: 'idle', filter: 'all'}

    const action = createNewTodolistAC(newTodo);

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(2);
})
