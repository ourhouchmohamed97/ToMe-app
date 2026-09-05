import React from 'react';

interface PhotoLightboxProps {
  photoUrl: string | null;
  caption?: string;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photoUrl, caption, onClose }) => {
  if (!photoUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl border border-surface-container-highest flex flex-col"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="relative w-full max-h-[70vh] overflow-hidden bg-primary flex items-center justify-center">
          <img
            src={photoUrl}
            alt={caption || 'Memory Photo'}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        {caption && (
          <div className="p-4 bg-surface-container-lowest">
            <p className="font-headline-sm text-headline-sm italic text-on-surface text-center">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
