export default function layoutEngine(design = []) {
  const autoLayout = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "24px",
  };

  return { layout: autoLayout, layers: design };
}
