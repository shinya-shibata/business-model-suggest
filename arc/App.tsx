import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ProposalViewer } from './components/ProposalViewer';
import { FrameworkModal } from './components/FrameworkModal';
import { SavedRecipesDrawer } from './components/SavedRecipesDrawer';
import { UserProfileInput, SavedRecipe } from './types';
import { Sparkles, ShieldCheck, Rocket, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [proposal, setProposal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [isFrameworkModalOpen, setIsFrameworkModalOpen] = useState<boolean>(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [activeInputSummary, setActiveInputSummary] = useState<string>('');

  const resultRef = useRef<HTMLDivElement>(null);

  // Load saved recipes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('zero_capital_recipes');
      if (stored) {
        setSavedRecipes(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved recipes', e);
    }
  }, []);

  // Save recipes to localStorage
  const saveRecipesToStorage = (updated: SavedRecipe[]) => {
    setSavedRecipes(updated);
    try {
      localStorage.setItem('zero_capital_recipes', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save recipes to storage', e);
    }
  };

  const handleFormSubmit = async (input: UserProfileInput) => {
    setIsLoading(true);
    setProposal('');

    const summaryStr = [input.dailyHabits, input.hobbies, input.skills].filter(Boolean).join(' / ');
    setActiveInputSummary(summaryStr);

    try {
      const response = await fetch('/api/generate-business-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'サーバーエラーが発生しました。');
      }

      setProposal(data.result);

      // Scroll smoothly to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'ビジネスモデルの生成中にエラーが発生しました。再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRecipe = (title: string, content: string) => {
    const newRecipe: SavedRecipe = {
      id: Date.now().toString(),
      title,
      createdAt: new Date().toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      inputSummary: activeInputSummary,
      content,
      stepProgress: {},
    };

    const updated = [newRecipe, ...savedRecipes];
    saveRecipesToStorage(updated);
  };

  const handleDeleteRecipe = (id: string) => {
    const updated = savedRecipes.filter((r) => r.id !== id);
    saveRecipesToStorage(updated);
  };

  const handleSelectRecipe = (recipe: SavedRecipe) => {
    setProposal(recipe.content);
    setActiveInputSummary(recipe.inputSummary);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const isCurrentProposalSaved = savedRecipes.some((r) => r.content === proposal);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        onOpenFrameworkModal={() => setIsFrameworkModalOpen(true)}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        savedCount={savedRecipes.length}
      />

      {/* Hero Banner / Concept Explanation */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 pt-8 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>初期費用0円・仕入れ0円・サーバー費用0円 徹底保証</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            あなたの日常や習慣が、
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              即日スタートできる「0円起業レシピ」
            </span>
            に変わる
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            経営学の3大理論（Baden-Fullerのレシピ理論、St. Gallen 4Dモデル、Timmersの電子市場モデル）に基づき、身の回りの知識や日課を資本金完全ゼロの個人事業モデルとして即座に可視化します。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] text-slate-300 font-medium">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> note / Substack
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> YouTube / X (Twitter)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ココナラ / Canva
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Amazonアソシエイト
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Input Form Section */}
        <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />

        {/* Results Section */}
        <div ref={resultRef}>
          {proposal ? (
            <ProposalViewer
              proposalText={proposal}
              onSaveRecipe={handleSaveRecipe}
              isSaved={isCurrentProposalSaved}
            />
          ) : (
            !isLoading && (
              <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-8 sm:p-12 text-center text-slate-500 space-y-3">
                <Rocket className="w-10 h-10 mx-auto text-slate-600 opacity-60" />
                <h3 className="text-base font-semibold text-slate-300">
                  フォームに入力して提案ボタンを押してください
                </h3>
                <p className="text-xs max-w-md mx-auto text-slate-500">
                  日常のちょっとした習慣や好きなことを入力するだけで、学術理論に基づいた完全無料の収益化レシピ（Who/What/How/Value + 4ステップ実行手順）が生成されます。
                </p>
              </div>
            )
          )}
        </div>
      </main>

      {/* Modals & Drawers */}
      <FrameworkModal
        isOpen={isFrameworkModalOpen}
        onClose={() => setIsFrameworkModalOpen(false)}
      />

      <SavedRecipesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        recipes={savedRecipes}
        onSelectRecipe={handleSelectRecipe}
        onDeleteRecipe={handleDeleteRecipe}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-slate-400">
              ゼロ資本・個人起業ビジネスモデル提案AI
            </span>
          </div>
          <p>© 2026 Zero-Capital Solo Business Model Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
