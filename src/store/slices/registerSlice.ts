import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { OK, REGISTER_FAILED, REGISTER_FETCHING, REGISTER_SUCCESS, server } from "../../Constants";
import { httpClient } from "../../utils/httpclient";
import { User } from "../../types/user.type";


export interface RegisterState {
    isFetching: Boolean,
    isError: Boolean,
    result: any
}


const initialState: RegisterState = {
    isFetching: false,
    isError: false,
    result: null
}




const registerSlice = createSlice({
    name: "register",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export const { } = registerSlice.actions;
export const registerSelector = (store: RootState) => store.registerReducer
export default registerSlice.reducer