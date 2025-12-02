export function focusCanvas(selection = []) {
  if (selection.length === 0) return { focus: "center", zoom: 1 };
  return { focus: selection.map((s) => s.id), zoom: 1.2 };
}
