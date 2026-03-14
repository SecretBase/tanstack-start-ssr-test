import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nodePolyfills } from "vite-plugin-node-polyfills"

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig(({ isSsrBuild }) => {

  console.log({ isSsrBuild })
  return {
    plugins: [
      // Include a plugin only when building for SSR (server bundle):
      // ...(ssr ? [yourSsrOnlyPlugin()] : []),
      devtools(),
      nodePolyfills(),
      nitro({ rollupConfig: { external: [/^@sentry\//] } }),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
      tailwindcss(),
      tanstackStart(),
      viteReact(),
    ],
  }
})

export default config
