import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const orderModel = {
  orderId: "5168909302",
  customerId: "0478160496",
  orderData: "5/12/2023",
  price: 3312,
  orderStatus: "canceled",
  paymentStatus: "paid",
  tailorAssigned: "null",
};

export type TOrder = typeof orderModel & { id?: string; action?: any };

export interface OrderInterface {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  update: string | null;
  affectedRows: number;
  filters: any; //{[x:string]:string[]};
}

export const initialState: OrderInterface = {
  orders: [],
  loading: false,
  error: null,
  page: 0,
  limit: 20,
  update: null,
  affectedRows: 0,
  filters: { orderStatus: [], paymentStatus: [] },
};

export const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    fetchOrders: (
      state: OrderInterface,
      action: PayloadAction<TOrder[]>
    ) => {
      return {
        ...state,
        orders: action.payload,
      };
    },
    fetchingOrders: (
      state: OrderInterface,
      action: PayloadAction<boolean>
    ) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    fetchedError: (
      state: OrderInterface,
      action: PayloadAction<string | null>
    ) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    paginateFebric: (
      state: OrderInterface,
      action: PayloadAction<number>
    ) => {
      return {
        ...state,
        page: action.payload,
      };
    },
    
    updateOrder: (
      state: OrderInterface,
      action: PayloadAction<string | null>
    ) => {
      return {
        ...state,
        update: action.payload,
      };
    },
    affectedRowAction: (
      state: OrderInterface,
      action: PayloadAction<number>
    ) => {
      return {
        ...state,
        affectedRows: action.payload,
      };
    },
    filterOrders: (
      state: OrderInterface,
      action: PayloadAction<{ [x: string]: string[] }>
    ) => {
      return {
        ...state,
        filters: action.payload,
      };
    },
  },
});

export const {
  fetchOrders,
  fetchingOrders,
  fetchedError,
  paginateFebric,
  updateOrder,
  affectedRowAction,
  filterOrders,
} = OrderSlice.actions;

export const OrderActions = OrderSlice.actions;

export default OrderSlice.reducer;
