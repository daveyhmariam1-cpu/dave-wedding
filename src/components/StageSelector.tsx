interface StageSelectorProps {
  stages: string[];
  labels: Record<string, string>;
  active: string;
  onChange: (stage: string) => void;
}

export const StageSelector = ({ stages, labels, active, onChange }: StageSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {stages.map((stage) => (
        <button
          key={stage}
          onClick={() => onChange(stage)}
          className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            active === stage
              ? "bg-stage-active text-stage-active-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          {labels[stage] || stage}
        </button>
      ))}
    </div>
  );
};
