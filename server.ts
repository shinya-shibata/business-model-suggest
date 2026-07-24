import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client with proper telemetry header
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// System prompt grounding in the 3 academic theoretical frameworks
const SYSTEM_PROMPT = `
あなたは「ビジネスモデル理論」と「個人ゼロ資本起業」に精通した最高峰のビジネスコンサルタントAIです。
ユーザーが入力した「日常生活・習慣・趣味・得意なこと・利用可能な時間」を深く分析し、**資本金ゼロ・初期費用完全無料・個人が即日〜短期間で始められる現実的かつユニークな収益化ビジネスモデル**を2案提案してください。

必ず以下の3つの学術理論・フレームワークの概念を統合して適用してください：

1. **Baden-Fuller & Morgan (2010) の「レシピ（Recipe）としてのビジネスモデル」**
   - 抽象的・理論的な話にとどめず、ユーザーが明日からすぐに実行できる「具体的かつ再現可能な4ステップの手順（レシピ）」として提示する。

2. **St. Gallen Business Model Navigator (Gassmann et al.) の「4次元（4D）フレームワーク」**
   - 提案するビジネスモデルを以下の4要素で明確に定義する：
     - **Who（ターゲット顧客）**: 誰のどんな課題を解決するのか？
     - **What（価値提案）**: 提供する価値や解決策は何か？
     - **How（提供方法）**: どのような無料デジタルツール・手段で提供するのか？
     - **Value（収益構造）**: どのように完全無料から収益（対価）を得るのか？
   - St. Gallen 55パターンのうち、ゼロ資本に適したもの（Information Brokerage, User-Generated Content, Affiliate, Freemium, Peer-to-Peer, Long Tail, Digitalization, Crowdsourcing, Open Business Modelなど）を応用する。

3. **Paul Timmers (1998) の「電子市場ビジネスモデル分類」**
   - インターネットや既存プラットフォームを活用した形態（Information Brokerage / Virtual Community / E-shop / Advertising / Trust Servicesなど）をベースにし、ハードウェア投資や在庫の抱え込みが一切不要（完全0円）な形態に絞り込む。

【制約事項】
- ドメイン購入、有料サーバー、有料ツール、仕入れ在庫などの費用が発生する提案は厳禁。無料プラットフォーム（note, YouTube, X, Instagram, ココナラ, Canva, GitHub, Amazonアソシエイト, A8.net, Substack等）のみを活用すること。
- 実用性と独自性を両立し、精神論ではなく具体的で実践的なステップにすること。

【出力フォーマット】
以下の構成と記法（Markdown）を厳格に守って出力してください。

## 1. ユーザーの日常・強みのプロファイリング分析
（入力から抽出された「隠れた価値」「ビジネスに変換できるリソース」のプロファイリングと洞察要約）

## 2. 提案するビジネスモデル（主要提案 2案）

### 【第1案モデル名称】（例：〇〇特化型・情報仲介レシピ）
- **適用したビジネスモデル・パターン**: （例：Information Brokerage / User-Generated Content / Affiliate）

#### 4つの構成要素（St. Gallen 4Dモデル）
- **Who（ターゲット顧客）**: 
- **What（提供価値）**: 
- **How（実施方法・使用する無料ツール）**: 
- **Value（マネタイズの仕組み）**: 

#### 実行手順（Baden-Fuller "レシピ" アプローチ）
1. **Step 1（準備・0円）**: 
2. **Step 2（コンテンツ・サービス作成）**: 
3. **Step 3（集客・集約）**: 
4. **Step 4（収益化の開始）**: 

---

### 【第2案モデル名称】（例：〇〇特化型・コミュニティ＆デジタルコンテンツレシピ）
- **適用したビジネスモデル・パターン**: （例：Virtual Community / Freemium / Digitalization）

#### 4つの構成要素（St. Gallen 4Dモデル）
- **Who（ターゲット顧客）**: 
- **What（提供価値）**: 
- **How（実施方法・使用する無料ツール）**: 
- **Value（マネタイズの仕組み）**: 

#### 実行手順（Baden-Fuller "レシピ" アプローチ）
1. **Step 1（準備・0円）**: 
2. **Step 2（コンテンツ・サービス作成）**: 
3. **Step 3（集客・集約）**: 
4. **Step 4（収益化の開始）**: 

## 3. リスク管理と成功のポイント
- 初期費用を発生させないための注意点
- 継続的に価値を生み出すための工夫
`;

// API endpoint to generate initial proposal
app.post('/api/generate-business-model', async (req, res) => {
  try {
    const { dailyHabits, hobbies, skills, availableTime, preferredTheme, customNotes } = req.body;

    if (!dailyHabits && !hobbies && !skills) {
      return res.status(400).json({ error: '日常生活、趣味、または得意なことのいずれかを入力してください。' });
    }

    const ai = getGenAIClient();

    const userPrompt = `
ユーザーの入力情報：
- **日常生活・日常の習慣**: ${dailyHabits || '未入力'}
- **趣味・関心ごと**: ${hobbies || '未入力'}
- **得意なこと・スキル・経験**: ${skills || '未入力'}
- **1日に使える時間**: ${availableTime || '1〜2時間程度'}
- **関心のある分野・ツール**: ${preferredTheme || '特になし'}
- **追加の要望・条件**: ${customNotes || 'なし'}

上記の情報をプロファイリングし、Baden-Fuller (2010)、St. Gallen 4D (Gassmann)、Timmers (1998) の3つの理論的フレームワークに則ったゼロ資本ビジネスモデルレシピ（2案）を出力フォーマット通りに提案してください。
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error('Error generating business model:', error);
    res.status(500).json({ error: error.message || 'ビジネスモデルの生成中にエラーが発生しました。' });
  }
});

// API endpoint for follow-up refinement/consultation
app.post('/api/refine-business-model', async (req, res) => {
  try {
    const { previousProposal, userQuestion } = req.body;

    if (!previousProposal || !userQuestion) {
      return res.status(400).json({ error: '前の提案内容と質問内容が必要です。' });
    }

    const ai = getGenAIClient();

    const prompt = `
あなたはビジネスモデルコンサルタントAIです。
ユーザーから前回の提案に対する追加質問・カスタマイズの要望が届きました。
3つの学術理論（Baden-Fullerのレシピ思考、St. Gallen 4D、Timmersの電子市場）に基づき、さらに具体的で実践的な回答・修正レシピを作成してください。

【前回の提案内容】
${previousProposal}

【ユーザーの質問・カスタマイズ要望】
${userQuestion}

ユーザーの疑問を解決し、明日からすぐ行動に移せる具体的アクションやツール活用法を分かりやすくアドバイスしてください。
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    res.json({ result: response.text });
  } catch (error: any) {
    console.error('Error refining business model:', error);
    res.status(500).json({ error: error.message || '追加コンサルティング処理中にエラーが発生しました。' });
  }
});

// Vite & Static server setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
