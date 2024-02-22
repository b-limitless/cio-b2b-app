import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const verifyResponse = {
  permissions: [{}],
  verified: true,
  firstName: 'Bharat',
  lastName: 'Shah',
  country: 'AU',
  spokenLanguage: [
    'Hindi',
    'Italian'
  ],
  about: 'Bharat this is ',
  profileImageLink: null,
  originalImageUrl: 'https://res.cloudinary.com/dun5p8e5d/image/upload/v1708522799/images/ABC/ufda2h2lfcutbfrfxuv0.jpg',
  thumbnailImageUrl: 'https://res.cloudinary.com/dun5p8e5d/image/upload/v1708522802/thumbnails/ABC/wfapet6mxt1phqw0ugqo.jpg',
  email: 'bharatrose1@gmail.com',
  role: 'admin',
  id: '65d3277dd1365d5ecd4882e9'
};

export type verifyType = typeof verifyResponse;

export interface VerifyReponseInterface {
  auth: verifyType | null;
}

export const initialState: VerifyReponseInterface = {
  auth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticatedUser: (
      state: VerifyReponseInterface,
      action: PayloadAction<verifyType>
    ) => {
      return {
        ...state,
        auth: action.payload,
      };
    },
  },
});

export const {authenticatedUser} = authSlice.actions;

export default authSlice.reducer;
