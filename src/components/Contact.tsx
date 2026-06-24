import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Phone, FileText, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

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
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.section 
      id="contact" 
      className="scroll-mt-24 py-24 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.04)_0%,transparent_70%)] pointer-events-none -z-10"></div>
      
      <p className="text-cyan-400 font-mono text-center mb-2">07. Contact</p>
      <h2 className="text-3xl md:text-5xl font-display font-bold text-center text-slate-100 mb-4">Get In Touch</h2>
      <p className="text-slate-400 leading-relaxed text-center max-w-lg mx-auto mb-16 font-sans text-base">
        I'm currently looking for new opportunities and internships in aerospace engineering, IoT, and simulation. Whether you have a question or just want to say hi, feel free to reach out!
      </p>
      
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left items-start">
        {/* Contact Links Column */}
        <div className="flex flex-col gap-4">
          <a 
            href="mailto:ayushmansrivastava2506@gmail.com" 
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-cyan-400/30 transition-all select-all"
          >
            <div className="text-cyan-400 p-2 bg-cyan-400/5 rounded">
              <Mail size={18} />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">Email</span>
              <span className="text-sm font-sans text-slate-300">ayushmansrivastava2506@gmail.com</span>
            </div>
          </a>

          <a 
            href="https://www.linkedin.com/in/ayushmansrivastavaofficial/" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-cyan-400/30 transition-all"
          >
            <div className="text-cyan-400 p-2 bg-cyan-400/5 rounded">
              <Linkedin size={18} />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">LinkedIn</span>
              <span className="text-sm font-sans text-slate-300">ayushmansrivastavaofficial</span>
            </div>
          </a>

          <a 
            href="tel:+919473512071" 
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-cyan-400/30 transition-all select-all"
          >
            <div className="text-cyan-400 p-2 bg-cyan-400/5 rounded">
              <Phone size={18} />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">Phone</span>
              <span className="text-sm font-sans text-slate-300">+91 94735 12071</span>
            </div>
          </a>

          <a 
            href="/resume/Ayushmanresume.pdf" 
            download
            target="_blank"
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:border-cyan-400/30 transition-all"
          >
            <div className="text-cyan-400 p-2 bg-cyan-400/5 rounded">
              <FileText size={18} />
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500">Resume</span>
              <span className="text-sm font-sans text-slate-300">Download PDF Document</span>
            </div>
          </a>
        </div>

        {/* Formspree Submission Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-slate-900/50 p-8 rounded-xl border border-slate-800 relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"></div>
          
          <div>
            <input 
              type="text" 
              placeholder="Your name" 
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full bg-slate-950/80 border border-slate-850 focus:border-cyan-400/50 rounded-lg p-3 text-slate-200 text-sm font-sans placeholder-slate-600 outline-none transition-colors"
            />
          </div>
          <div>
            <input 
              type="email" 
              placeholder="Your email" 
              required
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full bg-slate-950/80 border border-slate-850 focus:border-cyan-400/50 rounded-lg p-3 text-slate-200 text-sm font-sans placeholder-slate-600 outline-none transition-colors"
            />
          </div>
          <div>
            <textarea 
              placeholder="Your message..." 
              required
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="w-full bg-slate-950/80 border border-slate-850 focus:border-cyan-400/50 rounded-lg p-3 text-slate-200 text-sm font-sans placeholder-slate-600 outline-none transition-colors resize-none"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="w-full bg-cyan-400 text-slate-950 rounded-lg p-3 text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
          >
            {status === 'sending' ? (
              <span>Transmitting...</span>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={12} />
              </>
            )}
          </button>

          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono rounded flex items-center gap-2"
            >
              <CheckCircle size={14} />
              <span>Message transmitted successfully!</span>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded"
            >
              Transmission failed. Please dispatch directly via email.
            </motion.div>
          )}
        </form>
      </div>
    </motion.section>
  );
}
