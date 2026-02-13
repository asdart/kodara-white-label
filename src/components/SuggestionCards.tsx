const suggestions = [
  "What is your current fitness level and goals for 2026?",
  "Can you share your toughts on diet adherence and progress?",
  "How is Anika Sharma responding to the new workout plan?",
  "What adjustments should we make to David Lee's cardio routine?",
];

export default function SuggestionCards() {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {/* Section title */}
      <p
        className="font-medium text-center w-full"
        style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 'var(--body-4-size)',
          lineHeight: 'var(--body-4-line)',
          letterSpacing: 'var(--body-3-spacing)',
          color: 'var(--alpha-light-600)',
        }}
      >
        Commonly questions for Leanne
      </p>

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {suggestions.map((text, index) => (
          <div
            key={index}
            className="suggestion-card flex flex-col items-start rounded-[16px] text-left cursor-pointer backdrop-blur-[4px]"
            style={{ padding: '12px 16px' }}
          >
            <p
              className="font-medium whitespace-pre-wrap w-full"
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'var(--body-3-size)',
                lineHeight: 'var(--body-3-line)',
                letterSpacing: 'var(--body-3-spacing)',
                color: 'var(--alpha-light-600)',
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
