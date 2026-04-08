import { useState, useMemo, useCallback } from "react";
import songs from "@/data/songs.json";
import flow from "@/data/flow.json";
import { StageSelector } from "@/components/StageSelector";
import { SongViewer } from "@/components/SongViewer";
import { SongSearch } from "@/components/SongSearch";
import { Moon, Sun } from "lucide-react";

type StageKey = keyof typeof flow;

const STAGE_LABELS: Record<StageKey, string> = {
  enter_gofa: "Enter Gofa",
  basement: "Basement",
  enter_church: "Enter Church",
  at_church: "At Church",
  out_of_home: "Out to Home",
  at_home: "At Home",
};

const Index = () => {
  const [activeStage, setActiveStage] = useState<StageKey>("enter_gofa");
  const [songIndex, setSongIndex] = useState(0);
  // Set dark mode as default
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("dark");
    }
    return true;
  });

  const stageSongs = useMemo(() => {
    const ids = flow[activeStage];
    return ids.map((id) => songs.find((s) => s.id === id)).filter(Boolean) as typeof songs;
  }, [activeStage]);

  const currentSong = stageSongs[songIndex];

  const handleStageChange = useCallback((stage: StageKey) => {
    setActiveStage(stage);
    setSongIndex(0);
  }, []);

  const handleSongSelect = useCallback(
    (songId: number) => {
      const idx = stageSongs.findIndex((s) => s.id === songId);
      if (idx !== -1) setSongIndex(idx);
    },
    [stageSongs]
  );

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      document.documentElement.classList.toggle("dark", !prev);
      return !prev;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <img src="/ethiopian-cross.svg" alt="Ethiopian Orthodox Cross" className="w-6 h-6 inline-block align-middle" />
            መሪ ጌታ
          </h1>
          <button
            onClick={toggleDark}
            className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4 space-y-4">
        {/* Stage Selector */}
        <StageSelector
          stages={Object.keys(flow) as StageKey[]}
          labels={STAGE_LABELS}
          active={activeStage}
          onChange={handleStageChange}
        />

        {/* Search */}
        <SongSearch songs={stageSongs} onSelect={handleSongSelect} />

        {/* Song Viewer */}
        {currentSong && (
          <SongViewer
            song={currentSong}
            index={songIndex}
            total={stageSongs.length}
            onPrev={() => setSongIndex((i) => Math.max(0, i - 1))}
            onNext={() => setSongIndex((i) => Math.min(stageSongs.length - 1, i + 1))}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
