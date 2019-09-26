import * as fromUIAuth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
  user: User;
}

const initState: AuthState = {
  user: null
};

export function authReducer(state = initState, action: fromUIAuth.acciones): AuthState {

  switch (action.type) {
    case fromUIAuth.SET_USER:
      return {
        user: { ...action.user }
      };

    default:
      return state;
  }
}
