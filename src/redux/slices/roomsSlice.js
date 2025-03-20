import { createSlice } from '@reduxjs/toolkit';

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        availableRooms: [],
    },
    reducers: {
        setRooms: (state, action) => {
            state.availableRooms = action.payload;
        },
    },
});

export const { setRooms } = roomsSlice.actions;
export default roomsSlice.reducer;