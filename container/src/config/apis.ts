export const BASE_URI = "http://localhost:8000";
export const API_PRIFIX = "api";
export const REQUEST_BASE_URI = `${BASE_URI}/${API_PRIFIX}`;

export const productBaseURI = `${REQUEST_BASE_URI}/products`;
export const userBaseURI = `${REQUEST_BASE_URI}/users`;

export const APIS = {
  product: {
    upload: `${productBaseURI}/v1/upload`,
    new: `${productBaseURI}/v1`,
  },
  user: {
    checkEmail: `${userBaseURI}/team/check-email`,
    teams: `${userBaseURI}/team/v1`,
    users: `${userBaseURI}/v1`,
  },
};

export const frontStoreLink = 'http://localhost:3000'