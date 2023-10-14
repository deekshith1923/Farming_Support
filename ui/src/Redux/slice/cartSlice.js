import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cartSlice = createSlice({
    name: 'land',
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload)
        },

        userAdd(state, action) {
            state.push(action.payload)
        },

        landId(state, action) {
            state.push(action.payload)
        },

        vegetablesId(state, action) {
            state.push(action.payload)
        },

        pendingrequests(state, action) {
            state.push(action.payload)
        },

        machine_id(state, action) {
            state.push(action.payload)
        },


        // Verified

        addLand(state, action) {
            state.push(action.payload)
        },

        addVegetables(state, action) {
            state.push(action.payload)
        },

        addMachine(state, action) {
            state.push(action.payload)
        },
    }
});

export const { add, userAdd, landId, pendingrequests,
    machine_id, vegetablesId, addLand, addVegetables, addMachine, } = cartSlice.actions;
export default cartSlice.reducer;