import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import TaskList from 'components/TaskList'

export interface Task {
    id: number;
    title: string;
}

export interface TaskList {
    id: number;
    title: string;
    tasks: Task[];
}

export interface TaskBoard {
    taskLists: TaskList[];
}

const initialState: TaskBoard = {
    taskLists: [
        {
            id: 1,
            title: 'TODO',
            tasks: [
                { id: 1, title: 'First Task' },
                { id: 2, title: 'Second Task' },
                { id: 3, title: 'Third Task' }
            ]
        }
    ]
}

// Actions
interface TaskAddedPayloadAction {
    listId: number,
    taskTitle: string
}
interface TaskDeletedPayloadAction {
    listId: number,
    taskId: number
}
interface ListRenamePayloadAction {
    listId: number,
    listTitle: string
}
interface ListDeletedPayloadAction {
    listId: number
}
interface ListAddedPayloadAction {
    listTitle: string
}

const slice = createSlice({
    name: 'TaskBoardSclice',
    initialState: initialState,
    reducers: {
        taskAdded(state, action: PayloadAction<TaskAddedPayloadAction>) {
            state.taskLists
                .filter(item => item.id === action.payload.listId)
                .forEach(list => {                    
                    let id : number = 1
                    if (list.tasks.length > 0)
                        id = Math.max.apply(Math, list.tasks.map(task => task.id)) + 1
                    
                    list.tasks.push({
                        id,
                        title: action.payload.taskTitle
                    })
                })
        },
        taskDeleted(state, action: PayloadAction<TaskDeletedPayloadAction>) {
            state.taskLists
                .filter(item => item.id === action.payload.listId)
                .forEach(list => { 
                    list.tasks
                        .filter(task => task.id === action.payload.taskId)
                        .map(item => list.tasks.indexOf(item))
                        .forEach(index => list.tasks.splice(index, 1))
                })
        },
        listTitleRenamed(state, action: PayloadAction<ListRenamePayloadAction>) {
            state.taskLists
                .filter(list => list.id === action.payload.listId)
                .forEach(list => list.title = action.payload.listTitle)
        },
        listDeleted(state, action: PayloadAction<ListDeletedPayloadAction>) {
            state.taskLists
                .filter(list => list.id === action.payload.listId)
                .map(list => state.taskLists.indexOf(list))
                .forEach(index => state.taskLists.splice(index, 1))   
        },
        listAdded(state, action: PayloadAction<ListAddedPayloadAction>) {
            let id : number = 1
            if (state.taskLists.length > 0)
                id = Math.max.apply(Math, state.taskLists.map(list => list.id)) + 1
            
            state.taskLists.push({
                id,
                title: action.payload.listTitle,
                tasks: []
            })
        },
    }
})

export const { taskAdded, taskDeleted, listTitleRenamed, listDeleted, listAdded} = slice.actions
export default slice.reducer
