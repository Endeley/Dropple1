'use client';

import { TypographySection } from "./TypographySection";
import { ColorSection } from "./ColorSection";
import { AlignmentSection } from "./AlignmentSection";
import { SpacingSection } from "./SpacingSection";
import { AnimationSection } from "./AnimationSection";

export default function TextInspector({ textObject, selectedWords = [] }) {
  if (!textObject) return null;

  return (
    <div className="w-[280px] bg-white dark:bg-[#0f0f14] border-l border-gray-200 dark:border-gray-800 p-4 overflow-y-auto space-y-4">
      <TypographySection textObject={textObject} selectedWords={selectedWords} />
      <hr className="border-gray-200 dark:border-gray-800" />
      <ColorSection textObject={textObject} selectedWords={selectedWords} />
      <hr className="border-gray-200 dark:border-gray-800" />
      <AlignmentSection textObject={textObject} />
      <hr className="border-gray-200 dark:border-gray-800" />
      <SpacingSection textObject={textObject} selectedWords={selectedWords} />
      <hr className="border-gray-200 dark:border-gray-800" />
      <AnimationSection textObject={textObject} selectedWords={selectedWords} />
    </div>
  );
}
