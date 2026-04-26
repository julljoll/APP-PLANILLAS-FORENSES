/**
 * @copyright Copyright (c) 2026 julljoll
 * Diseño UX/UI, Arquitectura de la Información y Programación: julljoll
 * julljoll@gmail.com | https://sha256.us | https://siriusweb.us
 * Todos los derechos reservados. All rights reserved.
 * SPDX-License-Identifier: LicenseRef-Proprietary
 */
import { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function UpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // Verifica si hay actualizaciones cada 60 segundos
      if (r) {
        setInterval(() => {
          r.update();
        }, 60 * 1000);
      }
    },
  });

  useEffect(() => {
    if (needRefresh) {
      // Recarga automáticamente sin pedir confirmación al usuario
      updateServiceWorker(true);
    }
  }, [needRefresh, updateServiceWorker]);

  // No renderiza nada visible
  return null;
}
