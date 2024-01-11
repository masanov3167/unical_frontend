import { combineReducers } from '@reduxjs/toolkit';
import userSliceReducer from './users'; 
import productSliceReducer from './products'; 

const rootReducer = combineReducers({
  userSlice: userSliceReducer,
  productSlice: productSliceReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
