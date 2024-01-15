import { combineReducers } from '@reduxjs/toolkit';
import userSliceReducer from './users'; 
import productSliceReducer from './products'; 
import postSliceReducer from './posts'; 
import todoSliceReducer from './todos'; 

const rootReducer = combineReducers({
  userSlice: userSliceReducer,
  productSlice: productSliceReducer,
  postSlice: postSliceReducer,
  todoSlice: todoSliceReducer
});

export type IRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
