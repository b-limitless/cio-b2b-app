import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const count = new Array(3).fill(0);

export const NotificationRowSkeleton = () => {
    return (
        <div className='item'>
            <div className='col icon'>
                {<Skeleton variant="rectangular" width={38} height={39.5} animation="wave" />}
            </div>
            <div className='col description'>
                <div className='row note'>
                    {<Skeleton variant="rectangular" width={294} height={42} animation="wave" />}
                </div>
                <div className='row date'>
                    {<Skeleton variant="text" width={50} height={14} animation="wave" />}
                </div>
            </div>
            <div className='col dott_n'>
                {/* {!loading && !notification?.seen && <BlueDott />} */}
            </div>
        </div>
    );
};

export const NotificationsRowSkeleton = () => {
    return count.map((item) => <NotificationRowSkeleton />)
}

