/**
 * @copyright Copyright (c) 2026 julljoll
 * Diseño UX/UI, Arquitectura de la Información y Programación: julljoll
 * julljoll@gmail.com | https://sha256.us | https://siriusweb.us
 * Todos los derechos reservados. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Proprietary
 */
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import UpdatePrompt from './UpdatePrompt.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <UpdatePrompt />
  </StrictMode>,
);
