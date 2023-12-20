import { tasksReducer } from "./taskReducer";
import { removeTodolistAC } from "./todolistReducer";

test('property with todolistId should be deleted', () => {
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
        ],
        "todolistId2": [
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

    const action = removeTodolistAC("todolistId1");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId1"]).not.toBeDefined();
});