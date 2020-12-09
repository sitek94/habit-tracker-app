import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import { AccountTab } from 'components/account-tab';
import { AppearanceTab } from 'components/appearance-tab';
import { PerformanceTab } from 'components/performance-tab';
import {
  AccountCircle as AccountCircleIcon,
  Equalizer as EqualizerIcon,
  Palette as PaletteIcon,
} from '@material-ui/icons';

// Available tabs
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
];

/**
 * User Settings Screen
 * 
 * The settings are displayed as swipeable tabs. The settings that are available
 * are: account, performance, appearance.
 */
export default function UserSettingsScreen() {
  // Selected tab
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // SwipeableViews index change handler
  const handleIndexChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 600,
      }}
    >
      <Box
        component={Paper}
        sx={{ width: '100%', height: { xs: '100%', sm: 'auto' } }}
      >
        {/* Tabs */}
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

        {/* Views */}
        <Box sx={{ m: { xs: 0, sm: 2 } }}>
          <SwipeableViews
            // Fixes broken animation when changing view for the first time.
            // https://github.com/oliviertassinari/react-swipeable-views/issues/599
            containerStyle={{
              transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
            }}
            index={selectedTab}
            onChangeIndex={handleIndexChange}
          >
            <AccountTab />

            <PerformanceTab />

            <AppearanceTab />
          </SwipeableViews>
        </Box>
      </Box>
    </Box>
  );
}

export { UserSettingsScreen };
