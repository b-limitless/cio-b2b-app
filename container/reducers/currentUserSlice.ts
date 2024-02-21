import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ICurrentUser {
    id:string;
    email: string;
    permissions: any[]
    role: string;
    iat: number;
}

export interface ICurrentUserPayload {
    currentUser: ICurrentUser | null;
}

const initialState:ICurrentUserPayload = {
    currentUser: null
}

export const currentUserSlice = createSlice({
    name: 'currentUser', 
    initialState,
    reducers: {
        setCurrentUser(state:ICurrentUserPayload, action:PayloadAction<ICurrentUser | null>) {
            return {...state, currentUser: action.payload}
        }
    }
});

export const {setCurrentUser} = currentUserSlice.actions;
export default currentUserSlice.reducer;
