import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom';
import { Center } from '@mantine/core';
import { BrowserPage } from './components/Browser';
import { SettingsPage } from './components/Settings';
import { StatsPage } from './components/Stats';
import { WatchPage } from './components/Watch';

const TabNavigation = () => {
  return (
    <Center>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
          <li style={{ marginRight: '20px' }}>
            <Link to="/">Browser</Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/settings">Settings</Link>
          </li>
          <li style={{ marginRight: '20px' }}>
            <Link to="/stats">Stats</Link>
          </li>
          <li>
            <Link to="/watch">Watch</Link>
          </li>
        </ul>
      </nav>
    </Center>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <TabNavigation />
        
        <Outlet />
      </div>
    ),
    children: [
      { path: '/', element: <BrowserPage /> }, // Home page is now BrowserPage
      { path: 'settings', element: <SettingsPage /> },
      { path: 'stats', element: <StatsPage /> },
      { path: 'watch', element: <WatchPage /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
