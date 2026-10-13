import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  RotateCcw, 
  Award, 
  BookOpen, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { StudentSession } from '../types/exam';
import { QUESTIONS_DATA, EXAM_METADATA } from '../data/questionsData';

interface ScoreCardProps {
  session: StudentSession;
  onRestart: () => void;
  onOpenTeacherPortal: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  session,
  onRestart,
  onOpenTeacherPortal
}) => {
  const [showFullReview, setShowFullReview] = useState(true);
  const score = session.score ?? 0;
  const isPassed = score >= EXAM_METADATA.passingScore;

  useEffect(() => {
    // Launch festive confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const minutes = Math.floor(session.timeSpentSeconds / 60);
  const seconds = session.timeSpentSeconds % 60;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-6 sm:p-8 shadow-2xl border border-indigo-700/50">
        {/* Cultural Pattern Background Accent */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-pink-500/20 via-amber-400/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Score Card Resmi TKA SMP
              </span>
              <span className="text-xs text-slate-300 font-medium">
                ID: {session.sessionId}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Hasil Asesmen: {session.studentName}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-4">
              <span>Wilayah: <strong>Poso, Sulawesi Tengah</strong></span>
              <span>Durasi Pengerjaan: <strong>{minutes}m {seconds}s</strong></span>
            </p>
          </div>

          {/* Big Score Badge */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-white/20 self-start md:self-auto shrink-0">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-black shadow-lg ${
              isPassed 
                ? 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-emerald-500/30' 
                : 'bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-orange-500/30'
            }`}>
              {score}
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block">
                Skor Akhir (0-100)
              </span>
              <span className={`text-base sm:text-lg font-black block ${
                isPassed ? 'text-emerald-300' : 'text-amber-300'
              }`}>
                {isPassed ? 'TUNTAS KKM (>= 75)' : 'PERLU REMEDIAL (< 75)'}
              </span>
              <span className="text-xs text-slate-400">
                Benar {session.correctCount} dari {session.totalQuestions} Soal
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons bar */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center gap-2 border border-white/20 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan Hasil PDF</span>
            </button>
            <button
              onClick={() => setShowFullReview(!showFullReview)}
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>{showFullReview ? 'Sembunyikan Kunci Soal' : 'Review 30 Butir Soal & Pembahasan'}</span>
              {showFullReview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            onClick={onRestart}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-extrabold transition flex items-center gap-2 shadow-md cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Ujian Baru</span>
          </button>
        </div>
      </div>

      {/* Grid: Domain Breakdown & Diagnosis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Literasi Teks */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-indigo-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              Literasi Teks
            </span>
            <span className="text-lg font-black text-slate-800">
              {session.categoryScores?.literacy.percentage ?? 0}%
            </span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-700"
              style={{ width: `${session.categoryScores?.literacy.percentage ?? 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Menganalisis teks deskriptif, nama perabot, dan ruangan di rumah.
          </p>
        </div>

        {/* Card 2: Numerasi Spasial */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-indigo-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600">
              Numerasi Spasial
            </span>
            <span className="text-lg font-black text-slate-800">
              {session.categoryScores?.numeracy.percentage ?? 0}%
            </span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-700"
              style={{ width: `${session.categoryScores?.numeracy.percentage ?? 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Membaca denah arsitektur, menghitung jumlah perabot, dan kapasitas.
          </p>
        </div>

        {/* Card 3: Grammar Mastery */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-indigo-100 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-purple-600">
              Tata Bahasa (Grammar)
            </span>
            <span className="text-lg font-black text-slate-800">
              {session.categoryScores?.grammar.percentage ?? 0}%
            </span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-700"
              style={{ width: `${session.categoryScores?.grammar.percentage ?? 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            There is/are, Quantifiers (many/much/some/any), dan Prepositions of place.
          </p>
        </div>
      </div>

      {/* Indikator Pembelajaran Detail Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-indigo-100 space-y-4">
        <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          Capaian Indikator Pembelajaran TKA
        </h3>

        <div className="space-y-3">
          {session.indicatorScores && Object.entries(session.indicatorScores).map(([code, ind]) => (
            <div key={code} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-black">
                    {code}
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {ind.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="w-24 sm:w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${ind.percentage >= 75 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${ind.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs font-black font-mono text-slate-800 w-12 text-right">
                  {ind.correct}/{ind.total} ({ind.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnosis & Rekomendasi Belajar */}
      {session.analysisFeedback && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-6 space-y-3">
            <h4 className="text-sm font-black text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Kekuatan yang Sudah Dikuasai:
            </h4>
            <ul className="space-y-2 text-xs text-emerald-950 font-medium">
              {session.analysisFeedback.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">★</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-3">
            <h4 className="text-sm font-black text-amber-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Area yang Perlu Ditingkatkan:
            </h4>
            <ul className="space-y-2 text-xs text-amber-950 font-medium">
              {session.analysisFeedback.areasToImprove.map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">→</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Detailed Review Section for All 30 Questions */}
      {showFullReview && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-100 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Review Kunci Jawaban Lengkap (30 Soal)
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Pelajari kunci jawaban dan penjelasan guru untuk memperdalam pemahaman materi.
              </p>
            </div>
            <button
              onClick={() => setShowFullReview(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
            >
              Tutup Review
            </button>
          </div>

          <div className="space-y-4">
            {QUESTIONS_DATA.map((q) => {
              const studentAns = session.answers[q.id];
              let isCorrect = false;

              if (q.type === 'single_choice') {
                isCorrect = typeof studentAns === 'string' && studentAns.toUpperCase() === q.correctAnswer?.toUpperCase();
              } else if (q.type === 'complex_choice') {
                const selected = Array.isArray(studentAns) ? studentAns : [];
                const correctIds = q.complexOptions?.filter(o => o.isCorrect).map(o => o.id) || [];
                const incorrectIds = q.complexOptions?.filter(o => !o.isCorrect).map(o => o.id) || [];
                isCorrect = correctIds.every(id => selected.includes(id)) && !selected.some(id => incorrectIds.includes(id)) && selected.length === correctIds.length;
              } else if (q.type === 'true_false') {
                if (studentAns && typeof studentAns === 'object') {
                  isCorrect = (q.tfStatements || []).every(s => studentAns[s.id] === s.isTrue);
                }
              } else if (q.type === 'matching') {
                if (studentAns && typeof studentAns === 'object') {
                  isCorrect = (q.matchingPairs || []).every(p => studentAns[p.id] === p.right);
                }
              }

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-rose-200 bg-rose-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center text-white ${
                        isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}>
                        {q.id}
                      </span>
                      <span className="text-xs font-bold text-slate-800">
                        {q.questionPrompt}
                      </span>
                    </div>

                    <span className={`text-[11px] font-black px-2.5 py-1 rounded-full shrink-0 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? 'Benar ✓' : 'Salah ✗'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 my-2 text-xs">
                    <span className="font-semibold text-slate-600">Jawaban Kamu:</span>
                    <span className={`px-2 py-0.5 rounded-md font-bold ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {q.type === 'single_choice' ? (studentAns ? `Pilihan ${studentAns}` : 'Belum dijawab') :
                       q.type === 'complex_choice' ? (Array.isArray(studentAns) && studentAns.length > 0 ? `${studentAns.length} opsi dipilih` : 'Belum dijawab') :
                       (studentAns ? 'Sudah diisi' : 'Belum dijawab')}
                    </span>
                    {q.type === 'single_choice' && (
                      <span className="text-slate-500 font-medium">
                        • Kunci Benar: <strong>Pilihan {q.correctAnswer}</strong>
                      </span>
                    )}
                  </div>

                  {/* Explanation box */}
                  <div className="mt-2.5 p-3 rounded-xl bg-white/90 border border-slate-200/70 text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-indigo-900">
                      💡 Pembahasan & Kunci Jawaban:
                    </p>
                    <p>{q.explanation.summary}</p>
                    <p className="text-slate-600">{q.explanation.details}</p>
                    {q.explanation.vocabularyTip && (
                      <p className="text-indigo-600 font-semibold pt-1">
                        Tips Kosakata: {q.explanation.vocabularyTip}
                      </p>
                    )}
                    {q.explanation.ruleSummary && (
                      <p className="text-purple-600 font-semibold pt-1">
                        Aturan Tata Bahasa: {q.explanation.ruleSummary}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
