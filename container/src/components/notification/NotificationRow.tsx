import React from 'react';
import { INotification } from "../../../reducers/notficiationSlice";
import { EEvents } from "../../types&Enums/events";
import CashSVG from '../../assets/svg/cash.svg';
import BlueDott from '../../assets/svg/blue-dott.svg';

interface INotificationRow {
    notification: INotification;
    seenHandler: (id: string, type: EEvents) => void;
    loading: boolean;
    type: EEvents;
}

const NotificationRow = ({ notification, seenHandler }: INotificationRow) => {
    return <div className='item' onClick={() => seenHandler(notification.id, notification.type)}>
        <div className='col icon'>

            <CashSVG />
        </div>
        <div className='col description'>
            <div className='row note'>
                {/* User is trying to Withdrawal more than 20% of the account. */}

                {notification.text}
            </div>
            <div className='row date'>


                July 16, 2020

            </div>

        </div>
        <div className='col dott_n'>
            {!notification?.seen && <BlueDott />}
        </div>
    </div>
}

export default NotificationRow;