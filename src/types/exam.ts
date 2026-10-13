export type QuestionType = 'single_choice' | 'complex_choice' | 'true_false' | 'matching';

export type QuestionCategory = 'literacy' | 'numeracy' | 'grammar';

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface TrueFalseStatement {
  id: string;
  statement: string;
  isTrue: boolean;
}

export interface Question {
  id: number;
  type: QuestionType;
  category: QuestionCategory;
  indicator: string;
  indicatorCode: 'IND-1' | 'IND-2' | 'IND-3' | 'IND-4' | 'IND-5' | 'GRAMMAR';
  topic: string;
  stimulusId: string;
  stimulusTitle: string;
  stimulusType: 'image_text' | 'image_only' | 'dialogue' | 'table' | 'grammar_context';
  stimulusText?: string;
  stimulusImage?: string;
  stimulusTable?: {
    headers: string[];
    rows: string[][];
  };
  questionPrompt: string;
  instruction?: string;
  
  // For single_choice
  options?: {
    key: string;
    text: string;
  }[];
  correctAnswer?: string; // e.g. "B"

  // For complex_choice
  complexOptions?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];

  // For true_false
  tfStatements?: TrueFalseStatement[];

  // For matching
  matchingPairs?: MatchingPair[];

  explanation: {
    summary: string;
    details: string;
    vocabularyTip?: string;
    ruleSummary?: string;
  };
}

export interface StudentSession {
  sessionId: string;
  studentName: string;
  studentClass?: string;
  studentNumber?: string;
  startedAt: string;
  completedAt?: string;
  isCompleted: boolean;
  answers: Record<number, any>; // question id -> answer value
  currentQuestionIndex: number;
  timeSpentSeconds: number;
  score?: number;
  totalQuestions: number;
  correctCount?: number;
  categoryScores?: {
    literacy: { score: number; total: number; percentage: number };
    numeracy: { score: number; total: number; percentage: number };
    grammar: { score: number; total: number; percentage: number };
  };
  indicatorScores?: Record<string, { correct: number; total: number; percentage: number; label: string }>;
  analysisFeedback?: {
    strengths: string[];
    areasToImprove: string[];
    gradeNote: string;
  };
}
