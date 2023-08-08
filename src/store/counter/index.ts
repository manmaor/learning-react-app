import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0
}

const counterSclice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        inc(state) {
            state.value += 1 
        },
        addAmount(state, action: PayloadAction<number>) {
            state.value -= action.payload
        },
    },
})

export const { inc, addAmount } = counterSclice.actions
export default counterSclice.reducer