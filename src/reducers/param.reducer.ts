import {
    PARAM_FAILED,
    PARAM_FETCHING,
    PARAM_SUCCESS,
} from "../Constants";


export interface ParamState {
    result: any[];
    isFetching: boolean;
    isError: boolean;
}

const initialState: ParamState = {
    result: [],
    isFetching: false,
    isError: false,
};

export default (state = initialState, { type, payload }: any) => {
    switch (type) {
        case PARAM_FETCHING:
            return { ...state, result: [], isFetching: true, isError: false };
        case PARAM_SUCCESS:
            return { ...state, result: payload, isFetching: false, isError: false };
        case PARAM_FAILED:
            return { ...state, result: [], isFetching: false, isError: true };
        default:
            return state;
    }
};