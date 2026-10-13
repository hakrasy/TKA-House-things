import React from 'react';
import { Maximize2, Image as ImageIcon, MessageSquare, Table as TableIcon, BookOpen, Sparkles } from 'lucide-react';
import { Question } from '../types/exam';

interface QuestionStimulusProps {
  question: Question;
  onOpenImageModal: (src: string, title: string) => void;
}

export const QuestionStimulus: React.FC<QuestionStimulusProps> = ({
  question,
  onOpenImageModal
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-indigo-100 flex flex-col h-full overflow-hidden">
      {/* Stimulus Header Badge */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          {question.stimulusType.includes('image') && (
            <span className="p-1.5 rounded-lg bg-pink-100 text-pink-700">
              <ImageIcon className="w-4 h-4" />
            </span>
          )}
          {question.stimulusType === 'dialogue' && (
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <MessageSquare className="w-4 h-4" />
            </span>
          )}
          {question.stimulusType === 'table' && (
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <TableIcon className="w-4 h-4" />
            </span>
          )}
          {question.stimulusType === 'grammar_context' && (
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
              <BookOpen className="w-4 h-4" />
            </span>
          )}
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 block">
              STIMULUS MATERI
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
              {question.stimulusTitle}
            </h4>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          ID: {question.stimulusId}
        </span>
      </div>

      {/* Stimulus Body */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {/* If Image exists */}
        {question.stimulusImage && (
          <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner">
            <img
              src={question.stimulusImage}
              alt={question.stimulusTitle}
              className="w-full h-auto max-h-[380px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
            />
            
            {/* Overlay button to zoom */}
            <button
              type="button"
              onClick={() => onOpenImageModal(question.stimulusImage!, question.stimulusTitle)}
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-sm shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Perbesar Gambar (Zoom)</span>
            </button>
          </div>
        )}

        {/* If Text exists */}
        {question.stimulusText && (
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal">
            {question.stimulusText}
          </div>
        )}

        {/* If Table exists */}
        {question.stimulusTable && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-indigo-600 text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  {question.stimulusTable.headers.map((h, i) => (
                    <th key={i} className="px-3.5 py-2.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {question.stimulusTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2 text-slate-700 font-medium whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
