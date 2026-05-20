import React, { createContext, useContext, useState, ReactNode } from "react";

type UserType = "customer" | "ford" | null;

interface HistoryEntry {
  id: number;
  type: string;
  icon: string;
  main: string;
  meta: string;
  date: string;
}

interface AppContextType {
  user: { type: UserType } | null;
  setUser: (user: { type: UserType } | null) => void;
  screen: string;
  navigate: (screen: string) => void;
  comparisonState: any;
  setComparisonState: (state: any) => void;
  comparisonResult: any;
  setComparisonResult: (result: any) => void;
  quizAnswers: Record<string, string>;
  setQuizAnswers: (answers: Record<string, string>) => void;
  quizResult: any;
  setQuizResult: (result: any) => void;
  history: HistoryEntry[];
  addHistory: (entry: Omit<HistoryEntry, "id" | "date">) => void;
  battlecard: any;
  setBattlecard: (card: any) => void;
  simulation: any;
  setSimulation: (sim: any) => void;
  freeSearchResult: any;
  setFreeSearchResult: (result: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ type: UserType } | null>(null);
  const [screen, setScreen] = useState("splash");
  const [comparisonState, setComparisonState] = useState<any>(null);
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<any>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [battlecard, setBattlecard] = useState<any>(null);
  const [simulation, setSimulation] = useState<any>(null);
  const [freeSearchResult, setFreeSearchResult] = useState<any>(null);

  const navigate = (newScreen: string) => setScreen(newScreen);

  const addHistory = (entry: Omit<HistoryEntry, "id" | "date">) => {
    setHistory((prev) =>
      [
        {
          ...entry,
          date: new Date().toLocaleDateString("pt-BR"),
          id: Date.now(),
        },
        ...prev,
      ].slice(0, 20),
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        screen,
        navigate,
        comparisonState,
        setComparisonState,
        comparisonResult,
        setComparisonResult,
        quizAnswers,
        setQuizAnswers,
        quizResult,
        setQuizResult,
        history,
        addHistory,
        battlecard,
        setBattlecard,
        simulation,
        setSimulation,
        freeSearchResult,
        setFreeSearchResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
