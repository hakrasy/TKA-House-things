import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageSrc, title }) => {
  const [scale, setScale] = useState(1);

  if (!isOpen) return null;

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.75));
  const handleReset = () => setScale(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              title="Perkecil Gambar"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition flex items-center gap-1"
              title="Ukuran Normal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {Math.round(scale * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              title="Perbesar Gambar"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 ml-2 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition"
              title="Tutup Gambar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Display Area */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950/40 min-h-[300px]">
          <div
            className="transition-transform duration-200 ease-out origin-center"
            style={{ transform: `scale(${scale})` }}
          >
            <img
              src={imageSrc}
              alt={title}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg select-none"
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-950 text-xs text-slate-400 flex items-center justify-between border-t border-slate-800">
          <span>Gunakan tombol zoom untuk melihat detail perabot, warna, dan posisi ruangan.</span>
          <span className="font-mono text-emerald-400">Mode Layar Penuh Gambar</span>
        </div>
      </div>
    </div>
  );
};
