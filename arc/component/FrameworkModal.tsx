import React from 'react';
import { X, BookOpen, Layers, Zap, CheckCircle2 } from 'lucide-react';
import { THEORETICAL_FRAMEWORKS } from '../data/frameworks';

interface FrameworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FrameworkModal: React.FC<FrameworkModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-slate-100">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-100">参照する3つの学術理論・フレームワーク</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          <p className="text-slate-300 leading-relaxed bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
            当AIは、単なる精神論やアイデア出しではなく、経営学の主要論文で立証された3つのビジネスモデル理論を統合し、ユーザーの日常や強みを<strong>「完全無料で即日実行可能な事業レシピ」</strong>へと構造化・変換します。
          </p>

          <div className="grid gap-5">
            {THEORETICAL_FRAMEWORKS.map((fw, idx) => (
              <div
                key={fw.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      理論 #{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-100 mt-1">{fw.coreConcept}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {fw.paperTitle} — {fw.authors} ({fw.year})
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300">
                  <span className="font-semibold text-emerald-400">当AIでの適用方法:</span> {fw.applicationInApp}
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300">
                  {fw.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors"
          >
            理解して閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
