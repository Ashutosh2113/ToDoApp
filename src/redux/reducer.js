import { USER_DATA, TODO_DATA, TODO_COUNT, USER_COUNT } from "./actionTypes";
import { combineReducers } from "redux";

const initialState = {
  userData: [],
  toDoData: [],
  toDoCount: 0,
  userCount: 0,
};
function toDoApp(state = initialState, action) {
  if (action.type === USER_DATA) {
    let data = { ...state, ...{ userData: action.payload } };
    localStorage.setItem("data", JSON.stringify(data));
    return data;
  } else if (action.type === TODO_DATA) {
    let data = { ...state, ...{ toDoData: action.payload } };
    localStorage.setItem("data", JSON.stringify(data));
    return data;
  } else if (action.type === TODO_COUNT) {
    let data = { ...state, ...{ toDoCount: action.payload } };
    localStorage.setItem("data", JSON.stringify(data));
    return data;
  } else if (action.type === USER_COUNT) {
    let data = { ...state, ...{ userCount: action.payload } };
    localStorage.setItem("data", JSON.stringify(data));
    return data;
  }
  return state;
}
const todoApp = combineReducers({
  toDoApp,
});

export default todoApp;
