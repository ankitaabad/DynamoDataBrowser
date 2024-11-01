import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { ContextMenuProvider } from 'mantine-contextmenu';
import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
// import './layout.css';
export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ContextMenuProvider>
        
      <Router />
      </ContextMenuProvider>
    </MantineProvider>
  );
}
