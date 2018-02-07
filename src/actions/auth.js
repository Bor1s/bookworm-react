import { USER_LOGGED_IN } from "../types";
import api from "../api";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

// Thunk action is the function that returns another function
export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));

// () =>
//    foobar
// ^ - this basically means that we have a function with performs some 'foobar' stuff inside it.
