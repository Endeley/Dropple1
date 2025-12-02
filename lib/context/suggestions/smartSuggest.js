import { predictIntent } from "../prediction/intentPredictor";
import { predictNextActions } from "../prediction/nextActionModel";
import { suggestTemplates } from "./templateSuggest";
import { suggestStyles } from "./styleSuggest";

export function getSmartSuggestions(state = {}) {
  const intent = predictIntent(state);
  const nextActions = predictNextActions({ intent: intent.intent, selection: state.selection || [] });
  const templates = suggestTemplates(state);
  const styles = suggestStyles(state);

  return {
    intent,
    nextActions,
    templates,
    styles,
  };
}
