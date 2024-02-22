import { request } from '../src/utils/request';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticatedUser } from '../reducers/authSlice';
import { APIS } from '../src/apis';
import { RootState } from '../src/store';

interface AuthenticatedUserInterface {
    setLoading: Function;
}
export default function useSetAuthenticatedUser({ setLoading }: AuthenticatedUserInterface) {

    const { auth: { auth } } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const { currentUser } = await request({
                    url: APIS.auth.currentUser,
                    method: 'get'
                });
                dispatch(authenticatedUser(currentUser));
                
            } catch (err) {
                console.error('Count not fetch current user', err);
            }
            setLoading(false);

        }
        // if (auth) {
        //     setLoading(false);
        // }
        if (!auth) {
            setLoading(true);
            fetchCurrentUser();
        }
    }, []);
    return null;
}
