import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// States
const notificationModel = {
  timestsamp: new Date(),
  text: "Something have to say", // Server will publish this notification
  media: "string",
  seen: false, // update the state once it is clicked
  action: () => {}, // When they click to that notification you might need to perform some action
  type: "newOrderReceived", // Perhaps you need to classified what kind of notification is that
};

interface INotification {
  id: string;
  timestsamp: Date;
  text: string;
  media: string;
  seen: boolean;
  action: Function;
  type: any;
}

const initialState: INotification[] = [
  {
    id: "dsfdfgdfgdfg",
    timestsamp: new Date(),
    text: "Something have to say",
    media: "string",
    seen: false,
    action: () => {},
    type: "newOrderReceived",
  },
];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
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
  },
});
