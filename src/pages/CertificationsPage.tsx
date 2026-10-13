import React from 'react';
import CertificationCard from '../components/cards/CertificationCard';
import { certificationsData } from '../data/certifications';
import { useDocumentTitle } from '../utils/seo';

export default function CertificationsPage() {
  useDocumentTitle('Certifications', 'Verified technical credentials and certifications of Ayushman Srivastava.');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase block">
          CREDENTIALS // SPECIALIZED COURSES
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-text-primary tracking-tight">
          Verified Certifications
        </h1>
        <p className="text-text-secondary text-base max-w-2xl font-sans">
          Accredited coursework from the Indian Space Research Organisation (ISRO), NPTEL, Autodesk training partners, and aerospace organizations.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsData.map((cert) => (
          <CertificationCard key={cert.id} certification={cert} />
        ))}
      </div>

    </div>
  );
}
