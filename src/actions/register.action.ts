import { Navigate, useNavigate } from "react-router-dom";
import { OK, REGISTER_FAILED, REGISTER_FETCHING, REGISTER_SUCCESS, server } from "../Constants";
import { User } from "../types/user.type";
import { httpClient } from "../utils/httpclient";

export const setRegisterFetchingToState = () => ({
    type: REGISTER_FETCHING,
})
export const setRegisterSeccessToState = (payload: any) => ({
    type: REGISTER_SUCCESS,
    payload
})
export const setRegisterFailedToState = () => ({
    type: REGISTER_FAILED,
})



export const register = (user: User, navigate: any) => {
    return async (dispatch: any) => {
        try {
            // loading
            dispatch(setRegisterFetchingToState())

            // connect
            const result = await httpClient.post(
                server.REGISTER_URL,
                user
            );
            if (result.status === 201) {
                alert("Register Success" + JSON.stringify(result.data))
                dispatch(setRegisterSeccessToState(result.data))
                navigate("/login")
            } else {
                alert("Register Failed" + JSON.stringify(result.data))
                dispatch(setRegisterFailedToState())
            }

        } catch (error) {
            // error
            alert("Register Failed")
            dispatch(setRegisterFailedToState())
        }

    }
}