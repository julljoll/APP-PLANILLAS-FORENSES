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
