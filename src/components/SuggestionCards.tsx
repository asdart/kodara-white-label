const suggestions = [
  "What's the difference between physical hunger and emotional hunger, and how do I tell them apart?",
  "What does progress actually look like in the Stressless Eating journey — what stages will I go through?",
  "I just had this for lunch — can you analyze it and break down the nutrition?",
  "I don't have years for therapy — how quickly can I change my mindset around food?",
];

export const simulatedResponses: Record<string, string> = {
  [suggestions[0]]:
    `This is one of the most important distinctions you can learn — once you can tell them apart, you'll stop reacting on autopilot and start making conscious choices.\n\nHere's a side-by-side breakdown:\n\n| Cue | Physical Hunger | Emotional Hunger |\n| --- | --- | --- |\n| Onset | Gradual — builds slowly over hours | Sudden — hits all at once |\n| Location | Stomach — growling, emptiness, low energy | Head & chest — tension, tightness, restlessness |\n| What you crave | Open to many foods, including "boring" ones | Specific comfort foods — usually salty, sweet, or crunchy |\n| Satisfaction | You feel satisfied and can stop when full | You keep eating past fullness, chasing a feeling |\n| Emotional state before | Neutral — just physically depleted | Stressed, bored, lonely, anxious, or sad |\n| Emotional state after | Content, energized | Guilt, shame, or numbness |\n| Timing | Follows a pattern — hours since last meal | No pattern — can hit right after eating |\n\nA helpful test: pause and ask yourself, "Would I eat an apple right now?" If the answer is yes, it's likely physical hunger. If you want only chips or chocolate, it's probably emotional.\n\nThe goal isn't to eliminate emotional eating entirely — it's to notice which type of hunger is driving you before you respond. That pause is where your power is.`,

  [suggestions[1]]:
    `Great question — and one that most programs never answer clearly. Here's the honest roadmap. Everyone moves at their own pace, but these are the stages I see consistently:\n\n[ROADMAP]\nAwareness|Weeks 1–2|You start noticing your patterns — the triggers, the self-talk, the autopilot moments. Nothing needs to change yet. Just seeing clearly is the shift.|Recognizing "I'm not hungry, I'm anxious" in real time\nThe Pause|Weeks 3–4|A gap opens between the impulse and the action. You won't always use it — but you'll feel it. This is where choice begins.|Catching yourself before the pantry door opens\nExperimentation|Weeks 5–8|You try new responses — journaling, movement, breathing, sitting with discomfort. Some work, some don't. That's the point.|Finding 2–3 tools that genuinely soothe your nervous system\nSetbacks & Self-Compassion|Weeks 8–12|Old patterns resurface, especially under stress. But now you recover faster and without the spiral of shame.|A "bad day" no longer turns into a "bad week"\nIntegration|Months 3–5|New habits start feeling automatic. Food decisions require less mental energy. You trust your body more.|Eating a cookie without guilt or a 3-day binge\nFood Freedom|Month 6+|Food is just food. You eat when hungry, stop when satisfied, and enjoy meals without the mental noise.|Living your life without food controlling your thoughts\n[/ROADMAP]\n\nA few things to keep in mind: this isn't linear. You'll revisit earlier stages — that's not failure, it's deepening. And the timeline is approximate; some people move faster, others need more time with certain stages.\n\nThe biggest shift most clients report? It's not a specific behavior change — it's the quiet. The mental noise around food finally turns down.`,

  [suggestions[2]]:
    `Here's a full breakdown of your meal. I identified the key components and estimated the macros based on the portion sizes visible in the photo.\n\nMeal identified: Grilled chicken salad bowl with mixed greens, cherry tomatoes, avocado slices, roasted sweet potato, quinoa, and a lemon-tahini dressing.\n\n| Nutrient | Amount | % Daily Value |\n| --- | --- | --- |\n| Calories | 485 kcal | 24% |\n| Protein | 38g | 76% |\n| Carbohydrates | 42g | 14% |\n| Dietary Fiber | 9g | 32% |\n| Total Fat | 18g | 23% |\n| Saturated Fat | 3.2g | 16% |\n| Sodium | 520mg | 23% |\n\nThis is a really well-balanced meal, Marcos — great job. Here's what stands out:\n\nThe protein-to-carb ratio is solid. 38g of protein from the chicken will keep you satiated for 4–5 hours, which means fewer cravings between meals. That's exactly what we want.\n\nYour fiber is above average for a single meal at 9g. This supports gut health and helps stabilize blood sugar — which directly impacts mood and energy levels in the afternoon.\n\nThe fat profile is mostly unsaturated from the avocado and tahini. This is the kind of fat that supports hormone balance and keeps you feeling satisfied without the heavy crash.\n\nOne small note: sodium is moderate at 520mg. If you're watching salt intake, you could go lighter on the dressing or swap to a simple lemon and olive oil drizzle.\n\nOverall — this is nutrient-dense, balanced, and genuinely enjoyable. No changes needed. Keep eating like this and your body will thank you.`,

  [suggestions[3]]:
    `I get it — you want results, not years on a couch. Good news: meaningful shifts can happen faster than you think.\n\nHere's what to expect:\n\n• Within the first 2 weeks, most clients notice a shift in awareness. You'll start catching patterns you've been on autopilot with for years — that alone changes behavior.\n\n• By 4–6 weeks, you'll have practical tools you're actively using: how to sit with a craving, how to eat without guilt, how to handle social pressure around food.\n\n• By 3 months, clients typically report that food takes up significantly less mental space. The obsessive thinking quiets down.\n\nThis isn't traditional therapy — it's targeted, skill-based coaching. We focus on specific behaviors and beliefs, not open-ended exploration.\n\nThat said, deeper patterns (trauma, identity, control) sometimes surface, and that's okay — we address them as they come up, practically and efficiently.\n\nYou don't need to "fix" everything to feel different. One good insight, applied consistently, can change everything.`,
};

export interface ThinkingStep {
  label: string;
}

export const simulatedThinkingSteps: Record<string, ThinkingStep[]> = {
  [suggestions[0]]: [
    { label: 'Analyzing hunger signal patterns from client research...' },
    { label: 'Building side-by-side comparison of physical vs. emotional cues...' },
    { label: 'Cross-referencing body location and craving data...' },
    { label: 'Adding practical self-check prompts...' },
  ],
  [suggestions[1]]: [
    { label: "Reviewing Leanne's client transformation stages..." },
    { label: 'Loading milestone markers from food prison to food freedom...' },
    { label: 'Ordering the internal shifts by sequence and dependency...' },
    { label: 'Preparing reflection prompts for each stage...' },
  ],
  [suggestions[2]]: [
    { label: 'Scanning photo for food items and portion sizes...' },
    { label: 'Estimating macronutrient content from visual cues...' },
    { label: 'Cross-referencing with USDA nutrition database...' },
    { label: 'Building personalized meal assessment...' },
  ],
  [suggestions[3]]: [
    { label: 'Estimating expected timelines from coaching data...' },
    { label: 'Breaking the journey into 2-week, 6-week, and 3-month milestones...' },
    { label: 'Differentiating skill-based coaching from traditional therapy...' },
    { label: 'Compiling quick-win strategies for early momentum...' },
  ],
};

export const simulatedImages: Record<string, string> = {
  [suggestions[2]]: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
};

interface SuggestionCardsProps {
  filterQuery?: string;
  onSelect?: (text: string) => void;
}

function matchesFilter(text: string, query: string): boolean {
  if (!query.trim()) return true;
  const lower = text.toLowerCase();
  // Every word in the query must appear somewhere in the card text
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => lower.includes(word));
}

export default function SuggestionCards({ filterQuery = '', onSelect }: SuggestionCardsProps) {
  const hasQuery = filterQuery.trim().length > 0;

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
        {suggestions.map((text, index) => {
          const isMatch = matchesFilter(text, filterQuery);
          return (
            <div
              key={index}
              onClick={() => onSelect?.(text)}
              className="suggestion-card flex flex-col items-start rounded-[16px] text-left cursor-pointer backdrop-blur-[4px]"
              style={{
                padding: '12px 16px',
                opacity: hasQuery && !isMatch ? 0.25 : 1,
                transform: hasQuery && !isMatch ? 'scale(0.98)' : 'scale(1)',
                transition: 'opacity 250ms ease, transform 250ms ease',
                pointerEvents: hasQuery && !isMatch ? 'none' : 'auto',
              }}
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
          );
        })}
      </div>
    </div>
  );
}
