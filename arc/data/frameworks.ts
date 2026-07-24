import { TheoreticalFramework } from '../types';

export const THEORETICAL_FRAMEWORKS: TheoreticalFramework[] = [
  {
    id: 'baden-fuller-2010',
    paperTitle: 'Business Models as Models (Long Range Planning)',
    authors: 'Charles Baden-Fuller & Mary S. Morgan',
    year: 2010,
    coreConcept: 'ビジネスモデル＝「再現可能な調理レシピ（Recipe）」論',
    applicationInApp: '抽象的な理論論争ではなく、誰でも再現・実行可能な「Step 1〜4の具体的アクション手順」として成果物を出力します。',
    keyPoints: [
      'ビジネスモデルは科学の実験モデルや料理のレシピのように機能する',
      '「材料（リソース）」と「調理法（結合・プロセスの統合）」の指示書である',
      '基本レシピ（テンプレート）に従うことで、初心者でも一定の成果を出せる',
      '試行錯誤（実験）を通じて独自のバリエーションへと進化させられる',
    ],
  },
  {
    id: 'st-gallen-4d',
    paperTitle: 'The St. Gallen Business Model Navigator',
    authors: 'Oliver Gassmann, Karolin Frankenberger, Michaela Csik',
    year: 2013,
    coreConcept: '4次元（4D）魔法の三角形＋55のビジネスモデルパターン',
    applicationInApp: 'すべての提案を「Who（ターゲット）」「What（提供価値）」「How（実施方法・ツール）」「Value（マネタイズ）」の4軸で構造化します。',
    keyPoints: [
      'Who: 誰のどんな課題を解決するターゲット顧客か？',
      'What: 顧客に届ける本質的な価値提案（Value Proposition）は何か？',
      'How: どのようなプロセス・無料ツール・提供手段で実現するのか？',
      'Value: なぜ収益が発生するのか？（収益構造・マネタイズメカニズム）',
      '革新的なビジネスモデルの90%は既存の55パターンの再結合である',
    ],
  },
  {
    id: 'paul-timmers-1998',
    paperTitle: 'Business Models for Electronic Markets (Electronic Markets Journal)',
    authors: 'Paul Timmers (European Commission)',
    year: 1998,
    coreConcept: '電子市場（インターネット・デジタルプラットフォーム）のビジネスモデル分類',
    applicationInApp: '在庫・ハードウェア・初期費用を一切不要にするデジタルプラットフォーム活用モデルに絞り込んで応用します。',
    keyPoints: [
      'Information Brokerage（情報仲介）: 散在する情報を集約・整理して価値提供',
      'Virtual Community（バーチャルコミュニティ）: 共通の興味を持つ層の交流場形成',
      'User-Generated Content（ユーザー生成コンテンツ）: ユーザー視点の知見発信',
      'Trust Services / Certification: 信頼性・比較分析の提供',
      'Affiliate & Freemium: 無料で集客し、プラットフォーム広告・紹介・無料/有料の二層構造で対価を得る',
    ],
  },
];
