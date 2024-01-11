import { combineReducers } from '@reduxjs/toolkit';
import userSliceReducer from './users'; 

const rootReducer = combineReducers({
  userSlice: userSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
