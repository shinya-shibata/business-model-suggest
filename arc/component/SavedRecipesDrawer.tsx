import React from 'react';
import { X, Trash2, Calendar, FileText, ChevronRight, BookmarkCheck } from 'lucide-react';
import { SavedRecipe } from '../types';

interface SavedRecipesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: SavedRecipe[];
  onSelectRecipe: (recipe: SavedRecipe) => void;
  onDeleteRecipe: (id: string) => void;
}

export const SavedRecipesDrawer: React.FC<SavedRecipesDrawerProps> = ({
  isOpen,
  onClose,
  recipes,
  onSelectRecipe,
  onDeleteRecipe,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl text-slate-100">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-slate-100">保存した起業レシピ ({recipes.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
          {recipes.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <FileText className="w-8 h-8 mx-auto opacity-40 text-slate-400" />
              <p>保存されたビジネスモデルレシピはありません。</p>
              <p className="text-[11px] text-slate-600">
                提案画面の「レシピを保存」ボタンを押すとここに蓄積されます。
              </p>
            </div>
          ) : (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-200 group-hover:text-emerald-400 line-clamp-2 leading-snug">
                      {recipe.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRecipe(recipe.id);
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="削除"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{recipe.createdAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectRecipe(recipe);
                    onClose();
                  }}
                  className="w-full mt-2 py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium rounded-lg text-xs flex items-center justify-between border border-slate-800 transition-colors"
                >
                  <span>このレシピを表示</span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
