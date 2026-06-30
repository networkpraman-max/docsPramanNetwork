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
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    // Ye plugin global, Buffer, process sabko browser me available kar dega
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  optimizeDeps: {
    include: ['@praman-network/sdk', '@lit-protocol/lit-node-client', 'tslib']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
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

---

## 🎨 Premium Login Component Examples

Integrate a beautiful, cyber-minimalist login page that fits perfectly with PramanAuth's biometric focus. Below are complete, styled component implementations for both **React** and **Vue 3**.

### ⚛️ React Implementation

Here is a complete setup with a styled glassmorphic biometric login card (`Login.jsx`) and the main application coordinator (`App.jsx`).

#### 1. The main application coordinator (`App.jsx`)

This matches the initialization and auth flow. It manages the login popup and tracks the user state:

```javascript
import { useState } from 'react';
import { initPraman } from '@praman-network/sdk';
import LoginPage from './Login';

// Initialize with your test credentials
const praman = initPraman({
  apiKey: 'pk_test_DOd1GeOt6KW4SzO7EGLIwWYF', // Replace with your actual API key
  network: "polygon-amoy",
  idpUrl: "https://auth.praman.network",
  backendUrl: "https://api.praman.network"
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await praman.loginWithPopup({ scopes: ['email', 'profile'] });
      if (result.success) {
        setUser(result.user);
        console.log("User Data:", result.user);
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error("Auth failed:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0c', 
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {!user ? (
        <LoginPage 
          onLogin={handleLogin} 
          loading={loading} 
          error={error} 
        />
      ) : (
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '24px'
          }}>
            ✓
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Authenticated Successfully</h2>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px', wordBreak: 'break-all' }}>
            <strong>DID:</strong> {user.did}
          </p>
          <button 
            onClick={() => setUser(null)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'transparent',
              color: '#ffffff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
```

#### 2. The styled login component (`Login.jsx`)

Save this as `Login.jsx` to build a clean, animated login card:

```jsx
import React from 'react';

export default function LoginPage({ onLogin, loading, error }) {
  return (
    <div style={styles.card}>
      <div style={styles.glow} />
      
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <span style={styles.logo}>P</span>
        </div>
        <h2 style={styles.title}>PramanAuth Test App</h2>
        <p style={styles.subtitle}>Decentralized Zero-Knowledge Biometric Authentication</p>
      </div>

      {/* Biometric Icon & Animation */}
      <div style={styles.scannerContainer}>
        <div style={{
          ...styles.scannerRing,
          animation: loading ? 'pulse 1.5s infinite ease-in-out' : 'none',
          borderColor: loading ? '#6366f1' : 'rgba(255, 255, 255, 0.1)'
        }}>
          <svg style={{
            ...styles.fingerprintIcon,
            fill: loading ? '#6366f1' : '#a1a1aa'
          }} viewBox="0 0 24 24" width="64" height="64">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          {loading && <div style={styles.scanBar} />}
        </div>
      </div>

      {/* Button & Feedback */}
      <div style={styles.actionContainer}>
        {error && (
          <div style={styles.errorAlert}>
            {error}
          </div>
        )}

        <button 
          onClick={onLogin} 
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? (
            <span style={styles.loadingText}>
              <span style={styles.spinner} /> Verifying Biometrics...
            </span>
          ) : (
            "Sign In with PramanAuth"
          )}
        </button>
      </div>

      {/* CSS Keyframes injected dynamically */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          50% { transform: scale(1.03); box-shadow: 0 0 20px 10px rgba(99, 102, 241, 0.1); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  card: {
    position: 'relative',
    background: 'rgba(15, 15, 20, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    padding: '40px 32px',
    maxWidth: '440px',
    width: '100%',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden'
  },
  glow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%)',
    pointerEvents: 'none',
    zIndex: 0
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
    zIndex: 1
  },
  logoContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '22px',
    color: '#fff'
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#ffffff',
    letterSpacing: '-0.025em'
  },
  subtitle: {
    fontSize: '13px',
    color: '#8e8e9f',
    lineHeight: '1.5',
    margin: 0
  },
  scannerContainer: {
    marginBottom: '32px',
    zIndex: 1
  },
  scannerRing: {
    position: 'relative',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    overflow: 'hidden'
  },
  fingerprintIcon: {
    transition: 'fill 0.3s ease'
  },
  scanBar: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
    boxShadow: '0 0 8px #6366f1',
    animation: 'scan 2s infinite linear'
  },
  actionContainer: {
    width: '100%',
    zIndex: 1
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
    transition: 'all 0.2s ease',
  },
  errorAlert: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '8px',
    padding: '12px',
    color: '#f87171',
    fontSize: '13px',
    marginBottom: '16px',
    textAlign: 'center'
  },
  loadingText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  spinner: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    animation: 'spin 0.8s infinite linear'
  }
};
```

---

### 🟢 Vue 3 Single File Component (`Login.vue`)

Here is the equivalent, beautifully styled **Vue 3 Single File Component** using `<script setup>` syntax and scoped CSS:

```vue
<template>
  <div class="praman-auth-container">
    <!-- Logged Out / Login Card -->
    <div v-if="!user" class="login-card">
      <div class="glow-effect"></div>
      
      <!-- Card Header -->
      <div class="card-header">
        <div class="logo-box">
          <span class="logo-text">P</span>
        </div>
        <h2 class="title">PramanAuth Test App</h2>
        <p class="subtitle">Decentralized Zero-Knowledge Biometric Authentication</p>
      </div>

      <!-- Scanner Indicator -->
      <div class="scanner-section">
        <div class="scanner-ring" :class="{ 'is-loading': loading }">
          <svg class="biometric-icon" :class="{ 'active-icon': loading }" viewBox="0 0 24 24" width="64" height="64">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <div v-if="loading" class="scanner-bar"></div>
        </div>
      </div>

      <!-- Action Button & Errors -->
      <div class="action-section">
        <div v-if="error" class="error-msg">
          {{ error }}
        </div>

        <button 
          @click="handleLogin" 
          :disabled="loading" 
          class="login-button"
        >
          <template v-if="loading">
            <span class="spinner"></span>
            Verifying Biometrics...
          </template>
          <template v-else>
            Sign In with PramanAuth
          </template>
        </button>
      </div>
    </div>

    <!-- Logged In State -->
    <div v-else class="success-card">
      <div class="check-badge">✓</div>
      <h2 class="title">Authenticated Successfully</h2>
      <p class="did-info"><strong>DID:</strong> {{ user.did }}</p>
      <button @click="logout" class="signout-button">Sign Out</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { initPraman } from '@praman-network/sdk';

// Initialize with your test credentials
const praman = initPraman({
  apiKey: 'pk_test_DOd1GeOt6KW4SzO7EGLIwWYF', // Replace with your actual API key
  network: "polygon-amoy",
  idpUrl: "https://auth.praman.network",
  backendUrl: "https://api.praman.network"
});

const user = ref(null);
const loading = ref(false);
const error = ref(null);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  try {
    const result = await praman.loginWithPopup({ scopes: ['email', 'profile'] });
    if (result.success) {
      user.value = result.user;
      console.log("User Data:", result.user);
    } else {
      error.value = "Authentication failed. Please try again.";
    }
  } catch (err) {
    console.error("Auth failed:", err);
    error.value = err.message || "An unexpected error occurred.";
  } finally {
    loading.value = false;
  }
};

const logout = () => {
  user.value = null;
};
</script>

<style scoped>
.praman-auth-container {
  min-height: 100vh;
  background-color: #0a0a0c;
  color: #ffffff;
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  align-items: center;
  justifyContent: center;
  padding: 20px;
}

.login-card, .success-card {
  position: relative;
  background: rgba(15, 15, 20, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 40px 32px;
  max-width: 440px;
  width: 100%;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.glow-effect {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.card-header {
  text-align: center;
  margin-bottom: 32px;
  z-index: 1;
}

.logo-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  display: flex;
  align-items: center;
  justifyContent: center;
  margin: 0 auto 16px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.logo-text {
  font-weight: bold;
  font-size: 22px;
  color: #fff;
}

.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #ffffff;
  letter-spacing: -0.025em;
}

.subtitle {
  font-size: 13px;
  color: #8e8e9f;
  line-height: 1.5;
  margin: 0;
}

.scanner-section {
  margin-bottom: 32px;
  z-index: 1;
}

.scanner-ring {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justifyContent: center;
  background-color: rgba(255, 255, 255, 0.02);
  overflow: hidden;
  transition: all 0.3s ease;
}

.scanner-ring.is-loading {
  border-color: #6366f1;
  animation: pulse 1.5s infinite ease-in-out;
}

.biometric-icon {
  fill: #a1a1aa;
  transition: fill 0.3s ease;
}

.biometric-icon.active-icon {
  fill: #6366f1;
}

.scanner-bar {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #6366f1, transparent);
  box-shadow: 0 0 8px #6366f1;
  animation: scan 2s infinite linear;
}

.action-section {
  width: 100%;
  z-index: 1;
}

.login-button {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justifyContent: center;
  gap: 8px;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-msg {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  padding: 12px;
  color: #f87171;
  font-size: 13px;
  margin-bottom: 16px;
  text-align: center;
}

.spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  animation: spin 0.8s infinite linear;
}

/* Success State Styles */
.check-badge {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justifyContent: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.did-info {
  color: #9ca3af;
  font-size: 14px;
  margin-bottom: 24px;
  word-break: break-all;
  text-align: center;
}

.signout-button {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Animations */
@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
  50% { transform: scale(1.03); box-shadow: 0 0 20px 10px rgba(99, 102, 241, 0.1); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
}

@keyframes scan {
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
```

