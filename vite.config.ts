import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// ══════════════════════════════════════════════════════════════
// SHA256.US — Laboratorio de Informática Forense y Ciberseguridad
// Copyright (c) 2026 Jull R Ortiz R. Licencia MIT.
// SPDX-License-Identifier: MIT
// ══════════════════════════════════════════════════════════════

/** Cabeceras de seguridad HTTP para el servidor de desarrollo y preview */
const securityHeaders: Record<string, string> = {
  // Evita que la app sea embebida en iframes (clickjacking)
  'X-Frame-Options': 'DENY',
  // Previene sniffing de tipos MIME
  'X-Content-Type-Options': 'nosniff',
  // Habilita protección XSS en navegadores legacy
  'X-XSS-Protection': '1; mode=block',
  // Controla la información de referencia enviada al navegar
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Limita permisos de API del navegador
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  // Content Security Policy: lista blanca de recursos permitidos
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",                            // unsafe-inline requerido por Vite HMR
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self' https://generativelanguage.googleapis.com", // Gemini AI API
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; '),
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'pwa-192x192.svg', 'pwa-512x512.svg'],
        // Estrategia de caché segura con Workbox
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,svg,png,webp}'],
          runtimeCaching: [],
          // Evita que el SW sirva rutas de API o admin
          navigateFallbackDenylist: [/^\/_/, /^\/api/],
        },
        manifest: {
          name: 'SHA256.US — Planillas Forenses',
          short_name: 'SHA256.US',
          description:
            'Laboratorio de Informática Forense y Ciberseguridad. ' +
            'Copyright (c) 2026 Jull R Ortiz R. MIT License.',
          theme_color: '#0a1122',
          background_color: '#fcfcfd',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          lang: 'es',
          icons: [
            {
              src: 'pwa-192x192.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
            {
              src: 'pwa-512x512.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
          ],
        },
      }),
    ],
    define: {
      // Solo expone la API key en tiempo de compilación; NUNCA incluir secretos en el código fuente
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    // En producción NO generamos source maps para no exponer el código fuente
    build: {
      sourcemap: false,
      minify: 'esbuild',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Aplica cabeceras de seguridad en el servidor de desarrollo
      headers: securityHeaders,
    },
    preview: {
      // Aplica cabeceras de seguridad en el servidor de preview
      headers: securityHeaders,
    },
  };
});
