/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { StudentSession } from './types/exam';
import { EXAM_METADATA, QUESTIONS_DATA } from './data/questionsData';
import { Navbar } from './components/Navbar';
import { StudentLogin } from './components/StudentLogin';
import { ExamScreen } from './components/ExamScreen';
import { ScoreCard } from './components/ScoreCard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ImageModal } from './components/ImageModal';

export default function App() {
  const [session, setSession] = useState<StudentSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(EXAM_METADATA.durationMinutes * 60);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modals
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [imageModalState, setImageModalState] = useState<{ isOpen: boolean; src: string; title: string }>({
    isOpen: false,
    src: '',
    title: ''
  });

  const saveTimeoutRef = useRef<any>(null);

  // Check for restored session on mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('tka_active_session_id');
    if (savedSessionId) {
      fetchSession(savedSessionId);
    } else {
      setIsLoadingSession(false);
    }
  }, []);

  // Timer countdown while in exam
  useEffect(() => {
    if (!session || session.isCompleted) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time runs out
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });

      // Update timeSpent in session
      setSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          timeSpentSeconds: prev.timeSpentSeconds + 1
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session?.isCompleted, session?.sessionId]);

  const fetchSession = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}`);
      const data = await res.json();
      if (res.ok && data.success && data.session) {
        setSession(data.session);
        setCurrentQuestionIndex(data.session.currentQuestionIndex || 0);
        
        // Calculate remaining time
        const elapsed = data.session.timeSpentSeconds || 0;
        const totalSec = EXAM_METADATA.durationMinutes * 60;
        setTimeRemainingSeconds(Math.max(0, totalSec - elapsed));
      } else {
        localStorage.removeItem('tka_active_session_id');
      }
    } catch (err) {
      console.warn('Error restoring session from server, checking local backup:', err);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const handleStartExam = async (studentName: string) => {
    setIsLoadingSession(true);
    try {
      const res = await fetch('/api/sessions/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName })
      });
      const data = await res.json();
      if (res.ok && data.success && data.session) {
        setSession(data.session);
        localStorage.setItem('tka_active_session_id', data.session.sessionId);
        setCurrentQuestionIndex(0);
        setTimeRemainingSeconds(EXAM_METADATA.durationMinutes * 60);
      } else {
        alert('Gagal memulai ujian: ' + (data.error || 'Server error'));
      }
    } catch (err: any) {
      alert('Koneksi server gagal: ' + err.message);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const handleAnswerChange = (questionId: number, answer: any) => {
    if (!session) return;

    // 1. Update React state immediately
    const updatedAnswers = {
      ...session.answers,
      [questionId]: answer
    };

    const updatedSession = {
      ...session,
      answers: updatedAnswers,
      currentQuestionIndex: questionId - 1
    };

    setSession(updatedSession);

    // 2. LocalStorage backup
    try {
      localStorage.setItem(`tka_answers_${session.sessionId}`, JSON.stringify(updatedAnswers));
    } catch {}

    // 3. Debounced Autosave to Server
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setIsSaving(true);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await fetch('/api/sessions/save-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: session.sessionId,
            questionId,
            answer,
            timeSpentSeconds: session.timeSpentSeconds
          })
        });
      } catch (err) {
        console.warn('Network autosave retry pending:', err);
      } finally {
        setIsSaving(false);
      }
    }, 600);
  };

  const handleSubmitExam = async () => {
    if (!session || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/sessions/finish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.sessionId,
          answers: session.answers,
          timeSpentSeconds: session.timeSpentSeconds
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.session) {
        setSession(data.session);
      } else {
        alert('Gagal mengumpulkan lembar jawaban: ' + (data.error || 'Server error'));
      }
    } catch (err: any) {
      alert('Gagal terhubung ke server saat pengumpulan: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    localStorage.removeItem('tka_active_session_id');
    setSession(null);
    setCurrentQuestionIndex(0);
    setTimeRemainingSeconds(EXAM_METADATA.durationMinutes * 60);
  };

  const handleOpenImageModal = (src: string, title: string) => {
    setImageModalState({ isOpen: true, src, title });
  };

  const handleCloseImageModal = () => {
    setImageModalState({ isOpen: false, src: '', title: '' });
  };

  return (
    <div className="min-h-screen pattern-batik-modern flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Global Top Navbar */}
      <Navbar
        session={session}
        timeRemainingSeconds={timeRemainingSeconds}
        isSaving={isSaving}
        onOpenTeacherPortal={() => setIsTeacherModalOpen(true)}
      />

      {/* Main App Body */}
      <main className="flex-1 flex flex-col">
        {isLoadingSession ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-bold text-slate-600">Memuat Sesi Ujian TKA...</p>
            </div>
          </div>
        ) : !session ? (
          <StudentLogin
            onStartExam={handleStartExam}
            isLoading={isLoadingSession}
            onOpenTeacherPortal={() => setIsTeacherModalOpen(true)}
          />
        ) : session.isCompleted ? (
          <ScoreCard
            session={session}
            onRestart={handleRestart}
            onOpenTeacherPortal={() => setIsTeacherModalOpen(true)}
          />
        ) : (
          <ExamScreen
            session={session}
            currentQuestionIndex={currentQuestionIndex}
            onSelectQuestion={(idx) => setCurrentQuestionIndex(idx)}
            onAnswerChange={handleAnswerChange}
            onSubmitExam={handleSubmitExam}
            onOpenImageModal={handleOpenImageModal}
            isSubmitting={isSubmitting}
          />
        )}
      </main>

      {/* Image Zoom Modal */}
      <ImageModal
        isOpen={imageModalState.isOpen}
        onClose={handleCloseImageModal}
        imageSrc={imageModalState.src}
        title={imageModalState.title}
      />

      {/* Teacher Dashboard Portal Modal */}
      <TeacherDashboard
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
      />
    </div>
  );
}
