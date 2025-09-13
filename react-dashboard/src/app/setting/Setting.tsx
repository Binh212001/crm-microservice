import React from 'react';

import { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import TabPanel from '../../common/mui/tabpanel';
import { StyleBox } from '../../common/styleBox';
import EmailSetting from './EmailSetting';
function Setting() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <StyleBox>
      <Tabs value={tab} onChange={handleTabChange} aria-label="setting tabs">
        <Tab label="Email" />
        <Tab label="Theme" />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <EmailSetting />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        Theme settings here
      </TabPanel>
    </StyleBox>
  );
}

export default Setting;
