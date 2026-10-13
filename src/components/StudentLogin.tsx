import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Home, 
  Layers, 
  ShieldCheck, 
  CheckCircle,
  MapPin
} from 'lucide-react';
import { EXAM_METADATA } from '../data/questionsData';

interface StudentLoginProps {
  onStartExam: (studentName: string) => Promise<void>;
  isLoading: boolean;
  onOpenTeacherPortal: () => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({
  onStartExam,
  isLoading,
  onOpenTeacherPortal
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Silakan masukkan nama kamu terlebih dahulu!');
      return;
    }
    setError('');
    await onStartExam(name.trim());
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Card: Welcome & Single Name Form */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-100 relative overflow-hidden">
          {/* Cultural Pattern Corner Accent */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-amber-400/20 via-pink-400/20 to-purple-500/20 rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Mode TKA Asesmen Nasional
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-700" />
              Poso, Sulawesi Tengah
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">
            Asesmen Akademik Bahasa Inggris
          </h1>
          <p className="text-sm font-semibold text-indigo-600 mt-1 mb-3 flex items-center gap-1.5">
            <Home className="w-4 h-4" />
            Topik: House Things & Rooms in a House (Kelas 7 SMP)
          </p>

          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Selamat datang di simulasi ujian TKA kontekstual rumah keluarga di Poso, Sulawesi Tengah! Cukup masukkan namamu untuk memulai pengerjaan 30 soal (Literasi, Numerasi, dan Tata Bahasa).
          </p>

          {/* Form - Only Student Name */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="studentName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nama Lengkap Siswa <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="studentName"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Ketik nama lengkapmu di sini (contoh: Ryan Pratama)"
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-800 font-medium text-sm transition placeholder:text-slate-400 bg-slate-50/50 hover:bg-white"
                  autoFocus
                  required
                />
              </div>
              {error && (
                <p className="text-xs font-medium text-rose-600 mt-1.5 flex items-center gap-1">
                  ⚠️ {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-extrabold text-base tracking-wide shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Menyiapkan Lembar Soal...</span>
                </>
              ) : (
                <>
                  <span>Mulai Ujian Sekarang</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Quick info note */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Tersimpan otomatis ke database
            </span>
            <button
              onClick={onOpenTeacherPortal}
              className="text-indigo-600 hover:text-indigo-800 font-bold underline flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Akses Guru
            </button>
          </div>
        </div>

        {/* Right Card: Context & Specifications */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Konteks & Struktur Soal */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-md border border-slate-200/80">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-purple-600" />
              Struktur Soal Sederhana (30 Butir)
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 font-medium">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                <span className="font-bold text-indigo-900">20 Soal Literasi & Numerasi</span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-bold text-[10px]">
                  Rumah Pak Dani di Poso
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
                <span className="font-bold text-purple-900">10 Soal Tata Bahasa (Grammar)</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white font-bold text-[10px]">
                  There is/are, Quantifiers, Preposition
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Kalimat soal & pilihan jawaban disederhanakan untuk Kelas 7 SMP.
              </p>
              <p className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Panjang pilihan jawaban dibuat setara agar adil dan mengecoh.
              </p>
            </div>
          </div>

          {/* Card 2: Konteks Lokal Poso */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white rounded-3xl p-6 shadow-xl border border-indigo-800/50">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Konteks Simulasi: Poso, Sulawesi Tengah
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Teks dan denah menggambarkan rumah keluarga Pak Dani di Poso, Sulawesi Tengah, dengan suasana sejuk dekat Danau Poso, perabot kayu lokal, dan kebiasaan sehari-hari siswa SMP di Poso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
