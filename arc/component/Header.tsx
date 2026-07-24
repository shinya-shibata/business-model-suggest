import React from 'react';
import { Sparkles, BookOpenCheck, BookmarkCheck, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenFrameworkModal: () => void;
  onOpenSavedDrawer: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenFrameworkModal,
  onOpenSavedDrawer,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Title and Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-100">
                ゼロ資本・個人起業ビジネスモデル提案AI
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" /> 完全無料0円型
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Baden-Fuller (2010) × St. Gallen 4D × Timmers (1998) 学術理論準拠
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenFrameworkModal}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="参照学術理論フレームワークを見る"
          >
            <BookOpenCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">3大理論解説</span>
          </button>

          <button
            onClick={onOpenSavedDrawer}
            className="relative flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-sm"
            title="保存した起業レシピ一覧"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>保存レシピ</span>
            {savedCount > 0 && (
              <span className="ml-0.5 bg-white text-emerald-700 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
