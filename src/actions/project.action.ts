import { server, PROJECT_FAILED, PROJECT_FETCHING, PROJECT_SUCCESS } from "../Constants";
import { Project } from "../types/project.type";
import { httpClient } from "../utils/httpclient";
import { history } from "..";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export const setProjectFetchingToState = () => ({
    type: PROJECT_FETCHING,
});

export const setProjectSuccessToState = (payload: Project[]) => ({
    type: PROJECT_SUCCESS,
    payload,
});

export const setProjectFailedToState = () => ({
    type: PROJECT_FAILED,
});


export const loadProject = () => {
    return (dispatch: any) => {
        dispatch(setProjectFetchingToState());
        doGetProjects(dispatch);
    };
};

export const loadStockByKeyword = (keyword: string) => {
    return async (dispatch: any) => {
        dispatch(setProjectFetchingToState());

        if (keyword) {
            let result = await httpClient.get<any>(`${server.PROJECT_URL}/keyword/${keyword}`);
            dispatch(setProjectSuccessToState(result.data));
        } else {
            doGetProjects(dispatch);
        }
    };
};

const doGetProjects = async (dispatch: any) => {
    try {
        const result = await httpClient.get<Project[]>(server.PROJECT_URL);
        dispatch(setProjectSuccessToState(result.data));
    } catch (error) {
        dispatch(setProjectFailedToState());
    }
};

export const addProject = (formData: FormData) => {
    return async (dispatch: any) => {
        await httpClient.post(server.PROJECT_URL, formData);
        history.back();
    };
};

export const deleteProduct = (id: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(setProjectFailedToState());
        await httpClient.delete(`${server.PROJECT_URL}/${id}`);
        await doGetProjects(dispatch);
    };
};