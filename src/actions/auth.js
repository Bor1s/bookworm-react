import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

// Thunk action is the function that returns another function
export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

// () =>
//    foobar
// ^ - this basically means that we have a function with performs some 'foobar' stuff inside it

export const logout = () => dispatch => {
    localStorage.removeItem('bookwormJWT');
    dispatch(userLoggedOut());
};
