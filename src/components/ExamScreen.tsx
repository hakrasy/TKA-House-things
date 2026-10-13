import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Grid, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle, 
  X,
  FileCheck
} from 'lucide-react';
import { StudentSession, Question } from '../types/exam';
import { QUESTIONS_DATA } from '../data/questionsData';
import { QuestionStimulus } from './QuestionStimulus';
import { QuestionResponder } from './QuestionResponder';

interface ExamScreenProps {
  session: StudentSession;
  currentQuestionIndex: number;
  onSelectQuestion: (index: number) => void;
  onAnswerChange: (questionId: number, answer: any) => void;
  onSubmitExam: () => void;
  onOpenImageModal: (src: string, title: string) => void;
  isSubmitting: boolean;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  session,
  currentQuestionIndex,
  onSelectQuestion,
  onAnswerChange,
  onSubmitExam,
  onOpenImageModal,
  isSubmitting
}) => {
  const [showNavGrid, setShowNavGrid] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const currentQuestion: Question = QUESTIONS_DATA[currentQuestionIndex] || QUESTIONS_DATA[0];
  const currentAnswer = session.answers[currentQuestion.id];

  // Calculate answered count
  const answeredCount = Object.keys(session.answers).filter(k => {
    const val = session.answers[Number(k)];
    if (val === undefined || val === null || val === '') return false;
    if (Array.isArray(val) && val.length === 0) return false;
    if (typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length === 0) return false;
    return true;
  }).length;

  const totalQuestions = QUESTIONS_DATA.length;
  const unansweredCount = totalQuestions - answeredCount;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      onSelectQuestion(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      onSelectQuestion(currentQuestionIndex - 1);
    }
  };

  const isQuestionAnswered = (qId: number): boolean => {
    const val = session.answers[qId];
    if (val === undefined || val === null || val === '') return false;
    if (Array.isArray(val) && val.length === 0) return false;
    if (typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length === 0) return false;
    return true;
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6 space-y-4">
      {/* Quick Progress Strip */}
      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-indigo-100 shadow-xs text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-700">
            Progress Ujian:
          </span>
          <div className="w-32 sm:w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            ></div>
          </div>
          <span className="font-mono font-bold text-indigo-700">
            {answeredCount}/{totalQuestions} Soal
          </span>
        </div>

        <button
          onClick={() => setShowNavGrid(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-bold transition border border-slate-200"
        >
          <Grid className="w-3.5 h-3.5 text-indigo-600" />
          <span>Nomor Soal (1 - 30)</span>
        </button>
      </div>

      {/* Main Dual-Panel Workspace (Stimulus & Question) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 min-h-[560px]">
        {/* Left Column: Stimulus Viewer (6 cols on lg) */}
        <div className="lg:col-span-6 h-[500px] lg:h-auto">
          <QuestionStimulus
            question={currentQuestion}
            onOpenImageModal={onOpenImageModal}
          />
        </div>

        {/* Right Column: Question Responder (6 cols on lg) */}
        <div className="lg:col-span-6 h-auto">
          <QuestionResponder
            question={currentQuestion}
            currentAnswer={currentAnswer}
            onAnswerChange={(newAns) => onAnswerChange(currentQuestion.id, newAns)}
          />
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-3 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 rounded-2xl border border-indigo-100 shadow-lg flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 hidden sm:inline">
            Soal ke-{currentQuestionIndex + 1} dari {totalQuestions}
          </span>
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Selesaikan Ujian</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <span>Selanjutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* QUESTION NAVIGATOR MODAL */}
      {showNavGrid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-800">
                  Daftar Nomor Soal (1 - 30)
                </h3>
                <p className="text-xs text-slate-500">
                  {answeredCount} Terjawab • {unansweredCount} Belum Diisi
                </p>
              </div>
              <button
                onClick={() => setShowNavGrid(false)}
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of 30 Buttons */}
            <div className="grid grid-cols-6 gap-2.5 my-4">
              {QUESTIONS_DATA.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAns = isQuestionAnswered(q.id);

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      onSelectQuestion(idx);
                      setShowNavGrid(false);
                    }}
                    className={`h-11 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center cursor-pointer ${
                      isCurrent
                        ? 'ring-4 ring-indigo-400 bg-indigo-600 text-white shadow-md'
                        : isAns
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <span>{q.id}</span>
                    <span className="text-[9px] font-normal leading-none opacity-80">
                      {q.indicatorCode}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-500"></span>
                <span>Sudah Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300"></span>
                <span>Belum Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-indigo-600"></span>
                <span>Sedang Dibuka</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM SUBMISSION MODAL */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
              <FileCheck className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-800">
                Kumpulkan Lembar Jawaban?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Apakah kamu yakin ingin menyelesaikan ujian sekarang?
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Soal Terjawab:</span>
                <span className="text-emerald-600 font-bold">{answeredCount} dari 30</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Soal Belum Terjawab:</span>
                <span className="text-rose-600 font-bold">{unansweredCount} Soal</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                ⚠️ Masih ada {unansweredCount} soal yang belum kamu jawab. Kamu masih bisa memeriksanya kembali!
              </p>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cek Kembali
              </button>
              <button
                onClick={() => {
                  setShowSubmitConfirm(false);
                  onSubmitExam();
                }}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Mengirimkan...</span>
                ) : (
                  <span>Ya, Kumpulkan Sekarang</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
