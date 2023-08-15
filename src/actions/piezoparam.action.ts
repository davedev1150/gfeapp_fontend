import { server, PARAM_FAILED, PARAM_FETCHING, PARAM_SUCCESS } from "../Constants";
import { Project } from "../types/project.type";
import { httpClient } from "../utils/httpclient";
import { history } from "..";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export const setParamFetchingToState = () => ({
    type: PARAM_FETCHING,
});

export const setParamSuccessToState = (payload: any) => ({
    type: PARAM_SUCCESS,
    payload,
});

export const setParamFailedToState = () => ({
    type: PARAM_FAILED,
});


export const loadParam = () => {
    return (dispatch: any) => {
        dispatch(setParamFetchingToState());
        doGetParams(dispatch);
    };
};

export const loadParamByKeyword = (keyword: string) => {
    return async (dispatch: any) => {
        dispatch(setParamFetchingToState());

        if (keyword) {
            let result = await httpClient.get<any>(`${server.PARAM_URL}/keyword/${keyword}`);
            dispatch(setParamSuccessToState(result.data));
        } else {
            doGetParams(dispatch);
        }
    };
};

const doGetParams = async (dispatch: any) => {
    try {
        const result = await httpClient.get<any>(server.PARAM_URL);
        dispatch(setParamSuccessToState(result.data));
    } catch (error) {
        dispatch(setParamFailedToState());
    }
};

export const addProject = (formData: FormData) => {
    return async (dispatch: any) => {
        await httpClient.post(server.PARAM_URL, formData);
        history.back();
    };
};

export const deleteProduct = (id: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(setParamFailedToState());
        await httpClient.delete(`${server.PARAM_URL}/${id}`);
        await doGetParams(dispatch);
    };
};