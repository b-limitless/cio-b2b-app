import { configureStore } from '@reduxjs/toolkit';
import auth from '../../reducers/authSlice';
import product from '../../reducers/productSlice';
import users from '../../reducers/userSlice';
import orders from '../../reducers/orderSlice';
import notifications from '../../reducers/notficiationSlice';

export const Store = configureStore({
    reducer: {
        auth, 
        product, 
        users,
        orders,
        notifications
    }
});

export type RootState = ReturnType <typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;