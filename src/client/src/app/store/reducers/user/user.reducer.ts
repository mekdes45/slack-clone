import { Message } from './../../../../../../shared/models/message.model';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../../../../../shared/models/user.model';
import { createMessageSuccess, createUserSuccess, deleteUserSuccess, loadMessageSuccess, loadUsers, loadUsersSuccess, selectUserAction, updateUserSuccess } from '../../actions/user/user.actions';


export const userFeatureKey = 'user';

export interface State {
  users: User[];
  selectedUser: User | null;
  message: Message[],
 

}

export const initialState: State = {
  users: [],
  selectedUser: null,
  message: []
  
};


export const reducer = createReducer(
  initialState,

  on(loadMessageSuccess, (state, action) => {
    return { ...state, message: action.data }
  }),
  on(createMessageSuccess, (state, action) => {
    const message = [...state.message];
    message.push(action.data);
    return {...state, message}
  }),
  
  on(loadUsersSuccess, (state, action) => {
    return { ...state, users: action.data }
  }),
  on(selectUserAction, (state, action) => {
    return { ...state, selectedUser: action.data }
  }),
  on(updateUserSuccess, (state, action) => {
    return {...state, users: state.users.map(user => user._id === action.data._id ? action.data : user)}
  }),
  on(deleteUserSuccess, (state, action) => {
    return {...state, users: state.users.filter(user => user._id !== action.data._id)}
  }),
  on(createUserSuccess, (state, action) => {
    const users = [...state.users];
    users.push(action.data);
    return {...state, users}
  })
  
);

