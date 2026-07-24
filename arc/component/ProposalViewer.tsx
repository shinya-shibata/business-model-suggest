import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Bookmark,
  Check,
  Copy,
  Download,
  MessageSquare,
  Send,
  Sparkles,
  CheckSquare,
  Square,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { FollowUpMessage } from '../types';

interface ProposalViewerProps {
  proposalText: string;
  onSaveRecipe: (title: string, content: string) => void;
  isSaved: boolean;
}

export const ProposalViewer: React.FC<ProposalViewerProps> = ({
  proposalText,
  onSaveRecipe,
  isSaved,
}) => {
  const [copied, setCopied] = useState(false);
  const [followUps, setFollowUps] = useState<FollowUpMessage[]>([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);

  // Extract steps for interactive checklist
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  // Parse lines to find steps (e.g. "1. **Step 1..." or "Step 1")
  const lines = proposalText.split('\n');
  const stepLines = lines.filter((line) => line.includes('Step ') || line.includes('ステップ'));

  const toggleStep = (stepText: string) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [stepText]: !prev[stepText],
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(proposalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([proposalText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `0yen-business-recipe-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSave = () => {
    // Extract a nice title from proposal
    const titleMatch = proposalText.match(/###\s*【(.*?)】/);
    const title = titleMatch ? titleMatch[1] : 'ゼロ資本起業ビジネスモデルレシピ';
    onSaveRecipe(title, proposalText);
  };

  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim() || isConsulting) return;

    const currentQuestion = userQuestion;
    setUserQuestion('');

    const newMsgUser: FollowUpMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: currentQuestion,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setFollowUps((prev) => [...prev, newMsgUser]);
    setIsConsulting(true);

    try {
      const response = await fetch('/api/refine-business-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previousProposal: proposalText,
          userQuestion: currentQuestion,
        }),
      });

      const data = await response.json();
      if (data.result) {
        const newMsgAi: FollowUpMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.result,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setFollowUps((prev) => [...prev, newMsgAi]);
      } else {
        alert(data.error || 'エラーが発生しました。');
      }
    } catch (err: any) {
      console.error(err);
      alert('通信エラーが発生しました。');
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-100">生成された0円起業レシピ</h2>
            <p className="text-xs text-slate-400">学術理論フレームワークを適用した事業提案書</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'コピー完了' : 'テキストコピー'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Markdown保存</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              isSaved
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 cursor-default'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? '保存済み' : 'レシピを保存'}</span>
          </button>
        </div>
      </div>

      {/* Main Recipe Content Area */}
      <div className="prose prose-invert max-w-none prose-headings:font-bold prose-h2:text-emerald-400 prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-2 prose-h3:text-teal-300 prose-strong:text-slate-100 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{proposalText}</ReactMarkdown>
      </div>

      {/* Interactive Action Steps Checklist */}
      {stepLines.length > 0 && (
        <div className="mt-8 p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              実行レシピ・アクション進捗チェックリスト
            </h3>
            <span className="text-xs text-slate-400">
              {Object.values(checkedSteps).filter(Boolean).length} / {stepLines.length} 完了
            </span>
          </div>
          <div className="space-y-2">
            {stepLines.map((stepLine, idx) => {
              const isChecked = !!checkedSteps[stepLine];
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(stepLine)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-800/60 text-slate-200 line-through opacity-80'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  )}
                  <span>{stepLine.replace(/^[#\*\-]+\s*/, '')}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Follow-up Consultant Section */}
      <div className="mt-8 pt-6 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">
            AIビジネスコンサルタントに追加質問・カスタマイズ相談
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          「Step 2の投稿文案を作成して」「noteではなくYouTubeを主軸にした場合は？」「マネタイズまでの想定スケジュールは？」など、何でも深掘り質問できます。
        </p>

        {/* Previous Chat Messages */}
        {followUps.length > 0 && (
          <div className="space-y-3 max-h-96 overflow-y-auto p-4 bg-slate-950 rounded-xl border border-slate-800">
            {followUps.map((msg) => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-950/60 border border-indigo-800/60 text-indigo-100 ml-8'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 mr-8'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-bold">
                    {msg.sender === 'user' ? 'あなた' : 'AIコンサルタント'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="prose prose-invert max-w-none text-xs sm:text-sm">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input box */}
        <form onSubmit={handleFollowUpSubmit} className="flex gap-2">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            placeholder="例: この提案のStep 2で作成する投稿タイトル案を5つ作ってください"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={isConsulting || !userQuestion.trim()}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1.5 shrink-0"
          >
            {isConsulting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>送信</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
