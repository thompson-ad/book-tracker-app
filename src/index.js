import configureStore from "./store/configureStore";
import { bugAdded, bugResolved } from "./store/bugs";

const store = configureStore();

// this is the "ui". UI components should subscribe to the store
store.subscribe(() => {
  console.log("store changed!", store.getState());
});

store.dispatch(bugAdded("bug1"));
store.dispatch(bugAdded("bug2"));
store.dispatch(bugAdded("bug3"));
store.dispatch(bugResolved(1));

console.log(store.getState());
