import { ChevronLeft, ChevronRight } from "lucide-react";

interface Song {
  id: number;
  title: string;
  lyrics: string;
}

interface SongViewerProps {
  song: Song;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export const SongViewer = ({ song, index, total, onPrev, onNext }: SongViewerProps) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Song title */}
      <div className="bg-primary/10 px-5 py-4 border-b border-border">
        <h2 className="text-xl font-bold text-card-foreground text-center">{song.title}</h2>
        <p className="text-center text-muted-foreground text-sm mt-1">
          {index + 1} / {total}
        </p>
      </div>

      {/* Lyrics */}
      <div className="px-5 py-6 bg-lyrics-bg min-h-[40vh]">
        <p className="text-lg leading-relaxed text-card-foreground whitespace-pre-line text-center">
          {song.lyrics}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex border-t border-border">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-primary font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-colors active:bg-secondary"
        >
          <ChevronLeft className="w-5 h-5" />
          ቀዳሚ
        </button>
        <div className="w-px bg-border" />
        <button
          onClick={onNext}
          disabled={index === total - 1}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-primary font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-colors active:bg-secondary"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
