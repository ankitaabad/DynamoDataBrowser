import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './styles.css';
import 'mantine-contextmenu/styles.layer.css';
import '@mantine/notifications/styles.css';
import "./globalstyle.css"
import {
  IconDatabase,
  IconEyeCode,
  IconPlugConnected,
  IconReportAnalytics,
  IconSettings,
} from '@tabler/icons-react';
import { ContextMenuProvider } from 'mantine-contextmenu';
import {
  AppShell,
  Center,
  DEFAULT_THEME,
  MantineProvider,
  mergeMantineTheme,
  Tabs,
  Text,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserPage } from './components/Browser';
import { SettingsPage } from './components/Settings';
import { StatsPage } from './components/Stats';
import { WatchPage } from './components/Watch';
import { themeOverride } from './theme';

const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
// import './layout.css';
export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <ContextMenuProvider>
        <AppShell>
          <AppShell.Main >
            <Tabs defaultValue="browser">
              <Tabs.List justify="center">
                <Tabs.Tab value="browser" leftSection={<IconDatabase />}>
                  Browser
                </Tabs.Tab>
                <Tabs.Tab value="watch" leftSection={<IconEyeCode />}>
                  Watch
                </Tabs.Tab>
                <Tabs.Tab value="stats" leftSection={<IconReportAnalytics />}>
                  Stats
                </Tabs.Tab>
                <Tabs.Tab value="settings" leftSection={<IconSettings />}>
                  Settings
                </Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="browser">
                <BrowserPage />
              </Tabs.Panel>
              <Tabs.Panel value="settings">
                <SettingsPage />
              </Tabs.Panel>
              <Tabs.Panel value="stats">
                <StatsPage />
              </Tabs.Panel>
              <Tabs.Panel value="watch">
                <WatchPage />
              </Tabs.Panel>
            </Tabs>
          </AppShell.Main>
          <AppShell.Footer>
            <Center>
              <IconPlugConnected />
              <Text c="primary.8"> DynamoDB Data Browser</Text>
              <IconPlugConnected />
            </Center>
          </AppShell.Footer>
        </AppShell>
        {/* <Router /> */}
      </ContextMenuProvider>
    </MantineProvider>
  );
}
