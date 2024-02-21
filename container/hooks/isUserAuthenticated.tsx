import { request } from '@pasal/cio-component-library';
import { useEffect } from 'react';
import { setCurrentUser } from '../reducers/currentUserSlice';
import { useDispatch } from 'react-redux';

export default function isUserAuthenticated() {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentUser = async () => {
      try {
        const { currentUser } = await request({
          url: '/api/users/currentuser',
          method: 'get'
        });
        dispatch(setCurrentUser(currentUser));
      } catch (err) {
        console.error('Count not fetch current user', err);
      } 
    }
    currentUser();
  }, []);

  return null;
}
