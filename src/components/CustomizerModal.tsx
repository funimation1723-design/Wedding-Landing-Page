import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { WeddingConfig } from '../types';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  onSave: (newConfig: WeddingConfig) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<WeddingConfig>({ ...config });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-pink-50 text-stone-400 hover:text-stone-700 transition-colors"
          aria-label="Close customizer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-pink-600 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-roman uppercase tracking-widest">
            Personalize Invitation
          </span>
        </div>

        <h3 className="text-2xl font-serif-luxury font-bold text-stone-900 mb-1">
          Customize Couple Details
        </h3>
        <p className="text-xs font-sans-clean text-stone-500 mb-6">
          Change bride and groom names, date, or venue to preview your dream invitation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-roman uppercase tracking-wider text-stone-700 mb-1">
              Bride's Name
            </label>
            <input
              type="text"
              required
              value={formData.brideName}
              onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-xs font-roman uppercase tracking-wider text-stone-700 mb-1">
              Groom's Name
            </label>
            <input
              type="text"
              required
              value={formData.groomName}
              onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-xs font-roman uppercase tracking-wider text-stone-700 mb-1">
              Wedding Date Text
            </label>
            <input
              type="text"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-xs font-roman uppercase tracking-wider text-stone-700 mb-1">
              Venue Name
            </label>
            <input
              type="text"
              required
              value={formData.venueName}
              onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-stone-200 text-stone-600 text-xs font-serif-luxury uppercase tracking-wider hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-full bg-pink-700 text-white text-xs font-serif-luxury uppercase tracking-wider hover:bg-pink-800 shadow-md flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Save &amp; Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
