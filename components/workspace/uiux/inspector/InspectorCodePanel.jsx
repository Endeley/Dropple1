export default function InspectorCodePanel({ node }) {
  return (
    <pre className="whitespace-pre-wrap text-[10px] text-slate-300">
{`<Frame
  x={${node.x}}
  y={${node.y}}
  width={${node.width}}
  height={${node.height}}
  fill="${node.fills?.[0]?.color}"
/>`}
    </pre>
  );
}
