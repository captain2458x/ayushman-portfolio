import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Linkedin, Phone, Send, CheckCircle2, AlertCircle, Compass, FileText } from 'lucide-react';
import { profileData } from '../data/profile';
import { useDocumentTitle } from '../utils/seo';
import SoundManager from '../utils/audio';

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters long'),
  message: z.string().min(10, 'Message must be at least 10 characters long')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  useDocumentTitle('Contact', 'Initiate engineering contact and inquiries with Ayushman Srivastava.');

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    SoundManager.playClick();
    setSubmitStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mzzayjgp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        SoundManager.playSuccess();
        setSubmitStatus('success');
        reset();
      } else {
        SoundManager.playWarning();
        setSubmitStatus('error');
        setErrorMessage('Message transmission failed. Please email directly.');
      }
    } catch (err) {
      SoundManager.playWarning();
      setSubmitStatus('error');
      setErrorMessage('Network error occurred. Please contact via direct email.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase block">
          TRANSMISSION // INQUIRIES & COLLABORATION
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-text-primary tracking-tight">
          Initiate Contact
        </h1>
        <p className="text-text-secondary text-base max-w-2xl font-sans">
          Whether you have an internship opportunity, a research query in computational fluid dynamics, or want to discuss a space technology project, reach out below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Links & Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border technical-corner shadow-xl space-y-6">
            <h3 className="font-display font-bold text-lg text-text-primary border-b border-border pb-3">
              Direct Communication Channels
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-elevated border border-border hover:border-primary/50 text-text-primary hover:text-primary transition-all select-all"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail size={16} />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-text-secondary uppercase block">Email Address</span>
                  <strong className="truncate block font-mono text-xs">{profileData.email}</strong>
                </div>
              </a>

              <a
                href={`tel:${profileData.phone}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-elevated border border-border hover:border-primary/50 text-text-primary hover:text-primary transition-all select-all"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary uppercase block">Telephone</span>
                  <strong className="font-mono text-xs">{profileData.phone}</strong>
                </div>
              </a>

              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-elevated border border-border hover:border-primary/50 text-text-primary hover:text-primary transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Linkedin size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary uppercase block">Professional Network</span>
                  <strong className="font-mono text-xs">linkedin.com/in/ayushmansrivastavaofficial</strong>
                </div>
              </a>

              <a
                href={profileData.resumeUrl}
                download="Ayushman_Srivastava_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-elevated border border-border hover:border-primary/50 text-text-primary hover:text-primary transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileText size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-text-secondary uppercase block">Curriculum Vitae</span>
                  <strong className="font-mono text-xs">Download Resume (PDF)</strong>
                </div>
              </a>
            </div>

            {/* Institutional Coordinates */}
            <div className="pt-4 border-t border-border space-y-2 font-mono text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-primary" />
                <span className="text-text-primary font-semibold">Location & Base:</span>
              </div>
              <p className="pl-6 text-[11px] leading-relaxed">
                {profileData.institution}<br />
                Rae Bareli, Uttar Pradesh, India (26.22° N, 81.24° E)
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Validated Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 sm:p-8 rounded-2xl bg-surface border border-border technical-corner shadow-xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display font-bold text-lg text-text-primary">
                Direct Telemetry Transmission
              </h3>
              <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                SSL_ENCRYPTED
              </span>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5 font-mono">
              <label htmlFor="fullName" className="text-xs text-text-secondary uppercase block">
                Your Full Name <span className="text-primary">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. Dr. Jane Doe"
                {...register('fullName')}
                className="w-full bg-surface-elevated border border-border focus:border-primary/60 rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none transition-colors font-sans"
              />
              {errors.fullName && (
                <span className="text-xs text-warning flex items-center gap-1 mt-1">
                  <AlertCircle size={12} />
                  <span>{errors.fullName.message}</span>
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5 font-mono">
              <label htmlFor="email" className="text-xs text-text-secondary uppercase block">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="e.g. name@institution.org"
                {...register('email')}
                className="w-full bg-surface-elevated border border-border focus:border-primary/60 rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none transition-colors font-sans"
              />
              {errors.email && (
                <span className="text-xs text-warning flex items-center gap-1 mt-1">
                  <AlertCircle size={12} />
                  <span>{errors.email.message}</span>
                </span>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-1.5 font-mono">
              <label htmlFor="subject" className="text-xs text-text-secondary uppercase block">
                Inquiry Subject <span className="text-primary">*</span>
              </label>
              <input
                id="subject"
                type="text"
                placeholder="e.g. Aerodynamics Internship Inquiry / Research Discussion"
                {...register('subject')}
                className="w-full bg-surface-elevated border border-border focus:border-primary/60 rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none transition-colors font-sans"
              />
              {errors.subject && (
                <span className="text-xs text-warning flex items-center gap-1 mt-1">
                  <AlertCircle size={12} />
                  <span>{errors.subject.message}</span>
                </span>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5 font-mono">
              <label htmlFor="message" className="text-xs text-text-secondary uppercase block">
                Message Content <span className="text-primary">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message, project scope, or opportunity details..."
                {...register('message')}
                className="w-full bg-surface-elevated border border-border focus:border-primary/60 rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none transition-colors font-sans resize-none"
              />
              {errors.message && (
                <span className="text-xs text-warning flex items-center gap-1 mt-1">
                  <AlertCircle size={12} />
                  <span>{errors.message.message}</span>
                </span>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitStatus === 'sending'}
                className="w-full py-3.5 rounded-xl bg-primary text-background font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20"
              >
                {submitStatus === 'sending' ? (
                  <span>Transmitting Telemetry...</span>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </div>

            {/* Status Feedback */}
            {submitStatus === 'success' && (
              <div className="p-4 rounded-xl bg-success/10 border border-success/30 text-success font-mono text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 size={16} />
                <span>Message transmitted successfully! I will respond promptly.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 rounded-xl bg-warning/10 border border-warning/30 text-warning font-mono text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle size={16} />
                <span>{errorMessage || 'Transmission failed. Please dispatch via direct email.'}</span>
              </div>
            )}

          </form>
        </div>

      </div>

    </div>
  );
}
