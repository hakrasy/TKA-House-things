import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { QUESTIONS_DATA, EXAM_METADATA } from '../data/questionsData';
import { StudentSession } from '../types/exam';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'exam_records.json');

interface DatabaseSchema {
  sessions: Record<string, StudentSession>;
  authTokens: Record<string, { createdAt: number; expiresAt: number }>;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      sessions: {},
      authTokens: {}
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

function readDb(): DatabaseSchema {
  ensureDataDir();
  try {
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading database file, initializing fallback:', err);
    return { sessions: {}, authTokens: {} };
  }
}

function writeDb(data: DatabaseSchema): void {
  ensureDataDir();
  const tmpFile = DB_FILE + '.tmp.' + Date.now();
  try {
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    console.error('Error writing to database:', err);
    try {
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    } catch {}
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  }
}

// Grading helper for a session
export function gradeExam(answers: Record<number, any>) {
  let correctCount = 0;
  const totalQuestions = QUESTIONS_DATA.length; // 30

  const categoryScores = {
    literacy: { correct: 0, total: 0 },
    numeracy: { correct: 0, total: 0 },
    grammar: { correct: 0, total: 0 }
  };

  const indicatorMap: Record<string, { correct: number; total: number; label: string }> = {};

  EXAM_METADATA.indicators.forEach(ind => {
    indicatorMap[ind.code] = { correct: 0, total: 0, label: ind.label };
  });

  QUESTIONS_DATA.forEach(q => {
    const ans = answers[q.id];
    let isCorrect = false;

    if (q.category in categoryScores) {
      categoryScores[q.category as keyof typeof categoryScores].total += 1;
    }
    if (indicatorMap[q.indicatorCode]) {
      indicatorMap[q.indicatorCode].total += 1;
    }

    if (q.type === 'single_choice') {
      if (typeof ans === 'string' && ans.trim().toUpperCase() === q.correctAnswer?.toUpperCase()) {
        isCorrect = true;
      }
    } else if (q.type === 'complex_choice') {
      // ans is string[] of selected option ids
      const selectedIds: string[] = Array.isArray(ans) ? ans : [];
      const correctOptionIds = q.complexOptions?.filter(o => o.isCorrect).map(o => o.id) || [];
      const incorrectOptionIds = q.complexOptions?.filter(o => !o.isCorrect).map(o => o.id) || [];

      // Check if all correct ones selected and none incorrect selected
      const hasAllCorrect = correctOptionIds.every(id => selectedIds.includes(id));
      const hasNoIncorrect = !selectedIds.some(id => incorrectOptionIds.includes(id));

      if (hasAllCorrect && hasNoIncorrect && selectedIds.length === correctOptionIds.length) {
        isCorrect = true;
      }
    } else if (q.type === 'true_false') {
      // ans is Record<string, boolean>
      if (ans && typeof ans === 'object') {
        const allCorrect = (q.tfStatements || []).every(stmt => {
          return ans[stmt.id] === stmt.isTrue;
        });
        if (allCorrect) isCorrect = true;
      }
    } else if (q.type === 'matching') {
      // ans is Record<string, string> (pairId -> right text)
      if (ans && typeof ans === 'object') {
        const allMatched = (q.matchingPairs || []).every(pair => {
          return ans[pair.id] === pair.right;
        });
        if (allMatched) isCorrect = true;
      }
    }

    if (isCorrect) {
      correctCount += 1;
      if (q.category in categoryScores) {
        categoryScores[q.category as keyof typeof categoryScores].correct += 1;
      }
      if (indicatorMap[q.indicatorCode]) {
        indicatorMap[q.indicatorCode].correct += 1;
      }
    }
  });

  const finalScore = Math.round((correctCount / totalQuestions) * 100);

  const formattedCategoryScores = {
    literacy: {
      score: categoryScores.literacy.correct,
      total: categoryScores.literacy.total,
      percentage: categoryScores.literacy.total > 0 ? Math.round((categoryScores.literacy.correct / categoryScores.literacy.total) * 100) : 0
    },
    numeracy: {
      score: categoryScores.numeracy.correct,
      total: categoryScores.numeracy.total,
      percentage: categoryScores.numeracy.total > 0 ? Math.round((categoryScores.numeracy.correct / categoryScores.numeracy.total) * 100) : 0
    },
    grammar: {
      score: categoryScores.grammar.correct,
      total: categoryScores.grammar.total,
      percentage: categoryScores.grammar.total > 0 ? Math.round((categoryScores.grammar.correct / categoryScores.grammar.total) * 100) : 0
    }
  };

  const formattedIndicators: Record<string, { correct: number; total: number; percentage: number; label: string }> = {};
  for (const [code, val] of Object.entries(indicatorMap)) {
    formattedIndicators[code] = {
      correct: val.correct,
      total: val.total,
      percentage: val.total > 0 ? Math.round((val.correct / val.total) * 100) : 0,
      label: val.label
    };
  }

  // Generate learning diagnosis
  const strengths: string[] = [];
  const areasToImprove: string[] = [];

  if (formattedCategoryScores.literacy.percentage >= 75) {
    strengths.push('Literasi Teks Deskriptif: Sangat mahir membaca dan membedah detail rumah.');
  } else {
    areasToImprove.push('Tingkatkan kecermatan membaca deskripsi benda dan ruangan.');
  }

  if (formattedCategoryScores.numeracy.percentage >= 75) {
    strengths.push('Numerasi Spasial & Denah: Luar biasa dalam menghitung dan menganalisis denah.');
  } else {
    areasToImprove.push('Perbanyak latihan menghitung jumlah benda & membaca kapasitas ruang.');
  }

  if (formattedCategoryScores.grammar.percentage >= 75) {
    strengths.push('Grammar Mastery: Sangat memahami There is/are, Quantifiers, dan Preposition.');
  } else {
    areasToImprove.push('Perlu review aturan There is (singular) vs There are (plural) & quantifiers.');
  }

  let gradeNote = 'Perlu Pendampingan';
  if (finalScore >= 90) gradeNote = 'Sangat Istimewa (A+)';
  else if (finalScore >= 80) gradeNote = 'Sangat Baik (A)';
  else if (finalScore >= 75) gradeNote = 'Mencapai KKM (Tuntas)';
  else if (finalScore >= 60) gradeNote = 'Cukup (Perlu Penguatan)';

  return {
    score: finalScore,
    correctCount,
    totalQuestions,
    categoryScores: formattedCategoryScores,
    indicatorScores: formattedIndicators,
    analysisFeedback: {
      strengths,
      areasToImprove,
      gradeNote
    }
  };
}

export const dbService = {
  createSession(payload: { studentName: string; studentClass?: string; studentNumber?: string }): StudentSession {
    const db = readDb();
    const sessionId = 'SES-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-4);
    
    const session: StudentSession = {
      sessionId,
      studentName: payload.studentName.trim(),
      studentClass: payload.studentClass?.trim() || '',
      studentNumber: payload.studentNumber?.trim() || '',
      startedAt: new Date().toISOString(),
      isCompleted: false,
      answers: {},
      currentQuestionIndex: 0,
      timeSpentSeconds: 0,
      totalQuestions: QUESTIONS_DATA.length
    };

    db.sessions[sessionId] = session;
    writeDb(db);
    return session;
  },

  getSession(sessionId: string): StudentSession | null {
    const db = readDb();
    return db.sessions[sessionId] || null;
  },

  saveAnswer(sessionId: string, questionId: number, answer: any, timeSpentSeconds: number): boolean {
    const db = readDb();
    const session = db.sessions[sessionId];
    if (!session) return false;

    session.answers[questionId] = answer;
    session.timeSpentSeconds = timeSpentSeconds;
    session.currentQuestionIndex = questionId - 1;

    writeDb(db);
    return true;
  },

  finishSession(sessionId: string, answers: Record<number, any>, timeSpentSeconds: number): StudentSession | null {
    const db = readDb();
    const session = db.sessions[sessionId];
    if (!session) return null;

    session.answers = { ...session.answers, ...answers };
    session.timeSpentSeconds = timeSpentSeconds;
    session.isCompleted = true;
    session.completedAt = new Date().toISOString();

    const graded = gradeExam(session.answers);
    session.score = graded.score;
    session.correctCount = graded.correctCount;
    session.categoryScores = graded.categoryScores;
    session.indicatorScores = graded.indicatorScores;
    session.analysisFeedback = graded.analysisFeedback;

    writeDb(db);
    return session;
  },

  getAllSubmissions(): StudentSession[] {
    const db = readDb();
    return Object.values(db.sessions).sort((a, b) => {
      const timeA = new Date(a.completedAt || a.startedAt).getTime();
      const timeB = new Date(b.completedAt || b.startedAt).getTime();
      return timeB - timeA;
    });
  },

  deleteSubmission(sessionId: string): boolean {
    const db = readDb();
    if (db.sessions[sessionId]) {
      delete db.sessions[sessionId];
      writeDb(db);
      return true;
    }
    return false;
  },

  clearAllSubmissions(): void {
    const db = readDb();
    db.sessions = {};
    writeDb(db);
  },

  createTeacherToken(): string {
    const db = readDb();
    const token = 'TCH_' + crypto.randomBytes(24).toString('hex');
    const now = Date.now();
    db.authTokens[token] = {
      createdAt: now,
      expiresAt: now + 24 * 60 * 60 * 1000 // 24 hours
    };
    writeDb(db);
    return token;
  },

  validateTeacherToken(token: string): boolean {
    if (!token) return false;
    const db = readDb();
    const record = db.authTokens[token];
    if (!record) return false;
    if (Date.now() > record.expiresAt) {
      delete db.authTokens[token];
      writeDb(db);
      return false;
    }
    return true;
  },

  getAnalytics() {
    const submissions = this.getAllSubmissions().filter(s => s.isCompleted);
    const totalCount = submissions.length;

    if (totalCount === 0) {
      return {
        totalStudents: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        passCount: 0,
        passRate: 0,
        itemAnalysis: [],
        indicatorBreakdown: {}
      };
    }

    const scores = submissions.map(s => s.score ?? 0);
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalCount);
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);
    const passCount = submissions.filter(s => (s.score ?? 0) >= EXAM_METADATA.passingScore).length;
    const passRate = Math.round((passCount / totalCount) * 100);

    // Item analysis for all 30 questions
    const itemAnalysis = QUESTIONS_DATA.map(q => {
      let correctAnswersForQ = 0;
      submissions.forEach(sub => {
        const userAns = sub.answers[q.id];
        let correct = false;
        if (q.type === 'single_choice') {
          if (typeof userAns === 'string' && userAns.toUpperCase() === q.correctAnswer?.toUpperCase()) {
            correct = true;
          }
        } else if (q.type === 'complex_choice') {
          const selected: string[] = Array.isArray(userAns) ? userAns : [];
          const correctIds = q.complexOptions?.filter(o => o.isCorrect).map(o => o.id) || [];
          const incorrectIds = q.complexOptions?.filter(o => !o.isCorrect).map(o => o.id) || [];
          if (correctIds.every(id => selected.includes(id)) && !selected.some(id => incorrectIds.includes(id)) && selected.length === correctIds.length) {
            correct = true;
          }
        } else if (q.type === 'true_false') {
          if (userAns && typeof userAns === 'object') {
            if ((q.tfStatements || []).every(stmt => userAns[stmt.id] === stmt.isTrue)) {
              correct = true;
            }
          }
        } else if (q.type === 'matching') {
          if (userAns && typeof userAns === 'object') {
            if ((q.matchingPairs || []).every(pair => userAns[pair.id] === pair.right)) {
              correct = true;
            }
          }
        }
        if (correct) correctAnswersForQ += 1;
      });

      const percentage = Math.round((correctAnswersForQ / totalCount) * 100);
      let difficulty = 'Sedang';
      if (percentage >= 80) difficulty = 'Mudah';
      else if (percentage < 50) difficulty = 'Sukar / Perlu Remedial';

      return {
        id: q.id,
        category: q.category,
        indicatorCode: q.indicatorCode,
        correctCount: correctAnswersForQ,
        totalCount,
        percentage,
        difficulty
      };
    });

    return {
      totalStudents: totalCount,
      averageScore,
      highestScore,
      lowestScore,
      passCount,
      passRate,
      itemAnalysis
    };
  }
};
