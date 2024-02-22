import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { TabICO, TabPanel, a11yProps } from '@pasal/cio-component-library';
import * as React from 'react';
import styles from "./tab.module.scss";
import Paypal from '../TabContents/Paypal';
import { ESettings, ISettings } from '../Setting';
// import Customize from './TabContents/customize';
// import Measurement from './TabContents/measurement';
// import Shipping from './TabContents/Shipping';
// import Assignment from './TabContents/assignment';

interface ITabSettings extends ISettings {
    onChangeHandler: Function;
    onMouseLeaveEventHandler:Function;
    saveHandler:Function;
}

export default function TabSettings({paypal, aws, onChangeHandler, onMouseLeaveEventHandler, saveHandler}: ITabSettings) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)
        setValue(newValue);
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Secrets">
                    <TabICO label="Paypal" {...a11yProps(0)} />
                    <TabICO label="AWS" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>

                {/* <div className={styles.tab__panel}>
            Please wait...
        </div> */}
                {/* Item One */}
                <Paypal
                paypal={paypal}
                onChangeHandler={onChangeHandler}
                onMouseLeaveEventHandler={onMouseLeaveEventHandler}
                saveHandler={saveHandler}
                
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                World
            </TabPanel>
        </Box>
    );
}

