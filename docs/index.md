---
title: Overview
sidebar_label: Overview
sidebar_position: 1
slug: /
---

# PramanAuth Overview

PramanAuth is a decentralized Identity-as-a-Service (IaaS) SDK providing privacy-preserving, Zero-Knowledge (ZK) biometric authentication for Web3 applications. Powered by a hybrid Web2.5 architecture, PramanAuth secures client-to-backend communication via **API Key authentication** and **Origin Whitelisting**, enabling gasless biometric verification for end-users.

---

## Why PramanAuth?

Modern authentication solutions force a trade-off between user convenience and security. PramanAuth bridges this gap by combining decentralized biometrics with zero-knowledge proofs:

### 🔒 Zero Biometric Leakage
No raw biometric data (images, videos, or raw face descriptors) is ever sent to or stored on any centralized server. Biometric templates are quantized, hashed, and encrypted client-side using wallet signatures before being archived on IPFS.

### ⚡ Browser-Side ZK Verification
Biometric comparisons are computed locally in the user's browser using client-side **Groth16 ZK-SNARK Proving (via SnarkJS)**. Raw biometrics remain completely private, and only the ZK proof is dispatched for verification.

### ⛽ Gasless User Experience
All blockchain writes, gas sponsorship, and IPFS pinning are managed securely by the Backend Relayer. Users get a fast, signature-based sign-in experience with zero transaction costs.

---

## Key Pillars of the System

| Pillar | Description |
| :--- | :--- |
| **Privacy First** | ZK proofs ensure no biometric parameters leave the user's computer. |
| **Monorepo Architecture** | Synchronized packages ensure visual, logical, and code-level parity. |
| **Developer Centric** | Standardized Express, Next.js, and React packages for swift integration. |
