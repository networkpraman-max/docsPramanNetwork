import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

// Mock Code Snippets for the Hero Interactive Console
const CODE_SNIPPETS = {
  install: {
    label: '1. Install SDK',
    filename: 'terminal',
    language: 'bash',
    code: `npm install @praman-network/sdk`,
    output: `Added @praman-network/sdk v1.0.0
Ready to secure Web3 applications with ZK biometrics.`
  },
  initialize: {
    label: '2. Setup client',
    filename: 'app.ts',
    language: 'typescript',
    code: `import { PramanClient } from '@praman-network/sdk';

const praman = new PramanClient({
  appId: "app_id_0x98f2",
  relayerUrl: "https://relayer.praman.network",
  network: "arbitrum"
});`,
    output: `PramanClient successfully initialized for App ID: app_id_0x98f2
Ready for gasless zero-knowledge biometric proofs.`
  },
  prove: {
    label: '3. Generate Proof',
    filename: 'auth.ts',
    language: 'typescript',
    code: `// Capture raw biometrics & generate Groth16 proof client-side
const userSession = await praman.authenticate({
  biometricType: 'face_or_fingerprint',
  scope: 'login_verification'
});

console.log("ZK Proof generated locally!");`,
    output: `🔑 Quantizing raw biometric features...
🛡️ Client-side encryption key generated...
⚡ Computing Groth16 ZK-SNARK proof locally...
[Success] Proof: { pi_a: [...], pi_b: [...], pi_c: [...] }`
  },
  verify: {
    label: '4. Verify ZK Proof',
    filename: 'verify.ts',
    language: 'typescript',
    code: `// Verify ZK proof on-chain or off-chain via relayer
const result = await praman.verifyProof(userSession.proof);

if (result.isValid) {
  console.log("Identity asserted securely & gaslessly!");
}`,
    output: `🚀 Sending payload to gasless relayer...
📡 Querying Arbitrum Smart Contract verifier...
✅ Proof Verified. Sybil-resistance checked.
🎉 Identity successfully asserted!`
  }
};

// Interactive Flow Steps for the "How it Works" visualizer
const FLOW_STEPS = [
  {
    title: "1. Device Authentication",
    description: "User triggers fingerprint or face scanner on their personal device. Biometric features are processed instantly in a secure enclave.",
    icon: (
      <svg className="w-6 h-6 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6a9 9 0 001.8 5.4M15 11v5a2 2 0 01-2 2h-2m-6 4h12a2 2 0 002-2v-6a9 9 0 00-1.8-5.4M15 11c0-3.517 1.009-6.799 2.753-9.571" />
      </svg>
    )
  },
  {
    title: "2. Client-Side Proving",
    description: "SnarkJS computes a Groth16 zero-knowledge proof inside the browser's JavaScript engine. No raw biometric parameters are ever sent to external servers.",
    icon: (
      <svg className="w-6 h-6 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "3. Gasless Relaying",
    description: "The client sends the ZK-proof to the Praman Relayer, which verifies the API key and sponsors the blockchain transaction gas fee.",
    icon: (
      <svg className="w-6 h-6 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "4. Smart Contract Assert",
    description: "Arbitrum verifier contracts validate the cryptographic proof, publishing the verified biometric unique identifier without exposing user details.",
    icon: (
      <svg className="w-6 h-6 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  }
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const [activeTab, setActiveTab] = useState<keyof typeof CODE_SNIPPETS>('install');
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Set console output on tab switch
  useEffect(() => {
    setConsoleOutput(CODE_SNIPPETS[activeTab].output);
  }, [activeTab]);

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput('Executing code block...');
    setTimeout(() => {
      setConsoleOutput(CODE_SNIPPETS[activeTab].output);
      setIsRunning(false);
    }, 900);
  };

  return (
    <Layout
      title="Praman Network Documentation"
      description="Decentralized Zero-Knowledge biometric identity and talent verification SDK.">
      <div className="relative min-h-screen bg-darkbg text-slate-100 flex flex-col items-center px-4 overflow-hidden">
        
        {/* Background elements */}
        <div className="absolute inset-0 bg-web3-grid pointer-events-none opacity-60 z-0"></div>
        <div className="absolute inset-0 bg-noise pointer-events-none z-0"></div>
        
        {/* Ambient lightings */}
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[300px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none z-0"></div>
        <div className="absolute top-[40%] right-[10%] w-[600px] h-[400px] rounded-full bg-cyan-600/5 blur-[150px] pointer-events-none z-0"></div>

        {/* HERO SECTION */}
        <div className="relative max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20 pb-16 items-center">
          
          {/* Hero text (Left Column) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/60 border border-white/5 text-xs text-slate-300 font-medium mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
              Praman Network v1.0.0 Ready
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-white mb-6 leading-[1.1] max-w-2xl font-sans">
              Privacy-First <span className="text-gradient-cyan">Biometric Identity</span> for Web3
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
              PramanAuth enables gasless, decentralised biometric verification using secure local zero-knowledge proofs. Build Sybil-resistant apps without storing user biometrics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
              <Link
                to="/docs/installation"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#00F0FF] text-zinc-950 font-bold hover:bg-[#33f3ff] transition-all hover:scale-[1.02] shadow-[0_0_25px_rgba(0,240,255,0.3)] text-center no-underline hover:no-underline font-display">
                Get Started
              </Link>
              <Link
                to="https://github.com/praman-network"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-zinc-950/50 hover:bg-zinc-900 border border-white/10 text-white font-medium hover:border-[#00F0FF]/30 transition-all hover:scale-[1.02] text-center no-underline hover:no-underline font-display">
                View Repository
              </Link>
            </div>
          </div>

          {/* Hero interactive console (Right Column) */}
          <div className="lg:col-span-5 w-full">
            <div className="code-console overflow-hidden flex flex-col h-[400px]">
              {/* Header with window controls */}
              <div className="code-console-header px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  <span className="text-[11px] text-slate-500 font-mono ml-2">{CODE_SNIPPETS[activeTab].filename}</span>
                </div>
                <button 
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-2.5 py-1 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 hover:bg-[#00F0FF]/20 text-[11px] font-mono flex items-center gap-1 transition-all">
                  {isRunning ? (
                    <span className="w-2.5 h-2.5 rounded-full border border-[#00F0FF] border-t-transparent animate-spin"></span>
                  ) : (
                    <span>▶ Run Code</span>
                  )}
                </button>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-[#0a0d14] border-b border-white/5 overflow-x-auto">
                {(Object.keys(CODE_SNIPPETS) as Array<keyof typeof CODE_SNIPPETS>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-4 py-2.5 font-mono text-[11px] border-r border-white/5 whitespace-nowrap transition-all ${
                      activeTab === key 
                        ? 'bg-zinc-950 text-[#00F0FF] font-semibold border-b-2 border-b-[#00F0FF]' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    }`}>
                    {CODE_SNIPPETS[key].label}
                  </button>
                ))}
              </div>

              {/* Editor Workspace */}
              <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-zinc-950/80 text-emerald-400 flex flex-col justify-between">
                <pre className="text-left text-slate-300 leading-relaxed overflow-x-auto m-0">
                  <code>{CODE_SNIPPETS[activeTab].code}</code>
                </pre>
                
                {/* Console Output Box */}
                <div className="mt-4 p-3 bg-black/60 border border-white/5 rounded font-mono text-[11px] text-slate-400 flex flex-col gap-1 text-left min-h-[90px]">
                  <span className="text-[9px] text-[#00F0FF] font-bold tracking-wider uppercase">Console Output</span>
                  <div className="whitespace-pre-line text-slate-300 leading-relaxed font-light">
                    {consoleOutput}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BENTO GRID FEATURES */}
        <div className="relative max-w-7xl w-full z-10 py-16 px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Advanced Web3 Authentication Stack
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Decentralized Sybil-resistance primitives crafted for speed, convenience, and complete user sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="glass-border-card p-8 flex flex-col justify-between min-h-[250px] text-left">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center mb-6 border border-[#00F0FF]/20">
                  <svg className="w-6 h-6 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-2">Privacy Preserving</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Raw biometric inputs are transformed into cryptographic keys and client-side proof instances. Zero sensitive data is transmitted or shared.
                </p>
              </div>
              <div className="text-[10px] text-[#00F0FF] font-bold tracking-wider uppercase font-display mt-4">Secure Enclaves</div>
            </div>

            {/* Card 2 */}
            <div className="glass-border-card p-8 flex flex-col justify-between min-h-[250px] text-left">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center mb-6 border border-[#00F0FF]/20">
                  <svg className="w-6 h-6 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-2">Browser Proof Generation</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Generates cryptographic Groth16 zero-knowledge proofs directly inside client applications via WASM, maintaining fully decentralized trust bounds.
                </p>
              </div>
              <div className="text-[10px] text-[#00F0FF] font-bold tracking-wider uppercase font-display mt-4">SnarkJS Engine</div>
            </div>

            {/* Card 3 */}
            <div className="glass-border-card p-8 flex flex-col justify-between min-h-[250px] text-left">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center mb-6 border border-[#00F0FF]/20">
                  <svg className="w-6 h-6 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-display text-white mb-2">Gasless Transactions</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Leverage our developer API keys and secure backend relayer to sponsor smart contract verification gas fees, creating friction-free onboarding.
                </p>
              </div>
              <div className="text-[10px] text-[#00F0FF] font-bold tracking-wider uppercase font-display mt-4">Sponsoring Relayer</div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE WORKFLOW PREVIEW */}
        <div className="relative max-w-5xl w-full z-10 py-16 px-4 mb-16">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-white mb-4">
              How ZK-Authentication Works
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Follow the journey of user identity assertion through the Praman network protocol stack.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Step navigation */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {FLOW_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`step-node text-left p-4 rounded-xl border flex items-start gap-4 transition-all ${
                    activeStep === idx 
                      ? 'active bg-zinc-950/70 border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.08)]' 
                      : 'border-white/5 bg-zinc-950/20 hover:bg-zinc-950/40 hover:border-white/10'
                  }`}>
                  <div className={`p-2 rounded-lg ${activeStep === idx ? 'bg-[#00F0FF]/15' : 'bg-white/5'}`}>
                    {step.icon}
                  </div>
                  <div className="text-left">
                    <h4 className={`text-base font-bold font-display ${activeStep === idx ? 'text-white' : 'text-slate-400'}`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Step detailed visualizer */}
            <div className="lg:col-span-7">
              <div className="code-console p-8 flex flex-col justify-center items-center text-center h-[340px] relative">
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10"></span>
                </div>
                
                <div className="w-16 h-16 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center mb-6 animate-pulse">
                  {FLOW_STEPS[activeStep].icon}
                </div>
                
                <h3 className="text-xl font-bold font-display text-white mb-3 font-sans">
                  {FLOW_STEPS[activeStep].title}
                </h3>
                
                <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                  {FLOW_STEPS[activeStep].description}
                </p>

                <div className="mt-6 flex gap-1 justify-center">
                  {FLOW_STEPS.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`w-8 h-1 rounded-full transition-all ${idx === activeStep ? 'bg-[#00F0FF] w-12' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
