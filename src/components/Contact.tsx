import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Phone, FileText, Send, CheckCircle, ArrowUpRight } from 'lucide-react';
import SoundManager from '../utils/audio';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    SoundManager.playClick();

    try {
      const res = await fetch('https://formspree.io/f/mzzayjgp', {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        setStatus('success');
        SoundManager.playFlyby();
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        SoundManager.playWarning();
      }
    } catch {
      setStatus('error');
      SoundManager.playWarning();
    }
  };

  return (
    <motion.section 
      id="contact" 
      className="scroll-mt-24 py-12 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
          07. Contact
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-3 mb-3">
          Let's Connect & Collaborate
        </h2>
        <p className="text-slate-600 leading-relaxed font-sans text-sm md:text-base">
          Actively seeking engineering roles, internships, and research collaborations in <span className="text-sky-600 font-semibold">Aerodynamics, CFD Analysis, Aircraft Structures, and UAV Flight Dynamics</span>.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
        {/* Contact Quick Cards (Left) */}
        <div className="flex flex-col gap-3.5">
          <a 
            href="mailto:ayushmansrivastava2506@gmail.com" 
            onClick={() => SoundManager.playClick()}
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
                <Mail size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-mono text-slate-500 font-semibold">EMAIL</span>
                <span className="text-sm font-medium text-slate-800">ayushmansrivastava2506@gmail.com</span>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
          </a>

          <a 
            href="https://www.linkedin.com/in/ayushmansrivastavaofficial/" 
            target="_blank"
            rel="noreferrer"
            onClick={() => SoundManager.playClick()}
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                <Linkedin size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-mono text-slate-500 font-semibold">LINKEDIN</span>
                <span className="text-sm font-medium text-slate-800">ayushmansrivastavaofficial</span>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
          </a>

          <a 
            href="tel:+919473512071" 
            onClick={() => SoundManager.playClick()}
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                <Phone size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-mono text-slate-500 font-semibold">PHONE</span>
                <span className="text-sm font-medium text-slate-800">+91 94735 12071</span>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </a>

          <a 
            href="/resume/Ayushmanresume.pdf" 
            download
            target="_blank"
            onClick={() => SoundManager.playFlyby()}
            className="flex items-center justify-between p-4 rounded-2xl border border-sky-200 bg-sky-50/50 hover:bg-sky-50 hover:border-sky-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <FileText size={18} />
              </div>
              <div>
                <span className="block text-[11px] font-mono text-sky-700 font-semibold">CURRICULUM VITAE</span>
                <span className="text-sm font-medium text-slate-900 font-semibold">Download Full Resume (PDF)</span>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-sky-600" />
          </a>
        </div>

        {/* Message Form (Right) */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
          <h3 className="font-display font-bold text-slate-900 text-lg mb-4">
            Send a Direct Dispatch
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                YOUR NAME
              </label>
              <input 
                type="text" 
                id="name" 
                required
                value={formState.name}
                onChange={e => setFormState({ ...formState, name: e.target.value })}
                placeholder="e.g. Dr. Vikram Sarabhai" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-sans"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                EMAIL ADDRESS
              </label>
              <input 
                type="email" 
                id="email" 
                required
                value={formState.email}
                onChange={e => setFormState({ ...formState, email: e.target.value })}
                placeholder="name@aerospace.org" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-sans"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-xs font-mono font-semibold text-slate-700 mb-1.5">
                MESSAGE / INQUIRY
              </label>
              <textarea 
                id="message" 
                rows={4} 
                required
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
                placeholder="Discussing an aerodynamic CFD project or aeronautical fellowship..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all font-sans resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium text-sm transition-all shadow-xs hover:shadow-md disabled:opacity-50 cursor-pointer active:scale-98"
            >
              {status === 'sending' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Transmitting...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle size={16} className="text-emerald-300" />
                  <span>Dispatch Received!</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Send Message</span>
                </>
              )}
            </button>
            
            {status === 'error' && (
              <p className="text-xs text-rose-600 font-mono text-center">
                Transmission failed. Please reach out via email directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </motion.section>
  );
}
