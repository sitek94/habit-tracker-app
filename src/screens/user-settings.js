import {
  Card,
  CardContent,
  FormControl,
  Hidden,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  MenuItem,
  Select,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {
  AccountCircle as AccountCircleIcon,
  Equalizer as EqualizerIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
} from '@material-ui/icons';
import { TabContext, TabPanel } from '@material-ui/lab';
import { useUserConfig } from 'context/user-config-context';
import * as React from 'react';
import { AppearanceTab } from 'components/appearance-tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 500,
  },
});
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
export default function IconLabelTabs() {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = React.useState('performance');
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const sth = useUserConfig();
  console.log(sth);

  return (
    <Card square className={classes.root}>
      <TabContext value={selectedTab}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map((tab, i) => {
            return (
              <Tab
                key={tab.key}
                icon={tab.icon}
                label={tab.label}
                value={tab.key}
              />
            );
          })}
        </Tabs>
        <CardContent>
          <TabPanel value="account">Account</TabPanel>

          <TabPanel value="performance">
            <PerformanceTab />
          </TabPanel>

          <TabPanel value="appearance">
            <AppearanceTab />
          </TabPanel>

          <TabPanel value="security">Security</TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  );
}

function PerformanceTab() {
  return <>Div</>;
}

function UserSettingsScreen() {
  return (
    <div>
      <IconLabelTabs />
    </div>
  );
}

export { UserSettingsScreen };
