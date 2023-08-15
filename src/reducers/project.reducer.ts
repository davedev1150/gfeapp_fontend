import {
    PROJECT_FAILED,
    PROJECT_FETCHING,
    PROJECT_SUCCESS,
} from "../Constants";
import { Project } from "../types/project.type";

export interface ProjectState {
    result: Project[];
    isFetching: boolean;
    isError: boolean;
}

const initialState: ProjectState = {
    result: [],
    isFetching: false,
    isError: false,
};

export default (state = initialState, { type, payload }: any) => {
    switch (type) {
        case PROJECT_FETCHING:
            return { ...state, result: [], isFetching: true, isError: false };
        case PROJECT_SUCCESS:
            return { ...state, result: payload, isFetching: false, isError: false };
        case PROJECT_FAILED:
            return { ...state, result: [], isFetching: false, isError: true };
        default:
            return state;
    }
};