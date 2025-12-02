// Voice commands stub
export const voiceCommands = {
  interpret(text = "") {
    return { intent: text.toLowerCase(), raw: text };
  },
};
