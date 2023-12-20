import { combineReducers, legacy_createStore } from "redux";
import { tasksReducer } from "../reducers/taskReducer";
import { todolistReducer } from "../reducers/todolistReducer";
import { AppRootStateType } from "./store";
import { Provider } from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialStore :AppRootStateType = {
    tasks: {
        "todolistId1": [
            {
                "id": "63211302-16c2-4a30-a2b1-50c249239825",
                "title": "NewTask",
                "description": '',
                "todoListId": "todolistId1",
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": "2023-12-17T13:07:10.39"
            },
            {
                "id": "63211302-16c2-4a30-a2b1-50c2492398252",
                "title": "NewTask2",
                "description": '',
                "todoListId": "todolistId1",
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": "2023-12-17T13:07:10.39"
            },
            {
                "id": "63211302-16c2-4a30-a2b1-50c2492398253",
                "title": "NewTask3",
                "description": '',
                "todoListId": "todolistId1",
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
                "id": "63211302-16c2-4a30-a2b1-50c2492398254",
                "title": "NewTask4",
                "description": '',
                "todoListId": "todolistId2",
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": "2023-12-17T13:07:10.39"
            },
            {
                "id": "63211302-16c2-4a30-a2b1-50c2492398255",
                "title": "NewTask5",
                "description": '',
                "todoListId": "todolistId2",
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": "2023-12-17T13:07:10.39"
            },
            {
                "id": "63211302-16c2-4a30-a2b1-50c2492398256",
                "title": "NewTask6",
                "description": '',
                "todoListId": "todolistId2",
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": "2023-12-17T13:07:10.39"
            },
        ]
    },
    todolists: [
        {id: '0', title: 'What to learn', filter: 'all', order: 1, addedDate: '',},
        {id: '1', title: 'What to buy', filter: 'all', order: 1, addedDate: '',},
    ]
}

const StorybookStore = legacy_createStore(rootReducer, initialStore)

export const storeProviderDecorator = (fn: ()=> React.ReactNode) => {
    return <Provider store={StorybookStore}>{fn()}</Provider>
}