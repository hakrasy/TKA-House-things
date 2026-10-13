import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { dbService } from './src/server/db';
import { EXAM_METADATA } from './src/data/questionsData';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Teacher secret password - verified server-side only!
const TEACHER_PASSWORD = process.env.TEACHER_PASSWORD || 'rsyd77';

// Middleware for teacher authentication
function requireTeacherAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  let token = '';
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.query.token && typeof req.query.token === 'string') {
    token = req.query.token;
  }

  if (!token || !dbService.validateTeacherToken(token)) {
    return res.status(401).json({
      success: false,
      error: 'Akses ditolak. Sesi guru tidak valid atau telah kedaluwarsa. Silakan login kembali.'
    });
  }

  next();
}

// ===============================
// API ROUTES FOR STUDENT SESSIONS
// ===============================

// 1. Start a new exam session
app.post('/api/sessions/start', (req, res) => {
  try {
    const { studentName } = req.body;
    if (!studentName || typeof studentName !== 'string' || !studentName.trim()) {
      return res.status(400).json({ success: false, error: 'Nama siswa wajib diisi.' });
    }

    const session = dbService.createSession({
      studentName: studentName.trim()
    });

    res.json({ success: true, session });
  } catch (err: any) {
    console.error('Error starting session:', err);
    res.status(500).json({ success: false, error: 'Gagal memulai sesi ujian: ' + err.message });
  }
});

// 2. Get existing session (for page reload / session recovery)
app.get('/api/sessions/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = dbService.getSession(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Sesi ujian tidak ditemukan.' });
    }
    res.json({ success: true, session });
  } catch (err: any) {
    console.error('Error getting session:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Save single answer periodically (autosave)
app.post('/api/sessions/save-answer', (req, res) => {
  try {
    const { sessionId, questionId, answer, timeSpentSeconds } = req.body;
    if (!sessionId || questionId === undefined) {
      return res.status(400).json({ success: false, error: 'Parameter tidak lengkap.' });
    }

    const saved = dbService.saveAnswer(sessionId, questionId, answer, timeSpentSeconds || 0);
    if (!saved) {
      return res.status(404).json({ success: false, error: 'Sesi tidak ditemukan di server.' });
    }

    res.json({ success: true, savedAt: new Date().toISOString() });
  } catch (err: any) {
    console.error('Error saving answer:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Submit and finish exam
app.post('/api/sessions/finish', (req, res) => {
  try {
    const { sessionId, answers, timeSpentSeconds } = req.body;
    if (!sessionId) {
      return res.status(400).json({ success: false, error: 'SessionId wajib disertakan.' });
    }

    const finishedSession = dbService.finishSession(sessionId, answers || {}, timeSpentSeconds || 0);
    if (!finishedSession) {
      return res.status(404).json({ success: false, error: 'Sesi ujian tidak ditemukan.' });
    }

    res.json({ success: true, session: finishedSession });
  } catch (err: any) {
    console.error('Error finishing session:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===============================
// API ROUTES FOR TEACHER DASHBOARD
// ===============================

// 5. Teacher login verification (server-side only verification)
app.post('/api/teacher/login', (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, error: 'Password wajib diisi.' });
    }

    if (password === TEACHER_PASSWORD) {
      const token = dbService.createTeacherToken();
      res.json({ success: true, token, message: 'Autentikasi guru berhasil.' });
    } else {
      res.status(401).json({ success: false, error: 'Password salah. Akses ditolak.' });
    }
  } catch (err: any) {
    console.error('Error teacher login:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Teacher verify token
app.get('/api/teacher/verify', requireTeacherAuth, (req, res) => {
  res.json({ success: true, valid: true });
});

// 7. Get all student submissions & analytics
app.get('/api/teacher/submissions', requireTeacherAuth, (req, res) => {
  try {
    const submissions = dbService.getAllSubmissions();
    const analytics = dbService.getAnalytics();
    res.json({ success: true, submissions, analytics, metadata: EXAM_METADATA });
  } catch (err: any) {
    console.error('Error getting submissions:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Delete specific student session
app.delete('/api/teacher/submissions/:sessionId', requireTeacherAuth, (req, res) => {
  try {
    const { sessionId } = req.params;
    const deleted = dbService.deleteSubmission(sessionId);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Data sesi tidak ditemukan.' });
    }
    res.json({ success: true, message: 'Data siswa berhasil dihapus.' });
  } catch (err: any) {
    console.error('Error deleting submission:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Reset / Clear all results
app.post('/api/teacher/submissions/clear', requireTeacherAuth, (req, res) => {
  try {
    dbService.clearAllSubmissions();
    res.json({ success: true, message: 'Seluruh data sesi siswa berhasil dibersihkan.' });
  } catch (err: any) {
    console.error('Error clearing submissions:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. Export to CSV for Teacher
app.get('/api/teacher/export-csv', requireTeacherAuth, (req, res) => {
  try {
    const submissions = dbService.getAllSubmissions().filter(s => s.isCompleted);
    
    // Build CSV
    const headers = [
      'No',
      'Session ID',
      'Nama Siswa',
      'Skor Akhir (0-100)',
      'Status Kelulusan',
      'Jawaban Benar',
      'Total Soal',
      'Literasi (%)',
      'Numerasi (%)',
      'Grammar (%)',
      'Durasi (Menit:Detik)',
      'Waktu Mulai',
      'Waktu Selesai'
    ];

    const rows = submissions.map((s, idx) => {
      const isPass = (s.score ?? 0) >= EXAM_METADATA.passingScore ? 'TUNTAS' : 'REMEDIAL';
      const durationMin = Math.floor(s.timeSpentSeconds / 60);
      const durationSec = s.timeSpentSeconds % 60;
      const durationFormatted = `${durationMin}m ${durationSec < 10 ? '0' : ''}${durationSec}s`;

      return [
        idx + 1,
        `"${s.sessionId}"`,
        `"${s.studentName.replace(/"/g, '""')}"`,
        s.score ?? 0,
        isPass,
        s.correctCount ?? 0,
        s.totalQuestions,
        s.categoryScores?.literacy.percentage ?? 0,
        s.categoryScores?.numeracy.percentage ?? 0,
        s.categoryScores?.grammar.percentage ?? 0,
        `"${durationFormatted}"`,
        `"${s.startedAt}"`,
        `"${s.completedAt || '-'}"`
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="Rekap_Nilai_TKA_Bahasa_Inggris_Kelas_7.csv"');
    res.send(csvContent);
  } catch (err: any) {
    console.error('Error exporting CSV:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // In dev mode, use Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Exam server running at http://0.0.0.0:${port}`);
  });
}

startServer();
