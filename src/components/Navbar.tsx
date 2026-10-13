import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  Clock, 
  CheckCircle2, 
  User, 
  ShieldCheck, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { StudentSession } from '../types/exam';

interface NavbarProps {
  session: StudentSession | null;
  timeRemainingSeconds: number;
  isSaving: boolean;
  onOpenTeacherPortal: () => void;
  onOpenGuidelines?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  session,
  timeRemainingSeconds,
  isSaving,
  onOpenTeacherPortal,
  onOpenGuidelines
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const isTimeLow = timeRemainingSeconds <= 300 && timeRemainingSeconds > 0; // <= 5 minutes

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-sm">
      {/* Decorative Cultural Colorful Top Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-400 via-emerald-400 via-blue-500 to-purple-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Subject Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tight text-slate-800 hidden xs:inline">
                TKA BAHASA INGGRIS
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
                KELAS 7 SMP
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium truncate max-w-[170px] sm:max-w-xs">
              Topic: House Things & Rooms in a House
            </p>
          </div>
        </div>

        {/* Center: Live Timer & Sync Status (when in exam) */}
        {session && !session.isCompleted && (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs sm:text-sm font-mono font-bold transition-all ${
              isTimeLow 
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse' 
                : 'bg-indigo-50 text-indigo-800 border-indigo-200'
            }`}>
              <Clock className={`w-4 h-4 ${isTimeLow ? 'text-rose-600' : 'text-indigo-600'}`} />
              <span>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>

            {/* Sync Cloud Indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
              {isSaving ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  <span className="text-amber-700">Menyimpan...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tersimpan</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {session ? (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                {session.studentName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left text-xs leading-tight">
                <span className="font-bold text-slate-800 block max-w-[110px] truncate">
                  {session.studentName}
                </span>
                <span className="text-slate-500 text-[10px]">
                  Peserta Ujian
                </span>
              </div>
            </div>
          ) : null}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 shadow-sm transition hover:border-slate-300"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh (Fullscreen)'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4 text-indigo-600" />
                <span className="hidden lg:inline">Perkecil</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-indigo-600" />
                <span className="hidden lg:inline">Fullscreen</span>
              </>
            )}
          </button>

          {/* Teacher Portal Button */}
          <button
            onClick={onOpenTeacherPortal}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition hover:shadow"
            title="Dashboard Khusus Guru"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Portal Guru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
