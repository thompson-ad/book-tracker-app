import configureStore from "./store/configureStore";
import { bugAdded, bugResolved, getUnresolvedBugs } from "./store/bugs";
import { projectAdded } from "./store/projects";

const store = configureStore();

// this is the "ui". UI components should subscribe to the store
store.subscribe(() => {
  console.log("store changed!", store.getState());
});

// store.dispatch(bugAdded("bug1"));
// store.dispatch(bugAdded("bug2"));
// store.dispatch(bugAdded("bug3"));
// store.dispatch(bugResolved(1));

store.dispatch(projectAdded({ description: "project 1" }));
store.dispatch(bugAdded({ description: "bug1" }));
store.dispatch(bugResolved({ id: 1 }));

const unresolvedBugs = getUnresolvedBugs(store.getState());

console.log(store.getState());
