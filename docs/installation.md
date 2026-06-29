---
title: Installation
sidebar_label: Installation
sidebar_position: 2
---

# Installation & Prerequisites

To begin integrating PramanAuth, install the SDK along with its peer dependency, `tslib` (required for bundler helper resolution):

```bash
npm install @praman-network/sdk tslib
```

---

## Framework Integration Guides

Web3 libraries depend on Node.js built-ins. Follow the guide below for your framework to configure bundlers correctly and prevent build-time or runtime resolution failures.

### ⚛️ React + Vite

If you are using Vite, you must configure polyfills for Node.js variables such as `Buffer` and `global`.

#### 1. Install the Polyfill Plugin
```bash
npm install vite-plugin-node-polyfills --save-dev
```

#### 2. Update `vite.config.ts` (or `vite.config.js`)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
});
```

---

### 🌐 Next.js (App Router)

Since Next.js components compile on the server by default (React Server Components), you must handle browser-only environments and Web3 dependencies correctly.

#### 1. Use the Client Directive
Always place the `'use client'` directive at the top of components that initialize or call the Praman SDK, as it depends on browser APIs (like camera, WebGL, SnarkJS):

```typescript
'use client';

import { useEffect } from 'react';
import { initPraman, loginWithPraman } from '@praman-network/sdk';

export default function LoginPage() {
  useEffect(() => {
    // Initialize with developer API Key
    initPraman({
      apiKey: 'pm_dev_your_api_key_here',
      backendUrl: 'https://auth.praman.network'
    });
  }, []);

  const handleLogin = async () => {
    try {
      const authResult = await loginWithPraman();
      console.log('User Authenticated:', authResult);
    } catch (err) {
      console.error('Authentication error:', err);
    }
  };

  return (
    <button onClick={handleLogin}>
      Sign in with Praman
    </button>
  );
}
```

#### 2. Configure Webpack in `next.config.js`
Update your Next.js config to resolve issues regarding Node.js modules (like `fs`, `readline`) which are used by Ethereum libraries but are unavailable in the browser environment:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        readline: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
```
