import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import registerReducer from '../reducers/register.reducer'
import loginReducer from '../reducers/login.reducer'
import storeReducer from '../reducers/stock.reducer'
import stockEditReducer from '../reducers/stock.edit.reducer'
import projectReducer from '../reducers/project.reducer'
import paramReducer from '../reducers/param.reducer'
import logger from 'redux-logger'
// ...

const reducer = { registerReducer, loginReducer, storeReducer, stockEditReducer, projectReducer, paramReducer }
export const store = configureStore({
    reducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()