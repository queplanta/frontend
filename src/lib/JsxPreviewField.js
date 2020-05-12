import React from 'react'
import { TextField, Tabs, Tab, Paper } from '@material-ui/core';
import JsxParser from './JsxParser.js';
import { TabPanel, a11yProps } from '../lib/Tabs.js';

export default (props) => {
  const {environment, value, ...otherProps} = props;
  const [tabValue, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <Paper>
    <Tabs
      value={tabValue}
      onChange={handleChange}
      centered
      indicatorColor="primary"
      textColor="primary"
    >
      <Tab label="Código" {...a11yProps(0)} />
      <Tab label="Visualização" {...a11yProps(1)} />
      <Tab label="Ajuda" {...a11yProps(2)} />
    </Tabs>
    <TabPanel value={tabValue} index={0}>
      <TextField
        value={value}
        {...otherProps}
      />
    </TabPanel>
    <TabPanel value={tabValue} index={1}>
      <JsxParser
        jsx={value}
        environment={environment}
      />
    </TabPanel>
    <TabPanel value={tabValue} index={2}>
      Texto Ajuda
    </TabPanel>
  </Paper>
}
