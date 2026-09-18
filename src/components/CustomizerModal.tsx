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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#8F6875]/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FFF9F5] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8C0D0]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F8EEF2] text-[#8F6875]/60 hover:text-[#8F6875] transition-colors"
          aria-label="Close customizer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#A87888] mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-roman uppercase tracking-widest">
            Personalize Invitation
          </span>
        </div>

        <h3 className="text-2xl font-serif-luxury font-bold text-[#8F6875] mb-1">
          Customize Couple Details
        </h3>
        <p className="text-xs font-sans-clean text-[#8F6875]/80 mb-6">
          Change bride and groom names, date, or venue to preview your dream invitation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-roman uppercase tracking-wider text-[#8F6875] mb-1">
              Bride's Name
            </label>
            <input
              type="text"
              required
              value={formData.brideName}
              onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8C0D0] bg-[#F8EEF2]/50 text-[#8F6875] text-sm focus:outline-none focus:ring-2 focus:ring-[#A87888]/40"
            />
          </div>

          <div>
            <label className="block text-xs font-roman uppercase tracking-wider text-[#8F6875] mb-1">
              Groom's Name
            </label>
            <input
              type="text"
              required
              value={formData.groomName}
              onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8C0D0] bg-[#F8EEF2]/50 text-[#8F6875] text-sm focus:outline-none focus:ring-2 focus:ring-[#A87888]/40"
            />
          </div>

          <div>
            <label className="block text-xs font-roman uppercase tracking-wider text-[#8F6875] mb-1">
              Wedding Date Text
            </label>
            <input
              type="text"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8C0D0] bg-[#F8EEF2]/50 text-[#8F6875] text-sm focus:outline-none focus:ring-2 focus:ring-[#A87888]/40"
            />
          </div>

          <div>
            <label className="block text-xs font-roman uppercase tracking-wider text-[#8F6875] mb-1">
              Venue Name
            </label>
            <input
              type="text"
              required
              value={formData.venueName}
              onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8C0D0] bg-[#F8EEF2]/50 text-[#8F6875] text-sm focus:outline-none focus:ring-2 focus:ring-[#A87888]/40"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-[#D8BFA5] text-[#8F6875] text-xs font-serif-luxury uppercase tracking-wider hover:bg-[#F8EEF2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-full bg-[#A87888] hover:bg-[#8F6875] text-[#FFF9F5] text-xs font-serif-luxury uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5"
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
