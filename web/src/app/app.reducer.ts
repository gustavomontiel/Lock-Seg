import { ActionReducerMap, Store } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
  ui: fromUI.State;
  auth: fromAuth.AuthState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
};
