import { useState } from "react";
import { Search, X } from "lucide-react";

interface Song {
  id: number;
  title: string;
  lyrics: string;
}

interface SongSearchProps {
  songs: Song[];
  onSelect: (songId: number) => void;
}

export const SongSearch = ({ songs, onSelect }: SongSearchProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = query
    ? songs.filter((s) => s.title.includes(query))
    : songs;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2.5">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search songs..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); }}>
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
          {filtered.map((song) => (
            <button
              key={song.id}
              onClick={() => {
                onSelect(song.id);
                setQuery("");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-card-foreground hover:bg-muted transition-colors border-b border-border last:border-b-0"
            >
              {song.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
