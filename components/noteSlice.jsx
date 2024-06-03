import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    title: '',
    content: '',
    date_created: ''
}

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        updateTitle: (state, action) => {
            state.title = action.payload
        },
        updateContent: (state, action) => {
            state.content = action.payload
        },
        createNote: (state) => {
            const date = new Date()
            state.date_created = date.toDateString()
        }
    }
})

export const {createNote, updateTitle, updateContent} = noteSlice.actions

export default noteSlice.reducer