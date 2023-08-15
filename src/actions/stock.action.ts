import { server, STOCK_CLEAR, STOCK_FAILED, STOCK_FETCHING, STOCK_SUCCESS } from "../Constants";
import { Product } from "../types/product.type";
import { httpClient } from "../utils/httpclient";
import { history } from "..";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export const setStockFetchingToState = () => ({
    type: STOCK_FETCHING,
});

export const setStockSuccessToState = (payload: Product[]) => ({
    type: STOCK_SUCCESS,
    payload,
});

export const setStockFailedToState = () => ({
    type: STOCK_FAILED,
});

export const setStockClearToState = () => ({
    type: STOCK_CLEAR,
});

export const loadStock = () => {
    return (dispatch: any) => {
        dispatch(setStockFetchingToState());
        doGetProducts(dispatch);
    };
};

export const loadStockByKeyword = (keyword: string) => {
    return async (dispatch: any) => {
        dispatch(setStockFetchingToState());

        if (keyword) {
            let result = await httpClient.get<any>(`${server.PRODUCT_URL}/name/${keyword}`);
            dispatch(setStockSuccessToState(result.data));
        } else {
            doGetProducts(dispatch);
        }
    };
};
export const filterStock = (project: any, type: any) => {
    return async (dispatch: any) => {
        dispatch(setStockFetchingToState());

        if (project) {
            let result = await httpClient.get<any>(`${server.PRODUCT_URL}/filter?project=${project}`);
            dispatch(setStockSuccessToState(result.data));
        } else if (project && type) {
            let result = await httpClient.get<any>(`${server.PRODUCT_URL}/filter2?project=${project}&type=${type}`);
            dispatch(setStockSuccessToState(result.data))
        }
        else {
            doGetProducts(dispatch);
        }
    };
};

const doGetProducts = async (dispatch: any) => {
    try {
        const result = await httpClient.get<Product[]>(server.PRODUCT_URL);
        dispatch(setStockSuccessToState(result.data));
    } catch (error) {
        dispatch(setStockFailedToState());
    }
};

export const addProduct = (formData: FormData) => {
    return async (dispatch: any) => {
        await httpClient.post(server.PRODUCT_URL, formData);
        history.back();
    };
};

export const deleteProduct = (id: string) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        dispatch(setStockFetchingToState());
        await httpClient.delete(`${server.PRODUCT_URL}/${id}`);
        await doGetProducts(dispatch);
    };
};