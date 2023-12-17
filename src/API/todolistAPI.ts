import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

export const todolistAPI = {
    getTodolists()  {
        return instance.get<TodolistType[]>('/todo-lists') 
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('/todo-lists', {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{item: TodolistType}>>(`/todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: TaskModel) {
        return instance.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

type GetTasksResponse = {
    item: TaskType[]
    totalCount: number
    error: string 
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export type TaskModel =  {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
}