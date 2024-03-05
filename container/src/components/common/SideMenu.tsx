import React, { useMemo } from 'react';
import avatar from '../../assets/img/avatar.png';
import ArrowLeft from '../../assets/svg/arrow-left.svg';
import FaqIcon from '../../assets/svg/faq.svg';
import LogoIcon from '../../assets/svg/logo-icon.svg';
import LogoText from '../../assets/svg/logo-text.svg';
import LogoutIcon from '../../assets/svg/logout.svg';
import rightArrowRound from '../../assets/svg/right-arrow-round.svg';
import Setting from '../../assets/svg/settings.svg';
import Notification from '../../assets/svg/notification.svg';
import SwitchPro from '../../assets/svg/switch-pro.svg';
import BlueDott from '../../assets/svg/blue-dott.svg';
import CashSVG from '../../assets/svg/cash.svg';
import { sideNavConfig } from '../../config/navMenu';
import NavList from './NavList';
import { APIS } from '../../apis';
import { useHistory } from 'react-router-dom';
import { request } from '../../utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { INotification, updateNotification, updateSeenNotification } from '../../../reducers/notficiationSlice';

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
  seenHandler: Function;
}

const NotificationRow = ({ notification, seenHandler }: INotificationRow) => {
  return <div className='item' onClick={() => seenHandler(notification.id)}>
    <div className='col icon'><CashSVG /></div>
    <div className='col description'>
      <div className='row note'>
        {/* User is trying to Withdrawal more than 20% of the account. */}
        {notification.text}
      </div>
      <div className='row date'>July 16, 2020</div>

    </div>
    <div className='col dott_n'>
      {!notification.seen && <BlueDott />}
    </div>
  </div>
}

export default function SideMenu({ setShowSettingModel, showSettingModel, setSelectedMenu, setShowProfileSideModel, globalDispatch, actions }: SideMenuInterface) {

  const { auth } = useSelector((state: RootState) => state.auth);
  const { notifications } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const history = useHistory();
  const sideModelToggleHandler = (type: sidebarNavClicktype) => {
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

  const seenHandler = (id: string) => {
    dispatch(updateSeenNotification({ id, seen: true }));
    // send request to update the notification based on id

  }

  console.log('notificationLength', notificationLength)

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
            {/* <div className='row switch--account'>
              <div className='col icon'>
                <SwitchPro/>
              </div>
              <div className='col details'>
                <div className='details--item switch'>Switch account
                  <br />to <span>Pro</span></div>
                <div className='details--item unlinited'>Unlimited access to <br />biggest 3d models service <br />with highest quality</div>
                <div className='details--item ico-getpro'>
                  <div className='get-pro'>Get your Pro</div>
                  <div className='icon-right'>
                    <img src={rightArrowRound} />
                  </div>
                </div>
              </div>
            </div> */}
            <div className='row item' onClick={() => sideModelToggleHandler(sidebarNavClick.settings)}>
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
                  {notifications.slice(0, 4).map((notification, i) => <NotificationRow key={`notification-row-${i}`} notification={notification} seenHandler={seenHandler} />)}
                  {/* <div className='item'>
                    <div className='col icon'><CashSVG /></div>
                    <div className='col description'>
                      <div className='row note'>
                        User is trying to Withdrawal more than 20% of the account.
                      </div>
                      <div className='row date'>July 16, 2020</div>

                    </div>
                    <div className='col dott_n'><BlueDott /></div>
                  </div>
                  <div className='item'>
                    <div className='col icon'><CashSVG /></div>
                    <div className='col description'>
                      <div className='row note'>
                        User is trying to Withdrawal more than 20% of the account.
                      </div>
                      <div className='row date'>July 16, 2020</div>

                    </div>
                    <div className='col dott_n'><BlueDott /></div>
                  </div>
                  <div className='item'>
                    <div className='col icon'><CashSVG /></div>
                    <div className='col description'>
                      <div className='row note'>
                        User is trying to Withdrawal more than 20% of the account.
                      </div>
                      <div className='row date'>July 16, 2020</div>

                    </div>
                    <div className='col dott_n'><BlueDott /></div>
                  </div>
                  <div className='item'>
                    <div className='col icon'><CashSVG /></div>
                    <div className='col description'>
                      <div className='row note'>
                        User is trying to Withdrawal more than 20% of the account.
                      </div>
                      <div className='row date'>July 16, 2020</div>

                    </div>
                    <div className='col dott_n'><BlueDott /></div>
                  </div> */}


                  {notifications.length > 3 && <div className='item'>
                    <span className='more'>Show more</span>
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
          <div className='bottom--bottom' onClick={() => sideModelToggleHandler(sidebarNavClick.profile)}>
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
