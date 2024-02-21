
import { APIS } from '../apis';
import { Router } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../reducers/currentUserSlice';
import { RootState } from '../store';
import { request } from '../utils/request';



export default function useCurrentUser() {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUSer = async () => {
      try {
        const {currentCustomer} = await request({
          url: 'APIS.customer.currentUser',
          method: 'get',
        });
        dispatch(setCurrentUser(currentCustomer));
      } catch (err) {

        console.error(`Could not fetch current user ${err}`);
      }
    };

    if (!currentUser) {
      fetchCurrentUSer();
    }
  }, [dispatch, currentUser]);
  return null;
}
