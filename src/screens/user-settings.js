import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {
  AccountCircle as AccountCircleIcon,
  Equalizer as EqualizerIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
} from '@material-ui/icons';
import { AccountTab } from 'components/account-tab';
import { AppearanceTab } from 'components/appearance-tab';
import { PerformanceTab } from 'components/performance-tab';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    margin: theme.spacing(4),
    maxWidth: 600,
  },
}));
const tabs = [
  {
    key: 'account',
    icon: <AccountCircleIcon />,
    label: 'Account',
  },

  {
    key: 'performance',
    icon: <EqualizerIcon />,
    label: 'Performance',
  },

  {
    key: 'appearance',
    icon: <PaletteIcon />,
    label: 'Appearance',
  },

  {
    key: 'security',
    icon: <SecurityIcon />,
    label: 'Security',
  },
];
export default function UserSettingsScreen() {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleIndexChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {tabs.map(({ key, icon, label }, index) => {
          return <Tab key={key} icon={icon} label={label} value={index} />;
        })}
      </Tabs>
      <Box sx={{ m: 2 }}>
        <SwipeableViews 
          // Fixes broken animation when changing view for the first time.
          // https://github.com/oliviertassinari/react-swipeable-views/issues/599
          containerStyle={{
            transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
          }}
          index={selectedTab}
          onChangeIndex={handleIndexChange}
        >
          <AccountTab />

          <PerformanceTab />

          <AppearanceTab />
          <div>ADSD</div>
        </SwipeableViews>
      </Box>
    </Paper>
  );
}

export { UserSettingsScreen };
