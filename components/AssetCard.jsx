"use client";

import Image from "next/image";
import { getAssetThumbnail } from "@/engines/assets/getAssetThumbnail";

export default function AssetCard({ asset, onClick, onDragStart }) {
  return (
    <div
      className="rounded-lg bg-zinc-800 hover:bg-zinc-700 cursor-pointer p-2 transition"
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
    >
      <Image
        src={getAssetThumbnail(asset)}
        alt={asset.metadata?.name || asset.id}
        width={400}
        height={96}
        className="w-full h-24 object-cover rounded"
      />

      <p className="text-xs text-zinc-300 mt-1 truncate">
        {asset.metadata?.name || asset.id}
      </p>
    </div>
  );
}
