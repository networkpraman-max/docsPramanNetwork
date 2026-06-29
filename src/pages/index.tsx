import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Praman Network Documentation"
      description="Decentralized Zero-Knowledge biometric identity and talent verification SDK.">
      <div className="relative min-h-[calc(100vh-60px)] bg-darkbg text-slate-100 flex flex-col items-center justify-center px-4 overflow-hidden">
        
        {/* Web3 Grid & Noise backgrounds */}
        <div className="absolute inset-0 bg-web3-grid pointer-events-none opacity-60 z-0"></div>
        <div className="absolute inset-0 bg-noise pointer-events-none z-0"></div>
        
        {/* Top Glow Ambient effect */}
        <div className="absolute top-[-20%] left-[50%] -translate-x-[50%] w-[600px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none z-0"></div>

        {/* Hero Content */}
        <div className="relative max-w-4xl text-center z-10 flex flex-col items-center pt-16 pb-12">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/60 border border-white/5 text-xs text-slate-300 font-medium mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
            Praman Network v1.0.0 Stable
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-white mb-6 max-w-3xl leading-[1.1]">
            Replacing Trust <br />
            with <span className="text-[#00F0FF] text-glow-cyan-strong">Zero-Knowledge Proofs</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
            PramanAuth is a decentralized Identity-as-a-Service (IaaS) platform enabling privacy-preserving, gasless biometric identity assertions for Web3 applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <Link
              to="/docs/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#00F0FF] text-zinc-950 font-bold hover:bg-[#33f3ff] transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(0,240,255,0.3)] text-center no-underline hover:no-underline">
              Explore Docs
            </Link>
            <Link
              to="https://github.com/praman-network"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-zinc-950/50 hover:bg-zinc-900 border border-white/10 text-white font-medium hover:border-[#00F0FF]/30 transition-all hover:scale-[1.02] text-center no-underline hover:no-underline">
              View Repository
            </Link>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="relative max-w-5xl w-full z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pb-20 px-4">
          
          <div className="glass-panel glass-panel-hover p-8 rounded-xl flex flex-col justify-between h-[200px]">
            <div>
              <div className="text-xl font-bold font-display text-white mb-2">🔒 Privacy Preserving</div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Biometric parameters are quantized and encrypted client-side. Zero raw biometrics leave the user's browser.
              </p>
            </div>
            <div className="text-xs text-[#00F0FF] font-semibold tracking-wider uppercase font-display">Secure Biometrics</div>
          </div>

          <div className="glass-panel glass-panel-hover p-8 rounded-xl flex flex-col justify-between h-[200px]">
            <div>
              <div className="text-xl font-bold font-display text-white mb-2">⚡ Local ZK-Proving</div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Groth16 ZK-SNARK proofs are generated directly in the browser via SnarkJS, avoiding central server verification risks.
              </p>
            </div>
            <div className="text-xs text-[#00F0FF] font-semibold tracking-wider uppercase font-display">Zero Knowledge</div>
          </div>

          <div className="glass-panel glass-panel-hover p-8 rounded-xl flex flex-col justify-between h-[200px]">
            <div>
              <div className="text-xl font-bold font-display text-white mb-2">⛽ Gasless Relayer</div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Secure API-Key headers and Origin Whitelisting allow applications to sponsor verification logs and wallet transactions.
              </p>
            </div>
            <div className="text-xs text-[#00F0FF] font-semibold tracking-wider uppercase font-display">Gasless Experience</div>
          </div>

        </div>

      </div>
    </Layout>
  );
}
