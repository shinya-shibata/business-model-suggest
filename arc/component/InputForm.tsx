import React, { useState } from 'react';
import { UserProfileInput, PresetProfile } from '../types';
import { PRESET_PROFILES } from '../data/presets';
import {
  Sparkles,
  Utensils,
  Cpu,
  FileSpreadsheet,
  Camera,
  BookOpen,
  Clock,
  Wrench,
  UserCheck,
  Zap,
  HelpCircle,
} from 'lucide-react';

interface InputFormProps {
  onSubmit: (input: UserProfileInput) => void;
  isLoading: boolean;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Utensils':
      return Utensils;
    case 'Cpu':
      return Cpu;
    case 'FileSpreadsheet':
      return FileSpreadsheet;
    case 'Camera':
      return Camera;
    case 'BookOpen':
      return BookOpen;
    default:
      return Sparkles;
  }
};

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserProfileInput>({
    dailyHabits: '',
    hobbies: '',
    skills: '',
    availableTime: '1〜2時間/日',
    preferredTheme: '',
    customNotes: '',
  });

  const handleApplyPreset = (preset: PresetProfile) => {
    setFormData({ ...preset.input });
  };

  const handleChange = (field: keyof UserProfileInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dailyHabits.trim() && !formData.hobbies.trim() && !formData.skills.trim()) {
      alert('「日常生活」「趣味」「得意なこと」のいずれかひとつ以上を入力してください。');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-100">
            1. あなたの日常・習慣・得意なことを入力
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          特別なスキルや実績がなくても大丈夫です。普段当たり前にやっている習慣や好きなことが、0円で始められる事業リソースに変わります。
        </p>
      </div>

      {/* Preset Archetypes Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            ワンクリック・プリセット例（選択するとフォームに自動入力されます）
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {PRESET_PROFILES.map((preset) => {
            const Icon = getIconComponent(preset.iconName);
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 group-hover:text-emerald-400">
                  <Icon className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                  <span className="line-clamp-1">{preset.title}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily Habits */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              日常生活・日課の習慣 <span className="text-emerald-400">*</span>
            </label>
            <textarea
              value={formData.dailyHabits}
              onChange={(e) => handleChange('dailyHabits', e.target.value)}
              placeholder="例: 平日の自炊（時短レシピ作り）、毎朝の15分散歩、家計簿つけ、スマホアプリの整理など"
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          {/* Hobbies & Interests */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-teal-400 shrink-0" />
              趣味・好きなこと・関心 <span className="text-emerald-400">*</span>
            </label>
            <textarea
              value={formData.hobbies}
              onChange={(e) => handleChange('hobbies', e.target.value)}
              placeholder="例: ガジェットの比較レビューを見る、文房具集め、カフェ巡り、写真撮影、海外ドラマ鑑賞など"
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          {/* Skills & Experience */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-indigo-400 shrink-0" />
              得意なこと・知識・職歴 <span className="text-emerald-400">*</span>
            </label>
            <textarea
              value={formData.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
              placeholder="例: Excelの表作成、文章を分かりやすくまとめること、人の話を聞くこと、Canvaでの簡易画像作成など"
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Second row: Time, Preferred Platform, Custom Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 text-xs">使える時間（1日あたり）</label>
            <select
              value={formData.availableTime}
              onChange={(e) => handleChange('availableTime', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
            >
              <option value="30分程度">30分程度（隙間時間）</option>
              <option value="1〜2時間/日">1〜2時間/日（副業標準）</option>
              <option value="2〜4時間/日">2〜4時間/日（がっつり作業）</option>
              <option value="休日メイン">平日少し＋休日集中</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 text-xs">使ってみたい無料ツール・媒体</label>
            <input
              type="text"
              value={formData.preferredTheme}
              onChange={(e) => handleChange('preferredTheme', e.target.value)}
              placeholder="例: note, X, YouTube, ココナラ, Canva, GitHub"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 text-xs">その他の要望・こだわり</label>
            <input
              type="text"
              value={formData.customNotes}
              onChange={(e) => handleChange('customNotes', e.target.value)}
              placeholder="例: 匿名顔出しなし、文章メイン、動画なし希望など"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>3大経営理論に基づき0円起業レシピを構築中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
                <span>資本金ゼロ起業ビジネスモデル（レシピ）を生成する</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
