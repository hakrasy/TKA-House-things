import React, { useMemo } from 'react';
import { 
  Check, 
  HelpCircle
} from 'lucide-react';
import { Question } from '../types/exam';

interface QuestionResponderProps {
  question: Question;
  currentAnswer: any;
  onAnswerChange: (newAnswer: any) => void;
}

export const QuestionResponder: React.FC<QuestionResponderProps> = ({
  question,
  currentAnswer,
  onAnswerChange
}) => {
  // 1. Single Choice Handler
  const handleSingleChoiceSelect = (key: string) => {
    onAnswerChange(key);
  };

  // 2. Complex Choice Handler
  const handleComplexToggle = (optionId: string) => {
    const currentList: string[] = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    const idx = currentList.indexOf(optionId);
    if (idx >= 0) {
      currentList.splice(idx, 1);
    } else {
      currentList.push(optionId);
    }
    onAnswerChange(currentList);
  };

  // 3. True / False Handler
  const handleTFChange = (statementId: string, value: boolean) => {
    const currentMap = typeof currentAnswer === 'object' && currentAnswer !== null ? { ...currentAnswer } : {};
    currentMap[statementId] = value;
    onAnswerChange(currentMap);
  };

  // 4. Matching Handler
  const handleMatchingChange = (pairId: string, selectedRight: string) => {
    const currentMap = typeof currentAnswer === 'object' && currentAnswer !== null ? { ...currentAnswer } : {};
    currentMap[pairId] = selectedRight;
    onAnswerChange(currentMap);
  };

  // Shuffled right options for matching dropdown so they do not mirror left column order
  const shuffledRightOptions = useMemo(() => {
    if (!question.matchingPairs) return [];
    // Deterministic shuffle based on reverse and length to make it varied
    return [...question.matchingPairs].sort((a, b) => {
      return (a.right.length % 2 === 0 ? 1 : -1) * a.right.localeCompare(b.right);
    });
  }, [question.id, question.matchingPairs]);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-indigo-100 flex flex-col h-full overflow-hidden">
      {/* Question Header & Category Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
            {question.id}
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                question.category === 'literacy' 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : question.category === 'numeracy'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-purple-100 text-purple-800 border border-purple-200'
              }`}>
                {question.category === 'literacy' ? 'Literasi Teks' : question.category === 'numeracy' ? 'Numerasi Spasial' : 'Tata Bahasa (Grammar)'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {question.indicatorCode}
              </span>
            </div>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-500">
          {question.type === 'single_choice' && 'Pilihan Ganda Tunggal'}
          {question.type === 'complex_choice' && 'Pilihan Ganda Kompleks'}
          {question.type === 'true_false' && 'Tabel Benar / Salah'}
          {question.type === 'matching' && 'Menjodohkan (Matching)'}
        </span>
      </div>

      {/* Question Prompt */}
      <div className="mb-4">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug">
          {question.questionPrompt}
        </h3>
        {question.instruction && (
          <p className="text-xs font-medium text-slate-500 mt-1 italic">
            💡 {question.instruction}
          </p>
        )}
      </div>

      {/* Question Body - Specific Type Renderers */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3">
        {/* TYPE 1: SINGLE CHOICE */}
        {question.type === 'single_choice' && question.options && (
          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = currentAnswer === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSingleChoiceSelect(opt.key)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 shadow-sm'
                      : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50/60 bg-white'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {opt.key}
                  </span>
                  <span className={`text-xs sm:text-sm font-medium leading-relaxed ${
                    isSelected ? 'text-indigo-950 font-semibold' : 'text-slate-700'
                  }`}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* TYPE 2: COMPLEX CHOICE (Multi-select) */}
        {question.type === 'complex_choice' && question.complexOptions && (
          <div className="space-y-2.5">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-900 text-xs font-semibold flex items-center justify-between border border-purple-200">
              <span>Beri tanda centang (✓) pada pilihan yang benar:</span>
              <span className="font-bold">
                Terpilih: {(currentAnswer as string[] || []).length}
              </span>
            </div>

            {question.complexOptions.map((opt) => {
              const selectedList = (currentAnswer as string[]) || [];
              const isSelected = selectedList.includes(opt.id);

              return (
                <div
                  key={opt.id}
                  onClick={() => handleComplexToggle(opt.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/60 shadow-sm'
                      : 'border-slate-200 hover:border-purple-200 hover:bg-slate-50/60 bg-white'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'border-2 border-slate-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <span className={`text-xs sm:text-sm leading-relaxed ${
                    isSelected ? 'text-purple-950 font-semibold' : 'text-slate-700'
                  }`}>
                    {opt.text}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* TYPE 3: TRUE / FALSE TABLE */}
        {question.type === 'true_false' && question.tfStatements && (
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 grid grid-cols-12 gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span className="col-span-8">Pernyataan (Statement)</span>
              <span className="col-span-2 text-center text-emerald-700">True (Benar)</span>
              <span className="col-span-2 text-center text-rose-700">False (Salah)</span>
            </div>
            <div className="divide-y divide-slate-100 bg-white">
              {question.tfStatements.map((stmt) => {
                const answerVal = (currentAnswer as Record<string, boolean>)?.[stmt.id];

                return (
                  <div key={stmt.id} className="p-3.5 grid grid-cols-12 gap-2 items-center hover:bg-slate-50/50">
                    <span className="col-span-8 text-xs sm:text-sm text-slate-800 font-medium">
                      {stmt.statement}
                    </span>
                    
                    {/* Option: True */}
                    <div className="col-span-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleTFChange(stmt.id, true)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                          answerVal === true
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        Benar
                      </button>
                    </div>

                    {/* Option: False */}
                    <div className="col-span-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleTFChange(stmt.id, false)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                          answerVal === false
                            ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                            : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        Salah
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TYPE 4: MATCHING (MENJODOHKAN) */}
        {question.type === 'matching' && question.matchingPairs && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600 font-medium bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              Pilihlah pasangan yang tepat untuk setiap istilah pada kolom sebelah kiri:
            </p>

            <div className="space-y-3">
              {question.matchingPairs.map((pair) => {
                const selectedVal = (currentAnswer as Record<string, string>)?.[pair.id] || '';

                return (
                  <div key={pair.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-xs">
                        {pair.left}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">dipasangkan dengan:</span>
                    </div>

                    <select
                      value={selectedVal}
                      onChange={(e) => handleMatchingChange(pair.id, e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-indigo-200 bg-white text-xs sm:text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      <option value="">-- Pilih Pasangan yang Tepat --</option>
                      {shuffledRightOptions.map((optionRight) => (
                        <option key={optionRight.id} value={optionRight.right}>
                          {optionRight.right}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
