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
        todolistID1:[
            {id: '0', title: "HTML&CSS", isDone: true},
            {id: '1', title: "JS", isDone: true},
            {id: '2', title: "ReactJS", isDone: false},
            {id: '3', title: "Rest API", isDone: false},
            {id: '4', title: "GraphQL", isDone: false},
        ],
        todolistID2:[
            {id: crypto.randomUUID(), title: "HTML&CSS2", isDone: true},
            {id: crypto.randomUUID(), title: "JS2", isDone: true},
            {id: crypto.randomUUID(), title: "ReactJS2", isDone: false},
            {id: crypto.randomUUID(), title: "Rest API2", isDone: false},
            {id: crypto.randomUUID(), title: "GraphQL2", isDone: false},
        ]
    },
    todolists: [
        {id:'todolistID1', title: 'What to learn', filter: 'all'},
        {id:'todolistID2', title: 'What to buy', filter: 'all'},
    ]
}

const StorybookStore = legacy_createStore(rootReducer, initialStore)

export const storeProviderDecorator = (fn: ()=> React.ReactNode) => {
    return <Provider store={StorybookStore}>{fn()}</Provider>
}