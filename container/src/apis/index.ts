export const baseURL = 'http://localhost:8000';

export const APIS = {
    auth: {
        signout: `${baseURL}/api/users/signout`, 
        currentUser: `${baseURL}/api/users/currentuser`
    }
}