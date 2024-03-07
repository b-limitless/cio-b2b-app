import Skeleton from '@mui/material/Skeleton';
import React, { useEffect, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { INotification, addNotifications, updateSeenNotification } from '../../../reducers/notficiationSlice';
import { fetchNotification } from '../../apis-requests/notification';
import { updateNotification } from '../../apis-requests/notification/update';
import avatar from '../../assets/img/avatar.png';
import ArrowLeft from '../../assets/svg/arrow-left.svg';
import LogoIcon from '../../assets/svg/logo-icon.svg';
import LogoText from '../../assets/svg/logo-text.svg';
import LogoutIcon from '../../assets/svg/logout.svg';
import Notification from '../../assets/svg/notification.svg';
import Setting from '../../assets/svg/settings.svg';
import { APIS } from '../../config/apis';
import { menuEnum, sideNavConfig } from '../../config/navMenu';
import { queryKeys } from '../../config/queryKeys';
import { RootState } from '../../store';
import { EEvents } from '../../types&Enums/events';
import { request } from '../../utils/request';
import NotificationRow from '../notification/NotificationRow';
import { NotificationsRowSkeleton } from '../skleton/NotificationSkleton';
import NavList from './NavList';

interface SideMenuInterface {
  setSelectedMenu: Function
  setShowProfileSideModel: Function,
  setShowSettingModel: Function,
  showSettingModel: boolean;
  globalDispatch: Function;
  actions: any;
}

enum sidebarNavClick {
  profile = 'profile',
  settings = 'settings'
}

type sidebarNavClicktype = `${sidebarNavClick}`;

interface INotificationRow {
  notification: INotification;
  seenHandler: (id: string, type:EEvents) => void;
  loading: boolean;
  type: EEvents;
}

/**
 * 
 * When they clicked to each item then its need to check its type 
 * based on its type it need to perform different action
 * for an example if type of newOrderCreated event then it need to 
 * redirect to refetch the order data and redirect them to order routes
*/


export default function SideMenu({ setShowSettingModel, showSettingModel, setSelectedMenu, setShowProfileSideModel, globalDispatch, actions }: SideMenuInterface) {

  const { auth } = useSelector((state: RootState) => state.auth);
  const { notifications } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const { mutate, error, isLoading: updatingNotification } = useMutation(updateNotification);
  const { data: getNotifications, isLoading: fetchingNotifications } = useQuery(queryKeys.fetchNotification, fetchNotification);

  const history = useHistory();
  const sideModelToggleHandler = (e:React.MouseEvent<HTMLButtonElement>, type: sidebarNavClicktype) => {
    e.stopPropagation();
    if (type == sidebarNavClick.profile) {
      setShowSettingModel(false);
      setShowProfileSideModel((prevState: boolean) => !prevState);
      return;
    }

    if (type === sidebarNavClick.settings) {
      setShowProfileSideModel(false);
      setShowSettingModel((prevState: boolean) => !prevState);
      return;
    }
  }

  const singOutHandler = async () => {
    console.log('signin out user')
    try {
      await request({
        url: APIS.auth.signout,
        method: 'post',

      });
      globalDispatch(actions.authenticatedUser(null));
      history.push('/auth/signin');

    } catch (err) {
      console.error('Could not signout', err);
    }
  }

  // Computing notification
  const notificationLength = useMemo(() => {
    const unSeenNotificationLength = notifications.filter((notification: INotification) => notification.seen === false);
    return unSeenNotificationLength.length;
  }, [notifications]);

  const seenHandler = (id: string, type:EEvents) => {
    dispatch(updateSeenNotification({ id, seen: true }));
    // send request to update the notification based on id
    mutate(id);

    // Check the type and based on that event perform different event
    if(type === EEvents.newOrderReceived) {
      // Updatae the selected menu
      setSelectedMenu(menuEnum.Orders);
      // Push to order route
      history.push('/Orders');

      // Refetch the order 
      
    }

    if(type === EEvents.newCallReceived) {
      console.log(`Update the call received event`)
    }
  }

  

  useEffect(() => {
    if (!fetchingNotifications) dispatch(addNotifications(getNotifications));
  }, [fetchNotification, fetchingNotifications]);


  

  return (
    <div className='left-menu'>
      <div className='menu-wrapper'>
        <div className='top'>
          <div className='row logo--arrow'>
            <div className='item logo'>
              <LogoIcon />
              <LogoText />
            </div>
            <div className='item arrow'>
              <input type='radio' className='left-arrow-checkbox' name='toggle-menu-checkbox' id='left-arrow-checkbox' />
              <label htmlFor='left-arrow-checkbox'>
                <ArrowLeft />
              </label>
            </div>
          </div>
          <div className='row navigation'>
            <ul className='navigation--ul'>
              {sideNavConfig.map((row, i) => <NavList row={row} i={i} key={i} setSelectedMenu={setSelectedMenu} />)}
            </ul>
          </div>
        </div>
        <div className='bottom'>
          <div className='bottom--top'>
          
            <div className='row item' onClick={(e:any) => sideModelToggleHandler(e, sidebarNavClick.settings)}>
              <input type='radio'
                name='bottom-checkbox'
                id='settings'
                className='bottom-checkbox' />
              <label htmlFor='settings'>
                <div className='icon'>
                  <Setting />
                  { }
                </div>
              </label>
              <div className='text settings title'>Settings</div>
            </div>

            <div className='row item'>
              {notifications.length > 0 && <input type='checkbox'
                name='notification-checkbox'
                id='notification-checkbox'
                className='notification-checkbox'
                hidden={true}
              />}
              <label htmlFor='notification-checkbox' className='notification-checkbox-label'>
                <div className='icon'>
                  <span className='notification-icon'>
                    {notificationLength !== 0 && <span className='dott'>{notificationLength}</span>}

                    <Notification />
                  </span>

                  { }
                </div>
                <div className='text settings title'>Notification</div>
              </label>

              {notifications.length > 0 && <div className='notification-container'>

                <div className='items'>
                  {updatingNotification && <NotificationsRowSkeleton />}
                  {!updatingNotification && notifications.slice(0, 3).map((notification, i) => <NotificationRow type={notification.type} loading={true} key={`notification-row-${i}`} notification={notification} seenHandler={seenHandler} />)}


                  {notifications.length > 3 && <div className='item'>
                    {updatingNotification && <Skeleton variant="rectangular" width={210} />}
                    {!updatingNotification && <span className='more'>Show more</span>}
                  </div>}
                </div>
              </div>}



            </div>

            {/* <div className='row item'>
              <input type='radio'
                name='bottom-checkbox'
                id='faq-checkbox'
                className='bottom-checkbox' />
              <label htmlFor='faq-checkbox'>
                <div className='icon'>
                  <FaqIcon />
                  { }
                </div>
              </label>
              <div className='text settings'>FAQ</div>
            </div> */}


          </div>
          <div className='bottom--bottom' onClick={(e:any) => sideModelToggleHandler(e, sidebarNavClick.profile)}>
            <input type='checkbox' id='avatar-profile-info' className='avatar-profile-info' />
            <label htmlFor='avatar-profile-info' >
              <div className='col avatar'>
                <img src={auth?.originalImageUrl ?? avatar} />
              </div>
            </label>
            <div className='profile-logout'>
              <div className='col name--role'>
                <div className='name'>{`${auth?.firstName ?? 'User'} ${auth?.lastName ?? ''}`}</div>
                <div className='role'>{`${auth?.role ?? 'Guest'}`}</div>
              </div>
              <div className='col logout' onClick={() => singOutHandler()}>
                <LogoutIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
