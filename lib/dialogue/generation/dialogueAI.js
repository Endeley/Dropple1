export async function generateDialogue({ scene, characters = [], tone = "neutral", style = "generic" }) {
  // Placeholder: real LLM call would generate dialogue based on scene + personalities.
  const lines = [
    {
      character: characters[0]?.name || "A",
      line: "We have one shot at this.",
      emotion: "tense",
      tone: "serious",
      pace: "slow",
      gestures: ["lean forward", "narrow eyes"],
    },
    {
      character: characters[1]?.name || "B",
      line: "Then let's not waste time.",
      emotion: "confident",
      tone: "steady",
      pace: "medium",
      gestures: ["nod", "step forward"],
    },
  ];
  return { lines, note: `style: ${style}, tone: ${tone}`, scene };
}
