import { USER_DATA, TODO_DATA, TODO_COUNT, USER_COUNT } from "./actionTypes";

export function storeUser(data) {
  return { type: USER_DATA, payload: data };
}
export function storeToDo(data) {
  return { type: TODO_DATA, payload: data };
}
export function increaseToDoCount(data) {
  return { type: TODO_COUNT, payload: data };
}
export function increaseUserCount(data) {
  return { type: USER_COUNT, payload: data };
}
