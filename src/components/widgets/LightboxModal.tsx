import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectImage } from '../../types';
import SoundManager from '../../utils/audio';

interface LightboxModalProps {
  images: ProjectImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext
}: LightboxModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Engineering Image Preview"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={() => {
          SoundManager.playClick();
          onClose();
        }}
        aria-label="Close image gallery"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-surface border border-border text-text-primary hover:text-primary transition-colors cursor-pointer"
      >
        <X size={20} />
      </button>

      {/* Prev Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={() => {
            SoundManager.playClick();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-surface/80 border border-border text-text-primary hover:text-primary transition-colors cursor-pointer"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={() => {
            SoundManager.playClick();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-surface/80 border border-border text-text-primary hover:text-primary transition-colors cursor-pointer"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Main Image Container */}
      <div className="max-w-5xl max-h-[90vh] flex flex-col items-center justify-center relative">
        <div className="max-h-[75vh] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl flex items-center justify-center">
          <img
            src={currentImg.src}
            alt={currentImg.alt}
            className="max-h-[75vh] w-auto object-contain select-none"
            onError={(e) => {
              if (currentImg.placeholder) {
                e.currentTarget.src = currentImg.placeholder;
              }
            }}
          />
        </div>

        {/* Caption */}
        <div className="mt-3 text-center max-w-2xl px-4 font-mono">
          <div className="text-sm font-bold text-text-primary mb-1">
            {currentImg.title} ({currentIndex + 1} of {images.length})
          </div>
          {currentImg.caption && (
            <p className="text-xs text-text-secondary font-sans leading-relaxed">
              {currentImg.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
