import type { Item } from '../Products';
import {
    ADD_TO_CART,
    REMOVE_TO_CART,
    RESET_ALL,
    USER_LIST,
    USER_LIST_FAILURE,
    USER_LIST_SUCCESS,
} from './constants';

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
};

export function addToCart(item: Item){
    return {
        type:ADD_TO_CART,
        data:item
    }
}
export function removeToCart(itemId: number){
    return {
        type:REMOVE_TO_CART,
        data:itemId
    }
}
export function getUserList(){
    return {
        type: USER_LIST as typeof USER_LIST,
    }
}

export function userListSuccess(users: User[]) {
    return {
        type: USER_LIST_SUCCESS as typeof USER_LIST_SUCCESS,
        data: users,
    };
}

export function userListFailure(error: string) {
    return {
        type: USER_LIST_FAILURE as typeof USER_LIST_FAILURE,
        data: error,
    };
}

export function resetAll(){
    return {
        type: RESET_ALL as typeof RESET_ALL
    }
}