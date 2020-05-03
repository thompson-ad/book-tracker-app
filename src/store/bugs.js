import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// this createSlice function automatically creates action types and action creators for us
let lastId = 0;
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // object that maps actions to action handlers
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state[index].resolved = true;
    },
  },
});

console.log(slice);
// it will even namesSpace your actions by the slice
export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;

// Selector
// function that takes the state and returns the computed state
// this selector has a small problems
// returns a new array every time
// makes the state think it has changed and may cause a re-render
// logic is also expensive
// export const getUnresolvedBugs = (state) => {
//   state.entities.bugs.filter((bug) => !bug.resolved);
// };

// MEMOIZATION
// optimises expensive functions
// i.e. if the list of bugs has not changed, get this list of unresolved bugs from the cache

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

// ACTION TYPES
// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved";

// ACTION CREATORS
// export const bugAdded = createAction("bugAdded");
// export const bugAdded = (description) => ({
//   type: BUG_ADDED,
//   payload: {
//     description,
//   },
// });

// export const bugResolved = createAction("bugResolved");
// export const bugResolved = (id) => ({
//   type: BUG_RESOLVED,
//   payload: {
//     id,
//   },
// });

// export const bugRemoved = createAction("bugRemoved");

// REDUCER
// let lastId = 0;
// first arg is initial state
// second arg is an object that maps actions to functions that handle those actions
// under the hood, redux toolkit uses immer
// createReducer([], {
//   [bugAdded.type]: (state, action) => {
//     state.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },

//   [bugResolved.type]: (state, action) => {
//     const index = state.findIndex((bug) => bug.id === action.payload.id);
//     state[index].resolved = true;
//   },
// });
// must be a default export
// let lastId = 0;
// export default function reducer(state = [], action) {
//   if (action.type === bugAdded.type) {
//     return [
//       ...state,
//       {
//         id: ++lastId,
//         description: action.payload.description,
//         resolved: false,
//       },
//     ];
//   } else if (action.type === bugRemoved.type) {
//     return state.filter((bug) => bug.id !== action.payload.id);
//   } else if (action.type === bugResolved.type) {
//     state.map((bug) =>
//       bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//     );
//   }

//   return state;
// }
