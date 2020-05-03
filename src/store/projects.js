import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    // object that maps actions to action handlers
    projectAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

// it will even namesSpace your actions by the slice
export const { projectAdded } = slice.actions;
export default slice.reducer;
