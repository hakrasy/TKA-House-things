import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Users, 
  Award, 
  TrendingUp, 
  Download, 
  Trash2, 
  RefreshCw, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  X, 
  BarChart2, 
  FileSpreadsheet, 
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { StudentSession } from '../types/exam';
import { QUESTIONS_DATA, EXAM_METADATA } from '../data/questionsData';

interface TeacherDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AnalyticsData {
  totalStudents: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  passCount: number;
  passRate: number;
  itemAnalysis: Array<{
    id: number;
    category: string;
    indicatorCode: string;
    correctCount: number;
    totalCount: number;
    percentage: number;
    difficulty: string;
  }>;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('tka_teacher_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [submissions, setSubmissions] = useState<StudentSession[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState<'submissions' | 'item_analysis'>('submissions');
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PASS' | 'REMEDIAL'>('ALL');

  // Student Detail Modal
  const [inspectedStudent, setInspectedStudent] = useState<StudentSession | null>(null);

  // Clear confirmation
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (token && isOpen) {
      fetchTeacherData();
    }
  }, [token, isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;

    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/teacher/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        sessionStorage.setItem('tka_teacher_token', data.token);
        setToken(data.token);
        setPasswordInput('');
      } else {
        setLoginError(data.error || 'Password salah. Akses ditolak.');
      }
    } catch (err: any) {
      setLoginError('Koneksi ke server gagal: ' + err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tka_teacher_token');
    setToken(null);
    setSubmissions([]);
    setAnalytics(null);
  };

  const fetchTeacherData = async () => {
    if (!token) return;
    setIsLoadingData(true);
    try {
      const res = await fetch('/api/teacher/submissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.submissions || []);
        setAnalytics(data.analytics || null);
      }
    } catch (err) {
      console.error('Error fetching teacher data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleDeleteSubmission = async (sessionId: string) => {
    if (!confirm(`Hapus data ujian sesi ${sessionId}?`)) return;
    try {
      const res = await fetch(`/api/teacher/submissions/${sessionId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchTeacherData();
      }
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const handleClearAll = async () => {
    try {
      const res = await fetch('/api/teacher/submissions/clear', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setShowClearConfirm(false);
        fetchTeacherData();
      }
    } catch (err) {
      console.error('Error clearing:', err);
    }
  };

  const handleExportCSV = () => {
    if (!token) return;
    window.location.href = `/api/teacher/export-csv?token=${encodeURIComponent(token)}`;
  };

  if (!isOpen) return null;

  // Filter submissions
  const filteredSubmissions = submissions.filter((s) => {
    const matchName = s.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const isPass = (s.score ?? 0) >= EXAM_METADATA.passingScore;
    const matchStatus = 
      statusFilter === 'ALL' ||
      (statusFilter === 'PASS' && isPass) ||
      (statusFilter === 'REMEDIAL' && !isPass);

    return matchName && matchStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                Portal Guru & Analisis Hasil TKA
              </h2>
              <p className="text-xs text-slate-400">
                Pelajaran Bahasa Inggris Kelas 7 SMP • Database Ujian Permanen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition"
              >
                Logout Guru
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="Tutup Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CONTENT: If not logged in -> Login Screen */}
        {!token ? (
          <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
            <div className="w-full max-w-md bg-slate-950/80 border border-slate-800 rounded-3xl p-8 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">Autentikasi Pengajar</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Masukkan password guru resmi untuk mengakses database nilai dan analisis butir soal.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="text-left">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Password Guru
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    placeholder="Masukkan password guru"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    autoFocus
                  />
                  {loginError && (
                    <p className="text-xs font-medium text-rose-400 mt-1.5">
                      ⚠️ {loginError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn || !passwordInput}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoggingIn ? (
                    <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
                  ) : (
                    <span>Buka Dashboard Guru</span>
                  )}
                </button>
              </form>

              <p className="text-[11px] text-slate-500">
                🔒 Autentikasi diproses secara aman di backend.
              </p>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD CONTENT */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* KPI Analytics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Siswa Ujian
                </span>
                <span className="text-2xl font-black text-white mt-1 block">
                  {analytics?.totalStudents ?? 0}
                </span>
                <span className="text-[10px] text-slate-500">Tersimpan di database</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">
                  Rata-rata Nilai
                </span>
                <span className="text-2xl font-black text-indigo-300 mt-1 block">
                  {analytics?.averageScore ?? 0}
                </span>
                <span className="text-[10px] text-slate-500">Skala 0 - 100</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Nilai Tertinggi
                </span>
                <span className="text-2xl font-black text-emerald-300 mt-1 block">
                  {analytics?.highestScore ?? 0}
                </span>
                <span className="text-[10px] text-slate-500">Nilai puncak kelas</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  Nilai Terendah
                </span>
                <span className="text-2xl font-black text-amber-300 mt-1 block">
                  {analytics?.lowestScore ?? 0}
                </span>
                <span className="text-[10px] text-slate-500">Perlu bimbingan</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 col-span-2 lg:col-span-1">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">
                  Tuntas KKM (75)
                </span>
                <span className="text-2xl font-black text-purple-300 mt-1 block">
                  {analytics?.passRate ?? 0}%
                </span>
                <span className="text-[10px] text-slate-500">
                  {analytics?.passCount ?? 0} siswa tuntas
                </span>
              </div>
            </div>

            {/* Navigation Tabs & Actions Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    activeTab === 'submissions'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Rekap Nilai Siswa ({filteredSubmissions.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('item_analysis')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    activeTab === 'item_analysis'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>Analisis Butir Soal (30 Soal)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchTeacherData}
                  disabled={isLoadingData}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset Sesi</span>
                </button>
              </div>
            </div>

            {/* TAB 1: REKAP NILAI SISWA */}
            {activeTab === 'submissions' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8 relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama siswa..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder:text-slate-500 outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs outline-none"
                    >
                      <option value="ALL">Semua Status Ketuntasan</option>
                      <option value="PASS">Tuntas KKM (&gt;= 75)</option>
                      <option value="REMEDIAL">Perlu Remedial (&lt; 75)</option>
                    </select>
                  </div>
                </div>

                {/* Submissions Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 border-b border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="px-4 py-3">Nama Siswa</th>
                        <th className="px-3 py-3 text-center">Skor Akhir</th>
                        <th className="px-3 py-3 text-center">Status</th>
                        <th className="px-3 py-3 text-center">Literasi</th>
                        <th className="px-3 py-3 text-center">Numerasi</th>
                        <th className="px-3 py-3 text-center">Grammar</th>
                        <th className="px-3 py-3">Durasi</th>
                        <th className="px-4 py-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredSubmissions.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                            Belum ada riwayat siswa yang cocok dengan filter.
                          </td>
                        </tr>
                      ) : (
                        filteredSubmissions.map((sub) => {
                          const isPass = (sub.score ?? 0) >= EXAM_METADATA.passingScore;
                          const durMin = Math.floor(sub.timeSpentSeconds / 60);
                          const durSec = sub.timeSpentSeconds % 60;

                          return (
                            <tr key={sub.sessionId} className="hover:bg-slate-900/50 transition">
                              <td className="px-4 py-3 font-bold text-white whitespace-nowrap">
                                {sub.studentName}
                                <span className="text-[10px] text-slate-500 block font-normal font-mono">
                                  {sub.sessionId}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-center font-black font-mono text-base text-white">
                                {sub.score ?? 0}
                              </td>
                              <td className="px-3 py-3 text-center whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                  isPass ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                                }`}>
                                  {isPass ? 'TUNTAS' : 'REMEDIAL'}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-center font-mono">
                                {sub.categoryScores?.literacy.percentage ?? 0}%
                              </td>
                              <td className="px-3 py-3 text-center font-mono">
                                {sub.categoryScores?.numeracy.percentage ?? 0}%
                              </td>
                              <td className="px-3 py-3 text-center font-mono">
                                {sub.categoryScores?.grammar.percentage ?? 0}%
                              </td>
                              <td className="px-3 py-3 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                                {durMin}m {durSec < 10 ? '0' : ''}{durSec}s
                              </td>
                              <td className="px-4 py-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => setInspectedStudent(sub)}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 transition"
                                    title="Lihat Lembar Jawaban Siswa"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubmission(sub.sessionId)}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-rose-400 transition"
                                    title="Hapus Data Siswa"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: ANALISIS BUTIR SOAL */}
            {activeTab === 'item_analysis' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    Analisis Tingkat Kesulitan Soal berdasarkan seluruh peserta ujian yang telah selesai.
                  </span>
                  <div className="flex items-center gap-3 font-semibold">
                    <span className="text-emerald-400">Mudah (&gt;= 80%)</span>
                    <span className="text-amber-400">Sedang (50 - 79%)</span>
                    <span className="text-rose-400">Sukar / Remedial (&lt; 50%)</span>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900 border-b border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="px-4 py-3">No Soal</th>
                        <th className="px-4 py-3">Domain</th>
                        <th className="px-3 py-3">Indikator</th>
                        <th className="px-6 py-3">Pertanyaan / Topik</th>
                        <th className="px-3 py-3 text-center">Tingkat Ketuntasan</th>
                        <th className="px-4 py-3 text-center">Klasifikasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {QUESTIONS_DATA.map((q) => {
                        const itemStat = analytics?.itemAnalysis?.find(a => a.id === q.id);
                        const pct = itemStat ? itemStat.percentage : 0;
                        const difficulty = itemStat ? itemStat.difficulty : 'Belum Ada Data';

                        return (
                          <tr key={q.id} className="hover:bg-slate-900/50 transition">
                            <td className="px-4 py-3 font-bold text-white font-mono">
                              #{q.id}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                q.category === 'literacy' ? 'bg-blue-950 text-blue-400' :
                                q.category === 'numeracy' ? 'bg-amber-950 text-amber-400' :
                                'bg-purple-950 text-purple-400'
                              }`}>
                                {q.category.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-3 py-3 font-mono text-slate-400">
                              {q.indicatorCode}
                            </td>
                            <td className="px-6 py-3 text-slate-300 max-w-md truncate font-medium">
                              {q.questionPrompt}
                            </td>
                            <td className="px-3 py-3 text-center font-mono font-bold">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                    style={{ width: `${pct}%` }}
                                  ></div>
                                </div>
                                <span>{pct}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                difficulty === 'Mudah' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                                difficulty === 'Sedang' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                                'bg-rose-950 text-rose-400 border border-rose-800'
                              }`}>
                                {difficulty}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODAL: INSPECT INDIVIDUAL STUDENT SUBMISSION */}
        {inspectedStudent && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[88vh] overflow-hidden text-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-black text-white">
                    Lembar Jawaban Siswa: {inspectedStudent.studentName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sesi ID: {inspectedStudent.sessionId} • Skor: {inspectedStudent.score}/100 • Total: {inspectedStudent.totalQuestions} Soal
                  </p>
                </div>
                <button
                  onClick={() => setInspectedStudent(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {QUESTIONS_DATA.map((q) => {
                  const sAns = inspectedStudent.answers[q.id];
                  let isCorrect = false;

                  if (q.type === 'single_choice') {
                    isCorrect = typeof sAns === 'string' && sAns.toUpperCase() === q.correctAnswer?.toUpperCase();
                  } else if (q.type === 'complex_choice') {
                    const sel = Array.isArray(sAns) ? sAns : [];
                    const cIds = q.complexOptions?.filter(o => o.isCorrect).map(o => o.id) || [];
                    const incIds = q.complexOptions?.filter(o => !o.isCorrect).map(o => o.id) || [];
                    isCorrect = cIds.every(id => sel.includes(id)) && !sel.some(id => incIds.includes(id)) && sel.length === cIds.length;
                  } else if (q.type === 'true_false') {
                    if (sAns && typeof sAns === 'object') {
                      isCorrect = (q.tfStatements || []).every(s => sAns[s.id] === s.isTrue);
                    }
                  } else if (q.type === 'matching') {
                    if (sAns && typeof sAns === 'object') {
                      isCorrect = (q.matchingPairs || []).every(p => sAns[p.id] === p.right);
                    }
                  }

                  return (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-2xl border text-xs ${
                        isCorrect
                          ? 'border-emerald-800/80 bg-emerald-950/20'
                          : 'border-rose-800/80 bg-rose-950/20'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold mb-1.5">
                        <span className="text-white">
                          #{q.id} {q.questionPrompt}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          isCorrect ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
                        }`}>
                          {isCorrect ? 'BENAR ✓' : 'SALAH ✗'}
                        </span>
                      </div>
                      <p className="text-slate-400">
                        Kunci Jawaban: {q.explanation.summary}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MODAL: RESET CONFIRMATION */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-slate-950 border border-rose-800 rounded-3xl p-6 shadow-2xl text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-white">Reset Semua Data Ujian?</h3>
              <p className="text-xs text-slate-400">
                Tindakan ini akan menghapus seluruh rekaman sesi dan nilai siswa dari database. Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-md shadow-rose-600/30"
                >
                  Ya, Bersihkan Data
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
