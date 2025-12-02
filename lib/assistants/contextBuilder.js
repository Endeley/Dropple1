export function buildContext({ document = {}, selection = [], viewState = {} } = {}) {
  return {
    document,
    selection,
    layers: document.layers || [],
    styles: document.styles || {},
    themes: document.themes || {},
    tokens: document.tokens || {},
    page: document.page || {},
    history: document.history || [],
    viewState,
  };
}
