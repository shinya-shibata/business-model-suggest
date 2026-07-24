export interface UserProfileInput {
  dailyHabits: string;
  hobbies: string;
  skills: string;
  availableTime: string;
  preferredTheme: string;
  customNotes: string;
}

export interface PresetProfile {
  id: string;
  title: string;
  description: string;
  iconName: string;
  input: UserProfileInput;
}

export interface SavedRecipe {
  id: string;
  title: string;
  createdAt: string;
  inputSummary: string;
  content: string;
  stepProgress: Record<string, boolean>; // e.g., { "step1": true, "step2": false }
}

export interface FollowUpMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface TheoreticalFramework {
  id: string;
  paperTitle: string;
  authors: string;
  year: number;
  coreConcept: string;
  applicationInApp: string;
  keyPoints: string[];
}
