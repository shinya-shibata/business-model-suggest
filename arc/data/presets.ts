import { PresetProfile } from '../types';

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'cooking-habit',
    title: '時短・作り置き料理レシピ愛好家',
    description: '毎日の夕食作りや週末の作り置き習慣、節約アイデアを活かす',
    iconName: 'Utensils',
    input: {
      dailyHabits: '平日の毎晩の自炊（15分時短料理）と週末の3時間まとめて作り置き。スーパーの特売チェック。',
      hobbies: 'クックパッドやSNSでのレシピ検索、食器集め、キッチングッズの試用。',
      skills: '食材を無駄にしない献立組み、写真の美味しそうな撮影、エクセルでの食費管理。',
      availableTime: '1日1時間（通勤時間や夜の隙間時間）',
      preferredTheme: 'SNS（Instagram/TikTok）やnoteでの情報発信、デジタルレシピ集',
      customNotes: '初期費用は絶対かけず、自宅にあるキッチン用品とスマホだけで完結させたい。',
    },
  },
  {
    id: 'gadget-app-geek',
    title: 'ガジェット・Webアプリ徹底検証オタク',
    description: '新しい無料AIツールや業務効率化アプリの試行錯誤が日常',
    iconName: 'Cpu',
    input: {
      dailyHabits: '毎朝Product HuntやXで最新AI・ITニュースをチェック。新しい無料アプリをダウンロードして触る。',
      hobbies: 'スマホ・PCの設定最適化、作業環境（デスク周り）の改善、Notionでの情報整理。',
      skills: '便利機能の図解・スクリーンショット作成、ツール比較の文章化、初心者向け解説。',
      availableTime: '1日2時間（休日なら3〜4時間）',
      preferredTheme: 'ブログ（note/Qiita）、X（Twitter）、アフィリエイト仲介',
      customNotes: '顔出しなし、匿名で専門性を打ち出したい。',
    },
  },
  {
    id: 'office-excel-notion',
    title: '事務職・Excel/Notionテンプレート作成派',
    description: 'データ整理や仕事のフォーマット化・時短ノウハウが得意',
    iconName: 'FileSpreadsheet',
    input: {
      dailyHabits: '会社でエクセルマクロやNotionを使った業務効率化フォーマットの作成。家計簿のデジタル化。',
      hobbies: '文房具・タスク管理メソッドの勉強、手帳術、読書。',
      skills: '見やすい表やグラフの作成、Notionテンプレート設計、マニュアル作成、分かりやすい文章。',
      availableTime: '1日1〜2時間',
      preferredTheme: '無料デジタルコンテンツ配布（Gumroad/note）、ココナラでのスキル出品',
      customNotes: 'テンプレートを無料で配布して集客し、カスタマイズ版をマネタイズしたい。',
    },
  },
  {
    id: 'walking-photography',
    title: '散歩・写真撮影・ローカル街歩き',
    description: '日常の散歩や街の隠れたカフェ・撮影スポット探訪が習慣',
    iconName: 'Camera',
    input: {
      dailyHabits: '毎週末の2時間散歩、スマホでの路上・建物・カフェの写真撮影、Google Mapsでの口コミ投稿。',
      hobbies: 'カフェ巡り、ローカル歴史や散歩コースの開拓、写真編集アプリ（Canva/Lightroom無料版）。',
      skills: '写真構図、地域の穴場スポット発見、写真と文章を合わせた雰囲気のあるエッセイ作成。',
      availableTime: '1日30分〜1時間（休日に素材集め）',
      preferredTheme: '電子写真集、ローカルマップ共有、写真素材プラットフォーム',
      customNotes: 'カメラは持たずスマホ1台で撮影。地元や特定の趣味層に刺さるビジネスにしたい。',
    },
  },
  {
    id: 'english-reading-notes',
    title: '英語学習・洋書読書メモの習慣化',
    description: '毎朝の英語ニュース購読や洋書フレーズのストック',
    iconName: 'BookOpen',
    input: {
      dailyHabits: '毎朝15分の洋書・海外ニュース読書、使える英語表現のメモアプリ保存、英単語の継続学習。',
      hobbies: '海外ドラマ鑑賞、言語学習アプリ比較、単語帳作成。',
      skills: '実用的な英語フレーズ抽出、初心者向けの解説、マインドマップでの要約。',
      availableTime: '1日1時間',
      preferredTheme: '情報仲介（Information Brokerage）、有料note、Substackニュースレター',
      customNotes: '資格がなくても「学習者目線」で初心者向けの架け橋になりたい。',
    },
  },
];
