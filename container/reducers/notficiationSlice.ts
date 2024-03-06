import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EEvents } from "../src/types&Enums/events";

const notificationModel = {
  timestsamp: new Date(),
  text: "Something have to say", // Server will publish this notification
  media: "string",
  seen: false, // update the state once it is clicked
  action: () => {}, // When they click to that notification you might need to perform some action
  type: "newOrderReceived", // Perhaps you need to classified what kind of notification is that
};

export interface INotification {
  id: string;
  timestsamp: Date;
  text: string;
  media: string;
  seen: boolean;
  action: Function;
  type: EEvents;
}

const initialState: INotification[] = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotifications: (
      state: INotification[],
      action: PayloadAction<INotification[]>
    ) => {
      return [...state, ...action.payload];
    },
    addNotification: (
      state: INotification[],
      action: PayloadAction<INotification>
    ) => {
      return [...state, action.payload];
    },
    updateNotification: (
      state: INotification[],
      action: PayloadAction<INotification>
    ) => {
      const { id } = action.payload;

      const updateState = state.map((row) => {
        if (row.id === id) {
          return action.payload;
        }

        return row;
      });

      return updateState;
    },
    updateSeenNotification: (
      state: INotification[],
      action: PayloadAction<{ id: string; seen: boolean }>
    ) => {
      const { id, seen } = action.payload;
      const copyState = JSON.parse(JSON.stringify(state));

      const updateState: INotification[] = copyState.map(
        (row: INotification) => {
          if (row.id === id) {
            row.seen = seen;
          }

          return row;
        }
      );

      return updateState;
    },
  },
});

export const {addNotifications, addNotification, updateNotification, updateSeenNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
